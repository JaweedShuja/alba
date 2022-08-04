import React, {useState} from 'react';
import {ScrollView, Dimensions, KeyboardAvoidingView} from 'react-native';
import styles from './TeacherAddExamClassicStyle';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import NewQuestion from '../../Components/Special/NewQuestion';
import {Colors} from 'App/Theme';
import DatePickerModal from '../../Components/Modals/DatePickerModal';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import CompleteBtnAddExamClassic from '../../Components/Share/CompleteBtnAddExamClassic';
import AddNewQuestionClassic from '../../Components/Share/AddNewQuestionClassic';
import {uploadResponseHandler} from 'App/utils/uploadResponseHandler';
import {uploadFile} from 'App/utils/uploadFile';
import AppDataActions from 'App/Stores/AppData/Actions';
import {string} from 'App/i18n';
import {navigate} from 'App/Services/NavigationService';
import Strings from 'App/Values/Strings';

const {width} = Dimensions.get('screen');
const {TEACHER_ADD_EXAM_NOTE_SCREEN} = Strings.Routes;

const TeacherAddExamClassicScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const data = route?.params?.currentItem;
  const courseId = route?.params?.currentItem?._id;
  const type = route?.params?.examType;
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState({
    title: string.PLEASE_SET_START_DATE_EXAM,
    type: 'startDate',
  });
  const [question, setQuestion] = useState([
    {
      currentFile: null,
      color: Colors.lightBlue,
    },
    {
      add: true,
    },
  ]);
  const loading = useSelector((state) => state.teacherData.addExamLoading);

  //============STATES============================

  const addNewQuestion = (index) => {
    console.log({index});
    setCurrentQuestionNumber(index);
    let questions = [...question];
    for (var i = 0; i < questions.length; i++) {
      questions[i].color = Colors.white;
    }
    questions.splice(questions.length - 1, 0, {
      question: '',
      first: {
        text: '',
        check: true,
      },
      second: {
        text: '',
        check: false,
      },
      third: {
        text: '',
        check: false,
      },
      fourth: {
        text: '',
        check: false,
      },
      score: {
        text: 0,
      },
      color: Colors.lightBlue,
    });
    setQuestion(questions);
  };

  const removeQuestion = (index) => {
    console.log({index});
    const id = question[index]?.currentFile?._id;
    if (question[index]?.currentFile?._id)
      dispatch(AppDataActions.deleteFile(id));

    setQuestion(questions);
    setFileError(true);
    let questions = [...question];
    questions[index].currentFile = null;

    if (questions.length > 2) {
      if (index != 0) {
        questions.splice(index, 1);
        // setQuestion(questions);
        setCurrentQuestionNumber(index - 1);
        if (question[index].color == Colors.lightBlue) {
          questions[index - 1].color = Colors.lightBlue;
        }
        setQuestion(questions);
      } else {
        questions.splice(index, 1);
        // setQuestion(questions);
        setCurrentQuestionNumber(index);
        if (question[index].color == Colors.lightBlue) {
          questions[index].color = Colors.lightBlue;
        }
        setQuestion(questions);
      }
    } else {
      questions[index].color = Colors.lightBlue;
      setQuestion(questions);
    }
  };

  const selCurrentExam = (index) => {
    console.log(question[index]);
    setCurrentQuestionNumber(index);
    let questions = [...question];
    for (var i = 0; i < questions.length; i++) {
      questions[i].color = Colors.white;
    }
    questions[index].color = Colors.lightBlue;
    setQuestion(questions);
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
  const onPressCompleteAddExam = () => {
    setDatePickerModalVisible(true);
  };
  const onChangeDatePicker = (date) => {
    const newDate = moment(date).format('YYYY-MM-DD');
    if (typeModal.type == 'startDate') {
      setDateStart(date);
    } else {
      setDateEnd(date);
    }
  };
  const onCloseDatePicker = () => {
    if (typeModal.type === 'startDate') {
      setDatePickerModalVisible(false);
      const type = typeModal;
      type.type = 'endDate';
      type.title = string.PLEASE_SET_END_DATE_EXAM;
      setTypeModal(type);
      setTimeout(() => {
        setDatePickerModalVisible(true);
      }, 30);
    } else {
      setDatePickerModalVisible(false);
      const type = typeModal;
      type.type = 'startDate';
      type.title = string.PLEASE_SET_START_DATE_EXAM;
      setTypeModal(type);
      addExam();
    }
  };

  const addExam = () => {
    const item = Object.assign(
      {question},
      {dateStart},
      {dateEnd},
      {type},
      {courseId},
    );
    navigate(TEACHER_ADD_EXAM_NOTE_SCREEN, {data: item});
  };
  //============================METHODS================================
  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={data?.title} />
      <KeyboardAvoidingView
        style={{flexGrow: 1}}
        keyboardVerticalOffset={100}
        // contentContainerStyle={{...Metrics.paddingHorizontalMain}}
        enabled
        // behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          style={styles.scrollview}
          contentContainerStyle={{
            paddingBottom: width * 0.25,
          }}>
          <NewQuestion
            {...{question}}
            onSubmitAddNewQuestion={addNewQuestion}
            onSubmitCurrentQuestion={selCurrentExam}
            {...{uploading}}
            {...{removeQuestion}}
          />
          <AddNewQuestionClassic
            {...{upload}}
            {...{uploading}}
            currentFile={question[currentQuestionNumber]?.currentFile}
            // {...{currentFile}}
            {...{fileError}}
            {...{deleteHandler}}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <CompleteBtnAddExamClassic
        onSubmit={onPressCompleteAddExam}
        title={string.COMPLETE}
        {...{question}}
        {...{uploading}}
        {...{loading}}
        {...{currentQuestionNumber}}
      />
      <DatePickerModal
        title={typeModal.title}
        modalVisible={datePickerModalVisible}
        date={dateStart}
        mode="datetime"
        onDateChange={onChangeDatePicker}
        onClose={onCloseDatePicker}
      />
    </Container>
  );
};

export default TeacherAddExamClassicScreen;
