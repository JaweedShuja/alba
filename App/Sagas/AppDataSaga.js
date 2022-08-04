import {put, select} from 'redux-saga/effects';
import GET from '../Api/GET';
import POST from '../Api/POST';
import PUT from '../Api/PUT';
import AppDataActions from '../Stores/AppData/Actions';
import {goBack, navigate} from 'App/Services/NavigationService';
import {responseHandler} from '../utils/responseHandler';
import Strings from '../Values/Strings';
import * as selectors from './selectors';

const {
  STUDENT_STACK,
  COURSE_ACTIVATION_SCREEN,
  ACTIVATION_SUCCESS_SCREEN,
  VIDEO_SCREEN,
  COURSES_VIDEOS_SCREEN,
  EXAM_SCREEN,
  STUDENT_EXAM_TEST_SCREEN,
} = Strings.Routes;

export function* getHomeScreenSaga() {
  try {
    const response = yield GET.homeScreen();
    const payload = responseHandler(response);

    if (payload?.res) {
      yield put(AppDataActions.homeScreenSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('homeData Error', error);
  }
}

export function* getInformsSaga() {
  try {
    const response = yield GET.getInforms();
    const payload = responseHandler(response);
    console.log('getInformsSaga', payload);
    if (payload?.res) {
      yield put(AppDataActions.getInformsSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('homeData Error', error);
  }
}

export function* getAllUserExamsSaga() {
  try {
    const response = yield GET.getAllUserExams();
    const payload = responseHandler(response);

    if (payload?.res) {
      console.log('this is getAllUserExamsSaga data saga', payload);
      yield put(AppDataActions.getAllUserExamsSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getAllUserExamsSaga Error', error);
  }
}

export function* getCategoriesSaga() {
  try {
    const response = yield GET.getCategories();
    const payload = responseHandler(response);

    if (payload?.res) {
      // const homeData = response?.data?.data?.payload;
      console.log('this is category data saga', payload);
      yield put(AppDataActions.getCategoriesSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getCategories Error', error);
  }
}

export function* educationGradeSaga({data}) {
  console.log('data+++++', data);
  const categories = yield select(selectors.categories);
  try {
    let dataGrades = [];
    if (data?.categoryId !== 'All') {
      categories.forEach(function (item, index, array) {
        if (categories[index]?._id === data?.categoryId) {
          dataGrades = categories[index]?.grades;
        }
      });
    }
    yield put(AppDataActions.educationGradeSuccess(dataGrades));
  } catch (error) {}
}

export function* setIsTeacherSaga({data}) {
  try {
    if (data === 'teacher') {
      console.log('teacher', {data});
      yield put(AppDataActions.isTeacherSuccess(true));
    } else {
      console.log('student', {data});
      yield put(AppDataActions.isTeacherSuccess(false));
    }
  } catch (error) {}
}

export function* getStationeriesSaga({param}) {
  try {
    const response = yield GET.getStationeries(param);
    const payload = responseHandler(response);
    if (payload?.res) {
      yield put(
        AppDataActions.getStationeriesSuccess(payload?.payload?.stationeries),
      );
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getStationeries Error', error);
  }
}

export function* getLessonsTeachersSaga({param}) {
  console.log(param);
  try {
    const response = yield GET.getLessonsTeachers(param);
    const payload = responseHandler(response);
    if (payload?.res) {
      yield put(AppDataActions.getLessonsTeachersSuccess(payload?.payload));
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getLessonsTeachers Error', error);
  }
}

export function* getTeacherInfoSaga({param}) {
  console.log({param});
  try {
    const response = yield GET.getTeacherInfo(param);
    const payload = responseHandler(response);
    if (payload?.res) {
      console.log('this is teacher Info data saga', payload);
      yield put(AppDataActions.getTeacherInfoSuccess(payload?.payload));
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getTeacherInfo Error', error);
  }
}

export function* getCoursesScreenSaga({param}) {
  console.log('courses screen', {param});
  const {categoryId, gradeId} = param;
  console.log('test559', gradeId);
  try {
    const response = gradeId
      ? yield GET.coursesScreen(param)
      : yield GET.coursesScreen({categoryId});
    const payload = responseHandler(response);
    console.log('this is courses screen data saga', payload);

    if (payload?.res) {
      // console.log('this is courses screen data saga', payload);
      yield put(AppDataActions.coursesScreenSuccess(payload?.payload));
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getTeacherInfo Error', error);
  }
}

export function* getEpisodeSaga({param}) {
  console.log('getEpisodeSaga', {param});
  try {
    const response = yield GET.getEpisode(param);
    const payload = responseHandler(response);
    const needActivation = payload?.payload?.needActivationCode;
    console.log('this is get Episode data saga', payload);
    console.log({needActivation});
    if (payload?.res) {
      yield put(AppDataActions.setEpisodeData(payload?.payload));
      navigate(STUDENT_STACK, {
        screen: VIDEO_SCREEN,
        params: {
          courceIndex: param?.index + 1,
          titleCource: param?.titleCource,
          data: payload?.payload,
        },
      });
    } else {
      if (needActivation) {
        navigate(STUDENT_STACK, {
          screen: COURSE_ACTIVATION_SCREEN,
          params: {param},
        });
      }
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getTeacherInfo Error', error);
  }
}

export function* getNoteByUserSaga() {
  // console.log({param});
  try {
    const response = yield GET.getNoteByUser();
    const payload = responseHandler(response);
    if (payload?.res) {
      console.log('this is getNoteByUserSaga data saga', payload);
      yield put(AppDataActions.getNoteByUserSuccess(payload?.payload));
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getNoteByUserSaga Error', error);
  }
}

export function* getAllUserCourseTitlesSaga() {
  // console.log({param});
  try {
    const response = yield GET.getAllUserCourseTitles();
    const payload = responseHandler(response);
    if (payload?.res) {
      console.log('this is getAllUserCourseTitlesSaga data saga', payload);
      const firstCourseId = payload?.payload?.courses[0]?._id;
      yield put(AppDataActions.getAllUserCourseTitlesSuccess(payload?.payload));
      if (firstCourseId)
        yield put(AppDataActions.getUserSchedule(firstCourseId));
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getAllUserCourseTitlesSaga Error', error);
  }
}

export function* getAllUserExamsScoreSaga() {
  // console.log({param});
  try {
    const response = yield GET.getAllUserExamsScore();
    const payload = responseHandler(response);
    if (payload?.res) {
      console.log('this is getAllUserExamsScoreSaga data saga', payload);
      yield put(AppDataActions.getAllUserExamsScoreSuccess(payload?.payload));
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getAllUserExamsScoreSaga Error', error);
  }
}

export function* getUserScheduleSaga({id}) {
  console.log({id});
  try {
    const response = yield GET.getUserSchedule(id);
    const payload = responseHandler(response);

    if (payload?.res) {
      console.log('this is getUserScheduleSaga data saga', payload);
      yield put(AppDataActions.getUserScheduleSuccess(payload?.payload));
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getTeacherInfo Error', error);
  }
}

export function* getUserExamSaga({id}) {
  console.log({id});
  const examId = id?.examId;
  const type = id?.type;
  try {
    const response = yield GET.getUserExam(examId);
    const payload = responseHandler(response);

    if (payload?.res) {
      console.log('this is getUserExamSaga data saga', payload);
      yield put(AppDataActions.getUserExamSuccess(payload?.payload));
      if (type === 'TEST') {
        navigate(STUDENT_STACK, {
          screen: STUDENT_EXAM_TEST_SCREEN,
          params: {param: id},
        });
      } else {
        navigate(STUDENT_STACK, {
          screen: EXAM_SCREEN,
          params: {param: id},
        });
      }
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getUserExamSaga Error', error);
  }
}

export function* userAnswerToExamSaga({param}) {
  console.log({param});
  try {
    const response = yield POST.userAnswerToExam(param);
    const payload = responseHandler(response);

    if (payload?.res) {
      console.log('this is userAnswerToExamSaga data saga', payload);
      yield put(AppDataActions.userAnswerToExamSuccess(payload?.payload));
      goBack();
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('userAnswerToExamSaga Error', error);
  }
}

export function* getCourseActivationSaga({param}) {
  // yield put(AppDataActions.onFail());

  console.log({param});
  try {
    const response = yield POST.courseActivation(param);
    const payload = responseHandler(response);
    console.log('this data is courses activation saga', payload);
    const course = payload?.payload?.course;
    const isUserBuyCourse = payload?.payload?.isUserBuyCourse;
    if (payload?.res) {
      if (course) {
        if (isUserBuyCourse) {
          if (payload?.payload?.needActivation) {
            navigate(STUDENT_STACK, {screen: ACTIVATION_SUCCESS_SCREEN});
          } else {
            navigate(STUDENT_STACK, {
              screen: COURSES_VIDEOS_SCREEN,
              params: {isUserBuyCourse, course},
            });
          }
        } else {
          navigate(STUDENT_STACK, {
            screen: COURSES_VIDEOS_SCREEN,
            params: {isUserBuyCourse, course},
          });
        }
      }
      yield put(AppDataActions.courseActivationSuccess(payload?.payload));
    } else {
      if (payload?.payload?.needActivationCode) {
        navigate(STUDENT_STACK, {
          screen: COURSE_ACTIVATION_SCREEN,
          params: {param},
        });
      }
    }

    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getStationeries Error', error);
  }
}

export function* deleteFileSaga({param}) {
  try {
    const response = yield PUT.deleteFile(param);
    console.log('deleteFile payload==>', response);
    const payload = responseHandler(response);
    if (payload?.res) {
      yield put(AppDataActions.deleteFileSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('deleteFile Error', error);
  }
}

export function* getContactInfoSaga() {
  try {
    const response = yield GET.getContactInfo();
    const payload = responseHandler(response);

    if (payload?.res) {
      console.log('this is getContactInfo data saga', payload);
      yield put(AppDataActions.getContactInfoSuccess(payload?.payload));
    }
    // throw new Error('error');
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getContactInfo Error', error);
  }
}

export function* getTeachersByLessonSaga({id}) {
  try {
    const response = yield GET.getTeachersByLesson(id);
    console.log('getTeachersByLessonSaga payload==>', response);
    const payload = responseHandler(response);
    if (payload?.res) {
      yield put(AppDataActions.getTeachersByLessonSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getTeachersByLessonSaga Error', error);
  }
}

export function* convertYoutubeUrlSaga({param}) {
  console.log('convertYoutubeUrlSaga payload==>', param);

  try {
    const response = yield GET.convertYoutubeUrl(param);
    console.log('convertYoutubeUrlSaga payload==>', response);
    const payload = responseHandler(response);
    if (payload?.res) {
      const videoData = payload?.payload;

      yield put(AppDataActions.convertYoutubeUrlSuccess(videoData));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('convertYoutubeUrlSaga Error', error);
  }
}

export function* userLogoutSaga({param}) {
  console.log('userLogoutSaga PARAM==>', param);
  try {
    const response = yield GET.userLogout(param);
    console.log('userLogoutSagaSaga payload*=>', response);
    const payload = responseHandler(response);
    if (payload?.res) {
      yield put(AppDataActions.userLogoutSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('userLogoutSagaSaga Error*=>', error);
  }
}

export function* educationGradeStHomeSaga({data}) {
  //const categories = yield select(selectors.categories);
  const categories = yield select(
    (state) => state?.appData?.getCategoriesDataStHome,
  );
  try {
    let dataGrades = [];
    categories.forEach(function (item, index, array) {
      if (categories[index]?._id === data?.categoryId) {
        dataGrades = categories[index]?.grades;
      }
    });
    yield put(AppDataActions.educationGradeStHomeSuccess(dataGrades));
  } catch (error) {}
}

export function* getCategoriesStHomeSaga() {
  try {
    const response = yield GET.getCategories();
    const payload = responseHandler(response);

    if (payload?.res) {
      // const homeData = response?.data?.data?.payload;
      console.log('this is category data st home saga', payload);
      yield put(AppDataActions.getCategoriesStHomeSuccess(payload?.payload));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('getCategories Error', error);
  }
}

export function* updateTokenSaga({param}) {
  console.log('updateTokenSaga PARAM==>', param);
  try {
    const response = yield PUT.updateToken(param);
    if (response?.data?.code === 200) {
      yield put(AppDataActions.updateTokenSuccess(''));
    }
  } catch (error) {
    yield put(AppDataActions.onFail());
    console.log('userLogoutSagaSaga Error*=>', error);
  }
}
