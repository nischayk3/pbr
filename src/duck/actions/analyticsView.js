import { GET_VIEW_DATA_ANAYLSIS } from "../../constants/actionTypes";

export const getAnalyticsViewData = (payload) => ({
  type: GET_VIEW_DATA_ANAYLSIS,
  payload,
});
