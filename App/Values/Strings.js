import * as yup from 'yup';
import 'yup-phone';
import {string} from 'App/i18n';

const Routes = {
  SPLASH_SCREEN: 'SPLASH_SCREEN',
  MAIN_SCREEN: 'MAIN_SCREEN',
  CONTACT_US_SCREEN: 'CONTACT_US_SCREEN',
  HOME_SCREEN: 'HOME_SCREEN',
  SPECIAL_SCREEN: 'SPECIAL_SCREEN',
  PROFILE_SCREEN: 'PROFILE_SCREEN',
  MESSAGES_SCREEN: 'MESSAGES_SCREEN',
  COURSES_SCREEN: 'COURSES_SCREEN',
  CATEGORY_COURSES_SCREEN: 'CATEGORY_COURSES_SCREEN',
  COURSES_INFO_SCREEN: 'COURSES_INFO_SCREEN',
  COURSE_ACTIVATION_SCREEN: 'COURSE_ACTIVATION_SCREEN',
  STUDENT_SIGN_UP_SCREEN: 'STUDENT_SIGN_UP_SCREEN',
  SHOP_LIST_SCREEN: 'SHOP_LIST_SCREEN',
  STUDENT_GRADES_SCREEN: 'STUDENT_GRADES_SCREEN',
  STUDENT_EXAMS_SCREEN: 'STUDENT_EXAMS_SCREEN',
  STUDENT_LESSONS_NOTE_SCREEN: 'STUDENT_LESSONS_NOTE_SCREEN',
  STUDENT_LOGIN_SCREEN: 'STUDENT_LOGIN_SCREEN',
  FORGET_PASSWORD_SCREEN: 'FORGET_PASSWORD_SCREEN',
  RESET_PASSWORD_SCREEN: 'RESET_PASSWORD_SCREEN',
  COURSES_VIDEOS_SCREEN: 'COURSES_VIDEOS_SCREEN',
  VIDEO_SCREEN: 'VIDEO_SCREEN',
  ACTIVATION_SUCCESS_SCREEN: 'ACTIVATION_SUCCESS_SCREEN',
  STUDENT_SIGN_UP_COMPLETION_SCREEN: 'STUDENT_SIGN_UP_COMPLETION_SCREEN',
  LOGIN_SCREEN: 'LOGIN_SCREEN',
  STUDENT_MY_SCHEDULE_SCREEN: 'STUDENT_MY_SCHEDULE_SCREEN',
  STUDENT_EMAIL_VERIFICATION_SCREEN: 'STUDENT_EMAIL_VERIFICATION_SCREEN',
  SPECIAL_TEACHER_SCREEN: 'SPECIAL_TEACHER_SCREEN',
  TEACHER_ADD_LESSONS_NOTE_SCREEN: 'TEACHER_ADD_LESSONS_NOTE_SCREEN',
  TEACHER_ADD_REMOVE_EXAMS_SCREEN: 'TEACHER_ADD_REMOVE_EXAMS_SCREEN',
  TEACHER_SEE_READ_MORE_EXAMS_SCREEN: 'TEACHER_SEE_READ_MORE_EXAMS_SCREEN',
  EDUCATION_GRADE_SCREEN: 'EDUCATION_GRADE_SCREEN',
  EXAM_SCREEN: 'EXAM_SCREEN',
  CHAT_SCREEN: 'CHAT_SCREEN',
  TEACHER_ADD_NOTES_SCREEN: 'TEACHER_ADD_NOTES_SCREEN',
  TEACHER_LESSON_NOTES_SCREEN: 'TEACHER_LESSON_NOTES_SCREEN',
  TEACHER_ADD_EXAM_SCREEN: 'TEACHER_ADD_EXAM_SCREEN',
  TEACHER_SEE_ANSWER_SCREEN: 'TEACHER_SEE_ANSWER_SCREEN',
  TEACHER_ANSWERS_SCREEN: 'TEACHER_ANSWERS_SCREEN',
  CREATE_TEACHER_PROFILE: 'CREATE_TEACHER_PROFILE',
  STUDENT_STACK: 'STUDENT_STACK',
  TEACHER_STACK: 'TEACHER_STACK',
  STUDENTS_BOTTOMS_TABS: 'STUDENTS_BOTTOMS_TABS',
  TEACHER_BOTTOMS_TABS: 'TEACHER_BOTTOMS_TABS',
  HOME_TEACHER_SCREEN: 'HOME_TEACHER_SCREEN',
  TEACHER_ADD_EXAM_CLASSIC_SCREEN: 'TEACHER_ADD_EXAM_CLASSIC_SCREEN',
  STUDENT_EXAM_TEST_SCREEN: 'STUDENT_EXAM_TEST_SCREEN',
  TEACHER_ANSWERS_CLASSIC_SCREEN: 'TEACHER_ANSWERS_CLASSIC_SCREEN',
  TEACHERS: 'TEACHERS',
  TEACHER_COURSES_VIDEOS_SCREEN: 'TEACHER_COURSES_VIDEOS_SCREEN',
  TEACHER_VIDEO_SCREEN: 'TEACHER_VIDEO_SCREEN',
  PLAYER_SCREEN: 'PLAYER_SCREEN',
  TEACHER_SEE_READ_PASSED_EXAMS_SCREEN: 'TEACHER_SEE_READ_PASSED_EXAMS_SCREEN',
  TEACHER_SEE_PASSED_ANSWER_SCREEN: 'TEACHER_SEE_PASSED_ANSWER_SCREEN',
  TEACHER_ADD_EXAM_NOTE_SCREEN: 'TEACHER_ADD_EXAM_NOTE_SCREEN',
  NOTIFICATION_SCREEN: 'NOTIFICATION_SCREEN',
};

const ImageAddress = {
  BANNER_HEADER_IMAGE: require('App/Assets/Images/BanerHomeScreen.png'),
  COURSE_ACTIVATION_IMAGE: require('App/Assets/Images/courseactivation.png'),
  BACKGROUND_IMAGE_SUCCESS: require('../Assets/Images/bgsuccess.png'),
  TAB_BAR_IMAGE: require('App/Assets/Images/tab.png'),
  VIDEO_IMAGE: 'http://alotiti.ir/alba/video.png',
  MALE: require('App/Assets/Images/male.png'),
  FEMALE: require('App/Assets/Images/female.png'),
  PLACEHOLDER: require('App/Assets/Images/placeholder.png'),
  PDF: require('App/Assets/icons/pdfIcon.png'),
  CHECK: require('App/Assets/icons/checkedIcon.png'),
  SPLASHSCREEN: require('App/Assets/Images/splashLogo.png'),
};

const Icons = {
  RIGHT_ICON: 'right',
  LEFT_ICON: 'left',
  MESSAGENER: 'messenger-1',
  PHONE_CALL: 'phone-call-4',
  MAIL: 'mail',
  ATTACH: 'attach-paperclip-symbol-1',
  SEND: 'send-8',
  TEST_EXAM: 'test-exam',
  COMMENT: 'fi-rr-comment',
  HOME: 'fi-rr-home',
  CLOUD: 'cloud-computing-2',
  TIME: 'fi-rr-time-check',
  PDF: 'pdf-1',
  TEST: 'test',
  POST: 'post-it',
  SHOP: 'shop',
  CALENDAR: 'fi-rr-calendar',
  ENVELOPE: 'fi-rr-envelope',
  CANCEL: 'cancel-2',
  GRADUATION_HAT: 'graduation-hat',
  RIGHT_SMALL: 'fi-rr-angle-small-right',
  EQUALIZER: 'equalizer-2',
  USER: 'fi-rr-user1',
  USER_2: 'fi-rr-user',
  SEX: 'sex',
  SMARTPHONE: 'fi-rr-smartphone',
  CHECK: 'check',
  SCHEDULE: 'schedule',
  TEST_PEN: 'test-1',
  TEST_2: 'fi-rr-test',
  TEST_3: 'test-3',
  TICK: 'tick-1',
  LAYERS: 'layers-2',
  LOCK: 'lock-3',
  BOOK_ALT: 'fi-rr-book-alt',
  MICROPHONE: 'microphone-6',
  LOGIN: 'login',
  IRAQ: 'iraq',
  EMAIL: 'email-2',
  PLAY: 'play-button-5',
  EMAIL_OUTLINE: 'mail',
  BUILDING: 'building',
  UNIVERSITY: 'university',
  LOCATION: 'location-pin-3',
  GOOGLE: 'google-glass-logo',
  FACEBOOK: 'facebook-5',
  PLUS: 'plus-6',
  GALLERY: 'gallery',
  CAMERA: 'camera-3',
  PENCIL: 'pencil',
  TRASH: 'trash',
  CLOCK_CHECK: 'fi-rr-time-check',
  CLOCK_CLOSE: 'fi-rr-time-delete',
};

const CONSTANTS = {
  ACTIVE_OPACITY: 0.7,
  TOKEN: 'TOKEN',
  PLACEHOLDER_SPEED: 800,
  UPLOAD_URL: 'https://api.albaeducation.net/cdn/api/v1/upload',
  PRIVACY_POLICY_URL: 'https://albaeducation.net/privacy.html',
  TERMS_URL: 'https://albaeducation.net/terms.html',
};

const MODAL_TYPES = {
  CONFIRM_MODAL: 'CONFIRM_MODAL',
  IMAGE_VIEWER: 'IMAGE_VIEWER',
  NETWORK_CONNECTION: 'NETWORK_CONNECTION',
  LOADING: 'LOADING',
};

const MessageTypes = {
  NORMAL: 'NORMAL',
  SUPPORT: 'SUPPORT',
  REPLAYEPISODE: 'REPLAYEPISODE',
};

export const useStrings = () => {
  const Data = {
    CONTACT_US_TO_BUY: string.CONTACT_US_TO_BUY,
    VALIDATION_QUESTION_STRING: {
      text: yup.string().required(string.THIS_FIELD_IS_REQUIRED),
    },
    VALIDATION_SCORE: {
      score: yup
        .number()
        .test('len', string.MAX_3_NUMBERS, (val) => val.toString().length <= 3)
        .required(string.THE_SCORE_SHOULD_NOT_BE_BLANK)
        .min(0, string.THE_SCORE_SHOULD_NOT_BE_LESS_THAN_0)
        .max(100, string.THE_SCORE_SHOULD_NOT_BE_MORE_THAN_100),
    },
    VALIDATION_SIGN_UP: {
      email: yup
        .string()
        .email(string.EMAIL_MUST_BE_A_VALID_EMAIL)
        .required(string.EMAIL_IS_REQUIRED),
      password: yup
        .string()
        .min(4, string.PASSWORD_MUST_NOT_BE_LESS_THAN_10_CHARACTERS)
        .max(10, string.PASSWORD_SHOULD_NOT_EXCCED_10_CHARS)
        .required(string.PASSWORD_IS_REQUIRED),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], string.PASSWORDS_MUST_MATCH)
        .required(string.CONFIRM_PASSWORD_IS_REQUIRED),
    },
    VALIDATION_SIGN_IN: {
      email: yup
        .string()
        .email(string.EMAIL_MUST_BE_A_VALID_EMAIL)
        .required(string.EMAIL_IS_REQUIRED),
      password: yup
        .string()
        .min(4, string.PASSWORD_MUST_NOT_BE_LESS_THAN_10_CHARACTERS)
        .max(10, string.PASSWORD_SHOULD_NOT_EXCCED_10_CHARS)
        .required(string.PASSWORD_IS_REQUIRED),
    },
    VALIDATION_STUDENT_COMPLETION_PROFILE: {
      firstName: yup
        .string()
        .required(string.FIRST_NAME_IS_REQUIRED)
        .min(2, string.FIRST_NAME_IS_TOO_SHORT),
      phoneNumber: yup
        .string()
        .min(11, string.THE_PHONE_NUMBER_MUST_BE_EXACTLY_11_DIGITS)
        .max(11, string.THE_PHONE_NUMBER_MUST_BE_EXACTLY_11_DIGITS)
        .required(string.PHONE_NUMBER_IS_REQUIRED),
    },
    VALIDATION_CREATE_TEACHER_PROFILE: {
      firstName: yup
        .string()
        .required(string.FIRST_NAME_IS_REQUIRED)
        .min(2, string.FIRST_NAME_IS_TOO_SHORT),
      phoneNumber: yup
        .string()
        .min(11, string.THE_PHONE_NUMBER_MUST_BE_EXACTLY_11_DIGITS)
        .max(11, string.THE_PHONE_NUMBER_MUST_BE_EXACTLY_11_DIGITS)
        .required(string.PHONE_NUMBER_IS_REQUIRED),
      school: yup.string().required(string.THIS_FIELD_IS_REQUIRED),
      lesson: yup.string().required(string.THIS_FIELD_IS_REQUIRED),
      city: yup.string().required(string.THIS_FIELD_IS_REQUIRED),
    },
    VALIDATION_RESET_PASSWORD: {
      password: yup
        .string()
        .min(4, string.PASSWORD_MUST_NOT_BE_LESS_THAN_10_CHARACTERS)
        .max(10, string.PASSWORD_SHOULD_NOT_EXCCED_10_CHARS)
        .required(string.PASSWORD_IS_REQUIRED),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], string.PASSWORDS_MUST_MATCH)
        .required(string.CONFIRM_PASSWORD_IS_REQUIRED),
    },
    VALIDATION_COURSE_ACTIVATION_CODE: {
      activationCode: yup
        .string()
        .min(10, string.COURSE_ACTIVATION_SHOULD_NOT_EXCCED_10_CHARS)
        .max(10, string.COURSE_ACTIVATION_SHOULD_NOT_EXCCED_10_CHARS)
        .required(string.ACTIVATION_CODE_IS_A_REQUIRED_FIELD),
    },
    VALIDATION_TEACHER_ADD_NOTE: {
      noteName: yup.string().required(string.NOTE_NAME_IS_REQUIRED),
    },
  };

  return Data;
};

export default {
  Routes,
  ImageAddress,
  Icons,
  CONSTANTS,
  MessageTypes,
  MODAL_TYPES,
};
