import { GET_UNPROCESSED_TEXT } from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_UNPROCESSED_TEXT:
      return action.payload
    default:
      return state;
  }
}



