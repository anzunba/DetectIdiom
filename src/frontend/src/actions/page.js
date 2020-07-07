
import { PAGE } from './types';

export const showPage = (page) => {
    return {
      type: PAGE,
      payload: page,
    };
  };