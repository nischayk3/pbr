import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Row, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from "react-router-dom";
import { hideLoader, showLoader, showNotification } from "../../../../../duck/actions/commonActions";
import { loadViewTableData, sendFileUploadRes, sendViewsetRes } from "../../../../../duck/actions/dataScienceAction";
import { dssFileUpload, loadDssView } from "../../../../../services/dataScienceStudioService";
import "./style.scss";

const LoadDataSet = ({ isVisibleDataset, onCancel }) => {
	const [fileList, setFileList] = useState([]);
	const [uploadFileRes, setUploadFileRes] = useState([]);
	const [isDisable, setIsDisable] = useState(true);

	const dispatch = useDispatch();
	const match = useRouteMatch();
	const history = useHistory();

	const handleChange = (info) => {
		var formData = new FormData();
		formData.append('file', info.file.originFileObj);
		formData.append('type', 'parameter');
		fileUpload(formData)
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

	const fileUpload = async (_files) => {
		const _reqFile = _files
		try {
			dispatch(showLoader());
			const dssFileRes = await dssFileUpload(_reqFile);
			dispatch(hideLoader());
			if (dssFileRes.data.statuscode === 200) {
				setUploadFileRes(dssFileRes.data.message);
				dispatch(sendFileUploadRes(dssFileRes.data.message))
				dispatch(sendViewsetRes({}))
				setIsDisable(false);
				dispatch(showNotification('success', "File Upload Successfully"));
			} else if (dssFileRes.data.statuscode === 400) {
				dispatch(showNotification("error", dssFileRes.data.message));
			} else {
				dispatch(showNotification("error", "File Upload error"));
			}
		} catch (err) {
			dispatch(hideLoader());
			dispatch(showNotification("error", err));
		}
	}

	//load dss view
	const dssViewLoad = async () => {
		const _reqLoad = {
			data: {},
			df: uploadFileRes,
			parameter_name: '',
			type: 'parameter',
			unapproved: true,
			view_disp_id: "",
			view_version: ""
		}
		try {
			dispatch(showLoader());
			const loadDssRes = await loadDssView(_reqLoad);
			dispatch(hideLoader());
			if (loadDssRes.statuscode === 200) {
				dispatch(loadViewTableData(loadDssRes.message))
				history.push({
					pathname: `${match.url}/target_variable`,
				});
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
					onClick={dssViewLoad}
					disabled={isDisable}
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