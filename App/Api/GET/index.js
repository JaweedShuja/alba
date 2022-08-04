import axios from '../axiosConfig';

const homeScreen = async () =>
  axios
    .get('/screens/v1/homeScreen')
    .then((res) => res)
    .catch((err) => err);

const educationGrade = async (param) =>
  axios
    .get('/grade/v1/getGradesByCategory', {params: param})
    .then((res) => res)
    .catch((err) => err);

const getStationeries = async (data) =>
  axios
    .get('/stationery/v1/getStationeries', data)
    .then((res) => res)
    .catch((err) => err);

const getLessonsTeachers = async (gradeId) =>
  axios
    .get('/lesson/v1/getLessonsTeachers', {params: {gradeId}})
    .then((res) => res)
    .catch((err) => err);

const getTeachersByLesson = async (lessonId) =>
  axios
    .get('/lesson/v1/getTeachersByLesson', {params: {lessonId}})
    .then((res) => res)
    .catch((err) => err);

const getCategories = async () =>
  axios
    .get('/category/v1/getCategories')
    .then((res) => res)
    .catch((err) => err);

const getTeacherScreen = async (param) =>
  axios
    .get('/screens/v1/teacherScreen', {params: param})
    .then((res) => res)
    .catch((err) => err);

const getTeacherInfo = async (teacherId) =>
  axios
    .get('/teacher/v1/getTeacher', {params: {teacherId}})
    .then((res) => res)
    .catch((err) => err);

const coursesScreen = async (gradeId) =>
  axios
    .get('/screens/v1/coursesScreen', {params: gradeId})
    .then((res) => res)
    .catch((err) => err);

const getEpisode = async (param) =>
  axios
    .get('/course/v1/getEpisode', {params: param})
    .then((res) => res)
    .catch((err) => err);

const getNoteByUser = async () =>
  axios
    .get('/note/v1/getNotesByUser')
    .then((res) => res)
    .catch((err) => err);

const getAllUserCourseTitles = async () =>
  axios
    .get('/schedule/v1/getAllUserCourseTitles')
    .then((res) => res)
    .catch((err) => err);

const getAllUserExamsScore = async () =>
  axios
    .get('/exam/v1/getAllUserExamsScore')
    .then((res) => res)
    .catch((err) => err);

const getUserSchedule = async (courseId) =>
  axios
    .get('/schedule/v1/getUserSchedule', {params: {courseId}})
    .then((res) => res)
    .catch((err) => err);

const getTeacherNotesByCourse = async (courseId) =>
  axios
    .get('/note/v1/getNotesByCourse', {params: {courseId}})
    .then((res) => res)
    .catch((err) => err);

const getCourseDetail = async (courseId) =>
  axios
    .get('/note/v1/getCourseDetail', {params: {courseId}})
    .then((res) => res)
    .catch((err) => err);

const getAllTeacherExamsList = async () =>
  axios
    .get('/exam/v1/getAllTeacherExamsList')
    .then((res) => res)
    .catch((err) => err);

const getAllExamAnswers = async (examId) =>
  axios
    .get('/exam/v1/getAllExamAnswers', {params: {examId}})
    .then((res) => res)
    .catch((err) => err);

const getAllUserExams = async () =>
  axios
    .get('/exam/v1/getAllUserExams')
    .then((res) => res)
    .catch((err) => err);

const getUserExam = async (examId) =>
  axios
    .get('/exam/v1/getUserExam', {params: {examId}})
    .then((res) => res)
    .catch((err) => err);

const getUserExamAnswers = async (param) =>
  axios
    .get('/exam/v1/getUserExamAnswers', {params: param})
    .then((res) => res)
    .catch((err) => err);

const getContactInfo = async () =>
  axios
    .get('/contact/v1/getContactInfo')
    .then((res) => res)
    .catch((err) => err);

const getTeacherCourse = async (courseId) =>
  axios
    .get('/course/v1/getTeacherCourse', {params: {courseId}})
    .then((res) => res)
    .catch((err) => err);

const getIsLoggedIn = async () =>
  axios
    .get('/user/v1/isLoggedIn')
    .then((res) => res)
    .catch((err) => err);

const getCurrentUser = async () =>
  axios
    .get('/user/v1/currentUser')
    .then((res) => res)
    .catch((err) => err);

const convertYoutubeUrl = async (param) => {
  return axios
    .get('/course/v1/convertYoutubeUrl', {
      params: param,
    })
    .then((res) => res)
    .catch((err) => err);
};

const getTeacherPassedExams = async () =>
  axios
    .get('/exam/v1/getTeacherFinishedExams')
    .then((res) => res)
    .catch((err) => err);

const userLogout = async (param) => {
  return (
    axios
      .get('/user/v1/logOut', {params: param})
      //.get('/user/v1/logOut')
      .then((res) => res)
      .catch((err) => err)
  );
};

const getInforms = async () =>
  axios
    .get('/inform/v1/getInforms')
    .then((res) => res)
    .catch((err) => err);

export default {
  homeScreen,
  educationGrade,
  getStationeries,
  getLessonsTeachers,
  getTeachersByLesson,
  getCategories,
  getTeacherScreen,
  getTeacherInfo,
  coursesScreen,
  getEpisode,
  getNoteByUser,
  getAllUserCourseTitles,
  getAllUserExamsScore,
  getUserSchedule,
  getTeacherNotesByCourse,
  getCourseDetail,
  getAllTeacherExamsList,
  getAllExamAnswers,
  getAllUserExams,
  getUserExam,
  getUserExamAnswers,
  getContactInfo,
  getTeacherCourse,
  getIsLoggedIn,
  getCurrentUser,
  convertYoutubeUrl,
  getTeacherPassedExams,
  userLogout,
  getInforms,
};
