import React, { Component } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, TouchableHighlight } from 'react-native';
import { API_KEY } from './utils/WeatherAPIKey';
import Weather from './components/weather';

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        temperature: 0,
        weatherCondition: null,
        area: null,
        country: null,
        error: null
      };
    }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=Imperial`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          area: json.name,
          country:json.sys.country,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading } = this.state;
    console.log(isLoading);
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <Text>Fetching The Weather</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
            <Weather weather={this.state.weatherCondition} temperature={this.state.temperature} country={this.state.country} area={this.state.area}/>
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
    justifyContent: 'center'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
