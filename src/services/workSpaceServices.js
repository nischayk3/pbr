import Service from './AjaxService';
import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';

//get deviation data
export const getDeviationData = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/recent-deviations', _queryParam,{
        'content-type': 'application/json',
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};