import React from 'react';
import {FlatList} from 'react-native';
import styles from './style';
import Loading from 'App/Components/Share/Loading';
import HorizontalListCourses from '../../../Components/Share/HorizontalListCourses';

const VerticalCourses = ({data, loading, type}) => {
  console.log({data});

  const renderItem = ({item}) => {
    const title = item?.title;
    return (
      <HorizontalListCourses data={item?.courses} {...{title}} {...{type}} />
    );
  };

  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default VerticalCourses;
