import React,  {useEffect, useState, Component} from 'react';
import {
  StyleSheet,
  View,
  //Text,
  Platform,
  PermissionsAndroid,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import {
    Button,
    Container,
    Header,
    Left,
    Right,
    Icon,
    Text,
    Radio,
} from 'native-base';
import Boundary, {Events} from 'react-native-boundary';
import useBackgroundGeolocationTracker from './useBackgroundGeolocationTracker';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapView, { MAP_TYPES, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
//const LATITUDE = 22.720555;
const LATITUDE = 4.66130;
//const LONGITUDE = 75.858633;
const LONGITUDE = -74.1300;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Geofence = (props) => {
//class Geofence extends React.Component {

    /*static navigationOptions = {
        drawerLabel: 'OpenStreetMap',
        drawerIcon: ({ tintColor }) => (
        <Image
             //source={require('../image/Openstreetmap_logo.png')}
             style={{width:40,height:40}}
        />
       ),
    };*/

    /*constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
         };
    }*/
    
    const [state, setState] = useState({
        isEnter: false,
        region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        },
    });

    const location = useBackgroundGeolocationTracker();
    console.log('useTraking latitude', location.latitude);
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

    /*get mapType() {
       return this.props.provider === PROVIDER_DEFAULT ? MAP_TYPES.STANDARD : MAP_TYPES.NONE;
    }*/

    useEffect(() => {
        if (hasLocationPermission()) {
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
                    .then(() => console.log('success!'))
                    .catch((e) => console.log(e));
                console.log("Boundary added.");
            });
        }

        Boundary.on(Events.ENTER, (id) => {
            console.warn('Enter Boundary ', id);
            state.isEnter = true;
        });

        Boundary.on(Events.EXIT, (id) => {
            console.warn('Exit Boundary ', id);
            state.isEnter = false;
        });

    }, []);

    // Cluster Zone Location
    return (
        <Container>
            <Header>
                <Left style={{ flexDirection: 'row' }}>
                    <Icon onPress={() => props.navigation.openDrawer()} name="md-menu" style={{ color: 'white', marginRight: 15 }} />
                </Left>
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{ color: 'white' }}>OpenStreetMap</Text>
                </View>
                <Right>
                    <Icon name="md-cart" style={{ color: 'white' }} />
                </Right>
            </Header>
            <View >
                <MapView
                    region={state.region}
                    provider={PROVIDER_DEFAULT}
                    mapType={MAP_TYPES.STANDARD}
                    rotateEnabled={false}
                    style={{flex: 1}}
                    style={styles.map}
                    showsUserLocation={true}
                    followUserLocation={true}
                    zoomEnabled={true}
                    showsScale={true}
                    >
                    {/*Circle Draw and set radius */}
                    <UrlTile
                        urlTemplate={"http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                        shouldReplaceMapContent={true}
                        maximumZ={19}
                    />
                    <MapView.Circle
                        center={{
                            latitude: LATITUDE,
                            longitude: LONGITUDE
                        }}
                        radius={1500}
                        strokeWidth={2}
                        strokeColor={"red"}
                        fillColor={"rgba(230,238,255,0.5)"}
                    />
                    {/* Marker Add */}
                    <MapView.Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                        title={"Captain"}
                        description={"indore"}
                        //image={require("./images/login-logo.png")}
                        //pinColor={"gray"}
                    />
                </MapView>
            </View>

            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text>latitude : {location.latitude}</Text>
                    <Text>longitude : {location.longitude}</Text>
                    <Text>
                        Boundary entered : {state.isEnter ? 'Enter' : 'Not Enter'}
                    </Text>
                </View>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapConatiner: {
    flex: 3,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 40,
  },
  map: {
    width: 400,
    height: 800,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
   },
});

export default Geofence;
