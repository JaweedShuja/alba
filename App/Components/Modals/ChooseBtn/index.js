import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../../Theme';
import {normal} from '../../../Theme/Metrics';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Strings from '../../../Values/Strings';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const ChooseBtn = ({title, submit, choose, index}) => {
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      style={styles.btn}
      onPress={submit}>
      <Icon
        name={choose === index ? 'dot-circle-o' : 'circle-o'}
        size={normal * 2.6}
        color={Colors.lightBlue}
      />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ChooseBtn;
