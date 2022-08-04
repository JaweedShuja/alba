import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './TeacherLessonNotesStyle';
import Container from 'App/Components/Container';
import Header from 'App/Components/Share/Header';
import TeacherLessonNotes from 'App/Components/Special/TeacherLessonNotes';
import Strings from 'App/Values/Strings';
import Loading from 'App/Components/Share/Loading';
import {useDispatch, useSelector} from 'react-redux';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import {useIsFocused} from '@react-navigation/native';
import {string} from 'App/i18n';
import EmptyView from 'App/Components/Share/EmptyView';
import {navigate} from 'App/Services/NavigationService';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import StudentExamsPlaceHolder from 'App/Components/Share/StudentExamsPlaceHolder';
import {useFocusEffect} from '@react-navigation/native';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {TEACHER_ADD_NOTES_SCREEN, TEACHER_STACK} = Strings.Routes;

const TeacherLessonNotesScreen = ({navigation, route: {params}}) => {
  const dispatch = useDispatch();
  const courseId = params?.ID;

  //============================STATES==========================
  const loading = useSelector(
    (state) => state.teacherData.getTeacherNotesLoading,
  );
  const teacherNotes = useSelector(
    (state) => state?.teacherData.teacherNotesData,
  );

  //============================EFFECTS==========================
  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(TeacherDataActions.getTeacherNotes(courseId));
  //   }, []),
  // );
  useEffect(() => {
    dispatch(TeacherDataActions.getTeacherNotes(courseId));
  }, []);

  console.log('noteeeeeeeeeeee', {loading});

  const onPressedAddNote = () => {
    navigate(TEACHER_STACK, {
      screen: TEACHER_ADD_NOTES_SCREEN,
      params: {...{courseId}},
    });
  };

  return (
    <Container {...{navigation}}>
      <Header {...{navigation}} title={string.LESSON} />
      {loading ? (
        <StudentExamsPlaceHolder />
      ) : teacherNotes?.notes?.length === 0 ? (
        <EmptyView />
      ) : (
        <TeacherLessonNotes data={teacherNotes?.notes} {...{courseId}} />
      )}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPressedAddNote}
          style={styles.btn}
          activeOpacity={ACTIVE_OPACITY}>
          <FontIcon
            name={Strings.Icons.PLUS}
            size={normal * 2}
            color={Colors.white}
          />
          <Text style={styles.textBtn}>{string.ADD_NOTE}</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default TeacherLessonNotesScreen;

//import DummyData from 'App/Values/DummyData';

//const {ADD_NOTE_SCREEN_OBJECTS} = DummyData.Data;
