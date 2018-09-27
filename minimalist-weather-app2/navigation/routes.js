import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MapPage from '../components/mapPage';
import Weather from '../components/weather';

const navigationConfig = {
  initialRouteName: 'Maps',
  headerMode: 'float',
  navigationOptions: {
    title: 'Mojo Weather',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: 'black', borderWidth: 1, borderBottomColor: 'white' },
    headerBackTitle: 'Back to Map',
    headerTitleStyle: { color: 'white' }
  }
}
// nest stack navigator to handle two internal views
const Routes = createStackNavigator({
  // keys are the names of the "routes"
  Maps: { screen: MapPage},
  Weather: { screen: Weather},
},
navigationConfig
);

export default Routes;
