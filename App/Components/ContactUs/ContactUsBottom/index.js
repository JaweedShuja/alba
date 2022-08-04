import React, {useState} from 'react';
import {View, Text, TouchableOpacity, LayoutAnimation} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import {getLightnessOfRGB} from 'App/utils/getLightnessOfRGB';
import {navigate} from 'App/Services/NavigationService';
import {string} from 'App/i18n';
import {fontIconHandler, fontIconHandlerX} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const {
  STUDENT_STACK,

  SHOP_LIST_SCREEN,
} = Strings.Routes;

const ContactUsBottom = ({data}) => {
  const temp = data?.contactDetail;

  const [currentIndex, setCurrentIndex] = useState(null);

  const bgColor = 'rgba(255,113,107,1)';

  const color =
    getLightnessOfRGB(bgColor) === 'light' ? Colors.text : Colors.white;

  const getCodeHandler = () => {
    navigate(STUDENT_STACK, {screen: SHOP_LIST_SCREEN});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={getCodeHandler}
        style={[styles.btn, {backgroundColor: bgColor}]}
        activeOpacity={ACTIVE_OPACITY}>
        <View style={styles.content}>
          <Text style={[styles.text, {color: color}]}>
            {string.PLACES_YOU_CAN_GET_CODE}
          </Text>
          {/* <Icon name={IconHandler()} color={color} size={normal * 1.5} /> */}
          <FontIcon
            name={Strings.Icons.RIGHT_SMALL}
            color={color}
            size={normal * 1.5}
            style={fontIconHandler()}
          />
        </View>
      </TouchableOpacity>
      {temp.map((item, index) => (
        <Collapse key={index} {...{item, currentIndex, setCurrentIndex}} />
      ))}
    </View>
  );
};

const Collapse = ({item, currentIndex, setCurrentIndex}) => {
  const color =
    getLightnessOfRGB(item?.color) === 'light' ? Colors.text : Colors.white;

  const toggleExpand = (itm) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    currentIndex === itm?._id ? setCurrentIndex(0) : setCurrentIndex(itm?._id);
  };

  return (
    <TouchableOpacity
      onPress={toggleExpand.bind('null', item)}
      style={[styles.btn, {backgroundColor: item.color}]}
      activeOpacity={ACTIVE_OPACITY}>
      <View style={styles.content}>
        <Text style={[styles.text, {color: color}]}>{item?.title}</Text>
        <FontIcon
          name={Strings.Icons.RIGHT_SMALL}
          color={color}
          size={normal * 1.5}
          style={
            currentIndex === item?._id ? fontIconHandlerX() : fontIconHandler()
          }
        />
      </View>
      {currentIndex === item?._id && (
        <View style={styles.description}>
          <Text style={[styles.text, {color: color}]}>{item?.description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ContactUsBottom;
