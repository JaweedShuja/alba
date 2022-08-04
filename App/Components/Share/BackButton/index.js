import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './style';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import Strings from 'App/Values/Strings';
import {goBack} from 'App/Services/NavigationService';
import {fontIconReverseHandler} from 'App/utils/layoutIconHandler';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {navigateAndReset} from '../../../Services/NavigationService';
import {useSelector} from 'react-redux';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;
const {STUDENTS_BOTTOMS_TABS, TEACHER_BOTTOMS_TABS} = Strings.Routes;

const BackButton = ({
  navigation,
  color = false,
  backgroundColor = 'transparent',
  backHandler,
  backListener,
  style,
  fromResponse = false,
}) => {
  const [colorPressIn, setColorPressIn] = useState(false);
  const userType = useSelector((state) => state.appData.isTeacher);
  const onPressGoBack = () => {
    if (fromResponse) {
      if (userType) navigateAndReset(TEACHER_BOTTOMS_TABS);
      else navigateAndReset(STUDENTS_BOTTOMS_TABS);
    } else {
      if (backHandler) {
        return backHandler();
      }
      goBack();
    }
  };

  const goBackFromChat = () => {
    backListener();
  };

  const onPressIn = (press) => {
    setColorPressIn(press);
  };

  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          backgroundColor: colorPressIn ? 'rgba(0,0,0,0.2)' : backgroundColor,
        },
        style,
      ]}
      activeOpacity={ACTIVE_OPACITY}
      onPressIn={() => onPressIn(true)}
      onPressOut={() => onPressIn(false)}
      onPress={backListener ? goBackFromChat : onPressGoBack}>
      <FontIcon
        name={Strings.Icons.RIGHT_SMALL}
        size={normal * 1.8}
        color={color === true ? Colors.white : Colors.text}
        style={fontIconReverseHandler()}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
