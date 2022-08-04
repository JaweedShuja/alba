import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {PLACEHOLDER} = Strings.ImageAddress;

const NoteImageCard = ({data, deleteOnpress}) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        {imageLoading && (
          <FastImage
            source={PLACEHOLDER}
            style={[styles.image, {position: 'absolute'}]}
            resizeMode={'cover'}
          />
        )}
        <FastImage
          source={{
            uri: data?.file?.path,
          }}
          onLoadEnd={() => setImageLoading(false)}
          style={styles.image}
          resizeMode={'cover'}
        />
      </View>
      {/* <FastImage
        source={{uri: data?.file?.path}}
        style={styles.image}
        resizeMode="cover"
      /> */}
      <TouchableOpacity
        style={styles.downloadBtn}
        activeOpacity={ACTIVE_OPACITY}
        onPress={deleteOnpress}>
        <Text style={styles.textBtn}>{string.DELETE}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteImageCard;
