import {Colors} from 'App/Theme';
import Strings from 'App/Values/Strings';
import React from 'react';
import {FlatList, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import EmptyView from '../../Share/EmptyView';
import styles from './style';

const {PLACEHOLDER_SPEED} = Strings.CONSTANTS;

const StudentExamsPlaceHolder = ({data, type = 'student', loading}) => {
  const renderItem = ({item, index}) => {
    return (
      <SkeletonPlaceholder
        backgroundColor={Colors.cardPlaceHolderColor}
        highlightColor={Colors.cardHighlightColor}
        speed={PLACEHOLDER_SPEED}>
        <View style={styles.mainView}></View>
      </SkeletonPlaceholder>
    );
  };

  return (
    <FlatList
      data={['', '', '', '', '']}
      keyboardShouldPersistTaps="always"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default StudentExamsPlaceHolder;
