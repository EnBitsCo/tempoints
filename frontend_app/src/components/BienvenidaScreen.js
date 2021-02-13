import React, {Component} from 'react';

import { Avatar, Button } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import {Actions } from 'react-native-router-flux';

import Wallpaper from './Wallpaper';

export default class BienvenidaScreen extends Component {

    _onPressCrearSolicitudServicio() {
        setTimeout(() => {
          Actions.crearSolicitudServicioScreen();
        }, 2300);
    }

    render() {
        return (
            <Wallpaper>
                <View style={styles.container}>
                    <Text style={styles.text}>Bienvenido Pedro Pérez</Text>
                    <Avatar
                        title="PP"
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        size={150}
                    />
                </View>
                <View style={styles.containerButtons}>
                    <Button
                        buttonStyle={styles.button}
                        onPress={this._onPressCrearSolicitudServicio}
                        title="Crear Solicitud de Servicio"
                        color="#3897f1"
                        titleStyle={styles.buttonTitleStyle}
                    />
                    <Button
                        buttonStyle={styles.button}
                        onPress={() => console.log("Works!")}
                        title="Ver Solicitudes de Servicio"
                        color="#3897f1"
                        titleStyle={styles.buttonTitleStyle}
                    />
                    <Button
                        buttonStyle={styles.button}
                        onPress={() => console.log("Works!")}
                        title="Salir"
                        color="#3897f1"
                        titleStyle={styles.buttonTitleStyle}
                    />
                </View>
            </Wallpaper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 30,
      alignItems: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: 'center',
        color: "white"
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'column',
    },
    button: {
        height: 45,
        marginTop: 15,
        opacity: 0.6,
        borderRadius: 20,
    },
    buttonTitleStyle: {
        color: "white",
        fontSize: 20,
    },
});