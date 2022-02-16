import { API_AUTHENTICATION_URL } from "../constants/apiBaseUrl";
import { AjaxService } from "../utils/AjaxService";

export const userLogin = (_queryParam) => {
  return AjaxService.post(
    API_AUTHENTICATION_URL + "/signin",
    JSON.stringify(_queryParam)
  ).then(
    (res) => res.data,
    (error) => {
      throw error.response.data;
    }
  );
};

export const userRefresh = (_queryParam) => {
  return AjaxService.post(
    API_AUTHENTICATION_URL + "/signin/refresh",
    {},
    {
      Accept: "application/json",
      "Content-Type": "application/json",
      refreshToken: _queryParam,
    }
  ).then(
    (res) => res.data,
    (error) => {
      throw error.response.data;
    }
  );
};

export const userLogout = (_queryParam) => {
  return AjaxService.post(
    API_AUTHENTICATION_URL + "/signout",
    JSON.stringify(_queryParam)
  ).then(
    (res) => res.data,
    (error) => {
      throw error.response.data;
    }
  );
};
