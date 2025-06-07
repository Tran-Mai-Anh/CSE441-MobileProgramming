import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

export default function AddService() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function addService() {
    console.log(token);
    try {
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/services',
        {
          name,
          price: Number(price),
        },
        {headers: {Authorization: `Bearer ${token}`}},
      );
      console.log(response.data);
    } catch (e) {
      console.log('Error');
    }
  }
  useEffect(() => {
    AsyncStorage.getItem('token').then(val => {
      setToken(val);
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Service name *</Text>
        <TextInput
          onChangeText={value => {
            setName(value);
          }}
          style={{marginBottom: 15}}
          theme={{roundness: 10}}
          mode="outlined"
          label="Input a service name"
        />
        <Text style={styles.title}>Price *</Text>
        <TextInput
          onChangeText={value => {
            const price = parseFloat(value);
            if (isNaN(price)) {
              return;
            }
            setPrice(value);
          }}
          style={{marginBottom: 10}}
          theme={{roundness: 10}}
          mode="outlined"
          label="Price"
        />
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.label}
          onPress={() => addService()}>
          Add
        </Button>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    backgroundColor: '#ef536d',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 5,
    fontSize: 20,
  },
  label: {
    fontSize: 18,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
});
