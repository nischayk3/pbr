import {
  GENERATE_CHART,
  GET_CHART_NAME,
  SELECTED_CHART_DESCRIPTION,
  SELECTED_CHART_NAME,
  SELECTED_CHART_TYPE,
  SELECTED_DATE_RANGE,
  SELECTED_SITE,
  SELECTED_UNAPPROVED_DATA,
  SELECTED_VIEW,
  SELECTED_VIEW_ID,
  SELECTED_VIEW_NAME,
  SELECTED_VIEW_STATUS,
  SELECTED_VIEW_VERSION,
  SELECTED_X_AXIS,
  SELECTED_Y_AXIS,
} from '../../constants/actionTypes';

// get selected site
export const sendSelectedSite = (payload) => ({
  type: SELECTED_SITE,
  payload,
});

//get date range
export const sendDateRange = (payload) => ({
  type: SELECTED_DATE_RANGE,
  payload,
});

//get unapproved data
export const sendUnApprovedData = (payload) => ({
  type: SELECTED_UNAPPROVED_DATA,
  payload,
});

//get chart name
export const getChartName = (payload) => ({
  type: GET_CHART_NAME,
  payload,
});

//selected view from view table
export const sendView = (payload) => ({
  type: SELECTED_VIEW,
  payload,
});

//selected view id from view table
export const sendViewId = (payload) => ({
  type: SELECTED_VIEW_ID,
  payload,
});

//selected view name from view table
export const sendViewName = (payload) => ({
  type: SELECTED_VIEW_NAME,
  payload,
});
//selected view status from view table
export const sendViewStatus = (payload) => ({
  type: SELECTED_VIEW_STATUS,
  payload,
});
//selected view version from view table
export const sendViewVersion = (payload) => ({
  type: SELECTED_VIEW_VERSION,
  payload,
});

//generate chart action
export const generateChart = (payload) => ({
  type: GENERATE_CHART,
  payload,
});

// get selected chart types
export const sendChartType = (payload) => ({
  type: SELECTED_CHART_TYPE,
  payload,
});

// get selected chart xaxis
export const sendChartxAxis = (payload) => ({
  type: SELECTED_X_AXIS,
  payload,
});

// get selected chart yaxis
export const sendChartyAxis = (payload) => ({
  type: SELECTED_Y_AXIS,
  payload,
});

// get selected chart name
export const sendChartName = (payload) => ({
  type: SELECTED_CHART_NAME,
  payload,
});

// get selected chart Desc
export const sendChartDesc = (payload) => ({
  type: SELECTED_CHART_DESCRIPTION,
  payload,
});
