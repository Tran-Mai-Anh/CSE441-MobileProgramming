import { createSlice, configureStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const mapContacts = (contact) => {
  const { name, picture, phone, cell, email } = contact;
  return {
    id: uuidv4(),
    name: `${name.first} ${name.last}`,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() < 0.1,
  };
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
  },
  reducers: {
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
    },
    toggleFavorite: (state, action) => {
      const contactId = action.payload;
      const contact = state.contacts.find((c) => c.id === contactId);
      if (contact) {
        contact.favorite = !contact.favorite;
      }
    },
  },
});

export const { fetchContactsSuccess, toggleFavorite } = contactsSlice.actions;

const saveToAsyncStorage = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === 'contacts/fetchContactsSuccess' || action.type === 'contacts/toggleFavorite') {
    const state = store.getState();
    AsyncStorage.setItem('contacts', JSON.stringify(state.contacts)).catch((error) =>
      console.error('Lỗi khi lưu vào AsyncStorage:', error)
    );
  }
  return result;
};

const store = configureStore({
  reducer: contactsSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToAsyncStorage),
});

export const initializeStore = async () => {
  try {
    const storedContacts = await AsyncStorage.getItem('contacts');
    if (storedContacts) {
      store.dispatch(fetchContactsSuccess(JSON.parse(storedContacts)));
    }
  } catch (error) {
    console.error('Lỗi khi tải từ AsyncStorage:', error);
  }
};

export default store;