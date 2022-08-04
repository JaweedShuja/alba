import React from 'react';
import TextTicker from 'react-native-text-ticker';
import styles from './style';

const StudentExams = ({
  text,
  duration = 6000,
  repeatSpacer = 50,
  marqueeDelay = 1000,
  textStyle = styles.textStyle,
}) => {
  return (
    <TextTicker
      style={textStyle}
      duration={duration}
      loop
      bounce
      repeatSpacer={repeatSpacer}
      marqueeDelay={marqueeDelay}>
      {text}
    </TextTicker>
  );
};

export default StudentExams;
