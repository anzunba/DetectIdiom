import { GET_MEANING } from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEANING:
      return action.payload[0]
    default:
      return state;
  }
}



