import {getLinkPreview} from 'link-preview-js';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Helpers, Lottie} from '../../../Theme';
import {dWidth} from '../../../Theme/Metrics';
import Strings from '../../../Values/Strings';
import FontIcon from '../../CustomIcon/FontIcon';
import LottieView from 'lottie-react-native';
import UserChatActions from '../../../Stores/UserChats/Actions';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {navigate} from 'App/Services/NavigationService';

const VideoMessage = ({props}) => {
  const VIDEO_SIZE = dWidth(65);
  const [imageVideo, setImageVideo] = useState(null);
  const dispatch = useDispatch();

  const userChat = useSelector((state) => state.userChat?.userChats);
  const errorVideoMessage = useSelector(
    (state) => state.userChat?.errorVideoMessage,
  );
  const currentVideoMessage = useSelector(
    (state) => state.userChat?.currentVideoMessage,
  );

  useEffect(() => {
    createThumbnailVideo(props?.currentMessage?.video?.path);
  }, []);

  useEffect(() => {
    console.log('statusstatus', props?.currentMessage?.status);
  }, [props?.currentMessage?.status]);

  const createThumbnailVideo = async (path) => {
    const urls = getLinkPreview(path).then((res) => {
      return res;
    });
    const imageUrl = await urls;
    console.log({imageUrl});
    const catImgBase64 = imageUrl?.url;
    setImageVideo(catImgBase64);
  };

  const tryAgain = () => {
    dispatch(
      UserChatActions.handleFailedAudioMessage(
        props?.currentMessage?.cid,
        props?.currentMessage,
        props?.targetUserId,
      ),
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigate(Strings.Routes.PLAYER_SCREEN, {
          urlVideo: props?.currentMessage?.video?.path,
          chatPlayer: true,
        })
      }
      disabled={props?.currentMessage?.status !== 1}
      style={{
        width: VIDEO_SIZE,
        height: VIDEO_SIZE,
        borderRadius: 15,
        overflow: 'hidden',
        ...Helpers.center,
      }}>
      {props?.currentMessage?.status === 1 ? (
        <>
          {imageVideo && (
            <FastImage
              source={{uri: props?.currentMessage?.video?.path}}
              style={{
                width: '95%',
                height: '95%',
                borderRadius: 15,
              }}
            />
          )}
          <FontIcon
            name={Strings.Icons.PLAY}
            size={40}
            style={{
              position: 'absolute',
              top: VIDEO_SIZE / 2.4,
            }}
            color={'white'}
          />
        </>
      ) : props?.currentMessage?.status === 0 ? (
        <LottieView
          source={Lottie.audio_uploading}
          // style={styles.lottieUploadAudio}
          autoPlay={true}
          speed={500}
          loop
          resizeMode="contain"
          duration={2000}
          enableMergePathsAndroidForKitKatAndAbove
          hardwareAccelerationAndroid
        />
      ) : (
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={tryAgain}>
          <LottieView
            source={Lottie.audio_try_agian}
            autoPlay={true}
            resizeMode="contain"
            enableMergePathsAndroidForKitKatAndAbove
            hardwareAccelerationAndroid
            // progress={progressPlay}
          />
        </TouchableOpacity>
      )}

      {/* {imageVideo && (
        <FastImage
          source={{uri: video?.path}}
          style={{
            width: '95%',
            height: '95%',
            borderRadius: 15,
          }}
        />
      )}
      <FontIcon
        name={Strings.Icons.PLAY}
        size={40}
        style={{
          position: 'absolute',
          top: VIDEO_SIZE / 2.4,
        }}
        color={'white'}
      /> */}
    </TouchableOpacity>
  );
};

export default VideoMessage;
