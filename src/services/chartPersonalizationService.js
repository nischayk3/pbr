import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

let login_response = JSON.parse(localStorage.getItem("login_details"));
const _reqheader = (resource) => {
	const _req = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": resource,
	}
	return _req
};

//get site id
export const getSiteId = (_queryParam) => {
	return Service.get(BMS_APP_PYTHON_SERVICE + "/site_ids", _queryParam).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//get chart type
export const getChartList = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/chart-list",
		request,
		_reqheader('chart')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//get rule list
export const getRuleList = (request) => {
	return Service.get(BMS_APP_PYTHON_SERVICE + "/rules", request).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error;
		}
	);
};

//get chart plot data
export const postChartPlotData = (_queryParam) => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/chart-object",
		_queryParam,
		_reqheader('chart')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//save chart data
export const saveChartPlotData = (_queryParam) => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/chart-object",
		_queryParam,
		_reqheader('chart')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//get chart data
export const getChartPlotData = (_queryParam, resource) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/chart-object",
		_queryParam,
		_reqheader(resource)
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
