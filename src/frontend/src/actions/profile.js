import axios from 'axios';
import { PROFILE } from './types';
import { tokenConfig } from './auth';

export const getCustomUserProfile = (userId) => (dispatch, getState) => {
  console.log("getCustomUserProfile: " + userId)
  axios
    .get(`/api/profile/${userId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => console.log("actions: " + err));
};
