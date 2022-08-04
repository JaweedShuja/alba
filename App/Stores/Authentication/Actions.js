import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  onFail: null,
  userLoggedIn: null,
  signUp: ['param'],
  signUpSuccess: ['data'],
  signIn: ['param'],
  signInSuccess: ['data'],
  verifyByEmail: ['param'],
  verifyByEmailSuccess: ['data'],
  resendVerificationCode: ['param'],
  resendVerificationCodeSuccess: ['data'],
  createUserProfile: ['param'],
  createUserProfileSuccess: ['data'],
  createTeacherProfile: ['param'],
  createTeacherProfileSuccess: ['data'],
  requestResetPassword: ['param'],
  // requestResetPasswordSuccess: ['Bool'],
  requestResetPasswordSuccess: ['data'],
  resetPasswordCheckToken: ['param'],
  resetPasswordCheckTokenSuccess: ['data'],
  resetPassword: ['param'],
  resetPasswordSuccess: ['data'],
  isLoggedIn: null,
  isLoggedInSuccess: ['data'],
  setUserProfile: ['data'],
  getUserProfile: ['data'],
  logOut: null,
  socialSignUp: ['param'],
  socialSignUpSuccess: ['data'],
  appleSignUp: ['param'],
  appleSignUpSuccess: ['data'],
  setEmail: ['data'],
  getSituationUser: null,
  setSituationUser: ['data'],
});

export const AuthTypes = Types;
export default Creators;