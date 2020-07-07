
import { SEND_TEXT_HEADER } from './types';

export const startLoader = (text) => {
    return {
      type: SEND_TEXT_HEADER,
      payload: text,
    };
  };

