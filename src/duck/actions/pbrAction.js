import {LOAD_TEMPLATE,MATBATCH_INFO } from '../types/types';


export const loadTemplateInfo = payload => ({
	type: LOAD_TEMPLATE,
	payload,
});

export const loadMatBatchInfo = payload => ({
	type: MATBATCH_INFO,
	payload,
});


