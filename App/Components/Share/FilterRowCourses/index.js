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

const FilterRowCourses = ({screen}) => {
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
  const [IsCategoryModal, setIsCategoryModal] = useState(false);
  const [isVisibleGrade, setIsVisibleGrade] = useState(false);
  const [choose, setChoose] = useState({
    index: 0,
    id: 'All',
    title: string.ALL_CATEGORIES,
  });
  const [chooseGrade, setChooseGrade] = useState({
    index: 0,
    id: 'All',
    title: string.ALL_GRADE,
  });

  //============================STATES==========================

  //============================EFFECTS==========================
  useEffect(() => {
    if (categoriesData?.[0]?.title === string.ALL_CATEGORIES) {
      onPressChooseItem(
        0,
        categoriesData?.[0]?._id,
        categoriesData?.[0]?.title,
      );
      setIsCategoryModal(false);
    } else {
      categoriesData.unshift({
        index: 0,
        id: 'All',
        title: string.ALL_CATEGORIES,
      });
    }
  }, [categoriesData]);

  useEffect(() => {
    if (choose?.title !== string.ALL_CATEGORIES) {
      if (gradesData?.[0]?.title === string.ALL_GRADE) {
        onPressGrade(0, gradesData?.[0]?._id, gradesData?.[0]?.title);
        setIsCategoryModal(false);
      } else {
        console.log('stepTwo', gradesData?.length);
        gradesData.unshift({
          index: 0,
          id: 'All',
          title: string.ALL_GRADE,
        });
      }
    }
  }, [gradesData]);
  //============================EFFECTS==========================

  //============================METHODS==========================
  const onPressGrade = (index, gradeId, title) => {
    const selected = {
      index,
      id: gradeId,
      title,
    };

    setChooseGrade(selected);
    if (title === string.ALL_GRADE && choose?.title === string.ALL_CATEGORIES) {
      dispatch(
        AppDataActions.coursesScreen({categoryId: 'All', gradeId: 'All'}),
      );
    } else if (gradesData.length > 1 && title === string.ALL_GRADE) {
      dispatch(AppDataActions.coursesScreen({categoryId}));
    } else {
      dispatch(AppDataActions.coursesScreen({gradeId}));
      dispatch(AppDataActions.setCurrentGradeId({gradeId}));
    }
    setIsVisibleGrade(false);
  };

  const onPressChooseItem = (index, categoryId, title) => {
    const selected = {
      index,
      id: categoryId,
      title,
    };
    setChoose(selected);
    if (
      title === string.ALL_CATEGORIES &&
      chooseGrade?.title === string.ALL_GRADE
    ) {
      dispatch(AppDataActions.educationGrade({categoryId: 'All'}));
      dispatch(
        AppDataActions.coursesScreen({categoryId: 'All', gradeId: 'All'}),
      );
    } else {
      setChooseGrade({
        index: 0,
        id: 'All',
        title: string.ALL_GRADE,
      });
      dispatch(
        AppDataActions.coursesScreen({categoryId: 'All', gradeId: 'All'}),
      );
      dispatch(AppDataActions.educationGrade({categoryId}));
      dispatch(AppDataActions.setCurrentCategoryId(categoryId));
    }
    setIsCategoryModal(false);
  };

  const onCloseModalCategory = (category) => {
    if (category) {
      setIsCategoryModal(false);
      if (gradesData?.[0]?.title) {
        if (gradesData?.[0]?.title !== string.ALL_GRADE) {
          console.log('gradesDataIf*=>', gradesData);
          setIsVisibleGrade(true);
        } else {
          console.log('gradesDataElse*=>', gradesData);
          onPressGrade(0, gradesData?.[0]?._id, gradesData?.[0]?.title);
        }
      }
    } else {
      console.log('gradesDataLastElse*=>', gradesData);
      setIsCategoryModal(false);
      setIsVisibleGrade(false);
    }
  };

  const onPressItem = (index) => {
    if (index === 0) {
      setIsCategoryModal(true);
    } else {
      if (gradesData?.[0]?.title) {
        if (
          gradesData?.[0]?.title !== string.ALL_GRADE ||
          gradesData?.length > 1
        ) {
          setIsVisibleGrade(true);
        }
      }
    }
  };
  //============================METHODS==========================

  //===================================================GradeModal
  const renderItemGrade = ({item, index}) => (
    <ChooseBtn
      title={item?.title}
      choose={chooseGrade.index}
      submit={onPressGrade.bind(null, index, item?._id, item?.title)}
      {...{index}}
    />
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
  //===================================================GradeModal

  //================================================CategoryModal
  const renderItem = ({item, index}) => (
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
  //================================================CategoryModal

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

export default FilterRowCourses;

//index == 0 ? setIsCategoryModal(true) : setIsVisibleGrade(true);

// useEffect(() => {
//   if (choose?.title === string.ALL_CATEGORIES) {
//     setGData([{index: 0, id: 'All', title: string.ALL_GRADE}]);
//   } else {
//     setGData(gradesData);
//   }
// }, [choose]);

// useEffect(() => {
//   setChooseGrade({
//     index: 0,
//     id: gradesData[0]?._id,
//     title: gradesData[0]?.title,
//   });
// }, [isFocused]);

// useEffect(() => {
//   if (categoriesData.length) {
//     setChoose({
//       index: 0,
//       id: categoriesData[0]._id,
//       title: categoriesData[0].title,
//     });
//   }
// }, [isFocused]);

// import React, {useState, useEffect} from 'react';
// import {View, Text, TouchableOpacity, FlatList} from 'react-native';
// import styles from './style';
// import Strings from 'App/Values/Strings';
// import {useDummyData} from 'App/Values/DummyData';
// import FastImage from 'react-native-fast-image';
// import {Colors} from 'App/Theme';
// import {normal} from 'App/Theme/Metrics';
// import Modal from '../../Modals/Modal';
// import {useDispatch, useSelector} from 'react-redux';
// import AppDataActions from 'App/Stores/AppData/Actions';
// import ChooseBtn from '../../Modals/ChooseBtn';
// import {string} from 'App/i18n';
// import DividerComponent from 'App/Components/Share/DividerComponent';
// import {useIsFocused} from '@react-navigation/native';
// import FontIcon from 'App/Components/CustomIcon/FontIcon';
// import {fontIconHandlerX} from 'App/utils/layoutIconHandler';

// const {ACTIVE_OPACITY} = Strings.CONSTANTS;

// const FilterRowCourses = ({screen}) => {
//   const isFocused = useIsFocused();
//   const dispatch = useDispatch();
//   const DummyData = useDummyData();
//   const {COURSES_SCREEN_OBJECTS} = DummyData;
//   const filter = COURSES_SCREEN_OBJECTS.filter;
//   let Object = [];
//   let ObjectGrade = [];
//   //============================STATES==========================

//   const categoriesData = useSelector(
//     (state) => state.appData.getCategoriesData,
//   );
//   const gradesData = useSelector((state) => state.appData.educationGrade);
//   const categoryId = useSelector((state) => state.appData.currentCategoryId);
//   const currentGradeId = useSelector((state) => state.appData.currentGradeId);
//   const [IsCategoryModal, setIsCategoryModal] = useState(false);
//   const [isVisibleGrade, setIsVisibleGrade] = useState(false);
//   const [categoryTitle, setCategoryTitle] = useState();
//   const [gradeTitle, setGradeTitle] = useState();
//   const [choose, setChoose] = useState({
//     index: 0,
//     id: '',
//     title: string.SELECT,
//   });
//   const [chooseGrade, setChooseGrade] = useState({
//     index: 0,
//     id: '',
//     title: string.ALL_GRADE,
//   });
//   const [gradeId, setGradeId] = useState(gradesData[0]?._id);

//   //============================STATES==========================

//   //============================EFFECTS==========================

//   useEffect(() => {
//     if (gradesData?.[0]?.title === string.ALL_GRADE && gradesData?.length < 2) {
//       console.log('stepOne', gradesData?.length);
//       onPressGrade(0, gradesData?.[0]?._id, gradesData?.[0]?.title);
//       setIsCategoryModal(false);
//     }
//     // else {
//     //   console.log('stepTwo', gradesData?.length);
//     //   gradesData.unshift({
//     //     index: 0,
//     //     id: '',
//     //     title: string.ALL_GRADE,
//     //   });
//     // }
//   }, [gradesData]);

//   useEffect(() => {
//     setChooseGrade({
//       index: 0,
//       id: gradesData[0]?._id,
//       title: gradesData[0]?.title,
//     });
//   }, [isFocused]);

//   useEffect(() => {
//     if (categoriesData.length) {
//       setChoose({
//         index: 0,
//         id: categoriesData[0]._id,
//         title: categoriesData[0].title,
//       });
//     }
//   }, [isFocused]);

//   //============================METHODS==========================

//   //GradeModal
//   const onPressGrade = (index, gradeId, title) => {
//     const selected = {
//       index,
//       id: gradeId,
//       title,
//     };

//     setChooseGrade(selected);
//     setGradeId(gradeId);
//     // dispatch(AppDataActions.coursesScreen({gradeId}));
//     // dispatch(AppDataActions.setCurrentGradeId({gradeId}));
//     if (gradesData.length > 2 && title === string.ALL_GRADE) {
//       dispatch(AppDataActions.coursesScreen({categoryId}));
//       //dispatch(AppDataActions.setCurrentGradeId({gradeId: categoryId}));
//     } else {
//       dispatch(AppDataActions.coursesScreen({gradeId}));
//       dispatch(AppDataActions.setCurrentGradeId({gradeId}));
//     }

//     setGradeTitle(title);
//     setIsVisibleGrade(false);
//   };

//   const ItemGrade = ({index, item}) => {
//     return (
//       <ChooseBtn
//         title={item?.title}
//         choose={chooseGrade.index}
//         submit={onPressGrade.bind(null, index, item?._id, item?.title)}
//         {...{index}}
//       />
//     );
//   };
//   //============================METHODS==========================

//   const renderItemGrade = ({item, index}) => (
//     <ItemGrade index={index} item={item} />
//   );
//   const GradeModal = () => {
//     return (
//       <Modal visible={isVisibleGrade} onCloseActionSheet={onCloseModalCategory}>
//         <FlatList
//           data={gradesData}
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//           style={styles.FlatList}
//           renderItem={renderItemGrade}
//           keyExtractor={(item, index) => `${item.title}${index}`}
//           ItemSeparatorComponent={DividerComponent}
//         />
//       </Modal>
//     );
//   };
//   //GradeModal

//   //CategoryModal
//   const onPressChooseItem = (index, categoryId, title) => {
//     const selected = {
//       index,
//       id: categoryId,
//       title,
//     };
//     setChoose(selected);
//     setChooseGrade({
//       index: null,
//       id: null,
//       title: '',
//     });
//     dispatch(AppDataActions.educationGrade({categoryId}));
//     dispatch(AppDataActions.setCurrentCategoryId(categoryId));
//     setIsCategoryModal(false);
//   };

//   const Item = ({index, item}) => {
//     return (
//       <ChooseBtn
//         title={item?.title}
//         choose={choose.index}
//         submit={onPressChooseItem.bind(null, index, item?._id, item?.title)}
//         {...{index}}
//       />
//     );
//   };

//   const renderItem = ({item, index}) => <Item index={index} item={item} />;

//   const CategoryModal = () => {
//     return (
//       <Modal
//         visible={IsCategoryModal}
//         onCloseActionSheet={onCloseModalCategory.bind(null, true)}>
//         <FlatList
//           data={categoriesData}
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//           style={styles.FlatList}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => `${item.title}${index}`}
//           ItemSeparatorComponent={DividerComponent}
//         />
//       </Modal>
//     );
//   };
//   //CategoryModal

//   const onCloseModalCategory = (category) => {
//     if (category) {
//       setIsCategoryModal(false);
//       if (gradesData?.[0]?.title !== string.ALL_GRADE) {
//         setIsVisibleGrade(true);
//       } else {
//         onPressGrade(0, gradesData?.[0]?._id, gradesData?.[0]?.title);
//       }
//     } else {
//       setIsCategoryModal(false);
//       setIsVisibleGrade(false);
//     }
//   };
//   const onPressItem = (index) => {
//     //index == 0 ? setIsCategoryModal(true) : setIsVisibleGrade(true);
//     if (index === 0) {
//       setIsCategoryModal(true);
//     } else {
//       //chooseGrade?.title !== string.ALL_GRADE && setIsVisibleGrade(true);
//       //gradesData?.[0]?.title !== string.ALL_GRADE && setIsVisibleGrade(true);
//       setIsVisibleGrade(true);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {filter.map((item, index) => (
//         <TouchableOpacity
//           style={styles.btn}
//           activeOpacity={ACTIVE_OPACITY}
//           onPress={onPressItem.bind(null, index)}>
//           <FastImage source={item.image} style={styles.image} />
//           <Text style={styles.text}>
//             {index === 0 ? choose?.title : chooseGrade?.title}
//           </Text>
//           <FontIcon
//             name={item.icon}
//             color={Colors.text}
//             size={normal * 1.6}
//             style={fontIconHandlerX()}
//           />
//         </TouchableOpacity>
//       ))}
//       {CategoryModal()}
//       {GradeModal()}
//     </View>
//   );
// };

// export default FilterRowCourses;
