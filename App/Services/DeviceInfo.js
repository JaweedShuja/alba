import {
  getUniqueId,
  getManufacturer,
  getApplicationName,
  getSystemName,
  getSystemVersion,
  getBuildNumber,
  getBundleId,
  getDeviceId,
  getDeviceName,
  getType,
  getVersion,
  isTablet,
  getIpAddress,
} from 'react-native-device-info';
import AsyncStorageHandler, {
  STORAGE_CONSTANTS,
} from 'App/Services/asyncStorageHandler';

export const getDeviceInfo = async () => {
  const appName = getApplicationName();
  const manufacturer = await getManufacturer();
  const systemName = getSystemName();
  const systemVersion = getSystemVersion();
  const buildNumber = getBuildNumber();
  const bundleId = getBundleId();
  const deviceId = getDeviceId();
  const deviceName = await getDeviceName();
  const type = await getType();
  const version = getVersion();
  const uniqueId = getUniqueId();
  const isTablete = isTablet();
  const ip = await getIpAddress();
  const pushNotifToken = await AsyncStorageHandler.storageHandler(
    'GET_FCM_TOKEN',
  );
  console.log('pushNotifToken', pushNotifToken);
  //const pushNotifToken = 'TokenNull';
  return {
    appName,
    manufacturer,
    systemName,
    systemVersion,
    buildNumber,
    bundleId,
    deviceId,
    deviceName,
    type,
    version,
    uniqueId,
    isTablet: isTablete,
    ip,
    pushToken: pushNotifToken,
    notification: true,
    status: '1',
  };
};
