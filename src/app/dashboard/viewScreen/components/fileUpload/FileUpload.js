// Ranjith K
// Mareana Software
// Version 1
// Last modified - 08 March, 2022
import {
	DeleteOutlined,
	DownloadOutlined,
	InboxOutlined,
	PlusSquareOutlined,
	UploadOutlined
} from "@ant-design/icons";
import {
	Button,
	Collapse,
	Modal,
	Popconfirm,
	Table,
	Tag,
	Tooltip,
	Upload
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 as uuid } from "uuid";
import { MDH_APP_PYTHON_SERVICE } from "../../../../../constants/apiBaseUrl";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../duck/actions/commonActions";
import { deleteAdHocFile } from "../../../../../duck/actions/fileUploadAction";
import {
	batchCoverage,
	sendSelectedParamData,
	sendTotalFileBatches
} from "../../../../../duck/actions/viewAction";
import {
	adHocFilesParameterTree, adHocFileUpload
} from "../../../../../services/viewCreationPublishing";
import "./styles.scss";

const { Panel } = Collapse;
const { Dragger } = Upload;
function FileUpload({ count, setCount, selectedFiles, setSelectedFiles, viewSummaryTable, setNewBatchData, setFunctionEditorViewState, filesListTree, setFilesListTree, setViewSummaryBatch, viewJson, fromWorkflowScreen }) {
	const [uploadModalVisible, setUploadModalVisible] = useState(false);
	const [uploadBtnDisabled, setUploadBtnDisabled] = useState(true);
	const [selectedAdHocFileList, setSelectedAdHocFileList] = useState([]);
	const [selectedFileId, setSelectedFileId] = useState("");
	const [fileBatch, setFileBatch] = useState([]);

	const selectedTableData = useSelector(
		(state) => state.viewCreationReducer.selectedParamData
	);
	const finalData = useRef([]);
	const isLoadView = useSelector((state) => state.viewCreationReducer.isLoad);
	const totalBatch = useSelector((state) => state.viewCreationReducer.totalMolBatches);

	const dispatch = useDispatch();
	const columns = [
		{
			title: "Parameter",
			key: "param",
			dataIndex: "param",
			render: (param) => (
				<Tooltip title={param}>
					<Tag color="geekblue" className="parameter-tag">
						{param}
					</Tag>
				</Tooltip>
			)
		},
		{
			title: "Batch",
			key: "coverage_metric_percent",
			dataIndex: "coverage_metric_percent"
		},
		{
			title: "Coverage",
			key: "coverage_metric",
			dataIndex: "coverage_metric"
		},
		{
			title: "",
			key: "add",
			dataIndex: "add",
			render: (text, record, index) => (
				<>
					<span
						className="material-addIcon"
						onClick={() => {
							parameterPassHandler(record, index);
						}}
					>
						{!fromWorkflowScreen ? <PlusSquareOutlined /> : <> </>}
					</span>
				</>
			)
		}
	];

	useEffect(() => {
		if (isLoadView) {
			const loadFile = [...viewJson]
			const fileId = loadFile[0].files
			dispatch(showLoader());

			if (Object.keys(fileId).length > 0) {
				Object.entries(fileId).forEach(([key, value]) => {
					adHocFilesParameterTree({
						file_id: parseInt(key),
						detailedCoverage: value
					}).then((res) => {
						if (res.Status === 200) {
							dispatch(hideLoader());
							const totalFileBatch = []
							const date = new Date();
							res.timeStamp = date.toISOString();
							filesListTree.push(res);
							setFilesListTree(filesListTree);
							setSelectedFileId(JSON.parse(JSON.stringify(res.File_id)))
							res.Data.forEach((ele) => {
								ele.coverage_list.forEach((item) => {
									totalFileBatch.push(item)
								})
							})
							const filteredBatch = totalFileBatch.filter(function (item, pos) {
								return totalFileBatch.indexOf(item) == pos;
							});

							const mapBatch = filteredBatch.map((ele) => {
								return { batch: ele }
							})
							setFileBatch(mapBatch)
							dispatch(sendTotalFileBatches(mapBatch))

						}
						/* istanbul ignore next  */
						if (res.Status === 404) {
							dispatch(hideLoader());
							dispatch(showNotification("error", "Unable to Load Files"));
						}

					})
				})
			}
		}
	}, [isLoadView]);

	const parameterPassHandler = (record) => {
		const selectedParam = finalData.current.find(
			(item) => String(item.parameter_name) === String(record.param)
		);
		if (selectedParam === undefined) {
			let rowData = {};
			let batchData = {};
			let newBatchData = [];
			const molBatch = [...totalBatch, ...fileBatch];
			setViewSummaryBatch(molBatch)
			molBatch.map((el) => {
				if (record.coverage_list.includes(el.batch)) {
					return (
						batchData[el.batch] = true,
						newBatchData[el.batch] = true
					)
				} else {
					return (
						batchData[el.batch] = false,
						newBatchData[el.batch] = false
					)
				}
			});
			batchData["id"] = count;
			setCount(count + 1);
			//check for duplicate records
			const indexDuplicate = viewSummaryTable.findIndex(
				(x) => x.param == record.param
			);
			if (indexDuplicate === -1) {

				rowData = Object.assign(batchData);
				rowData.sourceType = "file";
				rowData.parameter_name = record.param;
				rowData.coverage =
					`${record.coverage_metric_percent}` + `(${record.coverage_metric})`;
				// rowData.key = `${record.product_num}-${record.param}`;
				rowData.key = uuid();
				rowData.primary = 0;
				rowData.aggregation = "";
				rowData.material_id = selectedFileId;
				rowData.process_id = null;

				let data = { ...rowData };
				if (selectedTableData && selectedTableData.length !== 0) {
					selectedTableData.forEach((ele) => {
						const tempObj = finalData.current.find(
							(item) => item.key === ele.key
						);
						if (tempObj === undefined) {
							finalData.current.push(ele);
						}
					});
				}
				finalData.current.push(data);
				setNewBatchData(newBatchData);
				setFunctionEditorViewState(true);
				dispatch(batchCoverage(newBatchData));
				dispatch(sendSelectedParamData(finalData.current));
			} else {
				dispatch(showNotification("error", "Function already exists"));
			}
		} else {
			dispatch(showNotification("error", "Parameter already exists"));
		}
	};

	const genExtra = (File_id) => (
		<div
			className="fileUpload-panelHeader"
			onClick={(event) => {
				event.stopPropagation();
			}}
		>
			<span className="fileUpload-download">
				<a
					href={
						`${MDH_APP_PYTHON_SERVICE}/services/v1/download_file?file_id=` +
						`${File_id}`
					}
				>
					<DownloadOutlined />
				</a>
			</span>
			<span className="fileUpload-delete">
				<Popconfirm
					placement="right"
					title={
						<div className="fileUpload-deletePopover">
							<h4>Are you sure to delete this file?</h4>
							<p>This action is not reversible</p>
						</div>
					}
					onConfirm={() => confirm(File_id)}
					okText="Yes"
					cancelText="No"
					disabled={fromWorkflowScreen}
				>
					<DeleteOutlined />
				</Popconfirm>
			</span>
		</div>
	);

	function confirm(File_id) {
		let req = {
			fileid: parseInt(File_id),
			userid: localStorage.getItem("username")
		};
		deleteAdHocFile(req).then((res) => {
			/* istanbul ignore else  */
			if (res.data?.statuscode === 202) {
				dispatch(
					showNotification("success", "adhoc-file deleted successfully")
				);
				const updatedFileList = filesListTree.filter(
					(item) => item.File_id !== File_id
				);
				setFilesListTree(updatedFileList);
			}
			/* istanbul ignore next  */
			if (res.data?.statuscode === 400) {
				dispatch(showNotification("error", res.data.message));
			}

			/* istanbul ignore next  */
			if (res.data?.statuscode === 403) {
				dispatch(showNotification("error", 'You are not authorized', "It seems like you don't have permission to use this service."));
			}
			/* istanbul ignore next  */
			if (res.data?.statuscode === 404) {
				dispatch(showNotification("error", res.data.message));
			}
		});
	}

	const handleCancelUpload = () => {
		setUploadModalVisible(false);
	};

	const onClickUpload = () => {
		setUploadModalVisible(true);
	};

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};

	const adHocFileUploadprops = {
		multiple: false,
		progress: {
			strokeColor: {
				"0%": "#52C41A",
				"100%": "#52C41A"
			},
			strokeWidth: 8,
			showInfo: true,
			format: (percent) => `${parseFloat(percent.toFixed(2))}%`
		}
	};

	const onChange = (info) => {
		var today = new Date();
		today.setDate(today.getDate());
		const nextState = {};
		dispatch(showLoader());
		if (info.file.status === "uploading") {
			setSelectedAdHocFileList([info.file]);
			nextState.selectedAdHocFileList = [info.file];
		} else if (info.file.status === "done") {
			setSelectedAdHocFileList([info.file]);
			nextState.selectedAdHocFileList = [info.file];
			var formData = new FormData();
			formData.append("created_on", today.toISOString().slice(0, 10));
			formData.append("file_name", info.file.originFileObj);
			formData.append("upload_reason", "test_reason");
			formData.append("username", localStorage.getItem("username"));
			adHocFileUpload(formData).then((res) => {
				dispatch(hideLoader());
				/* istanbul ignore else  */
				if (res.Status === 202) {
					dispatch(showNotification("success", res.Message));
					setUploadBtnDisabled(false);
					setSelectedFileId(res.File_id);
					selectedFiles[`${res.File_id}`] = true;
					setSelectedFiles(selectedFiles);
				}
				/* istanbul ignore next  */
				if (res.Status === 400) {
					dispatch(showNotification("error", res.Message));
					setUploadBtnDisabled(true);
				}
				/* istanbul ignore next  */
				if (res.Status === 403) {
					setUploadBtnDisabled(true);
				}
			});
		} else if (info.file.status === "removed") {
			dispatch(hideLoader());
			setSelectedAdHocFileList([]);
			setUploadBtnDisabled(true);
		}
	};

	const handleSubmitUpload = () => {
		setSelectedAdHocFileList([]);
		setUploadModalVisible(false);
		setUploadBtnDisabled(true);

		let req = { file_id: selectedFileId, detailedCoverage: true };
		adHocFilesParameterTree(req).then((res) => {
			/* istanbul ignore next  */
			if (res.Status === 200) {
				const totalFileBatchStore = []
				const date = new Date();
				res.timeStamp = date.toISOString();
				setFilesListTree([...filesListTree, res]);

				setSelectedFileId(JSON.parse(JSON.stringify(res.File_id)))
				res.Data.forEach((ele) => {
					ele.coverage_list.forEach((item) => {
						totalFileBatchStore.push(item)
					})
				})
				const filtereBatch = totalFileBatchStore.filter(function (item, pos) {
					return totalFileBatchStore.indexOf(item) == pos;
				});

				const mapBatchFilter = filtereBatch.map((ele) => {
					return { batch: ele }
				})
				setFileBatch(mapBatchFilter)
				dispatch(sendTotalFileBatches(mapBatchFilter))
			}
			/* istanbul ignore next  */
			if (res.Status === 404) {
				dispatch(showNotification("error", res.Message));
			}

		});
	};


	return (
		<div className="materials-wrapper fileUpload-wrapper">
			<div className="materials-uploadDownloadFiles">
				<div className="materials-uploadFiles">
					<Button disabled={fromWorkflowScreen} icon={<UploadOutlined />} onClick={onClickUpload}>
						Upload
					</Button>
				</div>
				<div className="materials-downloadFiles">
					<Button type="text" className="viewCreation-downloadBtn" disabled={fromWorkflowScreen}>
						<a
							id="download-temp"
							href={require("../../../../../assets/xlsx/template_view_file_upload.xlsx")}
							download="template_view_file_upload.xlsx"
						>
							<DownloadOutlined /> Download Template
						</a>
					</Button>
				</div>
			</div>

			<Collapse
				accordion
				className="materials-accordion fileUpload-accordion"
				expandIconPosition="right"
			>
				{filesListTree &&
					filesListTree.map((item, index) => {
						item.Data.forEach((ele) => {
							ele.file_id = item.File_id;
						});
						return (
							<Panel
								className="materials-panel fileUpload-panel"
								header={
									<span className="panelHeader_span">
										{item.File_name.substr(0, item.File_name.lastIndexOf("."))}
									</span>
								}
								extra={genExtra(item.File_id)}
								key={index}
							>
								<Table
									className="viewSummary-table fileList-table borderless-table"
									pagination={false}
									columns={columns}
									dataSource={item.Data}

								/>
							</Panel>
						);
					})}
			</Collapse>

			<Modal
				className="fileUploadModal"
				title="File Upload"
				maskClosable={false}
				visible={uploadModalVisible}
				onCancel={handleCancelUpload}
				footer={[
					<Button key="cancel" onClick={handleCancelUpload}>
						Cancel
					</Button>,
					<Button
						id="upload-file"
						key="submit"
						type="primary"
						onClick={handleSubmitUpload}
						disabled={uploadBtnDisabled}
					>
						Upload
					</Button>
				]}
			>
				<div className="fileUploadModal-draggerContainer">
					<Dragger
						{...adHocFileUploadprops}
						fileList={selectedAdHocFileList}
						customRequest={dummyRequest}
						onChange={onChange}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag file to this area to upload
						</p>
						<p className="ant-upload-hint">
							Support for a single upload. Strictly prohibit from uploading
							company data or other band files
						</p>
					</Dragger>
				</div>
			</Modal>
		</div>
	);
}

export default FileUpload;
