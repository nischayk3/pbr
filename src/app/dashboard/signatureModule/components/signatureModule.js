import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Card } from "antd";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import BMS_LOGO from '../../../../assets/BMS.jfif'
import { useRouteMatch, useHistory } from 'react-router-dom';
import {
    hideLoader,
    showLoader,
    showNotification
} from "../../../../duck/actions/commonActions";
import {
    approveRecord,
    eSign,
    publishEvent
} from "../../../../services/electronicSignatureService";
import { getAuthenticate, getAuthenticateWithLdap, getAuthenticateWithoutAD } from "../../../../services/loginService";
import './styles.scss'

const { Option } = Select;

function SignatureModule() {
    let history = useHistory();
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const location = useLocation();
    const params = queryString.parse(location.search);
    // const { isPublish, handleClose } = props;
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [reason, setReason] = useState("");
    const [isauth, setIsAuth] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const loginDetails = JSON.parse(localStorage.getItem("login_details"));
        const status = localStorage.getItem("loginwith")
        if (status) {
            setLoginStatus(status);
        }
        if (loginDetails) {
            setUsername(loginDetails.email_id)
        }
    }, []);

    const authenticateUser = async () => {
        let req = {};
        let header = {
            password: password,
            username: username
        };
        try {
            dispatch(showLoader());
            const res = await getAuthenticate(req, header);
            if (res.Status != 200) {
                setIsAuth("");
                dispatch(showNotification("error", "Incorrect credentials"));
                handleClose();
            } else {
                setIsModalOpen(true);
                setIsAuth(params?.status);
            }
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification("error", "Incorrect credentials"));
        }
    };

    const authenticateUserWithoutAD = async () => {
        let req = {};
        let header = {
            password: password,
            username: username

        };
        try {
            dispatch(showLoader());
            const res = await getAuthenticateWithoutAD(req, header);
            if (res.Status != 200) {
                setIsAuth("");
                dispatch(showNotification("error", "Incorrect credentials"));
                handleClose();
            } else {
                setIsModalOpen(true);
                setIsAuth(params.status);
            }
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification("error", "Incorrect credentials"));
        }
    };

    const authenticateWithLdap = async () => {
        let req = {};
        let header = {
            password: password,
            username: username
        };
        try {
            dispatch(showLoader());
            const res = await getAuthenticateWithLdap(req, header);
            if (res.Status != 200) {
                setIsAuth("");
                dispatch(showNotification("error", "Incorrect credentials"));
                handleClose();
            } else {
                // eslint-disable-next-line react/prop-types
                setIsAuth(params.status);
                setIsModalOpen(true);
            }
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification("error", "Incorrect credentials"));
        }
    };

    const handleConfirm = async () => {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        let time_today = h + ":" + m + ":" + s;
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        let date_today = year + "-" + month + "-" + day;
        let req = {};

        req["date"] = date_today;
        req["timestamp"] = time_today;
        req["reason"] = reason;
        req["user_id"] = username;
        // eslint-disable-next-line react/prop-types
        req["screen"] = params?.screenName;
        req["first_name"] = "first_name";
        req["last_name"] = "last_name";
        let login_response = JSON.parse(localStorage.getItem("login_details"));
        let headers = {
            "content-type": "application/json",
            "resource-name":
                params?.appType == "REPORT" ? "REPORT_DESIGNER" : params?.appType == "ANALYSIS" ? "ANALYTICS" : params?.appType,
            "x-access-token": login_response.token ? login_response.token : ""

        };
        try {
            let esign_response = await eSign(req, headers);

            if (esign_response.statuscode == 200) {
                dispatch(showNotification("success", esign_response.message));
                setReason("")
                setPassword("")
                // handleClose();
                setIsAuth('')
                let reqs = {};
                let req1 = {};
                let user_details = JSON.parse(localStorage.getItem("login_details"));
                let user = user_details["email_id"] ? user_details["email_id"] : "";

                reqs["application_type"] = params?.appType;
                reqs["created_by"] = user;
                reqs["esign_id"] = esign_response.primary_id;
                reqs["disp_id"] = params.dispId;
                reqs["version"] = parseInt(params.version);

                req1["applicationType"] = params?.appType;
                req1["esignId"] = esign_response.primary_id.toString();
                req1["resourceDispId"] = params.dispId;

                if (params.version != "undefined") {
                    req1["resourceVersion"] = parseInt(params.version);
                }
                req1["status"] = params.status;

                //callback esign id
                // if (props.eSignId) {
                //     props.eSignId(esign_response.primary_id);
                // }
                let publish_response =
                    Object.keys(params).length > 0 && params.fromScreen !== "Workspace"
                        ? await approveRecord(req1)
                        : await publishEvent(reqs, headers);

                if (publish_response.status_code == 200) {
                    dispatch(showNotification("success", publish_response.msg));
                    // props.PublishResponse(publish_response);
                    history.goBack()
                } else if (publish_response.Status == 200) {
                    dispatch(showNotification("success", publish_response.Message));
                    // props.PublishResponse(publish_response);
                    history.goBack()
                } else {
                    dispatch(showNotification("error", publish_response.msg));
                }
            } else {
                dispatch(showNotification("error", esign_response.message));
            }
        } catch (err) {
            dispatch(showNotification("error", "Error Occured"));
        }
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };
   
    return (
        <div className="p-28">
            <Card bordered={false}>
                <div className="electronic">
                    {!isModalOpen && <div className="sign">
                        <Card
                            style={{ background: "#F3F0F0" }}
                        >
                            <img style={{ width: 314, marginLeft: -5 }} src={BMS_LOGO} />
                            <div className="cardText"><p>This resource is restricted to authorised users</p></div>
                            <div>
                                {/* <p style={{ margin: "8px 0px" }}>User ID</p> */}
                                <Input
                                    className="cardInput"
                                    value={username}
                                    disabled
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                {/* <p style={{ margin: "8px 0px" }}>Password</p> */}
                                <Input
                                    className="cardInput1"
                                    type="password"
                                    value={password}
                                    placeholder="BMS Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {/* {((isauth === "A" && params.status === "A") ||
                                (isauth === "P" && params.status === "P")) && (
                                    <div>
                                        <p style={{ margin: "8px 0px" }}>Signing</p>
                                        <Select
                                            onChange={(e, value) => {
                                                let reason_value = value.value ? value.value : "";
                                                setReason(reason_value);
                                            }}
                                            style={{ width: 300 }}
                                            className="sign-select"
                                        >
                                            <Option key="Signing on behalf of team mate">
                                                Signing on behalf of team mate
                                            </Option>
                                            <Option key="I am an approver">I am an approver</Option>
                                            <Option key="I am the author">I am the author</Option>
                                            <Option key="Other Reason">Other Reason</Option>
                                        </Select>
                                    </div>
                                )} */}

                            {/* {isauth === "R" && (
                                <div>
                                    <p>Comment</p>
                                    <Input.TextArea
                                        rows={3}
                                        value={reason}
                                        style={{ width: "450px" }}
                                        onChange={(e) => {
                                            setReason(e.target.value);
                                        }}
                                    />
                                </div>
                            )} */}
                            <div className="authenticte_button">
                                {loginStatus == "WITH_AD" ? (
                                    <Button
                                        className="cardButton"
                                        key="3"
                                        onClick={() => authenticateUser()}
                                    // disabled={username == '' || password == ''}
                                    >
                                        Sign In
                                    </Button>
                                ) : loginStatus == "WITHOUT_AD" ? (
                                    <Button
                                        className="cardButton"
                                        key="3"
                                        disabled={username == '' || password == ''}
                                        onClick={() => authenticateUserWithoutAD()}
                                    >
                                        Authenticate without AD
                                    </Button>
                                ) : loginStatus == "WITH_LDAP" ? (
                                    <Button
                                        className="cardButton"
                                        key="3"
                                        disabled={username == '' || password == ''}
                                        onClick={() => authenticateWithLdap()}
                                    >
                                        Authenticate with LDAP
                                    </Button>
                                ) : null}</div>
                            {/* {(isauth === "A" || isauth === "R" || isauth === "P")
                                ? (<div className="authenticte_button">
                                    <Button
                                        className="custom-primary-btn"
                                        key="2"
                                        onClick={() => handleClose()}
                                        style={{ marginRight: 10 }}
                                    >
                                        Cancel
                                    </Button>,
                                    <Button
                                        className="custom-secondary-btn"
                                        key="1"
                                        onClick={() => handleConfirm()}
                                    >
                                        Confirm
                                    </Button>
                                </div>) : (<div className="authenticte_button">
                                    {loginStatus == "WITH_AD" ? (
                                        <Button
                                            className="cardButton"
                                            key="3"
                                            onClick={() => authenticateUser()}
                                        // disabled={username == '' || password == ''}
                                        >
                                            Sign In
                                        </Button>
                                    ) : loginStatus == "WITHOUT_AD" ? (
                                        <Button
                                            className="cardButton"
                                            key="3"
                                            disabled={username == '' || password == ''}
                                            onClick={() => authenticateUserWithoutAD()}
                                        >
                                            Authenticate without AD
                                        </Button>
                                    ) : loginStatus == "WITH_LDAP" ? (
                                        <Button
                                            className="cardButton"
                                            key="3"
                                            disabled={username == '' || password == ''}
                                            onClick={() => authenticateWithLdap()}
                                        >
                                            Authenticate with LDAP
                                        </Button>
                                    ) : null}</div>)} */}
                        </Card>
                    </div>}
                </div>

            </Card>
            <div>
                <Modal className="signatureModal" title="Lets Confirm you action" visible={isModalOpen}
                    onOk={() => handleConfirm()}
                    onCancel={handleCancel}
                    footer={[
                        <Button onClick={handleCancel} key="back" >
                            Cancle
                        </Button>,
                        <Button className="modalButton" onClick={() => handleConfirm()} type="primary" >
                            confirm
                        </Button>,

                    ]}>
                    <p>Comment</p>
                    <Input.TextArea
                        rows={3}
                        value={reason}
                        style={{ width: "550px" }}
                        onChange={(e) => {
                            setReason(e.target.value);
                        }}
                    />
                </Modal>
            </div>


        </div >

    )
}

export default SignatureModule