import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store, { initializeStore } from './src/Store';
import Contacts from './src/Contacts';
import Favorites from './src/Favorites';
import ProfileContact from './src/ProfileContact';

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Contacts"
          screenOptions={{
            drawerActiveTintColor: 'blue',
            drawerInactiveTintColor: 'grey',
          }}
        >
          <Drawer.Screen
            name="Contacts"
            component={Contacts}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="format-list-bulleted" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="Favorites"
            component={Favorites}
            options={{
              drawerIcon: ({ color }) => (
                <MaterialIcons name="star" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="ProfileContact"
            component={ProfileContact}
            options={{
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;