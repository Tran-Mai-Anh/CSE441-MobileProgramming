import {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const Product_Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');

  const handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        images: images,
      }),
    })
      .then(res => res.json())
      .then(console.log);
    Alert.alert('Add successful');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Add a Product</Text>
        <Text style={styles.title}>Title</Text>
        <TextInput
          onChangeText={setTitle}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter title"></TextInput>
        <Text style={styles.title}>Description</Text>
        <TextInput
          onChangeText={setDescription}
          keyboardType="numeric"
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter description"></TextInput>
        <Text style={styles.title}>Price</Text>
        <TextInput
          onChangeText={setDiscountPercentage}
          keyboardType="numeric"
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter price"></TextInput>
        <Text style={styles.title}>Discount Percentage</Text>
        <TextInput
          onChangeText={setRating}
          keyboardType="numeric"
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter discount percentage"></TextInput>
        <Text style={styles.title}>Rating</Text>
        <TextInput
          onChangeText={setStock}
          keyboardType="numeric"
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter rating"></TextInput>
        <Text style={styles.title}>Stock</Text>
        <TextInput
          onChangeText={setBrand}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter stock"></TextInput>
        <Text style={styles.title}>Brand</Text>
        <TextInput
          onChangeText={setCategory}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter brand"></TextInput>
        <Text style={styles.title}>Category</Text>
        <TextInput
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter category"></TextInput>
        <Text style={styles.title}>Images</Text>
        <TextInput
          onChangeText={setImages}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter images URL(s)"></TextInput>
        <Button
          style={styles.button}
          onPress={handleSubmit}
          mode="contained"
          contentStyle={styles.buttonContent}>
          SUBMIT
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffbfe',
  },
  header: {
    color: '#2220ff',
    fontSize: 18,
    fontWeight: '800',
  },
  title: {
    color: '#757375',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fffbfe',
    paddingHorizontal: 3,
  },
  button: {
    borderRadius: 0,
  },
  buttonContent: {
    backgroundColor: '#2296f3',
  },
});

export default Product_Add;
