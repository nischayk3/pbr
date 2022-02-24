import * as types from '../../constants/actionTypes';

const initState = {
  site: '',
  dateRange: '',
  unApprovedData: '',
  chartName: '',
  chartDesc: '',
  selectedView: {},
  chartData: {},
  chartType: '',
  chartxAxis: '',
  chartyAxis: '',

  viewId: '',
  viewName: '',
  viewStatus: '',
  viewVersion: '',
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
    case types.SELECTED_VIEW:
      return { ...state, selectedView: action.payload };
    case types.SELECTED_VIEW_ID:
      return { ...state, viewId: action.payload };
    case types.SELECTED_VIEW_NAME:
      return { ...state, viewName: action.payload };
    case types.SELECTED_VIEW_STATUS:
      return { ...state, viewStatus: action.payload };
    case types.SELECTED_VIEW_VERSION:
      return { ...state, viewVersion: action.payload };
    case types.GENERATE_CHART:
      return { ...state, chartData: action.payload };
    case types.SELECTED_CHART_TYPE:
      return { ...state, chartType: action.payload };
    case types.SELECTED_X_AXIS:
      return { ...state, chartxAxis: action.payload };
    case types.SELECTED_Y_AXIS:
      return { ...state, chartyAxis: action.payload };
    case types.SELECTED_CHART_NAME:
      return { ...state, chartName: action.payload };
    case types.SELECTED_CHART_DESCRIPTION:
      return { ...state, chartDesc: action.payload };
    default:
      return state;
  }
};
