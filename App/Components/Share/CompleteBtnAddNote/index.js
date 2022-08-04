import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Strings from 'App/Values/Strings';
import styles from './style';
import {Colors} from '../../../Theme';
import Indicator from '../Indicator';
const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const CompleteBtnAddNote = ({title, onSubmit, loading, disabled = false}) => {
  return (
    <TouchableOpacity
      onPress={onSubmit}
      style={[
        styles.finishBtn,
        {
          backgroundColor:
            disabled || loading ? Colors.commonGray : Colors.green,
        },
      ]}
      activeOpacity={ACTIVE_OPACITY}
      disabled={disabled || loading}>
      {loading ? (
        <Indicator color={Colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CompleteBtnAddNote;
