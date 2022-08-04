import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Strings from 'App/Values/Strings';
import styles from './style';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import AppDataActions from '../../../Stores/AppData/Actions';
import {string} from 'App/i18n';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const CoursesVideosList = ({coursesEpisodes, courseId, titleCource}) => {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   dispatch(TeacherDataActions.getAllTeacherExamsList());
  //   setRefreshing(false);
  // };

  console.log('coursesEpisodes', coursesEpisodes);
  const onItemPressed = (item, index) => {
    const episodeId = item?._id;
    const object = Object.assign(
      {courseId},
      {episodeId},
      {index},
      {titleCource},
    );
    dispatch(AppDataActions.getEpisode(object));
    console.log('titleCourcetitleCource', titleCource);

    // console.log(object);
    // navigate(STUDENT_STACK, {screen: VIDEO_SCREEN, params: {object}});
  };
  const renderItem = ({item, index}) => {
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
          <TouchableOpacity
            onPress={onItemPressed.bind(null, item, index)}
            activeOpacity={ACTIVE_OPACITY}>
            <FontIcon
              name={Strings.Icons.PLAY}
              // name={item?.isFree ? 'play' : 'lock1'}
              color={Colors.lightBlue}
              size={normal * 5}
            />
          </TouchableOpacity>
          <View style={styles.viewEnd}>
            <View style={styles.topView}>
              <Text numberOfLines={1} style={styles.textName}>
                {item?.title}
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={styles.textEpisode} numberOfLines={2}>
                {string.EPISODE} {index + 1}
              </Text>
              <View
                style={[
                  styles.viewSituation,
                  {
                    backgroundColor: availableVideo
                      ? Colors.green
                      : Colors.pink,
                  },
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
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={coursesEpisodes}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      //   style={styles.flatList}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
      // refreshControl={
      //   <RefreshControl
      //     colors={[Colors.lightBlue, Colors.lightBlue]}
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //   />
      // }
    />
  );
};

export default CoursesVideosList;
