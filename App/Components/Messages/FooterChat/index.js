/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  Animated,
} from 'react-native';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import {Colors, Helpers} from '../../../Theme';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Strings from 'App/Values/Strings';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import StopWatch from '../../../CustomModules/StopWatch';
import {useDispatch, useSelector} from 'react-redux';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import styles from './styles';
import {Platform} from 'react-native';
import {isIOS} from 'react-native-elements/dist/helpers';
import {normal} from 'App/Theme/Metrics';
const option = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};
export const FooterChat = ({
  onSendPress = () => null,
  chatId,
  targetUserId,
  popup,
  bloCkStatus,
  onPickImage = () => null,
  type,
  onDelete,
}) => {
  //============================STATES==========================
  const [isBlocked, setIsBlocked] = useState(bloCkStatus ? true : false);
  const socket = useSelector((state) => state?.socket?.socket);
  const [text, setText] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const [recordingAudio, setRecordingAudio] = useState(false);
  const [enableGesture, setEnableGesture] = useState(true);
  const [inputHieght, setInputHieght] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  //============================CONSTANTS==========================
  const dispatch = useDispatch();
  const inputRef = useRef();
  const stopWatchRef = useRef();
  const iconPanRef = useRef();
  const tapRef = useRef();
  let timeOfRecordAudio = 0;

  const translateX = new Animated.Value(0);
  const translateXCancel = translateX.interpolate({
    inputRange: [-wp(50), 0],
    outputRange: [-wp(50), 0],
    extrapolate: 'clamp',
  });
  const opacityCancel = translateX.interpolate({
    inputRange: [-wp(20), 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const lastOffset = {x: 0, y: 0};
  let helpGesture = true;
  const options = {
    container: {
      backgroundColor: 'transparent',
      padding: 5,
      borderRadius: 5,
      width: 150,
    },
    text: {
      fontSize: 20,
      color: Colors.lightBlue,
      marginLeft: 7,
    },
  };

  //============================EFFECTS==========================

  useEffect(() => {
    setIsBlocked(bloCkStatus ? true : false);
  }, [bloCkStatus]);

  useEffect(() => {
    !isIOS && AndroidKeyboardAdjust.setAdjustResize();
    if (popup) {
      Keyboard.dismiss();
      inputRef.current?.blur();
    }
  }, [popup]);

  useEffect(() => {
    if (text.length > 0) {
      socket &&
        socket.emit('Typing', {chatId, targetUserId, status: '1'}, (res) => {
          console.log('RES ON TYPING EMIT', res);
        });
    } else {
      // console.log('0');
      socket &&
        socket.emit('Typing', {chatId, targetUserId, status: '0'}, (res) => {
          console.log('RES ON TYPING EMIT', res);
        });
    }
  }, [text]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  });

  //============================METHODS==========================

  const _keyboardDidShow = (e) => {
    setKeyboardStatus(true);
  };

  const _keyboardDidHide = (e) => {
    setKeyboardStatus(false);
  };

  const onPressInAudio = () => {
    setRecordingAudio(true);
    onStartRecording();
  };

  const onPressOutAudio = (cancel) => {
    onStopRecording(cancel);
    setTimeout(() => {
      setRecordingAudio(false);
    }, 5);
  };

  const onHandleStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastOffset.x += event.nativeEvent.translationX;
      translateX.setOffset(lastOffset.x);
      translateX.setValue(0);
      helpGesture = true;
    }
  };

  const listenerPan = (event) => {
    if (event.nativeEvent.translationX <= -wp(30) && helpGesture) {
      helpGesture = false;
      setEnableGesture(false);
      onPressOutAudio(true);
      setTimeout(() => {
        setEnableGesture(true);
      }, 100);
    }
  };

  const onChangeText = (text) => {
    if (text.charAt(0) === ' ' || text.charAt(0) === '\n') {
      return;
    }
    setText(text);
  };

  const onAttachPressed = () => {
    // Keyboard.dismiss();

    onPickImage();
  };

  const onSend = () => {
    onSendPress(text);
    setText('');
  };

  const prepareRecordingPath = async () => {
    const result = await new Promise((resolve, reject) => {
      const audioPath = isIOS
        ? `${AudioUtils.DocumentDirectoryPath}/${
            chatId + '_' + new Date().getTime()
          }.aac`
        : `${AudioUtils.DocumentDirectoryPath}${
            chatId + '_' + new Date().getTime()
          }.aac`;
      AudioRecorder.prepareRecordingAtPath(audioPath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        OutputFormat: 'aac_adts',
      });
      resolve({success: true});
    })
      .then(async (response) => {
        console.log('RES AUDIO =>', response);
        return response;
      })
      .catch((error) => {
        console.log('ERROR AUDIO =>', error);
        return error;
      });
    return result;
  };

  const onStartRecording = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy', option);
    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      setHasPermission(isAuthorised);

      if (!isAuthorised) {
        setRecordingAudio(false);
        return;
      }

      if (!recordingAudio) {
        console.log('START RECORDING');
        setRecordingAudio(true);
        prepareRecordingPath().then((response) => {
          if (response.success) {
            stopWatchRef?.current?.start();
            AudioRecorder.startRecording();
          }
        });
      }
    });
  };

  /**
   * timeOfRecordAudio use for validation small audio
   * @param {Boolean} cancel
   */
  const onStopRecording = (cancel) => {
    if (recordingAudio) {
      setRecordingAudio(false);
      console.log('STOP RECORDING');
      if (timeOfRecordAudio > 1000 && isIOS) {
        AudioRecorder.stopRecording();
        AudioRecorder.onFinished = (data) => {
          stopWatchRef?.current?.reset();
          if (isIOS && !cancel) {
            onSendPress(null, null, data.audioFileURL);
          }
        };
      } else if (timeOfRecordAudio > 1000) {
        AudioRecorder.stopRecording().then((response) => {
          stopWatchRef?.current?.reset();
          if (!cancel) {
            onSendPress(null, null, `file://${response}`);
          }
        });
      } else {
        AudioRecorder.stopRecording();
      }
    }
    ReactNativeHapticFeedback.trigger('impactHeavy', option);
  };

  const onDeclineUser = () => {
    onDelete();
  };

  const renderAudioButton = () => {
    if (text?.length !== 0 || keyboardStatus) {
      return null;
    }
    return Platform.select({
      ios: (
        <TapGestureHandler
          ref={tapRef}
          simultaneousHandlers={iconPanRef}
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.BEGAN) {
              onPressInAudio();
            }
            if (nativeEvent.state === State.END) {
              onPressOutAudio(false);
            }
          }}
          maxDist={20}
          maxDurationMs={3600000}>
          <Animated.View>
            <PanGestureHandler
              ref={iconPanRef}
              shouldCancelWhenOutside={false}
              onGestureEvent={Animated.event(
                [
                  {
                    nativeEvent: {
                      // Note that here is translationX not translateX
                      translationX: translateX,
                    },
                  },
                ],
                // Note that this object is not in the array above
                {
                  useNativeDriver: true,
                  listener: listenerPan,
                },
              )}
              onHandlerStateChange={onHandleStateChange}>
              <Animated.View
                style={[
                  styles.attachIconHolder,
                  {
                    transform: [
                      {
                        translateX: translateXCancel,
                      },
                    ],
                  },
                ]}>
                <FontIcon
                  name={Strings.Icons.MICROPHONE}
                  color={Colors.lightBlue}
                  size={normal * 3}
                />
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      ),
      android: (
        <PanGestureHandler
          // ref={iconPanRef}
          shouldCancelWhenOutside={false}
          onBegan={() => onPressInAudio()}
          onEnded={() => onPressOutAudio(false)}
          onGestureEvent={Animated.event(
            [
              {
                nativeEvent: {
                  // Note that here is translationX not translateX
                  translationX: translateX,
                },
              },
            ],
            // Note that this object is not in the array above
            {
              useNativeDriver: true,
              listener: listenerPan,
            },
          )}
          onHandlerStateChange={onHandleStateChange}>
          <Animated.View
            style={[
              styles.attachIconHolder,
              {
                transform: [
                  {
                    translateX: translateXCancel,
                  },
                ],
              },
            ]}>
            <FontIcon
              name={Strings.Icons.MICROPHONE}
              color={Colors.lightBlue}
              size={normal * 3}
            />
          </Animated.View>
        </PanGestureHandler>
      ),
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={10}
      collapsable
      style={styles.chatFooter}>
      <View style={styles.footerRowContainer}>
        {/* Attachment button */}
        <View
          style={[
            styles.containerAttachment,
            {
              display: text.length || recordingAudio ? 'none' : 'flex',
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.attachIconHolder}
            onPress={onPickImage}>
            <FontIcon
              name={Strings.Icons.ATTACH}
              color={Colors.lightBlue}
              size={normal * 2.2}
            />
          </TouchableOpacity>
        </View>
        {/* Input space */}
        <View
          style={[
            styles.inputWraper,
            {
              width: text.length ? '88%' : '76%',
              display: recordingAudio ? 'none' : 'flex',
              height: Math.min(120, Math.max(38, inputHieght)),
              left: text.length ? 0 : 0,
            },
          ]}>
          <View style={[styles.leftItems]}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              // placeholderTextColor={colors.placeHoderNeon}
              autoCorrect={false}
              onChangeText={onChangeText}
              value={text}
              multiline={true}
              onContentSizeChange={(event) =>
                setInputHieght(event.nativeEvent.contentSize.height)
              }
              enablesReturnKeyAutomatically
              // keyboardAppearance={theme}
              ref={inputRef}
            />
          </View>

          {(text?.length !== 0 || keyboardStatus) && (
            <TouchableOpacity
              disabled={!text?.length}
              onPress={onSend}
              style={styles.sendBtn}>
              <FontIcon
                name={Strings.Icons.SEND}
                color={Colors.white}
                size={normal * 1.9}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* User interface when audio is recording */}
        <View
          style={[
            styles.containerRecording,
            {
              display: recordingAudio ? 'flex' : 'none',
            },
          ]}>
          <StopWatch
            ref={stopWatchRef}
            laps
            options={options}
            largestUnitOfTime="minutes"
            getMsecs={(e) => (timeOfRecordAudio = e)}
          />
          <Animated.View
            style={{
              ...Helpers.rowCenter,
              opacity: opacityCancel,
              transform: [
                {
                  translateX: translateXCancel,
                },
              ],
            }}>
            <FontAwesomeIcons
              name="chevron-left"
              style={{marginEnd: wp(3)}}
              color={Colors.lightBlue}
              size={15}
            />
            <Text style={styles.cancelAudioText}>{'SLIDE_CANCEL_AUDIO'}</Text>
          </Animated.View>
        </View>
        {/* Audio recording button */}
        <View
          style={[
            styles.containerAttachment,
            {
              display: text.length ? 'none' : 'flex',
            },
          ]}>
          {/* {recordingAudio && (
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  transform: [
                    {
                      translateX: translateXCancel,
                    },
                  ],
                },
              ]}>
              <LottieView
                source={Lottie.translatedButtondeactive}
                style={styles.lottie}
                autoPlay={true}
                speed={200}
                loop
                duration={4000}
                enableMergePathsAndroidForKitKatAndAbove
                hardwareAccelerationAndroid
              />
            </Animated.View>
          )} */}
          {enableGesture && renderAudioButton()}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
