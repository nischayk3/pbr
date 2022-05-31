import {LOAD_TEMPLATE,MATBATCH_INFO,PAGE_IDENTIFIER } from '../types/types';


export const loadTemplateInfo = payload => ({
	type: LOAD_TEMPLATE,
	payload,
});

export const loadMatBatchInfo = payload => ({
	type: MATBATCH_INFO,
	payload,
});

export const loadPageIdentifier = payload => ({
	type: PAGE_IDENTIFIER,
	payload,
});

