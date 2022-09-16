import { MDH_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
import Service from "./AjaxService";



export const getBoundingBoxData = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
export const getRowColumnData = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/get_row_col_identifiers',
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
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

export const findTable = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/find_table_count",
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

export const findPageIdentifier = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/find_page_identifier",
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

export const previewTable = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/table_processing_index",
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
