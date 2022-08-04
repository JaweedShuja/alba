import React, {useState} from 'react';
import {
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import styles from './TeacherAddExamStyle';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import NewQuestion from '../../Components/Special/NewQuestion';
import AddAnswers from '../../Components/Special/AddAnswers';
import {Colors} from 'App/Theme';
import CompleteBtnAddExam from '../../Components/Share/CompleteBtnAddExam';
import {showToast} from '../../utils/showToast';
import DatePickerModal from '../../Components/Modals/DatePickerModal';
import TeacherDataActions from '../../Stores/TeacherData/Actions';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {string} from 'App/i18n';
import {useDummyData} from 'App/Values/DummyData';
import Strings from 'App/Values/Strings';
import {navigate} from 'App/Services/NavigationService';
import {LVL_HEIGHT_PHONE} from '../../Theme/Metrics';

const {width, height} = Dimensions.get('screen');
const {TEACHER_ADD_EXAM_NOTE_SCREEN} = Strings.Routes;
const errorMessage = {
  sumError: string.THE_TOTAL_SCORE_IS_MORE_THAN_100,
};
const TeacherAddExamScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const DummyData = useDummyData();

  const {ADD_ANSWERS_OBJECTS} = DummyData;

  const data = route?.params?.currentItem;
  const courseId = route?.params?.currentItem?._id;
  const type = route?.params?.examType;
  console.log({data});
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState({
    title: string.PLEASE_SET_START_DATE_EXAM,
    type: 'startDate',
  });
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [newDateStart, setNewDateStart] = useState('');
  const [newDateEnd, setNewDateEnd] = useState('');
  const [question, setQuestion] = useState([
    {
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
    },
    {
      add: true,
    },
  ]);
  const loading = useSelector((state) => state.teacherData.addExamLoading);
  //=============================STATES===================================

  //============================METHODS================================
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

    let questions = [...question];
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

  const onChangeTextQuestion = (text) => {
    const questions = [...question];
    questions[currentQuestionNumber].question = text;
    setQuestion(questions);
    console.log(text);
  };
  const onChangeTextOptionA = (text) => {
    const questions = [...question];
    questions[currentQuestionNumber].first.text = text;
    setQuestion(questions);
  };
  const onChangeTextOptionB = (text) => {
    const questions = [...question];
    questions[currentQuestionNumber].second.text = text;
    setQuestion(questions);
  };
  const onChangeTextOptionC = (text) => {
    const questions = [...question];
    questions[currentQuestionNumber].third.text = text;
    setQuestion(questions);
  };
  const onChangeTextOptionD = (text) => {
    const questions = [...question];
    questions[currentQuestionNumber].fourth.text = text;
    setQuestion(questions);
  };
  const onChangeTextOptionScore = (text) => {
    const questions = [...question];
    if (text.length === 0) questions[currentQuestionNumber].score.text = 0;
    else
      questions[currentQuestionNumber].score.text = text.replace(/[^0-9]/g, '');
    setQuestion(questions);
  };
  const onPressOptionA = () => {
    const questions = [...question];
    questions[currentQuestionNumber].first.check = true;
    questions[currentQuestionNumber].second.check = false;
    questions[currentQuestionNumber].third.check = false;
    questions[currentQuestionNumber].fourth.check = false;
    setQuestion(questions);
  };
  const onPressOptionB = () => {
    const questions = [...question];
    questions[currentQuestionNumber].first.check = false;
    questions[currentQuestionNumber].second.check = true;
    questions[currentQuestionNumber].third.check = false;
    questions[currentQuestionNumber].fourth.check = false;
    setQuestion(questions);
  };
  const onPressOptionC = () => {
    const questions = [...question];
    questions[currentQuestionNumber].first.check = false;
    questions[currentQuestionNumber].second.check = false;
    questions[currentQuestionNumber].third.check = true;
    questions[currentQuestionNumber].fourth.check = false;
    setQuestion(questions);
  };
  const onPressOptionD = () => {
    const questions = [...question];
    questions[currentQuestionNumber].first.check = false;
    questions[currentQuestionNumber].second.check = false;
    questions[currentQuestionNumber].third.check = false;
    questions[currentQuestionNumber].fourth.check = true;
    setQuestion(questions);
  };

  const onPressCompleteAddExam = () => {
    let total = 0;
    console.log(question.length);
    for (var i = 0; i < question.length - 1; i++) {
      total += parseInt(question[i].score?.text);
      console.log({total});
    }
    if (total > 100) showToast('e', errorMessage.sumError);
    else {
      setDatePickerModalVisible(true);
    }
  };

  const onChangeDatePicker = (date) => {
    const newDate = moment(date).format('YYYY-MM-DD');
    if (typeModal.type == 'startDate') {
      setDateStart(date);
      setNewDateStart(newDate);
    } else {
      setDateEnd(date);
      setNewDateEnd(newDate);
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
  console.log({height});
  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={data?.title} />
      <View style={styles.top}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollview}
          contentContainerStyle={[
            LVL_HEIGHT_PHONE && {
              paddingBottom: width * 0.2,
            },
          ]}>
          {/* <Text>alireza</Text> */}
          <KeyboardAvoidingView
            style={styles.container}
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <NewQuestion
              {...{question}}
              onSubmitAddNewQuestion={addNewQuestion}
              onSubmitCurrentQuestion={selCurrentExam}
              {...{removeQuestion}}
            />

            <AddAnswers
              data={ADD_ANSWERS_OBJECTS}
              currentQuestion={question[currentQuestionNumber]}
              {...{onChangeTextQuestion}}
              {...{onChangeTextOptionA}}
              {...{onChangeTextOptionB}}
              {...{onChangeTextOptionC}}
              {...{onChangeTextOptionD}}
              {...{onChangeTextOptionScore}}
              {...{onPressOptionA}}
              {...{onPressOptionB}}
              {...{onPressOptionC}}
              {...{onPressOptionD}}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <CompleteBtnAddExam
          onSubmit={onPressCompleteAddExam}
          title={string.COMPLETE}
          {...{question}}
          {...{loading}}
        />
      </View>

      <DatePickerModal
        mode={'datetime'}
        title={typeModal.title}
        // is24hourSource
        modalVisible={datePickerModalVisible}
        date={dateStart}
        onDateChange={onChangeDatePicker}
        onClose={onCloseDatePicker}
      />
    </Container>
  );
};

export default TeacherAddExamScreen;
/*
 <KeyboardAvoidingView
        style={{flexGrow: 1}}
        keyboardVerticalOffset={100}
        // contentContainerStyle={{paddingBottom: 200}}
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
            {...{removeQuestion}}
          />

          <AddAnswers
            data={ADD_ANSWERS_OBJECTS}
            currentQuestion={question[currentQuestionNumber]}
            {...{onChangeTextQuestion}}
            {...{onChangeTextOptionA}}
            {...{onChangeTextOptionB}}
            {...{onChangeTextOptionC}}
            {...{onChangeTextOptionD}}
            {...{onChangeTextOptionScore}}
            {...{onPressOptionA}}
            {...{onPressOptionB}}
            {...{onPressOptionC}}
            {...{onPressOptionD}}
          />
        </ScrollView>
      </KeyboardAvoidingView>

 */
