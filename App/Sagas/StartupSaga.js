import {delay, put, select} from 'redux-saga/effects';
import ExampleActions from 'App/Stores/Example/Actions';
import NavigationService from 'App/Services/NavigationService';
import Strings from '../Values/Strings';
import {getDeviceInfo} from '../Services/DeviceInfo';
import StartupActions from '../Stores/Startup/Actions';
import AppDataActions from '../Stores/AppData/Actions';
import AuthActions from '../Stores/Authentication/Actions';
import AsyncStorage from '@react-native-community/async-storage';
import GET from '../Api/GET';
import RNRestart from 'react-native-restart';

const {TOKEN} = Strings.CONSTANTS;

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  yield put(AuthActions.isLoggedIn());
  // yield put(ExampleActions.fetchUser());
  try {
    const firstRun = yield select((state) => state?.startUp?.firstRun);
    yield delay(800);
    yield put(StartupActions.firstRun());
    yield delay(800);
    if (firstRun) {
      RNRestart.Restart();
    }
    const deviceInfo = yield getDeviceInfo();
    // console.log('app', {deviceInfo});
    yield put(AppDataActions.homeScreenType(true));

    if (deviceInfo) {
      yield put(StartupActions.getDeviceInfoSuccess(deviceInfo));
    }
  } catch (error) {
    console.log(error);
  }

  // When those operations are finished we redirect to the main screen
  // NavigationService.navigateAndReset(Strings.Routes.STUDENTS_BOTTOMS_TABS);
}
