import React, {useEffect, useState} from 'react';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import HorizontalExamNumberList from 'App/Components/Special/HorizontalExamNumberList';
import FooterButtons from 'App/Components/Special/FooterButtons';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import TextQuestion from 'App/Components/Special/TextQuestion';
import Loading from 'App/Components/Share/Loading';
import EmptyView from 'App/Components/Share/EmptyView';
import {string} from 'App/i18n';
import {BackHandler} from 'react-native';
import {showToast} from '../../utils/showToast';

const StudentExamTestScreen = ({navigation, route}) => {
  const data = route?.params?.param;
  const dispatch = useDispatch();
  const examId = data?.examId;

  const userExamAllData = useSelector((state) => state.appData.getUserExamData);
  const loadingBTN = useSelector(
    (state) => state.appData.userAnswerToExamLoading,
  );
  const loading = useSelector((state) => state.appData.getUserExamLoading);
  let userExamData = userExamAllData?.testQuestions;
  console.log({userExamData});
  const title = userExamAllData?.course?.lesson?.title + ' ' + string.EXAM;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [question, setQuestion] = useState([]);
  //================================STATES==========================
  // useEffect(() => {
  //   dispatch(AppDataActions.getUserExam(examId));
  // }, []);
  useEffect(() => {
    let questions = [];
    for (var i = 0; i < userExamAllData?.testQuestions?.length; i++) {
      const scale = userExamAllData?.testQuestions[i]?.scale;
      const questionss = userExamAllData?.testQuestions[i]?.question;
      const options = [
        {
          id: userExamAllData?.testQuestions[i]?._id,
          text: userExamAllData?.testQuestions[i]?.questionAnswers[0],
          check: false,
        },
        {
          id: userExamAllData?.testQuestions[i]?._id,
          text: userExamAllData?.testQuestions[i]?.questionAnswers[1],
          check: false,
        },
        {
          id: userExamAllData?.testQuestions[i]?._id,
          text: userExamAllData?.testQuestions[i]?.questionAnswers[2],
          check: false,
        },
        {
          id: userExamAllData?.testQuestions[i]?._id,
          text: userExamAllData?.testQuestions[i]?.questionAnswers[3],
          check: false,
        },
      ];

      questions.push({question: questionss, options, scale});
    }
    setQuestion(questions);
  }, [userExamAllData]);
  //================================EFFECTS==========================

  const selCurrentExam = (index) => {
    console.log(question[index]);
    setCurrentQuestionNumber(index);
  };

  const selNextQuestion = () => {
    if (currentQuestionNumber < question?.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    } else {
      let testAnswers = [];

      for (var i = 0; i < question?.length; i++) {
        let answer = 0;
        let questionId = '';
        for (var j = 0; j < 4; j++) {
          if (question[i]?.options[j]?.check === true) {
            answer = j;
          }
          if (j === 0) {
            questionId = question[i]?.options[j]?.id;
          }
        }

        testAnswers.push({questionId, answer});
      }
      const exam = Object.assign({examId}, {testAnswers});
      dispatch(AppDataActions.userAnswerToExam(exam));

      console.log({exam});
    }
  };

  const selPreviousQuestion = () => {
    if (currentQuestionNumber > 0) {
      setCurrentQuestionNumber(currentQuestionNumber - 1);
    }
  };

  const selCorrectOption = (index) => {
    let questions = [...question];
    console.log(questions);
    for (var i = 0; i < 4; i++) {
      console.log(questions[currentQuestionNumber].options[i]?.check);

      questions[currentQuestionNumber].options[i].check = false;
      if (i === index) {
        questions[currentQuestionNumber].options[i].check = true;
      }
    }

    setQuestion(questions);
    console.log(questions);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const backAction = () => {
    console.log('backHandler');
    showToast('e', string.COMPLETE_EXAM_TO_BACK);
    return true;
  };

  //================================METHODS==========================
  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} backHandler={backAction} {...{title}} />
      {loading ? (
        <Loading />
      ) : question?.length > 0 ? (
        <>
          <HorizontalExamNumberList
            data={question}
            {...{currentQuestionNumber}}
            {...{selCurrentExam}}
          />
          <TextQuestion
            data={question[currentQuestionNumber]}
            options={question[currentQuestionNumber]}
            {...{selCorrectOption}}
          />
        </>
      ) : (
        <EmptyView />
      )}

      <FooterButtons
        {...{selNextQuestion}}
        {...{selPreviousQuestion}}
        length={question?.length > 0 ? question?.length : 0}
        {...{currentQuestionNumber}}
        {...{question}}
        {...{loadingBTN}}
      />
    </Container>
  );
};

export default StudentExamTestScreen;

//import DummyData from 'App/Values/DummyData';

//const {EXAM_SCREEN_OBJECTS} = DummyData.Data;
