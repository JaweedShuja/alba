import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, DeviceEventEmitter} from 'react-native';
import ImagePickerModal from 'App/Components/Share/ImagePicker';
import NoteImageCard from 'App/Components/Share/NoteImageCard';
import {string} from 'App/i18n';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import styles from './style';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import ProgressCircleComponent from 'App/Components/Share/ProgressCircleComponent';
import PopupsActions from 'App/Stores/PopUps/Actions';
import {useDispatch} from 'react-redux';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {PLACEHOLDER} = Strings.ImageAddress;

const ClassicQuestion = ({
  data,
  upload,
  currentFile,
  fileError,
  uploading,
  deleteHandler,
  ...rest
}) => {
  const dispatch = useDispatch();

  const [imageTypeModalVisible, setImageTypeModalVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    const subscribe = DeviceEventEmitter.addListener(
      'uploadProgress',
      onUploadProgressChange,
    );

    return () => {
      subscribe.remove();
    };
  }, []);

  const onUploadProgressChange = (val) => {
    setUploadPercentage(val);
  };

  const path = data?.path;

  const onUploadAnswers = async () => {
    setImageTypeModalVisible(true);
  };

  const onCloseModalImageType = () => {
    setImageTypeModalVisible(false);
  };

  const imageOnPressHandler = () => {
    dispatch(
      PopupsActions.showModal(Strings.MODAL_TYPES.IMAGE_VIEWER, {
        images: [{url: path}],
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textAnswer}>{string.QUESTION}</Text>
      {/* {onLoadingImage?<Loading />:null} */}
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY}
        disabled={imageLoading}
        onPress={imageOnPressHandler}
        style={styles.upLoadBtn}>
        {imageLoading && (
          <FastImage
            source={PLACEHOLDER}
            style={[styles.upLoadBtn, {position: 'absolute', zIndex: 1000}]}
            resizeMode={'cover'}
          />
        )}
        <FastImage
          source={{
            uri: path,
          }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          style={styles.upLoadBtn}
          resizeMode={'cover'}
        />
      </TouchableOpacity>
      <Text style={styles.textAnswer}>{string.ANSWERS}</Text>
      {currentFile ? (
        <View style={styles.mainView}>
          <NoteImageCard data={currentFile} deleteOnpress={deleteHandler} />
        </View>
      ) : (
        <>
          <TouchableOpacity
            disabled={uploading}
            onPress={onUploadAnswers}
            style={styles.upLoadBtn}
            activeOpacity={ACTIVE_OPACITY}>
            {uploading ? (
              <ProgressCircleComponent percent={uploadPercentage} />
            ) : (
              <>
                <FontIcon
                  name={Strings.Icons.CLOUD}
                  size={normal * 4.5}
                  color={Colors.lightBlue}
                />
                <Text style={styles.textUpload}>
                  {string.TAP_TO_UPLOAD_NOTE}
                </Text>
              </>
            )}
          </TouchableOpacity>
          {fileError && (
            <Text style={styles.errorText}>{string.FILE_IS_REQUIRED}</Text>
          )}
        </>
      )}
      <ImagePickerModal
        visible={imageTypeModalVisible}
        close={onCloseModalImageType}
        upload={upload}
      />
    </View>
  );
};

export default ClassicQuestion;

/* <TouchableOpacity style={styles.upLoadBtn} activeOpacity={ACTIVE_OPACITY}>
        <Icon
          name="cloud-upload-outline"
          size={normal * 4.5}
          color={Colors.lightBlue}
        />
        <Text style={styles.textUpload}>{string.TAP_TO_UPLOAD_NOTE}</Text>
      </TouchableOpacity> */
