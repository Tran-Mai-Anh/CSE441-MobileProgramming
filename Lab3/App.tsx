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

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <Product_Add/>
    </SafeAreaView>
  );
}

export default App;
