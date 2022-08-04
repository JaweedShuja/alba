import React, {useState} from 'react';
import {View, Text, Animated} from 'react-native';
import Modal from 'react-native-modal';
import Strings from '../../Values/Strings';
import styles from './styles';

const ModalContainer = ({
  customHeight = null,
  children,
  isVisible,
  onPressClose,
  transparent,
  contentType,
  ...props
}) => {
  const [heightContent, setHeightContent] = useState(null);

  const onLayout = (event) => {
    const {height} = event.nativeEvent.layout;
    !heightContent && setHeightContent(height);
  };

  let animationIn;
  let animationOut;
  let backdropOpacity;

  switch (contentType) {
    case Strings.MODAL_TYPES.IMAGE_VIEWER:
      backdropOpacity = 0.8;
      break;
    case Strings.MODAL_TYPES.LOADING:
      backdropOpacity = 0.5;
      animationIn = 'fadeIn';
      animationOut = 'fadeOut';
      break;

    default:
      animationIn = 'slideInUp';
      animationOut = 'slideOutDown';
      backdropOpacity = 1;
      break;
  }

  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      avoidKeyboard
      animationIn={animationIn}
      backdropOpacity={backdropOpacity}
      animationOut={animationOut}
      swipeDirection={['down']}
      propagateSwipe={true}
      scrollHorizontal
      onModalHide={() => {
        setHeightContent(null);
      }}
      onBackdropPress={onPressClose}
      onBackButtonPress={onPressClose}
      {...props}>
      {/* <Animated.View
        style={[
          styles.popup,
          customHeight
            ? {height: customHeight}
            : heightContent && {
                height: heightContent,
              },
          transparent && {
            backgroundColor: 'transparent',
          },
        ]}
        onLayout={onLayout}
        > */}
      {children}
      {/* </Animated.View> */}
    </Modal>
  );
};

export default ModalContainer;
