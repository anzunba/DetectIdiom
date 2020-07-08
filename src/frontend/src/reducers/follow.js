import { FOLLOW } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case FOLLOW:
      return action.payload
    default:
      return state;
  }
}



