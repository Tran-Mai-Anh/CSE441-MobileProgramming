import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Card, Button} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';

const Product_Detail = () => {
  const route = useRoute();
  const product = route.params?.product;

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No product data</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Product Detail</Text>
      <Card style={styles.card}>
        <Card.Cover source={{uri: product.thumbnail}} style={{borderRadius: 15}} />
        <Card.Content>
          <Text style={styles.title}>Title: {product.title}</Text>
          <Text>Description: {product.description}</Text>
          <Text>Price: ${product.price}</Text>
          <Text>Discount: {product.discountPercentage}%</Text>
          <Text>Rating: {product.rating} stars</Text>
          <Text>Stock: {product.stock} units</Text>
          <Text>Brand: {product.brand}</Text>
          <Text>Category: {product.category}</Text>
          <View style={styles.buttonContainer}>
            <Button mode="contained" buttonColor="#9c27b0" style={styles.button}>
              Delete
            </Button>
            <Button mode="contained" buttonColor="#9c27b0" style={styles.button}>
              Cancel
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
    alignSelf: 'left',
  },
  card: {
    marginBottom: 20,
  },
  title: {
    marginTop: 8,
    fontSize: 26,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 8,
    backgroundColor: '#674fa3',
  },
});

export default Product_Detail;
