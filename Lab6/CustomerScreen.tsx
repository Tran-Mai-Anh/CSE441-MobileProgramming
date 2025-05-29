import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Customer} from './interfaces';
import axios from 'axios';
import {FlatList, Text} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-paper';

export default function CustomerScreen() {
  const [customer, setCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    async function getCustomer() {
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/customers',
      );
      console.log(response.data);
      setCustomer(response.data);
    }
    getCustomer();
  }, []);

  const renderItem = (item: Customer) => (
    <View style={styles.containerCustomer}>
      <View>
        <Text>
          <Text style={styles.title}>Customer: </Text>
          {item.name}
        </Text>
        <Text>
          <Text style={styles.title}>Phone: </Text>
          {item.phone}
        </Text>
        <Text>
          <Text style={styles.title}>Total money: </Text>
          <Text style={styles.price}>{item.totalSpent} <Text style={styles.currency}>đ</Text></Text>
        </Text>
      </View>
      <View style={styles.containerStatus}>
        <Icon source="crown" size={24} color="#ef536d" />
        <Text>{item.loyalty}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Customer</Text>
        </View>
        <FlatList
          data={customer}
          keyExtractor={item => item._id}
          renderItem={({item}) => renderItem(item)}
          style={styles.flatList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  header: {
    backgroundColor: '#ef536d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    textAlignVertical: 'center',
    height: 50,
  },
  containerCustomer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 50,
    paddingVertical: 15,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  flatList: {
    marginBottom: 80,
    marginTop: 15,
  },
  title:{
    color:'#828282',
    fontWeight:'bold',
  },
  price:{
    color:'#ef536d',
    fontWeight:'bold',
  },
  currency:{
    color:'#ef536d',
    fontWeight:'bold',
    textDecorationLine:'underline',
  },
  containerStatus:{
    justifyContent:'center',
    alignContent:'center',
  }
});
