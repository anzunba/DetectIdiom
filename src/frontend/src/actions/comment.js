import axios from 'axios';
import { COMMENT } from './types';
import { tokenConfig } from './auth';

export const postComment = (commentData) => (dispatch, getState) => {
    axios
      .post(`/api/comment/`, commentData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: COMMENT,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };


  export const getComment = (articleId) => (dispatch, getState) => {
    console.log("called getComment: " + articleId)
    axios
      .get(`/api/comment/${articleId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: COMMENT,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };



  export const deleteComment = (commentId) => (dispatch, getState) => {
    console.log("called deleteComment")
    axios
      .delete(`/api/comment/${commentId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: COMMENT,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };