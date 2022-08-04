import React from 'react';
import {View, Text, TextInput, I18nManager} from 'react-native';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import styles from './style';
import {Formik} from 'formik';
import * as yup from 'yup';
import {string} from 'App/i18n';
import {useStrings} from 'App/Values/Strings';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import Strings from '../../../Values/Strings';

const AddQuestion = ({currentQuestion, onChangeTextQuestion}) => {
  const stringData = useStrings();

  const {VALIDATION_QUESTION_STRING} = stringData;

  return (
    <Formik
      initialValues={{
        text: currentQuestion?.question,
      }}
      // onSubmit={handleSubmit}
      onChangeText={onChangeTextQuestion}
      validationSchema={yup.object().shape(VALIDATION_QUESTION_STRING)}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        isValid,
        handleSubmit,
      }) => {
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
                value={values.text}
                onChangeText={onChangeTextQuestion}
                placeholder={string.ENTER_NOTE_NAME}
                style={styles.textInput}
                numberOfLines={5}
                // onChangeText={handleChange('text')}
                onBlur={() => setFieldTouched('text')}
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default AddQuestion;
