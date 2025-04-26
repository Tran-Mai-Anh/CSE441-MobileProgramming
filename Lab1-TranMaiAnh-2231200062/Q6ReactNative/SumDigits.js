import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SumDigits = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState(null);

  const calculateSum = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) {
      setResult('Please enter a valid positive number.');
      return;
    }

    const numStr = num.toString();
    const firstDigit = parseInt(numStr[0]);
    const lastDigit = parseInt(numStr[numStr.length - 1]);
    const sum = firstDigit + lastDigit;
    setResult(`Sum of first (${firstDigit}) and last (${lastDigit}) digit: ${sum}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sum of First and Last Digit</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a number"
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
      <Button title="Calculate" onPress={calculateSum} />
      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default SumDigits;