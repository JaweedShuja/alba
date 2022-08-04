import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Modal from '../Modal';
import styles from './style';
import ChooseBtn from '../ChooseBtn';
import AppDataActions from '../../../Stores/AppData/Actions';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import DividerComponent from 'App/Components/Share/DividerComponent';

const GradeModal = ({modalVisible, onClose, screen}) => {
  const dispatch = useDispatch();
  const [choose, setChoose] = useState([]);

  const userType = useSelector((state) => state.appData.isTeacher);
  const data = useSelector((state) => state.appData.educationGrade);
  const categoryId = useSelector((state) => state.appData.currentCategoryId);
  const currentGradeId = useSelector((state) => state.appData.currentGradeId);
  let currentGradeTitle = '';
  console.log({currentGradeId});
  let Object = [];
  if (userType) {
    currentGradeTitle = useSelector((state) => state.appData.gradeTitle);
  } else {
    if (screen == 'courses') {
      currentGradeTitle = useSelector(
        (state) => state.appData.gradeTitleCourses,
      );
    } else {
      currentGradeTitle = useSelector(
        (state) => state.appData.gradeTitleLesson,
      );

      console.log({gradeTitle});
    }
  }
  useEffect(() => {
    console.log({currentGradeId});

    if (screen == 'courses') {
      data.forEach(function (item, index, array) {
        if (index === 0) {
          Object.push(true);
        } else Object.push(false);
      });
    } else {
      data.forEach(function (item, index, array) {
        if (data[index]?.title == currentGradeTitle) {
          Object.push(true);
        } else Object.push(false);
      });
    }

    setChoose(Object);
  }, [currentGradeTitle]);

  const onPressChooseItem = (index, id, title) => {
    Object.forEach(function (item, index, array) {
      Object[index] = false;
      setChoose(Object);
    });
    Object[index] = true;
    let gradeId = id;
    const object = Object.assign(categoryId, {gradeId});

    if (screen == 'courses') {
      gradeId = id;
    }
    //  else {
    // const categoryId = currentCategoryId;
    // gradeId = id;
    // }

    if (userType) {
      dispatch(TeacherDataActions.getTeacherScreen(object));
      dispatch(AppDataActions.setGradeTitle(title));
    } else {
      if (screen == 'courses') {
        dispatch(AppDataActions.coursesScreen({gradeId}));
        dispatch(AppDataActions.setGradeTitleCourses(title));
      } else {
        dispatch(AppDataActions.getLessonsTeachers(gradeId));
        dispatch(AppDataActions.setGradeTitleLesson(title));
      }
    }
  };

  const Item = ({index, item}) => {
    index > 0 && Object.push(false);
    return (
      <ChooseBtn
        title={item?.title}
        choose={choose[index]}
        submit={onPressChooseItem.bind(null, index, item?._id, item?.title)}
      />
    );
  };

  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <Modal visible={modalVisible} onCloseActionSheet={onClose}>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.FlatList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
        ItemSeparatorComponent={DividerComponent}
      />
    </Modal>
  );
};

export default GradeModal;
