import { GET_WORD_TABLE } from './types';


  export const getWordTable = (wordTable) => {
    return {
      type: GET_WORD_TABLE,
      payload: wordTable,
    };
  }