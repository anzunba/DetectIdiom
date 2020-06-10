import { GET_SENTENCE_TOKENS } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SENTENCE_TOKENS:
      return{
          sentence_tokens_arr : action.payload
        }
    default:
      return state;
  }
}



