import axios from 'axios';
import { REPLY } from './types';
import { tokenConfig } from './auth';

export const postReply = (replyData) => (dispatch, getState) => {
    axios
      .post(`/api/reply/`, replyData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: REPLY,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };


  export const getReply = (commentId) => (dispatch, getState) => {
    console.log("called getReply: " + commentId)
    axios
      .get(`/api/reply/${commentId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: REPLY,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

  export const deleteReply = (replyId) => (dispatch, getState) => {
    console.log("called deleteReply")
    axios
      .delete(`/api/reply/${replyId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: REPLY,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };