/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Products from './Products/Products';
import Product_Add from './Products/Product_Add';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    // <SafeAreaView>
    //   <Product_Add/>
    // </SafeAreaView>
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator>
          <Stack.Screen
            name="Products"
            component={Products}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Product_Add"
            component={Product_Add}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
