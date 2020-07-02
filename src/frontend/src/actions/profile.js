import axios from 'axios';
import { PROFILE } from './types';
import { tokenConfig } from './auth';

export const updateProfile = (profileData) => (dispatch, getState) => {
    axios
      .put('/api/profile/', profileData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: PROFILE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

export const getProfile = () => (dispatch, getState) => {
    axios
      .get(`/api/profile/`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: PROFILE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

