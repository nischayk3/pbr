import {FUNCTION_TEXT} from '../types/types';

const initState = {
  textName:''
};

export default (state = initState, action) => {
    switch (action.type) {
      case FUNCTION_TEXT:
        return { ...state, textName: action.payload }
      default:
        return state;
    }
  };