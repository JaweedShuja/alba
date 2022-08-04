import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import {string} from 'App/i18n';
import {useDispatch} from 'react-redux';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {MALE, FEMALE} = Strings.ImageAddress;

const securityName = (fullName) => {
  const names = fullName.split(' ');
  let result = '';
  for (const name of names) {
    if (name.trim() != '') {
      result = result + ' ' + name.charAt(0).toUpperCase() + '****';
    }
  }

  return result;
};

const TeacherParticipatingExam = ({data}) => {
  const dispatch = useDispatch();

  const onItemPressed = (item) => {
    const examId = item?.exam?._id;
    const userId = item?.user?._id;
    const types = item?.exam?.type;
    const sendParam = Object.assign({examId}, {userId}, {types});
    console.log({sendParam});
    dispatch(TeacherDataActions.getUserExamAnswers(sendParam));
  };

  const renderItem = ({item, index}) => {
    console.log('answerItem=>', {item});
    const gender = item?.user?.gender;
    //let fullName = securityName(item?.user?.firstName);
    let fullName = item?.user?.firstName;

    return (
      <View style={styles.mainView}>
        <View style={styles.viewLeft}>
          <FastImage
            source={gender == 'FEMALE' ? FEMALE : MALE}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.textName}>{fullName}</Text>
        </View>
        <TouchableOpacity
          onPress={onItemPressed.bind(null, item)}
          style={styles.btn}
          activeOpacity={ACTIVE_OPACITY}>
          <Text style={styles.textBtn}>{string.ANSWERS_STRING}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{string.PARTICIPATING}</Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.FlatList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default TeacherParticipatingExam;

// if (item?.exam?.type == 'TEST')
//   navigate(TEACHER_STACK, {
//     screen: TEACHER_ANSWERS_SCREEN,
//     params: item,
//   });
// else
//   navigate(TEACHER_STACK, {
//     screen: TEACHER_ANSWERS_CLASSIC_SCREEN,
//     params: item,
//   });
