import React from 'react';
import {View, Text} from 'react-native';
import styles from './TeacherAnswersStyle';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import Strings from 'App/Values/Strings';
import TeacherAnswers from '../../Components/Special/TeacherAnswers';
import {useSelector} from 'react-redux';
import Loading from 'App/Components/Share/Loading';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const TeacherAnswersScreen = ({navigation, route}) => {
  const params = route.params?.param;
  console.log('result', {params});

  console.log({params});
  const data = useSelector((state) => state.teacherData.getUserExamAnswersData);
  const loading = useSelector(
    (state) => state.teacherData.getUserExamAnswersLoading,
  );
  const examData = data?.result;
  const score = data?.score;
  const examId = params?.exam?._id;
  const userId = params?.user?._id;
  const sendParam = Object.assign({examId}, {userId});

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.ANSWERS} />
      {loading ? <Loading /> : <TeacherAnswers data={examData} />}
      <View style={styles.finishBtn} activeOpacity={ACTIVE_OPACITY}>
        <Text style={styles.text}>
          {string.SCORE} {score}
        </Text>
      </View>
    </Container>
  );
};

export default TeacherAnswersScreen;
