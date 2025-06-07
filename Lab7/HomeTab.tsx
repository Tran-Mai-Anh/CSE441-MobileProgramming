import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import {useRoute} from '@react-navigation/native';
import CustomerScreen from './CustomerScreen';
import Setting from './Setting';
import Icon from 'react-native-vector-icons/Ionicons';
import TransactionScreen from './TransactionScreen';

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
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarLabel: 'Transaction',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'cash' : 'cash-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerScreen}
        options={{
          tabBarLabel: 'Customer',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'people' : 'people-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'settings' : 'settings-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
