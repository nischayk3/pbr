import {
    GET_CHART_NAME,
    SELECTED_DATE_RANGE,
    SELECTED_SITE,
    SELECTED_UNAPPROVED_DATA,
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
