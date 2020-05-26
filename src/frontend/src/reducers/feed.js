import { GET_FEEDS, DELETE_FEED, ADD_FEED, CLEAR_FEEDS } from '../actions/types.js';

const initialState = {
  leads: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}