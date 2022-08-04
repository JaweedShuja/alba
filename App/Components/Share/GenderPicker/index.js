import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Down from 'react-native-vector-icons/AntDesign';
import Strings from 'App/Values/Strings';
import AppDataActions from '../../../Stores/AppData/Actions';
import ActionSheet from 'react-native-actions-sheet';
import {useDispatch} from 'react-redux';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import Circle from 'react-native-vector-icons/FontAwesome';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const GenderPicker = ({children, genderType = true}) => {
  const actionSheetRef = useRef();
  const dispatch = useDispatch();
  let actionSheet;
  const [genderState, setGenderState] = useState(genderType);

  const changeGender = (type) => {
    setGenderState(type);
  };

  const actionSheetOpen = () => {
    dispatch(AppDataActions.setGenderUser(genderState));
    actionSheetRef.current?.setModalVisible();
  };

  const actionSheetComponent = () => {
    return (
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.viewDate}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={styles.genderView}
            onPress={() => changeGender(true)}>
            <Circle
              name={genderState ? 'dot-circle-o' : 'circle-o'}
              size={normal * 2}
              color={Colors.lightBlue}
            />
            <Text style={styles.textGender}>{string.MAN}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            style={styles.genderView}
            onPress={() => changeGender(false)}>
            <Circle
              name={!genderState ? 'dot-circle-o' : 'circle-o'}
              size={normal * 2}
              color={Colors.lightBlue}
            />
            <Text style={styles.textGender}>{string.WOMAN}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.doneBtn}
            onPress={actionSheetOpen}
            activeOpacity={ACTIVE_OPACITY}>
            <Text style={styles.textDone}>{string.DONE}</Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={actionSheetOpen}
      activeOpacity={ACTIVE_OPACITY}>
      <View style={styles.iconView}>
        <Icon name={'woman'} size={normal * 2} color={Colors.lightBlue} />
      </View>
      {children}

      <Down
        name="down"
        size={normal * 1.7}
        color={Colors.text}
        style={styles.icon}
      />

      {actionSheetComponent()}
    </TouchableOpacity>
  );
};

export default GenderPicker;
