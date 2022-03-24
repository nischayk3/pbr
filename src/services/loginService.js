import Service from './AjaxService';
import {
  BMS_APP_PYTHON_SERVICE
} from '../constants/apiBaseUrl';


export const loginUrl = BMS_APP_PYTHON_SERVICE + '/login'

export const getSession = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/get-session', request,{ withCredentials: true }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

