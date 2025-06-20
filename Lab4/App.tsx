/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
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

const Stack = createStackNavigator();

function ContactsScreens(){
  return(
    <Stack.Navigator 
    initialRouteName="Contacts"
    screenOptions={
      headerShown:true
    }
    >
      <Stack.Screen name='Contacts' component={Contacts} options={{title:'Contacts'}}/>
      <Stack.Screen name='ProfileContact' component={ProfileContact} options={{title:'Profile contact'}}/>
    </Stack.Navigator>
  );
}

function FavoriteScreens(){
  return(
    <Stack.Navigator
    initialRouteName="Favorites"
    screenOptions={
      headerShown:true
    }
    >
<Stack.Screen name='Favorites' component={Favorites} options={{title:'Favorites'}}/>
      <Stack.Screen name='ProfileContact' component={ProfileContact} options={{title:'Profile contact'}}/>
    </Stack.Navigator>
  );
}

const Tab=createMaterialBottomTabNavigator();
const TabNavigator=()=>{
  return(
    <Tab.Navigator
    initialRouteName='ContactsScreens'
    barStyle={{backgroundColor:"blue"}}
    labeled={false}
    activeTintColor={"greyLight"}
    inactiveColor={"greyDark"}
    >
      <Tab.Screen name="Contacts" component={ContactsScreens}
      options={{
        tabBarIcon:'format-list-bulleted',
      }}/>
      <Tab.Screen name="Favorites" component={FavoritesScreens}
      options={{
        tabBarIcon:'star-check',
      }}/>
    </Tab.Navigator>
  )
}

const App=()=>{
  return(
    <Provider store={Store}>
      <NavigationContainer>
        <TabNavigator/>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
