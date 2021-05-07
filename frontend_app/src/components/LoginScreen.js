import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import { Animated, StyleSheet, View } from 'react-native';

import Button from '../components/puzzle/Button';
import Logo from '../components/puzzle/Logo';
import Toggle from '../components/puzzle/Toggle';
import configureTransition from '../utils/puzzle/configureTransition';
import sleep from '../utils/puzzle/sleep';

const State = {
  Launching: 'Launching',
  WillTransitionIn: 'WillTransitionIn',
  WillTransitionOut: 'WillTransitionOut',
};

const BOARD_SIZES = [3, 4, 5, 6];

export default class LoginScreen extends Component {
  static propTypes = {
    onChangeSize: PropTypes.func.isRequired,
    onStartGame: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
  };

  state = {
    transitionState: State.Launching,
  };

  toggleOpacity = new Animated.Value(0);
  buttonOpacity = new Animated.Value(0);

  async componentDidMount() {
    await sleep(500);

    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionIn });
    });

    Animated.timing(this.toggleOpacity, {
      toValue: 1,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(this.buttonOpacity, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }

  handlePressStart = async () => {
    const { onStartGame } = this.props;

    await configureTransition(() => {
      this.setState({ transitionState: State.WillTransitionOut });
    });

    onStartGame();
  };

  render() {
    const { size, onChangeSize } = this.props;
    const { transitionState } = this.state;

    const toggleStyle = { opacity: this.toggleOpacity };
    const buttonStyle = { opacity: this.buttonOpacity };
    
    return (
      transitionState !== State.WillTransitionOut && (
        <View style={styles.container}>
          <View style={styles.logo}>
            <Logo />
          </View>
          {transitionState !== State.Launching && (
            <Animated.View style={toggleStyle}>
              <Toggle
                options={BOARD_SIZES}
                value={size}
                onChange={onChangeSize}
              />
            </Animated.View>
          )}
          {transitionState !== State.Launching && (
            <Animated.View style={buttonStyle}>
              <Button title={'Start Game'} onPress={this.handlePressStart} />
            </Animated.View>
          )}
          <Wallpaper>
            <Logo />
            <Form />
            <SignupSection />
            <ButtonSubmit />
          </Wallpaper>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    alignSelf: 'stretch',
    paddingHorizontal: 40,
  },
});