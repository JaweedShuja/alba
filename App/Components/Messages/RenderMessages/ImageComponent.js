import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import UserChatActions from '../../../Stores/UserChats/Actions';
import LottieView from 'lottie-react-native';
import {Helpers, Lottie} from '../../../Theme';
import Strings from '../../../Values/Strings';

const ImageComponent = ({props, targetUserId}) => {
  //============================CONSTANTS==========================
  console.log('propspropsprops', props);
  const dispatch = useDispatch();
  const {image, local_path, status} = props?.currentMessage;

  const userChat = useSelector((state) => state.userChat?.userChats);
  const errorImageMessage = useSelector(
    (state) => state.userChat?.errorImageMessage,
  );
  const currentImageMessage = useSelector(
    (state) => state.userChat?.currentImageMessage,
  );

  //============================METHODS==========================

  const tryAgain = () => {
    const currentMessage = props?.currentMessage;
    dispatch(
      UserChatActions.handleFailedImageMessage(
        currentMessage?.cid,
        currentMessage,
        targetUserId,
      ),
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={status !== 1}
      onPress={() => {
        // console.log('props.onImageZoom.bind(null, image)', image);
        props.onImageZoom(image);
      }}
      style={styles.messageImageContainer}>
      <FastImage
        style={styles.messageImage}
        imageStyle={styles.messageImage}
        source={{uri: local_path || image.path}}
        thumbnail={{uri: local_path || image?.thumbnail}}
        resizeMode={FastImage.resizeMode.cover}
      />

      {status === 0 && (
        <View
          style={[
            styles.indicatorStyle,
            {opacity: 1, backgroundColor: 'transparent'},
          ]}>
          <View style={styles.indicatorStyle} />
          <LottieView
            source={Lottie.audio_uploading}
            style={[styles.lottieUploadAudio, {position: 'absolute'}]}
            autoPlay={true}
            speed={500}
            loop
            resizeMode="contain"
            duration={2000}
            enableMergePathsAndroidForKitKatAndAbove
            hardwareAccelerationAndroid
          />
        </View>
      )}
      {status === 2 || status === 3 ? (
        <View style={styles.tryAgainContainer}>
          <TouchableOpacity style={styles.tryAgain} onPress={tryAgain}>
            <Text style={styles.tryAgainTxt}>{Strings.TRY_AGAIN}</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* {status === 2 || status === 3 ? (
        <View style={styles.tryAgainContainer}>
          <TouchableOpacity style={styles.tryAgain} onPress={tryAgain}>
            <Text style={styles.tryAgainTxt}>TRY AGAIN</Text>
          </TouchableOpacity>
        </View>
      ) : null} */}
    </TouchableOpacity>
  );
};

export default ImageComponent;
