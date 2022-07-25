import { MDH_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

let login_response = JSON.parse(localStorage.getItem('login_details'));

const request_headers = {
	'x-access-token': login_response.token ? login_response.token : '',
	'resource-name': 'PBR'
};

export const getBoundingBoxData = (_queryParam) => {
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/ocr-json-extraction",
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const savePbrTemplate = (request) => {
	return Service.put(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/save_records",
		request,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getPbrReviewerData = (_queryParam) => {
	return Service.post(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/get_cpv_pbr',
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
export const geTemplateDropdown = (_queryParam) => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/get_tran_pbr_template_id',
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
export const getPieChartData = (_queryParam) => {
	return Service.post(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/get_cpv_pbr_count',
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
export const getImage = (_queryParam) => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/get_file_page_image',
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
export const updateApprove = (_queryParam) => {
	return Service.put(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/get_cpv_pbr',
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const processBatchRecord = (_queryParam) => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/extract_from_template?save_db=true",
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getPbrTemplateData = (_queryParam) => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/pbr_template",
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const getDataView = (_queryParam) => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/get_data_view",
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};

export const findParameter = (_queryParam) => {
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/extract_from_template_find",
		_queryParam,
		request_headers
	).then(
		(response) => {
			return response.data;
		},
		(error) => {
			return error.response.data;
		}
	);
};
