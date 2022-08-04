import React, {useEffect, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import styles from './style';
import PdfCard from 'App/Components/Share/PdfCard';
import ImageCard from 'App/Components/Share/ImageCard';
import EmptyView from 'App/Components/Share/EmptyView';
import {useDispatch} from 'react-redux';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import {Colors} from 'App/Theme';
import NotePdfCard from 'App/Components/Share/NotePdfCard';

const TeacherLessonNotes = ({data, courseId}) => {
  const dispatch = useDispatch();

  const [tempData, setTempData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTempData(data);
  }, [data]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(TeacherDataActions.getTeacherNotes(courseId));
    setRefreshing(false);
  };

  const renderItem = ({item}) => (
    <View style={styles.mainView}>
      {item?.noteType === 'PDF' ? (
        <PdfCard data={item} note={true} />
      ) : (
        <ImageCard data={item} />
      )}
    </View>
  );

  return (
    <FlatList
      data={tempData}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyboardShouldPersistTaps="always"
      keyExtractor={(item, index) => `${item.title}${index}`}
      ListEmptyComponent={EmptyView}
      refreshControl={
        <RefreshControl
          colors={[Colors.lightBlue, Colors.lightBlue]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default TeacherLessonNotes;

// const onPressedAddNote = () => {
//   navigate(TEACHER_STACK, {
//     screen: TEACHER_ADD_NOTES_SCREEN,
//     params: {...{courseId}},
//   });
// };
