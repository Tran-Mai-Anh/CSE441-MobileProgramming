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
import Login from './Login.tsx';
import Home from './Home';
import AddService from './AddService';
import ServiceDetail from './ServiceDetail';
import HomeTab from './HomeTab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from './RootStackParamList.ts';
import EditService from './EditService.tsx';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // <StatusBar backgroundColor={"blue"} barStyle={'dark-content'}/>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddService"
          component={AddService}
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#ef536d',
            },
          }}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerBackTitle: 'HomeTab',
            headerStyle: {
              backgroundColor: '#EF506B',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: '#fff',
              fontWeight: 'bold',
            },
          }}
          name="ServiceDetail"
          component={ServiceDetail}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#EF506B',
            },
            headerTintColor: 'white',
          }}
          name="EditService"
          component={EditService}
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
