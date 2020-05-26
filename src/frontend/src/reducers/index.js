import { combineReducers } from 'redux';
import feed from './feed';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
  feed,
  errors,
  messages,
  auth,
});