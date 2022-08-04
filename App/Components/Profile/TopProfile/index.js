import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import logo from 'App/Assets/icons/logo.png';
import {string} from 'App/i18n';

const TopProfile = ({data, isLoggedInSuccess}) => {
  return (
    <View style={styles.container}>
      <View style={styles.startView}>
        <View style={styles.textStyle}>
          <Text style={styles.welcomeText}>
            {data.english.welcome}{' '}
            {isLoggedInSuccess?.payload?.firstName ? (
              <Text>
                {isLoggedInSuccess?.payload?.firstName}{' '}
                <Text>{string.TO_ALBA_PLATFORM}</Text>
              </Text>
            ) : (
              <Text> {string.TO_ALBA_PLATFORM_EDUCATION}</Text>
            )}
          </Text>
        </View>
        <View style={styles.textStyle}>
          {isLoggedInSuccess?.payload?.firstName ? (
            <Text style={styles.descText}>
              {
                string.FOR_MORE_DETAILS_ABOUT_OUR_COURSES_AND_HOW_TO_BUY_IT_PLEASE_CONTACT_US
              }
            </Text>
          ) : (
            <Text style={styles.descText}>{data.english.desc}</Text>
          )}
        </View>
      </View>
      <View style={styles.endView}>
        <FastImage source={logo} style={styles.image} resizeMode="cover" />
      </View>
    </View>
  );
};

export default TopProfile;
