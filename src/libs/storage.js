import AsyncStorage from '@react-native-community/async-storage';

const Storage = {};

Storage.store = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);

    return {
      error: false,
      message: 'Item saved',
    };
  } catch (e) {
    console.log('storage store err', e);
    return {
      error: true,
      message: e.message,
    };
  }
};

Storage.get = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return {
      data,
      error: false,
    };
  } catch (e) {
    console.log('storage get err', e);
    return {
      error: true,
      message: e.message,
    };
  }
};

Storage.multiGet = async (keys) => {
  try {
    const data = await AsyncStorage.multiGet(keys);
    return {
      error: false,
      data,
    };
  } catch (e) {
    console.log('storage multiget err', e);
    return {
      error: true,
      message: e.message,
    };
  }
};

Storage.getAllKeys = async () => {
  try {
    const data = await AsyncStorage.getAllKeys();
    return {
      error: false,
      data,
    };
  } catch (e) {
    console.log('storage getAllKeys err', e);
    return {
      error: true,
      message: e.message,
    };
  }
};

Storage.remove = async (key) => {
  try {
    const data = await AsyncStorage.removeItem(key);
    return {
      error: false,
      message: 'Item removed',
    };
  } catch (e) {
    console.log('storage remove err', e);
    return {
      error: true,
      message: e.message,
    };
  }
};

export default Storage;
