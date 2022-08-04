import React, {useRef, useEffect} from 'react';
import {View} from 'react-native';
import styles from './style';
import {Colors} from 'App/Theme';
import ActionSheet from 'react-native-actions-sheet';
import FormBtn from '../../Share/FormBtn';
import {string} from 'App/i18n';

const Modal = ({children, visible = false, submit, onCloseActionSheet}) => {
  const actionSheetRef = useRef();

  useEffect(() => {
    actionSheetRef.current?.setModalVisible(visible);
  }, [visible]);

  const onPressClose = () => {
    actionSheetRef.current?.setModalVisible(false);
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      onClose={onCloseActionSheet}
      // openAnimationSpeed={30}
      delayActionSheetDrawTime={0}
      closeAnimationDuration={20}
      // bounceOnOpen={true}
      // bounciness={8}
    >
      <View style={styles.viewDate}>
        {children}
        {/* <FormBtn
          title={string.DONE}
          colorBtn={Colors.lightBlue}
          style={styles.doneBtn}
          handleSubmit={onPressClose}
        /> */}
      </View>
    </ActionSheet>
  );
};

export default Modal;
