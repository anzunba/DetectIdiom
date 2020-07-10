import axios from 'axios';
import { ARTICLE_LIKE } from './types';
import { tokenConfig } from './auth';

export const postArticleLike = (articleLikeData) => (dispatch, getState) => {
    axios
      .post(`/api/articleLike/`, articleLikeData, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: ARTICLE_LIKE,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };


  export const getArticleLike = (articleId) => (dispatch, getState) => {
    console.log("called getArticleLike: " + articleId)
    axios
      .get(`/api/articleLike/${articleId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: ARTICLE_LIKE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

  export const deleteArticleLike = (articleLikeId) => (dispatch, getState) => {
    console.log("called deleteArticleLike")
    axios
      .delete(`/api/articleLike/${articleLikeId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: ARTICLE_LIKE,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };