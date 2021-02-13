import React, {Component} from 'react';

import { View, Text, StyleSheet, Picker, Dimensions } from 'react-native';

import Wallpaper from './Wallpaper';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class CrearSolicitudServicioScreen extends Component {

    state = {
        tipoServicio: ''
    }
    updateState = (tipoServicio) => {
        this.setState({
            tipoServicio: tipoServicio
        })
     }

    render() {
        return (
            <Wallpaper>
                <View style={styles.container}>
                    <Text style={styles.text}>Crear Solicitud de Servicio</Text>
                    <Picker
                        selectedValue={this.state.tipoServicio}
                        style={styles.pickerStyle}
                        onValueChange = {this.updateState}
                    >
                        <Picker.Item label="Tipo de Servicio" value="" enabled={false} />
                        <Picker.Item label="Carpintero" value="carpintero" />
                        <Picker.Item label="Plomero" value="plomero" />
                    </Picker>
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
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: 'center',
        color: "white"
    },
    pickerStyle:{  
        height: 50,
        width: "80%",
        color: '#344953',
        justifyContent: 'center',
        backgroundColor: "#d3d3d3",
        marginLeft: 20,
    },
});