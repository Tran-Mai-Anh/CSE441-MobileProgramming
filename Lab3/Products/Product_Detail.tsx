import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Card, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const Product_Detail = () => {
  const [data, setData] = useState<any>(null); // hoặc tạo type riêng
  const filePath = 'https://dummyjson.com/products/2';

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading product data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.header}>Product Detail</Text>
        <Card style={styles.card}>
          <Card.Cover
            source={{uri: data.thumbnail}}
            style={{borderRadius: 15}}
          />
          <Card.Content>
            <Text style={styles.title}>Title: {data.title}</Text>
            <Text>Description: {data.description}</Text>
            <Text>Price: ${data.price}</Text>
            <Text>Discount: {data.discountPercentage}%</Text>
            <Text>Rating: {data.rating} stars</Text>
            <Text>Stock: {data.stock} units</Text>
            <Text>Brand: {data.brand}</Text>
            <Text>Category: {data.category}</Text>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                buttonColor="#9c27b0"
                style={styles.button}>
                Delete
              </Button>
              <Button
                mode="contained"
                buttonColor="#9c27b0"
                style={styles.button}>
                Cancel
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </SafeAreaView>
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
    alignSelf: 'flex-start',
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
