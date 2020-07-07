import { LANGUAGE } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case LANGUAGE:
      return action.payload
    default:
      return state;
  }
}



