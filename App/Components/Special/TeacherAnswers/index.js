import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {string} from 'App/i18n';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import Strings from '../../../Values/Strings';

const TeacherAnswers = ({data}) => {
  console.log({data});
  const Item = ({index, item}) => {
    let correctAnswer = '';
    let wrongAnswer = '';
    const length = item?.answers?.length;
    if (length === 2) {
      correctAnswer = item?.answers?.[0];
      wrongAnswer = item?.answers?.[1];
    } else if (length === 1) correctAnswer = item?.answers?.[0];
    return (
      <View style={styles.mainView}>
        <Text style={styles.textTitleQuestion}>
          {string.QUESTION} {index + 1} :
        </Text>
        <View style={styles.viewQuestion}>
          <Text
            style={styles.text}
            //  numberOfLines={4}
          >
            {item?.question}
          </Text>
        </View>

        <Text style={styles.textTitleAnswer}>{string.ANSWERS}</Text>
        {length === 2 ? (
          <>
            <View style={styles.viewYourAnswer}>
              <Text style={[styles.text, styles.textAnswer]}>
                {correctAnswer}
              </Text>
              <View
                style={[
                  styles.viewIcon,
                  {
                    backgroundColor: item?.correct ? Colors.green : Colors.red,
                  },
                ]}>
                <FontIcon
                  name={
                    item?.correct ? Strings.Icons.TICK : Strings.Icons.CANCEL
                  }
                  color={Colors.white}
                  size={normal * 1.7}
                />
              </View>
            </View>
            <View style={styles.viewCorrectAnswer}>
              <Text style={styles.textCorrectAnswer}>{wrongAnswer}</Text>
              <View style={[styles.viewIcon, styles.viewCorrectIcon]} />
            </View>
          </>
        ) : (
          <View style={styles.viewYourAnswer}>
            <Text style={[styles.text, styles.textAnswer]}>
              {correctAnswer}
            </Text>
            <View
              style={[
                styles.viewIcon,
                {
                  backgroundColor: !item?.correct ? Colors.green : Colors.red,
                },
              ]}>
              <FontIcon
                name={
                  !item?.correct ? Strings.Icons.TICK : Strings.Icons.CANCEL
                }
                color={Colors.white}
                size={normal * 1.7}
              />
            </View>
          </View>
        )}
      </View>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatListContent}
      //   style={styles.flatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default TeacherAnswers;
