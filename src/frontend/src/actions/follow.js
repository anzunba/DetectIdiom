import axios from 'axios';
import { FOLLOW } from './types';
import { tokenConfig } from './auth';

export const postFollow = (followData) => (dispatch, getState) => {
  console.log("called postFollow")
  axios
    .post(`/api/follow/`, followData, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: FOLLOW,
        payload: res.data,
      });
    })
    .catch((err) => console.log("actions: " + err));
};

export const getFollow = (followedId) => (dispatch, getState) => {
    console.log("called getFollow: " + followedId)
    axios
      .get(`/api/follow/${followedId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: FOLLOW,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

  export const deleteFollow = (followedId) => (dispatch, getState) => {
    console.log("called deleteFollow")
    axios
      .delete(`/api/follow/${followedId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: FOLLOW,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };
