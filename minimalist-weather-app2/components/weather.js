import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = (props) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[props.navigation.state.params.weather].color }
      ]}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[props.navigation.state.params.weather].icon}
          color={'#fff'}
        />
        <Text style={styles.tempText}>{props.navigation.state.params.temp}˚F</Text>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{weatherConditions[props.navigation.state.params.weather].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[props.navigation.state.params.weather].subtitle}
        </Text>
      </View>
      <View style={styles.bodyContainer2}>
        <Text style={styles.title2}>{props.navigation.state.params.area}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    width: '100%'
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 25
  },
  bodyContainer2: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 25,
    marginBottom: 25
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  title2: {
    fontSize: 40,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default Weather;
