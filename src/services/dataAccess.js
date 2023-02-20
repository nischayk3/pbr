import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

let login_response = JSON.parse(localStorage.getItem("login_details"));

const request_headers_roles = {
    "content-type": "application/json",
    "x-access-token": login_response.token ? login_response.token : "",
    "resource-name": "WORKITEMS",
};

export const downloadRolesUsersDetails = (request) => {
    return Service.get(
        BMS_APP_PYTHON_SERVICE + "/download-roles-users-details",
        request,
        request_headers_roles
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
export const downloadAllUsersDetails = (request) => {
    return Service.get(
        BMS_APP_PYTHON_SERVICE + "/download-all-user-details",
        request,
        request_headers_roles
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

