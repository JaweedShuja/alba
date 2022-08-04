import React, {useState, useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';
import Strings from 'App/Values/Strings';
import {GiftedChat} from 'react-native-gifted-chat';
import PopupsActions from '../../../Stores/PopUps/Actions';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from '../InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderCustomView,
} from '../MessageContainer';
import {
  renderMessageText,
  renderMessageImage,
  renderMessageVideo,
} from '../RenderMessages';
import Loading from 'App/Components/Share/Loading';
import {
  Helpers,
  Metrics,
  Fonts,
  Colors,
  ApplicationStyles,
  FontFamily,
} from 'App/Theme';
import AudioComponent from '../AudioComponent';

import {normal} from 'App/Theme/Metrics';
import withObservables from '@nozbe/with-observables';
import {messagesObserve, observeChats} from '../../../Database/DBActions';
import UserChatsActions from '../../../Stores/UserChats/Actions';
import {useDispatch, useSelector} from 'react-redux';
import FontIcon from '../../CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const Chat = ({
  loadingScreen,
  chats,
  message = [],
  cacheChat,
  chatId,
  type,
  targetUserId,
  targetUser,
  onOpenModalImageType,
  onSend,
}) => {
  const dispatch = useDispatch();
  const [sliceMessages, setSlice] = useState(20);
  const [earlier, setEarlier] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const {_id, firstName, userType} = useSelector(
    (state) => state?.auth?.userProfileData,
  );
  console.log('chats', chats);
  const cacheChatMessages =
    cacheChat && cacheChat?.length > 0 ? cacheChat[0]?.messages : [];
  const totalMassages = message?.length;
  const initiateMessages = message.slice(0, sliceMessages) || [];
  const messagesLength = initiateMessages.length > 18;
  const loadEarlierStatus =
    earlier && messagesLength && totalMassages > sliceMessages;

  const oLoadEarlier = (event) => {
    if (sliceMessages < totalMassages) {
      setSlice((prev) => prev + 20);
    } else {
    }
  };

  const renderMessageAudio = (props) => (
    <AudioComponent props={props} targetUserId={targetUserId} />
  );

  useEffect(() => {
    setTimeout(() => {
      setEarlier(true);
    }, 500);
    setInterval(() => {
      setEarlier(!earlier);
    }, 5000);
    return () => {
      dispatch(
        UserChatsActions.addCacheChat({
          chatId,
          messages: message?.slice(0, 9),
        }),
      );
    };
  }, []);

  const onImageZoom = (image) => {
    // console.log('onImageZoom', image);
    dispatch(
      PopupsActions.showModal(Strings.MODAL_TYPES.IMAGE_VIEWER, {
        images: [{url: image?.path}],
      }),
    );
  };

  const renderScrollToButton = () => {
    return (
      <FontIcon
        name={Strings.Icons.RIGHT_SMALL}
        size={normal * 1.8}
        style={{transform: [{rotate: '90deg'}]}}
      />
    );
  };

  if (loadingScreen) {
    return <Loading />;
  }
  console.log('messageess1', cacheChatMessages);
  console.log('messageess2', message);
  return (
    <GiftedChat
      messages={
        type === Strings.MessageTypes.SUPPORT
          ? []
          : loadingScreen
          ? cacheChatMessages
          : message
      }
      onSend={(messages) => onSend(messages)}
      user={{
        _id: _id,
      }}
      // bottomOffset={260}
      alwaysShowSend={true}
      wrapInSafeArea={true}
      isKeyboardInternallyHandled={false}
      disableComposer={false}
      showAvatarForEveryMessage={false}
      keyboardShouldPersistTaps={'always'}
      keyboardDismissMode="on-drag"
      listViewProps={{
        initialNumToRender: 10,
        removeClippedSubviews: true,
        windowSize: 40,
        keyboardShouldPersistTaps: 'always',
        keyboardDismissMode: 'on-drag',
        style: {
          // backgroundColor: Colors.lightBlue,
          overFlow: 'hidden',
        },
        decelerationRate: 'fast',
      }}
      renderFooter={() => null}
      renderSend={() => null}
      renderInputToolbar={() => null}
      // // {...{renderAvatar}}
      {...{renderBubble}}
      {...{renderSystemMessage}}
      // {...{renderMessage}}
      {...{renderMessageText}}
      {...{renderMessageImage}}
      {...{renderMessageVideo}}
      {...{renderCustomView}}
      {...{renderMessageAudio}}
      {...{targetUserId}}
      {...{onImageZoom}}
      scrollToBottomComponent={renderScrollToButton}
      onLoadEarlier={oLoadEarlier}
      loadEarlier={loadEarlierStatus}
      scrollToBottom={true}
      infiniteScroll
      showUserAvatar={true}
      isAnimated={true}
      // renderAvatar={() => {}}
      renderUsernameOnMessage
      placeholder="Messeage..."
      messagesContainerStyle={styles.messageContainer}
    />
  );
};

const enhance = withObservables(['messages'], ({chatId}) => {
  console.log('chatIdchatId', chatId);
  return {
    chats: observeChats(chatId),
    message: messagesObserve(chatId),
  };
});
export const MemorizeChatRoom = enhance(Chat);
