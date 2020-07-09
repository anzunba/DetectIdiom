import { COMMENT } from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMENT:
      return action.payload;
    default:
      return state;
  }
}



