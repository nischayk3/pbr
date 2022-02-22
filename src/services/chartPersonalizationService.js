import Service from './AjaxService';
import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';

//get site id
export const getSiteId = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/site_ids', _queryParam).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getChartType = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/chartTypes', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
