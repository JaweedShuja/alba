import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {useDummyData} from 'App/Values/DummyData';
import FastImage from 'react-native-fast-image';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import GradeEducationModal from '../../Modals/GradeEducationModal';
import {useSelector} from 'react-redux';
import GradeModal from '../../Modals/GradeModal';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

let categoryTitle;
let gradeTitle;

const FilterRow = ({screen}) => {
  const DummyData = useDummyData();

  const {COURSES_SCREEN_OBJECTS} = DummyData;
  const filter = COURSES_SCREEN_OBJECTS.filter;

  const [isVisibleGradeEducation, setIsVisibleGradeEducation] = useState(false);
  const [isVisibleGrade, setIsVisibleGrade] = useState(false);

  const userType = useSelector((state) => state.appData.isTeacher);
  if (userType) {
    categoryTitle = useSelector((state) => state.appData?.categoryTitle);
    gradeTitle = useSelector((state) => state.appData?.gradeTitle);
  } else {
    if (screen == 'courses') {
      categoryTitle = useSelector(
        (state) => state.appData?.categoryTitleCourses,
      );
      gradeTitle = useSelector((state) => state.appData?.gradeTitleCourses);
    } else {
      categoryTitle = useSelector(
        (state) => state.appData?.categoryTitleLesson,
      );
      gradeTitle = useSelector((state) => state.appData?.gradeTitleLesson);
      console.log({gradeTitle});
    }
  }

  const onPressItem = (index) => {
    index == 0 ? setIsVisibleGradeEducation(true) : setIsVisibleGrade(true);
  };

  const closeModal = () => {
    setIsVisibleGrade(false);
  };

  const closeModalGradeEducation = () => {
    setIsVisibleGradeEducation(false);
    if (userType === false) setIsVisibleGrade(true);
  };

  return (
    <View style={styles.container}>
      {filter.map((item, index) => (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={ACTIVE_OPACITY}
          onPress={onPressItem.bind(null, index)}>
          <FastImage source={item.image} style={styles.image} />
          <Text style={styles.text}>
            {index === 0 ? categoryTitle : gradeTitle}
          </Text>
          <FontIcon name={item.icon} color={Colors.text} size={normal * 1.6} />
        </TouchableOpacity>
      ))}
      <GradeEducationModal
        modalVisible={isVisibleGradeEducation}
        onClose={closeModalGradeEducation}
        screen={screen}
      />
      <GradeModal
        modalVisible={isVisibleGrade}
        onClose={closeModal}
        screen={screen}
      />
    </View>
  );
};

export default FilterRow;
