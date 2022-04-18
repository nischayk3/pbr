import Service from './AjaxService';
import {
    BMS_APP_PYTHON_SERVICE,
    BMS_APP_LOGIN_PASS
} from '../constants/apiBaseUrl';


let login_response = JSON.parse(localStorage.getItem('login_details'));

const request_headers = {
  'content-type': 'application/json',
  'x-access-token': login_response.token ? login_response.token : '',
  'resource-name': 'DASHBOARD',
};


export const getJob = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/jobs', request,request_headers).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};


export const putJob = (request) => {
    return Service.put(BMS_APP_LOGIN_PASS + '/jobs', request,request_headers).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
