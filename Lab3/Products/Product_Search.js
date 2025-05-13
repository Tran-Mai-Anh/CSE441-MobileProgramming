import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-paper';

const Product_Search = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  const searchProduct = () => {
    if (value !== '') {
      const filePath = `https://dummyjson.com/products/search?q=${value}`;
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((d) => {
          setData(d.products);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Content>
        <Text style={styles.title}>Title: {item.title}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Price: ${item.price}</Text>
        <Text>Discount: {item.discountPercentage}%</Text>
        <Text>Rating: {item.rating} stars</Text>
        <Text>Stock: {item.stock} units</Text>
        <Text>Brand: {item.brand}</Text>
        <Text>Category: {item.category}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Products</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={value}
        onChangeText={setValue}
      />
      <Button mode="contained" onPress={searchProduct} style={styles.button}>
        SEARCH
      </Button>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Product_Search;