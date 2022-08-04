import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {navigate} from 'App/Services/NavigationService';
import {string} from 'App/i18n';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Indicator from 'App/Components/Share/Indicator';
import TextTickerComponent from 'App/Components/Share/TextTickerComponent';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {TEACHER_SEE_PASSED_ANSWER_SCREEN, TEACHER_STACK} = Strings.Routes;

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
const StudentPassedExams = ({data, loading}) => {
  const dispatch = useDispatch();

  const lData = useSelector((state) => state.appData.getUserExamLoading);
  const [tempData, setTempData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTempData(data);
  }, [data]);

  const onItemPressed = (item, index) => {
    setCurrentIndex(index);
    navigate(TEACHER_STACK, {
      screen: TEACHER_SEE_PASSED_ANSWER_SCREEN,
      params: item,
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(TeacherDataActions.getTeacherPassedExams());
    setRefreshing(false);
  };

  const renderItem = ({item, index}) => {
    let loadingData;
    if (index === currentIndex) {
      loadingData = lData;
    }

    let opacity = 1;
    let disabledButton = false;
    const startHour = moment(item?.startDate).format('HH:mm');
    const endHour = moment(item?.endDate).format('HH:mm');
    const typeOfExam = toTitleCase(item?.type);
    const lessonName = item?.course?.lesson?.title;
    const gradeTitle = item?.course?.grade?.title;
    const categoryTitle = item?.course?.grade?.category?.title;
    const isExamStart = moment().isAfter(item?.startDate);
    const dateExam = isExamStart
      ? moment(item?.endDate).format('YYYY-MMMM-DD-dddd')
      : moment(item?.startDate).format('YYYY-MMMM-DD-dddd');

    return (
      <View style={[styles.mainView, {opacity}]}>
        <View style={styles.viewTop}>
          <View style={styles.horView}>
            <View style={styles.startView}>
              <Text style={styles.title}>
                {gradeTitle} {string.OF} {categoryTitle}
              </Text>
            </View>
            <View style={styles.viewType}>
              <Text style={styles.textType}>{typeOfExam}</Text>
            </View>
          </View>
          <View style={styles.viewTextIcon}>
            <FontIcon
              name={Strings.Icons.EMAIL_OUTLINE}
              color={Colors.lightBlue}
              size={normal * 1.8}
            />
            <Text style={styles.text}>
              {lessonName} {string.EXAM}
            </Text>
            <View style={styles.textTickerContainer}>
              <TextTickerComponent
                text={
                  (isExamStart ? string.END : string.START) +
                  string.DATE +
                  dateExam
                }
              />
            </View>
          </View>
          <View style={styles.viewTextIcon}>
            <FontIcon
              name={Strings.Icons.CLOCK_CHECK}
              color={Colors.lightBlue}
              size={normal * 1.5}
            />
            <Text style={styles.text}>
              {string.STARTS_AT} {startHour}
            </Text>
            <FontIcon
              name={Strings.Icons.CLOCK_CLOSE}
              color={Colors.lightBlue}
              size={normal * 1.5}
            />
            <Text style={styles.text}>
              {string.ENDS_AT} {endHour}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          disabled={disabledButton || loadingData}
          onPress={onItemPressed.bind(null, item, index)}
          style={[
            styles.btn,
            {
              backgroundColor:
                disabledButton || loadingData
                  ? Colors.commonGray
                  : Colors.green,
            },
          ]}
          activeOpacity={ACTIVE_OPACITY}>
          {loadingData ? (
            <Indicator color={Colors.white} />
          ) : (
            <Text style={styles.textType}>{string.SEE_ANSWERS}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={tempData}
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
      refreshControl={
        <RefreshControl
          colors={[Colors.lightBlue, Colors.lightBlue]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default StudentPassedExams;
