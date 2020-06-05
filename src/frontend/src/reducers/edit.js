import { GET_TEXT } from '../actions/types.js';

const initialState = {
  words: [],
  input_html: [],
  pre_sentence: [],
  aft_sentence: [],
  idioms: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TEXT:
      return{
          input_html : action.payload[0],
          words : action.payload[1],
          pre_sentence : action.payload[2],
          aft_sentence : action.payload[3],
          idioms : action.payload[4],
        }
    default:
      return state;
  }
}



