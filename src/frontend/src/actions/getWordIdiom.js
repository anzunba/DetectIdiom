
import { SEND_LIST_EDIT } from './types';

  export const getWordIdioms = (list) => {
    return {
      type: SEND_LIST_EDIT,
      payload: list,
    };
  };