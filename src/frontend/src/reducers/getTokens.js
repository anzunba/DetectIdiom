import { GET_TOKENS } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOKENS:
      return action.payload
    default:
      return state;
  }
}



