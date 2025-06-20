import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import ContactThum from './ContactThum';
import DetailListItem from './DetailListItem';
import { toggleFavorite } from './Store';

const ProfileContact = ({ route }) => {
  const { contact } = route.params;
  const { id, avatar, name, email, phone, cell, favorite } = contact;
  const dispatch = useDispatch();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThum avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" title="Email" subtitle={email} />
        <DetailListItem icon="phone" title="Công việc" subtitle={phone} />
        <DetailListItem icon="smartphone" title="Cá nhân" subtitle={cell} />
        <View style={{ alignItems: 'center' }}>
          <IconButton
            icon={favorite ? 'star' : 'star-outline'}
            color="#663399"
            size={20}
            onPress={handleToggleFavorite}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ProfileContact;