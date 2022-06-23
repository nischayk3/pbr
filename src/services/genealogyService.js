import {
	BMS_APP_PYTHON_SERVICE,
	MDH_APP_PYTHON_SERVICE,
	MDH_APP_GENEALOGY,

} from '../constants/apiBaseUrl';
import Service from './AjaxService';

let login_response = JSON.parse(localStorage.getItem('login_details'));

const request_headers = {
	'content-type': 'application/json',
	'x-access-token': login_response.token ? login_response.token : '',
	'resource-name': 'GENEALOGY'
};

const request_header_file = {
	'content-type': 'application/json',
	'Content-Type': 'multipart/form-data'
};
//geanealogy plant/product/batch

export const getGeanealogyFilter = _queryParam => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + '/genealogy-filter',
		_queryParam,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const getGenealogyProductType = _queryParam => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/product-type-genealogy',
		_queryParam,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const getBackwardData = _queryParam => {
	return Service.get(
		MDH_APP_GENEALOGY + 'genealogy',
		_queryParam,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const getForwardData = _queryParam => {
	return Service.get(
		MDH_APP_GENEALOGY + 'genealogy',
		_queryParam,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

/**
 * TODO: get batch details from node
 */
export const getBatchInfo = _queryParam => {
	return Service.get(
		MDH_APP_GENEALOGY + 'batch-info',
		_queryParam,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

/**
 * TODO: get Input Proces Order & From Process Order details
 */
export const getProcessInfo = _queryParam => {
	return Service.get(
		MDH_APP_GENEALOGY + 'process-info',
		_queryParam,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

//download data table
export const downloadDataTable = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/download-data',
		request,
		request_headers
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const pbrFileUpload = request => {
	return Service.post(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/file_uploads',
		request,
		request_header_file
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

//upload genealogy data
export const genealogyDataUpload = request => {
	return Service.put(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/upload-gngl-data',
		request,
		request_header_file
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const pbrApproval = request => {
	return Service.get(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/pbr_approval',
		request,
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};