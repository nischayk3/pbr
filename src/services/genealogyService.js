import Service from './AjaxService';
import {
  BMS_APP_PYTHON_SERVICE,
  API_APPLICATION_MDH,
} from '../constants/apiBaseUrl';

//geanealogy plant/product/batch

export const getGeanealogyFilter = (_queryParam) => {
  return Service.post(
    API_APPLICATION_MDH + '/mdh-getGenealogyFilter-service',
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

export const getBackwardData = (_queryParam) => {
  return Service.post(
    API_APPLICATION_MDH + '/mdh-getBackwardGeneology-service',
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

export const getForwardData = (_queryParam) => {
  return Service.post(
    API_APPLICATION_MDH + '/mdh-getForwardGeneology-service',
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
