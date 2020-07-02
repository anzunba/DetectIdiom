import { SEND_LIST_EDIT } from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_LIST_EDIT:
        return action.payload
    default:
      return state;
  }
}



