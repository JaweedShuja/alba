import React, {useEffect} from 'react';
import {AppNavigator} from 'App/Navigators/AppNavigator';
import {AppState, View} from 'react-native';
import StartupActions from 'App/Stores/Startup/Actions';
import {PropTypes} from 'prop-types';
import {Helpers} from 'App/Theme';
import {useDispatch, useSelector} from 'react-redux';
import AllModalsContainer from '../../Components/AllModalsContainer';
import {useLanguageHandler} from 'App/Services/hooks';
import RNRestart from 'react-native-restart';

console.disableYellowBox = true;

const RootScreen = (props) => {
  const dispatch = useDispatch();
  useLanguageHandler();

  const socket = useSelector((state) => state?.socket?.socket);
  useEffect(() => {
    dispatch(StartupActions.startup());

    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (appStateChange) => {
    if (socket && socket?.emit) {
      socket.emit(
        'OnlineStatus',
        {
          onlineStatus: appStateChange === 'active' ? '1' : '0',
        },
        () => {
          console.log('callback socket appStateChange _handleAppStateChange');
        },
      );
    }
  };

  return (
    <View style={Helpers.fill}>
      <AppNavigator />
      <AllModalsContainer />
    </View>
  );
};

RootScreen.propTypes = {
  startup: PropTypes.func,
};

export default RootScreen;
