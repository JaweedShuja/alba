import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import Loading from 'App/Components/Share/Loading';
import ClassicQuestion from 'App/Components/Special/ClassicQuestion';
import FooterButtonsClassicExam from 'App/Components/Special/FooterButtonsClassicExam';
import HorizontalExamNumberList from 'App/Components/Special/HorizontalExamNumberList';
import {string} from 'App/i18n';
import {uploadResponseHandler} from 'App/utils/uploadResponseHandler';
import {useDummyData} from 'App/Values/DummyData';
import React, {useEffect, useState} from 'react';
import {BackHandler, Dimensions, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from '../../Stores/AppData/Actions';
import {showToast} from '../../utils/showToast';
import styles from './ExamStyle';
import {uploadFile} from 'App/utils/uploadFile';

const {width, height} = Dimensions.get('screen');

const ExamScreen = ({navigation, route}) => {
  const data = route?.params?.param;
  const dispatch = useDispatch();
  const DummyData = useDummyData();

  const {EXAM_SCREEN_OBJECTS} = DummyData;
  const examId = data?.examId;

  const userExamAllData = useSelector((state) => state.appData.getUserExamData);
  const loadingData = useSelector((state) => state.appData.getUserExamLoading);
  const loadingBTN = useSelector(
    (state) => state.appData.userAnswerToExamLoading,
  );
  let userExamData = [];
  userExamData = userExamAllData?.classicQuestions;
  console.log('ExamScreen', {data});
  const title = userExamAllData?.course?.lesson?.title + ' ' + string.EXAM;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [question, setQuestion] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [fileError, setFileError] = useState(false);

  //================================STATES==========================

  // useEffect(() => {
  // dispatch(AppDataActions.getUserExam(examId));
  // }, []);
  useEffect(() => {
    let questions = [];

    for (var i = 0; i < userExamAllData?.classicQuestions?.length; i++) {
      const options = {
        path: userExamAllData?.classicQuestions[i]?.question?.path,
        currentFile: null,
        id: userExamAllData?.classicQuestions[i],
      };

      questions.push(options);
    }
    setQuestion(questions);
  }, [userExamAllData]);
  //================================EFFECTS==========================
  const selCurrentExam = (index) => {
    setCurrentQuestionNumber(index);
  };
  const selNextQuestion = () => {
    if (currentQuestionNumber < userExamData.length - 1) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    } else {
      let classicAnswers = [];

      for (var i = 0; i < question.length; i++) {
        let answer = 0;
        let questionId = '';

        answer = question[i]?.currentFile?._id;
        questionId = userExamData[i]?._id;

        classicAnswers.push({questionId, answer});
      }
      const exam = Object.assign({examId}, {classicAnswers});
      dispatch(AppDataActions.userAnswerToExam(exam));

      console.log({exam});
    }
  };
  const selPreviousQuestion = () => {
    if (currentQuestionNumber > 0) {
      setCurrentQuestionNumber(currentQuestionNumber - 1);
    }
  };
  const upload = async (formData, type) => {
    console.log({formData}, {type});

    try {
      setUploading(true);
      const response = await uploadFile(formData);
      setUploading(false);
      const payload = uploadResponseHandler(response);
      let questions = [...question];
      questions[currentQuestionNumber].currentFile = {
        // questionId: userExamData[currentQuestionNumber]?._id,
        _id: payload?.payload?._id,
        title: payload?.payload?.filename,
        noteType: type,
        file: {
          id: payload?.payload?._id,
          path: payload?.payload?.path,
        },
      };
      setQuestion(questions);

      setFileError(false);
    } catch (error) {
      setUploading(false);
      console.log('uploadFile Error', error);
    }
  };
  const deleteHandler = () => {
    const id = question[currentQuestionNumber]?.currentFile?._id;
    dispatch(AppDataActions.deleteFile(id));
    let questions = [...question];
    questions[currentQuestionNumber].currentFile = null;
    setQuestion(questions);
    setFileError(true);
  };
  //================================METHODS==========================

  //================================EFFECTS==========================
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

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} backHandler={backAction} {...{title}} />
      <HorizontalExamNumberList
        data={userExamData}
        {...{currentQuestionNumber}}
        {...{selCurrentExam}}
        {...{uploading}}
      />
      {loadingData ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            paddingBottom: width * 0.25,
          }}>
          <ClassicQuestion
            data={question[currentQuestionNumber]}
            {...{upload}}
            {...{uploading}}
            {...{deleteHandler}}
            {...{fileError}}
            currentFile={question[currentQuestionNumber]?.currentFile}

            // {...{currentFile}}
          />
        </ScrollView>
      )}

      <FooterButtonsClassicExam
        data={EXAM_SCREEN_OBJECTS}
        {...{selNextQuestion}}
        {...{selPreviousQuestion}}
        length={0 || userExamData?.length}
        {...{currentQuestionNumber}}
        {...{question}}
        {...{loadingBTN}}
        {...{uploading}}
      />
    </Container>
  );
};

export default ExamScreen;
