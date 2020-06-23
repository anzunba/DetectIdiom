import axios from 'axios';
import { GET_TOKENS } from './types';

export const getTokens = (sentence) => (dispatch) => {
    axios
      .post('/edit/getTokens', sentence)
      .then((res) => {
        dispatch({
          type: GET_TOKENS,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };
