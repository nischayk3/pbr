import { GET_VIEW_DATA_ANAYLSIS } from "../../constants/actionTypes";

const initialState = {
  viewData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VIEW_DATA_ANAYLSIS:
      return { ...state, viewData: action.payload };
    default:
      return state;
  }
};
