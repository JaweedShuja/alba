import DocumentPicker from 'react-native-document-picker';
import PermissionsService, {
  PERMISSION_ITEMS,
} from 'App/Services/PermissionsService';

const {STORAGE} = PERMISSION_ITEMS;

const picker = async (type) => {
  try {
    const response = await DocumentPicker.pick({
      type: [DocumentPicker.types[type]],
    });
    return response;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log('errrrrrrrrrrrrrrrrrrrrrrr', err);
      return false;
    } else {
      throw err;
    }
  }
};

const pickerHandler = async (type) => {
  try {
    const hasPermission = await PermissionsService.checkPermission(STORAGE);
    if (hasPermission) {
      const res = await picker(type);
      return res;
    } else {
      const reqPermission = await PermissionsService.requestPermission(STORAGE);
      if (reqPermission) {
        const res = await picker(type);
        return res;
      }
    }
  } catch (err) {
    console.log('document picker: ', {err});
    return err;
  }
};

export default pickerHandler;
