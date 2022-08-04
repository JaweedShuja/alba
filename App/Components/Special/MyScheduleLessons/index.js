import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {useDispatch} from 'react-redux';
import AppDataActions from '../../../Stores/AppData/Actions';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const MyScheduleLessons = ({courseTitles, courseTitlesLoading}) => {
  const dispatch = useDispatch();
  const temp = courseTitles;

  const [currentIndex, setCurrentIndex] = useState(0);

  const onPressTitles = (item, index) => {
    setCurrentIndex(index);
    dispatch(AppDataActions.getUserSchedule(item?._id));
    // console.log('itemmmmmmmmmmmmm', {item});
    // navigate(STUDENT_STACK, {screen: COURSES_VIDEOS_SCREEN, params: item});
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[
        styles.mainBTN,
        {
          backgroundColor:
            index == currentIndex ? Colors.lightBlue : Colors.white,
        },
      ]}
      activeOpacity={ACTIVE_OPACITY}
      onPress={onPressTitles.bind(null, item, index)}>
      <Text
        style={[
          styles.text,
          {color: index == currentIndex ? Colors.white : Colors.textColorLess},
        ]}>
        {item?.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={temp}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={styles.flatList}
        inverted={temp?.length > 1 ? false : I18nManager.isRTL ? true : false}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default MyScheduleLessons;

// {courseTitlesLoading ? (
//   <Text>alireza</Text>
// ) : (  )}
