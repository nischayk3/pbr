import { GRAFANA_DASHBOARD } from '../constants/apiBaseUrl';
import { AjaxService } from '../utilities/AjaxService';

export const crossBatchGrafana = request => {
    return AjaxService.post(
        GRAFANA_DASHBOARD + 'cross_batch',
        request
    ).then(
        response => {
            return response.data;
        },
        error => {
            return error.response.data;
        }
    );
};
