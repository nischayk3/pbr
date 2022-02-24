import {  SELECTED_REPORT_ID } from '../../constants/actionTypes'


export const sendReportId = (payload) => ({
    type: SELECTED_REPORT_ID,
    payload,
  });