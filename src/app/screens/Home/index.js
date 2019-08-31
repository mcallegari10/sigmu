// index.js
 
import React, { Component } from 'react';
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Code,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  ListItem,
  List,
  Quote,
  Slide,
  Text, 
  SlideSet
} from 'spectacle';
 
export default class extends Component {
  render() {
    return (
      <Deck>
        <SlideSet style={{ border: '2px solid red' }}>
          <Slide>Slide1</Slide>
          <Slide>Slide2</Slide>
          <Slide>Slide3</Slide>
        </SlideSet>
      </Deck>
    );
  }
}