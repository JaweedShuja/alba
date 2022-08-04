import {createReducer} from 'reduxsauce';
import {INITIAL_STATE} from './InitialState';
import {TeacherDataType} from './Actions';

const onFail = (state) => ({
  ...state,
  getTeacherScreenLoading: false,
  getTeacherNotesLoading: false,
  getCourseDetailLoading: false,
  addNoteLoading: false,
  addExamLoading: false,
  getAllTeacherExamsListLoading: false,
  getAllExamAnswersLoading: false,
  finishExamLoading: false,
  getUserExamAnswersLoading: false,
  submitExamScoreForUserLoading: false,
  getTeacherCourseLoading: false,
  getTeacherPassedExamsLoading: false,
  deleteExamLoading: false,
});

const getTeacherScreen = (state, {param}) => ({
  ...state,
  getTeacherScreenLoading: true,
  currentCategoryId: param,
});

const setTeacherScreenData = (state, {data}) => ({
  ...state,
  getTeacherScreenLoading: false,
  getTeacherScreenData: data,
});

const getTeacherNotes = (state, {id}) => ({
  ...state,
  getTeacherNotesLoading: true,
});

const setTeacherNotes = (state, {notes}) => ({
  ...state,
  getTeacherNotesLoading: false,
  teacherNotesData: notes,
});

const getCourseDetail = (state, {id}) => ({
  ...state,
  getCourseDetailLoading: true,
});

const setCourseDetail = (state, {data}) => ({
  ...state,
  getCourseDetailLoading: false,
  getCourseDetailSuccess: data,
});

const addNote = (state, {param}) => ({
  ...state,
  addNoteLoading: true,
});

const addNoteSuccess = (state, {data}) => ({
  ...state,
  addNoteLoading: false,
  addNoteSuccess: data,
});

const addExam = (state) => ({
  ...state,
  addExamLoading: true,
});

const addExamSuccess = (state, {data}) => ({
  ...state,
  addExamLoading: false,
  addExamSuccess: data,
});

const getAllTeacherExamsList = (state) => ({
  ...state,
  getAllTeacherExamsListLoading: true,
});

const getAllTeacherExamsListSuccess = (state, {data}) => ({
  ...state,
  getAllTeacherExamsListLoading: false,
  TeacherExamsList: data,
});

const getAllExamAnswers = (state) => ({
  ...state,
  getAllExamAnswersLoading: true,
});

const setAllExamAnswers = (state, {data}) => ({
  ...state,
  getAllExamAnswersLoading: false,
  allExamAnswers: data,
});

const getFinishExam = (state) => ({
  ...state,
  finishExamLoading: true,
});

const setFinishExam = (state, {data}) => ({
  ...state,
  finishExamLoading: false,
  finishExam: data,
});

const getUserExamAnswers = (state) => ({
  ...state,
  getUserExamAnswersLoading: true,
});

const setUserExamAnswers = (state, {data}) => ({
  ...state,
  getUserExamAnswersLoading: false,
  getUserExamAnswersData: data,
});

const submitExamScoreForUser = (state) => ({
  ...state,
  submitExamScoreForUserLoading: true,
});

const setSubmitExamScoreForUser = (state, {data}) => ({
  ...state,
  submitExamScoreForUserLoading: false,
  submitExamScoreForUserData: data,
});

const getTeacherCourse = (state) => ({
  ...state,
  getTeacherCourseLoading: true,
});

const setTeacherCourse = (state, {data}) => ({
  ...state,
  getTeacherCourseLoading: false,
  getTeacherCourseData: data,
});

const getTeacherPassedExams = (state) => ({
  ...state,
  getTeacherPassedExamsLoading: true,
});

const getTeacherPassedExamsSuccess = (state, {data}) => ({
  ...state,
  getTeacherPassedExamsLoading: false,
  getTeacherPassedExamsData: data,
});

const getDeleteExam = (state) => ({
  ...state,
  deleteExamLoading: true,
});

const setDeleteExam = (state, {data}) => ({
  ...state,
  deleteExamLoading: false,
  deleteExam: data,
});

export const reducer = createReducer(INITIAL_STATE, {
  [TeacherDataType.ON_FAIL]: onFail,
  [TeacherDataType.GET_TEACHER_SCREEN]: getTeacherScreen,
  [TeacherDataType.GET_TEACHER_SCREEN_SUCCESS]: setTeacherScreenData,
  [TeacherDataType.GET_TEACHER_NOTES]: getTeacherNotes,
  [TeacherDataType.GET_TEACHER_NOTES_SUCCESS]: setTeacherNotes,
  [TeacherDataType.GET_COURSE_DETAIL]: getCourseDetail,
  [TeacherDataType.GET_COURSE_DETAIL_SUCCESS]: setCourseDetail,
  [TeacherDataType.ADD_NOTE]: addNote,
  [TeacherDataType.ADD_NOTE_SUCCESS]: addNoteSuccess,
  [TeacherDataType.ADD_EXAM]: addExam,
  [TeacherDataType.ADD_EXAM_SUCCESS]: addExamSuccess,
  [TeacherDataType.GET_ALL_TEACHER_EXAMS_LIST]: getAllTeacherExamsList,
  [TeacherDataType.GET_ALL_TEACHER_EXAMS_LIST_SUCCESS]:
    getAllTeacherExamsListSuccess,
  [TeacherDataType.GET_ALL_EXAM_ANSWERS]: getAllExamAnswers,
  [TeacherDataType.GET_ALL_EXAM_ANSWERS_SUCCESS]: setAllExamAnswers,
  [TeacherDataType.FINISH_EXAM]: getFinishExam,
  [TeacherDataType.FINISH_EXAM_SUCCESS]: setFinishExam,
  [TeacherDataType.GET_USER_EXAM_ANSWERS]: getUserExamAnswers,
  [TeacherDataType.GET_USER_EXAM_ANSWERS_SUCCESS]: setUserExamAnswers,
  [TeacherDataType.SUBMIT_EXAM_SCORE_FOR_USER]: submitExamScoreForUser,
  [TeacherDataType.SUBMIT_EXAM_SCORE_FOR_USER_SUCCESS]:
    setSubmitExamScoreForUser,
  [TeacherDataType.GET_TEACHER_COURSE]: getTeacherCourse,
  [TeacherDataType.GET_TEACHER_COURSE_SUCCESS]: setTeacherCourse,
  [TeacherDataType.GET_TEACHER_PASSED_EXAMS]: getTeacherPassedExams,
  [TeacherDataType.GET_TEACHER_PASSED_EXAMS_SUCCESS]:
    getTeacherPassedExamsSuccess,
    [TeacherDataType.DELETE_EXAM]: getDeleteExam,
    [TeacherDataType.DELETE_EXAM_SUCCESS]: setDeleteExam,
});
