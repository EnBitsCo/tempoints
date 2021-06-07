import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Linking,
    Dimensions,
    PermissionsAndroid,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import ContactListItem from '../components/ContactListItem';
import DetailListItem from '../components/DetailListItem';

import { fetchContacts, fetchProductos } from '../utils/api';
import colors from '../utils/colors';
import getURLParams from '../utils/getURLParams';
import store from '../store';
import { millisecondsToHuman } from '../utils/TimerUtils';

import Boundary, {Events} from 'react-native-boundary';
import useBackgroundGeolocationTracker from '../../../components/useBackgroundGeolocationTracker';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 4.6428;
const LONGITUDE = -74.1564;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GeoTempoint = (props) => {
    
    const [isMounted, setIsMounted] = useState(false);
    let [productosSorted, setProductosSorted] = useState(null);
    let [productos, setProductos] = useState("");
    
    const [state, setState] = useState(
        {
            productos: store.getState().productos,
            elapsed: store.getState().elapsed,
            loading: store.getState().isFetchingContacts,
            error: store.getState().error,
            isEnter: false,
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        }
    );

    const productosKeyExtractor = ({ id }) => id;
    
    const unsubscribe = store.onChange(() => {
        if (isMounted) {
            setState({
                productos: store.getState().productos,
                elapsed: store.getState().elapsed,
                loading: store.getState().isFetchingContacts,
                error: store.getState().error,
            });
        }
    });

    const TIME_INTERVAL_MILISEG = 1000;
    let { elapsed } = state;
    
    const location = useBackgroundGeolocationTracker();
    //console.log('useTraking latitude', location.latitude);
  
    const hasLocationPermission = async () => {
      // if (Platform.OS === 'ios') {
      //   Geolocation.requestAuthorization('always');
      // }
  
      if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
      }
    };

    useEffect(() => {
        const fetchData = async () =>  {
            setIsMounted(true);

            productos = await fetchProductos();
            setProductos(productos);

            setProductosSorted(productos.sort((a, b) =>
                a.nombre.localeCompare(b.nombre)));
        }

        fetchData();

        const intervalId = setInterval(() => {
                elapsed = elapsed + TIME_INTERVAL_MILISEG;
                setState(state => ({ elapsed: elapsed, }));
            }, TIME_INTERVAL_MILISEG);

        if (hasLocationPermission()) {
            //console.log("hasLocationPermission: ", hasLocationPermission());
            store.setState({ location });
        }
        
        return () => {
            setIsMounted(false);
            unsubscribe();
            clearInterval(intervalId);
        }

    }, [elapsed, location]);

    const elapsedString = millisecondsToHuman(elapsed);

    const renderProducto = ({ item }) => {
        const { navigation: { navigate } } = props;
        const { id, nombre, urlImagen, tempoints } = item;

        return (
            <ContactListItem
                name={nombre}
                avatar={urlImagen}
                phone={tempoints}
                onPress={() => navigate('ProfileProducto', { producto: item })}
            />
        );
    };

    const { navigation } = props;

    const options = {
        title: 'Mis Tempoints',
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

    props.navigation.setOptions(
        options,
    );

    // Define las coordenadas geográficas de una zona TemPoints.
    const BoundaryData = [
        {
            //lat: 40.9736396,
            lat: LATITUDE,
            //lng: 29.0454794,
            lng: LONGITUDE,
            radius: 1500,
            id: 'Company',
        },
    ];
    BoundaryData.map((boundary) => {
        Boundary.add(boundary)
            .then(() => console.debug('success!'))
            .catch(e => console.error("error :( [You get GEOFENCE_NOT_AVAILABLE (code '1000') when user disagrees to 'Use Google' location services' in Settings -> Location -> Mode]", e));
        console.debug("Boundary added.");
    });

    Boundary.on(Events.ENTER, (id) => {
        console.warn('Enter Boundary ', id);
        state.isEnter = true;
    });
      
    Boundary.on(Events.EXIT, (id) => {
        console.warn('Exit Boundary ', id);
        state.isEnter = false;
    });

    return(
        <View style={{paddingTop: 15, }}>
            <View style={styles.previewContainer}>
                <View style={styles.item}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", }}>
                        <Text style={[styles.title, { color: "lightgreen", paddingRight: 15, }]}>Zona TemPoints</Text>
                        <Icon
                            style={{ color: "lightgreen", }}
                            name={'hourglass-half'}
                            size={22}
                        />
                    </View>
                    <View style={{justifyContent: "center", alignItems: "center", paddingTop: 5, }}>
                        <Text style={[styles.title]}>C.C. El Mejor</Text>
                    </View>
                </View>
                <View style={styles.item, {justifyContent: "space-between", alignItems: "center", }}>
                    <Text style={[styles.title, {alignSelf: "center", }]}>Tiempo: {elapsedString}</Text>
                    <Text style={[styles.title, {alignSelf: "center", }]}>TemPoints: 3</Text>
                </View>
            </View>
            <View style={{paddingTop: 25, paddingBottom: 15, }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.greyDark, textAlign: "center", }}>Destacados</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={productosSorted}
                    keyExtractor={productosKeyExtractor}
                    renderItem={renderProducto}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        minHeight: 200,
    },
    title: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 16,
    },
    previewContainer: {
        flexDirection: "row",
    },
    item: {
        width: '50%',
    },
});

export default GeoTempoint;