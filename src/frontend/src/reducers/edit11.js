import { LEMMATIZER3 } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case LEMMATIZER3:
      return action.payload
    default:
      return state;
  }
}



