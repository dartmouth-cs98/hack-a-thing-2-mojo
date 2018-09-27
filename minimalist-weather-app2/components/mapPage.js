import React, { Component }  from 'react';
import { StyleSheet, Text, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE,  Marker } from "react-native-maps";
import { Button } from 'react-native';
import { API_KEY } from '../utils/WeatherAPIKey';
import Weather from './weather';
import { weatherConditions } from '../utils/WeatherConditions';

class MapPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        currLocation: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 90,
          longitudeDelta: 60,
        },
        selected: false
      };
      this.getWeather = this.getWeather.bind(this);
    }

  getWeather(lat, long) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}&units=Imperial`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          selected: false //reset?
        });
        var apiK = 'AIzaSyDmrBRNM66Qcsy2_zJ-YoSVEEq3gzd-FgQ';
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + apiK)
        .then(res2 =>
          res2.json())
        .then(json2 => {
          this.props.navigation.navigate('Weather', { weather:json.weather[0].main, temp:json.main.temp, area:json2.status=='OK'?json2.results[0].formatted_address:""})
        })
        .catch(err => console.log(err))
      });
  }

  render() {
    const {selected} = this.state;
    const latitudeDelta = this.state.currLocation.latitudeDelta;
    const longitudeDelta = this.state.currLocation.longitudeDelta;
    const marker = {latlng:{latitude: this.state.currLocation.latitude,
      longitude: this.state.currLocation.longitude}};
    return (
      <View style={styles.container}>
        {selected ? (
          <View style={styles.loading}>
            <Text>Fetching The Weather</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) :
        (
          <View style={styles.touch} >
            <Text style={styles.title}>
              Drop Pin on a Location to show Weather!
            </Text>
            <MapView
              style={ styles.map }
              provider={PROVIDER_GOOGLE}
              region={this.state.currLocation}>
              <Marker draggable
                coordinate={marker.latlng}
                onDragEnd={(e) => {
                  this.setState({selected: true,
                    currLocation: {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                  }});
                  this.getWeather(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
                }
              }
              />
            </MapView>
        </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  touch: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    position: 'absolute',
    zIndex:1000,
    fontSize: 23,
    top: '3%',
    color: '#000000',
    alignSelf: 'center'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default MapPage;
