import axios from 'axios';
import { GET_TEXT, GET_P_ID } from './types';

export const getText = (text) => (dispatch) => {
    axios
      .post('/feed/getText', text)
      .then((res) => {
        dispatch({
          type: GET_TEXT,
          payload: res.data,
          
        });
      })
      .catch((err) => console.log("actions: " + err));
  };


//   axios
// 			.get('http://127.0.0.1:8000/feed')
// 			.then((res) => {
// 				setPosts(res.data);
// 			})
// 			//.then((res) => a(res))
// 			.catch((err) => {
// 				console.log(err);
// 			});
// export const getText = (text) => {
//   return {
//     type: GET_TEXT,
//     payload: text,
//   };
//   axios
//     .get('/api/feeds/', tokenConfig(getState))
//     .then((res) => {
//       dispatch({
//         type: GET_FEEDS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
// };