import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Employee = ({ onUpdateSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [training, setTraining] = useState('');

  const handleUpdate = () => {
    if (fullName && age && occupation && training) {
      onUpdateSuccess('Employee information updated successfully!');
    } else {
      onUpdateSuccess('Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Occupation"
        value={occupation}
        onChangeText={setOccupation}
      />
      <TextInput
        style={styles.input}
        placeholder="Specialized in Training"
        value={training}
        onChangeText={setTraining}
      />
      <Button title="Update" onPress={handleUpdate} />
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
});

export default Employee;