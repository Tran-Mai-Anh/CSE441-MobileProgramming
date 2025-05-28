import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  const route = useRoute();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#ef536d',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Home}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({color, size}) => (
            <Icon name="money" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={Home}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Home}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({color, size}) => (
            <Icon name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
