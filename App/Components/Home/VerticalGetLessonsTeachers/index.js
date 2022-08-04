import React from 'react';
import {FlatList, View} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {navigate} from 'App/Services/NavigationService';
import {useSelector} from 'react-redux';
import HorizontalCategoryCoursesList from 'App/Components/Share/HorizontalCategoryCoursesList';
import EmptyView from '../../Share/EmptyView';

const {STUDENT_STACK, TEACHERS} = Strings.Routes;

const VerticalGetLessonsTeachers = () => {
  const data = useSelector((state) => state.appData.getLessonsTeachersData);
  const loading = useSelector(
    (state) => state.appData.getLessonsTeacherLoading,
  );
  console.log('VerticalGetLessonsTeachers', {data});
  if (data.length !== 0) console.log('homeScreen', data);
  const onSubmitTeacher = (id) => {
    console.log('itemId=>', id);
    navigate(STUDENT_STACK, {screen: TEACHERS, params: {id}});
  };

  const Item = ({index, item}) => {
    //var title = item.title;
    //title = title.replace(/ /g, `${'\n'}`);
    return (
      <HorizontalCategoryCoursesList
        onSubmitTeacher={onSubmitTeacher.bind(null, item?._id)}
        data={item?.teachers}
        title={item?.title}
        id={item?._id}
        showMore={true}
      />
    );
  };

  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  // if (data?.length === 0) {
  //   return <EmptyView />;
  // }

  return (
    <View style={{flex: 1}}>
      {data?.length === 0 ? (
        <EmptyView />
      ) : (
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.FlatList}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.title}${index}`}
        />
      )}
    </View>
  );
};

export default VerticalGetLessonsTeachers;

// const gradeId = item?._id;
// dispatch(AppDataActions.getLessonsTeachers(gradeId));
// dispatch(AppDataActions.homeScreenType(false));
// navigation.goBack();
