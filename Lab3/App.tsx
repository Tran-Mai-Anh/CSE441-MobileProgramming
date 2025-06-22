import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Products from './Products/Products';
import Product_Add from './Products/Product_Add';
import Product_Search from './Products/Product_Search';
import Product_Detail from './Products/Product_Detail';
import {NavigationContainer} from '@react-navigation/native';
import { Icon } from 'react-native-paper';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              source={focused ? 'cart' : 'cart-outline'}
              size={size}
              color={"black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Product_Add}
        options={{headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              source={focused ? 'plus-circle' : 'plus-circle-outline'}
              size={size}
              color={"black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Product_Search}
        options={{headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              source={focused ? 'card-search' : 'card-search-outline'}
              size={size}
              color={"black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Product_Detail}
        options={{headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              source={focused ? 'information-slab-circle' : 'information-slab-circle-outline'}
              size={size}
              color={"black"}
            />
          ),
        }}
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
