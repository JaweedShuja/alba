//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
import React, {useEffect, useState} from 'react';
import {Linking, I18nManager} from 'react-native';
import Container from 'App/Components/Container';
import Main from 'App/Components/Main';
import BanerHeader from 'App/Components/Share/BanerHeader';
import {string} from 'App/i18n';
import AppDataActions from 'App/Stores/AppData/Actions';
import StartupActions from 'App/Stores/Startup/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {navigate, navigateAndReset} from '../../Services/NavigationService';
import Strings from '../../Values/Strings';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from 'App/Components/Share/Loading';

//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired

const {
  RESET_PASSWORD_SCREEN,
  STUDENT_STACK,
  STUDENTS_BOTTOMS_TABS,
  TEACHER_BOTTOMS_TABS,
} = Strings.Routes;

const MainScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const forceRtl = I18nManager.forceRTL;

  const [watchTypeLoading, setWatchTypeLoading] = useState(true);

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

  //const language = useSelector((state) => state?.appData?.region);
  const language = useSelector((state) => state?.startUp?.region);

  useEffect(() => {
    //dispatch(AppDataActions.getCategories());
    // dispatch(AppDataActions.setCurrentGradeId(''));
    languageHandler();
    getStHomeListWatchType();
  }, []);

  const getStHomeListWatchType = async () => {
    try {
      const watchType = await AsyncStorage.getItem('homeListWatchType');
      if (watchType === 'student') {
        navigateAndReset(STUDENTS_BOTTOMS_TABS);
      } else if (watchType === 'teacher') {
        navigateAndReset(TEACHER_BOTTOMS_TABS);
      } else {
        navigateAndReset(STUDENTS_BOTTOMS_TABS);
        setWatchTypeLoading(false);
      }
      console.log('watchType=>', watchType);
    } catch (error) {
      console.log('error1', error);
      setWatchTypeLoading(false);
    }
  };

  const languageHandler = () => {
    if (language) {
      string.setLanguage(language?.code);
      if (language?.code === 'ar') {
        forceRtl(true);
        //Reastart.Restart();
      } else {
        forceRtl(false);
      }
    } else {
      string.setLanguage(arabicItem?.code);
      forceRtl(true);
      //dispatch(AppDataActions.selectedRegion(arabicItem));
      dispatch(StartupActions.selectedRegion(arabicItem));
    }
  };

  // if (watchTypeLoading) {
  //   return <Loading />;
  // }

  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired
  //this component expired

  return (
    <Container {...{navigation}}>
      <BanerHeader />
      <Loading />
      {/* <Main /> */}
    </Container>
  );
};

export default MainScreen;
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
//this component expired
