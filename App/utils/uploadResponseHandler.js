import {navigate} from '../Services/NavigationService';
import Strings from '../Values/Strings';
import AuthActions from '../Stores/Authentication/Actions';
import AppDataActions from 'App/Stores/AppData/Actions';
import {store} from '../App';
import {showToast} from './showToast';
import {string} from 'App/i18n';

const {STUDENT_STACK, STUDENT_LOGIN_SCREEN} = Strings.Routes;

const responseStatus = {
  UN_AUTHENTICATED: string.USER_NOT_AUTHENTICATE,
  USER_BLOCKED: string.USER_IS_BLOCKED,
  RESPONSE_FAILED: string.RESPONSE_FAILED,
  SERVER_ERROR: string.SERVER_ERROR,
  WRONG: string.SOMETHING_WENT_WRONG,
  NETWORK_ERROR: string.PLEASE_CHECK_YOUR_INTERNET_CONNECTION,
};
export const uploadResponseHandler = (res) => {
  console.log('myres', res);

  if (res?.data) {
    if (res?.code === 200) {
      return {
        res: true,
        payload: res?.data?.payload,
      };
    }
  } else {
    const STATUS = res?.response?.status;
    const MESSAGE = res?.response?.data?.data?.message;
    switch (STATUS) {
      case 401:
        showToast(
          'e',
          responseStatus.RESPONSE_FAILED,
          STATUS + `${'\n'}` + MESSAGE,
        );
        navigate(STUDENT_STACK, {screen: STUDENT_LOGIN_SCREEN});
        break;
      case 405:
        showToast(
          'e',
          responseStatus.RESPONSE_FAILED,
          STATUS + `${'\n'}` + MESSAGE,
        );
        break;
      case 403:
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
          profileError: res?.response?.data?.data?.payload?.profileError,
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
