
import { Button, Col, Form, Modal, Row, Table } from 'antd';
import queryString from "query-string";
import React, { useEffect, useRef, useState } from 'react';
import ImageMapper from 'react-image-mapper';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router";
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import { MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import { initialTableData } from '../../../../duck/actions/pbrAction';
import { bboxData, getPbrReviewerData, updateApprove } from '../../../../services/pbrService';
import EditableRow from './EditTable';
import './styles.scss';
import TableIdentifier from './tableIdentifier/tableIdentifier';

var AREAS_MAP = {
	name: 'my-map',
	areas: [],
};
/* istanbul ignore next */
const pbrTableUpdate = () => {
	const dispatch = useDispatch();
	const tabledata = useSelector((state) => state?.pbrReducer?.initialTableData)
	const [templateData, setTemplateData] = useState([]);
	const [editingRow, setEditingRow] = useState(null);
	const [imagepdf, setImagePdf] = useState("");
	const [triggerPreview, setTriggerPreview] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [tableLoading, setTableLoading] = useState(false);
	const [modalColumns, setModalColumns] = useState([]);
	const [modalData, setModalData] = useState([]);
	const [filepath, setFilepath] = useState("");
	const [pageNum, setPageNum] = useState(1);
	// const [initialTableData, setInitialTableData] = useState([]);
	const [areasMap, setAreasMap] = useState(AREAS_MAP);
	const [imageWidth, setImageWidth] = useState(0);
	const [imageHeight, setimageHeight] = useState(0);
	const history = useHistory();
	const [textInput, setTextInput] = useState({
		changed_by: "",
		id: "",
		recordedDate: "",
		recordedTime: "",
		snippetValue: "",
		status: "",
		uomnum: ""
	});
	const [form] = Form.useForm();
	const [idarr, setIdArr] = useState([]);
	let isRendered = useRef(false);
	const location = useLocation();
	const params = queryString.parse(location.search);
	let rowArray = ["id", "param_name", "anchor_key", "snippet_value", "snippet_image", "recorded_date", "recorded_time", "uom", "changed_by"]

	useEffect(() => {
		isRendered.current = true;
		loadTableData();
	}, []);

	useEffect(() => {
		// dispatch(showLoader());
		setTimeout(() => {
			const list = document.getElementsByTagName("canvas")[0]
			setImageWidth(list?.width)
			setimageHeight(list?.height)
			// dispatch(hideLoader());
		}, 3000)
	}, [document.getElementsByTagName("canvas")[0], imagepdf]);

	useEffect(() => {
		// dispatch(showLoader());
		if (imageWidth !== 0 && imageHeight !== 0) {
			for (let i = 0; i < 2; i++) {
				setTimeout(() => {
					getBoundingBoxDataInfo(imageWidth, imageHeight);
				}, i * 1000)
			}
		}
	}, [imageWidth, imageHeight]);

	const getBoundingBoxDataInfo = async (width, height) => {
		try {
			// dispatch(showLoader());
			let _reqBatch = {
				feature: "configured_Table",
				granularity: "Specific",
				template_id: params.temp_disp_id,
				version: Number(params.version),
				name: params.param_name,
				page: null,
				metadata: null
				// feature: "configured_Parameter",
				// granularity: "Specific",
				// template_id: "P627",
				// version: 1,
				// name: "param2",
				// page: null
			};
			const batchRes = await bboxData(_reqBatch);
			let areasArr = [];
			let width1 = width ? width : 615
			let height1 = height ? height : 795
			if (batchRes.Data.length > 0) {

				batchRes.Data.forEach((e) => {
					let x1 = e.key_left * width1;
					let x2 = (e.key_left + e.key_width) * width1;
					let y1 = e.key_top * height1;
					let y2 = (e.key_top + e.key_height) * height1;
					let obj = {
						snippetID: e.key_snippet_id,
						areaValue: e.key_text,
						shape: 'rect',
						coords: [x1, y1, x2, y2],
						preFillColor: 'transparent',
						fillColor: 'transparent',
						strokeColor: 'blue',
					};
					let valuex1 = e.value_left * width1;
					let valuex2 = (e.value_left + e.value_width) * width1;
					let valuey1 = e.value_top * height1;
					let valuey2 = (e.value_top + e.value_height) * height1;
					let obj1 = {
						snippetID: e.value_snippet_id,
						areaValue: e.value_text,
						shape: 'rect',
						coords: [valuex1, valuey1, valuex2, valuey2],
						preFillColor: 'transparent',
						fillColor: 'transparent',
						strokeColor: 'blue',
					};
					areasArr.push(obj);
					areasArr.push(obj1);
				});
				// if(areasMap.areas.length == 0){
				setAreasMap({ ...areasMap, areas: areasArr });
				// }

				dispatch(hideLoader());
			} else if (batchRes.status === 404) {
				setAreasMap();
				dispatch(hideLoader());
			} else {
				dispatch(hideLoader());
				dispatch(showNotification('error', `Unable to detect ${mode}`));
			}
		} catch (error) { /* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', 'No Data Found'));
		}
	};

	const getTableData = async () => {
		dispatch(showLoader());
		let req = {
			confidence: null,
			createdBy: null,
			id: Number(params.id),
			limit: null,
			status: null,
			template_id: [],
			date_range:null
		}
		let res = await getPbrReviewerData(req);
		let arr = res?.Data[0]?.table_value.map((item, index) => ({ ...item, key: index }))
		setTemplateData(arr);
		dispatch(hideLoader());
	}

	const loadTableData = async () => {
		dispatch(showLoader());
		let req = {
			confidence: null,
			createdBy: null,
			id: Number(params.id),
			limit: null,
			status: null,
			template_id: [],
			date_range:null
		}
		let res = await getPbrReviewerData(req);
		let arr = res?.Data[0]?.table_value.map((item, index) => ({ ...item, key: index }))
		setTemplateData(arr);
		// setInitialTableData(arr)
		dispatch(initialTableData(arr))
		let filename = res.Data[0].file_path;
		setFilepath(filename)
		setPageNum(res.Data[0].page_num)
		getImage(filename, res.Data[0].page_num);
		let obj = {
			changed_by: res.Data[0].changed_by == null ? "" : res.Data[0].changed_by,
			id: res.Data[0].id == null ? "" : res.Data[0].id,
			recorded_date: res.Data[0].recorded_date == null ? "" : res.Data[0].recorded_date,
			recorded_time: res.Data[0].recorded_time == null ? "" : res.Data[0].recorded_time,
			snippet_value: res.Data[0].snippet_value == null ? "" : res.Data[0].snippet_value,
			status: res.Data[0].status == null ? "" : res.Data[0].status,
			uom: res.Data[0].uom == null ? "" : res.Data[0].uom
		}
		setTextInput(obj)
		// dispatch(hideLoader());
	};


	const getImage = async (val, page) => {
		dispatch(showLoader());
		let login_response = JSON.parse(localStorage.getItem('login_details'));
		var requestOptions = {
			method: "GET",
			response: "image/jpeg",
			psId: "",
			redirect: "follow",
			headers: new Headers({
				"x-access-token": login_response?.token ? login_response?.token : '',
				"resource-name": 'PBR'
			})
		};
		let response = await fetch(
			MDH_APP_PYTHON_SERVICE + `/pbr/udh/get_file_page_image?filename=${val.split('_page-')[0]}.pdf&pageId=${page}`,
			requestOptions
		)
			.then((resp) => resp)
			.then((result) => result)
			.catch((error) => console.log("error", error));
		let res = await response.blob();
		setImagePdf(window.webkitURL.createObjectURL(res));
		// dispatch(hideLoader());
	}

	const handleCancel = () => {
		setIsModalVisible(false);
		setTriggerPreview(false)
		// setModalColumns(initialColumns)
	};
	const handleOk = () => {
		setIsModalVisible(false);
	};


	const handleClick = async (event, record) => {
		dispatch(showLoader());
		event.preventDefault();
		let req = {
			id: [Number(params.id)],
			changed_by: localStorage.getItem('username'),
			recorded_date: null,
			recorded_time: null,
			snippet_value: null,
			status: "approved",
			uom: null,
			table_value: templateData,
			esign_id:null
		};

		let res = await updateApprove(req);
		if (res.Status == "202") {
			dispatch(hideLoader());
			dispatch(showNotification("success", "Updated Successfully"))
			getTableData()
		} else {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Error while updtating"))
		}
	};

	const applyChanges = () => {
		setTemplateData(modalData)
		setIsModalVisible(false);
	}

	const handleRevert = async () => {
		dispatch(showLoader());
		let req = {
			confidence: null,
			createdBy: null,
			id: Number(params.id),
			limit: null,
			status: null,
			template_id: []
		}
		let res = await getPbrReviewerData(req);
		let arr = res?.Data[0]?.table_value.map((item, index) => ({ ...item, key: index }))
		setTemplateData(arr)
		dispatch(hideLoader());
	}

	return (
		<div className='pbr-container'>
			<BreadCrumbWrapper
				urlName={`/dashboard/pbr_update/${params.id}`}
				value={params.id}
				data={params.id}
			/>
			<div className='custom-wrapper'>
				<div className='content_section' >
					<div style={{ marginTop: 20, padding: 10 }}>

						<Row gutter={15}>
							<Col span={12}>
								<h3 style={{ marginBottom: "20px" }}>You may edit the selected unstructured data here.</h3>
								{templateData &&
									<div style={{ height: "calc(100vh - 190px)", overflowY: "scroll", border: "0.5px solid blue", marginTop: 26 }}>
										<EditableRow templateData={templateData} setTemplateData={setTemplateData} setTextInput={setTextInput} textInput={textInput} />
									</div>
								}
								{/* <Table
                  className='edit-table'
                  size='middle'
                  columns={columns}
                  showHeader={false}
                  dataSource={templateData}
                  pagination={false}
                  // scroll={{ x: 1200 }}
                  style={{ border: '1px solid #ececec', borderRadius: '2px',marginTop:26 }}
                /> */}
							</Col>
							<Col span={12}>
								<div className='' style={{ display: "flex", marginBottom: "20px", flexDirection: "row", justifyContent: "right", alignItems: "center" }}>
									<Button id="save_button"
										className='custom-primary-btn' style={{
											backgroundColor: '#303f9f',
											color: '#ffffff',
											borderColor: "#303f9f",
											borderRadius: "5px",
											marginRight: 10

										}}
										onClick={() => {
											setTriggerPreview(true)
											setIsModalVisible(true)
										}}

										type='primary'>Preview</Button>
									<Button id="save_button"
										className='custom-primary-btn' style={{
											backgroundColor: '#303f9f',
											color: '#ffffff',
											borderColor: "#303f9f",
											borderRadius: "5px",
											marginRight: 10

										}}
										onClick={() => handleRevert()}

										type='primary'>Revert</Button>
									<Button id="save_button" style={{
										backgroundColor: '#303f9f',
										color: '#ffffff',
										borderColor: "#303f9f",
										borderRadius: "5px",

									}}
										onClick={handleClick}

										type='primary'>Save Changes</Button>
								</div>
								<TableIdentifier triggerPreview={triggerPreview} filepath={filepath} pageNum={pageNum} setModalData={setModalData} setModalColumns={setModalColumns} />
								<div style={{ height: "calc(100vh - 190px)", overflowY: "scroll", border: "0.5px solid blue" }}>
									{/* style={{height:"calc(100vh - 190px)"}} */}
									{/* <img src={imagepdf} width="100%" height="700px" /> */}
									{/* <ImageMapper
                                        id='imageMApper'
                                        className='pdfToImageWrapper'
                                        src={imagepdf}
                                        width={600}
                                        height={700}
                                        // map={areasMap}
                                        // onLoad={() => load()}
                                        // onClick={area => clicked(area)}
                                    /> */}
									<div id='drawRectangle'>
										<div className='pdfToImgBlock'>

											<ImageMapper
												id='imageMApper'
												className='pdfToImageWrapper'
												src={imagepdf}
												map={areasMap}
											// onLoad={() => load()}
											// onClick={area => clicked(area)}
											/>

										</div>
									</div>
									{/* <iframe class="frame" src={imagepdf} width="600px" height="500px" ></iframe>   */}
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
			<Modal
				title='Preview'
				visible={isModalVisible}
				// style={{height:300,overflowY:"scroll"}}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={() => applyChanges()}>
						Apply Changes
					</Button>,
				]}
			>
				<Table
					loading={tableLoading}
					className='pbrTemplates-table'
					columns={modalColumns}
					dataSource={modalData}
					pagination={false}
					scroll={{ x: 1000, y: 300 }}
				/>
			</Modal>
		</div>
	)
}

export default pbrTableUpdate