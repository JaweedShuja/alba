import React from 'react';
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

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const HorizontalExamNumberList = ({
  data,
  currentQuestionNumber,
  selCurrentExam,
  uploading,
}) => {
  console.log('dataaaaaaaaaaaaaaaaaaaaa', {data});
  const onItemPressed = (item) => {
    // navigate(STUDENT_STACK, {screen: COURSES_VIDEOS_SCREEN, params: item});
  };
  const Item = ({index, item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.mainBTN,
          {
            backgroundColor: uploading
              ? Colors.commonGray
              : index === currentQuestionNumber
              ? Colors.lightBlue
              : Colors.white,
          },
        ]}
        activeOpacity={ACTIVE_OPACITY}
        disabled={uploading}
        onPress={selCurrentExam.bind(null, index)}>
        <Text
          style={[
            styles.text,
            {
              color:
                index == currentQuestionNumber
                  ? Colors.white
                  : Colors.textColorLess,
            },
          ]}>
          {index + 1}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={styles.flatList}
        inverted={I18nManager.isRTL}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default HorizontalExamNumberList;
