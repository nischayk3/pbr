import axios from 'axios';

class Service {
	constructor() {
		let service = axios.create();
		this.service = service;
		this.service.interceptors.request.use(function (config) {
			return config;
		}, function (error) {
			return Promise.reject(error);
		});
		
		this.service.interceptors.response.use(function (response) {
			return response;
		}, function (error) {
			if (error.response.status === 401) {
				const tokenExpiredEvent = new Event('tokenExpired')
				document.dispatchEvent(tokenExpiredEvent)
			}
			return Promise.reject(error);
		});
	}

	get(url, params, headers) {
		return this.service({
			method: 'GET',
			url: url,
			headers: headers || { 'content-type': 'application/json' },
			params: params || {},
		});
	}

	post(url, data, headers) {
		return this.service({
			method: 'POST',
			url: url,
			headers: headers || { 'content-type': 'application/json' },
			data: data,
		});
	}

	del(url, data, headers) {
		return this.service({
			method: 'DELETE',
			url: url,
			headers: headers || { 'content-type': 'application/json' },
			data: data,
		});
	}

	put(url, data, headers) {
		return this.service({
			method: 'PUT',
			url: url,
			headers: headers || { 'content-type': 'application/json' },
			data: data,
		});
	}
}

export default new Service();
