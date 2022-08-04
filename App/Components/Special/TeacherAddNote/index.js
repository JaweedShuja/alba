import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  I18nManager,
  DeviceEventEmitter,
} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import pickerHandler from 'App/Services/DocumentPickerService';
import TeacherDataActions from 'App/Stores/TeacherData/Actions';
import AppDataActions from 'App/Stores/AppData/Actions';
import Loading from 'App/Components/Share/Loading';
import ImagePickerModal from 'App/Components/Share/ImagePicker';
import Modal from 'react-native-modal';
import {uploadResponseHandler} from 'App/utils/uploadResponseHandler';
import NotePdfCard from 'App/Components/Share/NotePdfCard';
import NoteImageCard from 'App/Components/Share/NoteImageCard';
import CompleteBtnAddNote from 'App/Components/Share/CompleteBtnAddNote';
import {string} from 'App/i18n';
import {useStrings} from 'App/Values/Strings';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import FastImage from 'react-native-fast-image';
import {uploadFile} from 'App/utils/uploadFile';
import ProgressCircleComponent from 'App/Components/Share/ProgressCircleComponent';
import {isIOS} from 'react-native-elements/dist/helpers';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const TeacherAddNote = ({navigation, courseId}) => {
  const dispatch = useDispatch();
  const stringData = useStrings();

  const {VALIDATION_TEACHER_ADD_NOTE} = stringData;

  const [modalVisible, setModalVisible] = useState(false);
  const [imageTypeModalVisible, setImageTypeModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const loading = useSelector(
    (state) => state.teacherData.getCourseDetailLoading,
  );

  const addNoteLoading = useSelector(
    (state) => state.teacherData.addNoteLoading,
  );

  const courseDetail = useSelector(
    (state) => state?.teacherData.getCourseDetailSuccess,
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

  useEffect(() => {
    dispatch(TeacherDataActions.getCourseDetail(courseId));
  }, []);

  const onUploadProgressChange = (val) => {
    setUploadPercentage(val);
  };

  const onUploadAnswers = async () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onPressedPdfFile = async () => {
    try {
      setTimeout(() => {
        if (!isIOS) setModalVisible(false);
      }, 500);
      const pdfResponse = await pickerHandler('pdf');
      let response = [];
      if (!Array.isArray(pdfResponse)) {
        response.push(pdfResponse);
      } else {
        response = pdfResponse;
      }
      console.log({response, pdfResponse});

      setModalVisible(false);
      if (isIOS) {
        var type = response?.[0]?.name?.split('.').pop();
        console.log({response});
        if (type == 'pdf') {
          const file = {
            name: 'response.pdf',
            type: 'application/pdf',
            uri: response?.[0]?.uri,
          };
          const formData = new FormData();
          formData.append('file', file);
          upload(formData, 'PDF');
          setModalVisible(false);
        }
      } else {
        if (response?.[0]?.type === 'application/pdf') {
          const file = {
            name: 'response.pdf',
            type: response?.[0]?.type,
            uri: response?.[0]?.uri,
          };
          const formData = new FormData();
          formData.append('file', file);
          upload(formData, 'PDF');
        }
      }
    } catch (error) {
      console.log('pdfFileError==>', error);
    }
  };

  const onPressedImageFile = () => {
    setModalVisible(false);
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
      console.log(addNoteLoading);
    } else {
      setFileError(true);
    }
  };

  const onCloseModalImageType = () => {
    setImageTypeModalVisible(false);
  };

  const upload = async (formData, type) => {
    try {
      setUploading(true);
      const response = await uploadFile(formData, type);
      setUploading(false);
      const payload = uploadResponseHandler(response);
      setCurrentFile({
        _id: payload?.payload?._id,
        title: payload?.payload?.filename,
        noteType: type,
        file: {
          id: payload?.payload?._id,
          path: payload?.payload?.path,
        },
      });
      setFileError(false);
    } catch (error) {
      setUploading(false);
      console.log('uploadFile Error', error);
    }
  };

  const deleteHandler = () => {
    const id = currentFile?._id;
    dispatch(AppDataActions.deleteFile(id));
    setCurrentFile(null);
    setFileError(true);
  };

  const ModalUpload = () => {
    return (
      <Modal
        isVisible={modalVisible}
        backdropColor="rgba(0,0,0,0.5)"
        onBackdropPress={onCloseModal}>
        <View style={styles.viewMainModal}>
          <View style={styles.viewExit}>
            <Text style={styles.textTitleModal}>
              {string.WHAT_TYPE_OF_FILE_DO_YOU_WANT_TO_UPLOAD}
            </Text>
            <TouchableOpacity
              onPress={onCloseModal}
              activeOpacity={ACTIVE_OPACITY}>
              <FontIcon
                name={Strings.Icons.CANCEL}
                color={Colors.textColorLess}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.borderView} />
          <TouchableOpacity
            onPress={onPressedPdfFile}
            style={styles.modalBtn}
            activeOpacity={ACTIVE_OPACITY}>
            <FastImage
              source={Strings.ImageAddress.PDF}
              style={styles.image}
              resizeMode={'cover'}
            />
            <Text style={styles.textModalBtn}>{string.UPLOAD_PDF_FILE}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressedImageFile}
            style={styles.modalBtn}
            activeOpacity={ACTIVE_OPACITY}>
            <FontIcon
              name={Strings.Icons.GALLERY}
              color={Colors.white}
              size={normal * 2}
            />
            {/* TODO - icon name for image */}
            <Text style={styles.textModalBtn}>{string.UPLOAD_IMAGE}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          noteName: '',
        }}
        onSubmit={handleComplete}
        validationSchema={yup.object().shape(VALIDATION_TEACHER_ADD_NOTE)}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => {
          return (
            <KeyboardAvoidingView
              style={styles.container}
              enabled
              // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <ScrollView
                keyboardShouldPersistTaps="always"
                style={styles.scrollView}
                contentContainerStyle={styles.FlatList}>
                <Text style={styles.title}>{string.COURSE_DETAIL}</Text>
                <View style={styles.viewCourseDetail}>
                  <Text style={styles.textGrade}>
                    {`${courseDetail?.grade?.title} ${string.OF} ${courseDetail?.grade?.category?.title}`}
                  </Text>
                  <Text style={styles.textLesson}>{courseDetail?.title}</Text>
                </View>
                <Text style={styles.title}>{string.NOTE_NAME}</Text>
                <View style={styles.viewNoteName}>
                  <FontIcon
                    name={Strings.Icons.PENCIL}
                    size={normal * 2}
                    color={Colors.lightBlue}
                  />
                  <TextInput
                    placeholder={string.ENTER_NOTE_NAME}
                    style={styles.textInput}
                    value={values.noteName}
                    onChangeText={handleChange('noteName')}
                    onBlur={() => setFieldTouched('noteName')}
                    textAlign={I18nManager.isRTL ? 'right' : 'left'}
                  />
                </View>

                {touched.noteName && errors.noteName && (
                  <Text style={styles.errorText}>{errors.noteName}</Text>
                )}
                {/* change string.ANSWERS to string.NOTES */}
                <Text style={styles.title}>{string.ANSWERS}</Text>
                {currentFile ? (
                  <View style={styles.mainView}>
                    {currentFile.noteType === 'PDF' ? (
                      <NotePdfCard
                        data={currentFile}
                        deleteOnpress={deleteHandler}
                      />
                    ) : (
                      <NoteImageCard
                        data={currentFile}
                        deleteOnpress={deleteHandler}
                      />
                    )}
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
                      <Text style={styles.errorText}>
                        {string.FILE_IS_REQUIRED}
                      </Text>
                    )}
                  </>
                )}
              </ScrollView>
              <CompleteBtnAddNote
                onSubmit={handleSubmit}
                title={string.COMPLETE}
                loading={addNoteLoading}
                disabled={addNoteLoading}
              />
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
      <ModalUpload />
      <ImagePickerModal
        visible={imageTypeModalVisible}
        close={onCloseModalImageType}
        upload={upload}
      />
    </View>
  );
};

export default TeacherAddNote;

/* <TouchableOpacity
                onPress={handleSubmit}
                style={styles.btn}
                activeOpacity={ACTIVE_OPACITY}>
                <Text style={style.textBtn}>{string.COMPLETE}</Text>
              </TouchableOpacity> */
