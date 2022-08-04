import React from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import {string} from 'App/i18n';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import {dWidth} from 'App/Theme/Metrics';

const {PLACEHOLDER} = Strings.ImageAddress;

const EmptyView = (props) => {
  const {text = string.NO_DATA, fontSize = dWidth(7)} = props;

  return (
    <View style={[styles.container]}>
      <FastImage
        source={PLACEHOLDER}
        style={[styles.image]}
        resizeMode={'cover'}
      />
      <Text style={[styles.textEmpty, {fontSize}]}>{text}</Text>
    </View>
  );
};

export default EmptyView;
