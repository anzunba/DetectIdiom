import axios from 'axios';
import { LANGUAGE } from './types';
import { tokenConfig } from './auth';

export const updateLanguage = (languageeData) => (dispatch, getState) => {
    axios
      .put('/api/language/', languageeData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: LANGUAGE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

export const getLnaguage = () => (dispatch, getState) => {
    axios
      .get(`/api/language/`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: LANGUAGE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

