import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {PopupTypes} from './Actions';

export const showModal = (state, {contentType, extraData}) => ({
  ...state,
  visible: true,
  contentType: contentType,
  extraData: extraData,
});
export const hideModal = (state, {contentType}) => ({
  ...state,
  visible: false,
});
export const reducer = createReducer(INITIAL_STATE, {
  [PopupTypes.SHOW_MODAL]: showModal,
  [PopupTypes.HIDE_MODAL]: hideModal,
});
