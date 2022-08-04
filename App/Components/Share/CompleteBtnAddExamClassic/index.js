import Strings from 'App/Values/Strings';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../../Theme';
import Indicator from '../Indicator';
import styles from './style';
const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const CompleteBtnAddExamClassic = ({
  title,
  question,
  onSubmit,
  loading,
  uploading,
  currentQuestionNumber,
}) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let disabledBTN = false;

    for (var i = 0; i < question.length - 1; i++) {
      if (!question[i]?.currentFile?._id) disabledBTN = true;
    }
    setDisabled(disabledBTN);
  }, [question]);

  useEffect(() => {
    let disabledBTN = false;

    for (var i = 0; i < question.length - 1; i++) {
      if (!question[i]?.currentFile?._id) disabledBTN = true;
    }
    setDisabled(disabledBTN);
  }, [currentQuestionNumber]);

  return (
    <TouchableOpacity
      onPress={onSubmit}
      style={[
        styles.finishBtn,
        {
          backgroundColor:
            disabled || loading || uploading ? Colors.commonGray : Colors.green,
        },
      ]}
      activeOpacity={ACTIVE_OPACITY}
      disabled={disabled || loading || uploading}>
      {loading ? (
        <Indicator color={Colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CompleteBtnAddExamClassic;
