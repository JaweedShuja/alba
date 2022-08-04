/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import {InputToolbar, Actions, Composer, Send} from 'react-native-gifted-chat';
import styles from './style';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import {Icon} from 'react-native-elements';
import {normal} from 'App/Theme/Metrics';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import Strings from 'App/Values/Strings';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={styles.inputToolbar}
    primaryStyle={{
      alignItems: 'center',
    }}
  />
);

export const renderActions = (props) => (
  <Actions
    {...props}
    containerStyle={styles.actions}
    icon={() => (
      <FontIcon
        name={Strings.Icons.ATTACH}
        color={Colors.lightBlue}
        size={normal * 2.2}
      />
    )}
    onPressActionButton={props?.onOpenModalImageType}
    optionTintColor="#222B45"
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={styles.composer}
    placeHolderColor={Colors.lightBlue}
    placeholderTextColor={Colors.lightBlue}
    placeholder={'Message'}
    multiline={true}
    maxComposerHeight={100}
  />
);

export const renderSend = (props) => (
  <Send {...props} disabled={!props.text} containerStyle={styles.send}>
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => props.setIsRecording(true)}
      onPressOut={() => props.setIsRecording(false)}>
      <FontIcon
        name={!props.text ? Strings.Icons.MICROPHONE : Strings.Icons.SEND}
        color={Colors.lightBlue}
        size={normal * 3}
      />
    </TouchableOpacity>
    {/* <View
            style={[
              styles.containerAttachment,
              {
                display: text.length ? 'none' : 'flex',
              },
            ]}>
            {recordingAudio && (
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
            )}
            {enableGesture && renderAudioButton()}
          </View> */}
  </Send>
);
