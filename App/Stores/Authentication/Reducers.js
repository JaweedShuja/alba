import {createReducer} from 'reduxsauce';
import {INITIAL_STATE} from './InitialState';
import {AuthTypes} from './Actions';

export const checkUserToken = (state, {token = null}) => ({
  ...state,
  token: token,
});

const onFail = (state) => ({
  ...state,
  signUpLoading: false,
  resendVerificationCodeLoading: false,
  signInLoading: false,
  createUserProfileLoading: false,
  requestResetPasswordLoading: false,
  resetPasswordCheckTokenLoading: false,
  resetPasswordLoading: false,
  createTeacherProfileLoading: false,
  isLoggedInLoading: false,
  verifyByEmailLoading: false,
  socialSignUpLoading: false,
  appleSignUpLoading: false,
  situationUserLoading: false,
});

const signUp = (state) => ({
  ...state,
  signUpLoading: true,
});

const signUpSuccess = (state, {data}) => ({
  ...state,
  signUpSuccessData: data,
  signUpLoading: false,
});

const signIn = (state) => ({
  ...state,
  signInLoading: true,
});

const signInSuccess = (state, {data}) => ({
  ...state,
  signInSuccessData: data,
  signInLoading: false,
});

const verifyByEmail = (state) => ({
  ...state,
  verifyByEmailLoading: true,
});

const verifyByEmailSuccess = (state, {data}) => ({
  ...state,
  verifyByEmailLoading: false,
  verifyByEmailData: data,
});

const resendVerificationCode = (state) => ({
  ...state,
  resendVerificationCodeLoading: true,
});

const resendVerificationCodeSuccess = (state, {data}) => ({
  ...state,
  resendVerificationCodeLoading: false,
  verifyByEmailData: data,
});

const createUserProfile = (state) => ({
  ...state,
  createUserProfileLoading: true,
});

const createUserProfileSuccess = (state, {data}) => ({
  ...state,
  createUserProfileLoading: false,
  createUserProfileData: data,
});

const createTeacherProfile = (state) => ({
  ...state,
  createTeacherProfileLoading: true,
});

const createTeacherProfileSuccess = (state, {data}) => ({
  ...state,
  createTeacherProfileLoading: false,
  createTeacherProfileData: data,
});

const requestResetPassword = (state, {data}) => ({
  ...state,
  requestResetPasswordLoading: true,
  requestResetPasswordSuccess: data,
});

const requestResetPasswordSuccess = (state, {data}) => ({
  ...state,
  requestResetPasswordLoading: false,
  requestResetPasswordSuccess: data,
});

const resetPasswordCheckToken = (state, {data}) => ({
  ...state,
  resetPasswordCheckTokenLoading: true,
});

const resetPasswordCheckTokenSuccess = (state, {data}) => ({
  ...state,
  resetPasswordCheckTokenLoading: false,
  resetPasswordCheckTokenSuccess: data,
});

const resetPassword = (state, {data}) => ({
  ...state,
  resetPasswordLoading: true,
});

const resetPasswordSuccess = (state, {data}) => ({
  ...state,
  resetPasswordLoading: false,
  resetPasswordSuccess: data,
});

const isLoggedIn = (state) => ({
  ...state,
  isLoggedInLoading: true,
});

const isLoggedInSuccess = (state, {data}) => ({
  ...state,
  isLoggedInLoading: false,
  isLoggedInSuccess: data,
});

export const setUserProfileData = (state, {data}) => ({
  ...state,
  userProfileData: data,
});

const socialSignUp = (state, {param}) => ({
  ...state,
  socialSignUpLoading: true,
  socialData: param,
});

const socialSignUpSuccess = (state, {data}) => ({
  ...state,
  socialSignUpSuccessData: data,
  socialSignUpLoading: false,
});

const appleSignUp = (state, {param}) => ({
  ...state,
  appleSignUpLoading: true,
  appleData: param,
});

const appleSignUpSuccess = (state, {data}) => ({
  ...state,
  appleSignUpSuccessData: data,
  appleSignUpLoading: false,
});

const setEmail = (state, {data}) => ({
  ...state,
  email: data,
});

const getSituationUser = (state, {param}) => ({
  ...state,
  situationUserLoading: true,
});

const setSituationUser = (state, {data}) => ({
  ...state,
  situationUser: data,
  situationUserLoading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.ON_FAIL]: onFail,
  [AuthTypes.SIGN_UP]: signUp,
  [AuthTypes.SIGN_UP_SUCCESS]: signUpSuccess,
  [AuthTypes.SIGN_IN]: signIn,
  [AuthTypes.SIGN_IN_SUCCESS]: signInSuccess,
  [AuthTypes.VERIFY_BY_EMAIL]: verifyByEmail,
  [AuthTypes.VERIFY_BY_EMAIL_SUCCESS]: verifyByEmailSuccess,
  [AuthTypes.RESEND_VERIFICATION_CODE]: resendVerificationCode,
  [AuthTypes.RESEND_VERIFICATION_CODE_SUCCESS]: resendVerificationCodeSuccess,
  [AuthTypes.USER_LOGGED_IN]: checkUserToken,
  [AuthTypes.CREATE_USER_PROFILE]: createUserProfile,
  [AuthTypes.CREATE_USER_PROFILE_SUCCESS]: createUserProfileSuccess,
  [AuthTypes.CREATE_TEACHER_PROFILE]: createTeacherProfile,
  [AuthTypes.CREATE_TEACHER_PROFILE_SUCCESS]: createTeacherProfileSuccess,
  [AuthTypes.REQUEST_RESET_PASSWORD]: requestResetPassword,
  [AuthTypes.REQUEST_RESET_PASSWORD_SUCCESS]: requestResetPasswordSuccess,
  [AuthTypes.RESET_PASSWORD_CHECK_TOKEN]: resetPasswordCheckToken,
  [AuthTypes.RESET_PASSWORD_CHECK_TOKEN_SUCCESS]:
    resetPasswordCheckTokenSuccess,
  [AuthTypes.RESET_PASSWORD]: resetPassword,
  [AuthTypes.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [AuthTypes.IS_LOGGED_IN]: isLoggedIn,
  [AuthTypes.SET_USER_PROFILE]: setUserProfileData,
  [AuthTypes.IS_LOGGED_IN_SUCCESS]: isLoggedInSuccess,
  [AuthTypes.SOCIAL_SIGN_UP]: socialSignUp,
  [AuthTypes.SOCIAL_SIGN_UP_SUCCESS]: socialSignUpSuccess,
  [AuthTypes.APPLE_SIGN_UP]: appleSignUp,
  [AuthTypes.APPLE_SIGN_UP_SUCCESS]: appleSignUpSuccess,
  [AuthTypes.GET_SITUATION_USER]: getSituationUser,
  [AuthTypes.SET_SITUATION_USER]: setSituationUser,
  [AuthTypes.SET_EMAIL]: setEmail,
});
