import axios from 'axios';
import { ARTICLE } from './types';
import { tokenConfig } from './auth';

export const createArticle = (articleData) => (dispatch, getState) => {
    axios
      .post('/api/article/', articleData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: ARTICLE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

export const updateArticle = (articleData, pk) => (dispatch, getState) => {
    axios
      .put(`/api/article/${pk}`, articleData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: ARTICLE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

export const getArticle = () => (dispatch, getState) => {
    axios
      .get('/api/article/', tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: ARTICLE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

export const getAllArticle = () => (dispatch, getState) => {
  axios
    .get('/api/allArticle/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ARTICLE,
        payload: res.data,
      });
    })
    .catch((err) => console.log("actions: " + err));
};

