
import { GET_INPUT_TEXT } from './types';

export const getInputText = (text) => {
    return {
      type: GET_INPUT_TEXT,
      payload: text,
    };
  };