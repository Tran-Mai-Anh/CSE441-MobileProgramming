import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

export default function EditCustomer() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function addCustomer() {
    console.log(token);
    try {
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/customers',
        {
          name,
          phone: Number(phone),
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
        <Text style={styles.title}>Customer name *</Text>
        <TextInput
          onChangeText={value => {
            setName(value);
          }}
          style={{marginBottom: 15}}
          theme={{roundness: 10}}
          mode="outlined"
          label="Input your customer's name"
        />
        <Text style={styles.title}>Phone *</Text>
        <TextInput
          onChangeText={value => {
            const phone = parseFloat(value);
            if (isNaN(phone)) {
              return;
            }
            setPhone(value);
          }}
          style={{marginBottom: 10}}
          theme={{roundness: 10}}
          mode="outlined"
          label="Input phone number"
        />
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.label}
          onPress={() => addCustomer()}>
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
