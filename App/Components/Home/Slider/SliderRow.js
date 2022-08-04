import React from 'react';
import {View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Helpers, Metrics, Fonts, Colors} from 'App/Theme';
import Values from 'App/Values';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('screen');

const Image = createImageProgress(FastImage);
const SliderRow = ({width, large, item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, {width: large ? width : width}]}>
      <View
        style={[
          styles.imageParent,
          {
            // backgroundColor: 'white',
            height: height / 5.2,
            width: large ? '91%' : '91%',
          },
        ]}>
        <Image
          source={{uri: item?.image?.path || ''}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.stretch}
          // indicatorProps={{
          //   color: Colors.red,
          // }}
          //resizeMode={'cover'}
        />
      </View>
    </TouchableOpacity>
  );
};
export default SliderRow;
const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
  imageParent: {
    width: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    ...Metrics.normalRadius,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.input,
  },
});
