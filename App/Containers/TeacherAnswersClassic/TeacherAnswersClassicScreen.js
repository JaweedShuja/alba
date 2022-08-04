import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Container from 'App/Components/Container';
import DummyData from 'App/Values/DummyData';
import Header from 'App/Components/Share/Header';
import Strings from 'App/Values/Strings';
import TeacherAnswers from '../../Components/Special/TeacherAnswers';
import {useDispatch, useSelector} from 'react-redux';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import Loading from 'App/Components/Share/Loading';
import styles from './TeacherAnswersClassicStyle';
import HorizontalExamNumberList from 'App/Components/Special/HorizontalExamNumberList';
import TeacherClassicExamScore from '../../Components/Special/TeacherClassicExamScore';
import Metrics from '../../Theme/Metrics';
import SubmitScore from '../../Components/Special/SubmitScore';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {width, height} = Dimensions.get('screen');

const TeacherAnswersClassicScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const params = route.params?.param;
  console.log('result', {params});

  const data1 = useSelector(
    (state) => state.teacherData.getUserExamAnswersData,
  );
  const haveScore = data1?.alreadyHaveScore;
  const score = data1?.score;
  const data = data1?.result;
  const loading = useSelector(
    (state) => state.teacherData.getUserExamAnswersLoading,
  );
  const loadingBtn = useSelector(
    (state) => state.teacherData.submitExamScoreForUserLoading,
  );
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const examId = params?.examId;
  const userId = params?.userId;
  const sendParam = Object.assign({examId}, {userId});
  const [exams, setExams] = useState([]);
  //=============================EFFECTS==========================
  // useEffect(() => {
  //   dispatch(TeacherDataActions.getUserExamAnswers(sendParam));
  // }, []);
  useEffect(() => {
    let question = [];
    for (let i = 0; i < data?.length; i++) {
      let questionss = data[i]?.question;
      let answers = data[i]?.answers;
      question.push({question: questionss, answers});
    }

    setExams(question);
  }, [data]);
  //=============================EFFECTS==========================

  //===============================METHODS==========================
  const selCurrentExam = (index) => {
    setCurrentQuestionNumber(index);
  };
  //===============================METHODS==========================
  const onSubmitScore = (values) => {
    console.log({values});
    const score1 = values?.score;
    const scoreObject = Object.assign({examId}, {userId}, {score: score1});
    dispatch(TeacherDataActions.submitExamScoreForUser(scoreObject));
  };
  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.ANSWERS} />
      <HorizontalExamNumberList
        data={exams}
        {...{currentQuestionNumber}}
        {...{selCurrentExam}}
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={{
              paddingBottom: width * 0.25,
              ...Metrics.paddingHorizontalMain,
            }}>
            <TeacherClassicExamScore question={exams[currentQuestionNumber]} />
          </ScrollView>
          {haveScore ? (
            <View style={styles.finishBtnScore} activeOpacity={ACTIVE_OPACITY}>
              {/* <TextInput style={styles.scoreInput} placeholder={'Score: ' + score} /> */}
              <Text style={styles.textScore}>
                {string.SCORE} {score}
              </Text>
            </View>
          ) : (
            <SubmitScore {...{loadingBtn}} handleSubmit={onSubmitScore} />
          )}
        </>
      )}
    </Container>
  );
};

export default TeacherAnswersClassicScreen;
