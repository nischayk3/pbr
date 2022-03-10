import {
    BMS_APP_PYTHON_SERVICE,
} from '../constants/apiBaseUrl';
import Service from './AjaxService';


export const eSign = (request) => {
    return Service.post(BMS_APP_PYTHON_SERVICE + '/digital-signature', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

