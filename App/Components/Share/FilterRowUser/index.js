import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {useDummyData} from 'App/Values/DummyData';
import FastImage from 'react-native-fast-image';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import Modal from '../../Modals/Modal';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from 'App/Stores/AppData/Actions';
import ChooseBtn from '../../Modals/ChooseBtn';
import {string} from 'App/i18n';
import DividerComponent from 'App/Components/Share/DividerComponent';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {fontIconHandlerX} from 'App/utils/layoutIconHandler';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const FilterRowUser = ({screen}) => {
  const dispatch = useDispatch();
  const DummyData = useDummyData();

  const {COURSES_SCREEN_OBJECTS} = DummyData;
  const filter = COURSES_SCREEN_OBJECTS.filter;

  //============================STATES==================================
  const categoriesData = useSelector(
    (state) => state.appData.getCategoriesDataStHome,
  );
  const gradesData = useSelector((state) => state.appData.educationGradeStHome);
  const [IsCategoryModal, setIsCategoryModal] = useState(false);
  const [isVisibleGrade, setIsVisibleGrade] = useState(false);
  const [choose, setChoose] = useState({
    index: 0,
    id: '',
    title: string.SELECT,
  });
  const [chooseGrade, setChooseGrade] = useState({
    index: 0,
    id: '',
    title: string.ALL_GRADE,
  });
  //============================STATES==================================

  //============================EFFECTS=================================
  useFocusEffect(
    React.useCallback(() => {
      if (categoriesData?.length > 0) {
        setChoose({
          index: 0,
          id: categoriesData?.[0]?._id,
          title: categoriesData?.[0]?.title,
        });
      }
      if (categoriesData?.length > 0) {
        const catId = categoriesData?.[0]?._id;
        dispatch(AppDataActions.educationGradeStHome({categoryId: catId}));
      }
    }, []),
  );

  useEffect(() => {
    if (gradesData?.[0]?.title === string.ALL_GRADE) {
      onPressGrade(0, gradesData?.[0]?._id, gradesData?.[0]?.title);
      setIsCategoryModal(false);
    }
    if (gradesData?.length > 0) {
      setChooseGrade({
        index: 0,
        id: gradesData?.[0]?._id,
        title: gradesData?.[0]?.title,
      });
    }
    if (gradesData?.length > 0) {
      const gId = gradesData?.[0]?._id;
      dispatch(AppDataActions.getLessonsTeachers(gId));
    }
  }, [gradesData]);
  //============================EFFECTS=================================

  //============================METHODS=================================
  const filterOnPressHandler = (index) => {
    if (index === 0) {
      setIsCategoryModal(true);
    } else {
      if (
        gradesData?.[0]?.title !== string.ALL_GRADE ||
        gradesData?.length > 1
      ) {
        setIsVisibleGrade(true);
      }
    }
  };

  const onPressGrade = (index, gradeId, title) => {
    const selected = {
      index,
      id: gradeId,
      title,
    };
    setChooseGrade(selected);
    dispatch(AppDataActions.getLessonsTeachers(gradeId));
    setIsVisibleGrade(false);
  };

  const onPressChooseItem = (index, categoryId, title) => {
    console.log('categoryId-->', categoryId);
    const selected = {
      index,
      id: categoryId,
      title,
    };
    setChoose(selected);
    setIsCategoryModal(false);
    dispatch(AppDataActions.educationGradeStHome({categoryId}));
  };

  const onCloseModal = (category) => {
    if (category) {
      setIsCategoryModal(false);
      if (gradesData?.length > 1) {
        setIsVisibleGrade(true);
      }
    } else {
      setIsCategoryModal(false);
      setIsVisibleGrade(false);
    }
  };
  //============================METHODS==============================

  //============================GRADE MODAL==========================
  const renderItemGradeModal = ({item, index}) => (
    <ChooseBtn
      title={item?.title}
      choose={chooseGrade.index}
      submit={onPressGrade.bind(null, index, item?._id, item?.title)}
      {...{index}}
    />
  );

  const GradeModal = () => {
    return (
      <Modal visible={isVisibleGrade} onCloseActionSheet={onCloseModal}>
        <FlatList
          data={gradesData}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.FlatList}
          renderItem={renderItemGradeModal}
          keyExtractor={(item, index) => `${item.title}${index}`}
          ItemSeparatorComponent={DividerComponent}
        />
      </Modal>
    );
  };
  //============================GRADE MODAL=============================

  //============================CATEGORY MODAL==========================
  const renderItemCategoryModal = ({item, index}) => (
    <ChooseBtn
      title={item?.title}
      choose={choose.index}
      submit={onPressChooseItem.bind(null, index, item?._id, item?.title)}
      {...{index}}
    />
  );

  const CategoryModal = () => {
    return (
      <Modal
        visible={IsCategoryModal}
        onCloseActionSheet={onCloseModal.bind(null, true)}>
        <FlatList
          data={categoriesData}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.FlatList}
          renderItem={renderItemCategoryModal}
          keyExtractor={(item, index) => `${item.title}${index}`}
          ItemSeparatorComponent={DividerComponent}
        />
      </Modal>
    );
  };
  //============================CATEGORY MODAL==========================

  //============================RENDER==================================
  return (
    <View style={styles.container}>
      {filter.map((item, index) => (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={ACTIVE_OPACITY}
          onPress={filterOnPressHandler.bind(null, index)}>
          <FastImage source={item.image} style={styles.image} />
          <Text style={styles.text}>
            {index === 0 ? choose?.title : chooseGrade?.title}
          </Text>
          <FontIcon
            name={item.icon}
            color={Colors.text}
            size={normal * 1.6}
            style={fontIconHandlerX()}
          />
        </TouchableOpacity>
      ))}
      {CategoryModal()}
      {GradeModal()}
    </View>
  );
};

export default FilterRowUser;

// useEffect(() => {
//   categoriesData.forEach(function (item, index, array) {
//     if (categoriesData[index]?._id == categoryId) {
//       setChoose({
//         index: index,
//         id: categoryId,
//         title: categoriesData[index]?.title,
//       });
//       // setCategoryTitle(categoriesData[index]?.title);
//       console.log('kkkkkkkkkkkkkkkkkk');
//     }
//   });
//   // gradesData.forEach(function (item, index, array) {
//   //   if (gradesData[index]?._id === currentGradeId?.gradeId) {
//   //     setChooseGrade({
//   //       index: index,
//   //       id: currentGradeId?.gradeId,
//   //       title: gradesData[index]?.title,
//   //     });
//   //   }
//   // });
// }, [categoryId, currentGradeId]);
