import {createReducer} from 'reduxsauce';
import {INITIAL_STATE} from './InitialState';
import {StartupTypes} from './Actions';

export const splashState = (state = INITIAL_STATE) => ({
  ...state,
  passSplash: true,
});

const getDeviceInfo = (state) => ({
  ...state,
});

const setDeviceInfo = (state, {deviceInfo}) => ({
  ...state,
  deviceInfo,
});

const onRegionChange = (state, {region}) => ({
  ...state,
  region,
});

const onFirstRun = (state, {region}) => ({
  ...state,
  firstRun: false,
});
export const reducer = createReducer(INITIAL_STATE, {
  [StartupTypes.STARTUP]: splashState,
  [StartupTypes.GET_DEVICE_INFO]: getDeviceInfo,
  [StartupTypes.GET_DEVICE_INFO_SUCCESS]: setDeviceInfo,
  [StartupTypes.SELECTED_REGION]: onRegionChange,
  [StartupTypes.FIRST_RUN]: onFirstRun,
});
