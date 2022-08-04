import FontIcon from 'App/Components/CustomIcon/FontIcon';
import BackButton from 'App/Components/Share/BackButton';
import Loading from 'App/Components/Share/Loading';
import {string} from 'App/i18n';
import fetchColors from 'App/Services/getImageColor';
import {navigate} from 'App/Services/NavigationService';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {showToast} from 'App/utils/showToast';
import Strings from 'App/Values/Strings';
import {getLinkPreview} from 'link-preview-js';
import React, {useEffect, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {isIOS} from '../../../Theme/Metrics';
import {getLightnessOfRGB} from '../../../utils/getLightnessOfRGB';
import {hexAToRGBA} from '../../../utils/hexAToRGBA';
import styles from './style';
import AppDataActions from 'App/Stores/AppData/Actions';

const {width, height} = Dimensions.get('screen');

const {PLACEHOLDER} = Strings.ImageAddress;

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {PLAYER_SCREEN, STUDENT_STACK} = Strings.Routes;

const PlayVideo = ({navigation, available = false, videoDataUrl}) => {
  const dispatch = useDispatch();
  const thumbnail = useSelector((state) => state.appData.YoutubeUrl?.thumbnail);
  console.log('thumbnail', thumbnail);
  let videoData = null;
  const videoData1 = useSelector((state) => state.appData.EpisodeData);
  const loadingVideo = useSelector(
    (state) => state.appData.convertYoutubeUrlLoading,
  );
  console.log({loadingVideo});
  if (available) videoData = videoDataUrl;
  else videoData = videoData1;
  const [loading, setLoading] = useState(false);
  const path = videoData?.url;
  const [backBtnColor, setBackBtnColor] = useState(false);
  const [imageVideo, setImageVideo] = useState('');
  const [imageLoading, setImageLoading] = useState(true);
  const videoRequest = Object.assign({url: path}, {quality: '360'});

  useEffect(() => {
    dispatch(AppDataActions.convertYoutubeUrl(videoRequest));
  }, []);

  useEffect(() => {
    async function youTube() {
      try {
        const urls = getLinkPreview(path).then((res) => {
          return res;
        });
        const imageUrl = await urls;
        const catImgBase64 = imageUrl?.images?.[0];
        setImageVideo(catImgBase64);
        let color = await fetchColors(catImgBase64);
        color = hexAToRGBA(color, 1);
        let backColor = getLightnessOfRGB(color);
        if (backColor !== 'light') {
          setBackBtnColor(true);
        } else {
          setBackBtnColor(false);
        }
        console.log('errrrrrrrrrrrrrrrrrrrrrrr', {});
      } catch (err) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrr', {err});
        showToast('e', string.SOMETHING_WENT_WRONG);
      }
      setLoading(false);
    }
    if (!isIOS) {
      setLoading(true);
      youTube();
    }
  }, [navigation, thumbnail]);

  useEffect(() => {
    if (isIOS) {
      setLoading(loadingVideo);
      if (!loadingVideo) setImageVideo(thumbnail);
      else setImageVideo('');
    }
  }, [thumbnail, loadingVideo]);

  const onPressPlayVideo = () => {
    const urlVideo = videoData?.url;
    navigate(STUDENT_STACK, {screen: PLAYER_SCREEN, params: {urlVideo}});
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.headerStyle,
          isIOS && {
            position: 'absolute',
            // backgroundColor: 'red',
            width: width,
            height: 100,
            zIndex: 100000,
            top: 0,
          },
        ]}>
        <BackButton {...{navigation}} color={false} />
      </View>

      <>
        {imageLoading && (
          <FastImage
            source={PLACEHOLDER}
            style={[styles.image, styles.absolute]}
            resizeMode={'cover'}
          />
        )}

        <FastImage
          source={{
            uri: imageVideo,
          }}
          onLoadEnd={() => setImageLoading(false)}
          style={styles.image}
          resizeMode={'cover'}
        />
      </>

      {loading ? (
        <View style={[styles.btnPlay, {backgroundColor: 'transparent'}]}>
          <Loading />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.btnPlay}
          onPress={onPressPlayVideo}
          activeOpacity={ACTIVE_OPACITY}>
          <FontIcon
            name={Strings.Icons.PLAY}
            color={Colors.white}
            size={normal * 5}
          />
        </TouchableOpacity>
      )}
      <View style={styles.viewDesc}>
        <Text style={styles.textTitle}>{videoData?.title}</Text>
        <Text style={styles.textDesc} numberOfLines={4}>
          {videoData?.description}
        </Text>
      </View>
    </View>
  );
};

export default PlayVideo;
