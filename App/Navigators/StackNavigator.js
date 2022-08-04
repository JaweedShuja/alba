import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Strings from 'App/Values/Strings';
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen';
import {StudentsBottomTabs} from './TabNavigatorStudents';
import {TeacherBottomTabs} from './TabNavigatorTeacher';
import {StudentStack} from './StudentStack';
import {TeacherStack} from './TeacherStack';
import ContactUsScreen from 'App/Containers/ContactUs/ContactUsScreen';
import MainScreen from 'App/Containers/Main/MainScreen';
import {useExitAppConfirmation} from 'App/Services/hooks';
import {I18nManager} from 'react-native';
I18nManager.forceRTL(I18nManager.isRTL);
const Stack = createStackNavigator();
const {
  STUDENTS_BOTTOMS_TABS,
  TEACHER_BOTTOMS_TABS,
  CONTACT_US_SCREEN,
  STUDENT_STACK,
  TEACHER_STACK,
  MAIN_SCREEN,
  SPLASH_SCREEN,
} = Strings.Routes;

export const MainStack = () => {
  useExitAppConfirmation();

  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={SPLASH_SCREEN}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
      }}>
      <Stack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
      <Stack.Screen name={MAIN_SCREEN} component={MainScreen} />
      <Stack.Screen
        name={STUDENTS_BOTTOMS_TABS}
        component={StudentsBottomTabs}
      />
      <Stack.Screen name={TEACHER_BOTTOMS_TABS} component={TeacherBottomTabs} />
      <Stack.Screen name={STUDENT_STACK} component={StudentStack} />
      <Stack.Screen name={TEACHER_STACK} component={TeacherStack} />
      <Stack.Screen name={CONTACT_US_SCREEN} component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

/* <Stack.Screen name={EDUCATION_GRADE_SCREEN} component={EducationGrade} />
      <Stack.Screen name={HOME_SCREEN} component={ExampleScreen} />
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} /> */
