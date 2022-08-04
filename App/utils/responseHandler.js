import {Alert, NetIn} from 'react-native';
import {navigate, navigateAndReset} from '../Services/NavigationService';
import Strings from '../Values/Strings';
import AsyncStorageHandler, {
  STORAGE_CONSTANTS,
} from '../Services/asyncStorageHandler';
import {useDispatch, connect} from 'react-redux';
import AuthActions from '../Stores/Authentication/Actions';
import AppDataActions from 'App/Stores/AppData/Actions';
import {store} from '../App';
import {showToast} from './showToast';
import {checkNetInfo} from './checkNetInfo';
import {string} from 'App/i18n';
import {isIOS} from '../Theme/Metrics';
import PopupsActions from 'App/Stores/PopUps/Actions';

const {REMOVE} = STORAGE_CONSTANTS;
const {
  STUDENT_STACK,
  STUDENT_LOGIN_SCREEN,
  STUDENT_SIGN_UP_COMPLETION_SCREEN,
  HOME_SCREEN,
} = Strings.Routes;

export const responseHandler = (res) => {
  const responseStatus = {
    UN_AUTHENTICATED: string.USER_NOT_AUTHENTICATE,
    USER_BLOCKED: string.USER_IS_BLOCKED,
    RESPONSE_FAILED: string.RESPONSE_FAILED,
    SERVER_ERROR: string.SERVER_ERROR,
    WRONG: string.SOMETHING_WENT_WRONG,
    NETWORK_ERROR: string.PLEASE_CHECK_YOUR_INTERNET_CONNECTION,
    SIGN_UP_OR_SIGN_IN_ERROR: string.SIGN_UP_OR_SIGN_IN,
    SIGN_UP_APPLE: string.PLEASE_COMPLETE_YOUR_PROFILE_FIRST,
  };
  const email = store.getState()?.auth?.email;
  const userType = store.getState()?.appData?.isTeacher;
  // console.log('myres', res, email, userType);
  store.dispatch(PopupsActions.hideModal(Strings.MODAL_TYPES.LOADING));

  if (res?.data) {
    if (res?.data.code === 200) {
      return {
        res: true,
        payload: res?.data?.data?.payload,
      };
    }
  } else {
    const STATUS = res?.response?.status;
    const MESSAGE = res?.response?.data?.data?.message;
    switch (STATUS) {
      case 401:
        if (isIOS) {
          if (email) {
            if (userType) {
              store.dispatch(AuthActions.getSituationUser());
            } else {
              showToast(
                'e',
                responseStatus.SIGN_UP_APPLE,
                // STATUS + `${'\n'}` + MESSAGE,
              );

              navigate(STUDENT_STACK, {
                screen: STUDENT_SIGN_UP_COMPLETION_SCREEN,
                params: {email: email, fromResponse: true},
              });
            }
          } else {
            showToast(
              'e',
              responseStatus.SIGN_UP_OR_SIGN_IN_ERROR,
              STATUS + `${'\n'}` + MESSAGE,
            );
            navigateAndReset(STUDENT_STACK);
          }
        } else {
          showToast(
            'e',
            responseStatus.SIGN_UP_OR_SIGN_IN_ERROR,
            STATUS + `${'\n'}` + MESSAGE,
          );
          navigateAndReset(STUDENT_STACK);
        }
        break;
      case 403:
        showToast(
          'e',
          responseStatus.RESPONSE_FAILED,
          STATUS + `${'\n'}` + MESSAGE,
        );
        break;
      case 405:
        store.dispatch(AuthActions.onFail());
        store.dispatch(AppDataActions.onFail());
        showToast(
          'e',
          responseStatus.RESPONSE_FAILED,
          STATUS + `${'\n'}` + MESSAGE,
        );
        break;
      case 406:
        store.dispatch(AuthActions.onFail());
        store.dispatch(AppDataActions.onFail());
        return {
          res: false,
          // profileError: res?.response?.data?.data?.payload?.profileError,
          payload: res?.response?.data?.data?.payload,
        };
        break;
      case 422:
        showToast(
          'e',
          responseStatus.SERVER_ERROR,
          STATUS + `${'\n'}` + MESSAGE,
        );
        break;
      default:
        showToast('e', responseStatus.WRONG, STATUS);
        break;
    }

    throw new Error(JSON.stringify({status: STATUS, message: MESSAGE}));
  }
};
