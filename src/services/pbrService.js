import Service from './AjaxService';
import {
    BMS_APP_PYTHON_SERVICE,
    MDH_APP_PYTHON_SERVICE,
} from '../constants/apiBaseUrl';

export const getBoundingBoxData = (_queryParam) => {
    return Service.get(
        'http://localhost' +
            '/pbr/udh/get_data?fileId=Batch Record Example 2.pdf.json&pageId=0',
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

export const savePbrTemplate = (request) => {
    return Service.put(
        'http://localhost' + '/pbr/udh/save_records',
        request
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
