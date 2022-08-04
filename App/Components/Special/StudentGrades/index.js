import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {navigate} from 'App/Services/NavigationService';
import {string} from 'App/i18n';
import AppDataActions from 'App/Stores/AppData/Actions';
import {useDispatch} from 'react-redux';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {STUDENT_STACK, CATEGORY_COURSES_SCREEN} = Strings.Routes;

const StudentGrades = ({data}) => {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [tempData, setTempData] = useState();

  useEffect(() => {
    setTempData(data);
  }, [data]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(AppDataActions.getAllUserExamsScore());
    setRefreshing(false);
  };

  const onItemPressed = (item) => {
    navigate(STUDENT_STACK, {screen: CATEGORY_COURSES_SCREEN, params: item});
  };
  const Item = ({index, item}) => {
    const teacher = item?.teacher?.firstName + ', ' + item?.course?.title;
    const title =
      item?.course?.grade?.title +
      ' Of ' +
      item?.course?.grade?.category?.title;
    const isAbsent = item?.isAbsent;
    return (
      <View style={styles.mainBTN} activeOpacity={ACTIVE_OPACITY}>
        <View style={styles.viewTexts}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
            {/* {title} */}
            {/* {item?.title} */}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {teacher}
            {/* {item?.teacher}, {item?.lesson} */}
          </Text>
        </View>

        <View style={styles.viewGrade}>
          {!isAbsent && (
            <Text
              style={[
                styles.textGrade,
                {color: item?.score < 50 ? Colors.red : Colors.green},
              ]}>
              {string.YOUR_GRADE}
            </Text>
          )}

          <Text
            style={[
              styles.textGradeNumber,
              {
                color: item?.score < 50 ? Colors.red : Colors.green,
                marginTop: isAbsent ? 0 : normal * 1.5,
              },
            ]}>
            {isAbsent ? 'Absent' : item?.score}
          </Text>
        </View>
      </View>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <FlatList
      data={tempData}
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

export default StudentGrades;
