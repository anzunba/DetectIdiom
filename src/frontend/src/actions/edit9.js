import axios from 'axios';
import { LEMMATIZER } from './types';

export const enLemmatizer = (text) => (dispatch) => {
    axios
      .post('/feed/enLemmatizer', text)
      .then((res) => {
        dispatch({
          type: LEMMATIZER,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };
  export const jaLemmatizer = (text) => (dispatch) => {
    axios
      .post('/feed/jaLemmatizer', text)
      .then((res) => {
        dispatch({
          type: LEMMATIZER,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };
