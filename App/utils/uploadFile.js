import {DeviceEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Strings from 'App/Values/Strings';

const {UPLOAD_URL} = Strings.CONSTANTS;

export const uploadFile = async (formData, type) => {
  const token = await AsyncStorage.getItem('TOKEN');
  console.log({token, type});
  let header = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + token,
  };
  switch (type) {
    case 'PDF':
      header = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        originalFileType: 'pdf',
        Authorization: 'Bearer ' + token,
      };
      break;
    case 'VIDEO':
      header = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        originalFileType: 'video',
        Authorization: 'Bearer ' + token,
      };
      break;
    case 'AUDIO':
      header = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        originalFileType: 'audio',
        Authorization: 'Bearer ' + token,
      };
      break;
    default:
      header = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token,
      };
      break;
  }
  try {
    const response = await axios({
      url: UPLOAD_URL,
      method: 'POST',
      data: formData,
      headers: header,
      onUploadProgress: (progressEvent) => {
        let percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        DeviceEventEmitter.emit('uploadProgress', percent);
        //   const {loaded, total} = progressEvent;
        //   const percent = caculatePercent(loaded, total);
        //   DeviceEventEmitter.emit('uploadProgress', percent);
        // Do something with the progress details
      },
    });
    console.log('response :', response);
    return response?.data;
  } catch (error) {
    console.log('errr from file :', {error});
    return error;
  }
};
