import { API_CPV_URL } from '../constants/apiBaseUrl';
import { AjaxService } from '../utilities/AjaxService';

export const updateReport = queryParam => {
    return fetch(API_CPV_URL + '/savePdfReport', {
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


export const deleteTemplate = queryParam => {
    return fetch(API_CPV_URL + '/deleteTemplate', {
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

// export const publishTemplate = queryParam => {
//   return fetch(API_CPV_URL + "/putTemplate", {
//     //platform-services //prismmicro-resultset
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(queryParam)
//   })
//     .then(res => res.json())
//     .then(fields => fields);
// };


export const getTemplate = queryParam => {
    return fetch(API_CPV_URL + '/getTemplate/' + queryParam.id + '?templatename=' + queryParam.template_name + '&transactionid=' + queryParam.tid, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(fields => fields);
};

export const downloadReport = (_queryParam, id) => {
    return fetch(
        API_CPV_URL + '/downloadPdfReport/' + id + '?' + _queryParam,
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'text/html'
            }
        },
        {
            mode: 'no-cors'
        }
    ).then(res => {
    // var file = new File([res], "hey", { type: 'application/force-download' });
        if (!res.url || res.status !== 200) throw Error('Download Error!');
        var link = document.createElement('a');
        link.href = res.url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        return;
    });
};

export const getPdfReport = (_queryParam) => {
    return fetch(API_CPV_URL + '/getPdfReport', {
    //platform-services //prismmicro-resultset
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_queryParam)

    })
        .then(res => res.json())
        .then(fields => fields);
};

export const getAllFiles = (_queryParam) => {
    return fetch(API_CPV_URL + '/getAllFiles', {
    //platform-services //prismmicro-resultset
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_queryParam)

    })
        .then(res => res.json())
        .then(fields => fields);
};

export const publishReport = (_queryParam) => {
    return AjaxService.post(API_CPV_URL + '/publishReport', _queryParam, {
        'Content-Type': 'multipart/form-data'
    }
    ).then(
        (posts) => {
            return posts;
        }
    );
};

export const publishTemplate = (_queryParam) => {
    return AjaxService.post(API_CPV_URL + '/putTemplate', _queryParam, {
        'Content-Type': 'multipart/form-data'
    }
    ).then(
        (posts) => {
            return posts;
        }
    );
};