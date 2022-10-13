import {
	IS_TARGET_VAR,
	LOAD_VIEW_TABLE_DATA
} from '../../constants/actionTypes';


export const onClickTarget = payload => ({
	type: IS_TARGET_VAR,
	payload
})

export const loadViewTableData = payload => ({
	type: LOAD_VIEW_TABLE_DATA,
	payload
})