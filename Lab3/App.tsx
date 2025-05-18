import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Products from './Products/Products';
import Product_Add from './Products/Product_Add';
import Product_Search from './Products/Product_Search';
import Product_Detail from './Products/Product_Detail';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) =>  <Ionicons name="bag-outline" color={color} size={26}/>,
        }}
      />
      <Tab.Screen
        name="Add"
        component={Product_Add}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={Product_Search}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Detail"
        component={Product_Detail}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
