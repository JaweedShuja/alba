import React from 'react';
import styles from './style';
import {Divider} from 'react-native-elements';
import {Colors} from 'App/Theme';

const DividerComponent = ({
  style = styles.divider,
  color = Colors.lightBlue,
}) => {
  return <Divider style={[style, {backgroundColor: color}]} />;
};

export default DividerComponent;
