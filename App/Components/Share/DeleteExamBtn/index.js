import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import Indicator from '../Indicator';
import {Colors} from 'App/Theme';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const DeleteExamBtn = ({loading, onSubmit}) => {
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
        <Text style={styles.text}>{string.DELETE_EXAM}</Text>
      )}
    </TouchableOpacity>
  );
};

export default DeleteExamBtn;
