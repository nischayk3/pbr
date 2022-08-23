import React from "react";
import { Modal } from "antd";

const ModalComponent = ({
  children,
  isModalVisible,
  handleOk,
  handleCancel,
  footer,
  title,
  width,
  closable,
  centered,
}) => {
  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={closable}
        footer={footer ? footer : null}
        width={width}
        centered={centered ? centered : false}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
