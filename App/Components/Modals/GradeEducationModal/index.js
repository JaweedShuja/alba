import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from '../Modal';
import styles from './style';
import ChooseBtn from '../ChooseBtn';
import AppDataActions from 'App/Stores/AppData/Actions';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import {string} from 'App/i18n';
import DividerComponent from 'App/Components/Share/DividerComponent';

const GradeEducationModal = ({modalVisible, onClose, screen}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.appData.getCategoriesData);
  const userType = useSelector((state) => state.appData.isTeacher);
  const list = useSelector((state) => state.appData.educationGrade);
  const currentCat = useSelector((state) => state.appData.currentCategoryId);
  const [choose, setChoose] = useState([]);

  let Object = [];
  // console.log({data});
  console.log({screen});
  useEffect(() => {
    if (screen == 'courses') {
      data.forEach(function (item, index, array) {
        if (index === 0) {
          Object.push(true);
        } else Object.push(false);
      });
    } else {
      data.forEach(function (item, index, array) {
        if (data[index]?._id == currentCat?.categoryId) {
          Object.push(true);
        } else Object.push(false);
      });
    }

    setChoose(Object);
  }, []);

  const onPressChooseItem = (index, _id, title) => {
    Object.forEach(function (item, index, array) {
      Object[index] = false;
      setChoose(Object);
    });
    Object[index] = true;
    const categoryId = _id;
    if (userType) {
      dispatch(TeacherDataActions.getTeacherScreen({categoryId}));
      dispatch(AppDataActions.educationGrade({categoryId}));
      dispatch(AppDataActions.setCategoryTitle(title));
      dispatch(AppDataActions.setGradeTitle(string.ALL_GRADE));
    } else {
      if (screen == 'courses') {
        dispatch(AppDataActions.setCategoryTitleCourses(title));
        dispatch(AppDataActions.setGradeTitleCourses(string.ALL_GRADE));
        dispatch(AppDataActions.educationGrade({categoryId}));
      } else {
        dispatch(AppDataActions.educationGrade({categoryId}));
        dispatch(AppDataActions.setCategoryTitleLesson(title));
        // dispatch(AppDataActions.getLessonsTeachers());
        dispatch(AppDataActions.setGradeTitleLesson(''));
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

export default GradeEducationModal;
