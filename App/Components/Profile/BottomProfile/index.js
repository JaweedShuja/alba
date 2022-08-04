import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  I18nManager,
  Linking,
} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import FastImage from 'react-native-fast-image';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import AppDataActions from 'App/Stores/AppData/Actions';
import StartupActions from 'App/Stores/Startup/Actions';
import {string} from 'App/i18n';
import {useSelector, useDispatch} from 'react-redux';
import iraq from 'App/Assets/icons/iraq.png';
import usa from 'App/Assets/icons/usa.png';
import RNRestart from 'react-native-restart';
import Loading from 'App/Components/Share/Loading';
import {fontIconHandlerX, fontIconHandler} from 'App/utils/layoutIconHandler';

const {ACTIVE_OPACITY, PRIVACY_POLICY_URL, TERMS_URL} = Strings.CONSTANTS;

const BottomProfile = ({data}) => {
  const settings = [
    {
      title: string.PRIVACY_POLICY,
      icon: Strings.Icons.LOGIN,
      image: '',
      index: 1,
      key: 'privacyPolicy',
    },
    {
      title: string.TERMS_AND_CONDITIONS,
      icon: Strings.Icons.MAIL,
      image: '',
      index: 2,
      key: 'terms',
    },
  ];

  const onPressHandler = (item) => {
    switch (item?.key) {
      case 'privacyPolicy':
        Linking.openURL(PRIVACY_POLICY_URL);
        break;
      case 'terms':
        Linking.openURL(TERMS_URL);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Collapse />
      {settings.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.btn}
          activeOpacity={ACTIVE_OPACITY}
          onPress={onPressHandler.bind('null', item)}>
          <View style={styles.viewleft}>
            {item?.icon === '' ? (
              <FastImage
                source={item?.image}
                style={styles.image}
                resizeMode={'cover'}
              />
            ) : (
              <FontIcon
                name={item.icon}
                size={normal * 2.5}
                color={Colors.lightBlue}
              />
            )}

            <Text style={styles.text}>{item.title}</Text>
          </View>
          <FontIcon
            name={Strings.Icons.RIGHT_SMALL}
            size={normal * 2.5}
            color={Colors.lightBlue}
            style={fontIconHandler()}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Collapse = () => {
  const dispatch = useDispatch();
  const forceRtl = I18nManager.forceRTL;
  const languages = [
    {
      language: 'العربية',
      isRtl: true,
      code: 'ar',
      flag: 'iraq',
    },
    {
      language: 'English',
      isRtl: false,
      code: 'en',
      flag: 'usa',
    },
  ];
  const [lang, setLang] = useState(false);
  const [enabled, setEnabled] = useState(false);
  //const language = useSelector((state) => state?.appData?.region);
  const language = useSelector((state) => state?.startUp?.region);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEnabled((prevState) => !prevState);
  };
  const [loading, setLoading] = useState(false);

  const languageHandler = (item) => {
    setLoading(true);
    if (language?.code !== item.code) {
      string.setLanguage(item.code);
      //dispatch(AppDataActions.selectedRegion(item));
      dispatch(StartupActions.selectedRegion(item));
      setLang((prevState) => !prevState);
      toggleExpand();
      item.code === 'ar' ? forceRtl(true) : forceRtl(false);
      setTimeout(() => {
        RNRestart.Restart();
        // navigation.navigate(Strings.Routes.ACCOUNT_TYPE_SCREEN)
      }, 1000);
    } else {
      toggleExpand();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <TouchableOpacity
      onPress={toggleExpand}
      style={styles.collapse}
      activeOpacity={ACTIVE_OPACITY}>
      <View style={styles.btn1}>
        <View style={styles.viewleft}>
          <FastImage
            source={language?.flag === 'iraq' ? iraq : usa}
            style={styles.image}
            resizeMode={'cover'}
          />

          <Text style={styles.text}>{language?.language}</Text>
        </View>
        <FontIcon
          name={Strings.Icons.RIGHT_SMALL}
          size={normal * 2.5}
          color={Colors.lightBlue}
          style={enabled ? fontIconHandlerX() : fontIconHandler()}
        />
      </View>
      {enabled &&
        languages.map(
          (item, index) =>
            item?.code !== language?.code && (
              <TouchableOpacity
                activeOpacity={ACTIVE_OPACITY}
                key={index}
                style={styles.btn1}
                onPress={languageHandler.bind('null', item)}>
                <View style={styles.viewleft}>
                  <FastImage
                    source={item?.flag === 'iraq' ? iraq : usa}
                    style={styles.image}
                    resizeMode={'cover'}
                  />
                  <Text style={styles.text}>{item?.language}</Text>
                </View>
                <Ionicons
                  name={
                    item?.code === language?.code
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                  size={normal * 2.5}
                  color={Colors.lightBlue}
                />
              </TouchableOpacity>
            ),
        )}
    </TouchableOpacity>
  );
};

export default BottomProfile;
