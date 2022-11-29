import { BMS_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

//get deviation data
export const getDeviationData = (_queryParam) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/recent-deviations",
		_queryParam,
		{
			"content-type": "application/json",
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

// get dataquality data
export const getDataQualityData = (_queryParam) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/data-quality-report",
		_queryParam,
		{
			"content-type": "application/json",
			username: sessionStorage.getItem("user"),
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

//get top5 charts with exceptions
export const getChartExceptionData = (_queryParam) => {
	const login_response = JSON.parse(sessionStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "WORKITEMS",
		username: sessionStorage.getItem("user"),
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/chart-exceptions",
		_queryParam,
		headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

//get chart plot data
export const getChartPlotData = (_queryParam, headers) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/chart-object",
		_queryParam,
		headers
	).then(
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
	let login_response = JSON.parse(sessionStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "VIEW",
		username: sessionStorage.getItem("user"),
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/last-views-and-charts",
		_queryParam,
		headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
