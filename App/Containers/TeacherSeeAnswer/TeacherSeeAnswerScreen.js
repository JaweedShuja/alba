import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import styles from './TeacherSeeAnswerStyle';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import TeacherExams from 'App/Components/Special/TeacherExams';
import TeacherParticipatingExam from 'App/Components/Special/TeacherParticipatingExam';
import {useDispatch, useSelector} from 'react-redux';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import Loading from '../../Components/Share/Loading';
import FinishBtnExam from '../../Components/Share/FinishBtnExam';
import {string} from 'App/i18n';

const TeacherSeeAnswerScreen = ({navigation, route}) => {
  const data = route.params;
  const id = data?._id;
  const dispatch = useDispatch();

  const allExamAnswers = useSelector(
    (state) => state.teacherData.allExamAnswers,
  );
  const loadingGetAllExam = useSelector(
    (state) => state.teacherData.getAllExamAnswersLoading,
  );
  const loading = useSelector((state) => state.teacherData.finishExamLoading);
  const examDetail = allExamAnswers?.examDetail;
  const examAnswers = allExamAnswers?.examAnswers;
  console.log({allExamAnswers});

  useEffect(() => {
    dispatch(TeacherDataActions.getAllExamAnswers(id));
  }, []);

  const onSubmit = () => {
    dispatch(TeacherDataActions.finishExam(id));
  };

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.SEE_ANSWERS} />
      {loadingGetAllExam ? (
        <Loading />
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <TeacherExams data={examDetail} />
          <TeacherParticipatingExam data={examAnswers} />
        </ScrollView>
      )}

      <FinishBtnExam {...{loading}} {...{onSubmit}} />
    </Container>
  );
};

export default TeacherSeeAnswerScreen;

//import DummyData from 'App/Values/DummyData';

//const {SEE_ANSWERS_SCREEN_OBJECTS} = DummyData.Data;
