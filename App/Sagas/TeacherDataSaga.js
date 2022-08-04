import {put} from 'redux-saga/effects';
import GET from '../Api/GET';
import POST from '../Api/POST';
import PUT from '../Api/PUT';
import {goBack, navigate} from '../Services/NavigationService';
import TeacherDataActions from '../Stores/TeacherData/Actions';
import {responseHandler} from '../utils/responseHandler';
import {showToast} from '../utils/showToast';
import Strings from '../Values/Strings';
import {string} from 'App/i18n';

const {
  TEACHER_STACK,
  TEACHER_SEE_READ_MORE_EXAMS_SCREEN,
  TEACHER_COURSES_VIDEOS_SCREEN,
  TEACHER_ANSWERS_SCREEN,
  TEACHER_ANSWERS_CLASSIC_SCREEN,
} = Strings.Routes;

export function* getTeacherScreenSaga({param}) {
  console.log({param});
  try {
    const response = yield GET.getTeacherScreen(param);
    const payload = responseHandler(response);
    if (payload?.res) {
      console.log('this is teacher screen data saga', payload);
      yield put(
        TeacherDataActions.getTeacherScreenSuccess(payload?.payload?.grades),
      );
      yield put(TeacherDataActions.setCategoryTitle(payload?.payload?.title));
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('getTeacherScreen Error', error);
  }
}

export function* getTeacherNotesSaga({id}) {
  try {
    const response = yield GET.getTeacherNotesByCourse(id);
    const payload = responseHandler(response);
    if (payload?.res) {
      yield put(TeacherDataActions.getTeacherNotesSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('getTeacherNotes Error', error);
  }
}

export function* getCourseDetailSaga({id}) {
  try {
    const response = yield GET.getCourseDetail(id);
    const payload = responseHandler(response);
    console.log('getCourseDetail payload==>', payload);
    if (payload?.res) {
      yield put(TeacherDataActions.getCourseDetailSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('getCourseDetail Error', error);
  }
}

export function* addNoteSaga({param}) {
  const courseId = param?.courseId;
  console.log({courseId});
  try {
    const response = yield POST.addNote(param);
    const payload = responseHandler(response);
    console.log('addNote payload==>', payload);
    if (payload?.res) {
      yield put(TeacherDataActions.addNoteSuccess(payload?.payload));
      yield put(TeacherDataActions.getTeacherNotes(courseId));
      goBack();
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('addNote Error', error);
  }
}

export function* addExamSaga({param}) {
  try {
    const response = yield POST.addExam(param);
    const payload = responseHandler(response);
    console.log('addExam payload==>', payload);
    if (payload?.res) {
      yield put(TeacherDataActions.addExamSuccess(payload?.payload));
      showToast('s', string.YOUR_ADD_NEW_HAS_BEEN_SUCCESSFULLY);
      goBack();
      navigate(TEACHER_STACK, {screen: TEACHER_SEE_READ_MORE_EXAMS_SCREEN});

      // goBack();
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('addExam Error', error);
  }
}

export function* getAllTeacherExamsListSaga() {
  try {
    const response = yield GET.getAllTeacherExamsList();
    const payload = responseHandler(response);
    console.log('getAllTeacherExamsListSaga payload==>', payload);
    if (payload?.res) {
      yield put(
        TeacherDataActions.getAllTeacherExamsListSuccess(payload?.payload),
      );
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('getAllTeacherExamsListSaga Error', error);
  }
}

export function* getAllExamAnswersSaga({id}) {
  console.log('getAllExamAnswersSaga', {id});
  try {
    const response = yield GET.getAllExamAnswers(id);
    const payload = responseHandler(response);
    console.log('getAllExamAnswersSaga payload==>', payload);
    if (payload?.res) {
      yield put(TeacherDataActions.getAllExamAnswersSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('getAllExamAnswersSaga Error', error);
  }
}

export function* finishExamSaga({id}) {
  console.log('finishExamSaga', {id});
  try {
    const response = yield POST.finishExam(id);
    const payload = responseHandler(response);
    console.log('finishExamSaga payload==>', payload);
    if (payload?.res) {
      yield put(TeacherDataActions.finishExamSuccess(payload?.payload));
      yield put(TeacherDataActions.getAllTeacherExamsList());
      goBack();
      showToast('s', string.THIS_EXAM_HAS_BEEN_FINISHED_SUCCESSFULLY);
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('finishExamSaga Error', error);
  }
}

export function* getUserExamAnswersSaga({param}) {
  console.log({param});
  try {
    const response = yield GET.getUserExamAnswers(param);
    const payload = responseHandler(response);
    if (payload?.res) {
      console.log('getUserExamAnswersSaga payload==>', payload);
      const result = payload?.payload;
      yield put(TeacherDataActions.getUserExamAnswersSuccess(result));
      if (payload?.payload?.type === 'TEST')
        navigate(TEACHER_STACK, {
          screen: TEACHER_ANSWERS_SCREEN,
          params: {param},
        });
      else
        navigate(TEACHER_STACK, {
          screen: TEACHER_ANSWERS_CLASSIC_SCREEN,
          params: {param},
        });
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('getUserExamAnswersSaga Error', error);
  }
}

export function* submitExamScoreForUserSaga({param}) {
  console.log({param});
  try {
    const response = yield POST.submitExamScoreForUser(param);
    const payload = responseHandler(response);
    if (payload?.res) {
      console.log('submitExamScoreForUserSaga payload==>', payload);
      yield put(
        TeacherDataActions.submitExamScoreForUserSuccess(payload?.payload),
      );
      goBack();
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('submitExamScoreForUserSaga Error', error);
  }
}

export function* getTeacherCourseSaga({id}) {
  console.log('+++=>', {id});
  try {
    const response = yield GET.getTeacherCourse(id);
    const payload = responseHandler(response);
    if (payload?.res) {
      console.log('getTeacherCourseSaga payload==>', payload);
      navigate(TEACHER_STACK, {
        screen: TEACHER_COURSES_VIDEOS_SCREEN,
        params: {data: payload?.payload},
      });
      yield put(TeacherDataActions.getTeacherCourseSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('getTeacherCourseSaga Error', error);
  }
}

export function* getTeacherPassedExamsSaga() {
  try {
    const response = yield GET.getTeacherPassedExams();
    const payload = responseHandler(response);
    console.log('getTeacherPassedExamsSaga payload*=>', payload);
    if (payload?.res) {
      yield put(
        TeacherDataActions.getTeacherPassedExamsSuccess(payload?.payload),
      );
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('getTeacherPassedExamsSaga Error*=>', error);
  }
}

export function* deleteExamSaga({id}) {
  console.log('deleteExamSaga');
  try {
    const response = yield PUT.deleteExam(id);
    const payload = responseHandler(response);
    console.log('deleteExamSaga payload*=>', payload);
    if (payload?.res) {
      yield put(TeacherDataActions.deleteExamSuccess(payload?.payload));
      //yield put(TeacherDataActions.getAllTeacherExamsList());
      yield put(TeacherDataActions.getTeacherPassedExams());
      goBack();
      showToast('s', string.THIS_EXAM_HAS_BEEN_DELETED_SUCCESSFULLY);
    }
  } catch (error) {
    yield put(TeacherDataActions.onFail());
    console.log('finishExamSaga Error', error);
  }
}
