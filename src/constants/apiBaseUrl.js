/*global process*/
const BASE_URL = window.location.origin

//bms login-pass url
export const BMS_APP_LOGIN_PASS = "/auth";

// //platform auth & platform resultset
// export const API_AUTHENTICATION_URL = `${process.env.REACT_APP_PLATFORM_API_URL + "/prismmicro-authentication"}`;

// //BMS APP PYTHON SERVICE V1
// export const BMS_APP_PYTHON_SERVICE = `${process.env.REACT_APP_PYTHON_SERVICES + "/v1"}`;

// //MDH Genealogy python
// export const MDH_APP_PYTHON_SERVICE = `${BASE_URL}`;

// export const MDH_AIRFLOW = `${BASE_URL}/airflow/login/?next=${BASE_URL}/airflow/home`;

// export const MDH_AIRFLOW_DAGS = `${BASE_URL}/airflow/login/?next=+ ${BASE_URL} + "&airflow&dags"`;

// export const MDH_AIRFLOW_ANALYTICS = `${BASE_URL}/airflow/dags`;

// export const PBR_APP_PYTHON_SERVICE = `${process.env.REACT_APP_BMS_PBR_URL + "/udh"}`;

// export const MDH_APP_GENEALOGY = `${process.env.REACT_APP_GENEALOGY}`;

// export const GRAFANA_API = `${process.env.REACT_APP_GRAFANA_APP_URL}`;

// export const JUPYTER_APP = `${process.env.REACT_APP_JUPYTER_APP_URL}`;


//platform auth & platform resultset
export const API_AUTHENTICATION_URL = `${BASE_URL + "/api/prismmicro-authentication"}`;

//BMS APP PYTHON SERVICE V1
export const BMS_APP_PYTHON_SERVICE = `${BASE_URL + "/services/v1"}`;

//MDH Genealogy python
export const MDH_APP_PYTHON_SERVICE = BASE_URL;

export const MDH_AIRFLOW = `${BASE_URL}/airflow/login/?next=${BASE_URL}/airflow/home`;

export const MDH_AIRFLOW_DAGS = `${BASE_URL}/airflow/login/?next=+ ${BASE_URL} + "&airflow&dags"`;

export const MDH_AIRFLOW_ANALYTICS = `${BASE_URL}/airflow/dags`;

export const PBR_APP_PYTHON_SERVICE = `${BASE_URL + "/pbr/udh"}`;

export const MDH_APP_GENEALOGY = `${BASE_URL + "/mdhgenealogy/v1/"}`;

export const GRAFANA_API = `${BASE_URL + "/grafana-api"}`;

export const JUPYTER_APP = `${BASE_URL + "/jupyterhub"}`;

export const WITHOUT_AD_LOGIN = `${process.env.REACT_APP_WITHOUT_AD_LOGIN}`;

export const SSO_LOGIN = `${process.env.REACT_APP_SSO_LOGIN}`;

export const LDAP_LOGIN = `${process.env.REACT_APP_LDAP_LOGIN}`;

export const WITH_AD_LOGIN = `${process.env.REACT_APP_WITH_AD_LOGIN}`;

export const PRODUCT_FOR = `${process.env.REACT_APP_PRODUCT}`;

console.log("base url", BASE_URL);
console.log("process.env", process.env);