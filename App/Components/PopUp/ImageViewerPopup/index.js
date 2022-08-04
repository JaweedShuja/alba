import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Helpers} from '../../../Theme';
import {dWidth} from '../../../Theme/Metrics';
import Loading from '../../Share/Loading';

const ImageRender = ({item}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <FastImage
        {...item}
        resizeMode={'contain'}
        style={{
          height: dWidth(80),
          width: dWidth(80),
          alignSelf: 'center',
        }}
        onLoadEnd={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <ActivityIndicator
          color={'white'}
          size={50}
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
    </>
  );
};

const index = ({extraData, onPressClose}) => {
  //   console.log('extraDataextraData', extraData?.images);

  return (
    <>
      <ImageViewer
        imageUrls={extraData?.images}
        loadingRender={() => <Loading />}
        enableSwipeDown
        useNativeDriver
        onSwipeDown={onPressClose}
        renderImage={(item) => <ImageRender {...{item}} />}
        backgroundColor="transparent"
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          width: 30,
          height: 30,
          borderRadius: 30,
          backgroundColor: 'rgba(0,0,0,0.5)',
          ...Helpers.center,
        }}
        onPress={onPressClose}>
        <Text
          style={{
            color: 'white',
          }}>
          X
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default index;
