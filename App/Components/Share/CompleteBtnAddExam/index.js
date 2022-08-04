import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import Strings from 'App/Values/Strings';
import styles from './style';
import {Colors} from '../../../Theme';
import Indicator from '../Indicator';
const {ACTIVE_OPACITY} = Strings.CONSTANTS;
let total = 0;

const CompleteBtnAddExam = ({title, question, onSubmit, loading, style}) => {
  const [disabled, setDisabled] = useState(false);

  const checkTotalScore = () => {
    for (var i = 0; i < question.length - 1; i++) {
      console.log('question[i]', question[i].score?.text);
      total += parseInt(question[i].score?.text);
      if (total > 100) return true;
      else return false;
    }
  };

  useEffect(() => {
    for (var i = 0; i < question.length - 1; i++) {
      if (
        question[i]?.question.length === 0 ||
        question[i]?.first?.text.length === 0 ||
        question[i]?.second?.text.length === 0 ||
        question[i]?.third?.text.length === 0 ||
        question[i]?.fourth?.text.length === 0 ||
        question[i]?.score?.text <= 0
      )
        setDisabled(true);
      else setDisabled(false);
    }
  }, [question]);
  useEffect(() => {
    for (var i = 0; i < question.length - 1; i++) {
      if (
        question[i]?.question.length === 0 ||
        question[i]?.first?.text.length === 0 ||
        question[i]?.second?.text.length === 0 ||
        question[i]?.third?.text.length === 0 ||
        question[i]?.fourth?.text.length === 0 ||
        question[i]?.score?.text <= 0
      )
        setDisabled(true);
      else {
        setDisabled(false);
      }
    }
  }, []);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = () => setKeyboardStatus(true);
  const _keyboardDidHide = () => setKeyboardStatus(false);
  return (
    <TouchableOpacity
      onPress={onSubmit}
      style={[
        style,
        styles.finishBtn,
        {
          backgroundColor:
            disabled || loading ? Colors.commonGray : Colors.green,
          // position: !keyboardStatus ? 'absolute' : 'relative',
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

export default CompleteBtnAddExam;
