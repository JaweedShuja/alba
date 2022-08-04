import React, {useEffect} from 'react';
import StudentGrades from 'App/Components/Special/StudentGrades';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import AppDataActions from '../../Stores/AppData/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {string} from 'App/i18n';
import Loading from '../../Components/Share/Loading';
import EmptyView from '../../Components/Share/EmptyView';
import StudentExamsPlaceHolder from 'App/Components/Share/StudentExamsPlaceHolder';

const StudentGradesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.appData.examsScore);
  const loading = useSelector((state) => state.appData.examsScoreLoading);

  useEffect(() => {
    dispatch(AppDataActions.getAllUserExamsScore());
  }, []);

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.GRADES} />
      {loading ? (
        <StudentExamsPlaceHolder />
      ) : data?.length === 0 ? (
        <EmptyView text={string.NO_EXAM_GRADE_ENTERED_BY_YOUR_TEACHER} />
      ) : (
        <StudentGrades {...{data}} />
      )}
    </Container>
  );
};

export default StudentGradesScreen;
