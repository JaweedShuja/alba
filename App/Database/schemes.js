// import Realm from 'realm';
// export const USER_CHATS_SCHEME = 'ChatsModel';
// export const CHAT_ROOM_SCHEME = 'ChatRoomScheme';
// export const CHAT_SCHEME = 'ChatScheme';
// // Define your models and their properties
// export const Chat = {
//   name: CHAT_SCHEME,
//   primaryKey: 'id',
//   properties: {
//     id: 'int', // primary key
//     userName: 'string',
//     creationDate: 'date',
//     message: {type: 'string', default: false},
//   },
// };
// export const ChatRoom = {
//   name: CHAT_ROOM_SCHEME,
//   primaryKey: 'id',
//   properties: {
//     id: 'int', // primary key
//     userName: {type: 'string', indexed: true},
//     chats: {type: 'list', objectType: CHAT_SCHEME},
//   },
// };
// export const ChatList = {
//   name: USER_CHATS_SCHEME,
//   primaryKey: 'id',
//   properties: {
//     id: 'int', // primary key
//     userId: 'string',
//     creationDate: 'date',
//     chats: {type: 'list', objectType: CHAT_ROOM_SCHEME},
//   },
// };

// const databaseOptions = {
//   path: '/Users/morteza/Wingle.realm',
//   schema: [ChatList, ChatRoom, Chat],
//   schemaVersion: 0, //optional
// };
// //functions for TodoLists
// export const insertNewChat = (newTodoList) =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then((realm) => {
//         realm.write(() => {
//           realm.create(USER_CHATS_SCHEME, newTodoList);
//           resolve(newTodoList);
//         });
//       })
//       .catch((error) => reject(error));
//   });
// export const updateTodoList = (todoList) =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then((realm) => {
//         realm.write(() => {
//           let updatingTodoList = realm.objectForPrimaryKey(
//             TODOLIST_SCHEMA,
//             todoList.id,
//           );
//           updatingTodoList.name = todoList.name;
//           resolve();
//         });
//       })
//       .catch((error) => reject(error));
//   });
// export const deleteTodoList = (todoListId) =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then((realm) => {
//         realm.write(() => {
//           let deletingTodoList = realm.objectForPrimaryKey(
//             TODOLIST_SCHEMA,
//             todoListId,
//           );
//           realm.delete(deletingTodoList);
//           resolve();
//         });
//       })
//       .catch((error) => reject(error));
//   });
// export const deleteAllTodoLists = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then((realm) => {
//         realm.write(() => {
//           let allTodoLists = realm.objects(TODOLIST_SCHEMA);
//           realm.delete(allTodoLists);
//           resolve();
//         });
//       })
//       .catch((error) => reject(error));
//   });
// export const queryAllTodoLists = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(databaseOptions)
//       .then((realm) => {
//         let allTodoLists = realm.objects(TODOLIST_SCHEMA);
//         resolve(allTodoLists);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// export default new Realm(databaseOptions);
