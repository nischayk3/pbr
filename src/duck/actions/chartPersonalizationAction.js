import { SELECTED_SITE } from '../../constants/actionTypes';

// get selected site
export const sendSelectedSite = (payload) => ({
    type: SELECTED_SITE,
    payload,
});
