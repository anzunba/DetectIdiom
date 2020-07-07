import { GET_PROCESSED_TEXT } from '../actions/types.js';

const initialState = {
  words: [],
  pre_sentence: [],
  aft_sentence: [],
  idioms: [],
  sentenceTokensList: [],
  text_lang: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROCESSED_TEXT:
      return{
          words : action.payload[0],
          pre_sentence : action.payload[1],
          aft_sentence : action.payload[2],
          idioms : action.payload[3],
          sentenceTokensList : action.payload[4],
          text_lang: action.payload[5]
        }
    default:
      return state;
  }
}



