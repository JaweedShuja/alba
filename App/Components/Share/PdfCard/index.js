import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Lottie} from 'App/Theme';
import downloadFromUrl from '../../../utils/downloadFromUrl';
import {string} from 'App/i18n';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import UserChatActions from '../../../Stores/UserChats/Actions';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const PdfCard = ({data, note = false, ...props}) => {
  console.log('pdf', {props});
  const dispatch = useDispatch();
  const path = data?.file?.path || data?.path;

  const currentMessage = props?.props?.currentMessage;
  const targetUserId = props?.props?.targetUserId;

  const status = currentMessage?.status;
  console.log('currentMessagecurrentMessage', status);

  const userChat = useSelector((state) => state.userChat?.userChats);
  const errorImageMessage = useSelector(
    (state) => state.userChat?.errorImageMessage,
  );
  const currentImageMessage = useSelector(
    (state) => state.userChat?.currentImageMessage,
  );

  const download = async () => {
    downloadFromUrl(path);
  };

  const tryAgain = () => {
    dispatch(
      UserChatActions.handleFailedPdfMessage(
        currentMessage?.cid,
        currentMessage,
        targetUserId,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.textTitle}>
        {data?.title}
      </Text>
      <View style={styles.viewPdf}>
        <FastImage
          source={Strings.ImageAddress.PDF}
          style={styles.image}
          resizeMode={'cover'}
        />
        <Text numberOfLines={1} style={styles.textName}>
          {data?.file?.filename || data?.filename}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.downloadBtn}
        activeOpacity={ACTIVE_OPACITY}
        disabled={note ? false : currentMessage?.status !== 1}
        onPress={download}>
        {currentMessage?.status === 1 || note === true ? (
          <Text style={styles.textBtn}>{string.DOWNLOAD}</Text>
        ) : currentMessage?.status === 0 ? (
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
              height: '100%',
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
      </TouchableOpacity>
    </View>
  );
};

export default PdfCard;
