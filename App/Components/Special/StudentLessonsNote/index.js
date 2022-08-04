import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import PdfCard from 'App/Components/Share/PdfCard';
import ImageCard from 'App/Components/Share/ImageCard';

const StudentLessonsNote = ({data}) => {
  console.log('inputData=>', data);

  const renderItem = ({item, index}) => {
    console.log('parent', {item});
    // if (item?.lesson)
    return (
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{item?.title}</Text>
        </View>
        <FlatList
          data={item?.courses}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.FlatList}
          renderItem={renderItem2}
          keyExtractor={(item, index) => `${item.title}${index}`}
        />
      </View>
    );
  };

  const renderItem1 = ({item, index}) => {
    console.log('itemmmmmmmmmmmmmmm', item);

    return (
      <View style={styles.mainView}>
        {item?.noteType === 'PDF' ? (
          <PdfCard data={item} note />
        ) : (
          <ImageCard data={item} />
        )}
      </View>
    );
  };

  const renderItem2 = ({item, index}) => {
    console.log('parent222222', {item});
    // if (item?.lesson)
    return (
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={[styles.titleNotes]}>{item?.title}</Text>
        </View>
        <FlatList
          data={item?.notes}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.FlatList}
          renderItem={renderItem1}
          keyExtractor={(item, index) => `${item.title}${index}`}
        />
      </View>
    );
  };

  console.log({data});
  // if (loading) return <Loading />;

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

export default StudentLessonsNote;
