import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Strings from '../Values/Strings';
import {store} from '../App';

const {TOKEN} = Strings.CONSTANTS;

const http = axios.create({
  baseURL: 'https://api.albaeducation.net/app/api/',
  timeout: 12000,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(TOKEN);
    const lang = store.getState()?.appData?.region?.code;
    console.log({token});
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (lang) {
      config.headers.language = lang;
    } else {
      config.headers.language = 'en';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
http.interceptors.response.use(
  (response) => {
    console.log({AXIOSRES: response});
    return response;
  },
  async function (error) {
    console.log({AXIOS: error});
    return error;
  },
);
function refreshAccessToken() {
  console.log('NEEDS REFRESH');
}
export default http;
