import {createThumbnail} from 'react-native-create-thumbnail';

export const createThumbnailVideo = (url) => {
  console.log('aaaaaaaaaaaaaaaaaaa');
  createThumbnail({
    url: url,
    timeStamp: 1000,
  })
    .then((response) => {
      console.log('aaaaaaaaaaaaaaaaaaa', response);

      return response?.path;
    })
    .catch((err) => console.log({err}));
};
