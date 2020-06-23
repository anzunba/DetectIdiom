import { combineReducers } from 'redux';
import feed from './feed';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import edit from './edit';
import edit2 from './edit2';
import edit3 from './edit3';
import edit4 from './edit4';
import edit5 from './edit5';
import edit6 from './edit6';
import edit7 from './edit7';
import edit8 from './edit8';

export default combineReducers({
  feed,
  errors,
  messages,
  auth,
  edit,
  edit2,
  edit3,
  edit4,
  edit5,
  edit6,
  edit7,
  edit8
});