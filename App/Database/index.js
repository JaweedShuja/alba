import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import logger from '@nozbe/watermelondb/utils/common/logger';
import appGroup from './AppGroup';
import appSchema from './schema/app';
import Message from './model/Message';
import Chats from './model/Chats';
// const appGroupPath = isIos ? appGroup.path : '';

// export const getDatabase = (database = '') => {
//   const path = database.replace(/(^\w+:|^)\/\//, '').replace(/\//g, '.');
//   const dbName = `${appGroupPath}${path}-experimental.db`;

//   const adapter = new SQLiteAdapter({
//     dbName,
//     schema: appSchema,
//     migrations,
//   });

//   return new Database({
//     adapter,
//     modelClasses: [Message],
//     actionsEnabled: true,
//   });
// };

// const path = database.replace(/(^\w+:|^)\/\//, '').replace(/\//g, '.');

// const dbName = `${appGroupPath}${path}-experimental.db`;

const adapter = new SQLiteAdapter({
  dbName: 'Alba',
  schema: appSchema,
  // migrations,
});
const database = new Database({
  adapter,
  modelClasses: [Chats, Message],
  actionsEnabled: true,
});

export default database;
