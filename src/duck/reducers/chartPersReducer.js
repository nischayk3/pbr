import * as types from '../../constants/actionTypes';

const initState = {
  site: '',
  dateRange: '',
  unApprovedData: '',
  chartName: '',
  selectedView: {},
  chartData: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.SELECTED_SITE:
      return { ...state, site: action.payload };
    case types.SELECTED_DATE_RANGE:
      return { ...state, dateRange: action.payload };
    case types.SELECTED_UNAPPROVED_DATA:
      return { ...state, unApprovedData: action.payload };
    case types.GET_CHART_NAME:
      return { ...state, chartName: action.payload };
    case types.SELECTED_VIEW_ID:
      return { ...state, selectedView: action.payload };
    case types.GENERATE_CHART:
      return { ...state, chartData: action.payload };
    default:
      return state;
  }
};
