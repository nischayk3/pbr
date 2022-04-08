import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';



export const getViews = (request) => {
    return Service.get(BMS_APP_PYTHON_SERVICE + '/views-list', request).then(
        (response) => {
            return response.data;
        },
        (error) => {
            return error.response.data;
        }
    );
};

export const getViewConfig = (request,headers) => {
  return Service.get(BMS_APP_PYTHON_SERVICE + '/view-config', request, headers).then(
    (response) => {
      return response.data;
    },
    (error) => {
      return error.response.data;
    }
  );
};
