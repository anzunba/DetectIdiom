import { GET_INPUT_TEXT } from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INPUT_TEXT:
      return action.payload
    default:
      return state;
  }
}



