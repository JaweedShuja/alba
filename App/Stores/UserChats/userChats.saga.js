import {delay, put, call, select, all, takeLatest} from 'redux-saga/effects';
import {Keyboard} from 'react-native';
import UserChatActions from '../UserChats/Actions';
const defaultOffset = {
  offset: 1,
  limit: 10,
  orderType: -1,
};
import GET from '../../Api/GET';
import {Alert} from 'react-native';
import POST from '../../Api/POST';
import {
  findChat,
  saveChats,
  defineMissedChats,
  saveMessage,
  chatObjectGenerator,
  getMessagesByChatId,
  defineMissedMessages,
  updateMessage,
  deleteChatByIdDB,
} from '../../Database/DBActions';
import AppDataActions from '../AppData/Actions';
import {UserChatTypes} from './Actions';
import {store} from '../../App';
import Strings from '../../Values/Strings';
const TIME_OUT = 'TIME_OUT';
import {uploadFile} from 'App/utils/uploadFile';
import {isIOS} from '../../Theme/Metrics';

export function* getUserChatsSaga(data) {
  console.log('GET USER CHATS SAGA', data);
  if (data?.options === 1) {
    try {
      const response = yield GET.getChats(defaultOffset);
      if (response.data?.code === 200) {
        const {payload} = response.data.data;
        yield put(UserChatActions.userChats(payload));
      }
    } catch (error) {
      console.log({SAGA_ERROR: error});
      yield put(UserChatActions.onFailure('ERROR'));
    }
  }
}

export function* userChatSocket(data) {}

export function* emitChatOffsetSaga(data) {
  console.log('EMIT CHAT SAGA ', data);
  try {
    const offset = yield select((state) => state.userChat.offset);
    const socket = yield select((state) => state.socket?.socket);
    const userId = yield select(
      (state) => state.profile.userProfileData?.userId,
    );
    console.log({offset, userId});
    if (socket) {
      delay(1000);
      socket.emit('GetChats', {
        userId,
        offset: 1,
        limit: offset * 10,
        orderType: -1,
      });
    }
  } catch (error) {
    console.log('emitChatOffsetSaga error', error);
    // yield put(
    //   AppDataActions.setToastMessages([{message: error, type: 'danger'}]),
    // );
    yield put(UserChatActions.onFailure('ERROR'));
  }
}

export function* getUserMatchesSaga({offset}) {
  console.log('OFSSET IN GET USER MATCHES', offset);

  try {
    const offsetData = {
      limit: 10,
      offset,
    };
    const response = yield GET.getMatches(offsetData);

    if (response.data) {
      const payload = response.data?.data?.payload;
      console.log({payload});
      yield put(UserChatActions.updateUserMatches([], payload));
    } else {
      throw new Error('OooOPS MATCHES ERROR ');
    }
  } catch (error) {
    console.log('getUserMatchesSaga error', error);
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: error?.message, type: 'danger'},
    //   ]),
    // );
    yield put(UserChatActions.onFailure(error?.message));
  }
}

export function* userUnMatchesSaga({match}) {
  try {
    let reactedMatches = yield select(
      (state) => state.userChat?.reactedMatches,
    );
    let userMatches = yield select((state) => state.userChat?.userMatches);
    reactedMatches = reactedMatches.filter((el, index) => {
      return el?._id !== match?.payload?.matchId;
    });
    userMatches = userMatches.filter((el, index) => {
      return el?._id !== match?.payload?.matchId;
    });
    yield put(UserChatActions.updateUserMatches([], reactedMatches));
    yield put(UserChatActions.userMatchesSuccess(userMatches));
    yield put(
      UserChatActions.deleteChat(
        match?.payload?.chatId,
        match?.payload?.targetUserId,
      ),
    );
  } catch (error) {
    Alert.alert('ERROR IN UnMATCH');
  }
}

// CHATS BY OFFSET
export function* updateChatByOffsetSaga(data) {
  const type = 'GetChats';
  const offset = yield select((state) => state.userChat.offset);

  const chatsOptions = {
    offset: 1,
    limit: offset * 10,
    orderType: -1,
  };
  try {
    const res = yield emitter({type, option: chatsOptions});
    console.log('RES_CHAT', res);

    let chats = res.data.payload;
    const userId = yield select(
      (state) => state.profile?.userProfileData?.userId,
    );
    chats = chats.map((item) => {
      // if (item?.type === Strings.MessageTypes.REPLAYEPISODE) {
      //   if (item?.initiatedBy === userId) {
      //     return {
      //       ...item,
      //       type: Strings.MessageTypes.REPLAYEPISODE,
      //     };
      //   } else {
      //     return item;
      //   }
      // } else {
      return item;
      // }
    });

    if (res.code === 200) {
      yield put(UserChatActions.userChats(chats));
      try {
        const isExist = yield defineMissedChats(chats);
        console.log({isExist});
      } catch (error) {
        // @TODO
        console.log('ADD CHAT IN DATABASE FAILED', error);
        // yield put(
        //   AppDataActions.setToastMessages([
        //     {message: 'ADD CHAT IN DATABASE FAILED', type: 'danger'},
        //   ]),
        // );

        // yield saveChats(res.data.payload[0]);
      }
    } else {
    }
  } catch (error) {
    console.log({GET_CHAT_ERROR: error});
    yield put(UserChatActions.onFailure('ERROR'));
  }
}

// SUPPORT CHAT
export function* getSupportChat(data) {
  const type = 'GetSupport';
  console.log({data});
  const socket = yield select((state) => state.socket?.socket);

  try {
    if (socket) {
      const res = yield emitter({type});
      console.log({CHAT_SUPPORT: res});
      // console.log({resEmit});
      if (res.code === 200) {
        yield put(UserChatActions.getSupportChatSuccess(res?.data?.payload));
      } else {
        throw new Error('SUPPORT CHAT 411');
      }
    }
  } catch (error) {
    yield put(
      AppDataActions.setToastMessages([
        {message: 'SUPPORT CHAT FAILED', type: 'danger'},
      ]),
    );
    yield put(UserChatActions.onFailure('ERROR'));
  }
}
// GET MESSAGES
// IT IS UNUSABLE CAUSE I HANDLE IT IN CHAT SCREEN
export function* getMessagesSaga({offset, chatId}) {
  const type = 'GetMessages';
  const socket = yield select((state) => state.socket?.socket);
  try {
    if (socket) {
      const res = yield emitter({type, option: {chatId}});

      console.log({res});

      if (res.code === 200) {
        //DO LOGIC
      } else {
        throw new Error('SUPPORT CHAT 411');
      }
    } else {
      console.log('OCKET NOT INITIATED');
      // yield put(
      //   AppDataActions.setToastMessages([
      //     {message: 'SOCKET NOT INITIATED', type: 'danger'},
      //   ]),
      // );
    }
  } catch (error) {
    console.log('getMessagesSaga error', error);
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'SUPPORT CHAT FAILED', type: 'danger'},
    //   ]),
    // );
    yield put(UserChatActions.onFailure('ERROR'));
  }
}
export function* chatRoomDataSaga({chatId, total}) {
  try {
    console.log('CHAT ID IN SAGA ', chatId);
    const {firstName, _id} = yield select(
      (state) => state.auth?.userProfileData,
    );
    const userId = _id;

    const DBMessages = yield getMessagesByChatId(chatId);
    console.log('DBMessages length', DBMessages.length);
    // Filter failed message from DBMessages for fix 413 error code
    const CountFailedMessages = DBMessages.filter(
      (item) => item.status !== 1,
    ).length;
    console.log('CountFailedMessages length', CountFailedMessages);

    const difference = total + CountFailedMessages - DBMessages.length;

    console.log({difference, total});

    if (difference) {
      const type = 'GetMessages';
      const offset = {
        chatId,
        offset: 1,
        limit: difference,
      };
      const userName = firstName;
      const res = yield emitter({type, option: offset});
      if (res.code === 200) {
        console.log('CHAT ROOM  UPDATING CHAT', res);
        const data = res.data.payload;
        const insertMessagesToDb = yield defineMissedMessages(
          data,
          userId,
          userName,
          null,
          chatId,
        );
        console.log({insertMessagesToDb});
      } else {
        console.log(`GET MESSAGES ${res}`);
        // yield put(
        //   AppDataActions.setToastMessages([
        //     {message: `GET MESSAGES ${res.code}`, type: 'danger'},
        //   ]),
        // );
      }
    } else {
      console.log('CHAT ROOM  UPDATING CHAT no new messages');
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.onFailure('ERROR'));
  }
}

export function* onListenSingleMessageSaga({chatId, message}) {
  console.log('SINGLE MESSAGE UPDATE SAGA', chatId, message);

  try {
    const textObj = chatObjectGenerator(message, chatId);
    const saveToDB = yield saveMessage(textObj);
    console.log({saveToDB});
  } catch (error) {
    console.log('error', error);
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN UPDATE SINGLE MESSAGE', type: 'danger'},
    //   ]),
    // );
    yield put(UserChatActions.onFailure('ERROR'));
  }
}

export function* handleNewTextMessageSaga({chatId, message, targetUserId}) {
  console.log('NEW TEXT MESSAGE SAGA', chatId, message);
  try {
    const currentMessage = chatObjectGenerator(message, chatId);
    const saveToDB = yield saveMessage(currentMessage);
    console.log({saveToDB});
    const type = 'Message';
    const option = {
      sender: currentMessage.user?._id,
      receiver: targetUserId,
      chat: chatId,
      message: currentMessage?.text,
      type: 'TEXT',
    };
    const emitResult = yield emitter({type, option});
    console.log({emitResult});
    if (emitResult.code === 200) {
      currentMessage.text = currentMessage?.text;
      currentMessage.sent = true;
      currentMessage.received = true;
      currentMessage.status = 1;
      const updateChat = yield updateMessage(
        currentMessage,
        currentMessage._id,
      );
      yield put(UserChatActions.handleTextMessageSuccess(currentMessage.text));
      yield put(UserChatActions.updateUserChatByOffset());
      console.log({updateChat});
    } else {
      currentMessage.text = currentMessage?.text;
      currentMessage.sent = false;
      currentMessage.received = false;
      currentMessage.status = 3;
      const updateChat = yield updateMessage(
        currentMessage,
        currentMessage._id,
      );
      console.log({updateChat});
      yield put(
        UserChatActions.handleTextMessageFailed(JSON.stringify(emitResult)),
      );
      yield put(UserChatActions.updateUserChatByOffset());
      // CustomAlert.show('FAILED SEND TEXT MESSAGE', JSON.stringify(emitResult));
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handleTextMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // CustomAlert.show('FAILED SEND TEXT MESSAGE', JSON.stringify(error));
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN NEW TEXT MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}

export function* handleFailedTextMessageSaga({chatId, message, targetUserId}) {
  console.log('FAILED TEXT MESSAGE SAGA', chatId, message);
  try {
    const currentMessage = {
      _id: message?._id,
      user: message?.user,
      text: message?.text,
    };
    const type = 'Message';
    const option = {
      sender: currentMessage.user?._id,
      receiver: targetUserId,
      chat: chatId,
      message: currentMessage?.text,
      type: 'TEXT',
    };
    const emitResult = yield emitter({type, option});
    console.log({emitResult});
    if (emitResult.code === 200) {
      currentMessage.text = currentMessage?.text;
      currentMessage.sent = true;
      currentMessage.received = true;
      currentMessage.status = 1;
      const updateChat = yield updateMessage(
        currentMessage,
        currentMessage._id,
      );
      console.log({updateChat});
      yield put(UserChatActions.handleTextMessageSuccess(currentMessage.text));
      yield put(UserChatActions.updateUserChatByOffset());
    } else {
      currentMessage.text = currentMessage?.text;
      currentMessage.sent = false;
      currentMessage.received = false;
      currentMessage.status = 3;
      const updateChat = yield updateMessage(
        currentMessage,
        currentMessage._id,
      );
      console.log({updateChat});
      yield put(
        UserChatActions.handleTextMessageFailed(JSON.stringify(emitResult)),
      );
      yield put(UserChatActions.updateUserChatByOffset());
      // CustomAlert.show('FAILED SEND TEXT MESSAGE', JSON.stringify(emitResult));
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handleTextMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // CustomAlert.show('FAILED SEND TEXT MESSAGE', JSON.stringify(error));
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN UPDATE SINGLE TEXT', type: 'danger'},
    //   ]),
    // );
  }
}

export function* handleNewImageMessageSaga({chatId, message, targetUserId}) {
  console.log('NEW IMAGE MESSAGE SAGA', chatId, message);
  try {
    const currentMessage = chatObjectGenerator(message, chatId);
    console.log({currentMessage});
    const saveToDB = yield saveMessage(currentMessage);
    console.log({saveToDB});
    const files = {
      name: currentMessage._id + '.jpg',
      type: 'image/jpeg',
      uri: currentMessage.image,
    };
    console.log({files});
    const formData = new FormData();
    formData.append('file', files);
    const uploadResult = yield uploadFile(formData);
    console.log('uploadResult', uploadResult);
    if (uploadResult.code === 200) {
      const image = uploadResult.data?.payload;
      const type = 'Message';
      const option = {
        sender: currentMessage.user?._id,
        receiver: targetUserId,
        chat: chatId,
        message: '',
        image: image?._id,
        type: 'PICTURE',
      };
      const emitResult = yield emitter({type, option});
      console.log({emitResult});
      if (emitResult.code === 200) {
        currentMessage.image = image;
        currentMessage.received = true;
        currentMessage.sent = true;
        currentMessage.status = 1;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleImageMessageSuccess(currentMessage.image),
        );
        yield put(UserChatActions.updateUserChatByOffset());
      } else {
        currentMessage.image = image;
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 3;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleImageMessageFailed(JSON.stringify(emitResult)),
        );
        // CustomAlert.show(
        //   'FAILED SEND IMAGE MESSAGE',
        //   JSON.stringify(emitResult),
        // );
        yield put(UserChatActions.updateUserChatByOffset());
      }
    } else {
      currentMessage.received = false;
      currentMessage.sent = false;
      currentMessage.status = 2;
      const updateChat = yield updateMessage(
        currentMessage,
        currentMessage._id,
      );
      console.log({updateChat});
      yield put(
        UserChatActions.handleImageMessageFailed(JSON.stringify(uploadResult)),
      );
      yield put(UserChatActions.updateUserChatByOffset());
      // CustomAlert.show(
      //   'FAILED UPLOAD IMAGE MESSAGE',
      //   JSON.stringify(uploadResult),
      // );
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handleImageMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN NEW IMAGE MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}

export function* handleFailedImageMessageSaga({chatId, message, targetUserId}) {
  console.log('FAILED IMAGE MESSAGE SAGA', chatId, message);
  try {
    let currentMessage = message;
    if (message.status === 2) {
      console.log('TRY AGAIN UPLOAD', message);
      currentMessage = {
        _id: currentMessage?._id,
        user: currentMessage?.user,
        image: currentMessage?.image,
        status: 0,
      };
      yield updateMessage(currentMessage, currentMessage._id);
      yield put(UserChatActions.updateUserChatByOffset());
      const files = {
        name: currentMessage._id,
        type: 'image/jpeg',
        uri: currentMessage.image,
      };
      const formData = new FormData();
      formData.append('file', files);
      const uploadResult = yield uploadFile(formData);
      console.log('uploadResult', uploadResult);
      if (uploadResult.code === 200) {
        const image = uploadResult.data?.payload;
        const type = 'Message';
        const option = {
          sender: currentMessage.user?._id,
          receiver: targetUserId,
          chat: chatId,
          message: '',
          image: image?._id,
          type: 'PICTURE',
        };
        const emitResult = yield emitter({type, option});
        console.log({emitResult});
        if (emitResult.code === 200) {
          currentMessage.image = image;
          currentMessage.received = true;
          currentMessage.sent = true;
          currentMessage.status = 1;
          const updateChat = yield updateMessage(
            currentMessage,
            currentMessage._id,
          );
          console.log({updateChat});
          yield put(
            UserChatActions.handleImageMessageSuccess(currentMessage.image),
          );
          yield put(UserChatActions.updateUserChatByOffset());
        } else {
          currentMessage.image = image;
          currentMessage.received = false;
          currentMessage.sent = false;
          currentMessage.status = 3;
          const updateChat = yield updateMessage(
            currentMessage,
            currentMessage._id,
          );
          console.log({updateChat});
          yield put(
            UserChatActions.handleImageMessageFailed(
              JSON.stringify(emitResult),
            ),
          );
          yield put(UserChatActions.updateUserChatByOffset());
          // CustomAlert.show(
          //   'FAILED UPLOAD IMAGE MESSAGE',
          //   JSON.stringify(emitResult),
          // );
        }
      } else {
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 2;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleImageMessageFailed(
            JSON.stringify(uploadResult),
          ),
        );
        yield put(UserChatActions.updateUserChatByOffset());
        // CustomAlert.show(
        //   'FAILED UPLOAD IMAGE MESSAGE',
        //   JSON.stringify(uploadResult),
        // );
      }
    } else if (message.status === 3) {
      console.log('TRY AGAIN EMIT', message);
      currentMessage = {
        _id: currentMessage?._id,
        user: currentMessage?.user,
        image: currentMessage?.image,
      };
      const type = 'Message';
      const option = {
        sender: currentMessage.user?._id,
        receiver: targetUserId,
        chat: chatId,
        message: '',
        image: currentMessage?.image?._id,
        type: 'PICTURE',
      };
      const emitResult = yield emitter({type, option});
      console.log({emitResult});
      if (emitResult.code === 200) {
        currentMessage.image = currentMessage?.image;
        currentMessage.received = true;
        currentMessage.sent = true;
        currentMessage.status = 1;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleImageMessageSuccess(currentMessage.image),
        );
        yield put(UserChatActions.updateUserChatByOffset());
      } else {
        currentMessage.image = currentMessage?.image;
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 3;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleImageMessageFailed(JSON.stringify(emitResult)),
        );
        yield put(UserChatActions.updateUserChatByOffset());
        // CustomAlert.show(
        //   'FAILED UPLOAD IMAGE MESSAGE',
        //   JSON.stringify(emitResult),
        // );
      }
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handleImageMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN FAILED IMAGE MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}

export function* handleNewAudioMessageSaga({chatId, message, targetUserId}) {
  console.log('NEW AUDIO MESSAGE SAGA', chatId, message);
  try {
    const currentMessage = chatObjectGenerator(message, chatId);
    const saveToDB = yield saveMessage(currentMessage);
    console.log({saveToDB});
    const files = {
      name: currentMessage._id + '.mp3',
      type: 'audio/aac',
      uri: currentMessage.audio,
    };
    const formData = new FormData();
    formData.append('file', files);
    const uploadResult = yield uploadFile(formData, isIOS && 'AUDIO');
    console.log('uploadResult', uploadResult);
    if (uploadResult.code === 200) {
      const audio = uploadResult.data?.payload;
      const type = 'Message';
      const option = {
        sender: currentMessage.user?._id,
        receiver: targetUserId,
        chat: chatId,
        message: '',
        audio: audio?._id,
        type: 'AUDIO',
      };
      const emitResult = yield emitter({type, option});
      console.log({emitResult});
      if (emitResult.code === 200) {
        currentMessage.audio = audio;
        currentMessage.received = true;
        currentMessage.sent = true;
        currentMessage.status = 1;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleAudioMessageSuccess(currentMessage.audio),
        );
        yield put(UserChatActions.updateUserChatByOffset());
      } else {
        currentMessage.audio = audio;
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 3;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleAudioMessageFailed(JSON.stringify(emitResult)),
        );
        // CustomAlert.show(
        //   'FAILED SEND AUDIO MESSAGE',
        //   JSON.stringify(emitResult),
        // );
        yield put(UserChatActions.updateUserChatByOffset());
      }
    } else {
      currentMessage.received = false;
      currentMessage.sent = false;
      currentMessage.status = 2;
      const updateChat = yield updateMessage(
        currentMessage,
        currentMessage._id,
      );
      console.log({updateChat});
      yield put(
        UserChatActions.handleAudioMessageFailed(JSON.stringify(uploadResult)),
      );
      yield put(UserChatActions.updateUserChatByOffset());
      // CustomAlert.show(
      //   'FAILED UPLOAD AUDIO MESSAGE',
      //   JSON.stringify(uploadResult),
      // );
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handleAudioMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN NEW AUDIO MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}

export function* handleFailedAudioMessageSaga({chatId, message, targetUserId}) {
  console.log('FAILED AUDIO MESSAGE SAGA', chatId, message);
  try {
    let currentMessage = message;
    if (message.status === 2) {
      console.log('TRY AGAIN UPLOAD', message);
      currentMessage = {
        _id: currentMessage?._id,
        user: currentMessage?.user,
        audio: currentMessage?.audio,
        status: 0,
      };
      yield updateMessage(currentMessage, currentMessage._id);
      yield put(UserChatActions.updateUserChatByOffset());
      const files = {
        name: currentMessage._id,
        type: 'audio/aac',
        uri: currentMessage.audio,
      };
      const formData = new FormData();
      formData.append('file', files);
      const uploadResult = yield uploadFile(formData);
      console.log('uploadResult', uploadResult);
      if (uploadResult.code === 200) {
        const audio = uploadResult.data?.payload;
        const type = 'Message';
        const option = {
          sender: currentMessage.user?._id,
          receiver: targetUserId,
          chat: chatId,
          message: '',
          audio: audio?._id,
          type: 'AUDIO',
        };
        const emitResult = yield emitter({type, option});
        console.log({emitResult});
        if (emitResult.code === 200) {
          currentMessage.audio = audio;
          currentMessage.received = true;
          currentMessage.sent = true;
          currentMessage.status = 1;
          const updateChat = yield updateMessage(
            currentMessage,
            currentMessage._id,
          );
          console.log({updateChat});
          yield put(
            UserChatActions.handleAudioMessageSuccess(currentMessage.audio),
          );
          yield put(UserChatActions.updateUserChatByOffset());
        } else {
          currentMessage.audio = audio;
          currentMessage.received = false;
          currentMessage.sent = false;
          currentMessage.status = 3;
          const updateChat = yield updateMessage(
            currentMessage,
            currentMessage._id,
          );
          console.log({updateChat});
          yield put(
            UserChatActions.handleAudioMessageFailed(
              JSON.stringify(emitResult),
            ),
          );
          yield put(UserChatActions.updateUserChatByOffset());
          // CustomAlert.show(
          //   'FAILED UPLOAD AUDIO MESSAGE',
          //   JSON.stringify(emitResult),
          // );
        }
      } else {
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 2;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleAudioMessageFailed(
            JSON.stringify(uploadResult),
          ),
        );
        yield put(UserChatActions.updateUserChatByOffset());
        // CustomAlert.show(
        //   'FAILED UPLOAD AUDIO MESSAGE',
        //   JSON.stringify(uploadResult),
        // );
      }
    } else if (message.status === 3) {
      console.log('TRY AGAIN EMIT', message);
      currentMessage = {
        _id: currentMessage?._id,
        user: currentMessage?.user,
        audio: currentMessage?.audio,
      };
      const type = 'Message';
      const option = {
        sender: currentMessage.user?._id,
        receiver: targetUserId,
        chat: chatId,
        message: '',
        audio: currentMessage?.audio?._id,
        type: 'AUDIO',
      };
      const emitResult = yield emitter({type, option});
      console.log({emitResult});
      if (emitResult.code === 200) {
        currentMessage.audio = currentMessage?.audio;
        currentMessage.received = true;
        currentMessage.sent = true;
        currentMessage.status = 1;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleAudioMessageSuccess(currentMessage.audio),
        );
        yield put(UserChatActions.updateUserChatByOffset());
      } else {
        currentMessage.audio = currentMessage?.audio;
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 3;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleAudioMessageFailed(JSON.stringify(emitResult)),
        );
        yield put(UserChatActions.updateUserChatByOffset());
        // CustomAlert.show(
        //   'FAILED UPLOAD AUDIO MESSAGE',
        //   JSON.stringify(emitResult),
        // );
      }
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handleAudioMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN FAILED AUDIO MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}

export function* handleNewVideoMessageSaga({chatId, message, targetUserId}) {
  console.log('NEW Video MESSAGE SAGA', chatId, message);
  try {
    const currentMessage = chatObjectGenerator(message, chatId);
    console.log({currentMessage});
    const saveToDB = yield saveMessage(currentMessage);
    console.log({saveToDB});
    const files = {
      name: currentMessage._id + '.mp4',
      type: 'video/mp4',
      uri: currentMessage.video,
    };
    const formData = new FormData();
    formData.append('file', files);
    console.log('videosaga', formData);
    const uploadResult = yield uploadFile(formData, isIOS && 'VIDEO');
    console.log('uploadResult', uploadResult);
    if (uploadResult.code === 200) {
      const video = uploadResult.data?.payload;
      const type = 'Message';
      const option = {
        sender: currentMessage.user?._id,
        receiver: targetUserId,
        chat: chatId,
        message: '',
        video: video?._id,
        type: 'VIDEO',
      };
      const emitResult = yield emitter({type, option});
      console.log({emitResult});
      if (emitResult.code === 200) {
        currentMessage.video = video;
        currentMessage.received = true;
        currentMessage.sent = true;
        currentMessage.status = 1;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleVideoMessageSuccess(currentMessage.video),
        );
        yield put(UserChatActions.updateUserChatByOffset());
      } else {
        currentMessage.video = video;
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 3;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleVideoMessageFailed(JSON.stringify(emitResult)),
        );
        // CustomAlert.show(
        //   'FAILED SEND AUDIO MESSAGE',
        //   JSON.stringify(emitResult),
        // );
        yield put(UserChatActions.updateUserChatByOffset());
      }
    } else {
      currentMessage.received = false;
      currentMessage.sent = false;
      currentMessage.status = 2;
      const updateChat = yield updateMessage(
        currentMessage,
        currentMessage._id,
      );
      console.log({updateChat});
      yield put(
        UserChatActions.handleVideoMessageFailed(JSON.stringify(uploadResult)),
      );
      yield put(UserChatActions.updateUserChatByOffset());
      // CustomAlert.show(
      //   'FAILED UPLOAD AUDIO MESSAGE',
      //   JSON.stringify(uploadResult),
      // );
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handleVideoMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN NEW AUDIO MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}

export function* handleFailedVideoMessageSaga({chatId, message, targetUserId}) {
  console.log('FAILED Video MESSAGE SAGA', chatId, message);
  try {
    let currentMessage = message;
    if (message.status === 2) {
      console.log('TRY AGAIN UPLOAD', message);
      currentMessage = {
        _id: currentMessage?._id,
        user: currentMessage?.user,
        video: currentMessage?.video,
        status: 0,
      };
      yield updateMessage(currentMessage, currentMessage._id);
      yield put(UserChatActions.updateUserChatByOffset());
      const files = {
        name: currentMessage._id + 'mp4',
        type: 'video/mp4',
        uri: currentMessage.video,
      };
      const formData = new FormData();
      formData.append('file', files);
      const uploadResult = yield uploadFile(formData);
      console.log('uploadResult', uploadResult);
      if (uploadResult.code === 200) {
        const video = uploadResult.data?.payload;
        const type = 'Message';
        const option = {
          sender: currentMessage.user?._id,
          receiver: targetUserId,
          chat: chatId,
          message: '',
          video: video?._id,
          type: 'VIDEO',
        };
        const emitResult = yield emitter({type, option});
        console.log({emitResult});
        if (emitResult.code === 200) {
          currentMessage.video = video;
          currentMessage.received = true;
          currentMessage.sent = true;
          currentMessage.status = 1;
          const updateChat = yield updateMessage(
            currentMessage,
            currentMessage._id,
          );
          console.log({updateChat});
          yield put(
            UserChatActions.handleVideoMessageSuccess(currentMessage.video),
          );
          yield put(UserChatActions.updateUserChatByOffset());
        } else {
          currentMessage.video = video;
          currentMessage.received = false;
          currentMessage.sent = false;
          currentMessage.status = 3;
          const updateChat = yield updateMessage(
            currentMessage,
            currentMessage._id,
          );
          console.log({updateChat});
          yield put(
            UserChatActions.handleVideoMessageFailed(
              JSON.stringify(emitResult),
            ),
          );
          yield put(UserChatActions.updateUserChatByOffset());
          // CustomAlert.show(
          //   'FAILED UPLOAD AUDIO MESSAGE',
          //   JSON.stringify(emitResult),
          // );
        }
      } else {
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 2;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleVideoMessageFailed(
            JSON.stringify(uploadResult),
          ),
        );
        yield put(UserChatActions.updateUserChatByOffset());
        // CustomAlert.show(
        //   'FAILED UPLOAD AUDIO MESSAGE',
        //   JSON.stringify(uploadResult),
        // );
      }
    } else if (message.status === 3) {
      console.log('TRY AGAIN EMIT', message);
      currentMessage = {
        _id: currentMessage?._id,
        user: currentMessage?.user,
        video: currentMessage?.video,
      };
      const type = 'Message';
      const option = {
        sender: currentMessage.user?._id,
        receiver: targetUserId,
        chat: chatId,
        message: '',
        video: currentMessage?.video?._id,
        type: 'VIDEO',
      };
      const emitResult = yield emitter({type, option});
      console.log({emitResult});
      if (emitResult.code === 200) {
        currentMessage.video = currentMessage?.video;
        currentMessage.received = true;
        currentMessage.sent = true;
        currentMessage.status = 1;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleVideoMessageSuccess(currentMessage.video),
        );
        yield put(UserChatActions.updateUserChatByOffset());
      } else {
        currentMessage.video = currentMessage?.video;
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 3;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handleVideoMessageFailed(JSON.stringify(emitResult)),
        );
        yield put(UserChatActions.updateUserChatByOffset());
        // CustomAlert.show(
        //   'FAILED UPLOAD AUDIO MESSAGE',
        //   JSON.stringify(emitResult),
        // );
      }
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handleVideoMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN FAILED AUDIO MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}
export function* handleNewPdfMessageSaga({chatId, message, targetUserId}) {
  console.log('NEW Pdf MESSAGE SAGA', chatId, message);
  try {
    const currentMessage = chatObjectGenerator(message, chatId);
    console.log({currentMessage});
    const saveToDB = yield saveMessage(currentMessage);
    console.log({saveToDB});
    const files = {
      name: currentMessage._id + '.pdf',
      type: 'application/pdf',
      uri: currentMessage.pdf,
    };
    const formData = new FormData();
    formData.append('file', files);
    console.log('sagapdf', formData);
    const uploadResult = yield uploadFile(formData, isIOS && 'PDF');
    console.log('uploadResult', uploadResult);
    if (uploadResult.code === 200) {
      const pdf = uploadResult.data?.payload;
      const type = 'Message';
      const option = {
        sender: currentMessage.user?._id,
        receiver: targetUserId,
        chat: chatId,
        message: '',
        pdf: pdf?._id,
        type: 'PDF',
      };
      const emitResult = yield emitter({type, option});
      console.log({emitResult});
      if (emitResult.code === 200) {
        currentMessage.pdf = pdf;
        currentMessage.received = true;
        currentMessage.sent = true;
        currentMessage.status = 1;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(UserChatActions.handlePdfMessageSuccess(currentMessage.pdf));
        yield put(UserChatActions.updateUserChatByOffset());
      } else {
        currentMessage.pdf = pdf;
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 3;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handlePdfMessageFailed(JSON.stringify(emitResult)),
        );
        // CustomAlert.show(
        //   'FAILED SEND AUDIO MESSAGE',
        //   JSON.stringify(emitResult),
        // );
        yield put(UserChatActions.updateUserChatByOffset());
      }
    } else {
      currentMessage.received = false;
      currentMessage.sent = false;
      currentMessage.status = 2;
      const updateChat = yield updateMessage(
        currentMessage,
        currentMessage._id,
      );
      console.log({updateChat});
      yield put(
        UserChatActions.handlePdfMessageFailed(JSON.stringify(uploadResult)),
      );
      yield put(UserChatActions.updateUserChatByOffset());
      // CustomAlert.show(
      //   'FAILED UPLOAD AUDIO MESSAGE',
      //   JSON.stringify(uploadResult),
      // );
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handlePdfMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN NEW AUDIO MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}

export function* handleFailedPdfMessageSaga({chatId, message, targetUserId}) {
  console.log('FAILED pdf MESSAGE SAGA', chatId, message);
  try {
    let currentMessage = message;
    if (message.status === 2) {
      console.log('TRY AGAIN UPLOAD', message);
      currentMessage = {
        _id: currentMessage?._id,
        user: currentMessage?.user,
        pdf: currentMessage?.pdf,
        status: 0,
      };
      yield updateMessage(currentMessage, currentMessage._id);
      yield put(UserChatActions.updateUserChatByOffset());
      const files = {
        name: currentMessage._id,
        type: 'application/pdf',
        uri: currentMessage.pdf,
      };
      const formData = new FormData();
      formData.append('file', files);
      const uploadResult = yield uploadFile(formData);
      console.log('uploadResult', uploadResult);
      if (uploadResult.code === 200) {
        const pdf = uploadResult.data?.payload;
        const type = 'Message';
        const option = {
          sender: currentMessage.user?._id,
          receiver: targetUserId,
          chat: chatId,
          message: '',
          pdf: pdf?._id,
          type: 'PDF',
        };
        const emitResult = yield emitter({type, option});
        console.log({emitResult});
        if (emitResult.code === 200) {
          currentMessage.pdf = pdf;
          currentMessage.received = true;
          currentMessage.sent = true;
          currentMessage.status = 1;
          const updateChat = yield updateMessage(
            currentMessage,
            currentMessage._id,
          );
          console.log({updateChat});
          yield put(
            UserChatActions.handlePdfMessageSuccess(currentMessage.pdf),
          );
          yield put(UserChatActions.updateUserChatByOffset());
        } else {
          currentMessage.pdf = pdf;
          currentMessage.received = false;
          currentMessage.sent = false;
          currentMessage.status = 3;
          const updateChat = yield updateMessage(
            currentMessage,
            currentMessage._id,
          );
          console.log({updateChat});
          yield put(
            UserChatActions.handlePdfMessageFailed(JSON.stringify(emitResult)),
          );
          yield put(UserChatActions.updateUserChatByOffset());
          // CustomAlert.show(
          //   'FAILED UPLOAD AUDIO MESSAGE',
          //   JSON.stringify(emitResult),
          // );
        }
      } else {
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 2;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handlePdfMessageFailed(JSON.stringify(uploadResult)),
        );
        yield put(UserChatActions.updateUserChatByOffset());
        // CustomAlert.show(
        //   'FAILED UPLOAD AUDIO MESSAGE',
        //   JSON.stringify(uploadResult),
        // );
      }
    } else if (message.status === 3) {
      console.log('TRY AGAIN EMIT', message);
      currentMessage = {
        _id: currentMessage?._id,
        user: currentMessage?.user,
        pdf: currentMessage?.pdf,
      };
      const type = 'Message';
      const option = {
        sender: currentMessage.user?._id,
        receiver: targetUserId,
        chat: chatId,
        message: '',
        pdf: currentMessage?.pdf?._id,
        type: 'PDF',
      };
      const emitResult = yield emitter({type, option});
      console.log({emitResult});
      if (emitResult.code === 200) {
        currentMessage.pdf = currentMessage?.pdf;
        currentMessage.received = true;
        currentMessage.sent = true;
        currentMessage.status = 1;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(UserChatActions.handlePdfMessageSuccess(currentMessage.pdf));
        yield put(UserChatActions.updateUserChatByOffset());
      } else {
        currentMessage.pdf = currentMessage?.pdf;
        currentMessage.received = false;
        currentMessage.sent = false;
        currentMessage.status = 3;
        const updateChat = yield updateMessage(
          currentMessage,
          currentMessage._id,
        );
        console.log({updateChat});
        yield put(
          UserChatActions.handlePdfMessageFailed(JSON.stringify(emitResult)),
        );
        yield put(UserChatActions.updateUserChatByOffset());
        // CustomAlert.show(
        //   'FAILED UPLOAD AUDIO MESSAGE',
        //   JSON.stringify(emitResult),
        // );
      }
    }
  } catch (error) {
    console.log({error});
    yield put(UserChatActions.handlePdfMessageFailed(JSON.stringify(error)));
    yield put(UserChatActions.updateUserChatByOffset());
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'PROBLEM IN FAILED AUDIO MESSAGE SAGA', type: 'danger'},
    //   ]),
    // );
  }
}

export function* deleteChatSaga({chatId, targetUserId}) {
  try {
    const chatRoomData = yield select((state) => state.userChat?.chatRoomData);
    const userChats = yield select((state) => state.userChat?.userChats);
    let cacheChats = yield select((state) => state.userChat?.cacheChats);
    const type = 'DeleteChat';

    const option = {
      chatId,
      targetUserId,
    };
    console.log({option});
    const res = yield emitter({type, option});

    if (res.code === 200) {
      //DO SOMETHING
      yield deleteChatByIdDB(chatId);
      const resDeleteChat = yield deletePropertyInObject(chatRoomData, chatId);
      console.log({resDeleteChat});
      yield put(UserChatActions.updateChatRoomData(resDeleteChat));
      const newChatArray = userChats.filter((item) => item._id !== chatId);
      yield put(UserChatActions.userChats(newChatArray));
      cacheChats = cacheChats.filter((item) => item?.chatId !== chatId);
      yield put(UserChatActions.updateCacheChats(cacheChats));
    } else {
      // yield put(
      //   AppDataActions.setToastMessages([
      //     {message: 'DELETE CHAT EMIT 413', type: 'danger'},
      //   ]),
      // );
    }
    yield put(UserChatActions.updateUserChatByOffset());
  } catch (error) {
    console.log('error', error);
    // yield put(
    //   AppDataActions.setToastMessages([
    //     {message: 'DELETE CHAT HAS PROBLEM', type: 'danger'},
    //   ]),
    // );
    yield put(UserChatActions.onFailure('ERROR'));
  }
}

export function* blockUserSaga({targetUserId}) {
  const type = 'BlockUser';

  try {
    const resBlock = yield emitter({type, option: targetUserId});
    if (resBlock.code === 200) {
      yield put(
        AppDataActions.setToastMessages([
          {message: 'BLOCK CHAT EMIT 413', type: 'danger'},
        ]),
      );
    }
  } catch (error) {
    yield put(UserChatActions.onFailure('ERROR'));
    yield put(
      AppDataActions.setToastMessages([
        {message: 'BLOCK CHAT PROBLEM', type: 'danger'},
      ]),
    );
  }
}

export function* manageBlockSaga({data}) {
  console.log('DATA IN MANAGE CLOCK SAGA', data);
  try {
    const {chatId, blockedStatus} = data;
    const recentBlock = yield select(
      (state) => state.userChat?.blockedChats || [],
    );
    const isExist = recentBlock.some((item) => item?.chatId === chatId);
    console.log({recentBlock, isExist});
    if (blockedStatus !== '0') {
      const newArr = [...recentBlock, {blockedStatus, chatId}];
      console.log({newArr1: newArr});
      if (!isExist) {
        yield put(UserChatActions.updateBlockedChats(newArr));
      }
    } else {
      const newArr = recentBlock.filter((item) => item.chatId !== chatId);
      console.log({newArr});
      yield put(UserChatActions.updateBlockedChats([...newArr]));
    }
  } catch (error) {
    yield put(
      AppDataActions.setToastMessages([
        {message: 'ERROR IN BLOCK MANAGE', type: 'danger'},
      ]),
    );
    yield put(UserChatActions.onFailure('ERROR'));
  }
}

export function* reportUserSaga({data}) {
  try {
    console.log('REPORT USER HAS A PROBLEM reportUserSaga', data);
    yield put(AppDataActions.setScreenLoading(true));
    const res = yield POST.reportUser(data);
    console.log('REPORT USER HAS A PROBLEM res', res);
    if (res?.data?.code !== 200) {
      console.log('REPORT USER HAS A PROBLEM');
    }
    yield put(AppDataActions.setScreenLoading(false));
  } catch (error) {
    console.log('REPORT USER HAS A PROBLEM error', error);
  }
}

// export function
async function emitter({
  socket = store.getState()?.socket?.socket,
  type,
  option,
}) {
  return new Promise((resolve, reject) => {
    let failure = setTimeout(() => {
      // Alert.alert('ERROR IN EMIT');

      return resolve(TIME_OUT);
    }, 6000);
    socket.emit(type, {...option}, (response) => {
      console.log('RES  ON EMIT', response); // ok
      if (response) {
        clearTimeout(failure);
        return resolve(response);
      }
    });
  });
}

function deletePropertyInObject(obj, prop) {
  const newChatroomObject = {
    ...obj,
  };
  delete newChatroomObject[prop];
  return newChatroomObject;
}

export default function* () {
  yield all([
    takeLatest(
      UserChatTypes.UPDATE_USER_CHAT_BY_OFFSET,
      updateChatByOffsetSaga,
    ),
    takeLatest(UserChatTypes.MANAGE_CHAT_ROOM_DATA, chatRoomDataSaga),
    takeLatest(
      UserChatTypes.ON_LISTEN_SINGLE_MESSAGE,
      onListenSingleMessageSaga,
    ),
    takeLatest(UserChatTypes.HANDLE_NEW_TEXT_MESSAGE, handleNewTextMessageSaga),
    takeLatest(
      UserChatTypes.HANDLE_FAILED_TEXT_MESSAGE,
      handleFailedTextMessageSaga,
    ),
    takeLatest(
      UserChatTypes.HANDLE_NEW_IMAGE_MESSAGE,
      handleNewImageMessageSaga,
    ),
    takeLatest(
      UserChatTypes.HANDLE_FAILED_IMAGE_MESSAGE,
      handleFailedImageMessageSaga,
    ),
    takeLatest(
      UserChatTypes.HANDLE_NEW_AUDIO_MESSAGE,
      handleNewAudioMessageSaga,
    ),
    takeLatest(
      UserChatTypes.HANDLE_FAILED_AUDIO_MESSAGE,
      handleFailedAudioMessageSaga,
    ),
    takeLatest(
      UserChatTypes.HANDLE_NEW_VIDEO_MESSAGE,
      handleNewVideoMessageSaga,
    ),
    takeLatest(
      UserChatTypes.HANDLE_FAILED_VIDEO_MESSAGE,
      handleFailedVideoMessageSaga,
    ),
    takeLatest(UserChatTypes.HANDLE_NEW_PDF_MESSAGE, handleNewPdfMessageSaga),
    takeLatest(
      UserChatTypes.HANDLE_FAILED_PDF_MESSAGE,
      handleFailedPdfMessageSaga,
    ),
    takeLatest(UserChatTypes.EMIT_CHAT_OFFSET, emitChatOffsetSaga),
    takeLatest(UserChatTypes.DELETE_CHAT, deleteChatSaga),
  ]);
}
