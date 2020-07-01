import { combineReducers } from 'redux';
import feed from './feed';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import edit from './edit';
import edit2 from './edit2';
import edit3 from './edit3';
import edit4 from './edit4';
import edit7 from './edit7';
import edit9 from './edit9';
import edit10 from './edit10';
import edit11 from './edit11';
import profile from './profile';

export default combineReducers({
  feed,
  errors,
  messages,
  auth,
  edit,
  edit2,
  edit3,
  edit4,
  edit7,
  edit9,
  edit10,
  edit11,
  profile
});