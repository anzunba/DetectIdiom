import axios from 'axios';
import { REPLY_USER } from './types';
import { tokenConfig } from './auth';
export const getReplyUser = (commentId) => (dispatch, getState) => {
    console.log("called getReplyUser: " + commentId)
    axios
      .get(`/api/replyUser/${commentId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: REPLY_USER,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };