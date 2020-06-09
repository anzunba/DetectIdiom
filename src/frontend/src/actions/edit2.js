import { GET_T_ID } from './types';


  export const getTId = (tId) => {
    return {
      type: GET_T_ID,
      payload: tId,
    };
  }

