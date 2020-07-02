
import { SEND_TEXT_HEADER } from './types';

export const sendTextHeader = (text) => {
    return {
      type: SEND_TEXT_HEADER,
      payload: text,
    };
  };

