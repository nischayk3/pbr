import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

export const getViews = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/views', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
