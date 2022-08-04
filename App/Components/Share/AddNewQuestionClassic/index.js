import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {useDispatch, useSelector} from 'react-redux';
import pickerHandler from 'App/Services/DocumentPickerService';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import Loading from 'App/Components/Share/Loading';
import ImagePickerModal from 'App/Components/Share/ImagePicker';
import NoteImageCard from 'App/Components/Share/NoteImageCard';
import {string} from 'App/i18n';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import ProgressCircleComponent from 'App/Components/Share/ProgressCircleComponent';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const AddNewQuestionClassic = ({
  navigation,
  courseId,
  upload,
  uploading,
  currentFile,
  fileError,
  deleteHandler,
  ...rest
}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [imageTypeModalVisible, setImageTypeModalVisible] = useState(false);

  const loading = useSelector(
    (state) => state.teacherData.getCourseDetailLoading,
  );

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

  const onUploadAnswers = async () => {
    setImageTypeModalVisible(true);
  };

  const onCloseModal = () => {
    setImageTypeModalVisible(false);
  };

  const onPressedPdfFile = async () => {
    setTimeout(() => {
      setModalVisible(false);
    }, 500);
    try {
      const response = await pickerHandler('pdf');
      if (response.type === 'application/pdf') {
        const file = {
          name: 'response.pdf',
          type: response?.type,
          uri: response?.uri,
        };
        const formData = new FormData();
        formData.append('file', file);
        upload(formData, 'PDF');
      }
    } catch (error) {
      console.log('pdfFileError==>', error);
    }
  };

  const onPressedImageFile = () => {
    setImageTypeModalVisible(true);
  };

  const handleComplete = async (value) => {
    if (currentFile) {
      const noteObject = {
        title: value.noteName,
        noteType: currentFile?.noteType,
        file: currentFile?._id,
        courseId: courseId,
      };
      dispatch(TeacherDataActions.addNote(noteObject));
    } else {
      //setFileError(true);
    }
  };

  const onCloseModalImageType = () => {
    setImageTypeModalVisible(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{string.QUESTION}</Text>
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

export default AddNewQuestionClassic;
