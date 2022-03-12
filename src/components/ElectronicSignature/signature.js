import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Modal, Input, Select, Button } from 'antd';
import './styles.scss'
import { eSign, publishEvent } from '../../services/electronicSignatureService'
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../duck/actions/commonActions'
import queryString from 'query-string';

const { Option } = Select
function Signature(props) {
    const location= useLocation();
    const params= queryString.parse(location.search)
    var { isPublish, handleClose } = props
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [reason, setReason] = useState('')
    const [primaryId, setPrimaryId] = useState()
    const dispatch = useDispatch();

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
        let date_today = day + "-" + month + "-" + year
        let req = {}

        req['date'] = date_today
        req['timestamp'] = time_today
        req['reason'] = reason
        req['user_id'] = username
        req['screen'] = props.screenName
        req['first_name'] = "first_name"
        req['last_name'] = "last_name"
        try {
            let esign_response = await eSign(req)

            if (esign_response.statuscode == 200) {
                setPrimaryId(esign_response.primary_id)
                dispatch(showNotification('success', esign_response.message))
                handleClose()

                let reqs = {}
                let user_details = JSON.parse(localStorage.getItem('user_details'))
                let user = user_details["username"] ? user_details["username"] : ''

                reqs['application_type'] = props.appType
                reqs['created_by'] = user
                reqs['esign_id'] = esign_response.primary_id
                reqs['disp_id'] = Object.keys(params).length>0?params.id:props.dispId
                reqs['version'] = Object.keys(params).length>0?parseInt(params.version):parseInt(props.version)

                let publish_response = await publishEvent(reqs)

                if (publish_response.status_code == 200) {
                    dispatch(showNotification('success', publish_response.msg))
                    props.PublishResponse(publish_response)
                }
                else {
                    dispatch(showNotification('error', publish_response.msg))
                }
            }
            else {
                dispatch(showNotification('error', esign_response.message))
            }
        }
        catch
        {
            dispatch(showNotification('error', 'Error Occured'))
        }


    }
    return (
        <div>
            <Modal
                visible={isPublish}
                title="Enter details to confirm update"
                width={500}
                mask={true}
                onCancel={handleClose}
                footer={[<Button className="custom-secondary-btn" key="2" onClick={() => handleClose()}>Cancel</Button>, <Button className="custom-secondary-btn" key="1" onClick={() => handleConfirm()} >Confirm</Button>,]}
                mask={true}
            >
                <div className="electronic-sig">
                    <div>
                        <p>User ID</p>
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <p>Password</p>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <p>Signing</p>
                        <Select onChange={(e, value) => {
                            let reason_value = value.value ? value.value : ''
                            setReason(reason_value)
                        }}
                            className="sign-select"

                        >
                            <Option key="Signing on behalf of team mate">
                                Signing on behalf of team mate
                            </Option>
                            <Option key="I am an approver">
                                I am an approver
                            </Option>
                            <Option key="I am the author">
                                I am the author
                            </Option>
                            <Option key="Other Reason">
                                Other Reason
                            </Option>
                        </Select>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Signature;
