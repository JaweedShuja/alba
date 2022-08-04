import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Strings from '../Values/Strings';
import SpecialTeacherScreen from 'App/Containers/SpecialTeacher/SpecialTeacherScreen';
import ProfileScreen from 'App/Containers/Profile/ProfileScreen';
import HomeScreen from 'App/Containers/Home/HomeScreen';
import MessagesScreen from 'App/Containers/Messages/MessagesScreen';
import TabBarIcon from 'App/Components/Share/TabBarIcon';
import HomeTeacherScreen from '../Containers/HomeTeacher/HomeTeacherScreen';
import {Colors} from '../Theme';

const Tab = createBottomTabNavigator();
const {
  HOME_SCREEN,
  SPECIAL_TEACHER_SCREEN,
  PROFILE_SCREEN,
  MESSAGES_SCREEN,
  HOME_TEACHER_SCREEN,
} = Strings.Routes;

export const TeacherBottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_TEACHER_SCREEN}
      backBehavior="initialRoute"
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0,
          position: 'absolute',
          backgroundColor: Platform.OS === 'ios' ? Colors.white : 'transparent',
          elevation: 0,
        },
      }}>
      <Tab.Screen
        name={HOME_TEACHER_SCREEN}
        component={HomeTeacherScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} nameIcon={Strings.Icons.HOME} />
          ),
        }}
      />
      <Tab.Screen
        name={SPECIAL_TEACHER_SCREEN}
        component={SpecialTeacherScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} nameIcon={Strings.Icons.LAYERS} />
          ),
        }}
      />

      <Tab.Screen
        name={MESSAGES_SCREEN}
        component={MessagesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} nameIcon={Strings.Icons.COMMENT} />
          ),
        }}
      />
      <Tab.Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} nameIcon={Strings.Icons.USER} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
