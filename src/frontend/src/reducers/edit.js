import { GET_TEXT } from '../actions/types.js';

const initialState = {
  words: [],
  pre_sentence: [],
  aft_sentence: [],
  idioms: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TEXT:
      return{
          words : action.payload[0],
          pre_sentence : action.payload[1],
          aft_sentence : action.payload[2],
          idioms : action.payload[3],
        }
    default:
      return state;
  }
}



