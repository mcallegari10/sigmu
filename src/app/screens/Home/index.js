import React, { useEffect } from 'react';
import * as handTrack from 'handtrackjs';

import styles from './styles.module.scss';

navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(mediaStream => {
  const video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
});

function Home() {
  useEffect(() => {
    const video = document.getElementById('videoSource');
    // Load the model.
    handTrack.load().then(model => {
      // detect objects in the image.
      console.log("model loaded")
      model.detect(video).then(predictions => {
        console.log('Predictions: ', predictions); 
      });
    });
  }, []);

  return (
    <div className={styles.app}>
      <canvas id="canvas" width="500" height="500" />
      <video id="videoSource" />
    </div>
  );
}

export default Home;
