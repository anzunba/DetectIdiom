import axios from 'axios';
import { GET_TEXT } from './types';

export const getText = (text) => (dispatch) => {
    axios
      .post('/feed/getText', text)
      .then((res) => {
        dispatch({
          type: GET_TEXT,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };


