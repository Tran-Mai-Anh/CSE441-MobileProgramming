import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ContactThum from './ContactThum';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const { contacts } = useSelector((state) => state);
  const favorites = contacts.filter((contact) => contact.favorite);

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar, name, phone } = item;
    return (
      <ContactThum
        avatar={avatar}
        name={name}
        phone={phone}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={renderFavoriteThumbnail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    alignItems: 'center',
  },
});

export default Favorites;