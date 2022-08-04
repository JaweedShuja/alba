import React from 'react';
import {View, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Strings from '../Values/Strings';
import SpecialScreen from 'App/Containers/Special/SpecialScreen';
import ProfileScreen from 'App/Containers/Profile/ProfileScreen';
import HomeScreen from 'App/Containers/Home/HomeScreen';
import MessagesScreen from 'App/Containers/Messages/MessagesScreen';
import CoursesScreen from 'App/Containers/Courses/CoursesScreen';
import StudentTabBarIcon from 'App/Components/Share/StudentTabBarIcon';
import TabBarIconCourses from 'App/Components/Share/TabBarIconCourses';
import {Colors} from 'App/Theme';

const Tab = createBottomTabNavigator();

const {
  HOME_SCREEN,
  SPECIAL_SCREEN,
  PROFILE_SCREEN,
  MESSAGES_SCREEN,
  COURSES_SCREEN,
} = Strings.Routes;

function CustomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.containerStyle}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon(isFocused, 'white', 10)
            : null;

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            //onLongPress={onLongPress}
            style={{flex: 1}}
            activeOpacity={1}>
            {icon}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export const StudentsBottomTabs = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_SCREEN}
      backBehavior="initialRoute"
      tabBarOptions={{
        showLabel: false,
        style: {
          borderTopWidth: 0,
          position: 'absolute',
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: (focused) => (
            <StudentTabBarIcon
              focused={focused}
              nameIcon={Strings.Icons.HOME}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SPECIAL_SCREEN}
        component={SpecialScreen}
        options={{
          tabBarIcon: (focused) => (
            <StudentTabBarIcon
              focused={focused}
              nameIcon={Strings.Icons.LAYERS}
              borderRight={true}
            />
          ),
        }}
      />
      <Tab.Screen
        name={COURSES_SCREEN}
        component={CoursesScreen}
        options={{
          tabBarIcon: (focused) => (
            <TabBarIconCourses
              focused={focused}
              nameIcon={Strings.Icons.BOOK_ALT}
              sizeIcon={30}
              colorIcon={Colors.white}
            />
          ),
        }}
      />
      <Tab.Screen
        name={MESSAGES_SCREEN}
        component={MessagesScreen}
        options={{
          tabBarIcon: (focused) => (
            <StudentTabBarIcon
              focused={focused}
              nameIcon={Strings.Icons.COMMENT}
              borderLeft={true}
            />
          ),
        }}
      />
      <Tab.Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: (focused) => (
            <StudentTabBarIcon
              focused={focused}
              nameIcon={Strings.Icons.USER}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    height: 75,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    width: '100%',
    backgroundColor: Colors.white,
  },
});

// const onLongPress = () => {
//   navigation.emit({
//     type: 'tabLongPress',
//     target: route.key,
//   });
// };
