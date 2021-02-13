import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import SecondScreen from './SecondScreen';
import BienvenidaScreen from './BienvenidaScreen';
import CrearSolicitudServicioScreen from './CrearSolicitudServicioScreen';
import Geofence from './Geofence';
import GeofencingScreen from './GeofencingScreen';
import SalesScreen from './SalesScreen';
import MessagingScreen from './MessagingScreen';

export default class Main extends Component {

  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="loginScreen"
	          component={LoginScreen}
	          animation='fade'
	          hideNavBar={true}
	          initial={true}
	        />
	        <Scene key="secondScreen"
	          component={SecondScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
			<Scene key="bienvenidaScreen"
	          component={BienvenidaScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
			<Scene key="crearSolicitudServicioScreen"
	          component={CrearSolicitudServicioScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
			<Scene key="geofence"
	          component={Geofence}
	          animation='fade'
	          hideNavBar={true}
	        />
			<Scene key="geofencing"
	          component={GeofencingScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
			<Scene key="salesScreen"
	          component={SalesScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
			<Scene key="messagingScreen"
	          component={MessagingScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
	      </Scene>
	    </Router>
	  );
	}
}