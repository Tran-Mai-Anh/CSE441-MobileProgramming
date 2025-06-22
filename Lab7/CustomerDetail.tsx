import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CustomerDetailProps} from './ScreenType';
import {useEffect, useState} from 'react';
import {Icon} from 'react-native-paper';
import axios from 'axios';

export default function CustomerDetail({
  navigation,
  route,
}: CustomerDetailProps) {
  const item = route.params;
  const [customerDetail, setCustomerDetail] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable>
          <Icon source="dots-vertical" size={30} color="white" />
        </Pressable>
      ),
    });

    async function getCustomer() {
      const response = await axios.get(
        `https://kami-backend-5rs0.onrender.com/Customers/${item._id}`,
      );
      console.log(response.data);
      setCustomerDetail(response.data);
    }
    getCustomer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pinkBold}>General information</Text>
        <View style={styles.row}>
          <Text style={styles.blackBold}>Name: {item.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.blackBold}>Phone: {item.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.blackBold}>Total spent: {item.totalSpent}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.blackBold}>Time:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.blackBold}>
            Last update: {new Date(item.createdAt).toLocaleDateString('vi-VN')}
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.pinkBold}>Transaction history</Text>
        <View style={styles.containerCustomer}>
          <View style={styles.information}>
            <Text style={styles.title}>{item.transactions._id}</Text>
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
});
