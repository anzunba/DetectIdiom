import axios from 'axios';
import { GET_MEANING} from './types';

export const getEnMeaning = (word) => (dispatch) => {
    axios
      .get(`/api/enja?word=${word}`)
      .then((res) => {
        if(res.data.length < 1){
          dispatch({
            type: GET_MEANING,
            payload:  "Not Available"
          });
        }
        else{
          dispatch({
            type: GET_MEANING,
            payload: res.data,
          });
        }
      })
      .catch((err) => console.log("actions: " + err));
  };

  export const getJaMeaning = (word) => (dispatch) => {
    axios
      .get(`/api/jaen?word=${word}`)
      .then((res) => {
        if(res.data.length < 1){
          dispatch({
            type: GET_MEANING,
            payload:  "Not Available"
          });
        }
        else{
          dispatch({
            type: GET_MEANING,
            payload: res.data,
          });
        }
      })
      .catch((err) => console.log("actions: " + err));
  };

