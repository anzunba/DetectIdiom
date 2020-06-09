import { GET_SELECTED_MEANING } from '../actions/types.js';

const initialState = {
  selected_meaning : ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SELECTED_MEANING:
      return {selected_meaning :action.payload};
    default:
      return state;
  }
}



