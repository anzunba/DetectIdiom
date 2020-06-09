import { GET_T_ID } from '../actions/types.js';

const initialState = {
  t_id : ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_T_ID:
      return {t_id :action.payload};
    default:
      return state;
  }
}



