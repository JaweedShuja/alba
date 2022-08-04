import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  I18nManager,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import styles from './style';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import TeacherDataActions from '../../Stores/TeacherData/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {string} from 'App/i18n';
import Indicator from 'App/Components/Share/Indicator';
import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import {Fonts, Metrics} from '../../Theme';
import {showToast} from 'App/utils/showToast';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const TeacherAddExamNoteScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {question, type, dateStart, dateEnd, courseId} = route?.params?.data;
  console.log({question, type, dateStart, dateEnd, courseId});

  const [text, onChangeText] = useState('');

  const loading = useSelector((state) => state.teacherData.addExamLoading);

  const onPressComplete = () => {
    if (text === '') {
      showToast('e', string.PLEASE_ENTER_A_TEXT);
    } else {
      addExam();
    }
  };

  const addExam = () => {
    if (type === 'TEST') {
      let testQuestions = [];
      // const newDateMyStart = moment(dateStart).format('YYYY-MM-DD');

      for (var i = 0; i < question.length - 1; i++) {
        let newQuestion = question[i]?.question;
        let questionAnswers = [];
        questionAnswers.push(question[i]?.first?.text);
        questionAnswers.push(question[i]?.second?.text);
        questionAnswers.push(question[i]?.third?.text);
        questionAnswers.push(question[i]?.fourth?.text);
        let correctAnswer = 0;
        if (question[i]?.first?.check) correctAnswer = 0;
        else if (question[i]?.second?.check) correctAnswer = 1;
        else if (question[i]?.third?.check) correctAnswer = 2;
        else correctAnswer = 3;
        let scale = parseInt(question[i]?.score?.text);
        testQuestions.push({
          question: newQuestion,
          questionAnswers,
          correctAnswer,
          scale,
        });
      }
      const startDate = dateStart.toISOString(); //moment(dateStart).format('YYYY-MM-DD');
      const endDate = dateEnd.toISOString(); //moment(dateEnd).format('YYYY-MM-DD');
      const exam = Object.assign(
        {type},
        {startDate},
        {endDate},
        {courseId},
        {testQuestions},
        {text},
      );
      dispatch(TeacherDataActions.addExam(exam));
      onChangeText('');
    } else {
      let classicQuestions = [];
      // const newDateMyStart = moment(dateStart).format('YYYY-MM-DD');

      for (var i = 0; i < question.length - 1; i++) {
        classicQuestions.push({question: question[i].currentFile?._id});
      }
      const startDate = dateStart.toISOString();
      const endDate = dateEnd.toISOString();
      const exam = Object.assign(
        {type},
        {startDate},
        {endDate},
        {courseId},
        {classicQuestions},
        {text},
      );
      dispatch(TeacherDataActions.addExam(exam));
      onChangeText('');
    }

    console.log('exammmmmmmmmmm', {type});
  };

  //============================METHODS================================
  return (
    <Container {...{navigation}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <Header {...{navigation}} title={string.ADD_EXAM} />
          <View style={{flex: 1, ...Metrics.mediumPadding}}>
            <Text
              style={{
                ...Fonts.h3,
                ...Metrics.mediumBottomMargin,
              }}>
              {string.ADD_AN_EXAM_NOTE}
            </Text>
            <Text style={styles.textInput1}>{string.NOTE}</Text>
            <View style={styles.viewMessage}>
              <View style={styles.viewInput}>
                <TextInput
                  placeholder={string.WRITE_NOTE_FOR_EXAM}
                  value={text}
                  onChangeText={onChangeText}
                  style={styles.textInput}
                  placeholderTextColor={Colors.text}
                  multiline={true}
                  numberOfLines={6}
                  textAlign={I18nManager.isRTL ? 'right' : 'left'}
                />
              </View>
            </View>
            <Text style={styles.textInput2}>
              {string.THIS_WILL_APEAR_ON_STUDENTS_SCHEDULE}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onPressComplete}
            style={[
              styles.finishBtn,
              {
                backgroundColor: loading ? Colors.commonGray : Colors.green,
              },
            ]}
            activeOpacity={ACTIVE_OPACITY}
            disabled={loading}>
            {loading ? (
              <Indicator color={Colors.white} />
            ) : (
              <Text style={styles.text}>{string.COMPLETE}</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default TeacherAddExamNoteScreen;
