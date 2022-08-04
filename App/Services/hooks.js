import React, {useEffect} from 'react';
import {BackHandler, I18nManager, Linking} from 'react-native';
import Strings from 'App/Values/Strings';
import {goBack} from 'App/Services/NavigationService';
import {useDispatch, useSelector} from 'react-redux';
import PopupsActions from 'App/Stores/PopUps/Actions';
import AppDataActions from 'App/Stores/AppData/Actions';
import StartupActions from 'App/Stores/Startup/Actions';
import {string} from 'App/i18n';
import RNRestart from 'react-native-restart';
import {navigate} from 'App/Services/NavigationService';

const {STUDENT_STACK} = Strings.Routes;

export const useExitAppConfirmation = () => {
  const dispatch = useDispatch();

  const onPressedExit = async () => {
    dispatch(
      PopupsActions.showModal(Strings.MODAL_TYPES.CONFIRM_MODAL, {
        description: string.ARE_YOU_SURE_YOU_WANT_TO_EXIT,
        confirm: () => {
          BackHandler.exitApp();
        },
        cancel: () => {
          dispatch(PopupsActions.hideModal(Strings.MODAL_TYPES.CONFIRM_MODAL));
          null;
        },
      }),
    );
  };

  const backAction = () => {
    onPressedExit();
    return true;
  };

  useEffect(() => {
    const goBackRes = goBack();
    console.log({goBackRes});
    if (!goBackRes) {
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }
  }, []);
};

export const useLanguageHandler = () => {
  const dispatch = useDispatch();
  const forceRtl = I18nManager.forceRTL;

  //const language = useSelector((state) => state?.appData?.region);
  const language = useSelector((state) => state?.startUp?.region);

  if (language) {
    console.log('w*=>firstTirme condition true', language);
    string.setLanguage(language?.code);
    if (language?.code === 'ar') {
      forceRtl(true);
    } else {
      forceRtl(false);
    }
  } else {
    console.log('w*=>firstTirme condition false', language);
    const arabicItem = {
      language: 'العربية',
      isRtl: true,
      code: 'ar',
      flag: 'iraq',
    };

    const englishItem = {
      language: 'English',
      isRtl: false,
      code: 'en',
      flag: 'usa',
    };
    string.setLanguage(arabicItem?.code);
    forceRtl(true);
    //dispatch(AppDataActions.selectedRegion(arabicItem));
    dispatch(StartupActions.selectedRegion(arabicItem));
  }
};

export const useInitialURL = () => {
  useEffect(() => {
    getUrlAsync();
  }, []);

  const getUrlAsync = async () => {
    console.log('252526');
    // Get the deep link used to open the app
    const initialUrl = await Linking.getInitialURL();
    var fields = initialUrl?.split('/');
    console.log({fields});

    if (initialUrl) {
      navigate(STUDENT_STACK, {
        screen: fields[2],
        params: {token: fields[3]},
      });
      return initialUrl;
    } else {
      return null;
    }
  };
  return {getUrlAsync};
};

// const useMount = (func) => useEffect(() => func(), []);

// export const useInitialURL = () => {
//   const [url, setUrl] = useState(null);
//   const [processing, setProcessing] = useState(true);

//   useMount(() => {
//     const getUrlAsync = async () => {
//       console.log('252526');
//       // Get the deep link used to open the app
//       const initialUrl = await Linking.getInitialURL();
//       var fields = initialUrl?.split('/');
//       // The setTimeout is just for testing purpose
//       setTimeout(() => {
//         if (initialUrl) {
//           navigate(STUDENT_STACK, {
//             screen: fields[2],
//             params: {token: fields[3]},
//           });
//         }
//         setUrl(initialUrl);
//         setProcessing(false);
//       }, 1000);
//     };

//     getUrlAsync();
//   });

//   return {url, processing};
// };
