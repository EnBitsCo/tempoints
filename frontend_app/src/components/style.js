import {Dimensions} from 'react-native';

const React = require("react-native");

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const { StyleSheet } = React;

export default {

  containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,

  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  containerButtons: {
    flex: 1,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
};
