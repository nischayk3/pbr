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
	closable
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
			>
				{children}
			</Modal>
		</>
	);
};

export default ModalComponent;
