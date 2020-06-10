import axios from 'axios';
import { GET_SENTENCE_TOKENS } from './types';

export const getSentenceTokens = (sentence) => (dispatch) => {
    axios
      .post('/edit/getSentenceTokens', sentence)
      .then((res) => {
        dispatch({
          type: GET_SENTENCE_TOKENS,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };
