import { PAGE } from '../actions/types.js';

const initialState = 'home';

export default function (state = initialState, action) {
  switch (action.type) {
    case PAGE:
      return action.payload
    default:
      return state;
  }
}



