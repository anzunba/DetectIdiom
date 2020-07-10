import axios from 'axios';
import { COMMENT_USER } from './types';
import { tokenConfig } from './auth';
export const getCommentUser = (articleId) => (dispatch, getState) => {
    console.log("called getCommentUser: " + articleId)
    axios
      .get(`/api/commentUser/${articleId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: COMMENT_USER,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };