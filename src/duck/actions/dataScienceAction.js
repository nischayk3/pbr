import {
	FILE_UPLOAD_RES, LOAD_VIEW_TABLE_DATA,
	VIEWSET_RES,
	VIEW_ID_VERSION
} from '../../constants/actionTypes';



export const loadViewTableData = payload => ({
	type: LOAD_VIEW_TABLE_DATA,
	payload
})

export const sendViewIdVer = payload => ({
	type: VIEW_ID_VERSION,
	payload
})

export const sendFileUploadRes = payload => ({
	type: FILE_UPLOAD_RES,
	payload
})

export const sendViewsetRes = payload => ({
	type: VIEWSET_RES,
	payload
})