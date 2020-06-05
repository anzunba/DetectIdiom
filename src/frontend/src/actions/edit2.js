import { GET_P_ID } from './types';


  export const getPId = (pId) => {
    return {
      type: GET_P_ID,
      payload: pId,
    };
  }

