import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Strings from 'App/Values/Strings';
import AppDataActions from '../../../Stores/AppData/Actions';
import ActionSheet from 'react-native-actions-sheet';
import {useDispatch} from 'react-redux';
import {normal} from 'App/Theme/Metrics';
import {Colors} from 'App/Theme';
import Circle from 'react-native-vector-icons/FontAwesome';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const EducationGradePicker = () => {
  const actionSheetRef = useRef();
  const dispatch = useDispatch();

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
    <View>
      <Text></Text>
    </View>
  );
};

export default EducationGradePicker;
