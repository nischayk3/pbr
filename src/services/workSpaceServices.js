import Service from './AjaxService';
import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';

//get deviation data
export const getDeviationData = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/recent-deviations', _queryParam,{
        'content-type': 'application/json',
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

// get dataquality data
export const getDataQualityData = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/data-quality-report', _queryParam,{
        'content-type': 'application/json',
        'username': localStorage.getItem('user'),
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

//get top5 charts with exceptions
export const getChartExceptionData = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/chart-exceptions', _queryParam,{
        'content-type': 'application/json',
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};


//get chart plot data
export const getChartPlotData = (_queryParam,headers) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/chart', _queryParam,headers).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

// get last updated views and charts
export const getUpdatedChartsViewsData = (_queryParam) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/last-views-and-charts', _queryParam,{
        'content-type': 'application/json',
        'username': localStorage.getItem('user'),
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};
