import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import FastImage from 'react-native-fast-image';
import {string} from 'App/i18n';
import Strings from 'App/Values/Strings';
import {useDispatch} from 'react-redux';
import PopupsActions from 'App/Stores/PopUps/Actions';

const {PLACEHOLDER} = Strings.ImageAddress;
const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const TeacherClassicExamScore = ({question}) => {
  const dispatch = useDispatch();

  const currentQuestion = question?.question;
  const currentAnswer = question?.answers;
  const questionImagePath = currentQuestion?.path;
  const answerImagePath = currentAnswer?.answer?.path;
  const [imageLoading, setImageLoading] = useState(true);
  const [imageLoadingAnswer, setImageLoadingAnswer] = useState(true);
  const imageOnPressHandler = (path) => {
    dispatch(
      PopupsActions.showModal(Strings.MODAL_TYPES.IMAGE_VIEWER, {
        images: [{url: path}],
      }),
    );
  };
  return (
    <>
      <Text style={styles.textAnswer}>{string.QUESTION}</Text>
      <TouchableOpacity
        style={styles.upLoadBtn}
        activeOpacity={ACTIVE_OPACITY}
        disabled={imageLoading}
        onPress={imageOnPressHandler.bind(null, questionImagePath)}>
        {imageLoading && (
          <FastImage
            source={PLACEHOLDER}
            style={[styles.upLoadBtn, {position: 'absolute', zIndex: 1000}]}
            resizeMode={'cover'}
          />
        )}
        <FastImage
          source={{
            uri: questionImagePath,
          }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          style={styles.upLoadBtn}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
      <Text style={styles.textAnswer}>{string.ANSWERS}</Text>
      <TouchableOpacity
        style={styles.upLoadBtn}
        activeOpacity={ACTIVE_OPACITY}
        disabled={imageLoading}
        onPress={imageOnPressHandler.bind(null, answerImagePath)}>
        {imageLoadingAnswer && (
          <FastImage
            source={PLACEHOLDER}
            style={[styles.upLoadBtn, {position: 'absolute', zIndex: 1000}]}
            resizeMode={'cover'}
          />
        )}
        <FastImage
          source={{
            uri: answerImagePath,
          }}
          onLoadStart={() => setImageLoadingAnswer(true)}
          onLoadEnd={() => setImageLoadingAnswer(false)}
          style={styles.upLoadBtn}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
    </>
  );
};

export default TeacherClassicExamScore;
