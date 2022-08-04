import {delay, put, select} from 'redux-saga/effects';
import GET from '../Api/GET';
import POST from '../Api/POST';
import AppDataActions from '../Stores/AppData/Actions';
import AuthActions from '../Stores/Authentication/Actions';
import {navigate, navigateAndReset} from 'App/Services/NavigationService';
import {responseHandler} from '../utils/responseHandler';
import AsyncStorageHandler, {
  STORAGE_CONSTANTS,
} from '../Services/asyncStorageHandler';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import SocketActions from 'App/Stores/Socket/Actions';
import {showToast} from '../utils/showToast';
import Strings from '../Values/Strings';
import * as selectors from './selectors';
import {string} from 'App/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {isIOS} from '../Theme/Metrics';
import moment from 'moment';
import PopupsActions from 'App/Stores/PopUps/Actions';

const {
  STUDENT_STACK,
  STUDENT_EMAIL_VERIFICATION_SCREEN,
  STUDENT_SIGN_UP_COMPLETION_SCREEN,
  STUDENT_SIGN_UP_SCREEN,
  HOME_TEACHER_SCREEN,
  TEACHER_STACK,
  HOME_SCREEN,
  TEACHER_BOTTOMS_TABS,
  STUDENTS_BOTTOMS_TABS,
  CREATE_TEACHER_PROFILE,
  PROFILE_SCREEN,
} = Strings.Routes;
const {ADD} = STORAGE_CONSTANTS;
const {TOKEN} = Strings.CONSTANTS;

export function* signUpSaga({param}) {
  try {
    const response = yield POST.signupByEmail(param);
    const payload = responseHandler(response);
    const email = param?.email.toString();
    console.log('sign up saga', payload);
    const profileError = payload?.payload?.profileError;
    if (payload.res) {
      yield put(AuthActions.signUpSuccess(payload));
      navigate(STUDENT_STACK, {
        screen: STUDENT_EMAIL_VERIFICATION_SCREEN,
        params: {email: email},
      });
    } else {
      yield put(AuthActions.signUpSuccess(payload));

      if (profileError != null) {
        const userType = yield select(selectors.typeOfUser);

        if (profileError) {
          const token = payload?.payload?.accessToken;
          if (token) {
            AsyncStorageHandler.storageHandler(ADD, token);
          }
          if (userType) {
            navigate(TEACHER_STACK, {
              screen: CREATE_TEACHER_PROFILE,
              params: {email: email},
            });
          } else {
            navigate(STUDENT_STACK, {
              screen: STUDENT_SIGN_UP_COMPLETION_SCREEN,
              params: {email: email},
            });
          }
        } else {
          navigate(STUDENT_STACK, {
            screen: STUDENT_EMAIL_VERIFICATION_SCREEN,
            params: {email: email},
          });
        }
      }
    }

    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('signUp Error', error);
  }
}

export function* verifyByEmailSaga({param}) {
  try {
    const response = yield POST.verifyByEmail(param);
    const payload = responseHandler(response);
    const email = payload?.payload?.email;

    if (payload.res) {
      const token = payload?.payload?.accessToken;
      if (token) {
        AsyncStorageHandler.storageHandler(ADD, token);
      }
      yield delay(500);

      yield put(AuthActions.isLoggedIn());
      yield put(AuthActions.verifyByEmailSuccess(payload));
      const userType = yield select(selectors.typeOfUser);
      if (userType) {
        navigate(TEACHER_STACK, {
          screen: CREATE_TEACHER_PROFILE,
          params: {email: email},
        });
      } else {
        navigate(STUDENT_STACK, {
          screen: STUDENT_SIGN_UP_COMPLETION_SCREEN,
          params: {email: email},
        });
      }
    }

    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('verifyByEmail Error', error);
  }
}

export function* getCurrentUserSaga({param}) {
  try {
    const currentUser = yield GET.getCurrentUser();
    if (currentUser?.data?.code === 200 && currentUser?.data?.data?.payload) {
      yield put(AuthActions.setUserProfile(currentUser?.data?.data?.payload));
    }
    console.log('currentUser', currentUser);
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('resendVerification Error', error);
  }
}

export function* resendVerificationCode({param}) {
  try {
    const response = yield POST.resendVerificationCode(param);
    const payload = responseHandler(response);
    if (payload.res) {
      yield put(AuthActions.resendVerificationCodeSuccess(payload));
    }

    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('resendVerification Error', error);
  }
}

export function* createUserProfileSaga({param}) {
  try {
    const response = yield POST.createUserProfile(param);
    const payload = responseHandler(response);
    console.log('createUserProfileSaga res', payload);
    const token = payload?.payload?.accessToken;
    if (token) {
      AsyncStorageHandler.storageHandler(ADD, token);
    }
    yield delay(500);
    yield put(AuthActions.isLoggedIn());

    if (payload.res) {
      showToast('s', string.SIGN_UP_SUCCESS_FULL);
      yield put(AuthActions.createUserProfileSuccess(payload));
      yield put(AppDataActions.getCategories());
      navigateAndReset(STUDENTS_BOTTOMS_TABS, {
        screen: HOME_SCREEN,
      });
    }

    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('createUserProfile Error', error);
  }
}

export function* createTeacherProfileSaga({param}) {
  try {
    const response = yield POST.createTeacherProfile(param);
    const payload = responseHandler(response);
    const token = payload?.payload?.accessToken;
    if (token) {
      AsyncStorageHandler.storageHandler(ADD, token);
    }
    yield delay(500);
    yield put(AuthActions.isLoggedIn());
    if (payload.res) {
      showToast('s', string.SIGN_UP_SUCCESS_FULL);
      yield put(AuthActions.createTeacherProfileSuccess(payload));
      AsyncStorage.setItem('homeListWatchType', 'teacher');
      // yield put(AppDataActions.getCategories());
      // navigateAndReset(STUDENT_STACK, {
      //   screen: STUDENT_LOGIN_SCREEN,
      // });
      navigateAndReset(TEACHER_BOTTOMS_TABS, {
        screen: HOME_TEACHER_SCREEN,
      });
    }

    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('createTeacherProfile Error', error);
  }
}

export function* signInByEmail({param}) {
  console.log({param});
  try {
    const response = yield POST.signInByEmail(param);
    const payload = responseHandler(response);
    const email = param?.email.toString();
    console.log('sign up saga', payload);
    const profileError = payload?.payload?.profileError;
    console.log({payload});
    if (payload.res) {
      const token = payload?.payload?.accessToken;
      if (token) {
        AsyncStorageHandler.storageHandler(ADD, token);
      }
      yield delay(500);
      yield put(AuthActions.signInSuccess(payload?.payload));
      yield put(AuthActions.isLoggedIn());
      showToast('s', string.LOGIN_SUCCESSFULL);
      const userType = yield select(selectors.typeOfUser);
      const currentCategoryId = yield select(
        selectors.currentCategoryIdForTeacher,
      );
      const categoryId = currentCategoryId[0]?._id;
      console.log('thie categoruid', categoryId);
      // yield put(AppDataActions.getCategories());

      if (userType) {
        yield put(TeacherDataActions.getTeacherScreen({categoryId}));
        AsyncStorage.setItem('homeListWatchType', 'teacher');

        navigateAndReset(TEACHER_BOTTOMS_TABS);
      } else {
        navigateAndReset(STUDENTS_BOTTOMS_TABS);
      }
    } else {
      yield put(AuthActions.signInSuccess(payload));

      if (profileError != null) {
        const userType = yield select(selectors.typeOfUser);

        if (profileError) {
          const token = payload?.payload?.accessToken;
          if (token) {
            AsyncStorageHandler.storageHandler(ADD, token);
          }
          if (userType) {
            navigate(TEACHER_STACK, {
              screen: CREATE_TEACHER_PROFILE,
              params: {email: email},
            });
          } else {
            navigate(STUDENT_STACK, {
              screen: STUDENT_SIGN_UP_COMPLETION_SCREEN,
              params: {email: email},
            });
          }
        } else {
          navigate(STUDENT_STACK, {
            screen: STUDENT_EMAIL_VERIFICATION_SCREEN,
            params: {email: email},
          });
        }
      }
    }

    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('signInByEmail Error', error);
  }
}

export function* requestResetPasswordSaga({param}) {
  console.log({param});
  try {
    const response = yield POST.requestResetPassword(param);
    const payload = responseHandler(response);
    console.log({payload});
    if (payload.res) {
      yield put(AuthActions.requestResetPasswordSuccess(payload?.payload));
      showToast('s', string.PLEASE_CHECK_YOUR_EMAIL);
    }
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('requestResetPassword Error', error);
  }
}

export function* resetPasswordCheckTokenSaga({param}) {
  console.log({param});
  try {
    const response = yield POST.resetPasswordCheckToken(param);
    const payload = responseHandler(response);
    console.log({payload});
    if (payload.res) {
      yield put(AuthActions.resetPasswordCheckTokenSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('resetPasswordCheckToken Error', error);
  }
}

export function* resetPasswordSaga({param}) {
  console.log({param});
  try {
    const response = yield POST.resetPassword(param);
    const payload = responseHandler(response);
    console.log({payload});
    if (payload.res) {
      yield put(AuthActions.resetPasswordSuccess(payload?.payload));
      showToast('s', string.YOUR_PASSWORD_WAS_CHANGED);
      navigate(STUDENT_STACK, {screen: STUDENT_SIGN_UP_SCREEN});
    }
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('resetPassword Error', error);
  }
}

export function* isLoggedInSaga() {
  const token = yield AsyncStorage.getItem(TOKEN);
  const isSocketInitialed = yield select((state) => state?.socket?.socket);
  try {
    const response = yield GET.getIsLoggedIn();
    console.log('isLoggedInResponse', {response});
    const payload = responseHandler(response);
    console.log('isLoggedInResponse 2', {payload});
    console.log('isLoggedInResponse 3', {isSocketInitialed});
    if (payload.res) {
      yield put(AuthActions.isLoggedInSuccess(payload));
      if (payload?.payload?.isLoggedIn) {
        yield put(AuthActions.getUserProfile());
        yield put(SocketActions.initialSocket(token));
      }
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('isLoggedIn Error', error);
  }
}

export function* socialSignUpSaga({param}) {
  try {
    const response = yield POST.socialSignUp(param);
    const payload = responseHandler(response);
    const email = param?.email.toString();
    yield put(AuthActions.setEmail(email));

    const registerType = param?.registerType;
    console.log('social signUp payLoad*=>', payload);
    const profileError = payload?.payload?.profileError;
    if (payload.res) {
      const userType = yield select(selectors.typeOfUser);
      const token = payload?.payload?.accessToken;
      if (token) {
        AsyncStorageHandler.storageHandler(ADD, token);
      }
      if (payload?.payload?.activeProfile) {
        showToast('s', string.LOGIN_SUCCESSFULL);
        yield delay(500);
        yield put(AuthActions.isLoggedIn());
        const currentCategoryId = yield select(
          selectors.currentCategoryIdForTeacher,
        );
        const categoryId = currentCategoryId[0]?._id;
        yield put(AppDataActions.getCategories());
        yield put(AppDataActions.getCategoriesStHome());
        if (userType) {
          yield put(TeacherDataActions.getTeacherScreen({categoryId}));
          AsyncStorage.setItem('homeListWatchType', 'teacher');
          navigateAndReset(TEACHER_BOTTOMS_TABS);
        } else {
          navigateAndReset(STUDENTS_BOTTOMS_TABS);
        }
      } else {
        if (userType) {
          navigate(TEACHER_STACK, {
            screen: CREATE_TEACHER_PROFILE,
            params: {email: email},
          });
        } else {
          //if(registerType === 'APPLE'){}
          navigate(STUDENT_STACK, {
            screen: STUDENT_SIGN_UP_COMPLETION_SCREEN,
            params: {email: email},
          });
        }
      }
    } else {
      yield put(AuthActions.socialSignUpSuccess(payload));

      if (profileError != null) {
        const userType = yield select(selectors.typeOfUser);

        if (profileError) {
          const token = payload?.payload?.accessToken;
          if (token) {
            AsyncStorageHandler.storageHandler(ADD, token);
          }
          if (userType) {
            navigate(TEACHER_STACK, {
              screen: CREATE_TEACHER_PROFILE,
              params: {email: email},
            });
          } else {
            navigate(STUDENT_STACK, {
              screen: STUDENT_SIGN_UP_COMPLETION_SCREEN,
              params: {email: email},
            });
          }
        } else {
          // navigate(STUDENT_STACK, {
          //   screen: STUDENT_EMAIL_VERIFICATION_SCREEN,
          //   params: {email: email},
          // });
        }
      }
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('social signUp Error', error);
  }
}

export function* appleSignUpSaga({param}) {
  try {
    yield put(PopupsActions.showModal(Strings.MODAL_TYPES.LOADING));

    const response = yield POST.socialSignUp(param);
    const payload = responseHandler(response);
    const email = param?.email.toString();
    const deviceInfo = yield select(selectors.deviceInfo);

    const registerType = param?.registerType;
    console.log('social signUp payLoad*=>', payload);
    const profileError = payload?.payload?.profileError;
    if (payload.res) {
      const userType = yield select(selectors.typeOfUser);
      const token = payload?.payload?.accessToken;
      if (token) {
        AsyncStorageHandler.storageHandler(ADD, token);
      }
      if (payload?.payload?.activeProfile) {
        showToast('s', string.LOGIN_SUCCESSFULL);
        yield delay(500);
        yield put(AuthActions.isLoggedIn());
        const currentCategoryId = yield select(
          selectors.currentCategoryIdForTeacher,
        );
        const categoryId = currentCategoryId[0]?._id;
        yield put(AppDataActions.getCategories());
        yield put(AppDataActions.getCategoriesStHome());
        if (userType) {
          yield put(TeacherDataActions.getTeacherScreen({categoryId}));
          AsyncStorage.setItem('homeListWatchType', 'teacher');
          navigateAndReset(TEACHER_BOTTOMS_TABS);
        } else {
          navigateAndReset(STUDENTS_BOTTOMS_TABS);
        }
      } else {
        if (userType) {
          if (isIOS) {
            AsyncStorage.setItem('homeListWatchType', 'teacher');
            yield put(AuthActions.setEmail(email));
            const voipIosPush = 'string';
            const apnsPush = 'string';
            const gender = 1;
            const city = 'Tokyo';
            const firstName = 'Rock';
            const lesson = ' math';
            const phoneNumber = '08544788555';
            const school = 'sina';
            const data = Object.assign(
              {gender},
              {deviceInfo},
              {voipIosPush},
              {apnsPush},
              {email},
              {city},
              {firstName},
              {lesson},
              {phoneNumber},
              {school},
            );
            yield put(AuthActions.createTeacherProfile(data));
          } else {
            navigate(TEACHER_STACK, {
              screen: CREATE_TEACHER_PROFILE,
              params: {email: email},
            });
          }
        } else {
          //if(registerType === 'APPLE'){}
          if (isIOS) {
            yield put(AuthActions.setEmail(email));
            const voipIosPush = 'string';
            const apnsPush = 'string';
            const gender = 1;
            const dob = new Date();

            const data = Object.assign(
              {firstName: 'John Cena'},
              {phoneNumber: '88445588000'},
              {gender},
              {deviceInfo},
              {dob},
              {userType},
              {voipIosPush},
              {apnsPush},
              {email},
            );
            yield put(AuthActions.createUserProfile(data));
            // navigateAndReset(STUDENTS_BOTTOMS_TABS);
          } else {
            navigate(STUDENT_STACK, {
              screen: STUDENT_SIGN_UP_COMPLETION_SCREEN,
              params: {email: email},
            });
          }
        }
      }
    } else {
      yield put(AuthActions.socialSignUpSuccess(payload));

      if (profileError != null) {
        const userType = yield select(selectors.typeOfUser);

        if (profileError) {
          const token = payload?.payload?.accessToken;
          if (token) {
            AsyncStorageHandler.storageHandler(ADD, token);
          }
          if (userType) {
            AsyncStorage.setItem('homeListWatchType', 'teacher');
            yield put(AuthActions.setEmail(email));
            const voipIosPush = 'string';
            const apnsPush = 'string';
            const gender = 1;
            const city = 'Tokyo';
            const firstName = 'Rock';
            const lesson = ' math';
            const phoneNumber = '08544788555';
            const school = 'sina';
            const data = Object.assign(
              {gender},
              {deviceInfo},
              {voipIosPush},
              {apnsPush},
              {email},
              {city},
              {firstName},
              {lesson},
              {phoneNumber},
              {school},
            );
            yield put(AuthActions.createTeacherProfile(data));
          } else {
            if (isIOS) {
              yield put(AuthActions.setEmail(email));
              const voipIosPush = 'string';
              const apnsPush = 'string';
              const gender = 1;

              const dob = new Date();

              const data = Object.assign(
                {firstName: 'John Cena'},
                {phoneNumber: '88445588000'},
                {gender},
                {deviceInfo},
                {dob},
                {userType},
                {voipIosPush},
                {apnsPush},
                {email},
              );
              yield put(AuthActions.createUserProfile(data));
              // navigateAndReset(STUDENTS_BOTTOMS_TABS);
            } else {
              navigate(STUDENT_STACK, {
                screen: STUDENT_SIGN_UP_COMPLETION_SCREEN,
                params: {email: email},
              });
            }
          }
        } else {
          // navigate(STUDENT_STACK, {
          //   screen: STUDENT_EMAIL_VERIFICATION_SCREEN,
          //   params: {email: email},
          // });
        }
      }
    }
    yield put(PopupsActions.hideModal(Strings.MODAL_TYPES.LOADING));

    // throw new Error('error');
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('social signUp Error', error);
  }
}

export function* situationUserSaga({param}) {
  try {
    const currentUser = yield GET.getCurrentUser();
    const payload = responseHandler(currentUser);
    if (payload?.res) {
      if (payload?.payload) {
        if (
          currentUser?.data?.code === 200 &&
          currentUser?.data?.data?.payload
        ) {
          yield put(
            AuthActions.setSituationUser(currentUser?.data?.data?.payload),
          );
        } else {
          showToast('e', string.SOMETHING_WENT_WRONG);
        }
      } else {
        showToast(
          'i',
          string.PLEASE_SIGN_IN_AGAIN,
          string.YOUR_TOKEN_HAS_EXPIRED,
        );
        navigate(STUDENT_STACK, PROFILE_SCREEN);
      }
    }

    console.log('currentUser', currentUser, payload);
  } catch (error) {
    yield put(AuthActions.onFail());
    console.log('resendVerification Error', error);
  }
}
