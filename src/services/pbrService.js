import Service from './AjaxService';
import {
    BMS_APP_PYTHON_SERVICE,
    MDH_APP_PYTHON_SERVICE,
} from '../constants/apiBaseUrl';

export const getBoundingBoxData = (_queryParam) => {
    return Service.get(
        MDH_APP_PYTHON_SERVICE +
            '/pbr/services/v1/udh/get_data/Batch Record Example 2.pdf.json/0',
        _queryParam
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
