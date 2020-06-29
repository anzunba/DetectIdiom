import { PROFILE } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE:
        console.log("reducer profile.js: " + action.payload)
      return action.payload
    default:
      return state;
  }
}



