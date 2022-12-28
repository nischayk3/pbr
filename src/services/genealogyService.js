import {
	BMS_APP_PYTHON_SERVICE, MDH_APP_GENEALOGY, MDH_APP_PYTHON_SERVICE
} from '../constants/apiBaseUrl';
import Service from './AjaxService';

let login_response = JSON.parse(localStorage.getItem('login_details'));

const request_headers = {
	'content-type': 'application/json',
	'x-access-token': login_response.token ? login_response.token : '',
	'resource-name': 'GENEALOGY'
};

const request_head = {
	'content-type': 'application/json',
	'x-access-token': login_response.token ? login_response.token : '',
	'resource-name': 'GENEALOGY',
	'username': login_response && login_response.email_id
};

const request_header_file = {
	'content-type': 'application/json',
	'x-access-token': login_response.token ? login_response.token : '',
	'Content-Type': 'multipart/form-data',
	'resource-name': 'GENEALOGY'
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
		request_head,
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};

export const getGeanealogy = _queryParam => {
	return Service.post(
		MDH_APP_GENEALOGY + 'get-genealogy',
		_queryParam,
		request_head,
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
		request_head,
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
// export const downloadDataTable = request => {
// 	return Service.get(
// 		BMS_APP_PYTHON_SERVICE + '/download-data',
// 		request,
// 		request_headers
// 	).then(
// 		response => {
// 			return response.data;
// 		},
// 		error => {
// 			return error.response.data;
// 		}
// 	);
// };

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
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + '/pbr/udh/approved_data',
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


// golden batch update

export const updateGoldenBatch = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/golden-batch',
		request,
		request_headers,
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};


//batch equipment

export const getBatchEquipment = request => {
	return Service.get(
		MDH_APP_GENEALOGY + 'batch_equipment',
		request,
		request_headers,
	).then(
		response => {
			return response.data;
		},
		error => {
			return error.response.data;
		}
	);
};