import { GET_SELECTED_MEANING } from './types';


  export const getSelectedMeaning = (selectedMeaning) => {
    return {
      type: GET_SELECTED_MEANING,
      payload: selectedMeaning,
    };
  }

