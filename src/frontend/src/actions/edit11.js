import axios from 'axios';
import { LEMMATIZER3 } from './types';

export const lemmatizer3 = (text) => (dispatch) => {
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
