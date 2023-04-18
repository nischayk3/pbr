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

export const getViews = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/views-list",
		request,
		_reqheader('VIEW')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getViewConfig = (request, resourceName) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/view-config",
		request,
		_reqheader(resourceName)
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getMoleculeList = (request, resourceName) => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/molecules3",
		request,
		_reqheader(resourceName)
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const saveFunction = (request, resourceName) => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + "/views",
		request,
		_reqheader(resourceName)
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const adHocFileUpload = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem("login_details"));
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/adhoc-files",
		_queryParam,
		// _reqheader('VIEW'),
		{
			"resource-name": "VIEW",
			"Content-Type": "multipart/form-data",
			"Accept": "*/*",
			"x-access-token": login_response.token ? login_response.token : "",
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

export const adHocFilesParameterTree = (request) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/adhoc-files/parameter-tree",
		request,
		_reqheader('VIEW')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const viewEvaluate = (request) => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/view-evaluate",
		request,
		_reqheader('VIEW')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getParameterBatches = (_queryParam) => {

	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/molecules3",
		_queryParam,
		_reqheader('VIEW')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const filterMolequles = (_queryParam) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/molecules_filter",
		_queryParam,
		_reqheader('VIEW')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const viewDownload = (_queryParam) => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + "/view-download",
		_queryParam,
		_reqheader('VIEW')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

/**
 * view hiearacrchy api
*/

export const viewhieararchyTree = (_queryParam) => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + "/view-hierarchy",
		_queryParam,
		_reqheader('VIEW')
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
