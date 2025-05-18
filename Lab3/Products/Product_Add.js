import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

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

  const navigation = useNavigation();
  const route = useRoute();

  const handleSubmit = () => {
    const newProduct = {
      id: Date.now().toString(),
      title: title,
      description: description,
      price: price,
      discountPercentage: discountPercentage,
      rating: rating,
      stock: stock,
      brand: brand,
      category: category,
      images: images,
      thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
    };

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
      //.then(console.log);
      .then(data => {
        console.log(data);
        Alert.alert('Add successful');
        const onAddProduct = route.params?.onAddProduct;
        console.log(onAddProduct);
        if (onAddProduct) {
          onAddProduct(newProduct);
        }
        navigation.goBack();
      });
    //Alert.alert('Add successful');
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
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter description"></TextInput>
        <Text style={styles.title}>Price</Text>
        <TextInput
          onChangeText={setPrice}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter price"></TextInput>
        <Text style={styles.title}>Discount Percentage</Text>
        <TextInput
          onChangeText={setDiscountPercentage}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter discount percentage"></TextInput>
        <Text style={styles.title}>Rating</Text>
        <TextInput
          onChangeText={setRating}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter rating"></TextInput>
        <Text style={styles.title}>Stock</Text>
        <TextInput
          onChangeText={setStock}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter stock"></TextInput>
        <Text style={styles.title}>Brand</Text>
        <TextInput
          onChangeText={setBrand}
          style={styles.input}
          underlineColor="#fffbfe"
          placeholder="Enter brand"></TextInput>
        <Text style={styles.title}>Category</Text>
        <TextInput
          onChangeText={setCategory}
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
