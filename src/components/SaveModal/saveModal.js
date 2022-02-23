import React, { useState } from 'react';
import { Modal } from 'antd';
import { CheckCircleTwoTone } from '@ant-design/icons';


function SaveModal(props) {

    const {isSave,setIsSave} = props

    const handleCancel = () => {
        setIsSave(false);
    };

    return (
        <div>
            <Modal
                visible={isSave}
                title="Saved"
                width={500}
                mask={true}
                onCancel={handleCancel}
                centered={true}
                footer={null}
            >
                <div>
                    <center>
                        <CheckCircleTwoTone
                            className='circleIcon'
                            twoToneColor='Green'
                        />
                        <br />
                        <p> Your Changes Have Been Successfully Saved </p>
                    </center>
                </div>

            </Modal>
        </div>
    );
}

export default  SaveModal;