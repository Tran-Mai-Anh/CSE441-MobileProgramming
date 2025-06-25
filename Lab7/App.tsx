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
import AddService from './AddService.tsx';
import HomeTab from './HomeTab.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from './RootStackParamList.ts';
import AddCustomer from './AddCustomer.tsx';
import TransactionDetail from './TransactionDetail.tsx';
import CustomerDetail from './CustomerDetail.tsx';
import EditService from './EditService.tsx';
import ServiceDetail from './ServiceDetail.tsx';
import EditCustomer from './EditCustomer.tsx';
import AddTransaction from './AddTransaction.tsx';

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
            headerTitle:'Service',
            headerStyle: {
              backgroundColor: '#ef536d',
            },
          }}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#EF506B',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: '#fff',
              fontWeight: 'bold',
            },
            headerTitle:'Service detail',
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
            headerTitle:'Service',
          }}
          name="EditService"
          component={EditService}
        />
        <Stack.Screen name='AddCustomer' component={AddCustomer} options={{
          headerStyle:{
            backgroundColor:'#EF506B',
          },
          headerTitle:'Add customer',
          headerTintColor:'white',
        }}/>
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#EF506B',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: '#fff',
              fontWeight: 'bold',
            },
            headerTitle:'Transaction detail',
          }}
          name="TransactionDetail"
          component={TransactionDetail}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#EF506B',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: '#fff',
              fontWeight: 'bold',
            },
            headerTitle:'Customer detail',
          }}
          name="CustomerDetail"
          component={CustomerDetail}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#EF506B',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: '#fff',
              fontWeight: 'bold',
            },
            headerTitle:'Customer Edit',
          }}
          name="EditCustomer"
          component={EditCustomer}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#EF506B',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              color: '#fff',
              fontWeight: 'bold',
            },
            headerTitle:'Add Transaction',
          }}
          name="AddTransaction"
          component={AddTransaction}
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
