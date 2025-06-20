import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ContactListItem from './ContactListItem';
import { fetchContactsSuccess } from './Store';

const keyExtractor = ({ phone }) => phone;

const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=50');
  const contactData = await response.json();
  return contactData.results.map(mapContacts);
};

const Contacts = ({ navigation }) => {
  const { contacts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchContacts()
      .then((contacts) => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch((e) => {
        console.error('Lỗi khi lấy danh bạ:', e);
      });
  }, [dispatch]);

  const contactsSorted = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));

  const renderContacts = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('ProfileContact', { contact: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contactsSorted}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Contacts;