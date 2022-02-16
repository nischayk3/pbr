import {
    API_RESULTSET_URL,
    API_PLOT_URL,
    GRAFANA_DASHBOARD,
    BMS_APP_PYTHON_SERVICE_IP,
    BMS_APP_PYTHON_SERVICE,
    BMS_APP_PYTHON_SERVICE_DNS,
} from '../../constants/apiBaseUrl';
import { AjaxService } from '../../utils/AjaxService';

/*To get the list of tables*/
export const returnData = (request) => {
    return AjaxService.post(API_RESULTSET_URL + '/returnData', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const CustmReturnData = (request) => {
    return AjaxService.post(API_PLOT_URL + 'apqrreport', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
export const dataQualityReturnData = (request) => {
    return AjaxService.post(API_PLOT_URL + 'data_quality_report', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
export const ipcConfigSaveRecord = (request) => {
    return AjaxService.post(GRAFANA_DASHBOARD + 'config_dashboard', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const loadFilter = (request) => {
    return AjaxService.post(API_RESULTSET_URL + '/loadFilter', request).then(
        (response) => {
            return response;
        },
        (error) => {
            return error.response.data;
        }
    );
};
export const auditDataChange = (request) => {
    return AjaxService.post(
        BMS_APP_PYTHON_SERVICE + '/audit-data-change',
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

export const exportAuditData = (request) => {
    return AjaxService.gett(
        BMS_APP_PYTHON_SERVICE + '/audit-information',
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

export const getMoleculeData = (request) => {
    return AjaxService.get(BMS_APP_PYTHON_SERVICE + '/molecules', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getChartType = (request) => {
    return AjaxService.get(BMS_APP_PYTHON_SERVICE + '/chartTypes', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
