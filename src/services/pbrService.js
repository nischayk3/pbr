import { MDH_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";

export const getBoundingBoxData = (_queryParam) => {
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/ocr-json-extraction",
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

export const savePbrTemplate = (request) => {
	return Service.put(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/save_records",
		request
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
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/get_cpv_pbr_template",
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

export const processBatchRecord = (_queryParam) => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/extract_from_template?save_db=true",
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

export const getPbrTemplateData = (_queryParam) => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/pbr_template",
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

export const getDataView = (_queryParam) => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/get_data_view",
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

export const findParameter = (_queryParam) => {
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/extract_from_template_find",
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
