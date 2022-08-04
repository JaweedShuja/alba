/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  DeviceEventEmitter,
  LogBox,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {useTheme} from 'react-native-themed-styles';
import styles from './style';
import {Colors, Lottie} from '../../../Theme';
import LottieView from 'lottie-react-native';
import UserChatActions from 'App/Stores/UserChats/Actions';
import SoundPlayer from 'App/utils/SoundPlayer';

const AudioComponent = ({props, targetUserId}) => {
  //============================CONSTANTS==========================

  const dispatch = useDispatch();
  // const [styles, {colors, isDark}, theme] = useTheme(stylesChatRoom);
  const equlizerRef = useRef();
  const {audio, status, local_path} = props?.currentMessage;
  const userChat = useSelector((state) => state.userChat?.userChats);
  const errorAudioMessage = useSelector(
    (state) => state.userChat?.errorAudioMessage,
  );
  const currentAudioMessage = useSelector(
    (state) => state.userChat?.currentAudioMessage,
  );
  console.log('audioaudio', status);
  //============================STATES==========================
  const [playAudio, setPlayAudio] = useState(false);
  const [progressPlay] = useState(new Animated.Value(0));

  //============================EFFECTS==========================

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const soundListener = DeviceEventEmitter.addListener('SOUND', (e) => {
      if (e.soundId === props?.currentMessage?._id) {
        if (e.message === 'start') {
          startAnimation();
        } else {
          stopAnimation();
        }
      }
    });
    return () => {
      soundListener.remove();
    };
  }, []);

  //============================METHODS==========================

  const tryAgain = () => {
    const currentMessage = props?.currentMessage;
    dispatch(
      UserChatActions.handleFailedAudioMessage(
        currentMessage?.cid,
        currentMessage,
        targetUserId,
      ),
    );
  };

  /**
   * When user press play icon
   */
  const playVoice = () => {
    if (!playAudio) {
      SoundPlayer.play(
        audio?.local_path || audio?.path,
        props?.currentMessage?._id,
      );
    } else {
      SoundPlayer.stop(props?.currentMessage?._id);
    }
  };

  /**
   * Start animations of each audio
   */
  const startAnimation = () => {
    setPlayAudio(true);
    Animated.timing(progressPlay, {
      toValue: 0.6,
      duration: 1000,
    }).start();
    equlizerRef.current.play();
  };

  /**
   * Stop animations of each audio
   */
  const stopAnimation = () => {
    setPlayAudio(false);
    Animated.timing(progressPlay, {
      toValue: 0,
      duration: 500,
    }).start();
    equlizerRef.current.reset();
  };

  return (
    <View style={styles.audioContainer}>
      <View style={styles.audioContainerStart}>
        {status === 1 ? (
          <TouchableOpacity
            style={styles.containerPlayPause}
            onPress={playVoice}>
            <LottieView
              style={styles.lottiePlayAudio}
              source={Lottie.audio_play_pause}
              autoPlay={false}
              resizeMode="contain"
              enableMergePathsAndroidForKitKatAndAbove
              hardwareAccelerationAndroid
              progress={progressPlay}
            />
          </TouchableOpacity>
        ) : status === 0 ? (
          <LottieView
            source={Lottie.audio_uploading}
            style={styles.lottieUploadAudio}
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
            style={styles.containerPlayPause}
            onPress={tryAgain}>
            <LottieView
              style={styles.lottiePlayAudio}
              source={Lottie.audio_try_agian}
              autoPlay={true}
              resizeMode="contain"
              enableMergePathsAndroidForKitKatAndAbove
              hardwareAccelerationAndroid
              progress={progressPlay}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.audioContainerEnd}>
        <LottieView
          ref={equlizerRef}
          style={styles.lottieEqulizerAudio}
          source={Lottie.audio_equlizer}
          enableMergePathsAndroidForKitKatAndAbove
          hardwareAccelerationAndroid
        />
      </View>
    </View>
    // <View style={styles.audioContainer}>
    //   <View style={styles.audioContainerStart}>
    //     <TouchableOpacity style={{backgroundColor: 'red'}} onPress={playVoice}>
    //       <Text>play</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.audioContainerEnd}>
    //     <LottieView
    //       ref={equlizerRef}
    //       style={styles.lottieEqulizerAudio}
    //       source={require('App/Assets/Images/Lottie/audio_equlizer.json')}
    //       enableMergePathsAndroidForKitKatAndAbove
    //       hardwareAccelerationAndroid
    //     />
    //   </View>
    // </View>
  );
};

export default AudioComponent;
