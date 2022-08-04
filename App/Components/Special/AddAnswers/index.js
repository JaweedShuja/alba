import React, {useState} from 'react';
import {View, Text, TextInput, I18nManager} from 'react-native';
import styles from './style';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import AnswerInput from '../../Share/AnswerInput';
import RequiredField from '../RequiredField';
import {string} from 'App/i18n';
import Strings from 'App/Values/Strings';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const errorMessage = {
  required: 'This field is required',
};
const AddAnswers = ({
  data,
  currentQuestion,
  onChangeTextQuestion,
  onChangeTextOptionA,
  onChangeTextOptionB,
  onChangeTextOptionC,
  onChangeTextOptionD,
  onChangeTextOptionScore,
  onPressOptionA,
  onPressOptionB,
  onPressOptionC,
  onPressOptionD,
}) => {
  const [showError, setShowError] = useState(false);

  console.log({currentQuestion});
  const endEditingInput = () => {
    if (currentQuestion?.question.length === 0) {
      setShowError(true);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{string.QUESTION}</Text>
      <View style={styles.viewNewQuestion}>
        <FontIcon
          name={Strings.Icons.PENCIL}
          size={normal * 1.7}
          color={Colors.lightBlue}
          style={styles.icon}
        />
        <TextInput
          value={currentQuestion?.question}
          onChangeText={onChangeTextQuestion}
          placeholder={string.ENTER_NOTE_NAME}
          style={styles.textInputQuestion}
          numberOfLines={5}
          onEndEditing={endEditingInput}
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
        />
      </View>
      {currentQuestion?.question.length === 0 ? (
        <RequiredField error={errorMessage.required} />
      ) : null}

      <Text style={styles.title}>{string.ANSWERS}</Text>
      <AnswerInput
        placeholder={string.WRITE_FIRST_OPTION}
        option="A"
        value={currentQuestion?.first?.text}
        onChangeText={onChangeTextOptionA}
        selQuestion={currentQuestion?.first?.check}
        onPress={onPressOptionA}
      />
      <AnswerInput
        placeholder={string.WRITE_SECOND_OPTION}
        option="B"
        value={currentQuestion?.second?.text}
        onChangeText={onChangeTextOptionB}
        selQuestion={currentQuestion?.second?.check}
        onPress={onPressOptionB}
      />
      <AnswerInput
        placeholder={string.WRITE_THIRD_OPTION}
        option="C"
        value={currentQuestion?.third?.text}
        onChangeText={onChangeTextOptionC}
        selQuestion={currentQuestion?.third?.check}
        onPress={onPressOptionC}
      />
      <AnswerInput
        placeholder={string.WRITE_FOURTH_OPTION}
        option="D"
        value={currentQuestion?.fourth?.text}
        onChangeText={onChangeTextOptionD}
        selQuestion={currentQuestion?.fourth?.check}
        onPress={onPressOptionD}
      />
      <AnswerInput
        placeholder={string.WRITE_SCORE}
        option="Score"
        icon={false}
        value={currentQuestion?.score?.text}
        onChangeText={onChangeTextOptionScore}
      />
      {currentQuestion?.score?.text <= 0 ? (
        <RequiredField error={errorMessage.required} />
      ) : null}
    </View>
  );
};

export default AddAnswers;
