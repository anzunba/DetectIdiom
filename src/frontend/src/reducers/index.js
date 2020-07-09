import { combineReducers } from 'redux';
import feed from './feed';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import getProcessedText from './getProcessedText';
import getUnprocessedText from './getUnprocessedText';
import getMeaning from './getMeaning';
import article from './article';
import startLoader from './startLoader';
import getWordIdiom from './getWordIdiom';
import getTokens from './getTokens';
import edit9 from './edit9';
import edit10 from './edit10';
import edit11 from './edit11';
import profile from './profile';
import language from './language';
import page from './page';
import follow from './follow';
import getRequestUserProfile from './getRequestUserProfile'
import comment from './comment'
import reply from './reply'

export default combineReducers({
  feed,
  errors,
  messages,
  auth,
  getProcessedText,
  getUnprocessedText,
  getMeaning,
  article,
  startLoader,
  getWordIdiom,
  getTokens,
  edit9,
  edit10,
  edit11,
  profile,
  language,
  page, 
  getRequestUserProfile,
  follow,
  comment,
  reply
});