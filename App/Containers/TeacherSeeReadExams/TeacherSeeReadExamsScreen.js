import {useFocusEffect} from '@react-navigation/native';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import StudentExams from 'App/Components/Special/StudentExams';
import {string} from 'App/i18n';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EmptyView from '../../Components/Share/EmptyView';
import Loading from '../../Components/Share/Loading';
import StudentExamsPlaceHolder from 'App/Components/Share/StudentExamsPlaceHolder';

const TeacherSeeReadExamsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.teacherData.TeacherExamsList);
  const loading = useSelector(
    (state) => state.teacherData.getAllTeacherExamsListLoading,
  );

  useEffect(() => {
    dispatch(TeacherDataActions.getAllTeacherExamsList());
  }, []);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.SEE_READ_EXAMS} />
      {/* <Text style={styles.text}>Exams Of Todays</Text> */}
      {loading ? (
        <StudentExamsPlaceHolder />
      ) : data?.length === 0 ? (
        <EmptyView text={string.FIRST_TO_SEE_EXAMS_PLEASE_ADD_EXAM_FIRST} />
      ) : (
        <StudentExams {...{loading}} {...{data}} type="teacher" />
      )}
    </Container>
  );
};

export default TeacherSeeReadExamsScreen;
