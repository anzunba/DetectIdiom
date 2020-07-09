import { REPLY } from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case REPLY:
      return action.payload;
    default:
      return state;
  }
}



