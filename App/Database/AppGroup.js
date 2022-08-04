import {NativeModules} from 'react-native';
import {isIos} from '../Theme/Metrics';

const {AppGroup} = NativeModules;

const appGroup = {
  path: isIos ? AppGroup?.path : '',
};

export default appGroup;
