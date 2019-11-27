import React, { useEffect, useState } from 'react';
import * as handTrack from 'handtrackjs';
import {
  Deck,
  Slide,
  SlideSet
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import wolox from './assets/wolox.png';
import navigate from './assets/navigate.png';
import nubi from './assets/nubi.png';
import xapo from './assets/xapo.png';
import prime from './assets/prime.png';
import sura from './assets/sura.png';
import greenco from './assets/greenco.png';

import styles from './styles.module.scss';

const theme = createTheme(
  {
    primary: '#1A1E30',
    secondary: '#707795'
  }
);

let isVideo = false;
let model = null;
let video = null;
let canvas = null;
let context = null;
let n = 0;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video  
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.75,      // ioU threshold for non-max suppression
  scoreThreshold: 0.8,    // confidence threshold for predictions.
};

let firstXLecture = 0,
    lastXLecture = 0;

function runDetection() {
  model.detect(video).then(predictions => {
    if (predictions && predictions[0] && predictions[0].bbox) {
      if (firstXLecture === 0) firstXLecture = predictions[0].bbox[0];
      lastXLecture = predictions[0].bbox[0];
    } else {
      if (firstXLecture) {
        const travelDistance = lastXLecture - firstXLecture;
        if (Math.abs(travelDistance) > 100) {
          const next = lastXLecture < firstXLecture ? -1 : 1;
          let currentSlide = window.location.hash[window.location.hash.length - 1];
          let nextSlide = currentSlide === '/' ||  currentSlide === '' ? 1 : Number(currentSlide) + next;
          if (nextSlide === 0) nextSlide = '';
          if (nextSlide === 8) nextSlide = 7;
          window.location.href = window.location.href.slice(0, window.location.href.length - 1) + nextSlide;
          console.log(`Current slide: ${currentSlide} - Next: ${nextSlide}`)
          console.log(`First lecture: ${firstXLecture} - Last lecture: ${lastXLecture}`)
          firstXLecture = 0;
          lastXLecture = 0;
        }
      }
    }

    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) requestAnimationFrame(runDetection);
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
      handTrack.startVideo(video).then(status => {
        console.log("video started", status);
        if (status) {
          isVideo = true;
          runDetection();
        }
      }).then(() => setGestures(true));
    });
  }, []);

  return (
    <div className={styles.app}>
      <canvas id="canvas" width="200" height="320" className={styles.detectorVideo}></canvas>
      <video className={`videobox canvasbox ${styles.hidden}`} autoPlay="autoplay" id="myvideo"></video>
      <Deck theme={theme} controls={false} showFullscreenControl={false} progress="bar">
        <SlideSet>
          <Slide className={styles.slide}>
            <img src={wolox} className={styles.slideImage} />
          </Slide>
          <Slide className={styles.slide}>
            <img src={navigate} className={styles.slideImage} />
          </Slide>
          <Slide className={styles.slide}>
            <img src={greenco} className={styles.slideImage} />
          </Slide>
          <Slide className={styles.slide}>
            <img src={nubi} className={styles.slideImage} />
          </Slide>
          <Slide className={styles.slide}>
            <img src={prime} className={styles.slideImage} />
          </Slide>
          <Slide className={styles.slide}>
            <img src={xapo} className={styles.slideImage} />
          </Slide>
          <Slide className={styles.slide}>
            <img src={sura} className={styles.slideImage} />
          </Slide>
        </SlideSet>
      </Deck>
    </div>
  );
}

export default Home;
