import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'chats',
      columns: [
        {name: 'cid', type: 'string', isIndexed: true},
        {name: 'count', type: 'number', isOptional: true},
        {name: 'initiated', type: 'boolean', isOptional: true},
        {name: 'members', type: 'string', isOptional: true},
        {name: 'is_matched', type: 'string', isIndexed: true},
        {name: 'type', type: 'string', isIndexed: true},
        {name: 'initiated_by', type: 'string', isOptional: true},
        {name: 'match_id', type: 'string', isOptional: true},
        {name: 'block_status', type: 'string', isIndexed: true},
        {name: 'last_messages', type: 'string', isOptional: true},
        {name: 'total', type: 'number', isOptional: true},
        {name: 'updated_at', type: 'number', isIndexed: true},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'text', type: 'string', isOptional: true},
        {name: 'cid', type: 'string', isIndexed: true},
        {name: 'mid', type: 'string', isIndexed: true},
        {name: 'user', type: 'string'},
        {name: 'image', type: 'string', isOptional: true},
        {name: 'audio', type: 'string', isOptional: true},
        {name: 'video', type: 'string', isOptional: true},
        {name: 'pdf', type: 'string', isOptional: true},
        {name: 'local_path', type: 'string', isOptional: true},
        {name: 'sent', type: 'boolean', isOptional: true},
        {name: 'received', type: 'boolean', isOptional: true},
        {name: 'status', type: 'number', isOptional: true},
        {name: 'created_at', type: 'number', isIndexed: true},
        {name: 'type', type: 'string', isIndexed: true},
        {name: 'episode', type: 'string', isIndexed: true},
      ],
    }),
  ],
});
