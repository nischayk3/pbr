import axios from "axios";
import { checkAuth, checkNetworkError, hideLoader, showNotification } from "../duck/actions/commonActions";
import { Store } from "../duck/store";
class Service {
	constructor() {
		let service = axios.create();
		this.service = service;
		this.service.interceptors.request.use(
			function (config) {
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);

		this.service.interceptors.response.use(
			function (response) {
				if (response) {
					Store.dispatch(hideLoader(true))
				}
				return response;
			},
			function (error) {
				if (error.response.status === 401) {
					Store.dispatch(hideLoader(true))
					Store.dispatch(checkAuth(false));
				} else if (error.response.status === 403) {
					console.log("error service", error.response);
					if (error.response?.config?.headers['resource-name'] !== 'WORKITEMS') {
						Store.dispatch(hideLoader(true))
						Store.dispatch(showNotification("error", 'You are not authorized', "It seems like you don't have permission to use this service."));
					}
				} else if (error.response.status === 500) {
					Store.dispatch(hideLoader(true))
					Store.dispatch(checkNetworkError(true));
					Store.dispatch(showNotification("error", '500 error, Internal Server Error', 'Please try again later'));
				} else if (error.response.status === 501) {
					Store.dispatch(hideLoader(true))
					Store.dispatch(showNotification("error", '501 error, Not Implemented', 'Please try again later'));
				} else if (error.response.status === 502) {
					Store.dispatch(hideLoader(true))
					Store.dispatch(showNotification("error", '502 error, Bad Gateway', 'Please try again later'));
				} else if (error.response.status === 503) {
					Store.dispatch(hideLoader(true))
					Store.dispatch(showNotification("error", '503 error, Service Unavailable', 'Please try again later'));
				} else if (error.response.status === 504) {
					Store.dispatch(hideLoader(true))
					Store.dispatch(showNotification("error", '504 error, Gateway Timeout', 'Please try again later'));
				} else {
					Store.dispatch(hideLoader(true))
				}
				return Promise.reject(error);
			}
		);
	}

	get(url, params, headers) {
		return this.service({
			method: "GET",
			url: url,
			headers: headers || { "content-type": "application/json" },
			params: params || {},
		});
	}

	post(url, data, headers) {
		return this.service({
			method: "POST",
			url: url,
			headers: headers || { "content-type": "application/json" },
			data: data,
		});
	}

	del(url, data, headers) {
		return this.service({
			method: "DELETE",
			url: url,
			headers: headers || { "content-type": "application/json" },
			data: data,
		});
	}

	put(url, data, headers) {
		return this.service({
			method: "PUT",
			url: url,
			headers: headers || { "content-type": "application/json" },
			data: data,
		});
	}
}

export default new Service();
