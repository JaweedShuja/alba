import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {string} from 'App/i18n';
import FastImage from 'react-native-fast-image';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const NotePdfCard = ({data, deleteOnpress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{data.title}</Text>
      <View style={styles.viewPdf}>
        <FastImage
          source={Strings.ImageAddress.PDF}
          style={styles.image}
          resizeMode={'cover'}
        />
        <Text style={styles.textName}>{data.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.downloadBtn}
        activeOpacity={ACTIVE_OPACITY}
        onPress={deleteOnpress}>
        <Text style={styles.textBtn}>{string.DELETE}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotePdfCard;
