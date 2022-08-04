import {createActions} from 'reduxsauce';
const {Types, Creators} = createActions({
  initialSocket: ['token'],
  initialSuccess: ['socket'],
  resetSocket: null,
  onFailure: ['error'],
});

export const SocketTypes = Types;
export default Creators;
