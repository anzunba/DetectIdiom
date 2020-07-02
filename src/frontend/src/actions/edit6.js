
import { SEND_LIST_EDIT } from './types';

  export const sendWordIdioms = (list) => {
    return {
      type: SEND_LIST_EDIT,
      payload: list,
    };
  };