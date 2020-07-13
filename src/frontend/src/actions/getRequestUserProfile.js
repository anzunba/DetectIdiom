import axios from 'axios';
import { REQUEST_USER_PROFILE } from './types';
import { tokenConfig } from './auth';

export const updateProfile = (profileData) => (dispatch, getState) => {
    axios
      .put('/api/profile/', profileData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: REQUEST_USER_PROFILE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

export const getProfile = () => (dispatch, getState) => {
  console.log("getProfile")
    axios
      .get(`/api/profile/`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: REQUEST_USER_PROFILE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

  export const postNotify = (id) => (dispatch, getState) => {
    console.log("called post notify: ")
    axios
      .put(`/api/isNotify/${id}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: IS_NOTIFY,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };
