import { PROFILE } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE:
      return action.payload
    default:
      return state;
  }
}


