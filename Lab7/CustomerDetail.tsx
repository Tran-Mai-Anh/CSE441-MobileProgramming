import {Alert, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CustomerDetailProps} from './ScreenType';
import {useEffect, useState} from 'react';
import {Icon} from 'react-native-paper';
import axios from 'axios';
import { Customer } from './interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CustomerDetail({
  navigation,
  route,
}: CustomerDetailProps) {
  const item = route.params;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showMenu,setShowMenu] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
       <Pressable onPress={() => setShowMenu(prev => !prev)}>
          <Icon source="dots-vertical" size={30} color="white" />
        </Pressable>
      ),
    });

    async function getCustomer() {
      const response = await axios.get(
        `https://kami-backend-5rs0.onrender.com/Customers/${item._id}`,
      );
      console.log(response.data);
      setCustomer(response.data);
    }
    getCustomer();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('token').then(val => {
      setToken(val);
    });
  }, []);

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(
        `https://kami-backend-5rs0.onrender.com/Customers/${customer?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = () => {
    Alert.alert(
      'Alert',
      'Are you sure want to delete this client? This will not be possible to return.',
      [
        {
          text: 'Delete',
          onPress: () => handleDeleteCustomer(),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {showMenu && (
        <View style={styles.menuContainer}>
          <Pressable
            onPress={() =>
              navigation.navigate('EditCustomer', {
                name: customer?.name || '',
                phone: customer?.phone || '',
                id: customer?._id || '',
              })
            }>
            <View style={styles.menuIcon}>
              <Icon source={'pencil'} size={20} color="black" />
              <Text>Edit</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => handleDelete()}>
            <View style={styles.menuIcon}>
              <Icon source={'trash-can-outline'} size={20} color="black" />
              <Text>Delete</Text>
            </View>
          </Pressable>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.pinkBold}>General information</Text>
        <View style={styles.row}>
          <Text style={styles.blackBold}>Name: {customer?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.blackBold}>Phone: {customer?.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.blackBold}>Total spent: {customer?.totalSpent}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.blackBold}>Time:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.blackBold}>
            Last update: {new Date(customer?.createdAt || "").toLocaleDateString('vi-VN')}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.pinkBold}>Transaction history</Text>
        <View style={styles.containerCustomer}>
          <View style={styles.information}>
            <Text style={styles.title}>{customer?.transactions._id}</Text>
          </View>
          <View style={styles.containerPrice}>
            <Text style={styles.price} numberOfLines={1} ellipsizeMode="tail">
              <Text style={styles.currency}>đ</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerCustomer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingVertical: 15,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  information: {
    width: 270,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleRed: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'red',
  },
  customer: {
    color: '#828282',
  },
  containerPrice: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 100,
    paddingRight: 20,
  },
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  blackBold: {
    color: 'black',
    fontWeight: 'bold',
  },
  pinkBold: {
    fontWeight: 'bold',
    color: '#ef536d',
    marginBottom: 5,
  },
  grayBold: {
    color: '#828282',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rowService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    alignItems: 'center',
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
    color: '#828282',
  },
  price: {
    flex: 1,
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
  },
  currency: {
    textDecorationLine: 'underline',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    paddingTop: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: -20,
    right: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    backgroundColor: 'white',
    zIndex: 3,
    borderWidth: 1,
    borderColor: 'black',
  },
  menuIcon: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
