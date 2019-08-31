import React, { useEffect } from 'react';
import * as handTrack from 'handtrackjs';

import styles from './styles.module.scss';

// let isVideo = false;
// let model = null;
let video = null;
let canvas = null;
let context = null;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 2,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.7,    // confidence threshold for predictions.
}

function startVideo() {
    handTrack.load(modelParams).then(model => {
    runDetection(model);
  });
}

// handTrack.load().then(model => {
//   // detect objects in the image.
//   model.detect(img).then(predictions => {
//     console.log('Predictions: ', predictions); 
//   });
// });

function runDetection(model) {
    model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        requestAnimationFrame(runDetection);
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
    startVideo();
  }, []);

  return (
    <div className={styles.app}>
      <canvas id="canvas" className="border canvasbox"></canvas>
      <video className="videobox canvasbox" autoPlay="autoplay" id="myvideo"></video>
    </div>
  );
}

export default Home;
