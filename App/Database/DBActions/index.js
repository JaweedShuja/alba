import database from '../index';
// import logger from '@nozbe/watermelondb/utils/common/logger';
import {Q} from '@nozbe/watermelondb';
import {store} from '../../App';
// logger.
const getCollections = (table) => {
  return database.get(table);
};
const chats = database.collections.get('chats');
export const findChatByID = async (cid) => await chats.find(cid);
console.log('dbMessage', {chats});
const messagesDb = database.collections.get('messages');
export const observeChats = (cid) => chats.query(Q.where('cid', cid)).observe();
export const messagesObserve = (cid) => {
  console.log(
    'database.collections',
    database.collections.get('messages').query(
      Q.where('cid', cid),
      // Q.experimentalSkip(0),
      // Q.experimentalTake(40),
    ),
  );
  return database.collections
    .get('messages')
    .query(
      Q.where('cid', cid),
      Q.experimentalSortBy('created_at', Q.desc),
      // Q.experimentalSkip(0),
      // Q.experimentalTake(40),
    )
    .observe();
};

export const getMessagesByChatId = (cid) =>
  messagesDb.query(Q.where('cid', cid)).fetch();
export const starredPosts = () =>
  messagesDb.query(Q.where('cid', '1')).observe();
export const findChat = async (cid) =>
  await chats.query(Q.where('cid', cid)).fetch();

export const saveChats = async (data) => {
  console.log('dbMessage saveChats', {data});
  await database.action(async () => {
    const CHAT = chats.prepareCreate((entry) => {
      console.log('dbMessage ENTRY', entry);
      entry.cid = data._id;
      // entry.id = data._id;
      entry.count = data.count;
      entry.initiatedBy = data.initiatedBy;
      entry.initiated = data.initiated;
      entry.members = data.members;
      entry.isMatched = data.isMatched;
      entry.type = data.type;
      entry.blockStatus = data.blockedStatus;
      entry.lastMessage = data.lastMessage;
      entry.total = data.total;
      entry.matchId = data.matchId;
    });

    await database.batch(CHAT);
  });
};

export const saveMessage = async (data) => {
  console.log('dbMessage saveMessage', {data});
  await database.action(async () => {
    const MESSAGE = messagesDb.prepareCreate((msg) => {
      console.log('dbMessage2', {msg});
      msg.text = data.text;
      msg.cid = data.cid;
      msg._id = data._id;
      msg.user = data.user;
      msg.image = data.image;
      msg.audio = data.audio;
      msg.video = data.video;
      msg.pdf = data.pdf;
      msg.local_path = data.local_path;
      msg.sent = data.sent;
      msg.received = data.received;
      msg.status = data.status;
      msg.createdAt = data.createdAt;
      msg.chats.id = data.cid;
      msg.id = data.cid;
      msg.type = data?.type;
      msg.episode = data?.episode;

      // msg.chats.set(CHAT);
    });
    console.log({MESSAGE});
    await database.batch(MESSAGE);
  });
};
const saveTonsOfMessages = async (data) => {
  console.log('dbMessage saveTonsOfMessages', data);
  const MESSAGE = messagesDb.prepareCreate((msg) => {
    console.log('dbMessage3', {msg});
    msg.text = data.text;
    msg.cid = data.cid;
    msg._id = data._id;
    msg.user = data.user;
    msg.image = data.image;
    msg.audio = data.audio;
    msg.video = data.video;
    msg.pdf = data.pdf;
    msg.local_path = data.local_path;
    msg.sent = data.sent;
    msg.received = data.received;
    msg.status = data.status;
    msg.createdAt = data.createdAt;
    msg.chats.id = data.cid;
    msg.id = data.cid;
    msg.type = data?.type;
    msg.episode = data?.episode;

    // msg.chats.set(CHAT);
    // });

    // await database.batch(MESSAGE);
  });
  console.log('dbMessage4', {MESSAGE});
  return MESSAGE;
};
export const deleteDatabase = async () => {
  console.log('delete');
  try {
    await database.action(async (action) => {
      // const chat = await chats.create();
      // await action.subAction(() => chat.markAsDeleted());
      await action.subAction(() => database.unsafeResetDatabase());
      // return chat;
    });
  } catch (error) {
    console.log('error delete database', error);
  }
};

/**
 * Update chat in db
 * @param {Number} chatId // chatId
 * @param {object} data // new object of chat
 */
export const updateChat = async (chatId, data) => {
  console.log('dbMessage updateChat', data);
  const chat = await chats.query(Q.where('cid', chatId)).fetch();
  const chatIdTable = chat[0].id;
  const chatRef = await chats.find(chatIdTable);
  await database.action(async () => {
    const UPDATE = chatRef.prepareUpdate((entry) => {
      console.log('dbMessage5', {entry});
      entry.matchId = data.matchId;
      entry.blockedStatus = data.blockedStatus;
      entry.type = data.type;
      entry.count = data.count;
      entry.total = data.total;
      entry.lastMessage = data.lastMessage;
    });
    await database.batch(UPDATE);
  });
};

/**
 * Update message in db
 * @param {object} msg // new object of message
 * @param {Number} id // messageId
 */
export const updateMessage = async (msg, id) => {
  const findMessage = await messagesDb.query(Q.where('mid', id)).fetch();
  const messageId = findMessage[0].id;
  const timeUpdate = new Date().getTime();
  const messageRef = await messagesDb.find(messageId);
  console.log('dbMessage6', {findMessage, msg, id, messageRef});
  await database.action(async () => {
    const UPDATE = messageRef.prepareUpdate((entry) => {
      console.log('dbMessage prepareUpdate', entry);
      console.log({entry});
      entry.image = msg.image;
      entry.audio = msg.audio;
      entry.video = msg.video;
      entry.pdf = msg.pdf;
      entry.sent = msg.sent;
      entry.received = msg.received;
      entry.createdAt = timeUpdate;
      entry.status = msg.status || 0;
      entry.type = msg?.type;
      entry.episode = msg?.episode;
    });
    await database.batch(UPDATE);
  });
};

/**
 * Delete chat and messages relation with chat use chatId
 * @param {String} chatId
 */
export const deleteChatByIdDB = async (chatId) => {
  const chat = await chats.query(Q.where('cid', chatId)).fetch();
  const chatIdTable = chat[0].id;
  const chatRef = await chats.find(chatIdTable);
  const messages = await messagesDb.query(Q.where('cid', chatId)).fetch();
  await database.action(async () => {
    const DELETED_MESSAGES = messages.map((message) =>
      message.prepareDestroyPermanently(),
    );
    await database.batch(DELETED_MESSAGES);
  });
  await database.action(async () => {
    const DELETE = chatRef.prepareMarkAsDeleted();
    await database.batch(DELETE);
  });
};

export const getDataById = async () => {
  console.log('inja');
  // const allPosts = await chats.query().fetch();
  const starredPosts = await messagesDb.query(Q.where('cid', '2')).fetch();
  // const post = await chats.find('chat');

  console.log('post', starredPosts);
};

export const defineMissedChats = async (chats) => {
  console.log('dbMessage defineMissedChats', chats);
  console.log({MY_CHAT: chats});
  const findMissedChats = await Promise.all(
    chats.map(async (item) => {
      console.log({item});
      const isExist = await findChat(item._id);
      console.log({IS_EXIST: isExist});
      if (!isExist.length) {
        console.log('ELSE CHAT ');
        await saveChats(item);
      } else {
        await updateChat(item._id, item);
      }
    }),
  );
  return findMissedChats;
};

export const chatObjectGenerator = (item, chatId) => {
  console.log('dbMessage chatObjectGenerator', item);
  const date = new Date().getTime();
  return {
    text: item?.text || null,
    cid: chatId,
    _id: item?._id || JSON.stringify(date),
    user: item.user,
    image: item?.image || null,
    audio: item?.audio || null,
    video: item.video || null,
    pdf: item.pdf || null,
    local_path: item?.local_path || null,
    sent: item?.sent || false,
    received: item?.received || false,
    status: item?.status || 0,
    createdAt: item?.createdAt || date,
    episode: item?.episode || null,
    type: item?.type,
  };
};

export const defineMissedMessages = async (
  data,
  userId,
  userName,
  profileCover,
  chatId,
) => {
  let MESSAGES = [];
  console.log('dbMessage7', {
    ENTRY_CHAT_DATA: {data, userId, userName, profileCover, chatId},
  });
  const insertMessagesInDB = await Promise.all(
    data.map(async (item) => {
      const isMyMsg = userId === item.sender;

      const newObj = serverMsgObjectGenerator(
        chatId,
        item,
        isMyMsg,
        userName,
        profileCover,
      );
      console.log('dbMessage8', {newObj, isMyMsg});
      const savedMessage = await saveTonsOfMessages(newObj);
      console.log({savedMessage});
      MESSAGES.push(savedMessage);
    }),
  );
  await database.action(async () => {
    await database.batch(MESSAGES);
  });

  console.log({MESSAGES});
  console.log({insertMessagesInDB});
  return insertMessagesInDB;
};
export const serverMsgObjectGenerator = (
  chatId,
  item,
  isMyMsg,
  userName,
  profileCover,
) => {
  const userType = store.getState()?.auth?.userProfileData?.userType;
  console.log('dbMessage serverMsgObjectGenerator', {
    chatId,
    item,
    isMyMsg,
    userName,
    profileCover,
  });
  return {
    cid: chatId,
    _id: item._id,
    text: item.message,
    episode: item?.episode || null,
    type: item?.type,
    createdAt: item.createdAt,
    user: {
      _id: item.sender,
      name: isMyMsg ? userName : item?.targetUser[0]?.firstName,
      // avatar: null,
      avatar: isMyMsg
        ? userType === 'STUDENT'
          ? 'https://d18f4ioombpixl.cloudfront.net/public_asset/images/f92ebd03-14de-478f-af02-9b20ca08133b.jpeg'
          : item?.targetUser[0]?.image?.path
        : userType !== 'STUDENT'
        ? 'https://d18f4ioombpixl.cloudfront.net/public_asset/images/f92ebd03-14de-478f-af02-9b20ca08133b.jpeg'
        : profileCover?.thumbnail,
    },
    image: item?.image,
    audio: item?.audio,
    video: item.video,
    pdf: item.pdf,
    local_path: null,
    sent: true,
    received: true,
    status: 1,
  };
};
