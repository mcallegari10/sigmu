import React, { useEffect } from 'react';
import * as handTrack from 'handtrackjs';

import styles from './styles.module.scss';

let isVideo = false;
let model = null;
let video = null;
let canvas = null;
let context = null;
let n = 0;
let w = 0;
let h = 0;
let cicleWorked = false;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.7,    // confidence threshold for predictions.
}

function startVideo() {
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            isVideo = true
            runDetection()
        }
    });
}

function runDetection() {
  const percentage = 0.9;
  model.detect(video).then(predictions => {
    if ( predictions && predictions[0] && predictions[0].bbox) {
      if ((predictions[0].bbox[2] <= w*percentage)  && (predictions[0].bbox[3] <= h*percentage) && !cicleWorked) {
        cicleWorked = true;
        console.error('funciona')
      }
        w = n > 29 ? predictions[0].bbox[2] : (predictions[0].bbox[2] < w*percentage ? predictions[0].bbox[2] : w);
        h = n > 29 ? predictions[0].bbox[3] : (predictions[0].bbox[3] < h*percentage ? predictions[0].bbox[3] : h);
        console.log(w,h, n)
      }
      n = n + 1; 
      cicleWorked = n === 31 ? false : cicleWorked;
      n = n === 31 ? 0 : n;

        model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {
            requestAnimationFrame(runDetection);
        }
    });
}

navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(mediaStream => {
  const video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
});

function Home() {
  useEffect(() => { 
    video = document.getElementById("myvideo");
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    handTrack.load(modelParams).then(lmodel => {
      model = lmodel
      startVideo();
    });
  }, []);

  return (
    <div className={styles.app}>
      <canvas id="canvas" className={`border canvasbox`}></canvas>
      <video className={`videobox canvasbox ${styles.hidden}`} autoPlay="autoplay" id="myvideo"></video>
    </div>
  );
}

export default Home;
