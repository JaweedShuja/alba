import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import React from 'react';
import {FlatList, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import styles from './style';

const {PLACEHOLDER_SPEED} = Strings.CONSTANTS;

const PlaceHolderHomeScreen = () => {
  const ItemPlaceHolder = () => {
    return (
      <SkeletonPlaceholder
        backgroundColor={Colors.cardPlaceHolderColor}
        highlightColor={Colors.cardHighlightColor}
        speed={PLACEHOLDER_SPEED}>
        <View style={[styles.mainBTN]} />
      </SkeletonPlaceholder>
    );
  };

  const ListHeaderPlaceHolder = () => {
    return (
      <SkeletonPlaceholder
        backgroundColor={Colors.cardPlaceHolderColor}
        highlightColor={Colors.cardHighlightColor}
        speed={PLACEHOLDER_SPEED}>
        <View style={styles.SkeletonPlaceholderCardMain}>
          <View style={styles.SkeletonPlaceholderCard} />
        </View>
      </SkeletonPlaceholder>
    );
  };

  const renderItemPlaceholder = () => <ItemPlaceHolder />;

  return (
    <FlatList
      data={['', '', '', '']}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      horizontal={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItemPlaceholder}
      ListHeaderComponent={ListHeaderPlaceHolder}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default PlaceHolderHomeScreen;
