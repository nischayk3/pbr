import React, { useState } from "react";
import { Modal, Input, Select, Avatar, Button } from 'antd';
import './sharing.scss'
import { UserAddOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { showNotification } from "../../duck/actions/commonActions";
const { Option } = Select;

export default function Sharing(props) {
    const { isShare, handleShareCancel } = props;
    const [shareList, setShareList] = useState([])
    const [email, setEmail] = useState('')
    const [copy, setCopy] = useState('')
    const dispatch = useDispatch()


    function generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color
    }

    const addUser = (addUser) => {
        setShareList([...shareList, { user: addUser, rights: 'Viewer', color: generateRandomColor() }]);
        setEmail('')
    };

    const editUser = (new_rights, user_details) => {
        const updatedList = shareList.map(list =>
            list.user === user_details.user ? { ...list, rights: new_rights } : list);
        setShareList(updatedList);
    }

    const onCopy = () => {
        navigator.clipboard.writeText(copy)
        dispatch(showNotification('success', 'Link copied'))

    }
    return (
        <Modal className="sharing" title={<><UserAddOutlined style={{ marginLeft: '7px' }} /><span className="sharing-modal-title">Share with people</span></>} visible={isShare} onCancel={handleShareCancel} footer={false}>
            <div className="recepients">
                <p className="recepients-text">Recepients</p>
                <div className="recepients-input">
                    <Input style={{ width: '660px' }} bordered={false} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter user email to share" onKeyPress={event => {
                        if (event.key === 'Enter') {
                            addUser(event.target.value)
                        }
                    }} />
                </div>
            </div>
            <hr style={{ borderTop: "0.5px solid #d9d9d9", marginLeft: '6px' }} />
            <div className="recepients-fixed">
                <span>

                    <Avatar
                        style={{
                            color: "#FFFFFF",
                            backgroundColor: 'red',
                            // marginTop: '5px'
                            marginLeft: '9px'
                        }}
                        size="small"
                    >
                        {localStorage.getItem("user").substring(0, 1).toUpperCase()}
                    </Avatar>
                </span>
                <p className="email-text">{localStorage.getItem("user")}</p>
                <p className="owner" style={{ marginLeft: '62.3%' }}>Owner</p>

            </div>
            {shareList.map((e, index) =>
            (

                <div className="recepients">
                    <span>
                        <Avatar
                            style={{
                                color: "#FFFFFF",
                                backgroundColor: e.color,
                                marginLeft: '9px'
                                // marginTop: '5px'
                            }}
                            size="small"
                        >
                            {e.user.substring(0, 1).toUpperCase()}
                        </Avatar>
                    </span>
                    <p className="email-text">{e.user}</p>
                    <Select defaultValue={e.rights} style={{ width: 120, position: 'fixed', marginLeft: '43.8%' }} onSelect={(value) => { editUser(value, e) }}>
                        <Option key='1' value="Editor">Editor</Option>
                        <Option key='2' value="Viewer">Viewer</Option>
                    </Select>
                </div>

            )
            )

            }
            <div className="copy">
                <Input className="copy-input" value={copy} onChange={(e) => setCopy(e.target.value)} />
                <Button className="copy-button" onClick={() => onCopy()}>Copy</Button>
            </div>

        </Modal>
    )
}


