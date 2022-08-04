import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {UserChatTypes} from './Actions';

const setMatchesSuccess = (state, {matches}) => ({
  ...state,
  userMatches: matches,
});
const updateMatches = (state, {matches, reactedMatches}) => ({
  ...state,
  reactedMatches,
  // userMatches: matches,
});
const onFailure = (state, {error}) => ({
  ...state,
  error: error,
  loading: false,
});

const setUserChats = (state, {chats}) => ({
  ...state,
  userChats: chats,
});

const setOffset = (state, {offset}) => ({
  ...state,
  offset,
});

const getSupportChatSuccess = (state, {data}) => ({
  ...state,
  supportChat: data,
});
const setChatRoomData = (state, {data}) => ({
  ...state,
  chatRoomData: data,
});
const updateBlockedChats = (state, {data}) => ({
  ...state,
  blockedChats: data,
});
const resetChat = (state) => ({
  ...INITIAL_STATE,
});

const handleTextMessageSuccess = (state, {currentTextMessage}) => ({
  ...state,
  currentTextMessage,
});
const handleTextMessageFailed = (state, {errorTextMessage}) => ({
  ...state,
  errorTextMessage,
});

const handleImageMessageSuccess = (state, {currentImageMessage}) => ({
  ...state,
  currentImageMessage,
});
const handleImageMessageFailed = (state, {errorImageMessage}) => ({
  ...state,
  errorImageMessage,
});

const handleAudioMessageSuccess = (state, {currentAudioMessage}) => ({
  ...state,
  currentAudioMessage,
});
const handleAudioMessageFailed = (state, {errorAudioMessage}) => ({
  ...state,
  errorAudioMessage,
});
const handleVideoMessageSuccess = (state, {currentVideoMessage}) => ({
  ...state,
  currentVideoMessage,
});
const handleVideoMessageFailed = (state, {errorVideoMessage}) => ({
  ...state,
  errorVideoMessage,
});
const handlePdfMessageSuccess = (state, {currentPdfMessage}) => ({
  ...state,
  currentPdfMessage,
});
const handlePdfMessageFailed = (state, {errorPdfMessage}) => ({
  ...state,
  errorPdfMessage,
});

const addCacheChat = (state, {chat}) => ({
  ...state,
  cacheChats: state.cacheChats.find((el) => el.chatId === chat.chatId)
    ? state.cacheChats.map((item) => {
        if (item.chatId === chat.chatId) {
          return chat;
        }
        return item;
      })
    : [...state.cacheChats, {...chat}],
});

const updateCacheChats = (state, {chats}) => ({
  ...state,
  cacheChats: chats,
});

export const reducer = createReducer(INITIAL_STATE, {
  [UserChatTypes.USER_MATCHES_SUCCESS]: setMatchesSuccess,
  [UserChatTypes.UPDATE_USER_MATCHES]: updateMatches,
  [UserChatTypes.USER_CHATS]: setUserChats,
  [UserChatTypes.SET_OFFSET]: setOffset,
  [UserChatTypes.GET_SUPPORT_CHAT_SUCCESS]: getSupportChatSuccess,
  [UserChatTypes.UPDATE_CHAT_ROOM_DATA]: setChatRoomData,
  [UserChatTypes.RESET_CHAT]: resetChat,
  [UserChatTypes.ON_FAILURE]: onFailure,
  [UserChatTypes.UPDATE_BLOCKED_CHATS]: updateBlockedChats,

  [UserChatTypes.HANDLE_TEXT_MESSAGE_SUCCESS]: handleTextMessageSuccess,
  [UserChatTypes.HANDLE_TEXT_MESSAGE_FAILED]: handleTextMessageFailed,

  [UserChatTypes.HANDLE_IMAGE_MESSAGE_SUCCESS]: handleImageMessageSuccess,
  [UserChatTypes.HANDLE_IMAGE_MESSAGE_FAILED]: handleImageMessageFailed,

  [UserChatTypes.HANDLE_AUDIO_MESSAGE_SUCCESS]: handleAudioMessageSuccess,
  [UserChatTypes.HANDLE_AUDIO_MESSAGE_FAILED]: handleAudioMessageFailed,

  [UserChatTypes.HANDLE_VIDEO_MESSAGE_SUCCESS]: handleVideoMessageSuccess,
  [UserChatTypes.HANDLE_VIDEO_MESSAGE_FAILED]: handleVideoMessageFailed,

  [UserChatTypes.HANDLE_PDF_MESSAGE_SUCCESS]: handlePdfMessageSuccess,
  [UserChatTypes.HANDLE_PDF_MESSAGE_FAILED]: handlePdfMessageFailed,

  [UserChatTypes.ADD_CACHE_CHAT]: addCacheChat,
  [UserChatTypes.UPDATE_CACHE_CHATS]: updateCacheChats,
});
