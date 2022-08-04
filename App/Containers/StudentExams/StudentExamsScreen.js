import {useFocusEffect} from '@react-navigation/native';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import Loading from 'App/Components/Share/Loading';
import StudentExams from 'App/Components/Special/StudentExams';
import {string} from 'App/i18n';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import styles from './StudentExamsStyle';
import StudentExamsPlaceHolder from 'App/Components/Share/StudentExamsPlaceHolder';
import EmptyView from 'App/Components/Share/EmptyView';
const StudentExamsScreen = ({navigation, route}) => {
  const data = route.params;
  const dispatch = useDispatch();
  const allUserExams = useSelector((state) => state?.appData.allUserExams);
  const loading = useSelector((state) => state?.appData.getAllUserExamsLoading);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(AppDataActions.getAllUserExams());
    }, []),
  );

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={data.title} />
      {loading ? (
        <StudentExamsPlaceHolder />
      ) : allUserExams?.length === 0 ? (
        <EmptyView text={string.YOUR_TEACHER_DIDNT_ADD_A_QUIZ} />
      ) : (
        <>
          <Text style={styles.text}>{string.EXAMS_OF_TODAYS}</Text>
          <StudentExams data={allUserExams} />
        </>
      )}
    </Container>
  );
};

export default StudentExamsScreen;
