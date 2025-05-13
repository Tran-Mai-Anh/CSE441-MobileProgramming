import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Products from './Products/Products';
import Product_Add from './Products/Product_Add';
import Product_Search from './Products/Product_Search';
import Product_Detail from './Products/Product_Detail';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2296f3',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Product_Add}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Product_Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Product_Detail}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Product_Add" component={Product_Add} />
        <Stack.Screen name="Product_Detail" component={Product_Detail} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
