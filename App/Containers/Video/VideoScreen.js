import Container from 'App/Components/Container';
import PlayVideo from 'App/Components/Courses/PlayVideo';
import ReplyVideoMessage from 'App/Components/Courses/ReplyVideoMessage';
import {string} from 'App/i18n';
import Strings from 'App/Values/Strings';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import UserChatActions from '../../Stores/UserChats/Actions';
// import {FooterChat} from '../../Components/Messages/FooterChat';
import Loading from '../../Components/Share/Loading';
import styles from './VideoStyle';
import FooterSendMessage from '../../Components/Courses/FooterSendMessage';
import {navigate} from 'App/Services/NavigationService';
import {showToast} from 'App/utils/showToast';
const errorMessage = {
  sendMessageSuccess: 'Your Message was successfully sent',
};

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {CHAT_SCREEN, STUDENT_STACK} = Strings.Routes;

const VideoScreen = ({navigation, route}) => {
  console.log('aaaaaaaaaaaaaaaaaaaaaa');
  const dispatch = useDispatch();
  const socket = useSelector((state) => state?.socket?.socket);
  const videoData = useSelector((state) => state.appData.EpisodeData);
  const [isMessageSent, setMessageSent] = useState(
    videoData?.message ? true : false,
  );
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [chatData, setChatData] = useState(null);

  const loading = useSelector((state) => state.appData.getEpisodeLoading);
  const userProfileData = useSelector((state) => state?.auth?.userProfileData);
  const courceIndex = route?.params?.courceIndex;
  const titleCource = route?.params?.titleCource;
  const data = route?.params?.data;
  console.log('datadataVideo', data);
  const {_id} = userProfileData;
  const onSendPress = () => {
    if (socket) {
      socket.emit(
        'Message',
        {
          sender: _id,
          receiver: videoData?.teacher,
          chat: null,
          message: message,
          messageType: 'Message',
          type: Strings.MessageTypes.REPLAYEPISODE,
          episode: videoData?._id,
        },
        (res) => {
          console.log('userMatches RES CALL BACK MATCH MESSAGE ', res);
          if (res.code === 200) {
            setChatData(res?.data?.payload);
            showToast('s', errorMessage?.sendMessageSuccess);
            setMessageSent(res?.data?.payload);
            dispatch(UserChatActions.updateUserChatByOffset());
          } else {
          }
        },
      );
    } else {
      console.log('socket is null');
    }
  };
  const hasWhiteSpace = (text) => {
    return /^\S|\w/.test(text);
  };
  const goToChatScreen = () => {
    if (chatData) {
      navigate(STUDENT_STACK, {
        screen: CHAT_SCREEN,
        params: {
          lastMessage: {
            targetUser: [
              {
                _id: chatData?.targetUserId?._id,
                firstName: chatData?.targetUserId?.firstName,
                image: chatData?.targetUserId?.image,
              },
            ],
          },
          _id: chatData?.chat,
          type: '',
          total: chatData?.total,
        },
      });
    } else {
      navigate(STUDENT_STACK, {
        screen: CHAT_SCREEN,
        params: {
          lastMessage: {
            targetUser: [
              {
                _id: data?.targetUserId?._id,
                firstName: data?.targetUserId?.firstName,
                image: data?.targetUserId?.image,
              },
            ],
          },
          _id: data?.chat,
          type: '',
          total: data?.total,
        },
      });
    }
  };
  const onChangeTextMessage = (text) => {
    hasWhiteSpace(text) ? setDisabled(false) : setDisabled(true);
    setMessage(text);
  };
  return (
    <Container {...{navigation}}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.content}>
            <PlayVideo {...{videoData}} {...{navigation}} />
            {isMessageSent && (
              <ReplyVideoMessage
                messageData={message || videoData?.message}
                data={[videoData]}
                titleCource={titleCource}
                courceIndex={courceIndex}
              />
            )}
          </ScrollView>
          {isMessageSent ? (
            <TouchableOpacity
              onPress={goToChatScreen}
              style={styles.finishBtn}
              activeOpacity={ACTIVE_OPACITY}>
              <Text style={styles.text}>{string.CONTINUE_ON_CHATS_SCREEN}</Text>
            </TouchableOpacity>
          ) : (
            videoData?.showMessages && (
              <FooterSendMessage
                setMessage={onChangeTextMessage}
                {...{disabled, message, onSendPress}}
              />
            )
          )}
        </>
      )}
    </Container>
  );
};

export default VideoScreen;
