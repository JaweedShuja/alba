import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Strings from 'App/Values/Strings';
import styles from './style';
import {navigate} from 'App/Services/NavigationService';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import moment from 'moment';
import {string} from 'App/i18n';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {TEACHER_STACK, TEACHER_VIDEO_SCREEN} = Strings.Routes;

const TeacherCoursesVideosList = ({coursesEpisodes, courseId}) => {
  const onItemPressed = (item) => {
    navigate(TEACHER_STACK, {
      screen: TEACHER_VIDEO_SCREEN,
      params: {data: item},
    });
  };
  const Item = ({index, item}) => {
    console.log(item?.startDate);
    const availableVideo = moment().isAfter(item?.startDate);
    const date = availableVideo
      ? string.AVAILABLE
      : moment(item?.startDate).format('D-MMMM h:mm');
    console.log({date});

    return (
      <View style={styles.mainView} activeOpacity={ACTIVE_OPACITY}>
        <View style={styles.viewLeft}>
          <View
            style={[
              styles.viewIndex,
              {
                backgroundColor: Colors.lightBlue,
                // backgroundColor: item?.isFree ? Colors.lightBlue : Colors.white,
              },
            ]}>
            <Text
              style={[
                styles.textIndex,
                {
                  color: Colors.white,
                  // color: item?.isFree ? Colors.white : Colors.lightBlue,
                },
              ]}>
              {index + 1}
            </Text>
          </View>
          <View
            style={[
              styles.viewLine,
              {
                borderColor: Colors.lightBlue,
                // borderColor: item?.isFree ? Colors.lightBlue : '#E8E8E8',
              },
            ]}
          />
        </View>
        <View style={styles.viewRight}>
          <View
            style={[
              styles.viewSituation,
              {backgroundColor: availableVideo ? Colors.green : Colors.pink},
            ]}>
            {availableVideo ? (
              <Text style={styles.textSituation}>{date}</Text>
            ) : (
              <View>
                <Text style={styles.textSituation}>{string.STARTS_AT}</Text>
                <Text style={styles.textSituation}>{date.toString()}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={onItemPressed.bind(null, item)}
            activeOpacity={ACTIVE_OPACITY}>
            <FontIcon
              name={Strings.Icons.PLAY}
              // name={item?.isFree ? 'play' : 'lock1'}
              color={Colors.lightBlue}
              size={normal * 5}
            />
          </TouchableOpacity>
          <View style={styles.viewTexts}>
            <Text style={styles.textName}>{item?.title}</Text>
            <Text style={styles.textEpisode}>
              {string.EPISODE} {index + 1}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <FlatList
      data={coursesEpisodes}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      //   style={styles.flatList}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default TeacherCoursesVideosList;
