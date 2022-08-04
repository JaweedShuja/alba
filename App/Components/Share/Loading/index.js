import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const Loading = ({children}) => {
  return (
    <View style={{...Helpers.center, ...Helpers.fill}}>
      <UIActivityIndicator color={Colors.lightBlue} />
      {children}
      {/* <ActivityIndicator color={Colors.lightBlue} size={'large'} /> */}
    </View>
  );
};

export default Loading;
