import React from 'react';
import {View, Text, TouchableOpacity, Linking, Dimensions} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import FastImage from 'react-native-fast-image';
import {string} from 'App/i18n';
const {width} = Dimensions.get('screen');
const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const ContactUsTop = ({data}) => {
  const temp = data.contactInfo;

  const phoneOnPressHandler = () => {
    Linking.openURL(`tel:${temp.phoneNumber}`);
  };

  const emailOnPressHandler = () => {
    Linking.openURL(`mailto:${temp.email}`);
  };


  const whatsAppPressHandler = () => {
    Linking.openURL('whatsapp://send?text=hello&phone='+temp.phoneNumber)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{string.CONTACT_INFO}</Text>
      <View style={styles.viewParent}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={ACTIVE_OPACITY}
          onPress={emailOnPressHandler}>
          <FastImage
            source={require('App/Assets/icons/email.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.text}>{temp?.email}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={ACTIVE_OPACITY}
          onPress={phoneOnPressHandler}>
          <FastImage
            source={require('App/Assets/icons/phone-call.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.text}>{temp?.phoneNumber}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewParent}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={ACTIVE_OPACITY}
          onPress={whatsAppPressHandler}>
          <FastImage
            source={require('App/Assets/icons/whatsapp.png')}
            style={[styles.image,{
              width: width * 0.07,
              height: width * 0.07,
            }]}
            resizeMode="cover"
          />
          <Text style={styles.text}>{temp?.phoneNumber}</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export default ContactUsTop;
