import Service from './AjaxService';
import {
    BMS_APP_PYTHON_SERVICE,
    MDH_APP_PYTHON_SERVICE,
} from '../constants/apiBaseUrl';

export const getBoundingBoxData = (_queryParam) => {
    return Service.get(
        MDH_APP_PYTHON_SERVICE +
            '/pbr/udh/get_data?fileId=Batch Record Example 2_page-0.jpeg.json&pageId=1',
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
        MDH_APP_PYTHON_SERVICE + '/pbr/udh/save_records',
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

export const getPbrReviewerData = (_queryParam) => {
    return Service.get(
        MDH_APP_PYTHON_SERVICE + '/pbr/udh/get_cpv_pbr_template',
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

export const processBatchRecord = (_queryParam) => {
    return Service.get(
        MDH_APP_PYTHON_SERVICE + '/pbr/udh/extract_from_template',
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

export const getPbrTemplateData = (_queryParam) => {
    return Service.get(
        MDH_APP_PYTHON_SERVICE + '/pbr/udh/pbr_template',
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

export const getDataView = (_queryParam) => {
    return Service.get(
        MDH_APP_PYTHON_SERVICE + '/pbr/udh/get_data_view',
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
