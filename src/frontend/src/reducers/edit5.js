import { GET_WORD_TABLE } from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WORD_TABLE:
      return action.payload;
    default:
      return state;
  }
}



