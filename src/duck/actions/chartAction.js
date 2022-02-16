import { API_PLOT_URL } from "../constants/apiBaseUrl";

export const chartGenerator = (queryParam, endPoint) => {
  return fetch(API_PLOT_URL + endPoint, {
    //platform-services //prismmicro-resultset
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(queryParam)
  })
    .then(res => res.json())
    .then(fields => fields);
};