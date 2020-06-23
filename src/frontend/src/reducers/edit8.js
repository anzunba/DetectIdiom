import { GET_IDIOM_TABLE_ADDRESS } from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_IDIOM_TABLE_ADDRESS:
      return action.payload;
    default:
      return state;
  }
}



