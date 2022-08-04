/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View, Text} from 'react-native';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  MessageImage,
} from 'react-native-gifted-chat';
import {
  Helpers,
  Metrics,
  Fonts,
  Colors,
  ApplicationStyles,
  FontFamily,
} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import styles from './style';
import Strings from 'App/Values/Strings';
import ReplyVideoMessage from '../../Courses/ReplyVideoMessage';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import PdfCard from '../../Share/PdfCard';
import {dWidth} from '../../../Theme/Metrics';
import {store} from '../../../App';

const paddingBubble = 0;
const borderRadiusMessage = normal * 1.3;
export const renderAvatar = (props) => {
  return (
    <Avatar
      {...props}
      showAvatarForEveryMessage={false}
      // containerStyle={{left: {borderWidth: 3, borderColor: 'blue'}, right: {}}}
      imageStyle={{
        left: {
          width: 0,
          height: 0,
          borderWidth: 0,
          borderColor: Colors.toolbarChat,
        },
        right: {},
      }}
    />
  );
};

export const renderBubble = (props) => {
  const parsedData =
    props?.currentMessage?._raw?.type === Strings.MessageTypes.REPLAYEPISODE
      ? JSON.parse(props?.currentMessage?._raw?.episode)
      : null;
  const isMeSendingIT =
    props?.currentMessage?._raw?.type === Strings.MessageTypes.REPLAYEPISODE
      ? store.getState()?.auth?.userProfileData?._id ===
        JSON.parse(props?.currentMessage?._raw?.user)?._id
      : null;
  console.log('parsedData', props?.currentMessage);
  return (
    <View>
      {props?.currentMessage?._raw?.type ===
      Strings.MessageTypes.REPLAYEPISODE ? (
        <View
          style={[
            {
              position: 'absolute',
              top: 10,
            },
            isMeSendingIT
              ? {
                  right: widthPercentageToDP(4),
                }
              : {
                  left: widthPercentageToDP(0),
                },
          ]}>
          <ReplyVideoMessage
            messageData={props?.currentMessage?._raw?.text}
            data={[parsedData]}
            titleCource={parsedData?.course?.title}
            courceIndex={parsedData?.course?.episodeIndex + 1}
          />
        </View>
      ) : null}
      <Bubble
        {...props}
        renderTime={() => <View />}
        containerStyle={{
          right: {
            marginTop:
              props?.currentMessage?._raw?.type ===
              Strings.MessageTypes.REPLAYEPISODE
                ? 140
                : 0,
            marginBottom:
              props?.currentMessage?._raw?.type ===
              Strings.MessageTypes.REPLAYEPISODE
                ? 15
                : 0,
          },
          left: {
            marginTop:
              props?.currentMessage?._raw?.type ===
              Strings.MessageTypes.REPLAYEPISODE
                ? 140
                : 0,
            marginBottom:
              props?.currentMessage?._raw?.type ===
              Strings.MessageTypes.REPLAYEPISODE
                ? 15
                : 0,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.lightBlue,
            borderRadius: borderRadiusMessage,
            borderTopStartRadius: 0,
            padding: paddingBubble,
            marginStart: 0,
            // marginBottom: 10,
            paddingHorizontal: paddingBubble,
            paddingVertical: paddingBubble,
          },
          right: {
            backgroundColor: Colors.toolbarChat,
            borderRadius: borderRadiusMessage,
            borderTopEndRadius: 0,
            borderBottomEndRadius: borderRadiusMessage,
            // padding: 10,
            marginEnd: normal * 1,
            marginBottom: 0,
            paddingHorizontal: paddingBubble,
            paddingVertical: paddingBubble,
          },
        }}
        // bottomContainerStyle={{
        //   left: {borderColor: 'red', borderWidth: 4},
        //   right: {},
        // }}
        tickStyle={{
          color: Colors.lightBlue,
          paddingBottom: 3,
        }}
        // usernameStyle={{color: 'red', fontWeight: '100'}}
        // containerToNextStyle={{
        //   left: {borderColor: 'red', borderWidth: 4},
        //   right: {},
        // }}
        // containerToPreviousStyle={{
        //   left: {borderColor: 'red', borderWidth: 4},
        //   right: {},
        // }}
      />
    </View>
  );
};

export const renderSystemMessage = (props) => (
  <SystemMessage
    {...props}
    // containerStyle={{
    //   backgroundColor: 'pink',
    //   marginBottom: 330,
    //   position: 'relative',
    // }}
    // wrapperStyle={{
    //   borderWidth: 10,
    //   borderColor: 'white',
    //   marginBottom: 3300,
    //   position: 'relative',
    // }}
    // textStyle={{
    //   color: 'crimredson',
    //   fontWeight: '900',
    //   marginBottom: 330,
    //   position: 'relative',
    // }}
  />
);

export const renderMessage = (props) => (
  <Message
    {...props}
    showUserAvatar={false}
    // renderDay={() => <Text>Date</Text>}
    // containerStyle={{
    //   left: {backgroundColor: Colors.toolbarChat},
    //   right: {backgroundColor: Colors.toolbarChat},
    // }}
  />
);

export const renderCustomView = (props) => {
  const pdf = props?.currentMessage?._raw?.pdf
    ? JSON.parse(props?.currentMessage?._raw?.pdf)
    : null;
  if (!pdf) {
    return null;
  }
  return (
    <View
      style={{
        width: dWidth(80),
        paddingBottom: 10,
        paddingHorizontal: 5,
      }}>
      <PdfCard {...{props}} data={pdf} />
    </View>
  );
};
