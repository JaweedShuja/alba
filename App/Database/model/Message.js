import {Model} from '@nozbe/watermelondb';
import {field, relation, date, json} from '@nozbe/watermelondb/decorators';

import {sanitizer} from '../Utils';
const sanitizeReactions = (rawReactions) => {
  return Array.isArray(rawReactions) ? rawReactions.map(String) : [];
};
export default class Message extends Model {
  static table = 'messages';

  static associations = {
    chats: {type: 'belongs_to', key: 'cid'},
  };
  @field('text') text;
  @field('cid') cid;
  @field('mid') _id;
  @json('user', sanitizer) user;
  @json('episode', sanitizer) episode;
  @json('image', sanitizer) image;
  @json('audio', sanitizer) audio;
  @json('video', sanitizer) video;
  @json('pdf', sanitizer) pdf;
  @json('local_path', sanitizer) local_path;
  @field('sent') sent;
  @field('received') received;
  @field('status') status;
  @field('type') type;
  @date('created_at') createdAt;
  @relation('chats', 'cid') chats;
  //   @readonly @date('created_at') createdAt;
  //   @readonly @date('updated_at') updatedAt;
  // }
  async deleteReview() {
    await this.markAsDeleted(); // syncable
    await this.destroyPermanently(); // permanent
  }
}

// Status: 1-Pending, 2-Success, 3-Upload failed, 4-Socket failed
