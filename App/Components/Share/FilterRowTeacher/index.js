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
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import ChooseBtn from '../../Modals/ChooseBtn';
import {useIsFocused} from '@react-navigation/native';
import {string} from 'App/i18n';
import DividerComponent from 'App/Components/Share/DividerComponent';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {fontIconHandlerX} from 'App/utils/layoutIconHandler';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const FilterRowTeacher = ({screen, refresh = true}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const DummyData = useDummyData();

  const {COURSES_SCREEN_OBJECTS} = DummyData;

  const filter = COURSES_SCREEN_OBJECTS.filter;
  const categoriesData = useSelector(
    (state) => state.appData.getCategoriesData,
  );
  const gradesData = useSelector((state) => state.appData.educationGrade);

  const [IsCategoryModal, setIsCategoryModal] = useState(false);
  const [isVisibleGrade, setIsVisibleGrade] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState(categoriesData[0]?.title);
  const [gradeTitle, setGradeTitle] = useState('All Grade');
  const [choose, setChoose] = useState({
    index: 0,
    id: categoriesData[0]?._id,
    title: categoriesData[0]?.title,
  });
  const [chooseGrade, setChooseGrade] = useState({
    index: null,
    id: '',
    title: string.ALL_GRADE,
  });
  const categoryId = useSelector((state) => state.appData.currentCategoryId);
  const currentGradeId = useSelector((state) => state.appData.currentGradeId);
  console.log({categoryId});
  let Object = [];
  let ObjectGrade = [];

  useEffect(() => {
    if (refresh)
      categoriesData.forEach(function (item, index, array) {
        setChoose({
          index: 0,
          id: categoriesData[0]?._id,
          title: categoriesData[0]?.title,
        });
      });
  }, [isFocused]);

  // useEffect(() => {
  //   console.log()
  //   if (refresh)
  //     gradesData.forEach(function (item, index, array) {
  //       setChooseGrade({
  //         index: null,
  //         id: '',
  //         title: string.ALL_GRADE,
  //       });
  //     });
  // }, [isFocused]);

  useEffect(() => {
    console.log('gradesData*=>', gradesData);
    if (gradesData.length > 0) {
      setChooseGrade({
        index: 0,
        id: gradesData[0]?._id,
        title: gradesData[0]?.title,
      });
    }
  }, [gradesData]);

  const onPressItem = (index) => {
    index == 0 ? setIsCategoryModal(true) : setIsVisibleGrade(true);
  };

  //GradeModal
  const onPressGrade = (index, gradeId, title) => {
    const selected = {
      index,
      id: gradeId,
      title,
    };

    setChooseGrade(selected);

    console.log('mine', gradeId, categoryId);
    const object = Object.assign({categoryId}, {gradeId});
    dispatch(TeacherDataActions.getTeacherScreen(object));
    dispatch(AppDataActions.setCurrentGradeId({gradeId}));
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
  const Item = ({index, item}) => {
    // index > 0 && Object.push(false);
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

  const onPressChooseItem = (index, categoryId, title) => {
    const selected = {
      index,
      id: categoryId,
      title,
    };
    setChoose(selected);
    const selectedGrade = {
      index: null,
      id: null,
      title: string.ALL_GRADE,
    };
    setChooseGrade(selectedGrade);
    dispatch(TeacherDataActions.getTeacherScreen({categoryId}));
    dispatch(AppDataActions.educationGrade({categoryId}));
    dispatch(AppDataActions.setCurrentCategoryId(categoryId));
    dispatch(AppDataActions.setCurrentGradeId(''));
    setCategoryTitle(title);
    setGradeTitle(string.ALL_GRADE);
    setIsCategoryModal(false);
  };

  const onCloseModalCategory = () => {
    setIsCategoryModal(false);
    setIsVisibleGrade(false);
  };

  const CategoryModal = () => {
    return (
      <Modal
        visible={IsCategoryModal}
        onCloseActionSheet={onCloseModalCategory}>
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

export default FilterRowTeacher;

// useEffect(() => {
//   categoriesData.forEach(function (item, index, array) {
//     if (categoriesData[index]?._id == categoryId)
//       setChoose({
//         index: index,
//         id: categoriesData[index]?._id,
//         title: categoriesData[index]?.title,
//       });
//   });
// }, []);
// useEffect(() => {
//   gradesData.forEach(function (item, index, array) {
//     if (gradesData[index]?._id == currentGradeId?.gradeId)
//       setChooseGrade({
//         index: index,
//         id: gradesData[index]?._id,
//         title: gradesData[index]?.title,
//       });
//   });
// }, []);
