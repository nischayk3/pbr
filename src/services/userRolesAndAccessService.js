import axios from 'axios'

export const getRoleConfiguartions = () => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.get('/services/v1/role-config', {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		}
	})
}

export const saveRoleConfiguartions = data => {
	const body = { data }
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.put('/services/v1/role-config', body, {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		}
	})
}

export const deleteRoleConfiguartions = data => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.delete('/services/v1/role-config', {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		},
		data: { data }
	})
}

export const getUserConfiguartions = () => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.get('/services/v1/user-config', {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		}
	})
}

export const saveUserConfigurationws = data => {
	const body = { data }
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.put('/services/v1/user-config', body, {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		}
	})
}

export const deleteUserConfiguartions = data => {
	let login_response = JSON.parse(localStorage.getItem('login_details'));
	return axios.delete('/services/v1/user-config', {
		headers: {
			'x-access-token': login_response.token ? login_response.token : '',
			'resource-name': 'CONFIGURATION'
		},
		data: { data }
	})
}
