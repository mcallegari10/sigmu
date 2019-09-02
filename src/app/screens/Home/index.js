import React, { useEffect, useState } from 'react';
import * as handTrack from 'handtrackjs';
import {
  Deck,
  Slide,
  SlideSet
} from 'spectacle';
import createTheme from 'spectacle/lib/themes/default';

import sigmuLogo from './assets/sigmu.png'
import sigmuMini from './assets/sigmu_mini.png'
import futureImage from './assets/Rectangle.png'
import facebook from './assets/facebook.png'
import xboxController from './assets/xbox_controller.png'

import tincho from './assets/tincho.jpeg'
import colo from './assets/colo.png'
import fer from './assets/fer.jpeg'
import matt from './assets/matt.jpeg'
import ale from './assets/ale.jpeg'
import tute from './assets/tute.jpg'

import icon1 from './assets/icon1.svg'
import icon2 from './assets/icon2.svg'
import icon3 from './assets/icon3.svg'

import styles from './styles.module.scss';

const theme = createTheme(
  {
    primary: '#1A1E30',
    secondary: '#707795'
  }
)

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
};

const startVideo = async () =>
  handTrack.startVideo(video).then(status => {
    console.log("video started", status);
    if (status) {
      isVideo = true;
      runDetection();
    }
  });

function runDetection() {
  const percentage = 0.7;
  model.detect(video).then(predictions => {
    if (predictions && predictions[0] && predictions[0].bbox) {
      if ((predictions[0].bbox[2] <= handWidth * percentage)  && (predictions[0].bbox[3] <= handHeight * percentage) && !cicleWorked) {
        cicleWorked = true;
        let currentSlide = window.location.hash[window.location.hash.length - 1];
        const nextSlide = window.location.href.slice(0, window.location.href.length - 1) + (Number(currentSlide) + 1);
        window.location.href = nextSlide;
      }

      handWidth = n > 20 ? predictions[0].bbox[2] : (predictions[0].bbox[2] < handWidth * percentage ? predictions[0].bbox[2] : handWidth);
      handHeight = n > 20 ? predictions[0].bbox[3] : (predictions[0].bbox[3] < handHeight * percentage ? predictions[0].bbox[3] : handHeight);
    }
    n = n + 1; 
    cicleWorked = n === 25 ? false : cicleWorked;
    n = n === 25 ? 0 : n;

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
      <Deck theme={theme} controls={false} showFullscreenControl={false} progress="bar">
        <SlideSet>
          <Slide className={styles.slide}>
            <img src={sigmuLogo} className={styles.logo} />
            <h1 className={styles.title}>Sistema de Identificación de Gestos y Movimientos Únicos</h1>
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>equipo</h1>
            <div className={styles.team}>
              <div className={styles.member}>
                <img src={tute} className={styles.memberPhoto} />
                <p className={styles.memberName}>Mateo Ruiz</p>
                <span className={styles.job}>Designer</span>
              </div>
              <div className={styles.member}>
                <img src={ale} className={styles.memberPhoto} />
                <p className={styles.memberName}>Alejandro Pellegrini</p>
                <span className={styles.job}>Designer</span>
              </div>
              <div className={styles.member}>
                <img src={matt} className={styles.memberPhoto} />
                <p className={styles.memberName}>Matias Grote</p>
                <span className={styles.job}>Developer</span>
              </div>
              <div className={styles.member}>
                <img src={tincho} className={styles.memberPhoto} />
                <p className={styles.memberName}>Martin Callegari</p>
                <span className={styles.job}>Developer</span>
              </div>
              <div className={styles.member}>
                <img src={fer} className={styles.memberPhoto} />
                <p className={styles.memberName}>Fermin Robilotte</p>
                <span className={styles.job}>Developer</span>
              </div>
              <div className={styles.member}>
                <img src={colo} className={styles.memberPhoto} />
                <p className={styles.memberName}>Julian Villabona</p>
                <span className={styles.job}>QA</span>
              </div>
            </div>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>problemática</h1>
            <p className={styles.slideText}>Hoy la tecnología no está adaptada para que personas con capacidades diferentes puedan aprovecharla de la misma manera que el resto</p>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>problemática</h1>
            <div className={styles.barrerData}>
              <div className={`column start`}>
                <span className={styles.mainNumber}>15%</span>
                <p className={styles.slide4Text}>de las personas en el mundo experimentan algún tipo de discapacidad.</p>
                <span className={styles.slide4Note}>https://www.worldbank.org/en/topic/disability</span>
              </div>
              <div className="column middle">
                <p className={styles.peopleCount}>≈ 1.000.000.000 de personas</p>
              </div>
            </div>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <div className="row space-between">
              <img src={facebook} className={styles.painImage} />
              <img src={xboxController} className={styles.painImage} />
            </div>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>problemática</h1>
            <div className={styles.slide5Content}>
              <div className={`column start`}>
                <h2 className={styles.subtitle5}>Discapacidad Motriz fina</h2>
                <p className={styles.slide5Text}>Poca presición en sus movimientos que genera un difícil control de elementos definidos como mouse y teclado.</p>
              </div>
              <div className={`column start`}>
                <h2 className={styles.subtitle5}>Discapacidad Motriz gruesa</h2>
                <p className={styles.slide5Text}>Imposibilidad de movimientos extendidos que no permiten uso de periféricos.</p>
              </div>
            </div>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>alternativas</h1>
            <div className={`row space-between ${styles.alternativesContainer}`}>
              <div className="column start item-1">
                <img src={icon1} className={styles.indexSquare} />
                <h2 className={styles.alternativeTitle}>Periféricos de precisión</h2>
                <p className={styles.alternativeExpl}>Caros y no son fáciles de conseguir en todo el mundo.</p>
              </div>
              <div className="column start item-1">
                <img src={icon2} className={styles.indexSquare} />
                <h2 className={styles.alternativeTitle}>Comandos por voz</h2>
                <p className={styles.alternativeExpl}>No son precisos y no se adaptan a  todas las plataformas.</p>
              </div>
              <div className="column start item-1">
                <img src={icon3} className={styles.indexSquare} />
                <h2 className={styles.alternativeTitle}>Controlador táctil</h2>
                <p className={styles.alternativeExpl}>Caros y no son fáciles de conseguir en todo el mundo.</p>
              </div>
            </div>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={`${styles.slide} ${styles.slide7}`}>
            <h1 className={`${styles.slideTitle} ${styles.slide7Title}`}>“The future is already here – it's just not evenly distributed.”</h1>
            <img src={futureImage} className={styles.futureImage} />
            <span className={styles.slide4Note}>William Gibson, 2003</span>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>sigmu</h1>
            <h2 className={styles.finalSubtitle}>Sistema de Identificación de Gestos y Movimientos Únicos</h2>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>sigmu</h1>
            <h2 className={styles.finalSubtitle}>Motricidad Fina</h2>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>sigmu</h1>
            <h2 className={styles.finalSubtitle}>accesible</h2>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>sigmu</h1>
            <h2 className={styles.finalSubtitle}>inclusión</h2>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>sigmu</h1>
            <h2 className={styles.finalSubtitle}>asequible</h2>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>sigmu</h1>
            <h2 className={`${styles.slideTitle} ${styles.marginTitle}`}>si, es posible</h2>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>muchas gracias</h1>
            <h2 className={styles.finalSubtitle}>team sigmu</h2>
            <img src={sigmuLogo} className={styles.logoSmall} />
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
          <Slide className={styles.slide}>
            <h1 className={styles.slideTitle}>sigmu</h1>
            <h2 className={styles.finalSubtitle}>Motricidad Gruesa</h2>
            <img src={sigmuMini} className={styles.sigmuMini} />
          </Slide>
        </SlideSet>
      </Deck>
    </div>
  );
}

export default Home;
