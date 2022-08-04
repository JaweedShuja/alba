import {createReducer} from 'reduxsauce';
import {INITIAL_STATE} from './InitialState';
import {AppDataType} from './Actions';

const onFail = (state) => ({
  ...state,
  educationGradeLoading: false,
  homeLoading: false,
  getStationeriesLoading: false,
  getLessonsTeacherLoading: false,
  getCategoriesLoading: false,
  courseActivationLoading: false,
  coursesScreenLoading: false,
  getEpisodeLoading: false,
  getNoteByUserLoading: false,
  userCourseTitlesLoading: false,
  examsScoreLoading: false,
  userScheduleLoading: false,
  courseDetailLoading: false,
  deleteFileLoading: false,
  getAllUserExamsLoading: false,
  getUserExamLoading: false,
  userAnswerToExamLoading: false,
  getContactInfoLoading: false,
  getTeachersByLessonLoading: false,
  convertYoutubeUrlLoading: false,
  userLogoutLoading: false,
  educationGradeStHomeLoading: false,
  getCategoriesStHomeLoading: false,
  getInformsLoading: false,
  updateTokenLoading: false,
});

// const onRegionChange = (state, {region}) => ({
//   ...state,
//   region,
// });

const getHomeScreen = (state) => ({
  ...state,
  homeLoading: true,
});

const setHomeData = (state, {data}) => ({
  ...state,
  homeLoading: false,
  homeScreen: data,
});

const setHomeScreenType = (state, {Bool}) => ({
  ...state,
  homeScreenType: Bool,
});

const getEducationGradeList = (state, {data}) => ({
  ...state,
  educationGradeLoading: true,
  // currentCategoryId: data,
});

const setEducationGradeList = (state, {data}) => ({
  ...state,
  educationGradeLoading: false,
  educationGrade: data,
});

const setIsTeacher = (state, {data}) => ({
  ...state,
  isTeacher: data,
});

const getStationeries = (state) => ({
  ...state,
  getStationeriesLoading: true,
});

const getStationeriesSuccess = (state, {data}) => ({
  ...state,
  getStationeriesLoading: false,
  getStationeriesData: data,
});

const setDateBirthday = (state, {data}) => ({
  ...state,
  dateBirthdayData: data,
});

const setGenderUser = (state, {Bool}) => ({
  ...state,
  genderUserData: Bool,
});

const getLessonsTeachers = (state, {param}) => ({
  ...state,
  getLessonsTeacherLoading: true,
  // currentGradeId: param,
});

const setLessonsTeachers = (state, {data}) => ({
  ...state,
  getLessonsTeacherLoading: false,
  getLessonsTeachersData: data,
});

const getCategories = (state) => ({
  ...state,
  getCategoriesLoading: true,
});

const setCategoriesData = (state, {data}) => ({
  ...state,
  getCategoriesLoading: false,
  getCategoriesData: data,
});

const getTeacherInfo = (state, {param}) => ({
  ...state,
  getTeacherInfoLoading: true,
});

const setTeacherInfoData = (state, {data}) => ({
  ...state,
  getTeacherInfoLoading: false,
  getTeacherInfoSuccess: data,
});

const setCategoryTitle = (state, {data}) => ({
  ...state,
  categoryTitle: data,
});

const setGradeTitle = (state, {data}) => ({
  ...state,
  gradeTitle: data,
});

const setCategoryTitleLesson = (state, {data}) => ({
  ...state,
  categoryTitleLesson: data,
  // currentGradeId: null,
});

const setGradeTitleLesson = (state, {data}) => ({
  ...state,
  gradeTitleLesson: data,
});

const setCategoryTitleCourses = (state, {data}) => ({
  ...state,
  categoryTitleCourses: data,
});

const setGradeTitleCourses = (state, {data}) => ({
  ...state,
  gradeTitleCourses: data,
});

const getCourseActivation = (state, {param}) => ({
  ...state,
  courseActivationLoading: true,
});

const setCourseActivation = (state, {data}) => ({
  ...state,
  courseActivationLoading: false,
  courseActivationSuccess: data,
});

const getCoursesScreen = (state, {param}) => ({
  ...state,
  coursesScreenLoading: true,
  // currentCategoryId: param,
});

const setCoursesScreen = (state, {data}) => ({
  ...state,
  coursesScreenLoading: false,
  coursesScreenSuccess: data,
});

const getEpisode = (state) => ({
  ...state,
  getEpisodeLoading: true,
});

const setEpisode = (state, {data}) => ({
  ...state,
  getEpisodeLoading: false,
  EpisodeData: data,
});

const getNoteByUser = (state) => ({
  ...state,
  getNoteByUserLoading: true,
});

const setNoteByUser = (state, {data}) => ({
  ...state,
  getNoteByUserLoading: false,
  getNoteByUserData: data,
});

const setCurrentCategoryId = (state, {data}) => ({
  ...state,
  currentCategoryId: data,
});

const setCurrentGradeId = (state, {data}) => ({
  ...state,
  currentGradeId: data,
});

const getAllUserCourseTitles = (state) => ({
  ...state,
  userCourseTitlesLoading: true,
});

const setAllUserCourseTitles = (state, {data}) => ({
  ...state,
  userCourseTitlesLoading: false,
  userCourseTitles: data,
});

const getAllUserExamsScore = (state) => ({
  ...state,
  examsScoreLoading: true,
});

const setAllUserExamsScore = (state, {data}) => ({
  ...state,
  examsScoreLoading: false,
  examsScore: data,
});

const getUserSchedule = (state) => ({
  ...state,
  userScheduleLoading: true,
});

const setUserSchedule = (state, {data}) => ({
  ...state,
  userScheduleLoading: false,
  userScheduleData: data,
});

const deleteFile = (state, {param}) => ({
  ...state,
  deleteFileLoading: true,
});

const deleteFileSuccess = (state, {data}) => ({
  ...state,
  deleteFileLoading: false,
  deleteFileSuccess: data,
});

const getAllUserExams = (state) => ({
  ...state,
  getAllUserExamsLoading: true,
});

const setAllUserExams = (state, {data}) => ({
  ...state,
  getAllUserExamsLoading: false,
  allUserExams: data,
});

const getUserExams = (state) => ({
  ...state,
  getUserExamLoading: true,
});

const setUserExams = (state, {data}) => ({
  ...state,
  getUserExamLoading: false,
  getUserExamData: data,
});

const getUserAnswerToExam = (state) => ({
  ...state,
  userAnswerToExamLoading: true,
});

const userAnswerToExamSuccess = (state, {data}) => ({
  ...state,
  userAnswerToExamLoading: false,
  userAnswerToExamSuccess: data,
});

const getContactInfo = (state) => ({
  ...state,
  getContactInfoLoading: true,
});

const setContactInfo = (state, {data}) => ({
  ...state,
  getContactInfoLoading: false,
  contactInfo: data,
});

const getTeachersByLesson = (state) => ({
  ...state,
  getTeachersByLessonLoading: true,
});

const setTeachersByLesson = (state, {data}) => ({
  ...state,
  getTeachersByLessonLoading: false,
  getTeachersByLessonData: data,
});

const getConvertYoutubeUrl = (state) => ({
  ...state,
  convertYoutubeUrlLoading: true,
});

const setConvertYoutubeUrl = (state, {data}) => ({
  ...state,
  convertYoutubeUrlLoading: false,
  YoutubeUrl: data,
});

const getUserLogout = (state, {param}) => ({
  ...state,
  userLogoutLoading: true,
});

const setUserLogout = (state, {data}) => ({
  ...state,
  userLogoutLoading: false,
  userLogout: data,
});

const getEducationGradeListStHome = (state, {data}) => ({
  ...state,
  educationGradeStHomeLoading: true,
});

const setEducationGradeListStHome = (state, {data}) => ({
  ...state,
  educationGradeStHomeLoading: false,
  educationGradeStHome: data,
});

const getCategoriesStHome = (state) => ({
  ...state,
  getCategoriesStHomeLoading: true,
});

const setCategoriesDataStHome = (state, {data}) => ({
  ...state,
  getCategoriesStHomeLoading: false,
  getCategoriesDataStHome: data,
});

const getInforms = (state) => ({
  ...state,
  getInformsLoading: true,
});

const setInforms = (state, {data}) => ({
  ...state,
  getInformsLoading: false,
  getInformsSuccess: data,
});

const updateToken = (state) => ({
  ...state,
  updateTokenLoading: true,
});

const updateTokenSuccess = (state, {data}) => ({
  ...state,
  updateTokenLoading: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  //[AppDataType.SELECTED_REGION]: onRegionChange,
  [AppDataType.ON_FAIL]: onFail,
  [AppDataType.HOME_SCREEN]: getHomeScreen,
  [AppDataType.HOME_SCREEN_SUCCESS]: setHomeData,
  [AppDataType.HOME_SCREEN_TYPE]: setHomeScreenType,
  [AppDataType.EDUCATION_GRADE]: getEducationGradeList,
  [AppDataType.EDUCATION_GRADE_SUCCESS]: setEducationGradeList,
  [AppDataType.IS_TEACHER_SUCCESS]: setIsTeacher,
  [AppDataType.GET_STATIONERIES]: getStationeries,
  [AppDataType.GET_STATIONERIES_SUCCESS]: getStationeriesSuccess,
  [AppDataType.SET_DATE_BIRTHDAY]: setDateBirthday,
  [AppDataType.SET_GENDER_USER]: setGenderUser,
  [AppDataType.GET_LESSONS_TEACHERS]: getLessonsTeachers,
  [AppDataType.GET_LESSONS_TEACHERS_SUCCESS]: setLessonsTeachers,
  [AppDataType.GET_CATEGORIES]: getCategories,
  [AppDataType.GET_CATEGORIES_SUCCESS]: setCategoriesData,
  [AppDataType.GET_TEACHER_INFO]: getTeacherInfo,
  [AppDataType.GET_TEACHER_INFO_SUCCESS]: setTeacherInfoData,
  [AppDataType.SET_CATEGORY_TITLE]: setCategoryTitle,
  [AppDataType.SET_GRADE_TITLE]: setGradeTitle,
  [AppDataType.SET_CATEGORY_TITLE_LESSON]: setCategoryTitleLesson,
  [AppDataType.SET_GRADE_TITLE_LESSON]: setGradeTitleLesson,
  [AppDataType.COURSE_ACTIVATION]: getCourseActivation,
  [AppDataType.COURSE_ACTIVATION_SUCCESS]: setCourseActivation,
  [AppDataType.DELETE_FILE]: deleteFile,
  [AppDataType.DELETE_FILE_SUCCESS]: deleteFileSuccess,
  [AppDataType.COURSES_SCREEN]: getCoursesScreen,
  [AppDataType.COURSES_SCREEN_SUCCESS]: setCoursesScreen,
  [AppDataType.GET_EPISODE]: getEpisode,
  [AppDataType.SET_EPISODE_DATA]: setEpisode,
  [AppDataType.GET_NOTE_BY_USER]: getNoteByUser,
  [AppDataType.GET_NOTE_BY_USER_SUCCESS]: setNoteByUser,
  [AppDataType.SET_CATEGORY_TITLE_COURSES]: setCategoryTitleCourses,
  [AppDataType.SET_GRADE_TITLE_COURSES]: setGradeTitleCourses,
  [AppDataType.SET_CURRENT_GRADE_ID]: setCurrentGradeId,
  [AppDataType.SET_CURRENT_CATEGORY_ID]: setCurrentCategoryId,
  [AppDataType.GET_ALL_USER_COURSE_TITLES]: setAllUserCourseTitles,
  [AppDataType.GET_ALL_USER_COURSE_TITLES_SUCCESS]: setAllUserCourseTitles,
  [AppDataType.GET_ALL_USER_EXAMS_SCORE]: getAllUserExamsScore,
  [AppDataType.GET_ALL_USER_EXAMS_SCORE_SUCCESS]: setAllUserExamsScore,
  [AppDataType.GET_USER_SCHEDULE]: getUserSchedule,
  [AppDataType.GET_USER_SCHEDULE_SUCCESS]: setUserSchedule,
  [AppDataType.GET_ALL_USER_EXAMS]: getAllUserExams,
  [AppDataType.GET_ALL_USER_EXAMS_SUCCESS]: setAllUserExams,
  [AppDataType.GET_USER_EXAM]: getUserExams,
  [AppDataType.GET_USER_EXAM_SUCCESS]: setUserExams,
  [AppDataType.USER_ANSWER_TO_EXAM]: getUserAnswerToExam,
  [AppDataType.USER_ANSWER_TO_EXAM_SUCCESS]: userAnswerToExamSuccess,
  [AppDataType.GET_CONTACT_INFO]: getContactInfo,
  [AppDataType.GET_CONTACT_INFO_SUCCESS]: setContactInfo,
  [AppDataType.GET_TEACHERS_BY_LESSON]: getTeachersByLesson,
  [AppDataType.GET_TEACHERS_BY_LESSON_SUCCESS]: setTeachersByLesson,
  [AppDataType.CONVERT_YOUTUBE_URL]: getConvertYoutubeUrl,
  [AppDataType.CONVERT_YOUTUBE_URL_SUCCESS]: setConvertYoutubeUrl,
  [AppDataType.USER_LOGOUT]: getUserLogout,
  [AppDataType.USER_LOGOUT_SUCCESS]: setUserLogout,
  [AppDataType.EDUCATION_GRADE_ST_HOME]: getEducationGradeListStHome,
  [AppDataType.EDUCATION_GRADE_ST_HOME_SUCCESS]: setEducationGradeListStHome,
  [AppDataType.GET_CATEGORIES_ST_HOME]: getCategoriesStHome,
  [AppDataType.GET_CATEGORIES_ST_HOME_SUCCESS]: setCategoriesDataStHome,
  [AppDataType.GET_INFORMS]: getInforms,
  [AppDataType.GET_INFORMS_SUCCESS]: setInforms,
  [AppDataType.UPDATE_TOKEN]: updateToken,
  [AppDataType.UPDATE_TOKEN_SUCCESS]: updateTokenSuccess,
});
