import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const ModalComponent = ({ children, isModalVisible, handleOk, handleCancel }) => {
    return (
        <>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {children}
            </Modal>
        </>
    );
};

export default ModalComponent;