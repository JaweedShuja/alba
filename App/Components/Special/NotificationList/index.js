import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import Images from '../../../Theme/Images';
import downloadFromUrl from '../../../utils/downloadFromUrl';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const profileUri =
  'https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg';
const uri =
  'https://oapen-uk.jiscebooks.org/wp-content/uploads/2021/04/pioneers-of-education-1.jpg';
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const NotificationList = ({data = ['', '', '', '']}) => {
  const Item = ({index, item}) => {
    var expression =
      /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
    var matches = item?.description.match(expression);
    console.log({matches});
    return (
      <View style={styles.mainView} activeOpacity={ACTIVE_OPACITY}>
        <FastImage source={{uri: item?.image?.path}} style={styles.image} />
        <View style={styles.viewProfile}>
          {/* <FastImage source={{uri: profileUri}} style={styles.imageProfile} /> */}
          <View style={styles.textView}>
            <Text style={styles.nameProfile}>{item?.title}</Text>
            {/* <Text style={styles.onlineStatus}>1 day ago</Text> */}
          </View>
        </View>
        {matches ? (
          <TouchableOpacity onPress={downloadFromUrl.bind(null, matches?.[0])}>
            <Text style={[styles.description, styles.link]}>
              {item?.description}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text
            style={styles.description}
            //  numberOfLines={2}
          >
            {item?.description}
          </Text>
        )}
      </View>
    );
  };
  const renderItem = ({item, index}) => <Item index={index} item={item} />;
  const headerTitle = () => {
    return <Text style={styles.headerTitle}>Feeds</Text>;
  };
  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.flatList}
      contentContainerStyle={styles.FlatListContent}
      renderItem={renderItem}
      // ListHeaderComponent={headerTitle}
      keyExtractor={(item, index) => `${item.title}${index}`}
    />
  );
};

export default NotificationList;
