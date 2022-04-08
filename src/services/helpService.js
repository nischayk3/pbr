import Service from './AjaxService';
import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';


export const faqData = (request) => {
    return Service.post(BMS_APP_PYTHON_SERVICE + '/faq', request).then(
      (response) => {
        return response.data;
      },
      (error) => {
        return error.response.data;
      }
    );
  };