import React, { useState } from "react";
import { Modal, Button } from "antd";

const ModalComponent = ({
  children,
  isModalVisible,
  handleOk,
  handleCancel,
  footer,
  title,
}) => {
  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable
        footer={footer ? footer : null}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
