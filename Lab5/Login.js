import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  async function handleLogin() {
    const data = await axios({
      method: 'post',
      url: 'https://kami-backend-5rs0.onrender.com/auth',
      data: {
        Phone: phone,
      },
    });
    console.log(data.data);
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        onChangeText={value => {
          setPhone(value);
          console.log({phone});
        }}
        theme={{roundness: 10}}
        style={styles.inputPhone}
        mode="outlined"
        label="Phone"
        right={<TextInput.Affix text="/100" />}
      />
      <TextInput
        onChangeText={value => {
          setPassword(value);
          console.log({password});
        }}
        theme={{roundness: 10}}
        mode="outlined"
        label="Password"
        right={<TextInput.Affix text="/100" />}
      />
      <Button mode="contained" style={styles.button} labelStyle={styles.label} onPress={()=>handleLogin}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 50,
  },
  inputPhone: {
    marginBottom: 8,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#ef536d',
    textAlign: 'center',
    marginBottom: 30,
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
});

export default Login;
