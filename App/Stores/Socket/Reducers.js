import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {SocketTypes} from './Actions';
const initialSocket = (state, {socket}) => ({
  ...state,
  socket,
});

const resetSocket = (state) => ({
  ...INITIAL_STATE,
});
const onFailure = (state, {error}) => ({
  ...state,
  error: error,
  loading: false,
});
export const reducer = createReducer(INITIAL_STATE, {
  [SocketTypes.INITIAL_SUCCESS]: initialSocket,
  [SocketTypes.RESET_SOCKET]: resetSocket,
  [SocketTypes.ON_FAILURE]: onFailure,
});
