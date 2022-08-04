import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import ProgressCircle from 'react-native-progress-circle';

const ProgressCircleComponent = ({percent = 0}) => {
  return (
    <ProgressCircle
      percent={percent}
      radius={50}
      borderWidth={8}
      color={Colors.lightBlue}
      shadowColor={Colors.commonGray}
      bgColor={Colors.white}>
      <Text style={styles.textStyle}>{`${percent}%`}</Text>
    </ProgressCircle>
  );
};

export default ProgressCircleComponent;
