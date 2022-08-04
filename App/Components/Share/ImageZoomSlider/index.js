import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('window');
import {Colors} from '../../Theme';
import Loading from '../Loading';
import {ActivityIndicator} from 'react-native';
import {BackHandler} from 'react-native';

const ImageRender = ({item}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <FastImage
        {...item}
        resizeMode={'contain'}
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
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

const ImageZoomSlider = ({data, onCloseSlider, sliderActive}) => {
  const newData = data.map((item) => {
    return {url: item?.path, width, height: height};
  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      // dispatch(UserChatActions.blockedChats([]));
    };
  });

  const handleBackPress = () => {
    onCloseSlider();
    console.log('BACK');
    return true;
  };

  const footer = () => {
    return (
      <TouchableOpacity onPress={onCloseSlider} style={styles.closeWrapper}>
        <Icon name={'close'} color={Colors.white} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageViewer
        imageUrls={newData}
        renderIndicator={() => null}
        renderFooter={footer}
        backgroundColor={'rgba(0,0,0,0.8)'}
        renderImage={(item) => <ImageRender {...{item}} />}
        index={sliderActive}
        enablePreload
        useNativeDriver
      />
    </View>
  );
};
export default ImageZoomSlider;
