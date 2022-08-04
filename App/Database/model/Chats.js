import {Model} from '@nozbe/watermelondb';
import {
  field,
  relation,
  date,
  json,
  children,
  readonly,
  action,
  lazy,
} from '@nozbe/watermelondb/decorators';
import {Q} from '@nozbe/watermelondb';

import {sanitizer} from '../Utils';
const sanitizeReactions = (rawReactions) => {
  return Array.isArray(rawReactions) ? rawReactions.map(String) : [];
};
export default class Chats extends Model {
  static table = 'chats';

  static associations = {
    messages: {type: 'has_many', foreignKey: 'cid'},
  };

  @field('cid') cid;
  @field('count') count;
  @field('initiated') initiated;
  @json('members', sanitizer) members;
  @field('is_matched') isMatched;
  @field('type') type;
  @field('initiated_by') initiatedBy;
  @field('match_id') matchId;
  @field('block_status') blockStatus;
  @json('last_messages', sanitizer) lastMessage;
  @field('total') total;
  @date('updated_at') updatedAt;

  @children('messages') messages;
  @lazy
  chat = this.collections
    .get('messages')
    .query(Q.on('messages', 'cid', this.cid));
  // @readonly @date('created_at') createdAt;
  // @readonly @date('updated_at') updatedAt;
  @action async createChat() {
    await this.batch(
      this.prepareUpdate((chat) => {
        chat.chat = `7 ways to lose weight`;
      }),
      this.collections.get('messages').prepareCreate((comment) => {
        comment.chat.set(this);
        comment.msg = "Don't forget to comment, like, and subscribe!";
      }),
    );
  }
  getChat() {
    return {
      chat: this.chat,
    };
  }
  async markAsDeleted() {
    await this.messages.destroyAllPermanently();
    await super.markAsDeleted();
    // await this.chat.destroyAllPermanently();
  }
  // async addMessage(messageS) {
  //   return this.collections.get('messages').create((message) => {
  //     message.chat.set(this);
  //     message.msg = messageS;
  //   });
  // }

  // updateChat = async (updatedChat) => {
  //   await this.update((chat) => {
  //     chat.chat = updatedChat;
  //   });
  // };
  // async deleteAllReview() {
  //   await this.messages.destroyAllPermanently();
  // }
  // async deleteChat() {
  //   await this.deleteAllReview(); // delete all reviews first
  //   await this.markAsDeleted(); // syncable
  //   await this.destroyPermanently(); // permanent
  // }
}
