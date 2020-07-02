import { SEND_TEXT_HEADER} from '../actions/types.js';

const initialState = '';

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_TEXT_HEADER:
      return action.payload
    default:
      return state;
  }
}



