'use strict';
import React, {useState, useEffect} from 'react';
import styles from './style';
import {
  AlertIOS,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Loading from 'App/Components/Share/Loading';
import Video, {FilterType} from 'react-native-video';
import {showToast} from '../../../utils/showToast';
import {Icon} from 'react-native-elements';
import {Helpers, Metrics, Fonts, Colors, ApplicationStyles} from 'App/Theme';
import Strings from 'App/Values/Strings';
import {normal} from 'App/Theme/Metrics';
import Modal from 'App/Components/Modals/Modal';
import ChooseBtn from 'App/Components/Modals/ChooseBtn';
import DividerComponent from 'App/Components/Share/DividerComponent';
import {useDispatch, useSelector} from 'react-redux';
import AppDataActions from 'App/Stores/AppData/Actions';
import BackButton from 'App/Components/Share/BackButton';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const errorMessage = {
  playError: 'There was a problem playing the video',
};
const Player = ({
  url,
  thumbnail,
  urlVideo,
  changeVideoQuality,
  loadingVideo,
  videoQualities,
  navigation,
  chatPlayer,
}) => {
  const dispatch = useDispatch();
  console.log({thumbnail});
  const [resizeMode, setResizeMode] = useState('contain');
  const [loading, setLoading] = useState(false);
  const [choose, setChoose] = useState({
    index: 0,
    quality: 360,
  });
  const [isVisibleQuality, setIsVisibleQuality] = useState(false);
  console.log('chat video', {
    url,
    thumbnail,
    urlVideo,
    changeVideoQuality,
    loadingVideo,
    videoQualities,
    chatPlayer,
  });
  //=============================STATES==========================
  const onLoad = (data) => {
    console.log('onLoad', {data});
    setLoading(false);
  };
  const onLoadStart = (data) => {
    console.log('onLoadStart', {data});
    setLoading(true);
  };

  const onError = (data) => {
    showToast('e', errorMessage.playError);
  };

  const onCloseModalCategory = () => {
    setIsVisibleQuality(false);
  };
  const onPressGrade = (index, title) => {
    setLoading(true);
    const selected = {
      index,
      quality: title,
    };
    setChoose(selected);
    const object = Object.assign({url: urlVideo}, {quality: title});
    setIsVisibleQuality(false);
    changeVideoQuality(object);
  };
  const ItemModal = ({index, item}) => {
    return (
      <ChooseBtn
        title={item}
        choose={choose.index}
        submit={onPressGrade.bind(null, index, item)}
        {...{index}}
      />
    );
  };
  const renderItemGrade = ({item, index}) => {
    return <ItemModal index={index} item={item} />;
  };
  const QualityModal = () => {
    return (
      <Modal
        visible={isVisibleQuality}
        onCloseActionSheet={onCloseModalCategory}>
        {console.log({videoQualities})}
        <FlatList
          data={videoQualities}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.FlatList}
          renderItem={renderItemGrade}
          keyExtractor={(item, index) => `${item.title}${index}`}
          ItemSeparatorComponent={DividerComponent}
        />
      </Modal>
    );
  };
  const openQualityModal = () => {
    if (videoQualities?.length) setIsVisibleQuality(true);
    else {
      showToast('e', 'This Video hasnt quality');
    }
  };
  //============================METHODS==========================
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loading}>
          <Loading />
        </View>
      )}
      {loadingVideo ? (
        <Loading />
      ) : (
        <>
          <BackButton
            style={styles.headerStyle}
            {...{navigation}}
            color={true}
          />

          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={openQualityModal}
            disabled={loading}
            style={[styles.iconQuality, {opacity: loading ? 0.5 : 1}]}>
            <Icon
              type="material-icons"
              name="high-quality"
              size={normal * 3}
              color={Colors.white}></Icon>
          </TouchableOpacity>
          {!chatPlayer && (
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              onPress={openQualityModal}
              disabled={loading}
              style={[styles.iconQuality, {opacity: loading ? 0.5 : 1}]}>
              <Icon
                type="material-icons"
                name="high-quality"
                size={normal * 3}
                color={Colors.white}
              />
            </TouchableOpacity>
          )}
          <Video
            source={{uri: url || urlVideo}}
            style={styles.fullScreen}
            resizeMode={resizeMode}
            muted={false}
            repeat={true}
            {...{onLoad}}
            {...{onLoadStart}}
            {...{onError}}
            poster={thumbnail}
            controls
          />
        </>
      )}

      {QualityModal()}
    </View>
  );
};

export default Player;
