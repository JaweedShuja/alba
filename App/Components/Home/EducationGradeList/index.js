import {navigate} from 'App/Services/NavigationService';
import AppDataActions from 'App/Stores/AppData/Actions';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import Strings from 'App/Values/Strings';
import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {store} from '../../../App';
import {getLightnessOfRGB} from '../../../utils/getLightnessOfRGB';
import styles from './style';
import {fontIconHandler} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import AsyncStorage from '@react-native-community/async-storage';
import Indicator from 'App/Components/Share/Indicator';
import {useDispatch, useSelector} from 'react-redux';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {STUDENTS_BOTTOMS_TABS, HOME_SCREEN} = Strings.Routes;

export const onItemPressedEducationGrade = (item) => {
  const gradeId = item?._id;
  store.dispatch(AppDataActions.getLessonsTeachers(gradeId));
  store.dispatch(AppDataActions.homeScreenType(false));
  store.dispatch(AppDataActions.setGradeTitleLesson(item?.title));
  store.dispatch(AppDataActions.setCurrentGradeId({gradeId}));
  AsyncStorage.setItem('homeListWatchType', 'student');

  navigate(STUDENTS_BOTTOMS_TABS, {screen: HOME_SCREEN});
};
const EducationGradeList = ({data2, navigation}) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(null);

  const loadingGetLessonsTeacherLoading = useSelector(
    (state) => state.appData.getLessonsTeacherLoading,
  );
  const onItemPressed = (item, index) => {
    const gradeId = item?._id;
    console.log({gradeId}, {item});
    dispatch(AppDataActions.getLessonsTeachers(gradeId));
    dispatch(AppDataActions.homeScreenType(false));
    dispatch(AppDataActions.setGradeTitleLesson(item?.title));
    dispatch(AppDataActions.setCurrentGradeId({gradeId}));
    AsyncStorage.setItem('homeListWatchType', 'student');
    setCurrentIndex(index);
    navigate(STUDENTS_BOTTOMS_TABS, {screen: HOME_SCREEN});
  };
  const Item = ({index, item}) => {
    console.log({data2});
    let loadingData;
    if (index === currentIndex) {
      loadingData = loadingGetLessonsTeacherLoading;
    }
    let title = item?.title;
    title = title?.replace(/ /g, `${'\n'}`);
    let color = Colors?.white;

    color = getLightnessOfRGB(item?.color);
    if (color !== 'light') {
      color = Colors?.white;
    } else {
      color = Colors?.text;
    }
    // if (loadingGetLessonsTeacherLoading) return <Indicator color={item?.color} />;
    return (
      <TouchableOpacity
        style={styles.mainBTN}
        disabled={loadingData}
        activeOpacity={ACTIVE_OPACITY}
        onPress={onItemPressed.bind(null, item, index)}>
        {loadingData ? (
          <Indicator color={item?.color} />
        ) : (
          <>
            <View style={styles.leftView}>
              <View style={[styles.titleView, {backgroundColor: item?.color}]}>
                <Text style={[styles.title, {color: color}]}>{title}</Text>
              </View>
              <View style={styles.descView}>
                <Text style={styles.text} numberOfLines={2}>
                  {item?.description}
                </Text>
              </View>
            </View>
            <View style={styles.rightView}>
              <FontIcon
                name={Strings.Icons.RIGHT_SMALL}
                size={normal * 2}
                color={Colors.text}
                style={fontIconHandler()}
              />
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <FlatList
      data={data2}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default EducationGradeList;
