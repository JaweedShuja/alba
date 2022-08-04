import {Colors, Metrics} from 'App/Theme';
import Strings from 'App/Values/Strings';
import React from 'react';
import {FlatList, I18nManager, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style';
const {PLACEHOLDER_SPEED} = Strings.CONSTANTS;

const HorizontalListCoursesPlaceHolder = ({data, type = '', title}) => {
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
        inverted={data?.length > 1 ? false : I18nManager.isRTL ? true : false}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.title}${index}`}
      />
    </View>
  );
};

export default HorizontalListCoursesPlaceHolder;
