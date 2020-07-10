import axios from 'axios';
import { COMMENT_LIKE } from './types';
import { tokenConfig } from './auth';

export const postCommentLike = (commentLikeData) => (dispatch, getState) => {
    axios
      .post(`/api/commentLike/`, commentLikeData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: COMMENT_LIKE,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };


  export const getCommentLike = (commentId) => (dispatch, getState) => {
    console.log("called getCommentLike: " + commentId)
    axios
      .get(`/api/commentLike/${commentId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: COMMENT_LIKE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

  export const deleteCommentLike = (commentLikeId) => (dispatch, getState) => {
    console.log("called deleteCommentLike")
    axios
      .delete(`/api/commentLike/${commentLikeId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: COMMENT_LIKE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };