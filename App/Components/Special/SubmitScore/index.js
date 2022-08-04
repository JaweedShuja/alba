import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import * as yup from 'yup';
import {Formik} from 'formik';
import {string} from 'App/i18n';
import {showToast} from 'App/utils/showToast';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import Indicator from 'App/Components/Share/Indicator';
const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {VALIDATION_SCORE} = Strings.CONSTANTS;

const SubmitScore = ({handleSubmit, loadingBtn}) => {
  const [score, setScore] = useState(0);
  const [colorError, setColorError] = useState(Colors.text);
  const onChangeColor = (touched, score) => {
    if (touched && score) setColorError(Colors.error);
    else setColorError(Colors.text);
  };
  return (
    <Formik
      initialValues={{
        score: -1,
      }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape(VALIDATION_SCORE)}>
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
          <View
            style={[
              styles.finishBtn,
              {
                backgroundColor: !loadingBtn ? Colors.green : Colors.commonGray,
                borderColor: !loadingBtn ? Colors.green : Colors.commonGray,
              },
            ]}>
            <TextInput
              value={values.score}
              textAlign={'center'}
              style={[
                styles.scoreInput,
                {
                  color: colorError,
                  borderwidth: colorError == Colors.text ? 0 : 2,
                  borderColor:
                    colorError == Colors.text ? Colors.error : Colors.white,
                },
              ]}
              maxlength={3}
              keyboardType="phone-pad"
              onChangeText={handleChange('score')}
              onBlur={() => setFieldTouched('score')}
              placeholder={string.ENTER_SCORE}
            />
            {
              // touched.score &&
              //   errors.score &&
              onChangeColor(touched.score, errors.score)
            }
            <TouchableOpacity
              style={[
                styles.submitScore,
                {
                  backgroundColor: !loadingBtn
                    ? Colors.green
                    : Colors.commonGray,
                },
              ]}
              onPress={handleSubmit}
              disabled={!loadingBtn ? false : true}
              activeOpacity={ACTIVE_OPACITY}>
              {loadingBtn ? (
                <Indicator color={Colors.white} />
              ) : (
                <Text style={styles.text}>{string.SUBMIT_SCORE}</Text>
              )}
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

export default SubmitScore;
