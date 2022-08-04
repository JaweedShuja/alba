import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
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

const FilterRowLessons = ({screen}) => {
  const dispatch = useDispatch();
  const DummyData = useDummyData();

  const {COURSES_SCREEN_OBJECTS} = DummyData;
  const filter = COURSES_SCREEN_OBJECTS.filter;
  //============================STATES==========================
  const categoriesData = useSelector(
    (state) => state.appData.getCategoriesData,
  );
  const gradesData = useSelector((state) => state.appData.educationGrade);
  const categoryId = useSelector((state) => state.appData.currentCategoryId);
  const currentGradeId = useSelector((state) => state.appData.currentGradeId);
  const [IsCategoryModal, setIsCategoryModal] = useState(false);
  const [isVisibleGrade, setIsVisibleGrade] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState();
  const [gradeTitle, setGradeTitle] = useState();
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
  const [gradeId, setGradeId] = useState(gradesData[0]?._id);
  //============================STATES==========================

  //============================EFFECTS==========================

  useEffect(() => {
    if (gradesData?.[0]?.title === string.ALL_GRADE) {
      onPressGrade(0, gradesData?.[0]?._id, gradesData?.[0]?.title);
      setIsCategoryModal(false);
    }
  }, [gradesData]);

  useEffect(() => {
    console.log('eee', categoriesData);
    if (categoriesData.length) {
      setChoose({
        index: 0,
        id: categoriesData[0]._id,
        title: categoriesData[0].title,
      });
      setChooseGrade({
        index: 0,
        id: categoriesData[0]?.grades[0]?._id
          ? categoriesData[0]?.grades[0]?._id
          : '',
        title: categoriesData[0]?.grades[0]?.title
          ? categoriesData[0]?.grades[0]?.title
          : '',
      });
    }
  }, []);

  //============================METHODS==========================

  //GradeModal
  const onPressGrade = (index, gradeId, title) => {
    const selected = {
      index,
      id: gradeId,
      title,
    };

    setChooseGrade(selected);
    setGradeId(gradeId);
    dispatch(AppDataActions.setCurrentGradeId({gradeId}));
    dispatch(AppDataActions.getLessonsTeachers(gradeId));
    setGradeTitle(title);
    setIsVisibleGrade(false);
  };

  const ItemGrade = ({index, item}) => {
    return (
      <ChooseBtn
        title={item?.title}
        choose={chooseGrade.index}
        submit={onPressGrade.bind(null, index, item?._id, item?.title)}
        {...{index}}
      />
    );
  };
  //============================METHODS==========================

  const renderItemGrade = ({item, index}) => (
    <ItemGrade index={index} item={item} />
  );
  const GradeModal = () => {
    return (
      <Modal visible={isVisibleGrade} onCloseActionSheet={onCloseModalCategory}>
        <FlatList
          data={gradesData}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.FlatList}
          renderItem={renderItemGrade}
          keyExtractor={(item, index) => `${item.title}${index}`}
          ItemSeparatorComponent={DividerComponent}
        />
      </Modal>
    );
  };
  //GradeModal

  //CategoryModal
  const onPressChooseItem = (index, categoryId, title) => {
    const selected = {
      index,
      id: categoryId,
      title,
    };
    setChoose(selected);
    setChooseGrade({
      index: null,
      id: null,
      title: '',
    });
    dispatch(AppDataActions.educationGrade({categoryId}));
    dispatch(AppDataActions.setCurrentCategoryId(categoryId));
    setIsCategoryModal(false);
  };

  const Item = ({index, item}) => {
    return (
      <ChooseBtn
        title={item?.title}
        choose={choose.index}
        submit={onPressChooseItem.bind(null, index, item?._id, item?.title)}
        {...{index}}
      />
    );
  };

  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  const CategoryModal = () => {
    return (
      <Modal
        visible={IsCategoryModal}
        onCloseActionSheet={onCloseModalCategory.bind(null, true)}>
        <FlatList
          data={categoriesData}
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
  //CategoryModal

  const onCloseModalCategory = (category) => {
    //console.log('category=>', gradesData?.[0]?.title);
    if (category) {
      setIsCategoryModal(false);
      if (gradesData?.[0]?.title !== string.ALL_GRADE) {
        setIsVisibleGrade(true);
      } else {
        onPressGrade(0, gradesData?.[0]?._id, gradesData?.[0]?.title);
      }
    } else {
      setIsCategoryModal(false);
      setIsVisibleGrade(false);
    }
  };
  const onPressItem = (index) => {
    //index == 0 ? setIsCategoryModal(true) : setIsVisibleGrade(true);
    if (index === 0) {
      setIsCategoryModal(true);
    } else {
      //chooseGrade?.title !== string.ALL_GRADE && setIsVisibleGrade(true);
      gradesData?.[0]?.title !== string.ALL_GRADE && setIsVisibleGrade(true);
    }
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

export default FilterRowLessons;

// useEffect(() => {
//   console.log('eee',gradesData)
//   setTimeout(() => {
//     setChooseGrade({
//       index: 0,
//       id: gradesData[0]?._id,
//       title: gradesData[0]?.title,
//     });
//   }, 5000);
// }, []);
