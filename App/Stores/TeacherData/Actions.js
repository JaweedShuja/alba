import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  onFail: null,
  getTeacherScreen: ['param'],
  getTeacherScreenSuccess: ['data'],
  getTeacherNotes: ['id'],
  getTeacherNotesSuccess: ['notes'],
  getCourseDetail: ['id'],
  getCourseDetailSuccess: ['data'],
  addNote: ['param'],
  addNoteSuccess: ['data'],
  addExam: ['param'],
  addExamSuccess: ['data'],
  getAllTeacherExamsList: null,
  getAllTeacherExamsListSuccess: ['data'],
  getAllExamAnswers: ['id'],
  getAllExamAnswersSuccess: ['data'],
  finishExam: ['id'],
  finishExamSuccess: ['data'],
  getUserExamAnswers: ['param'],
  getUserExamAnswersSuccess: ['data'],
  submitExamScoreForUser: ['param'],
  submitExamScoreForUserSuccess: ['data'],
  getTeacherCourse: ['id'],
  getTeacherCourseSuccess: ['data'],
  getTeacherPassedExams: null,
  getTeacherPassedExamsSuccess: ['data'],
  deleteExam: ['id'],
  deleteExamSuccess: ['data'],
});

export const TeacherDataType = Types;
export default Creators;
