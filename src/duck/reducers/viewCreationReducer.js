import { FUNCTION_TEXT, MOLECULE_ID } from "../types/types";
import {
	BATCH_COVERAGE_DATA,
	FUNCTION_MAP,
	FUNCTION_NAME,
	IS_LOAD_VIEW,
	IS_NEW_VIEW,
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
	VIEW_FUNCTION_MAP,
	VIEW_FUNCTION_NAME,
	VIEW_PARAM_DATA,
	VIEW_PARAM_MAP
} from '../../constants/actionTypes';

const initState = {
	textName: '',
	molecule_id: '',
	save: '',
	saveAs: '',
	funDetails: '',
	functionName: '',
	functionMap: {},
	parameterMap: {},
	paramData: [],
	selectedParamData: [],
	batchCoverageData: {},
	selectedVariable: [],
	summaryTableData: [],
	selectedParamType: '',
	functions: {},
	parameters: {},
	isLoad: false,
	isNew: false,
	newColumn: [],
	viewFunctionName: '',
	mathValue: '',
	loadResponse: []

};

export default (state = initState, action) => {
	switch (action.type) {
		case FUNCTION_TEXT:
			return { ...state, textName: action.payload };
		case MOLECULE_ID:
			return { ...state, molecule_id: action.payload };
		case SAVE_FUNCTIONS:
			return { ...state, save: action.payload };
		case SAVE_AS_FUNCTIONS:
			return { ...state, saveAs: action.payload };
		case MATH_EDITOR:
			return { ...state, funDetails: action.payload };
		case FUNCTION_NAME:
			return { ...state, functionName: action.payload };
		case FUNCTION_MAP:
			return { ...state, functionMap: action.payload };
		case PARAMETER_MAP:
			return { ...state, parameterMap: action.payload };
		case VIEW_PARAM_DATA:
			return { ...state, paramData: action.payload };
		case SELECTED_PARAM_DATA:
			return { ...state, selectedParamData: action.payload };
		case BATCH_COVERAGE_DATA:
			return { ...state, batchCoverageData: action.payload };
		case SELECTED_VARIABLE:
			return { ...state, selectedVariable: action.payload };
		case SUMMARY_TABLE_DATA:
			return { ...state, summaryTableData: action.payload };
		case SELECTED_PARAM_TYPE:
			return { ...state, selectedParamType: action.payload };
		case VIEW_FUNCTION_MAP:
			return { ...state, functions: action.payload };
		case VIEW_PARAM_MAP:
			return { ...state, parameters: action.payload };
		case IS_LOAD_VIEW:
			return { ...state, isLoad: action.payload };
		case IS_NEW_VIEW:
			return { ...state, isNew: action.payload };
		case NEW_COLUMN:
			return { ...state, newColumn: action.payload };
		case VIEW_FUNCTION_NAME:
			return { ...state, viewFunctionName: action.payload };
		case MATH_VALUE:
			return { ...state, mathValue: action.payload };
		case LOAD_VIEW_RESPONSE:
			return { ...state, loadResponse: action.payload };
		case RESET_VIEW:
			return initState;
		default:
			return state;
	}
};
