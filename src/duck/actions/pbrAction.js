import { LOAD_TEMPLATE, MATBATCH_INFO, PAGE_IDENTIFIER,TEMP_ADDITIONAL,INITIAL_DATA } from '../types/types';

export const loadTemplateInfo = payload => ({
	type: LOAD_TEMPLATE,
	payload
});

export const loadMatBatchInfo = payload => ({
	type: MATBATCH_INFO,
	payload
});

export const loadPageIdentifier = payload => ({
	type: PAGE_IDENTIFIER,
	payload,
});

export const loadTempAdditionalData = payload => ({
	type: TEMP_ADDITIONAL,
	payload,
});

export const initialTableData = payload => ({
	type: INITIAL_DATA,
	payload,
});

