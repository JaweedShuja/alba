import {combineReducers} from 'redux';
import configureStore from './CreateStore';
import rootSaga from 'App/Sagas';
import {persistReducer} from 'redux-persist';
import {reducer as ExampleReducer} from './Example/Reducers';
import {reducer as StartUp} from './Startup/Reducers';
import {reducer as Authentication} from './Authentication/Reducers';
import storage from '@react-native-community/async-storage';
import {reducer as AppData} from '../Stores/AppData/Reducers';
import {reducer as SocketReducer} from '../Stores/Socket/Reducers';
import {reducer as TeacherData} from '../Stores/TeacherData/Reducers';
import {reducer as UserChats} from './UserChats/Reducers';
import {reducer as PopupsReducer} from './PopUps/Reducers';
import {resettableReducer} from 'reduxsauce';
//Add a nested state of reducer for rehydrated
import {reducer as NetworkReducer} from 'react-native-offline';

const startUpPersistConfig = {
  key: 'startUp',
  storage: storage,
  blacklist: ['passSplash'],
};
const chatConfig = {
  key: 'userChat',
  storage: storage,
};
const authConfig = {
  key: 'auth',
  storage: storage,
};

const resettable = resettableReducer('RESET_ACTION');

export default () => {
  const rootReducer = combineReducers({
    example: ExampleReducer,
    startUp: persistReducer(startUpPersistConfig, StartUp),
    auth: persistReducer(authConfig, resettable(Authentication)),
    appData: resettable(AppData),
    teacherData: resettable(TeacherData),
    socket: resettable(SocketReducer),
    userChat: persistReducer(chatConfig, resettable(UserChats)),
    popups: resettable(PopupsReducer),
    network: NetworkReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
