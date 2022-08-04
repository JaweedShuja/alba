import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Player from 'App/Components/Courses/Player';
import Header from 'App/Components/Share/Header';
import Container from 'App/Components/Container';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from 'App/Stores/AppData/Actions';
import Loading from 'App/Components/Share/Loading';
import BackButton from '../../Components/Share/BackButton';
import {Helpers} from '../../Theme';
import {isIOS} from '../../Theme/Metrics';

const PlayerScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const urlVideo = route.params?.urlVideo;
  const chatPlayer = route.params?.chatPlayer;
  const data = useSelector((state) => state.appData.YoutubeUrl);
  const loadingVideo = useSelector(
    (state) => state.appData.convertYoutubeUrlLoading,
  );
  const thumbnail = data?.thumbnail;
  const url = data?.url;
  const videoQualities = data?.videoQualities;
  const videoRequest = Object.assign(
    {url: urlVideo},
    {quality: videoQualities?.[0]},
  );
  console.log('videoQualities', {data});
  useEffect(() => {
    if (!chatPlayer) {
      dispatch(AppDataActions.convertYoutubeUrl(videoRequest));
    }
  }, []);
  const changeVideoQuality = (object) => {
    console.log({object});
    dispatch(AppDataActions.convertYoutubeUrl(object));
  };
  return (
    <Container {...{navigation}}>
      <Player
        {...{url}}
        {...{thumbnail}}
        {...{urlVideo}}
        {...{changeVideoQuality}}
        {...{loadingVideo}}
        {...{videoQualities}}
        {...{navigation}}
        {...{chatPlayer}}
      />
    </Container>
  );
};

export default PlayerScreen;
