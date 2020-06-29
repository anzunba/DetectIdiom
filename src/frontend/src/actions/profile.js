import axios from 'axios';
import { PROFILE } from './types';
import { tokenConfig } from './auth';

export const updateProfile = (profileData) => (dispatch, getState) => {
    axios
      .put('/api/updateProfile', profileData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: PROFILE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

  // export const getProfile = () => (dispatch, getState) => {
  //   axios
  //     .get('/api/updateProfile', tokenConfig(getState))
  //     .then((res) => {
  //       console.log("getProfile: " + res)
  //       dispatch({
  //         type: PROFILE,
  //         payload: res.data,
  //       });
  //     })
  //     .catch((err) => console.log("actions: " + err));
  // };
