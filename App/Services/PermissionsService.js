import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
} from 'react-native-permissions';

import {Platform} from 'react-native';

const isIos = Platform.OS === 'ios';
//
const IOS = PERMISSIONS.IOS;
const ANDROID = PERMISSIONS.ANDROID;
//
const CAMERA = isIos ? IOS.CAMERA : ANDROID.CAMERA;
const STORAGE = isIos ? IOS.MEDIA_LIBRARY : ANDROID.READ_EXTERNAL_STORAGE;
const MICROPHONE = isIos ? IOS.MICROPHONE : ANDROID.RECORD_AUDIO;
const LOCATION = isIos
  ? IOS.LOCATION_WHEN_IN_USE
  : ANDROID.ACCESS_FINE_LOCATION;
//PERMISSION ITEMS
export const PERMISSION_ITEMS = {
  CAMERA,
  STORAGE,
  MICROPHONE,
  LOCATION,
};
//
const checkPermission = async (item) => {
  const permission = check(item)
    .then(async (result) => {
      console.log({REQUEST_PERMISSION_RESULT: result});
      switch (result) {
        case RESULTS.UNAVAILABLE:
          if (Platform.OS === 'android') {
            openSettings().catch(() => console.warn('cannot open settings'));
            return false;
          } else {
            return await requestPermission(item);
          }
        case RESULTS.DENIED:
          return await requestPermission(item);
        case RESULTS.GRANTED:
          return await requestPermission(item);
        case RESULTS.BLOCKED:
          openSettings().catch(() => console.warn('cannot open settings'));
          break;
      }
    })
    .catch((error) => {
      console.log({error});
      // …
    });
  return permission;
};
const checkStatus = async (item) => {
  const permission = check(item)
    .then(async (result) => {
      console.log({REQUEST_PERMISSION_RESULT: result});
      switch (result) {
        case RESULTS.UNAVAILABLE:
          return false;
        case RESULTS.DENIED:
          return false;
        case RESULTS.GRANTED:
          return true;
        case RESULTS.BLOCKED:
          return false;
      }
    })
    .catch((error) => {
      console.log({error});
      // …
    });
  return permission;
};
//
const requestPermission = async (item) => {
  const requestPermission = await request(item)
    .then(async (result) => {
      console.log({result});

      if (result === RESULTS.DENIED) {
        return false;
      } else if (result === RESULTS.BLOCKED) {
        return false;
      }
      return true;
    })
    .catch((err) => {
      console.log({err});
      return false;
    });
  return requestPermission;
};
const checkInitialPermissions = async () => {
  const camera = await checkStatus(CAMERA);
  const microPhone = await checkStatus(MICROPHONE);
  const location = await checkStatus(LOCATION);
  // console.log({camera, microPhone});
  return {
    camera,
    microPhone,
    location,
  };
};
export default {
  checkPermission,
  requestPermission,
  checkStatus,
  checkInitialPermissions,
};
