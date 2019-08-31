import React, { useEffect, useState } from 'react';
import * as handTrack from 'handtrackjs';
import {
  Deck,
  Slide,
  SlideSet
} from 'spectacle';

import styles from './styles.module.scss';

let isVideo = false;
let model = null;
let video = null;
let canvas = null;
let context = null;
let n = 0;
let handWidth = 0;
let handHeight = 0;
let cicleWorked = false;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video  
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.7,    // confidence threshold for predictions.
}

function startVideo() {
  return handTrack.startVideo(video).then(status => {
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
    if (predictions && predictions[0] && predictions[0].bbox) {
      if ((predictions[0].bbox[2] <= handWidth * percentage)  && (predictions[0].bbox[3] <= handHeight * percentage) && !cicleWorked) {
        cicleWorked = true;
        let currentSlide = window.location.hash[window.location.hash.length - 1];
        const nextSlide = window.location.href.slice(0, window.location.href.length - 1) + (Number(currentSlide) + 1);
        console.log(currentSlide)
        window.location.href = nextSlide;
      }

      // console.log(`x: ${handCenterX}, y: ${handCenterY}`);
      handWidth = n > 19 ? predictions[0].bbox[2] : (predictions[0].bbox[2] < handWidth * percentage ? predictions[0].bbox[2] : handWidth);
      handHeight = n > 19 ? predictions[0].bbox[3] : (predictions[0].bbox[3] < handHeight * percentage ? predictions[0].bbox[3] : handHeight);
      // console.log(w,h, n)
    }
    n = n + 1; 
    cicleWorked = n === 21 ? false : cicleWorked;
    n = n === 21 ? 0 : n;

    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
  const video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
});

function Home() {
  const [gesturesOn, setGestures] = useState(false);
  useEffect(() => { 
    video = document.getElementById('myvideo');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    handTrack.load(modelParams).then(lmodel => {
      model = lmodel
      startVideo().then(() => setGestures(true));
    });
  }, []);

  return (
    <div className={styles.app}>
      <canvas id="canvas" className={`border canvasbox`}></canvas>
      <video className={`videobox canvasbox ${styles.hidden}`} autoPlay="autoplay" id="myvideo"></video>
      {gesturesOn && <div className={styles.notify}>Está activo el uso de gestos!</div>}
      <Deck>
        <SlideSet style={{ border: '2px solid red' }}>
          <Slide>Slide N1</Slide>
          <Slide>Slide2</Slide>
          <Slide>Slide3</Slide>
          <Slide>Slide4</Slide>
          <Slide>Slide5</Slide>
          <Slide>Slide6</Slide>
          <Slide>Slide7</Slide>
          <Slide>Slide8</Slide>
          <Slide>Slide9</Slide>
          <Slide>Slide10</Slide>
          <Slide>Slide11</Slide>
          <Slide>Slide12</Slide>
          <Slide>Slide13</Slide>
          <Slide>Slide14</Slide>
          <Slide>Slide15</Slide>
          <Slide>Slide16</Slide>
          <Slide>Slide17</Slide>
          <Slide>Slide18</Slide>
        </SlideSet>
      </Deck>
    </div>
  );
}

export default Home;
