import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ModalContainer from '../ModalContainer';
import PopupsActions from '../../Stores/PopUps/Actions';
import ConfirmPopup from '../PopUp/ConfirmPopup';
import ImageViewerPopup from '../PopUp/ImageViewerPopup';
import Strings from '../../Values/Strings';
import NetworkPopUp from '../PopUp/NetworkPopUp';
import LoadingPopUp from '../PopUp/LoadingPopUp';

const {MODAL_TYPES} = Strings;

const AllModalsContainer = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state?.popups.visible);
  const contentType = useSelector((state) => state?.popups.contentType);
  const extraData = useSelector((state) => state?.popups.extraData);
  const onPressClose = (callBack) => {
    //   closing with modal itself may return a parameter line below disable it in case of
    if (extraData?.cancel) {
      extraData?.cancel();
    } else {
      dispatch(PopupsActions.hideModal(contentType));
    }
    setTimeout(() => {
      callBack && typeof callBack !== 'object' && callBack();
    }, 100);
  };

  const renderModalContent = () => {
    switch (contentType) {
      case MODAL_TYPES.CONFIRM_MODAL:
        return <ConfirmPopup {...{extraData, contentType, onPressClose}} />;
      case MODAL_TYPES.IMAGE_VIEWER:
        return <ImageViewerPopup {...{extraData, contentType, onPressClose}} />;
      case MODAL_TYPES.NETWORK_CONNECTION:
        return <NetworkPopUp />;
      case MODAL_TYPES.LOADING:
        return <LoadingPopUp />;
      default:
        null;
        break;
    }
  };

  return (
    <ModalContainer
      isVisible={visible}
      contentType={contentType}
      onPressClose={onPressClose}>
      {renderModalContent()}
    </ModalContainer>
  );
};

export default AllModalsContainer;
