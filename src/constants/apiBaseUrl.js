/*global process*/

//platform auth & platform resultset
export const API_AUTHENTICATION_URL = `${process.env.REACT_APP_PLATFORM_API_URL + "/prismmicro-authentication"}`;

//export const API_RESULTSET_URL = `${process.env.REACT_APP_PLATFORM_API_URL + "/prismmicro-resultset"}`;

//grafana dashboard
// export const GRAFANA_DASHBOARD = `${process.env.REACT_APP_GRAFANA_APP_URL + "/grafana/"}`;

//bms login-pass url
export const BMS_APP_LOGIN_PASS = "/auth";

//BMS APP PYTHON SERVICE V1
export const BMS_APP_PYTHON_SERVICE = `${process.env.REACT_APP_PYTHON_SERVICES + "/v1"}`;

//MDH Genealogy python
export const MDH_APP_PYTHON_SERVICE = `${process.env.REACT_APP_URL}`;

export const PBR_APP_PYTHON_SERVICE = `${process.env.REACT_APP_BMS_PBR_URL + "/udh"}`;

export const MDH_APP_GENEALOGY = `${process.env.REACT_APP_GENEALOGY}`;

export const MDH_AIRFLOW = `${process.env.REACT_APP_URL}/airflow/login/?next=${process.env.REACT_APP_URL}/airflow/home`;

export const MDH_AIRFLOW_DAGS = `${process.env.REACT_APP_URL}/airflow/login/?next=+ ${process.env.REACT_APP_URL} + "&airflow&dags"`;

export const MDH_AIRFLOW_ANALYTICS = `${process.env.REACT_APP_URL}/airflow/dags`;

export const GRAFANA_API = `${process.env.REACT_APP_GRAFANA_APP_URL}`;

export const JUPYTER_APP = `${process.env.REACT_APP_JUPYTER_APP_URL}`;

export const WITHOUT_AD_LOGIN = `${process.env.REACT_APP_WITHOUT_AD_LOGIN}`;

export const SSO_LOGIN = `${process.env.REACT_APP_SSO_LOGIN}`;

export const LDAP_LOGIN = `${process.env.REACT_APP_LDAP_LOGIN}`;

export const WITH_AD_LOGIN = `${process.env.REACT_APP_WITH_AD_LOGIN}`;

export const PRODUCT_FOR = `${process.env.REACT_APP_PRODUCT}`;





console.log("process.env", process.env);