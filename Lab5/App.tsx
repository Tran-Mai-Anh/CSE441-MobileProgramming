/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Home from './Home';
import AddService from './AddService';
import ServiceDetail from './ServiceDetail';
import HomeTab from './HomeTab';

const Stack = createStackNavigator();

export default function App() {
  return (
    // <StatusBar backgroundColor={"blue"} barStyle={'dark-content'}/>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
        <Stack.Screen
          name="AddService"
          component={AddService}
          options={{
            headerShown: true,
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#ef536d',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
