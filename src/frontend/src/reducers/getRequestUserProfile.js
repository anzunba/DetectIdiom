import { REQUEST_USER_PROFILE } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_PROFILE:
      return action.payload
    default:
      return state;
  }
}



