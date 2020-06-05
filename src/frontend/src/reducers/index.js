import { combineReducers } from 'redux';
import feed from './feed';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import edit from './edit';
import edit2 from './edit2';

export default combineReducers({
  feed,
  errors,
  messages,
  auth,
  edit,
  edit2
});