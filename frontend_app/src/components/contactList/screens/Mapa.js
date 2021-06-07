import React from "react"
import { StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../utils/colors';
import store from '../store';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 4.6428;
const LONGITUDE = -74.1564;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
        ],
        location: store.getState().location,
    }

    async componentDidMount() {
        const TIME_INTERVAL_MILISEG = 1000;
        this._isMounted = true;

        this.unsubscribe = store.onChange(() => {
            if (this._isMounted) {
                this.setState({
                    location: store.getState().location,
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.unsubscribe();
    }

    render() {
        const { location } = this.state;
        //console.log("Location latitud: ", location.latitude);
        //console.log("Location longitud: ", location.longitude);
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
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }}
                showsUserLocation={true}
                followUserLocation={true}
                zoomEnabled={true}
                showsScale={true}
            >
                {/*<MapView.Marker coordinate={coordinate} />*/}
                {this.state.markers.map(marker => (
                    <MapView.Marker 
                        coordinate={marker.coordinates}
                        title={marker.title}
                    />
                ))}
                {/* Marker Add */}
                <MapView.Marker
                    coordinate={{
                    latitude: location.latitude == null ? LATITUDE : location.latitude,
                    longitude: location.longitude == null ? LONGITUDE_DELTA : location.longitude
                    }}
                    title={"Yo"}
                    description={""}
                    //image={require("./images/login-logo.png")}
                    pinColor={"green"}
                />
                {/*Circle Draw and set radius */}
                <MapView.Circle
                    key={(LATITUDE + LONGITUDE).toString()}
                    center={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE
                    }}
                    radius={1500}
                    strokeWidth={2}
                    strokeColor={"red"}
                    fillColor={"rgba(230,238,255,0.5)"}
                    // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                />
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