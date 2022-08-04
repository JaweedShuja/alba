import {take, call, put, select} from 'redux-saga/effects';
import io from 'socket.io-client';
import {eventChannel} from 'redux-saga';
import SocketActions from '../Stores/Socket/Actions';
import UserChatActions from '../Stores/UserChats/Actions';
function connect(token) {
  const socketConnection = io('ws://188.166.96.29:2083/client', {
    transports: ['websocket'],
    rejectUnauthorized: false,
    forceNew: true,
    query: {authorization: token},
  });

  return new Promise((resolve) => {
    socketConnection.on('connect', () => {
      const buffers = socketConnection.sendBuffer;
      socketConnection.sendBuffer = buffers.filter(
        (el) => el?.data[0] !== 'Message',
      );
      console.log('COONECT', socketConnection.connected);
      resolve(socketConnection);
    });
    socketConnection.on('disconnect', (data) => {
      console.log('DISCONNECTED');
    });
    socketConnection.on('reconnect', (data) => {
      const buffers = socketConnection.sendBuffer;
      socketConnection.sendBuffer = buffers.filter(
        (el) => el?.data[0] !== 'Message',
      );
      console.log('RECONNECT');
    });
  });
}
function subscribe(socket) {
  console.log('subscribesubscribe', socket);
  return eventChannel((emit) => {
    console.log('subscribesubscribe', {emit});
    const handler = (data) => {
      console.log('DATA IN EMMITER', data);
      emit(data);
    };
    socket.on('connect', handler.bind(null, 'CONNECT'));
    socket.on('GetChats', handler);
    socket.on('UpdateChats', handler);
    return () => {
      socket.off('connect', handler);
      socket.off('GetChats', handler);
      socket.off('UpdateChats', handler);
    };
  });
}
export function* socketConnectSaga(data) {
  console.log('SOCKETT INITIAL', data);
  const socket = yield call(connect, data.token);
  console.log('socketsocket 1', {socket});
  if (socket) {
    yield put(SocketActions.initialSuccess(socket));
    // yield put(UserChatActions.userMatches([]));
  }
  console.log('socketsocket', socket);
  const channel = yield call(subscribe, socket);
  console.log({channel});
  try {
    while (true) {
      let event = yield take(channel);
      console.log({event});
      if (event === 'CONNECT') {
        yield put(SocketActions.initialSuccess(socket));
      }
      if (event?.data?.messageType === 'UpdateChats') {
        console.log('THIS IS A MESSAGE');

        yield put(UserChatActions.updateUserChatByOffset());
      }
    }
  } catch (error) {
    console.log('ERROR IN SAGA CHANNEL', error);
    // yield put(UserChatActions.onFailure('ERROR'));
  }
}
