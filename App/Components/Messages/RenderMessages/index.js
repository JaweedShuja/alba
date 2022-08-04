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
import ReplyVideoMessage from 'App/Components/Courses/ReplyVideoMessage';
import ImageComponent from './ImageComponent';
import VideoMessage from './VideoMessage';
const marginText = 3;
export const renderMessageText = (props) => (
  <MessageText
    {...props}
    containerStyle={{
      right: {
        borderTopEndRadius: 0,
        padding: 3,
      },
    }}
    textStyle={{
      left: {
        color: Colors.white,
        marginVertical: marginText,
        marginHorizontal: marginText,
      },
      right: {
        color: Colors.text,
        marginVertical: marginText,
        marginHorizontal: marginText,
      },
    }}
    // linkStyle={{
    //   left: {color: 'red'},
    //   right: {color: 'red'},
    // }}
    customTextStyle={{
      fontSize: normal * 2,
      ...FontFamily.regular,
      lineHeight: 24,
    }}
  />
);

export const renderCustomView = ({user}) => (
  <View
    style={{
      alignItems: 'center',
    }}
  />
);

export const renderMessageImage = (props) => (
  <ImageComponent {...{props}} targetUserId={props.targetUserId} />
  // <MessageImage {...props} imageStyle={[styles.slackImage]} />
);

export const renderMessageVideo = (props) => {
  const currentMessage = props?.currentMessage;
  console.log('currentMessage video', currentMessage);
  const {status} = currentMessage;
  return (
    <VideoMessage
      {...{props, currentMessage, targetUserId: props?.targetUserId, status}}
      video={currentMessage?.video}
    />
  );
};

export const renderMessagePdf = (props) => {
  const currentMessage = props?.currentMessage;
  console.log('currentMessage Pdf', currentMessage?.video);
  return (
    <VideoMessage
      targetUserId={props?.targetUserId}
      currentMessage={currentMessage}
      video={currentMessage?.video}
    />
  );
};
