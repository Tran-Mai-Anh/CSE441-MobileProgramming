import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const multiSet = async (phone, password, token) => {
    const firstPair = ['phone', phone];
    const secondPair = ['password', password];
    const thirdPair = ['token', token];
    try {
      await AsyncStorage.multiSet([firstPair, secondPair, thirdPair]);
    } catch (e) {
      //save error
    }
    console.log('Done.');
  };

  async function handleLogin() {
    const response = await axios.post(
      'https://kami-backend-5rs0.onrender.com/auth',
      {
        phone,
        password,
      },
    );
    if (response.data && response.data.token) {
      await multiSet(phone, password, response.data.token);
      navigation.navigate('HomeTab');
    } else {
      Alert.alert(JSON.stringify('No data'));
    }
    console.log(response.data);
  }

  useEffect(() => {
    async function setData() {
      const values = await AsyncStorage.multiGet(['phone', 'password']);
      console.log(values);
      setPhone(values[0][1]);
      setPassword(values[1][1]);
    }
    setData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        onChangeText={value => {
          setPhone(value);
        }}
        value={phone}
        theme={{roundness: 10}}
        style={styles.inputPhone}
        mode="outlined"
        label="Phone"
        right={<TextInput.Affix text={`${phone.length} /10`} />}
      />
      <TextInput
      value={password}
        secureTextEntry={hidePassword}
        onChangeText={value => {
          setPassword(value);
        }}
        theme={{roundness: 10}}
        mode="outlined"
        label="Password"
        right={
          <TextInput.Icon
            onPress={() => setHidePassword(prev => !prev)}
            icon={hidePassword ? 'eye' : 'eye-off'}
          />
        }
      />
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={styles.label}
        onPress={() => handleLogin()}>
        Login
      </Button>
    </View>
  );
}

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
