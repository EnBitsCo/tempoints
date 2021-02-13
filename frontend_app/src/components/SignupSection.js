import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Alert} from 'react-native';
import { Button } from 'react-native-elements';

import styles from "./style";

const appId = "1047121222092614";

export default class SignupSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerButtons}>
          <Button
            buttonStyle={styles.fbLoginButton}
            title="Crear Cuenta"
            color="#3897f1"
          />
          <Button
            buttonStyle={styles.fbLoginButton}
            title="Olvidó su Contraseña?"
            color="#3897f1"
          />
        </View>
        <View style={styles.containerButtons}>
          <Button
            buttonStyle={styles.fbLoginButton}
            onPress={() => this.onFbLoginPress()}
            title="Ingresar con Facebook"
            color="#3897f1"
          />
        </View>
      </View>
    );
  }

  async onFbLoginPress() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }
}
