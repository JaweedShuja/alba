import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import downloadFromUrl from '../../../utils/downloadFromUrl';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {PLACEHOLDER} = Strings.ImageAddress;

const ImageCard = ({data}) => {
  console.log('img', {data});
  const [imageLoading, setImageLoading] = useState(true);

  const path = data?.file?.path;
  const download = async () => {
    downloadFromUrl(path);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{data?.title}</Text>
      <View style={styles.image}>
        {imageLoading && (
          <FastImage
            source={PLACEHOLDER}
            style={[
              styles.image,
              {
                position: 'absolute',
              },
            ]}
            resizeMode={'cover'}
          />
        )}
        <FastImage
          source={{
            uri: path,
          }}
          onLoadEnd={() => setImageLoading(false)}
          style={styles.image}
          resizeMode={'cover'}
        />
      </View>
      {/* <FastImage source={{uri: path}} style={styles.image} resizeMode="cover" /> */}
      <TouchableOpacity
        style={styles.downloadBtn}
        onPress={download}
        activeOpacity={ACTIVE_OPACITY}>
        <Text style={styles.textBtn}>{string.DOWNLOAD}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageCard;
