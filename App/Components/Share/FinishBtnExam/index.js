import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import Indicator from '../Indicator';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const FinishBtnExam = ({loading, onSubmit}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onSubmit}
      style={[
        styles.finishBtn,
        {backgroundColor: loading ? Colors.commonGray : Colors.red},
      ]}
      activeOpacity={ACTIVE_OPACITY}>
      {loading ? (
        <Indicator color={Colors.white} />
      ) : (
        <Text style={styles.text}>{string.FINISH_EXAM}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FinishBtnExam;
