import {DeviceEventEmitter} from 'react-native';
import Sound from 'react-native-sound';

class SoundPlayer {
  constructor() {
    this.audioPlayer = null;
    this.path = null;
    this.soundId = null;
  }

  /**
   * play sound
   * @param {String} path
   * @returns
   */
  async play(path, soundId) {
    this.stop(this.soundId);
    this.path = path;
    const result = await new Promise((resolve, reject) => {
      this.audioPlayer = null;
      this.audioPlayer = new Sound(this.path, null, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          reject({success: false, message: 'failed to load the sound', error});
        } else {
          resolve({success: true});
          this.soundId = soundId;
          this.start(soundId);
          this.audioPlayer?.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
            this.stop(soundId);
          });
        }
      });
    })
      .then(async (response) => {
        return response;
      })
      .catch(async (error) => {
        return error;
      });
    return result;
  }

  /**
   * stop sound
   */
  stop(soundId) {
    if (this.audioPlayer) {
      this.audioPlayer?.stop();
      DeviceEventEmitter.emit('SOUND', {message: 'stop', soundId});
    }
  }

  start(soundId) {
    if (this.audioPlayer) {
      DeviceEventEmitter.emit('SOUND', {message: 'start', soundId});
    }
  }
}

export default new SoundPlayer();
