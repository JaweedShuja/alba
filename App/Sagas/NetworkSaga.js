import {put} from 'redux-saga/effects';
import PopupsActions from '../Stores/PopUps/Actions';
import Strings from '../Values/Strings';

export function* onConnectionChange(action) {
  if (!action.payload) {
    yield put(
      PopupsActions.showModal(Strings.MODAL_TYPES.NETWORK_CONNECTION, {}),
    );
  } else {
    yield put(PopupsActions.hideModal(Strings.MODAL_TYPES.NETWORK_CONNECTION));
  }
}
