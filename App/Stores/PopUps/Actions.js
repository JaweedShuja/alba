import {createActions} from 'reduxsauce';
const {Types, Creators} = createActions({
  showModal: ['contentType', 'extraData'],
  hideModal: ['contentType'],
});

export const PopupTypes = Types;
export default Creators;
