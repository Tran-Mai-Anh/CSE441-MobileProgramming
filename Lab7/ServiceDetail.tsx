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
import {ServiceDetailProps} from './ScreenType';
import {Button} from 'react-native-paper';
import axios from 'axios';

export default function ServiceDetail({navigation, route}: ServiceDetailProps) {
  const item = route.params;
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={styles.icon} onPress={() => deleteModal()}>
          <Icon source="dots-vertical" size={30} color="white" />
        </Pressable>
      ),
    });
  }, []);

  async function handleDelete() {
    const response = await axios.delete(
      `https://kami-backend-5rs0.onrender.com/services/${item._id}`,
      {headers: {Authorization: `Bearer ${token}`}},
    );
  }

  function deleteModal() {
    Alert.alert(
      'Warning',
      'Are you sure you want to remove this service? This operation cannot be returned',
      [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDelete(),
        },
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>
          <Text style={styles.title}>Service name:</Text> {item.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Price:</Text>{' '}
          {item.price.toLocaleString('vi-VN')} đ
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Creator:</Text> {item.createdBy}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Time:</Text> {' '}
          {new Date(item.createdAt).toLocaleDateString('vi-VN')}{' '}
          {new Date(item.createdAt).toLocaleTimeString('vi-VN')}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.title}>Final update:</Text>{' '}
          {new Date(item.updatedAt).toLocaleDateString('vi-VN')}{' '}
          {new Date(item.updatedAt).toLocaleTimeString('vi-VN')}
        </Text>
        <Button
          onPress={() => navigation.navigate('EditService', item)}
          mode="contained"
          style={styles.button}
          labelStyle={styles.label}>
          Edit
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    paddingTop: 10,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
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
