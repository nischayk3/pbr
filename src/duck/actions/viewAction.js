import {
	BATCH_COVERAGE_DATA,
	BATCH_DATA,
	FUNCTION_MAP,
	FUNCTION_NAME,
	IS_LOAD_VIEW,
	IS_NEW_VIEW,
	IS_TARGET_VAR,
	LOAD_VIEW_RESPONSE,
	MATH_EDITOR,
	MATH_VALUE,
	NEW_COLUMN,
	PARAMETER_MAP,
	RESET_VIEW,
	SAVE_AS_FUNCTIONS,
	SAVE_FUNCTIONS,
	SELECTED_PARAM_DATA,
	SELECTED_PARAM_TYPE,
	SELECTED_VARIABLE,
	SUMMARY_TABLE_DATA,
	TOTAL_FILE_BATCHES,
	TOTAL_MOL_BATCHES,
	VIEW_FUNCTION_MAP,
	VIEW_FUNCTION_NAME,
	VIEW_PARAM_DATA,
	VIEW_PARAM_MAP
} from '../../constants/actionTypes';

export const saveViewFunction = payload => ({
	type: SAVE_FUNCTIONS,
	payload
});

export const saveAsViewFunction = payload => ({
	type: SAVE_AS_FUNCTIONS,
	payload
});

export const sendFunDetails = payload => ({
	type: MATH_EDITOR,
	payload
});

export const sendFunctionName = payload => ({
	type: FUNCTION_NAME,
	payload
});

export const sendFunctionJson = payload => ({
	type: FUNCTION_MAP,
	payload
});

export const sendParameterJson = payload => ({
	type: PARAMETER_MAP,
	payload
});

export const sendViewParamData = payload => ({
	type: VIEW_PARAM_DATA,
	payload
});

export const sendSelectedParamData = payload => ({
	type: SELECTED_PARAM_DATA,
	payload
});

export const batchCoverage = payload => ({
	type: BATCH_COVERAGE_DATA,
	payload
});

export const getBatchData = payload => ({
	type: BATCH_DATA,
	payload
})

export const createVariable = payload => ({
	type: SELECTED_VARIABLE,
	payload
});

export const createSummaryData = payload => ({
	type: SUMMARY_TABLE_DATA,
	payload
});

export const selectParamType = payload => ({
	type: SELECTED_PARAM_TYPE,
	payload
});

export const viewFunctionMap = payload => ({
	type: VIEW_FUNCTION_MAP,
	payload
});
export const viewParamMap = payload => ({
	type: VIEW_PARAM_MAP,
	payload
});

export const isLoadView = payload => ({
	type: IS_LOAD_VIEW,
	payload
});

export const isNewView = payload => ({
	type: IS_NEW_VIEW,
	payload
});

export const setNewColumn = payload => ({
	type: NEW_COLUMN,
	payload
});

export const resetView = payload => ({
	type: RESET_VIEW,
	payload
});

export const setViewFunctionName = payload => ({
	type: VIEW_FUNCTION_NAME,
	payload
});

export const setMathValue = payload => ({
	type: MATH_VALUE,
	payload
});

export const setViewResposne = payload => ({
	type: LOAD_VIEW_RESPONSE,
	payload
});

export const sendTotalMolBatches = payload => ({
	type: TOTAL_MOL_BATCHES,
	payload
})

export const sendTotalFileBatches = payload => ({
	type: TOTAL_FILE_BATCHES,
	payload
})

export const onClickTarget = payload => ({
	type: IS_TARGET_VAR,
	payload
})