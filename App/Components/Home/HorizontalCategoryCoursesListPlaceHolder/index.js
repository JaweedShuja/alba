import {Colors, Metrics} from 'App/Theme';
import Strings from 'App/Values/Strings';
import React from 'react';
import {FlatList, I18nManager, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {COURSES_INFO_SCREEN, STUDENT_STACK} = Strings.Routes;
const {PLACEHOLDER} = Strings.ImageAddress;
const {PLACEHOLDER_SPEED} = Strings.CONSTANTS;

const HorizontalCategoryCoursesListPlaceHolder = ({
  data,
  title,
  id,
  showMore = false,
  onSubmitTeacher,
  // onItemPressed,
}) => {
  const Item = ({index, item}) => {
    return (
      <SkeletonPlaceholder
        backgroundColor={Colors.cardPlaceHolderColor}
        highlightColor={Colors.cardHighlightColor}
        speed={PLACEHOLDER_SPEED}>
        <View style={styles.mainBTN}></View>
      </SkeletonPlaceholder>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;

  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        backgroundColor={Colors.cardPlaceHolderColor}
        highlightColor={Colors.cardHighlightColor}
        speed={PLACEHOLDER_SPEED}>
        <View
          style={{
            ...Metrics.paddingHorizontalMain,
          }}>
          <View style={styles.textheader}></View>
        </View>
      </SkeletonPlaceholder>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        inverted={I18nManager.isRTL}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default HorizontalCategoryCoursesListPlaceHolder;
