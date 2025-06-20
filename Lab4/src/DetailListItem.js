import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

const DetailListItem = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <IconButton icon={icon} size={24} />
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'grey',
  },
});

export default DetailListItem;