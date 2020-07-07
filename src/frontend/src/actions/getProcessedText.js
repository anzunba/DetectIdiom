import axios from 'axios';
import { GET_PROCESSED_TEXT } from './types';

export const getProcessedText = (text) => (dispatch) => {
    axios
      .post('/feed/getProcessedText', text)
      .then((res) => {
        dispatch({
          type: GET_PROCESSED_TEXT,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };


