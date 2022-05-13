import axios from 'axios'

let login_response = JSON.parse(localStorage.getItem('login_details'));

export const getRoleConfiguartions = () => {
    return axios.get('/services/v1/role-config', {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'VIEW'
        }
    })
}

export const saveRoleConfiguartions = data => {
    return axios.put('/services/v1/role-config', data, {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'VIEW'
        }
    })
}

export const deleteRoleConfiguartions = role_name => {
    return axios.delete('/services/v1/role-config', {
        headers: {
            'x-access-token': login_response.token ? login_response.token : '',
            'resource-name': 'VIEW'
        },
        params: { role_name }
    })
}