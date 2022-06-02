/**
 * @author Fahad Siddiqui <fahad.siddiqui@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 05 April, 2022
 * @Last Changed By - Fahad
 */

import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';


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
