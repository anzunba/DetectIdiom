import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import { GET_FEEDS, DELETE_FEED, ADD_FEED } from './types';

// GET FEEDS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get('/api/feeds/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_FEEDS,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

// DELETE FEED
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/feeds/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
      dispatch({
        type: DELETE_FEED,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// ADD FEED
export const addLead = (feed) => (dispatch, getState) => {
  axios
    .post('/api/feeds/', feed, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addLead: 'Lead Added' }));
      dispatch({
        type: ADD_FEED,
        payload: res.data,
      });
    })
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};