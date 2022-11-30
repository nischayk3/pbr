import { BMS_APP_PYTHON_SERVICE, GRAFANA_API } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

export const getPipelineList = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
		username: localStorage.getItem("user"),
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/pipeline-list",
		"",
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

export const getResults = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
		username: localStorage.getItem("user"),
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/analysis-result",
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

export const getViewNodeDetails = (query_param) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "VIEW",
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/analyse-view",
		query_param,
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

//save pipeline data
export const putPipelineObj = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
	};
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/pipelines",
		request,
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

export const getPreprocessing = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
	};
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/analysis-preprocessing",
		request,
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

//save pipeline data
export const savePreprocessing = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
	};
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/model-data",
		request,
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

export const getViewList = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "VIEW",
		username: localStorage.getItem("user"),
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/views-list",
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

export const getPipeline = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "VIEW",
		username: localStorage.getItem("user"),
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/get-pipeline",
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

export const getCrossBatch = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
		username: localStorage.getItem("user"),
	};
	return Service.post(GRAFANA_API + "/cross_batch", _queryParam, headers).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getAnalyticsNodes = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
	};
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/analysis-model-populate",
		request,
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

export const getAnalyticsModel = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
	};
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/analysis-model-json",
		request,
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


export const getAnalyticsTransformation = (request) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "ANALYTICS",
	};
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/transformation_mapping",
		request,
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


export const getHyperParameters = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	const headers = {
		"content-type": "application/json",
		"x-access-token": login_response.token ? login_response.token : "",
		"resource-name": "VIEW",
		username: localStorage.getItem("user"),
	};
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/analysis-hyperparameters",
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
