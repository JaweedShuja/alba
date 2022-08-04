import AsyncStorage from '@react-native-community/async-storage';

export const STORAGE_CONSTANTS = {
  TOKEN: 'TOKEN',
  ADD: 'ADD',
  GET: 'GET',
  NO_ACTION: 'NO_ACTION',
  REMOVE: 'REMOVE',
  DONE: 'DONE',
  PROVIDER_TOKEN: 'PROVIDER_TOKEN',
  ADD_CUSTOMER_TOKEN: 'CUSTOMER_TOKEN',
  DELETE_CUSTOMER_TOKEN: 'DELETE_CUSTOMER_TOKEN',
  GET_CUSTOMER_TOKEN: 'GET_CUSTOMER_TOKEN',
  CUSTOMER_TOKEN: 'CUSTOMER_TOKEN',
  FCM_TOKEN: 'FCM_TOKEN',
  GET_FCM_TOKEN: 'GET_FCM_TOKEN',
};

const storageHandler = async (type, token) => {
  const {
    ADD,
    DONE,
    GET,
    NO_ACTION,
    REMOVE,
    TOKEN,
    CUSTOMER_TOKEN,
    FCM_TOKEN,
    GET_FCM_TOKEN,
  } = STORAGE_CONSTANTS;
  console.log({type, token});
  if (type === ADD) {
    const add = await AsyncStorage.setItem(TOKEN, token);
    console.log('token is set');
    return {token: DONE};
  }
  if (type === REMOVE) {
    await AsyncStorage.removeItem(TOKEN);
    await AsyncStorage.removeItem(CUSTOMER_TOKEN);
    return {token: DONE};
  }
  if (type === GET) {
    const get = await AsyncStorage.getItem(TOKEN);
    return {token: get};
  }
  if (type === FCM_TOKEN) {
    await AsyncStorage.setItem(FCM_TOKEN, token);
  }
  if (type === GET_FCM_TOKEN) {
    const fcmToken = await AsyncStorage.getItem(FCM_TOKEN);
    return fcmToken;
  }
  return {token: NO_ACTION};
};

export default {storageHandler};

//   if (type === ADD_CUSTOMER_TOKEN) {
//     const add = await AsyncStorage.setItem(CUSTOMER_TOKEN, token);
//     return {CUSTOMER_TOKEN: DONE, token};
//   }
//   if (type === GET_CUSTOMER_TOKEN) {
//     const get = await AsyncStorage.getItem(CUSTOMER_TOKEN);
//     return {CUSTOMER_TOKEN: get};
//   }
//   if (type === DELETE_CUSTOMER_TOKEN) {
//     await AsyncStorage.removeItem(CUSTOMER_TOKEN);
//     return {CUSTOMER_TOKEN: DONE};
//   }
