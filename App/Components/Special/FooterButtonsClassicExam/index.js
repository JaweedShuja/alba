import Indicator from 'App/Components/Share/Indicator';
import {string} from 'App/i18n';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import Strings from 'App/Values/Strings';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import {
  fontIconHandler,
  fontIconReverseHandler,
} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const FooterButtonsClassicExam = ({
  // length,
  currentQuestionNumber,
  selNextQuestion,
  selPreviousQuestion,
  question,
  loadingBTN,
  uploading,
}) => {
  const [disabled, setDisabled] = useState(false);
  let length = question?.length;
  let colorNextBtn = null;
  let colorPreviousBtn = Colors.previousBtn;
  let disabledNextBtn = false;
  let disabledPreviousBtn = false;
  let lastQuestion = false;
  switch (currentQuestionNumber) {
    case 0:
      if (currentQuestionNumber != length - 1) colorNextBtn = Colors.lightBlue;
      else {
        colorNextBtn = Colors.green;
        lastQuestion = true;
      }
      disabledPreviousBtn = true;
      break;
    case length - 1:
      colorNextBtn = Colors.green;
      lastQuestion = true;
      disabledPreviousBtn = false;
      break;
    default:
      colorNextBtn = Colors.lightBlue;
      disabledPreviousBtn = false;
      break;
  }

  useEffect(() => {
    let disabledBTN = false;

    for (var i = 0; i < question.length; i++) {
      if (question[i]?.currentFile == null) {
        disabledBTN = true;
      }
    }
    setDisabled(disabledBTN);
  }, [currentQuestionNumber]);

  useEffect(() => {
    let disabledBTN = false;

    for (var i = 0; i < question.length; i++) {
      if (question[i]?.currentFile == null) {
        console.log('btnnnnnnnnnnnnnnnnnnnnnnnnnn', question[i]);
        disabledBTN = true;
      }
      // else setDisabled(false);
    }
    setDisabled(disabledBTN);
  }, [question]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        onPress={selPreviousQuestion}
        disabled={disabledPreviousBtn || uploading}
        style={[styles.btn, {backgroundColor: colorPreviousBtn}]}>
        <FontIcon
          name={Strings.Icons.RIGHT_SMALL}
          color={Colors.commonGray}
          size={normal * 1.3}
          style={fontIconReverseHandler()}
        />
        <Text style={[styles.textBtn, {color: Colors.commonGray}]}>
          {string.PREVIOUS_QUESTION}
        </Text>
      </TouchableOpacity>
      {console.log(disabled)}

      {currentQuestionNumber == length - 1 ? (
        <TouchableOpacity
          onPress={selNextQuestion}
          activeOpacity={ACTIVE_OPACITY}
          disabled={disabled || loadingBTN || uploading}
          style={[
            styles.btn,
            {
              backgroundColor:
                disabled || uploading ? Colors.commonGray : colorNextBtn,
            },
          ]}>
          {loadingBTN ? (
            <Indicator color={Colors.white} />
          ) : (
            <>
              <Text style={[styles.textBtn]}>
                {lastQuestion ? string.SUBMIT_EXAM : string.NEXT_QUESTION}
              </Text>
              <FontIcon
                name={lastQuestion ? 'check' : Strings.Icons.RIGHT_SMALL}
                color={Colors.white}
                size={normal * 1.3}
                style={lastQuestion ? {} : fontIconHandler()}
              />
            </>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={selNextQuestion}
          disabled={uploading}
          activeOpacity={ACTIVE_OPACITY}
          style={[
            styles.btn,
            {backgroundColor: uploading ? Colors.commonGray : colorNextBtn},
          ]}>
          <Text style={[styles.textBtn]}>{string.NEXT_QUESTION}</Text>
          <FontIcon
            name={Strings.Icons.RIGHT_SMALL}
            color={Colors.white}
            size={normal * 1.3}
            style={fontIconHandler()}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default FooterButtonsClassicExam;
