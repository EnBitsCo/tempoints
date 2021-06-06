import React from "react"
import { StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../utils/colors';

export default class Mapa extends React.Component {

    state = {
        markers: [
            {
                title: 'C.C. Trébolis',
                coordinates: {
                    latitude: 4.66626855114101,
                    longitude:  -74.13630787412231,
                },
            },
            {
                title: 'Jumbo Hayuelos',
                coordinates: {
                    latitude: 4.6625,
                    longitude: -74.1321
                },
            },
            {
                title: 'C.C. Salitre Plaza',
                coordinates: {
                    latitude: 4.6532,
                    longitude: -74.1093
                },  
            }
        ]
    }

    render() {
        const { navigation } = this.props;

        const options = {
            title: 'Zonas TemPoints',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <MaterialIcons
                    name="menu"
                    size={24}
                    style={{ color: colors.black, marginLeft: 10 }}
                    onPress={() => navigation.toggleDrawer()}
                />
            ),
        };

        this.props.navigation.setOptions(
            options,
        );

        return (
            <MapView
                //style={styles.map}
                style={{ ...StyleSheet.absoluteFillObject }}
                initialRegion={{
                    latitude: 4.6736890,
                    longitude: -74.1436710,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.04,
                }}
            >
                {/*<MapView.Marker coordinate={coordinate} />*/}
                {this.state.markers.map(marker => (
                    <MapView.Marker 
                        coordinate={marker.coordinates}
                        title={marker.title}
                    />
                ))}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
});