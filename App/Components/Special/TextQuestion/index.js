import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import Icon from 'react-native-vector-icons/Fontisto';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const TextQuestion = ({data, selCorrectOption, options}) => {
  console.log('thissssssssss', {data});
  const Item = ({index, item}) => {
    let options = 'A)';
    switch (index) {
      case 0:
        options = 'A)';
        break;
      case 1:
        options = 'B)';
        break;
      case 2:
        options = 'C)';
        break;
      default:
        options = 'D)';
        break;
    }
    return (
      <TouchableOpacity
        onPress={selCorrectOption.bind(null, index)}
        style={styles.mainBTN}
        activeOpacity={ACTIVE_OPACITY}>
        <View style={styles.viewOption}>
          <Text style={styles.answerInput}>
            {options} {item?.text}
          </Text>
        </View>
        <Icon
          name={item?.check ? 'checkbox-active' : 'checkbox-passive'}
          size={normal * 1.5}
          color={item?.check ? Colors.green : Colors.text}
        />
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.scale}>
        <Text style={styles.textTitleQuestion}>{string.QUESTION} </Text>
        <Text style={styles.textTitleQuestion}>
          {string.SCORE} :{data?.scale}
        </Text>
      </View>
      <View style={styles.viewQuestion}>
        <Text style={styles.text}>{data?.question}</Text>
      </View>
      <Text style={styles.textTitleQuestion}>{string.ANSWERS}</Text>
      <FlatList
        data={options?.options}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // horizontal={true}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default TextQuestion;
