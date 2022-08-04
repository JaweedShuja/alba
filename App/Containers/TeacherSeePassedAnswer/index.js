import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import styles from './style';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import TeacherExams from 'App/Components/Special/TeacherExams';
import TeacherParticipatingExam from 'App/Components/Special/TeacherParticipatingExam';
import {useDispatch, useSelector} from 'react-redux';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import Loading from '../../Components/Share/Loading';
import {string} from 'App/i18n';
import DeleteExamBtn from 'App/Components/Share/DeleteExamBtn';
import PopupsActions from 'App/Stores/PopUps/Actions';
import Strings from 'App/Values/Strings';

const TeacherSeePassedAnswerScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = route.params;
  const id = data?._id;

  const allExamAnswers = useSelector(
    (state) => state.teacherData.allExamAnswers,
  );
  const loadingGetAllExam = useSelector(
    (state) => state.teacherData.getAllExamAnswersLoading,
  );

  const loading = useSelector((state) => state.teacherData.deleteExamLoading);

  const examDetail = allExamAnswers?.examDetail;
  const examAnswers = allExamAnswers?.examAnswers;
  console.log({allExamAnswers});

  useEffect(() => {
    dispatch(TeacherDataActions.getAllExamAnswers(id));
  }, []);

  const onSubmit = () => {
    dispatch(
      PopupsActions.showModal(Strings.MODAL_TYPES.CONFIRM_MODAL, {
        description: string.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_EXAM,
        confirm: () => {
          dispatch(TeacherDataActions.deleteExam(id));
        },
        cancel: () =>
          dispatch(PopupsActions.hideModal(Strings.MODAL_TYPES.CONFIRM_MODAL)),
      }),
    );
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
      <DeleteExamBtn {...{loading}} {...{onSubmit}} />
    </Container>
  );
};

export default TeacherSeePassedAnswerScreen;
