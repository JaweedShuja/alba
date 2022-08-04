import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import {Colors} from 'App/Theme';
import {normal} from 'App/Theme/Metrics';
import Strings from 'App/Values/Strings';
import ActionSheet from 'react-native-actions-sheet';
import DatePicker from 'react-native-date-picker';
import {useDispatch} from 'react-redux';
import AppDataActions from '../../../Stores/AppData/Actions';
import FontIcon from 'App/Components/CustomIcon/FontIcon';
import {string} from 'App/i18n';

const {ACTIVE_OPACITY} = Strings.CONSTANTS;

const DatePickerComponent = ({children, onDateChange, date, ...rest}) => {
  const actionSheetRef = useRef();
  const dispatch = useDispatch();
  let actionSheet;
  // const [date, setDate] = useState(new Date());
  // var dateObj = date;
  // var month = dateObj.getUTCMonth() + 1; //months from 1-12
  // var day = dateObj.getUTCDate();
  // var year = dateObj.getUTCFullYear();

  const actionSheetOpen = () => {
    actionSheetRef.current?.setModalVisible();
  };

  const handleChangeDate = () => {
    // const newDate = year + '/' + month + '/' + day;
    // dispatch(AppDataActions.setDateBirthday(date));
    actionSheetRef.current?.setModalVisible();
  };

  const actionSheetComponent = () => {
    return (
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.viewDate}>
          <DatePicker date={date} onDateChange={onDateChange} mode="date" />
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={handleChangeDate}
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
      <View style={styles.icon}>
        <FontIcon
          //name={'mail-unread-outline'}
          name={Strings.Icons.EMAIL_OUTLINE}
          size={normal * 2}
          color={Colors.lightBlue}
        />
      </View>
      {children}
      {actionSheetComponent()}
    </TouchableOpacity>
  );
};

export default DatePickerComponent;
