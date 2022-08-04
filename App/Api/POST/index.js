import axios from '../axiosConfig';

const getId = async (data) => {
  return axios
    .post('/device/v1/createDevice', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const signupByEmail = async (data) => {
  return axios
    .post('/user/v1/signupByEmail', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const signInByEmail = async (data) => {
  return axios
    .post('/user/v1/signinByEmail', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const verifyByEmail = async (data) => {
  return axios
    .post('/user/v1/verifyByEmail', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const resendVerificationCode = async (data) => {
  return axios
    .post('/user/v1/resendVerificationCode', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const createUserProfile = async (data) => {
  return axios
    .post('/user/v1/createUserProfile', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const createTeacherProfile = async (data) => {
  return axios
    .post('/user/v1/createTeacherProfile', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const requestResetPassword = async (data) => {
  return axios
    .post('/user/v1/requestResetPassword', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const resetPasswordCheckToken = async (data) => {
  console.log('reset password check token', {data});
  return axios
    .post('/user/v1/resetPasswordCheckToken', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const resetPassword = async (data) => {
  console.log('reset password', {data});
  return axios
    .post('/user/v1/resetPassword', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const courseActivation = async (data) => {
  console.log('courseActivation', {data});
  return axios
    .post('/course/v1/courseActivation', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const addNote = async (data) => {
  console.log('addNote', {data});
  return axios
    .post('/note/v1/addNote', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const addExam = async (data) => {
  console.log('addExam', {data});
  return axios
    .post('/exam/v1/addExam', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const userAnswerToExam = async (data) => {
  console.log('userAnswerToExam', {data});
  return axios
    .post('/exam/v1/userAnswerToExam', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const submitExamScoreForUser = async (data) => {
  console.log('submitExamScoreForUser', {data});
  return axios
    .post('/exam/v1/submitExamScoreForUser', {...data})
    .then((res) => res)
    .catch((err) => err);
};

const finishExam = async (examId) => {
  console.log('finishExam', {examId});
  return axios
    .post('/exam/v1/finishExam', {examId})
    .then((res) => res)
    .catch((err) => err);
};

const socialSignUp = async (data) => {
  return axios
    .post('/user/v1/signinBySocial', {...data})
    .then((res) => res)
    .catch((err) => err);
};

export default {
  getId,
  signupByEmail,
  verifyByEmail,
  resendVerificationCode,
  signInByEmail,
  createUserProfile,
  createTeacherProfile,
  requestResetPassword,
  resetPasswordCheckToken,
  resetPassword,
  courseActivation,
  addNote,
  addExam,
  finishExam,
  userAnswerToExam,
  submitExamScoreForUser,
  socialSignUp,
};
