import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import React, { useState } from "react";
import "./style.scss";

const LoadDataSet = ({ isVisibleDataset, onCancel }) => {
	console.log("isVisibleDataset", isVisibleDataset);
	const [fileList, setFileList] = useState([])

	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</div>
	);
	return (
		<Modal title="Load dataset - Upload"
			centered
			visible={isVisibleDataset}
			onCancel={onCancel}
			footer={false}
			width={600}
		>
			<div className="upload-file-wrapper">
				<Upload
					listType="picture-card"
					fileList={fileList}
					onChange={handleChange}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
				<p className="upload-heading">Click or drag file to this area to upload</p>
				<p className="upload-sub-heading">Upload the dataset from your local.</p>
			</div>

		</Modal>
	)
}

export default LoadDataSet;