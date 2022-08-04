import {createActions} from 'reduxsauce';
const {Types, Creators} = createActions({
  userMatches: ['match'],
  updateUserMatches: ['matches', 'reactedMatches'],
  userMatchesSuccess: ['matches'],
  userUnMatches: ['match'],
  manageMatches: ['match'],
  userChats: ['chats'],
  getUserChats: ['options'],
  setOffset: ['offset'],
  emitChatOffset: null,
  updateUserChatByOffset: ['chats'],
  getUserMatches: ['offset'],
  getUserChatSuccess: ['matches'],
  getSupportChat: ['data'],
  getSupportChatSuccess: ['data'],
  manageChatRoomData: ['chatId', 'total'],
  updateChatRoomData: ['data'],
  onListenSingleMessage: ['chatId', 'message'],
  deleteChat: ['chatId', 'targetUserId'],
  reportUser: ['data'],
  blockUser: ['data'],
  resetChat: null,
  blockedChats: ['data'],
  updateBlockedChats: ['data'],
  manageBlockedChats: ['data'],
  onVideoCall: ['videoCall'],
  incomingVideoCall: ['videoCall'],
  startVideoCall: ['callData'],
  declineVideoCall: ['callData'],
  onFailure: ['error'],

  handleNewTextMessage: ['chatId', 'message', 'targetUserId'],
  handleFailedTextMessage: ['chatId', 'message', 'targetUserId'],
  handleTextMessageSuccess: ['currentTextMessage'],
  handleTextMessageFailed: ['errorTextMessage'],

  handleNewImageMessage: ['chatId', 'message', 'targetUserId'],
  handleFailedImageMessage: ['chatId', 'message', 'targetUserId'],
  handleImageMessageSuccess: ['currentImageMessage'],
  handleImageMessageFailed: ['errorImageMessage'],

  handleNewAudioMessage: ['chatId', 'message', 'targetUserId'],
  handleFailedAudioMessage: ['chatId', 'message', 'targetUserId'],
  handleAudioMessageSuccess: ['currentAudioMessage'],
  handleAudioMessageFailed: ['errorAudioMessage'],

  handleNewVideoMessage: ['chatId', 'message', 'targetUserId'],
  handleFailedVideoMessage: ['chatId', 'message', 'targetUserId'],
  handleVideoMessageSuccess: ['currentVideoMessage'],
  handleVideoMessageFailed: ['errorVideoMessage'],

  handleNewPdfMessage: ['chatId', 'message', 'targetUserId'],
  handleFailedPdfMessage: ['chatId', 'message', 'targetUserId'],
  handlePdfMessageSuccess: ['currentPdfMessage'],
  handlePdfMessageFailed: ['errorPdfMessage'],

  addCacheChat: ['chat'],
  updateCacheChats: ['chats'],
});

export const UserChatTypes = Types;
export default Creators;
