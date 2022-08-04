import React, {useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import Header from 'App/Components/Share/Header';
import {useDispatch, useSelector} from 'react-redux';
import {MemorizeChatRoom} from '../../Components/Messages/Chat';
import UserChatActions from '../../Stores/UserChats/Actions';
import ImagePickerModal from 'App/Components/Share/ImagePicker';
import {FooterChat} from '../../Components/Messages/FooterChat';
import Strings from '../../Values/Strings';

const {STUDENTS_BOTTOMS_TABS, MESSAGES_SCREEN} = Strings.Routes;

const ChatScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const data = route.params;
  const info = data?.lastMessage?.targetUser?.[0];
  const image = info?.image?.path;
  const firstName = info?.firstName;
  const chatId = data?._id;
  const {type} = data;
  const total = data?.total;
  const backListener = data?.backListener;
  const targetUser = data?.lastMessage?.targetUser[0];
  const targetUserId = targetUser?._id;

  const [loadingScreen, setLoadingScreen] = useState(true);
  const [status, setStatus] = useState(null);
  const [imageTypeModalVisible, setImageTypeModalVisible] = useState(false);
  const socket = useSelector((state) => state?.socket?.socket);
  const isConnectedNetwork = useSelector(
    (state) => state?.network?.isConnected,
  );
  const cacheChat = useSelector((state) => state.userChat?.cacheChats)?.filter(
    (el) => el?.chatId === chatId,
  );
  const {userType, _id} = useSelector((state) => state?.auth?.userProfileData);
  const imageUser = useSelector((state) => state?.auth?.userProfileData?.image);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        setLoadingScreen(false);
      }, 5);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!loadingScreen) {
      dispatch(UserChatActions.manageChatRoomData(chatId, total));
      messageListener();
      typingListener();
      viewChatEmitter();
    }

    return () => {
      socket && socket.off('Message');
      socket && socket.off('Typing');
    };
  }, [loadingScreen, socket]);

  const backActionHandler = () => {
    navigation.replace(STUDENTS_BOTTOMS_TABS, {screen: MESSAGES_SCREEN});
    BackHandler.removeEventListener('hardwareBackPress', backAction);
  };

  useEffect(() => {
    if (backListener) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => {
        backHandler.remove();
      };
    }
  }, []);

  const backAction = () => {
    console.log('backHandler');
    backActionHandler();
    return true;
  };

  const typingListener = () => {
    socket &&
      socket.on('Typing', (res) => {
        console.log({RES_TYPING: res});
        if (res?.data?.chatId === chatId) {
          setStatus(res.data);
        }
      });
  };

  const viewChatEmitter = () => {
    if (socket) {
      socket.emit('ViewChat', {chatId}, (res) => {
        console.log('CIEW CHAT ', res);
        if (res.code !== 200) {
          console.log('FAILED_TO_VIEW_CHAT');
          // dispatch(
          //   AppDataActions.setToastMessages([
          //     {message: Strings.FAILED_TO_VIEW_CHAT},
          //   ]),
          // );
        }
        setTimeout(() => {
          dispatch(UserChatActions.updateUserChatByOffset());
        }, 1500);
      });
    }
  };

  const messageListener = () => {
    if (socket) {
      socket.on('Message', (data) => {
        console.log({LISTENER_MESSAGE: data});
        if (data?.data?.payload?.chat === chatId) {
          const massage = {
            _id: JSON.stringify(new Date().getTime()),
            text: data.data?.payload?.message,
            createdAt: data.data?.payload?.createdAt,
            image: data.data?.payload?.image,
            audio: data.data?.payload?.audio,
            video: data.data?.payload?.video,
            pdf: data.data?.payload?.pdf,
            user: {
              _id: targetUserId,
              name: targetUser?.firstName,
              avatar:
                userType !== 'STUDENT'
                  ? 'https://d18f4ioombpixl.cloudfront.net/public_asset/images/f92ebd03-14de-478f-af02-9b20ca08133b.jpeg'
                  : targetUser?.image?.thumbnail ||
                    targetUser?.image?.path ||
                    '',
            },
            sent: true,
            received: true,
            status: 1,
          };
          dispatch(UserChatActions.onListenSingleMessage(chatId, massage));
          //   // onSend(massage);
          //   // IN EMIITER ENGARI DARE MOSHEKL:I IJAD MIKONE TU KHUNDABE MESAGE HA
          socket.emit(
            'ReadMessage',
            {messageId: data.data?.payload?._id},
            (res) => {
              console.log('ReadMessage', res);
              if (res?.code !== 200) {
                console.log('FAILED_TO_READ_MESSAGE');
                // dispatch(
                //   AppDataActions.setToastMessages([
                //     {message: Strings.FAILED_TO_READ_MESSAGE},
                //   ]),
                // );
              }
            },
          );
        }
      });
    }
  };

  const upload = async (formData, type) => {
    console.log('upload', formData?._parts[0][1].uri);
    console.log('formDataformData', formData);
    try {
      if (type === 'VIDEO') {
        onSend('', null, null, formData?._parts[0][1].uri);
      } else if (type === 'PICTURE') {
        onSend('', formData?._parts[0][1].uri);
      } else if (type === 'PDF') {
        onSend('', null, null, null, formData?._parts[0][1].uri);
      }
    } catch (error) {
      console.log('uploadFile Error', error);
    }
  };

  const onCloseModalImageType = () => {
    setImageTypeModalVisible(false);
  };

  const onOpenModalImageType = () => {
    setImageTypeModalVisible(true);
  };

  const onSend = (text, image, audio, video, pdf) => {
    const message = {
      text: text,
      image,
      audio,
      video,
      pdf,
      local_path: image || audio || null,
      user: {
        _id: _id,
        name: firstName,
        avatar:
          userType === 'STUDENT'
            ? 'https://d18f4ioombpixl.cloudfront.net/public_asset/images/f92ebd03-14de-478f-af02-9b20ca08133b.jpeg'
            : imageUser?.path,
      },
      sent: true,
      received: true,
      status: isConnectedNetwork ? 0 : text && text.length ? 3 : 2,
    };
    if (text && text.length) {
      message.status = 1;
      console.log('targetUserId', targetUserId);
      dispatch(
        UserChatActions.handleNewTextMessage(chatId, message, targetUserId),
      );
    } else if (image) {
      dispatch(
        UserChatActions.handleNewImageMessage(chatId, message, targetUserId),
      );
    } else if (audio) {
      dispatch(
        UserChatActions.handleNewAudioMessage(chatId, message, targetUserId),
      );
    } else if (video) {
      dispatch(
        UserChatActions.handleNewVideoMessage(chatId, message, targetUserId),
      );
    } else if (pdf) {
      dispatch(
        UserChatActions.handleNewPdfMessage(chatId, message, targetUserId),
      );
    }
    // console.log({messages});
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, message),
    // );
  };

  const isTyping = status?.status === '1' ? true : false;

  return (
    <View style={{flex: 1}} {...{navigation}}>
      <Header
        {...{navigation, isTyping, isChat: true}}
        {...{image}}
        backListener={backActionHandler}
        title={firstName}
      />
      <MemorizeChatRoom
        {...{
          cacheChat,
          chatId,
          type,
          targetUserId,
          targetUser,
          onOpenModalImageType,
          onSend,
        }}
      />
      <FooterChat
        {...{
          onSendPress: onSend,
          socket,
          chatId,
          targetUserId,
          onPickImage: onOpenModalImageType,
          type,
          // onDelete,
        }}
      />
      <ImagePickerModal
        visible={imageTypeModalVisible}
        close={onCloseModalImageType}
        upload={upload}
        includeVideo
        includePdf
      />
    </View>
  );
};

export default ChatScreen;
