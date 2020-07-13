import axios from 'axios';
import { NOTIFICATION } from './types';
import { tokenConfig } from './auth';


  export const getNotification = () => (dispatch, getState) => {
    console.log("called getNotification: ")
    axios
      .get(`/api/notification/0`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: NOTIFICATION,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };

  export const deleteNotification = (notificationId) => (dispatch, getState) => {
    console.log("called deleteNotification")
    axios
      .delete(`/api/notification/${notificationId}`, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: NOTIFICATION,
          payload: res.data,
        });
      })
      .catch((err) => console.log("actions: " + err));
  };