import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Strings from 'App/Values/Strings';
import styles from './style';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {useDispatch} from 'react-redux';
import AppDataActions from '../../../Stores/AppData/Actions';
import {string} from 'App/i18n';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const CoursesVideoListLock = ({
  coursesEpisodes,
  isUserBuyCourse,
  courseId,
  titleCource,
}) => {
  const dispatch = useDispatch();
  console.log('titleCourcetitleCource', titleCource);
  console.log(coursesEpisodes);
  const onItemPressed = (item) => {
    const episodeId = item?._id;
    const object = Object.assign({courseId}, {episodeId}, {titleCource});
    dispatch(AppDataActions.getEpisode(object));
    // navigate(STUDENT_STACK, {screen: VIDEO_SCREEN, params: item});
  };
  const Item = ({index, item}) => (
    <View style={styles.mainView} activeOpacity={ACTIVE_OPACITY}>
      <View style={styles.viewLeft}>
        <View
          style={[
            styles.viewIndex,
            {
              backgroundColor: item?.isFree ? Colors.lightBlue : Colors.white,
            },
          ]}>
          <Text
            style={[
              styles.textIndex,
              {
                color: item?.isFree ? Colors.white : Colors.lightBlue,
              },
            ]}>
            {index + 1}
          </Text>
        </View>
        <View
          style={[
            styles.viewLine,
            {
              borderColor: item?.isFree ? Colors.lightBlue : '#E8E8E8',
            },
          ]}
        />
      </View>
      <View style={styles.viewRight}>
        <View
          style={[
            styles.viewSituation,
            {backgroundColor: item?.isFree ? Colors.green : Colors.pink},
          ]}>
          {item?.isFree ? (
            <Text style={styles.textSituation}>{string.FREE}</Text>
          ) : (
            <View>
              <Text style={styles.textSituation}>{string.NEED_ACTIVATION}</Text>
              {/* <Text style={styles.textSituation}>{item.time}</Text> */}
            </View>
          )}
        </View>
        {item?.isFree ? (
          <TouchableOpacity
            style={styles.lockBtn}
            onPress={onItemPressed.bind(null, item)}
            activeOpacity={ACTIVE_OPACITY}>
            <FontIcon
              name={Strings.Icons.PLAY}
              color={Colors.lightBlue}
              size={normal * 5}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.lockBtn,
              {
                backgroundColor: Colors.lightBlue,
              },
            ]}
            onPress={onItemPressed.bind(null, item)}
            activeOpacity={ACTIVE_OPACITY}>
            <FontIcon
              name={Strings.Icons.LOCK}
              color={Colors.white}
              size={normal * 2.5}
            />
          </TouchableOpacity>
        )}

        <View style={styles.viewTexts}>
          <Text style={styles.textName} numberOfLines={1}>
            {item?.title}
          </Text>
          <Text style={styles.textEpisode}>
            {string.EPISODE} {index + 1}
          </Text>
        </View>
      </View>
    </View>
  );
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <FlatList
      data={coursesEpisodes}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default CoursesVideoListLock;
