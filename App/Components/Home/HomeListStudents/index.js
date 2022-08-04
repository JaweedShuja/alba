import React, {useState, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import CustomSlider from 'App/Components/Home/Slider';
import {navigate} from 'App/Services/NavigationService';
import AppDataActions from 'App/Stores/AppData/Actions';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {onItemPressedEducationGrade} from '../../Home/EducationGradeList';
import styles from './style';
import Indicator from 'App/Components/Share/Indicator';
import EmptyView from 'App/Components/Share/EmptyView';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {EDUCATION_GRADE_SCREEN, STUDENT_STACK} = Strings.Routes;

const HomeListStudents = ({data2, onPress}) => {
  const dispatch = useDispatch();

  console.log('HomeScreen', data2);
  const slidersData = data2?.[1]?.sliders;
  const categories = data2?.[0]?.categories;

  const [sliderLoading, setSliderLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSliderLoading(false);
    }, 500);
  }, []);

  const onItemPressed = (item) => {
    if (onPress) {
      onPress();
    } else {
      const categoryId = item?._id;
      const title = item?.title;
      const grades = item?.grades;
      dispatch(AppDataActions.setCurrentCategoryId(categoryId));
      let firstGrade = '';
      let firstGradeAll = [];
      if (grades[0]) {
        firstGrade = grades[0]?.title;
        firstGradeAll = grades[0];
      }
      console.log('Grades=>', grades);
      if (firstGrade === 'All Grade') {
        let dataGrades = [];
        categories.forEach(function (item, index, array) {
          if (categories[index]?._id === categoryId) {
            dataGrades = categories[index]?.grades;
          }
        });
        dispatch(AppDataActions.educationGradeSuccess(dataGrades));
        onItemPressedEducationGrade(firstGradeAll);
      } else {
        navigate(STUDENT_STACK, {
          screen: EDUCATION_GRADE_SCREEN,
          params: {categoryId, title, grades},
        });
      }
    }
  };

  const ListHeader = () => {
    if (sliderLoading) {
      return (
        <View style={styles.sliderLoading}>
          <Indicator color={Colors.lightBlue} size={normal * 3} />
        </View>
      );
    }
    return <CustomSlider sliderData={slidersData} />;
  };

  const renderItem = ({item, index}) => {
    var title = item?.title;
    title = title?.replace(/ /g, `${'\n'}`);

    return (
      <TouchableOpacity
        style={[styles.mainBTN, {backgroundColor: item?.color}]}
        activeOpacity={ACTIVE_OPACITY}
        onPress={onItemPressed.bind(null, item)}>
        <View
          style={[styles.cover, {backgroundColor: 'rgba(255,255,255,0.5)'}]}>
          <Text style={styles.title}>{title}</Text>
        </View>

        <FastImage
          source={{
            uri: item?.image?.path,
          }}
          style={styles.image}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
    );
  };

  if (data2?.length === 0) {
    return <EmptyView />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={styles.wrapperStyle}
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.itemId}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={styles.FlatList}
        renderItem={renderItem}
        style={styles.flatList}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

export default HomeListStudents;

//  RefreshControl,

//const [refreshing, setRefreshing] = useState(false);

// const onRefresh = () => {
//   setRefreshing(true);
//   dispatch(AppDataActions.homeScreen());
//   setRefreshing(false);
// };

// refreshControl={
//   <RefreshControl
//     colors={[Colors.lightBlue, Colors.lightBlue]}
//     refreshing={refreshing}
//     onRefresh={onRefresh}
//   />
// }

// useEffect(() => {
//   AsyncStorage.setItem('homeListWatchType', 'student');
// }, []);

/* <FlatList
data={categories}
columnWrapperStyle={styles.row}
showsHorizontalScrollIndicator={false}
showsVerticalScrollIndicator={false}
numColumns={2}
horizontal={false}
contentContainerStyle={styles.FlatList}
renderItem={renderItem}
ListHeaderComponent={ListHeader}
keyExtractor={(item, index) => `${item.title}${index}`}
/> */

// <<<<<<< HEAD
//         columnWrapperStyle={{justifyContent: 'space-between'}}
//         showsVerticalScrollIndicator={false}
//         data={categories}
//         keyExtractor={(item) => item.itemId}
//         horizontal={false}
//         numColumns={2}
//         contentContainerStyle={styles.FlatList}
//         renderItem={renderItem}
//         style={styles.flatList}
//         ListHeaderComponent={ListHeader}
// =======

// <<<<<<< HEAD
//         data={categories}
//         columnWrapperStyle={styles.wrapperStyle}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         numColumns={2}
//         contentContainerStyle={styles.FlatList}
//         renderItem={renderItem}
//         ListHeaderComponent={ListHeader}
//         keyExtractor={(item) => item.itemId}
// =======
