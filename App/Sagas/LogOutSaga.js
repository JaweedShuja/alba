import {delay, put} from 'redux-saga/effects';
import {navigateAndReset} from '../Services/NavigationService';
import AuthenticationActions from '../Stores/Authentication/Actions';
import AppDataActions from 'App/Stores/AppData/Actions';
import UserChatActions from '../Stores/UserChats/Actions';
import {deleteDatabase} from '../Database/DBActions';
import asyncStorageHandler, {
  STORAGE_CONSTANTS,
} from '../Services/asyncStorageHandler';
import {resetStores} from '../App';
import AsyncStorage from '@react-native-community/async-storage';
import Strings from '../Values/Strings';
import {store} from '../App';
import {getDeviceInfo} from 'App/Services/DeviceInfo';

const {STUDENT_STACK} = Strings.Routes;
const {REMOVE} = STORAGE_CONSTANTS;

export function* logOutSaga(data) {
  try {
    const deviceInfo = yield getDeviceInfo();
    const deviceId = deviceInfo?.deviceId;
    const param = {deviceId: deviceId};
    const userType = yield store.getState()?.appData?.isTeacher;
    yield put(AppDataActions.userLogout(param));
    yield AsyncStorage.removeItem('homeListWatchType');
    yield asyncStorageHandler.storageHandler(REMOVE);
    navigateAndReset(STUDENT_STACK);
    yield delay(500);
    yield resetStores();
    yield put(UserChatActions.updateCacheChats([]));
    store.dispatch(AppDataActions.isTeacher(userType ? 'teacher' : 'student'));
    console.log('STARTS DELETING STORES');
    yield delay(500);
    yield deleteDatabase();
    yield put(AppDataActions.getCategories());
    yield put(AppDataActions.getCategoriesStHome());
    //}
  } catch (error) {
    console.log('error logOut', error);
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN SIGN OUT', type: 'danger'},
    //   ]),
    // );
    yield put(AuthenticationActions.onFail('ERROR'));
  }
}

// import {delay, put} from 'redux-saga/effects';
// import {navigateAndReset} from '../Services/NavigationService';
// import AuthenticationActions from '../Stores/Authentication/Actions';
// import AppDataActions from 'App/Stores/AppData/Actions';
// import UserChatActions from '../Stores/UserChats/Actions';
// import {deleteDatabase} from '../Database/DBActions';
// import asyncStorageHandler, {
//   STORAGE_CONSTANTS,
// } from '../Services/asyncStorageHandler';
// import {resetStores} from '../App';
// import AsyncStorage from '@react-native-community/async-storage';
// import Strings from '../Values/Strings';
// import {store} from '../App';

// const {STUDENT_STACK} = Strings.Routes;
// const {REMOVE} = STORAGE_CONSTANTS;
// export function* logOutSaga(data) {
//   try {
//     const userType = yield store.getState()?.appData?.isTeacher;
//     console.log('userType**>', userType);
//     yield put(AppDataActions.userLogout());
//     //if (!userType) {
//     //yield put(AppDataActions.userLogout());
//     //store.dispatch(AppDataActions.userLogout());
//     //}
//     yield AsyncStorage.removeItem('homeListWatchType');
//     yield asyncStorageHandler.storageHandler(REMOVE);
//     navigateAndReset(STUDENT_STACK);
//     yield delay(500);
//     yield resetStores();
//     yield put(UserChatActions.updateCacheChats([]));
//     // yield delay(500);
//     store.dispatch(AppDataActions.isTeacher(userType ? 'teacher' : 'student'));
//     //yield put(AppDataActions.isTeacher(userType ? 'teacher' : 'student'));
//     console.log('STARTS DELETING STORES');
//     yield delay(500);
//     yield deleteDatabase();
//     yield put(AppDataActions.getCategories());
//     yield put(AppDataActions.getCategoriesStHome());
//   } catch (error) {
//     console.log('error logOut', error);
//     // yield put(
//     //   AppDataActions.setToastMessages([
//     //     {message: 'PROBLEM IN SIGN OUT', type: 'danger'},
//     //   ]),
//     // );
//     yield put(AuthenticationActions.onFail('ERROR'));
//   }
// }
