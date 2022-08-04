import React from 'react';
import {Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {navigate} from '../../../Services/NavigationService';
import {string} from 'App/i18n';
import FastImage from 'react-native-fast-image';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {BACKGROUND_IMAGE_SUCCESS} = Strings.ImageAddress;
const {COURSES_SCREEN, STUDENTS_BOTTOMS_TABS} = Strings.Routes;

const ActivationSuccess = () => {
  const onPressItem = () => {
    navigate(STUDENTS_BOTTOMS_TABS, {screen: COURSES_SCREEN});
  };
  return (
    <ImageBackground
      source={BACKGROUND_IMAGE_SUCCESS}
      style={styles.imageBackground}>
      <FastImage
        source={Strings.ImageAddress.CHECK}
        style={styles.image}
        resizeMode={'cover'}
      />
      <Text style={styles.textSuccess}>{string.ACTIVATION_SUCCESSFUL}</Text>
      <Text style={styles.textDesc}>
        {string.YOU_ACCESS_COURSE_FROM_YOUR_COURSES_SCREEN}
      </Text>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        style={styles.btn}
        onPress={onPressItem}>
        <Text style={styles.textBtn}>{string.MY_COURSES}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ActivationSuccess;
