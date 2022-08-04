import {takeLatest, all, fork} from 'redux-saga/effects';
import {ExampleTypes} from 'App/Stores/Example/Actions';
import {StartupTypes} from 'App/Stores/Startup/Actions';
import {fetchUser} from './ExampleSaga';
import {startup} from './StartupSaga';
import {AppDataType} from '../Stores/AppData/Actions';
import {TeacherDataType} from '../Stores/TeacherData/Actions';
import {AuthTypes} from '../Stores/Authentication/Actions';
import {SocketTypes} from '../Stores/Socket/Actions';
import {networkSaga, offlineActionTypes} from 'react-native-offline';
import {Config} from 'App/Config';
import {
  getHomeScreenSaga,
  educationGradeSaga,
  setIsTeacherSaga,
  getStationeriesSaga,
  getLessonsTeachersSaga,
  getCategoriesSaga,
  getTeacherInfoSaga,
  getCourseActivationSaga,
  getCoursesScreenSaga,
  getEpisodeSaga,
  getNoteByUserSaga,
  getAllUserCourseTitlesSaga,
  getAllUserExamsScoreSaga,
  getUserScheduleSaga,
  deleteFileSaga,
  getAllUserExamsSaga,
  getUserExamSaga,
  userAnswerToExamSaga,
  getContactInfoSaga,
  getTeachersByLessonSaga,
  convertYoutubeUrlSaga,
  userLogoutSaga,
  educationGradeStHomeSaga,
  getCategoriesStHomeSaga,
  getInformsSaga,
  updateTokenSaga,
} from './AppDataSaga';
import {
  signUpSaga,
  verifyByEmailSaga,
  resendVerificationCode,
  signInByEmail,
  createUserProfileSaga,
  requestResetPasswordSaga,
  resetPasswordCheckTokenSaga,
  resetPasswordSaga,
  createTeacherProfileSaga,
  isLoggedInSaga,
  getCurrentUserSaga,
  socialSignUpSaga,
  appleSignUpSaga,
  situationUserSaga,
} from './AuthSaga';
import {
  getTeacherScreenSaga,
  getTeacherNotesSaga,
  getCourseDetailSaga,
  addNoteSaga,
  addExamSaga,
  getAllTeacherExamsListSaga,
  getAllExamAnswersSaga,
  finishExamSaga,
  getUserExamAnswersSaga,
  submitExamScoreForUserSaga,
  getTeacherCourseSaga,
  getTeacherPassedExamsSaga,
  deleteExamSaga,
} from './TeacherDataSaga';

import {socketConnectSaga} from './SocketSaga';
import {UserChatTypes} from '../Stores/UserChats/Actions';
import userChatsSaga from '../Stores/UserChats/userChats.saga';
import {logOutSaga} from './LogOutSaga';

import {onConnectionChange} from './NetworkSaga';

export default function* root() {
  yield all([
    fork(userChatsSaga),
    fork(networkSaga, {
      pingInterval: 10000,
      pingTimeout: Config.PING_TIME_OUT,
      pingOnlyIfOffline: true,
      pingServerUrl: Config.PING_SERVER_URL,
    }),
    takeLatest(offlineActionTypes.CONNECTION_CHANGE, onConnectionChange),
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    takeLatest(AuthTypes.SIGN_UP, signUpSaga),
    takeLatest(AuthTypes.SIGN_IN, signInByEmail),
    takeLatest(AuthTypes.CREATE_USER_PROFILE, createUserProfileSaga),
    takeLatest(AuthTypes.CREATE_TEACHER_PROFILE, createTeacherProfileSaga),
    takeLatest(AuthTypes.LOG_OUT, logOutSaga),
    takeLatest(AuthTypes.VERIFY_BY_EMAIL, verifyByEmailSaga),
    takeLatest(AuthTypes.RESEND_VERIFICATION_CODE, resendVerificationCode),
    takeLatest(AuthTypes.REQUEST_RESET_PASSWORD, requestResetPasswordSaga),
    takeLatest(
      AuthTypes.RESET_PASSWORD_CHECK_TOKEN,
      resetPasswordCheckTokenSaga,
    ),
    takeLatest(AuthTypes.RESET_PASSWORD, resetPasswordSaga),
    takeLatest(AuthTypes.IS_LOGGED_IN, isLoggedInSaga),
    takeLatest(AuthTypes.GET_USER_PROFILE, getCurrentUserSaga),
    takeLatest(AuthTypes.SOCIAL_SIGN_UP, socialSignUpSaga),
    takeLatest(AuthTypes.APPLE_SIGN_UP, appleSignUpSaga),
    takeLatest(AuthTypes.GET_SITUATION_USER, situationUserSaga),

    //==========================APP DATA===========================
    takeLatest(AppDataType.HOME_SCREEN, getHomeScreenSaga),
    takeLatest(AppDataType.GET_INFORMS, getInformsSaga),
    takeLatest(AppDataType.EDUCATION_GRADE, educationGradeSaga),
    takeLatest(AppDataType.IS_TEACHER, setIsTeacherSaga),
    takeLatest(AppDataType.GET_STATIONERIES, getStationeriesSaga),
    takeLatest(AppDataType.GET_LESSONS_TEACHERS, getLessonsTeachersSaga),
    takeLatest(AppDataType.GET_CATEGORIES, getCategoriesSaga),
    takeLatest(AppDataType.GET_TEACHER_INFO, getTeacherInfoSaga),
    takeLatest(AppDataType.COURSE_ACTIVATION, getCourseActivationSaga),
    takeLatest(AppDataType.COURSES_SCREEN, getCoursesScreenSaga),
    takeLatest(AppDataType.GET_EPISODE, getEpisodeSaga),
    takeLatest(AppDataType.GET_NOTE_BY_USER, getNoteByUserSaga),
    takeLatest(
      AppDataType.GET_ALL_USER_COURSE_TITLES,
      getAllUserCourseTitlesSaga,
    ),
    takeLatest(AppDataType.GET_ALL_USER_EXAMS_SCORE, getAllUserExamsScoreSaga),
    takeLatest(AppDataType.GET_USER_SCHEDULE, getUserScheduleSaga),
    takeLatest(AppDataType.GET_ALL_USER_EXAMS, getAllUserExamsSaga),
    takeLatest(AppDataType.GET_USER_EXAM, getUserExamSaga),
    takeLatest(AppDataType.USER_ANSWER_TO_EXAM, userAnswerToExamSaga),
    takeLatest(AppDataType.DELETE_FILE, deleteFileSaga),
    takeLatest(AppDataType.GET_CONTACT_INFO, getContactInfoSaga),
    takeLatest(AppDataType.GET_TEACHERS_BY_LESSON, getTeachersByLessonSaga),
    takeLatest(AppDataType.CONVERT_YOUTUBE_URL, convertYoutubeUrlSaga),
    takeLatest(AppDataType.USER_LOGOUT, userLogoutSaga),
    takeLatest(AppDataType.EDUCATION_GRADE_ST_HOME, educationGradeStHomeSaga),
    takeLatest(AppDataType.GET_CATEGORIES_ST_HOME, getCategoriesStHomeSaga),
    takeLatest(AppDataType.UPDATE_TOKEN, updateTokenSaga),
    //==========================TEACHER DATA===========================
    takeLatest(TeacherDataType.GET_TEACHER_SCREEN, getTeacherScreenSaga),
    takeLatest(TeacherDataType.GET_TEACHER_NOTES, getTeacherNotesSaga),
    takeLatest(TeacherDataType.GET_COURSE_DETAIL, getCourseDetailSaga),
    takeLatest(TeacherDataType.ADD_NOTE, addNoteSaga),
    takeLatest(TeacherDataType.ADD_EXAM, addExamSaga),
    takeLatest(
      TeacherDataType.GET_ALL_TEACHER_EXAMS_LIST,
      getAllTeacherExamsListSaga,
    ),
    takeLatest(TeacherDataType.GET_ALL_EXAM_ANSWERS, getAllExamAnswersSaga),
    takeLatest(TeacherDataType.FINISH_EXAM, finishExamSaga),
    takeLatest(TeacherDataType.GET_USER_EXAM_ANSWERS, getUserExamAnswersSaga),
    takeLatest(
      TeacherDataType.SUBMIT_EXAM_SCORE_FOR_USER,
      submitExamScoreForUserSaga,
    ),
    takeLatest(TeacherDataType.GET_TEACHER_COURSE, getTeacherCourseSaga),
    takeLatest(
      TeacherDataType.GET_TEACHER_PASSED_EXAMS,
      getTeacherPassedExamsSaga,
    ),
    takeLatest(TeacherDataType.DELETE_EXAM, deleteExamSaga),
    //==========================SOCKET SAGA===========================
    takeLatest(SocketTypes.INITIAL_SOCKET, socketConnectSaga),
  ]);
}
