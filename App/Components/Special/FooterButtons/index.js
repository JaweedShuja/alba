import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import {string} from 'App/i18n';
import Indicator from 'App/Components/Share/Indicator';
import {fontIconReverseHandler} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const FooterButtons = ({
  length,
  currentQuestionNumber,
  selNextQuestion,
  selPreviousQuestion,
  question,
  loadingBTN,
}) => {
  const [disabled, setDisabled] = useState(false);
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
  // console.log({question});
  // console.log({currentQuestionNumber});
  // console.log({length});
  // console.log(question[0]?.options[0]?.check);

  const check = (i) => {
    if (
      question[i]?.options[0]?.check == false &&
      question[i]?.options[1]?.check == false &&
      question[i]?.options[2]?.check == false &&
      question[i]?.options[3]?.check == false
    ) {
      return true;
    } else {
      console.log('nooooooooooooooooooooo');
      return false;
    }
  };

  useEffect(() => {
    let disableBtn = false;
    for (var i = 0; i < question?.length; i++) {
      if (check(i)) disableBtn = true;
    }
    setDisabled(disableBtn);
  }, [question]);
  useEffect(() => {
    let disableBtn = false;

    for (var i = 0; i < question?.length; i++) {
      if (check(i)) disableBtn = true;

      // if (check(i)) setDisabled(true);
      // else setDisabled(false);
    }
    setDisabled(disableBtn);
  }, [currentQuestionNumber]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        onPress={selPreviousQuestion}
        disabled={disabledPreviousBtn}
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
      {currentQuestionNumber == length - 1 ? (
        <TouchableOpacity
          onPress={selNextQuestion}
          activeOpacity={ACTIVE_OPACITY}
          disabled={disabled || loadingBTN}
          style={[
            styles.btn,
            {backgroundColor: disabled ? Colors.commonGray : colorNextBtn},
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
                style={lastQuestion ? {} : fontIconReverseHandler()}
              />
            </>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={selNextQuestion}
          activeOpacity={ACTIVE_OPACITY}
          // disabled={disabled}
          style={[styles.btn, {backgroundColor: colorNextBtn}]}>
          <Text style={[styles.textBtn]}>
            {lastQuestion ? string.SUBMIT_EXAM : string.NEXT_QUESTION}
          </Text>
          <FontIcon
            name={lastQuestion ? 'check' : Strings.Icons.RIGHT_SMALL}
            color={Colors.white}
            size={normal * 1.3}
            style={lastQuestion ? {} : fontIconReverseHandler()}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FooterButtons;
