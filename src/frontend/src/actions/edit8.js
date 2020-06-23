import { GET_IDIOM_TABLE_ADDRESS } from './types';

  export const getIdiomTableAddress = (idiomTableAddress) => {
    return {
      type: GET_IDIOM_TABLE_ADDRESS,
      payload: idiomTableAddress,
    };
  }