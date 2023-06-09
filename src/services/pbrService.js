import { MDH_APP_PYTHON_SERVICE, PBR_APP_PYTHON_SERVICE } from "../constants/apiBaseUrl";
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
		PBR_APP_PYTHON_SERVICE + '/get_cpv_pbr',
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
		PBR_APP_PYTHON_SERVICE + '/get_tran_pbr_template_id',
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
		PBR_APP_PYTHON_SERVICE + '/get_cpv_pbr_count',
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

export const updateApprove = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.put(
		PBR_APP_PYTHON_SERVICE + '/get_cpv_pbr',
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

export const projectFilterSearch = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/project_filter_search",
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

export const projectFileUpload = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/project_file_uploads",
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

export const uploadProjectData = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.put(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/upload-project-data",
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

export const projectDataView = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/project_data_view",
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

export const bboxData = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/bbox_data",
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

export const workflowTemplateReject = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.put(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/workflow_template_data",
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
export const workflowTemplateData = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/workflow_template_data",
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

export const timeZone = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/get_file_timezone",
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

export const getPdfData = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/upload-gngl-data",
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

export const getAdvanceSetting = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/advance_setting",
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

export const loadAdvanceSetting = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/load_setting",
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

export const saveAdvanceSetting = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.put(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/advance_setting",
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

export const loadRelativeDirectionSetting = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/load_relative_direction_setting",
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

export const saveRelativeDirection = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.put(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/relative_direction_setting",
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

export const getRelativeDirectionSetting = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/relative_direction_setting",
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

export const getFileList = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.get(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/file_list",
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

export const expand_bbox = (_queryParam) => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	const request_headers = {
		'x-access-token': login_response?.token ? login_response?.token : '',
		'resource-name': 'PBR'
	};
	return Service.post(
		MDH_APP_PYTHON_SERVICE + "/pbr/udh/expand_bbox",
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

