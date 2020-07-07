import axios from 'axios';
import { GET_MEANING} from './types';

export const getMeaning = (word) => (dispatch) => {
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

