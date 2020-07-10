import { ARTICLE_LIKE } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case ARTICLE_LIKE:
      return action.payload
    default:
      return state;
  }
}



