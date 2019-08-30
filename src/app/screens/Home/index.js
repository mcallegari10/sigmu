import React, { useEffect } from 'react';

import init from '../Objects'

import logo from './assets/logo.svg';
import styles from './styles.module.scss';

function Home() {
  useEffect(() => init(), []);
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <p className={styles.text}>
          Edit <code>src/app/index.js</code> and save to reload.
        </p>
        <a className={styles.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <div id="example" />
    </div>
  );
}

export default Home;
