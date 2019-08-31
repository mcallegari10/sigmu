import React, { useEffect } from 'react';
import tracking from 'tracking';

import init from '../Objects'

import logo from './assets/logo.svg';
import styles from './styles.module.scss';
const initCamera = () => {
  console.log('Hola')
  debugger;
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      tracking.track('#video', tracker, { camera: true });
      tracker.on('track', function(event) {
        console.log('hola23333')
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
      });
      var gui = new dat.GUI();
      gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
      gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
      gui.add(tracker, 'stepSize', 1, 5).step(0.1);
}

function Home() {
  useEffect(() => {
    init()
    initCamera()
  }, []);

  return (
<>
  <div class="demo-title">
    <p><a href="http://trackingjs.com" target="_parent">tracking.js</a> － get user's webcam and detect faces</p>
  </div>

  <div class="demo-frame">
    <div class="demo-container">
      <video id="video" width="320" height="240" preload autoplay loop muted></video>
      <canvas id="canvas" width="320" height="240"></canvas>
    </div>
    <div id="example" /> 
  </div>
</>
  );
}

export default Home;
