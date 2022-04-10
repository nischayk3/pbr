import {
	SAVE_AS_FUNCTIONS,
	SAVE_FUNCTIONS,
	MATH_EDITOR,
	FUNCTION_NAME,
	FUNCTION_MAP,
	PARAMETER_MAP,
	VIEW_PARAM_DATA,
	SELECTED_PARAM_DATA,
	BATCH_COVERAGE_DATA,
	SELECTED_VARIABLE,
	SUMMARY_TABLE_DATA,
} from '../../constants/actionTypes';

export const saveViewFunction = payload => ({
	type: SAVE_FUNCTIONS,
	payload,
});

export const saveAsViewFunction = payload => ({
	type: SAVE_AS_FUNCTIONS,
	payload,
});

export const sendFunDetails = payload => ({
	type: MATH_EDITOR,
	payload,
});

export const sendFunctionName = payload => ({
	type: FUNCTION_NAME,
	payload,
});

export const sendFunctionJson = payload => ({
	type: FUNCTION_MAP,
	payload,
});

export const sendParameterJson = payload => ({
	type: PARAMETER_MAP,
	payload,
});

export const sendViewParamData = payload => ({
	type: VIEW_PARAM_DATA,
	payload,
});

export const sendSelectedParamData = payload => ({
	type: SELECTED_PARAM_DATA,
	payload,
});

export const batchCoverage = payload => ({
	type: BATCH_COVERAGE_DATA,
	payload,
});

export const createVariable = payload => ({
	type: SELECTED_VARIABLE,
	payload,
});

export const createSummaryData = payload => ({
	type: SUMMARY_TABLE_DATA,
	payload,
});
