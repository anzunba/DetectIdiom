import { GET_P_ID } from '../actions/types.js';

const initialState = {
  p_id : ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_P_ID:
      return {p_id :action.payload};
    default:
      return state;
  }
}



