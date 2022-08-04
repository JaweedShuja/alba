import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, I18nManager} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ACTION_CHAT_WIDTH, styles} from './styles';
import FontIcon from '../../CustomIcon/FontIcon';
import Strings from 'App/Values/Strings';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {SwipeRow} from 'react-native-swipe-list-view';
import {string} from 'App/i18n';
import {useDispatch} from 'react-redux';
import UserChatActions from '../../../Stores/UserChats/Actions';
import PopupsActions from '../../../Stores/PopUps/Actions';
import moment from 'moment';

const {PLACEHOLDER} = Strings.ImageAddress;

const MessageListItem = ({item, onItemPressed}) => {
  const dispatch = useDispatch();

  const [imageLoading, setImageLoading] = useState(true);
  const swipeRowRef = useRef(null);

  if (I18nManager.isRTL) {
    moment.locale('ar', {
      relativeTime: {
        future: `${string.AGO} %s`,
        past: `${string.AGO} %s`,
        s: string.SECONDS,
        ss: `%s ${string.SECONDS}`,
        m: string.A_MINUTE,
        mm: `%d ${string.MINUTES}`,
        h: string.AN_HOUR,
        hh: `%d ${string.HOURS}`,
        d: string.A_DAY,
        dd: `%d ${string.A_DAYS}`,
        M: string.A_MONTH,
        MM: `%d ${string.MONTHS}`,
        y: string.A_YEAR,
        yy: `%d ${string.YEARS}`,
      },
    });
  } else {
    moment.locale('en', {
      relativeTime: {
        future: `%s ${string.AGO}`,
        past: `%s ${string.AGO}`,
        s: string.SECONDS,
        ss: `%s ${string.SECONDS}`,
        m: string.A_MINUTE,
        mm: `%d ${string.MINUTES}`,
        h: string.AN_HOUR,
        hh: `%d ${string.HOURS}`,
        d: string.A_DAY,
        dd: `%d ${string.A_DAYS}`,
        M: string.A_MONTH,
        MM: `%d ${string.MONTHS}`,
        y: string.A_YEAR,
        yy: `%d ${string.YEARS}`,
      },
    });
  }

  const renderLastMessage = (lastMessage, isSupport, count) => {
    if (isSupport) {
      return null;
    }
    if (lastMessage?.message && lastMessage?.message !== '') {
      return (
        <Text
          style={[
            styles.subTitle,
            {
              color: 'grey',
              opacity: count ? 1 : 0.6,
            },
          ]}
          numberOfLines={2}>
          {lastMessage?.message}
        </Text>
      );
    }
    if (lastMessage?.audio && lastMessage?.audio !== '') {
      return (
        <View
          style={[
            styles.typeMessage,
            {
              opacity: count ? 1 : 0.6,
            },
          ]}>
          <FontIcon name={Strings.Icons.MICROPHONE} color={'grey'} size={15} />
          <Text
            style={[
              styles.subTitle,
              {
                color: 'grey',
                marginStart: widthPercentageToDP(1),
              },
            ]}
            numberOfLines={2}>
            {string.AUDIO}
          </Text>
        </View>
      );
    }
    if (lastMessage?.pdf && lastMessage?.pdf !== '') {
      return (
        <View
          style={[
            styles.typeMessage,
            {
              opacity: count ? 1 : 0.6,
            },
          ]}>
          <FontIcon name={Strings.Icons.PDF} color={'grey'} size={15} />
          {/* <View style={{flexDirection: 'row', opacity: count ? 1 : 0.6}}>
          <FastImage
            source={Strings.ImageAddress.PDF}
            style={styles.icon}
            resizeMode={'cover'}
          /> */}
          <Text
            style={[
              styles.subTitle,
              {
                color: 'grey',
                marginStart: widthPercentageToDP(1),
              },
            ]}
            numberOfLines={2}>
            {string.PDF}
          </Text>
        </View>
      );
    }
    if (lastMessage?.video && lastMessage?.video !== '') {
      return (
        <View
          style={[
            styles.typeMessage,
            {
              opacity: count ? 1 : 0.6,
            },
          ]}>
          <FontIcon name={Strings.Icons.CAMERA} color={'grey'} size={15} />
          <Text
            style={[
              styles.subTitle,
              {
                color: 'grey',
                marginStart: widthPercentageToDP(1),
              },
            ]}
            numberOfLines={2}>
            {string.VIDEO}
          </Text>
        </View>
      );
    }
    if (lastMessage?.image && lastMessage?.image !== '') {
      return (
        <View
          style={[
            styles.typeMessage,
            {
              opacity: count ? 1 : 0.6,
            },
          ]}>
          <FontIcon name={Strings.Icons.CAMERA} color={'grey'} size={15} />
          <Text
            style={[
              styles.subTitle,
              {
                color: 'grey',
                marginStart: widthPercentageToDP(1.5),
              },
            ]}
            numberOfLines={2}>
            {string.IMAGE}
          </Text>
        </View>
      );
    }
  };

  const onDelete = (item) => {
    console.log('onDelete', item?.lastMessage?.chatId);
    console.log('onDelete2', item?.lastMessage?.targetUserId);
    swipeRowRef?.current?.closeRow();
    dispatch(
      PopupsActions.showModal(Strings.MODAL_TYPES.CONFIRM_MODAL, {
        description: string.REMOVE_MESSAGE_DESCRIPTION,
        confirm: () => {
          dispatch(
            UserChatActions.deleteChat(
              item?.lastMessage?.chatId,
              item?.lastMessage?.targetUserId,
            ),
          );
        },
        cancel: () =>
          dispatch(PopupsActions.hideModal(Strings.MODAL_TYPES.CONFIRM_MODAL)),
      }),
    );
  };

  return (
    <SwipeRow
      ref={swipeRowRef}
      disableRightSwipe={!I18nManager.isRTL}
      disableLeftSwipe={I18nManager.isRTL}
      rightOpenValue={
        I18nManager.isRTL ? 0 : -ACTION_CHAT_WIDTH
        // -ACTION_CHAT_WIDTH * (item?.matchId === null ? 1 : 2) - 10
      }
      leftOpenValue={I18nManager.isRTL ? ACTION_CHAT_WIDTH : 0}
      closeOnRowPress
      useNativeDriver={true}>
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            item?.matchId === null && {
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            },
          ]}
          onPress={() => onDelete(item)}>
          <View style={styles.containerIcon}>
            <FontIcon name={'trash'} color={'white'} size={28} />
          </View>
          <Text style={styles.actionTxt}>{string.DELETE}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onItemPressed.bind(null, item)}
        activeOpacity={1}
        style={styles.mainBTN}>
        <>
          <View style={styles.viewleftparent}>
            <>
              {imageLoading && (
                <FastImage
                  source={PLACEHOLDER}
                  style={[styles.image, {position: 'absolute'}]}
                  resizeMode={'cover'}
                />
              )}
              <FastImage
                source={{uri: item?.lastMessage?.targetUser[0]?.image?.path}}
                onLoadEnd={() => setImageLoading(false)}
                style={styles.image}
                resizeMode={'cover'}
              />
            </>
            <View style={styles.viewparenttexts}>
              <View style={styles.viewnamejob}>
                <View style={styles.start}>
                  <Text style={styles.textname}>
                    {item?.lastMessage?.targetUser[0]?.firstName}
                  </Text>
                </View>
                <View style={styles.end}>
                  <Text style={styles.sub}>
                    {moment(item?.lastMessage?.createdAt).from()}
                  </Text>
                </View>
              </View>
              {renderLastMessage(item?.lastMessage, false, item?.count)}
            </View>
          </View>
        </>
      </TouchableOpacity>
    </SwipeRow>
  );
};

export default MessageListItem;

/* <FontIcon name={Strings.Icons.PDF} color={'grey'} size={15} /> */

/* <View style={styles.viewrightparent}>
            <Text>hggg</Text>
            <Text style={styles.texttime}>{item.onlinetime}</Text>
            {item?.count == 0 ? null : (
              <View style={styles.unreadmeassagecount}>
                <Text style={styles.textunread}>{item?.count}</Text>
              </View>
            )}
          </View> */
