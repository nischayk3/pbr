import { BMS_APP_PYTHON_SERVICE } from '../constants/apiBaseUrl';
import Service from './AjaxService';

let login_response = JSON.parse(localStorage.getItem('login_details'));

const request_headers = {
	'content-type': 'application/json',
	'x-access-token': login_response.token ? login_response.token : '',
	'resource-name': 'VIEW'
};

// Get all drug substance
export const getAllViews = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/drug-substance',
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


// Put Plant and molecule
// {
//     "delete_row": true,
//     "ds_name": "string"
//   }
export const putMolecule = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/drug-substance-v2',
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

export const putProcessStep = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/ds-process-step',
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



export const getProcessStep = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/ds-process-step/' + request.ds_name,
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

export const getProcessStepMap = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/process-step-mapping',
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


export const putProcessStepMap = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/process-step-mapping',
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

export const postViewDownload = request => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + '/view-download',
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

/**
 * get all drug-substance -v2
*/
export const getDrugSubstence = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/drug-substance-v2',
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
}


/**
 * update drug-substance -v2
*/
export const updateDrugSubstence = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/drug-substance-v2',
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
}

/**
 * get process step folder structure
*/

export const getProcessStepFolder = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/process-step-folder',
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
}

/**
 * update process step folder structure
*/

export const updateProcessStepFolder = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/process-step-folder',
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
}

/**
 * child process step
*/

export const childProcessStep = request => {
	return Service.post(
		BMS_APP_PYTHON_SERVICE + '/child-process-step',
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
}

/**
 * populate process step
*/

export const populateProcessStep = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/populate-process-steps',
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
}

/**
 * Save Process Mapping
*/

export const SaveProcessFoldermapping = request => {
	return Service.put(
		BMS_APP_PYTHON_SERVICE + '/process-folder-mapping',
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
}

/**
 * Get Process Mapping
*/

export const getProcessFoldermapping = request => {
	return Service.get(
		BMS_APP_PYTHON_SERVICE + '/process-folder-mapping',
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
}