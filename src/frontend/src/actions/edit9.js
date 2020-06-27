import axios from 'axios';
import { LEMMATIZER } from './types';

export const lemmatizer = (text) => (dispatch) => {
  console.log('debug')
    axios
      .post('/feed/lemmatizer', text)
      .then((res) => {
        dispatch({
          type: LEMMATIZER,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };
