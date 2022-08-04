import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  I18nManager,
} from 'react-native';
import Strings from 'App/Values/Strings';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'App/Theme';
import styles from './style';
import {navigate, goBack} from 'App/Services/NavigationService';
import {string} from 'App/i18n';
import {
  fontIconHandler,
  fontIconReverseHandler,
} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {BANNER_HEADER_IMAGE} = Strings.ImageAddress;
const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {CONTACT_US_SCREEN} = Strings.Routes;
const typePlatform = Platform.OS;
const positionRTL = I18nManager.isRTL ? true : false;
const isIos = Platform.OS === 'ios' ? true : false;
let a = false;
if (positionRTL) {
  a = false;
  if (isIos) a = false;
} else {
  a = false;
  if (isIos) a = false;
}
const BanerHeader = ({back = false}) => {
  const onPressGoToContactUs = () => {
    navigate(CONTACT_US_SCREEN);
  };

  const goBackHandler = () => {
    goBack();
  };

  return (
    <ImageBackground
      style={styles.container}
      source={BANNER_HEADER_IMAGE}
      resizeMode={'cover'}>
      {back && (
        <View style={styles.back}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={goBackHandler}>
            <FontIcon
              name={Strings.Icons.RIGHT_SMALL}
              size={20}
              color={Colors.white}
              style={fontIconReverseHandler()}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={[styles.header, back ? styles.top1 : styles.top2]}>
        <View style={styles.viewGradient}>
          <LinearGradient
            // start={{x: 0.0, y: 0}}
            // end={{x: 0.5, y: 1.0}}
            // locations={[0, 50]}
            start={typePlatform === 'ios' ? {x: 0.0, y: 1} : {x: 0.0, y: 0}}
            end={typePlatform === 'ios' ? {x: 0.5, y: 6.0} : {x: 0.5, y: 1.0}}
            locations={{x: 0.5, y: 1.0} ? [0, 0.5, 0.6] : [0, 50]}
            colors={['#7776ff', '#ad2cf1']}
            style={styles.linearGradient}>
            <TouchableOpacity
              style={styles.contactBTN}
              activeOpacity={ACTIVE_OPACITY}
              onPress={onPressGoToContactUs}>
              {a ? (
                <>
                  <FontIcon
                    name={Strings.Icons.RIGHT_SMALL}
                    size={20}
                    color={Colors.white}
                    // style={{transform: [{rotateY: '0deg'}]}}
                    style={fontIconHandler()}
                  />
                  <Text style={styles.textContact}>
                    {string.CONTACT_US_TO_BUY}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.textContact}>
                    {string.CONTACT_US_TO_BUY}
                  </Text>
                  <FontIcon
                    name={Strings.Icons.RIGHT_SMALL}
                    size={20}
                    color={Colors.white}
                    // style={{transform: [{rotateY: '0deg'}]}}
                    style={fontIconHandler()}
                  />
                </>
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BanerHeader;
