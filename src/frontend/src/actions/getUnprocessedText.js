
import { GET_UNPROCESSED_TEXT } from './types';

export const getInputText = (text) => {
    return {
      type: GET_UNPROCESSED_TEXT,
      payload: text,
    };
  };