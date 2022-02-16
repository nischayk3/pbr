import { AjaxService } from '../../utils/AjaxService';
import {
    API_PLOT_URL,
    BMS_APP_PYTHON_SERVICE,
} from '../../constants/apiBaseUrl';
export const uploadFile = (_queryParam) => {
    return AjaxService.post(
        'http://192.168.1.49:8084/fileUploadToFTP',
        _queryParam,
        {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        }
    ).then((posts) => {
        return posts;
    });
};

export const uploadFileExl = (_queryParam) => {
    return AjaxService.post(API_PLOT_URL + 'bulkupload', _queryParam, {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
    }).then((posts) => {
        return posts;
    });
};

export const uploadFileApi = (_queryParam) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/upload-file',
        _queryParam,
        {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        }
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const cancelFileUpload = (request) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/cancel-file-upload',
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

export const approvedData = (request) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/approve-data',
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

export const updateApprovedData = (request) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/update-approved-data',
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

export const finalFileUpload = (request) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/final-upload',
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

export const validateFileData = (request) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/validatedata',
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

export const dataLoadUpload = (_queryParam) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/dataload-upload',
        _queryParam,
        {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        }
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const adHocFileUpload = (_queryParam) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/adhoc-files',
        _queryParam,
        {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        }
    ).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const adHocFilesParameterTree = (request) => {
    return AjaxService.get(
        BMS_APP_PYTHON_SERVICE + '/adhoc-files/parameter-tree',
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
