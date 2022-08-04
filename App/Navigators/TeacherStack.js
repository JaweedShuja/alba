import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Strings from 'App/Values/Strings';
import TeacherAddLessonNoteScreen from 'App/Containers/TeacherAddLessonNote/TeacherAddLessonNoteScreen';
import TeacherAddRemoveExamsScreen from 'App/Containers/TeacherAddRemoveExams/TeacherAddRemoveExamsScreen';
import TeacherSeeReadExamsScreen from 'App/Containers/TeacherSeeReadExams/TeacherSeeReadExamsScreen';
import TeacherLessonNotesScreen from 'App/Containers/TeacherLessonNotes/TeacherLessonNotesScreen';
import TeacherAddNotesScreen from 'App/Containers/TeacherAddNotes/TeacherAddNotesScreen';
import TeacherAddExamScreen from 'App/Containers/TeacherAddExam/TeacherAddExamScreen';
import TeacherSeeAnswerScreen from 'App/Containers/TeacherSeeAnswer/TeacherSeeAnswerScreen';
import TeacherAnswersScreen from 'App/Containers/TeacherAnswers/TeacherAnswersScreen';
import CreateTeacherProfileScreen from '../Containers/CreateTeacherProfile/CreateTeacherProfileScreen';
import StudentLoginScreen from 'App/Containers/StudentLogin/StudentLoginScreen';
import TeacherAddExamClassicScreen from '../Containers/TeacherAddExamClassic/TeacherAddExamClassicScreen';
import TeacherAnswersClassicScreen from '../Containers/TeacherAnswersClassic/TeacherAnswersClassicScreen';
import TeacherCoursesVideoScreen from '../Containers/TeacherCoursesVideoScreen';
import TeacherVideoScreen from 'App/Containers/TeacherVideoScreen';
import TeacherSeeReadPassedExamsScreen from 'App/Containers/TeacherSeeReadPassedExams';
import TeacherSeePassedAnswerScreen from 'App/Containers/TeacherSeePassedAnswer';
import TeacherAddExamNoteScreen from 'App/Containers/TeacherAddExamNote/TeacherAddExamNoteScreen';
import NotificationScreen from '../Containers/Notification/NotificationScreen';

const Stack = createStackNavigator();
const {
  TEACHER_ADD_LESSONS_NOTE_SCREEN,
  TEACHER_ADD_REMOVE_EXAMS_SCREEN,
  TEACHER_SEE_READ_MORE_EXAMS_SCREEN,
  TEACHER_ADD_NOTES_SCREEN,
  TEACHER_LESSON_NOTES_SCREEN,
  TEACHER_ADD_EXAM_SCREEN,
  TEACHER_SEE_ANSWER_SCREEN,
  TEACHER_ANSWERS_SCREEN,
  CREATE_TEACHER_PROFILE,
  STUDENT_LOGIN_SCREEN,
  TEACHER_ADD_EXAM_CLASSIC_SCREEN,
  TEACHER_ANSWERS_CLASSIC_SCREEN,
  TEACHER_COURSES_VIDEOS_SCREEN,
  TEACHER_VIDEO_SCREEN,
  TEACHER_SEE_READ_PASSED_EXAMS_SCREEN,
  TEACHER_SEE_PASSED_ANSWER_SCREEN,
  TEACHER_ADD_EXAM_NOTE_SCREEN,
  NOTIFICATION_SCREEN,
} = Strings.Routes;

export const TeacherStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={TEACHER_ADD_LESSONS_NOTE_SCREEN}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={TEACHER_ADD_LESSONS_NOTE_SCREEN}
        component={TeacherAddLessonNoteScreen}
      />
      <Stack.Screen
        name={STUDENT_LOGIN_SCREEN}
        component={StudentLoginScreen}
      />
      <Stack.Screen
        name={TEACHER_ADD_REMOVE_EXAMS_SCREEN}
        component={TeacherAddRemoveExamsScreen}
      />
      <Stack.Screen
        name={TEACHER_SEE_READ_MORE_EXAMS_SCREEN}
        component={TeacherSeeReadExamsScreen}
      />
      <Stack.Screen
        name={TEACHER_LESSON_NOTES_SCREEN}
        component={TeacherLessonNotesScreen}
      />
      <Stack.Screen
        name={TEACHER_ADD_NOTES_SCREEN}
        component={TeacherAddNotesScreen}
      />
      <Stack.Screen
        name={TEACHER_ADD_EXAM_SCREEN}
        component={TeacherAddExamScreen}
      />
      <Stack.Screen
        name={TEACHER_SEE_ANSWER_SCREEN}
        component={TeacherSeeAnswerScreen}
      />
      <Stack.Screen
        name={TEACHER_ANSWERS_SCREEN}
        component={TeacherAnswersScreen}
      />
      <Stack.Screen
        name={CREATE_TEACHER_PROFILE}
        component={CreateTeacherProfileScreen}
      />
      <Stack.Screen
        name={TEACHER_ADD_EXAM_CLASSIC_SCREEN}
        component={TeacherAddExamClassicScreen}
      />
      <Stack.Screen
        name={TEACHER_ANSWERS_CLASSIC_SCREEN}
        component={TeacherAnswersClassicScreen}
      />
      <Stack.Screen
        name={TEACHER_COURSES_VIDEOS_SCREEN}
        component={TeacherCoursesVideoScreen}
      />
      <Stack.Screen
        name={TEACHER_VIDEO_SCREEN}
        component={TeacherVideoScreen}
      />
      <Stack.Screen
        name={TEACHER_SEE_READ_PASSED_EXAMS_SCREEN}
        component={TeacherSeeReadPassedExamsScreen}
      />
      <Stack.Screen
        name={TEACHER_SEE_PASSED_ANSWER_SCREEN}
        component={TeacherSeePassedAnswerScreen}
      />
      <Stack.Screen
        name={TEACHER_ADD_EXAM_NOTE_SCREEN}
        component={TeacherAddExamNoteScreen}
      />
      <Stack.Screen name={NOTIFICATION_SCREEN} component={NotificationScreen} />
    </Stack.Navigator>
  );
};
