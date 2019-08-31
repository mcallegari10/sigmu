import React, { useEffect } from 'react';
import * as handTrack from 'handtrackjs';

import styles from './styles.module.scss';

let isVideo = false;
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
    handTrack.load(modelParams).then(model =>  {
      model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        requestAnimationFrame(model.detect);
    });
  });
}

// function runDetection() {
//     model.detect(video).then(predictions => {
//         console.log("Predictions: ", predictions);
//         model.renderPredictions(predictions, canvas, context, video);
//         if (isVideo) {
//             requestAnimationFrame(runDetection);
//         }
//     });
// }

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
    // handTrack.load(modelParams).then(lmodel => {
    //   model = lmodel
    // });
  }, []);

  return (
    <div className={styles.app}>
      <canvas id="canvas" className="border canvasbox"></canvas>
      <video className="videobox canvasbox" autoPlay="autoplay" id="myvideo"></video>
    </div>
  );
}

export default Home;
