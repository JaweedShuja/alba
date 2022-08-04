import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Strings from 'App/Values/Strings';
import styles from './style';
import FastImage from 'react-native-fast-image';
import {navigate} from 'App/Services/NavigationService';
import {Colors} from 'App/Theme';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {COURSES_INFO_SCREEN, STUDENT_STACK} = Strings.Routes;
const {PLACEHOLDER} = Strings.ImageAddress;

const HorizontalCategoryCoursesList = ({
  data,
  title,
  id,
  showMore = false,
  onSubmitTeacher,
  // onItemPressed,
}) => {
  const onItemPressed = (item) => {
    navigate(STUDENT_STACK, {
      screen: COURSES_INFO_SCREEN,
      params: {teacherId: item?._id},
    });
  };

  const Item = ({index, item}) => {
    const [imageLoading, setImageLoading] = useState(true);

    return (
      <TouchableOpacity
        style={styles.mainBTN}
        activeOpacity={ACTIVE_OPACITY}
        onPress={onItemPressed.bind(null, item)}>
        <>
          {imageLoading && (
            <FastImage
              source={PLACEHOLDER}
              style={[styles.image, {position: 'absolute'}]}
              resizeMode={'cover'}
            />
          )}
          <FastImage
            source={{
              uri: item?.image?.path,
            }}
            onLoadEnd={() => setImageLoading(false)}
            style={styles.image}
            resizeMode={'cover'}
          />
        </>

        <View style={[styles.cover]}>
          <View style={styles.direction}>
            <Text
              style={[styles.text, {color: Colors.textColorLess}]}
              numberOfLines={1}>
              {item?.courses[0]?.title}
            </Text>
          </View>
          <View style={styles.direction}>
            <Text style={[styles.text, {color: Colors.text}]}>
              {item?.firstName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <Text style={styles.textheader}>{title}</Text>
        {showMore && (
          <TouchableOpacity
            onPress={onSubmitTeacher}
            style={styles.btnViewList}
            activeOpacity={ACTIVE_OPACITY}>
            <Text style={styles.textViewList}>{string.VIEW_LIST}</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        //inverted={I18nManager.isRTL}
        inverted={data?.length > 1 ? false : I18nManager.isRTL ? true : false}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default HorizontalCategoryCoursesList;
