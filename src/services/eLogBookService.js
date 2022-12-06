import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

let login_response = JSON.parse(sessionStorage.getItem("login_details"));

const request_headers = {
    "content-type": "application/json",
    "x-access-token": login_response.token ? login_response.token : "",
    "resource-name": "REPORT_DESIGNER"
};

export const getTemplatesList = (request) => {
    return Service.get(
        BMS_APP_PYTHON_SERVICE + "/elogbook-templates-list",
        request,
        request_headers
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getTemplateData = (request) => {
    return Service.get(
        BMS_APP_PYTHON_SERVICE + "/elogbook-forms",
        request,
        request_headers
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};


export const putFormData = (request) => {
    return Service.put(
        BMS_APP_PYTHON_SERVICE + "/elogbook-forms",
        request,
        request_headers
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getDummyTemplate = (request) => {
    return Service.get(
        BMS_APP_PYTHON_SERVICE + "/elogbook-form-template",
        request,
        request_headers
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};


