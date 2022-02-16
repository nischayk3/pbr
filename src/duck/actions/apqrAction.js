import { API_CPV_URL } from '../constants/apiBaseUrl';

export const apqrGet = queryParam => {
    return fetch(API_CPV_URL + '/savePdfReport', {
    //platform-services //prismmicro-resultset
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryParam)
    })
        .then(res => res.json())
        .then(fields => fields);
};
