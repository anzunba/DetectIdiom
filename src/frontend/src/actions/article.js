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
  console.log("called getAllArticle")
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

export const getFollowArticle = () => (dispatch, getState) => {
  console.log("called getFollowArticle")
  axios
    .get('/api/followArticle/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ARTICLE,
        payload: res.data,
      });
    })
    .catch((err) => console.log("actions: " + err));
};

export const getClassmateArticle = () => (dispatch, getState) => {
  console.log("called getClassmateArticle")
  axios
    .get('/api/classmateArticle/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ARTICLE,
        payload: res.data,
      });
    })
    .catch((err) => console.log("actions: " + err));
};

export const getCustomUserArticle = (userId) => (dispatch, getState) => {
  console.log('called getCustomUserArticle')
  axios
    .get(`/api/userArticles/${userId}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ARTICLE,
        payload: res.data,
      });
    })
    .catch((err) => console.log("actions: " + err));
};

