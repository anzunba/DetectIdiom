import { ARTICLE } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ARTICLE:
      return action.payload
    default:
      return state;
  }
}


