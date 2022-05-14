import axios from 'axios'

export const getRoleConfiguartions = () => {
    let login_response = JSON.parse(localStorage.getItem('login_details'));
    return axios.get('/services/v1/role-config', {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'VIEW'
        }
    })
}

export const saveRoleConfiguartions = data => {
    const body = { data }
    let login_response = JSON.parse(localStorage.getItem('login_details'));
    return axios.put('/services/v1/role-config', body, {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'VIEW'
        }
    })
}

export const deleteRoleConfiguartions = role_name => {
    let login_response = JSON.parse(localStorage.getItem('login_details'));
    return axios.delete('/services/v1/role-config', {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'VIEW'
        },
        params: { role_name }
    })
}

export const getUserConfiguartions = () => {
    let login_response = JSON.parse(localStorage.getItem('login_details'));
    return axios.get('/services/v1/user-config', {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'REPORT_DESIGNER'
        }
    })
}

export const saveUserConfigurationws = data => {
    const body = { data }
    let login_response = JSON.parse(localStorage.getItem('login_details'));
    return axios.put('/services/v1/user-config', body, {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'REPORT_DESIGNER'
        }
    })
}

export const deleteUserConfiguartions = role_name => {
    let login_response = JSON.parse(localStorage.getItem('login_details'));
    return axios.delete('/services/v1/user-config', {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'REPORT_DESIGNER'
        },
        params: { role_name }
    })
}