import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';
import Strings from 'App/Values/Strings';
import {navigate} from 'App/Services/NavigationService';
import {useSelector} from 'react-redux';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import MessageListItem from '../MessageListItem';
import DividerComponent from './../../Share/DividerComponent/index';
import {Colors} from 'App/Theme';
import {string} from 'App/i18n';

const {CHAT_SCREEN, STUDENT_STACK, VIDEO_SCREEN} = Strings.Routes;

const MessagesListStudents = ({data}) => {
  const chatsRooms = useSelector((state) => state.userChat?.userChats) || [];
  console.log('chatsRooms', chatsRooms);
  const onItemPressed = (item) => {
    // console.log('chatsRooms', item);

    // navigate(STUDENT_STACK, {screen: VIDEO_SCREEN, params: item});
    navigate(STUDENT_STACK, {screen: CHAT_SCREEN, params: item});
  };

  const ListEmptyComponent = () => (
    <View>
      <Text>{string.LIST_IS_EMPTY}</Text>
    </View>
  );

  const ItemSeparatorComponent = () => (
    <DividerComponent color={Colors.toolbarChat} />
  );

  const renderItem = ({item, index}) => (
    <MessageListItem {...{onItemPressed}} index={index} item={item} />
  );

  return (
    <FlatList
      data={chatsRooms}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.FlatList}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.title}${index}`}
      ListEmptyComponent={ListEmptyComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

export default MessagesListStudents;
