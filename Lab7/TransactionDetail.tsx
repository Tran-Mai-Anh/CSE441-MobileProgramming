import {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-paper';
import {TransactionDetailProps} from './ScreenType';
import {Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TransactionDetail({
  navigation,
  route,
}: TransactionDetailProps) {
  const item = route.params;

  const[showMenu,setShowMenu] = useState<boolean>(false);
const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    AsyncStorage.getItem('token').then(val => {
      setToken(val);
    });
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
       <Pressable style={styles.icon} onPress={() => setShowMenu(prev => !prev)}>
          <Icon source="dots-vertical" size={30} color="white" />
        </Pressable>
      ),
    });
  }, []);

  const handleDeleteTransaction = async () => {
    try {
      await axios.delete(
        `https://kami-backend-5rs0.onrender.com/transactions/${item._id}`,
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
      'Warning',
      'Are you sure want to cancel this transaction? This will affect customer transaction information.',
      [
        {
          text: 'Yes',
          onPress: () => handleDeleteTransaction(),
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
      
      <View style={styles.content}>
         {showMenu && (
              <View style={styles.menuContainer}>
                <Pressable>
                  <View style={styles.menuIcon}>
                    
                    <Text>See more detail</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => handleDelete()}>
                  <View style={styles.menuIcon}>
                    
                    <Text style={styles.textError}>Cancel transaction</Text>
                  </View>
                </Pressable>
              </View>
            )}
        <Text style={styles.pinkBold}>General information</Text>
        <View style={styles.row}>
          <Text style={styles.grayBold}>Transaction code</Text>
          <Text style={styles.blackBold}>{item.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayBold}>Customer</Text>
          <Text style={styles.blackBold}>
            {item.customer.name} - {item.customer.phone}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayBold}>Creation time</Text>
          <Text style={styles.blackBold}>
            {new Date(item.createdAt).toLocaleDateString('vi-VN')}{' '}
            {new Date(item.createdAt).toLocaleTimeString('vi-VN')}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.pinkBold}>Services list</Text>
        {item.services.map(service => (
          <View key={service._id} style={styles.rowService}>
            <Text style={{flex: 2}}>{service.name}</Text>
            <Text style={styles.quantity}>x {service.quantity}</Text>
            <Text style={styles.price}>
              {(service.price * service.quantity).toLocaleString('vi-VN')}{' '}
              <Text style={styles.currency}>đ</Text>
            </Text>
          </View>
        ))}
        <View style={styles.total}>
          <Text style={styles.grayBold}>Total</Text>
          <Text style={styles.blackBold}>
            {item.priceBeforePromotion.toLocaleString('vi-VN')}{' '}
            <Text style={styles.currency}>đ</Text>
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.pinkBold}>Cost</Text>
        <View style={styles.row}>
          <Text style={styles.grayBold}>Amount of money</Text>
          <Text style={styles.blackBold}>
            {item.priceBeforePromotion.toLocaleString('vi-VN')}{' '}
            <Text style={styles.currency}>đ</Text>
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.grayBold}>Discount</Text>
          <Text style={styles.blackBold}>
            -{(item.priceBeforePromotion - item.price).toLocaleString('vi-VN')}{' '}
            <Text style={styles.currency}>đ</Text>
          </Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.blackBold}>Total payment</Text>
          <Text style={styles.pinkBold}>
            {item.price.toLocaleString('vi-VN')}{' '}
            <Text style={styles.currency}>đ</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
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
    marginTop:10,
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
  textError:{
    color:"red"
  }
});
