import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageCropperPicker from 'react-native-image-crop-picker';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import styles from './style';
import {normal} from 'App/Theme/Metrics';
import Modal from 'react-native-modal';
import {string} from 'App/i18n';
import PermissionsService, {
  PERMISSION_ITEMS,
} from 'App/Services/PermissionsService';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import pickerHandler from '../../../Services/DocumentPickerService';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {showToast} from '../../../utils/showToast';
import {isIOS} from 'react-native-elements/dist/helpers';
const {STORAGE, CAMERA} = PERMISSION_ITEMS;

const ImagePickerPopup = ({
  visible,
  close,
  upload,
  includeVideo,
  includePdf,
}) => {
  const {ACTIVE_OPACITY} = Strings.CONSTANTS;
  //=============VARIABLES=============
  const options = {
    storageOptions: {
      noData: true,
      path: 'images',
    },
  };

  //=============FUNCTION=============
  const onPress = (key) => {
    switch (key) {
      case 'camera':
        activeCamera();
        break;

      case 'gallery':
        launchLibrary();

        break;

      case 'video':
        launchVideoPicker();

        break;

      case 'pdf':
        launchPdfPicker();
        break;

      default:
        break;
    }
  };

  const launchVideoPicker = async () => {
    if (isIOS) {
      ImagePicker.openPicker({
        mediaType: 'video',
      }).then((video) => {
        console.log({video});
        const files = {
          name: video?.filename,
          type: video?.mime,
          uri: video?.path,
        };
        const formData = new FormData();
        formData.append('file', files);
        upload(formData, 'VIDEO');
        close();
      });
    } else {
      const videoAdress = await pickerHandler('video');
      console.log({videoAdress});
      const files = {
        type: videoAdress?.[0]?.type,
        uri: videoAdress?.[0]?.uri,
      };
      const formData = new FormData();
      formData.append('file', files);
      upload(formData, 'VIDEO');
      close();
    }

    // console.log('videoAdress', videoAdress);
    // upload(videoAdress, 'video');
  };
  const launchPdfPicker = async () => {
    const pdfResponse = await pickerHandler('pdf');
    let pdfAdress = [];
    if (!Array.isArray(pdfResponse)) {
      pdfAdress.push(pdfResponse);
    } else {
      pdfAdress = pdfResponse;
    }
    console.log({pdfAdress});
    if (isIOS) {
      const files = {
        name: 'response.pdf',
        type: 'application/pdf',
        uri: pdfAdress?.[0]?.uri,
      };
      const formData = new FormData();
      formData.append('file', files);
      upload(formData, 'PDF');
      close();
    } else {
      const files = {
        type: pdfAdress?.[0]?.type,
        uri: pdfAdress?.[0]?.uri,
      };
      const formData = new FormData();
      formData.append('file', files);
      upload(formData, 'PDF');
      close();
    }

    // console.log('videoAdress', videoAdress);
    // upload(videoAdress, 'video');
  };
  const launchLibrary = async () => {
    try {
      const hasStoragePermission = await PermissionsService.checkPermission(
        STORAGE,
      );

      if (hasStoragePermission) {
        if (isIOS) {
          ImagePicker.openPicker({
            cropping: true,
          })
            .then((response) => {
              console.log({response});
              uploadImage(response);
              close();
            })
            .catch((err) => {
              showToast('e', string.SOMETHING_WENT_WRONG);
            });
        } else {
          launchImageLibrary(options, (response) =>
            cropImage(response?.assets?.[0]),
          );
          close();
        }
      } else {
        const reqPermission = await PermissionsService.requestPermission(
          STORAGE,
        );
        if (reqPermission) {
          launchImageLibrary(options, (response) =>
            cropImage(response?.assets?.[0]),
          );
        }
      }
    } catch (err) {
      console.log({err});
    }
  };

  const activeCamera = async () => {
    try {
      if (isIOS) {
        ImagePicker.openCamera({
          cropping: true,
        })
          .then((response) => {
            console.log({response});
            uploadImage(response);
            close();
          })
          .catch((err) => {
            showToast('e', string.SOMETHING_WENT_WRONG);
          });
      } else {
        const hasCameraPermission = await PermissionsService.checkPermission(
          CAMERA,
        );
        if (hasCameraPermission) {
          launchCamera(options, (response) => cropImage(response?.assets?.[0]));
        } else {
          const reqPermission = await PermissionsService.requestPermission(
            CAMERA,
          );
          if (reqPermission) {
            launchCamera(options, (response) =>
              cropImage(response?.assets?.[0]),
            );
          }
        }
        close();
      }
    } catch (err) {
      console.log({err});
    }
  };

  const cropImage = (response) => {
    console.log('IMAGE PICK RESPONSE', response);
    if (response?.uri) {
      let w = response.width;
      let h = response.height;
      if (w > h) {
        w = response.height;
        h = response.width;
      }
      const path = response?.uri;
      let compressImageQuality = 1;
      if (response.fileSize > 1000000 && response.fileSize <= 2000000) {
        compressImageQuality = 0.97;
      } else if (response.fileSize > 2000000 && response.fileSize <= 3000000) {
        compressImageQuality = 0.92;
      } else if (response.fileSize > 3000000 && response.fileSize <= 5000000) {
        compressImageQuality = 0.88;
      } else if (response.fileSize > 5000000) {
        compressImageQuality = 0.8;
      }
      ImageCropperPicker.openCropper({
        path,
        width: w,
        height: h,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality,
      })
        .then((image) => {
          uploadImage(image);
        })
        .catch((err) => {
          console.log({err});
        });
    }
  };

  const uploadImage = async (response) => {
    const files = {
      name: response?.mime.split('/')[1],
      type: response?.mime,
      uri: response?.path,
    };
    const formData = new FormData();
    formData.append('file', files);

    upload(formData, 'PICTURE');
  };

  return (
    <Modal
      isVisible={visible}
      backdropColor="rgba(0,0,0,0.5)"
      onBackdropPress={close}>
      <View style={styles.viewMainModal}>
        <View style={styles.viewExit}>
          <Text style={styles.textTitleModal}>{string.SELECT_IMAGE}</Text>
          <TouchableOpacity onPress={close} activeOpacity={ACTIVE_OPACITY}>
            <FontIcon
              name={Strings.Icons.CANCEL}
              color={Colors.textColorLess}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.borderView} />
        <TouchableOpacity
          onPress={onPress.bind(null, 'camera')}
          style={styles.modalBtn}
          activeOpacity={ACTIVE_OPACITY}>
          <FontIcon
            name={Strings.Icons.CAMERA}
            color={Colors.white}
            size={normal * 2}
          />
          <Text style={styles.textModalBtn}>{string.SELECT_FROM_CAMERA}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPress.bind(null, 'gallery')}
          style={styles.modalBtn}
          activeOpacity={ACTIVE_OPACITY}>
          <FontIcon
            name={Strings.Icons.GALLERY}
            color={Colors.white}
            size={normal * 2}
          />
          <Text style={styles.textModalBtn}>{string.SELECT_FROM_GALLERY}</Text>
        </TouchableOpacity>
        {includeVideo && (
          <TouchableOpacity
            onPress={onPress.bind(null, 'video')}
            style={styles.modalBtn}
            activeOpacity={ACTIVE_OPACITY}>
            <FontIcon
              name={Strings.Icons.CAMERA}
              color={Colors.white}
              size={normal * 2}
            />
            <Text style={styles.textModalBtn}>
              {string.SELECT_VIDEO_FROM_GALLERY}
            </Text>
          </TouchableOpacity>
        )}
        {includePdf && (
          <TouchableOpacity
            onPress={onPress.bind(null, 'pdf')}
            style={styles.modalBtn}
            activeOpacity={ACTIVE_OPACITY}>
            <FastImage
              source={Strings.ImageAddress.PDF}
              style={styles.image}
              resizeMode={'cover'}
            />
            <Text style={styles.textModalBtn}>
              {string.SELECT_PDF_FROM_GALLERY}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default ImagePickerPopup;
