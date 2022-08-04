import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Strings from 'App/Values/Strings';
import EducationGradeScreen from 'App/Containers/EducationGrade/EducationGradeScreen';
import CategoryCoursesScreen from 'App/Containers/CategoryCourses/CategoryCoursesScreen';
import CoursesInfoScreen from 'App/Containers/CoursesInfo/CoursesInfoScreen';
import CourseActivationScreen from 'App/Containers/CourseActivation/CourseActivationScreen';
import StudentSignUpScreen from 'App/Containers/StudentSignUp/StudentSignUpScreen';
import StudentLoginScreen from 'App/Containers/StudentLogin/StudentLoginScreen';
import ContactUsScreen from 'App/Containers/ContactUs/ContactUsScreen';
import CoursesVideosScreen from 'App/Containers/CoursesVideos/CoursesVideosScreen';
import ShopListScreen from 'App/Containers/ShopList/ShopListScreen';
import ActivationSuccessScreen from 'App/Containers/ActivationSuccess/ActivationSuccessScreen';
import StudentGradesScreen from 'App/Containers/StudentGrades/StudentGradesScreen';
import StudentExamsScreen from 'App/Containers/StudentExams/StudentExamsScreen';
import StudentLessonsNoteScreen from 'App/Containers/StudentLessonsNote/StudentLessonsNoteScreen';
import StudentMyScheduleScreen from 'App/Containers/StudentMySchedule/StudentMyScheduleScreen';
import StudentEmailVerificationScreen from 'App/Containers/StudentEmailVerification/StudentEmailVerificationScreen';
import StudentSignUpCompletionScreen from 'App/Containers/StudentSignUpCompletion/StudentSignUpCompletionScreen';
import ExamScreen from 'App/Containers/Exam/ExamScreen';
import VideoScreen from 'App/Containers/Video/VideoScreen';
import ChatScreen from 'App/Containers/Chat/ChatScreen';
import ForgetPasswordScreen from 'App/Containers/ForgetPassword/ForgetPasswordScreen';
import ResetPassword from 'App/Containers/ResetPassword/ResetPasswordScreen';
import StudentExamTestScreen from '../Containers/StudentExamTest/StudentExamTestScreen';
import TeachersScreen from '../Containers/Teachers/TeachersScreen';
import PlayerScreen from '../Containers/Player/PlayerScreen';
import NotificationScreen from '../Containers/Notification/NotificationScreen';

const Stack = createStackNavigator();

const {
  EDUCATION_GRADE_SCREEN,
  CATEGORY_COURSES_SCREEN,
  COURSES_INFO_SCREEN,
  COURSE_ACTIVATION_SCREEN,
  STUDENT_SIGN_UP_SCREEN,
  STUDENT_LOGIN_SCREEN,
  CONTACT_US_SCREEN,
  COURSES_VIDEOS_SCREEN,
  SHOP_LIST_SCREEN,
  ACTIVATION_SUCCESS_SCREEN,
  STUDENT_GRADES_SCREEN,
  STUDENT_EXAMS_SCREEN,
  STUDENT_LESSONS_NOTE_SCREEN,
  STUDENT_MY_SCHEDULE_SCREEN,
  STUDENT_EMAIL_VERIFICATION_SCREEN,
  STUDENT_SIGN_UP_COMPLETION_SCREEN,
  EXAM_SCREEN,
  VIDEO_SCREEN,
  CHAT_SCREEN,
  FORGET_PASSWORD_SCREEN,
  RESET_PASSWORD_SCREEN,
  STUDENT_EXAM_TEST_SCREEN,
  TEACHERS,
  PLAYER_SCREEN,
  NOTIFICATION_SCREEN,
} = Strings.Routes;

export const StudentStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={STUDENT_LOGIN_SCREEN} //TO DO
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name={EDUCATION_GRADE_SCREEN}
        component={EducationGradeScreen}
      />
      <Stack.Screen
        name={CATEGORY_COURSES_SCREEN}
        component={CategoryCoursesScreen}
      />
      <Stack.Screen name={COURSES_INFO_SCREEN} component={CoursesInfoScreen} />
      <Stack.Screen
        name={COURSE_ACTIVATION_SCREEN}
        component={CourseActivationScreen}
      />
      <Stack.Screen
        name={STUDENT_SIGN_UP_SCREEN}
        component={StudentSignUpScreen}
      />
      <Stack.Screen
        name={STUDENT_LOGIN_SCREEN}
        component={StudentLoginScreen}
      />
      <Stack.Screen name={CONTACT_US_SCREEN} component={ContactUsScreen} />
      <Stack.Screen
        name={COURSES_VIDEOS_SCREEN}
        component={CoursesVideosScreen}
      />
      <Stack.Screen name={SHOP_LIST_SCREEN} component={ShopListScreen} />
      <Stack.Screen
        name={ACTIVATION_SUCCESS_SCREEN}
        component={ActivationSuccessScreen}
      />
      <Stack.Screen
        name={STUDENT_GRADES_SCREEN}
        component={StudentGradesScreen}
      />
      <Stack.Screen
        name={STUDENT_EXAMS_SCREEN}
        component={StudentExamsScreen}
      />
      <Stack.Screen
        name={STUDENT_LESSONS_NOTE_SCREEN}
        component={StudentLessonsNoteScreen}
      />
      <Stack.Screen
        name={STUDENT_MY_SCHEDULE_SCREEN}
        component={StudentMyScheduleScreen}
      />
      <Stack.Screen
        name={STUDENT_EMAIL_VERIFICATION_SCREEN}
        component={StudentEmailVerificationScreen}
      />
      <Stack.Screen
        name={STUDENT_SIGN_UP_COMPLETION_SCREEN}
        component={StudentSignUpCompletionScreen}
      />
      <Stack.Screen name={EXAM_SCREEN} component={ExamScreen} />
      <Stack.Screen name={VIDEO_SCREEN} component={VideoScreen} />
      <Stack.Screen
        name={CHAT_SCREEN}
        component={ChatScreen}
        initialParams={{backListener: false}}
      />
      <Stack.Screen
        name={FORGET_PASSWORD_SCREEN}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen name={RESET_PASSWORD_SCREEN} component={ResetPassword} />
      <Stack.Screen
        name={STUDENT_EXAM_TEST_SCREEN}
        component={StudentExamTestScreen}
      />
      <Stack.Screen name={TEACHERS} component={TeachersScreen} />
      <Stack.Screen name={PLAYER_SCREEN} component={PlayerScreen} />
      <Stack.Screen name={NOTIFICATION_SCREEN} component={NotificationScreen} />
    </Stack.Navigator>
  );
};
