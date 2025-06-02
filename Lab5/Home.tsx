import {Pressable, StatusBar} from 'react-native';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import axios from 'axios';
import React from 'react';
import { Service } from './interfaces';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home({navigation}) {
  const [service, setService] = useState<Service[]>([]);

  useEffect(() => {
    async function getService() {
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/services',
      );
      console.log(response.data);
      setService(response.data);
    }
    getService();
  }, []);

  const renderItem = (item:Service) => (
    <Pressable onPress={() => navigation.navigate('ServiceDetail',item)}>
      <View style={styles.containerCategory}>
        <Text style={styles.titleList}>{item.name}</Text>
        <Text>
          {item.price.toLocaleString('vi-VN')}{' '}
          <Text style={styles.currency}>đ</Text>
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={{backgroundColor:'#ef536d'}}>
      <StatusBar barStyle={'light-content'}></StatusBar>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>HUYỀN TRINH</Text>
          <Icon name="person-circle" size={40} color="white" />
        </View>
        <Image
          style={styles.image}
          source={require('./assets/images/logo.jpg')}
        />
        <View style={styles.containerList}>
          <Text style={styles.titleList}>Danh sách dịch vụ</Text>
          <Icon name="add-circle" size={50} color="#ef536d" onPress={() => navigation.navigate('AddService')}/>
        </View>
        <FlatList
          data={service}
          keyExtractor={item => item._id}
          renderItem={({item})=>renderItem(item)}
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
  header: {
    backgroundColor: '#ef536d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    textAlignVertical: 'center',
    height: 50,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  image: {
    marginHorizontal: 85,
    color: 'red',
  },
  containerList: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titleList: {
    color: 'black',
    fontWeight: 'bold',
  },
  containerCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderColor: '#e7e7e7',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  currency: {
    textDecorationLine: 'underline',
  },
  flatList: {
    marginBottom: 390,
  },
});
