import axios from 'axios';
import { LEMMATIZER2 } from './types';

export const lemmatizer2 = (text) => (dispatch) => {
    axios
      .post('/feed/lemmatizer', text)
      .then((res) => {
        dispatch({
          type: LEMMATIZER2,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };
