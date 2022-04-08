import Service from './AjaxService';
import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';

//get dashboard
let login_response = JSON.parse(localStorage.getItem('login_details'));
export const getDashboard = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/dashboards', _queryParam,{
        'content-type': 'application/json',
        'x-access-token': login_response.token ? login_response.token : '',
        'resource-name': 'DASHBOARD',
    
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};