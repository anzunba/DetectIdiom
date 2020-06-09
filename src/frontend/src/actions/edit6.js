import { GET_IDIOM_TABLE } from './types';

  export const getIdiomTable = (idiomTable) => {
    return {
      type: GET_IDIOM_TABLE,
      payload: idiomTable,
    };
  }