import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';

import bgSrc from '../images/wallpaper.jpg';

export default class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
