import MapView, { Marker, Overlay, Polygon, Circle } from "react-native-maps";
import React, { useEffect, useState, Component } from "react";
import { StyleSheet, View, Image, ToastAndroid, Dimensions, } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import GeoFencing from "react-native-geo-fencing";

import Boundary, {Events} from 'react-native-boundary';
import useBackgroundGeolocationTracker from './useBackgroundGeolocationTracker';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 4.6428;
const LONGITUDE = -74.1564;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

//export default class GeofencingScreen extends Component {
const GeofencingScreen = (props) => {

  /*constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitute: 0,
      lat: 22.7196,
      lng: 75.8577,
      timestamp: null
    };
     markers: [{
        title: 'Captain',
        descripton:"indore",
        latitude:0,
        longitude: 0,
        timestamp: null
       },
      {
        title: 'Captain',
        descripton:"indore",
        latitude: 23.1793,
        longitude: 75.7849

      }]
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

  //componentDidMount() {
  useEffect(() => {

    if (hasLocationPermission()) {
      console.log("hasLocationPermission: ", hasLocationPermission());
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
              .catch(e => console.error("error :(", e));
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

    //-------------------- Start Get current location of user---------//
    /*Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitute: position.coords.longitude,
          timestamp: position.timestamp
        });
      },

      error => {
        console.log(error);
      },
      { enableHighAccuracy: false, timeout: 50000 }
    );*/
    //-----------------End current location of user--------//

    //-----------------Start geo fencing-------------//

    //-------Set fencing boundary for particular area--------------//
    /*polygon = [
      { lat: state.latitude, lng: state.longitute },
      { lat: state.lat, lng: state.lng },
      { lat: 22.7192, lng: 75.852 },
      { lat: state.latitude, lng: state.longitute }
      // last point has to be same as first point
    ];*/
    //-----------------End boundary of area--------------------//

    //-----------------another user point-----------//
    /*let point = {
      lat: 22.7192,
      lng: 75.852
    };*/

    //-----------------point end of user-------------//

    // set point and polygon on containsLocation method

    /*GeoFencing.containsLocation(point, polygon)
      .then(() => ToastAndroid.show("User is within area", ToastAndroid.SHORT))
      .catch(() =>
        ToastAndroid.show("User is not within area", ToastAndroid.SHORT)
      );*/
  }, []);

  //--------------------End geo fencing ------------//

  // console.log("latitude is=="+this.state.latitude);
  // console.log("longitute is=="+this.state.longitute)

  //render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
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

          {/*this.state.markers.map(marker => (
        <MapView.Marker
          coordinate={{longitude: marker.longitude, latitude: marker.latitude}}
          title={marker.title}
          description={marker.description}
        />
  ))*/}
          {/* Marker Add */}
          <MapView.Marker
            coordinate={{
              latitude: location.latitude == null ? LATITUDE : location.latitude,
              longitude: location.longitude == null ? LONGITUDE_DELTA : location.longitude
            }}
            title={"Captain"}
            description={"indore"}
            //image={require("./images/login-logo.png")}
            //pinColor={"gray"}
          />
          {/* 

          <MapView.Marker
            coordinate={{ latitude: 23.1793, longitude: 75.7849 }}
            title={"Captain"}
            description={"indore"}
            centerOffset={{ x: 20, y: 70 }}
          /> */}

          <Image
            //source={require("./images/ic_log_in_top.png")}
            style={{ width: 70, height: 70, marginTop: 10, paddingLeft: 10 }}
          />
          {/*<Overlay 
            image="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
            bounds={[
              [23.1793, 75.7849], 
              [this.state.latitude, this.state.longitute]
            ]}
          />*/}
        </MapView>
      </View>
    );
  //}
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default GeofencingScreen;