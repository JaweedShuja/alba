import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import Strings from 'App/Values/Strings';
import BackButton from 'App/Components/Share/BackButton';
import FastImage from 'react-native-fast-image';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {string} from 'App/i18n';
import {navigate, navigateAndReset} from '../../../Services/NavigationService';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const Header = ({
  title,
  style,
  navigation,
  close = false,
  image = '',
  fromResponseHandler = false,
  login = false,
  backHandler,
  isTyping,
  backListener = false,
  isChat,
  fromResponse = false,
}) => {
  const [colorPressIn, setColorPressIn] = useState(false);

  const onPressGoBack = () => {
    console.log('StudentSignUpCompletionScreen', fromResponse);

    if (backHandler) {
      return backHandler();
    }
    navigation.goBack();
  };
  const onPressIn = (press) => {
    setColorPressIn(press);
  };

  const IS_TYPING = string.CHAT_IS_TYPING;
  const ONLINE = string.CHAT_ONLINE;

  return (
    <View style={[styles.container, style]}>
      {close == false ? (
        <BackButton
          {...{navigation, backHandler, backListener, fromResponse}}
        />
      ) : (
        <TouchableOpacity
          style={[
            styles.btnClose,
            {
              backgroundColor: colorPressIn ? 'rgba(0,0,0,0.2)' : 'white',
            },
          ]}
          activeOpacity={ACTIVE_OPACITY}
          onPressIn={() => onPressIn(true)}
          onPressOut={() => onPressIn(false)}
          onPress={onPressGoBack}>
          <FontIcon
            name={Strings.Icons.CANCEL}
            size={normal * 1.8}
            color={Colors.Text}
          />
        </TouchableOpacity>
      )}
      {image === '' ? (
        <View style={styles.imageView1}>
          <Text style={[styles.title]}>{title}</Text>
        </View>
      ) : (
        <View style={styles.imageView}>
          <FastImage source={{uri: image}} style={styles.image} />
          <View>
            <Text style={[styles.title, {fontSize: normal * 1.6}]}>
              {title}
            </Text>
            {isChat && (
              <Text style={[styles.title, {fontSize: normal * 1.2}]}>
                {isTyping ? IS_TYPING : ONLINE}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

// console.log('navigation.goBack()', goBack());
// if (!fromResponseHandler && login) RNExitApp.exitApp();
// else goBack();
