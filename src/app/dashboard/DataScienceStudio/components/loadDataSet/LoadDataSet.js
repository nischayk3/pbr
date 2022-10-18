import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader, showNotification } from "../../../../../duck/actions/commonActions";
import { dssFileUpload } from "../../../../../services/dataScienceStudioService";
import "./style.scss";

const LoadDataSet = ({ isVisibleDataset, onCancel }) => {
	const [fileList, setFileList] = useState([]);
	const [uploadFile, setUploadFile] = useState([]);

	const dispatch = useDispatch();

	const handleChange = (info) => {
		console.log("loggggggggg", info);
		var formData = new FormData();
		formData.append('file', info.file.originFileObj);
		formData.append('type', 'parameter');
		// setFileList(info.file.originFileObj)
		setUploadFile(formData);
	};

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

	const fileUpload = async () => {
		const _reqFile = uploadFile
		try {
			dispatch(showLoader());
			const dssFileRes = await dssFileUpload(_reqFile);
			dispatch(hideLoader());
			if (dssFileRes.data.statuscode === 200) {
				dispatch(showNotification('success', "File Upload Successfully"));
			} else {
				dispatch(showNotification("error", "File Upload error"));
			}

		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification("error", err));
		}
	}

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
					listType="picture"
					fileList={fileList}
					onChange={handleChange}
					maxCount={1}
				>
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>

				<p className="upload-heading">Click or drag file to this area to upload</p>
				<p className="upload-sub-heading">Upload the dataset from your local.</p>
			</div>
			<Row className="button-mt">

				<Button
					type='primary'
					className='custom-secondary-btn'
					onClick={fileUpload}
				>
					Next
				</Button>
				<Button
					className="custom-primary-btn"
					onClick={onCancel}

				>
					Back
				</Button>
			</Row>

		</Modal>
	)
}

export default LoadDataSet;