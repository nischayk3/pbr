import React, { useState } from 'react';
import { Modal, Input, Select, Button } from 'antd';
import './styles.scss'
import { eSign } from '../../services/electronicSignatureService'


const { Option } = Select
function Signature(props) {

    var { isPublish, handleClose } = props

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [reason, setReason] = useState('')

    console.log(username, password, reason)

    // {
    //     "date": "2015-01-05",
    //     "first_name": "first",
    //     "last_name": "last",
    //     "reason": "test reason",
    //     "screen": "test_screen",
    //     "timestamp": "09:38:59",
    //     "user_id": "test_01"
    //   }
    const handleConfirm = () => {

        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        let time_today = h+":"+m+":"+s; 
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        let date_today = day+"-"+month+"-"+year  
        let req = {}

        req['date'] = date_today
        req['timestamp'] = time_today
        req['reason'] = reason
        req['user_id'] = username
        req['screen'] = props.screenName
        req['first_name'] = "first_name"
        req['last_name'] = "last_name"

        eSign(req).then((res)=>
        {
            if(res.statuscode==200)
            {
               console.log(res)
            }
        })


    }

    return (
        <div>
            <Modal
                visible={isPublish}
                title="Enter details to confirm update"
                width={500}
                mask={true}
                onCancel={handleClose}
                footer={[<Button className="custom-secondary-btn" key="2" onClick={() => handleClose()}>Cancel</Button>, <Button className="custom-secondary-btn" key="1" onClick={()=>handleConfirm()} >Confirm</Button>,]}
                mask={true}
            >
                <div className="electronic-sig">
                    <div>
                        <p>User ID</p>
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <p>Password</p>
                        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
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
