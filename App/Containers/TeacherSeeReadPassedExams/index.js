import {useFocusEffect} from '@react-navigation/native';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import StudentPassedExams from 'App/Components/Special/StudentPassedExams';
import {string} from 'App/i18n';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EmptyView from '../../Components/Share/EmptyView';
import Loading from '../../Components/Share/Loading';
import StudentExamsPlaceHolder from 'App/Components/Share/StudentExamsPlaceHolder';

const TeacherSeeReadPassedExamsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = useSelector(
    (state) => state.teacherData.getTeacherPassedExamsData,
  );
  const loading = useSelector(
    (state) => state.teacherData.getTeacherPassedExamsLoading,
  );

  useEffect(() => {
    dispatch(TeacherDataActions.getTeacherPassedExams());
  }, []);

  useEffect(() => {
    console.log('passedExams*=>', data);
  }, [data]);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.SEE_READ_PASSED_EXAMS} />
      {/* <Text style={styles.text}>Exams Of Todays</Text> */}
      {loading ? (
        <StudentExamsPlaceHolder />
      ) : data?.length === 0 ? (
        <EmptyView text={string.YOU_HAVE_NO_PASSED_EXAM} />
      ) : (
        <StudentPassedExams {...{loading}} {...{data}} />
      )}
    </Container>
  );
};

export default TeacherSeeReadPassedExamsScreen;
