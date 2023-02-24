import { Button, Col, Form, Row } from 'antd';
import queryString from "query-string";
import React, { useEffect, useState } from 'react';
import ImageMapper from 'react-image-mapper';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import { MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import { bboxData, getPbrReviewerData, updateApprove } from '../../../../services/pbrService';
import EditableRow from './EditTable';
import './styles.scss';

var AREAS_MAP = {
	name: 'my-map',
	areas: [],
};
/* istanbul ignore next */
const PbrUpdate = () => {
	const dispatch = useDispatch();
	const [templateData, setTemplateData] = useState([]);
	const [editingRow, setEditingRow] = useState(null);
	const [imagepdf, setImagePdf] = useState("");
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
	const [areasMap, setAreasMap] = useState(AREAS_MAP);
	const [imageWidth, setImageWidth] = useState(0);
	const [imageHeight, setimageHeight] = useState(0);
	const [callBounding, setCallBounding] = useState(false);
	const [buttonDisable, setButtonDisable] = useState(false);
	const location = useLocation();
	const params = queryString.parse(location.search);
	let rowArray = ["id", "param_name", "anchor_key", "snippet_value", "snippet_image", "recorded_date", "recorded_time", "uom", "changed_by"]

	useEffect(() => {
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
		if (imageWidth !== 0 && imageHeight !== 0 && callBounding) {
			for (let i = 0; i < 2; i++) {
				setTimeout(() => {
					getBoundingBoxDataInfo(imageWidth, imageHeight, templateData);
				}, i * 1000)
			}
		}
	}, [imageWidth, imageHeight]);

	const getBoundingBoxDataInfo = async (width, height, templateData) => {
		try {
			// dispatch(showLoader());
			let meta1 = templateData?.filter(item => item.column == "key_bbox")[0]
			let meta2 = templateData?.filter(item => item.column == "value_bbox")[0]
			let _reqBatch = {
				feature: "EXTRACTED_PARAMETER",
				granularity: "Specific",
				template_id: params.temp_disp_id,
				version: Number(params.version),
				name: params.param_name,
				page: null,
				metadata: { key: meta1?.value, value: meta2?.value }
			};
			const batchRes = await bboxData(_reqBatch);
			let areasArr = [];
			let width1 = width ? width : 848
			let height1 = height ? height : 1097
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
				setAreasMap({ ...areasMap, areas: areasArr });
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
			date_range: null
		}
		let res = await getPbrReviewerData(req);
		let flag = res?.Data.filter(item=>item.column === 'status')
		console.log("flag",flag)
		setButtonDisable(flag[0]?.value === "approved" ? true : false)
		setButtonDisable(res?.Data[0].status === "approved" ? true : false)
		setTemplateData(res.Data);
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
			date_range: null
		}
		let res = await getPbrReviewerData(req);
		let flag = res?.Data.filter(item=>item.column === 'status')
		console.log("flag",flag)
		setButtonDisable(flag[0]?.value === "approved" ? true : false)
		// let arr = []
		// Object.entries(res.Data[0]).forEach(item => {
		//   arr.push({ column: item[0], value: item[1] })
		// })
		// arr = arr.filter(i => rowArray.includes(i.column))
		setTemplateData(res.Data);
		let filename = res.Data.filter(item => item.column == "file_path")
		let pageNum = res.Data.filter(item => item.column == "page_num")
		getImage(filename[0].value, pageNum[0].value);
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
		setCallBounding(true)
		// dispatch(hideLoader());
	};


	const getImage = async (val, page) => {
		// dispatch(showLoader());
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





	const handleClick = async (event, record) => {
		dispatch(showLoader());
		event.preventDefault();
		let resp = [...idarr];
		resp.push(params.id);
		setIdArr(resp);
		let numberArray = resp.map(Number)
		let formvalues = {
			id: numberArray,
			changed_by: localStorage.getItem('username'),
			recorded_date: textInput?.recorded_date ? textInput?.recorded_date : null,
			recorded_time: textInput?.recorded_time ? textInput?.recorded_time : null,
			snippet_value: textInput?.snippet_value ? textInput?.snippet_value : null,
			status: textInput?.status ? textInput?.status : null,
			uom: textInput?.uom ? textInput?.uom : null,
			table_value: null,
			esign_id: null
		};

		let res = await updateApprove(formvalues);
		if (res.Status == "202") {
			dispatch(hideLoader());
			dispatch(showNotification("success", "Updated Successfully"))
			setEditingRow(null)
			getTableData()

		} else {
			dispatch(hideLoader());
			dispatch(showNotification("erroe", "Error while updtating"))
		}

	};


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
									<div style={{ height: "calc(100vh - 190px)", overflowY: "scroll" }}>
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

									<Button id="editLogs" style={{
										borderRadius: "5px",
										textTransform: "none",
										background: "#ffffff",
										borderColor: "#303f9f",
										color: "#303f9f",
										marginRight: '15px',

									}}
										type='primary'>
										<a
											style={{ color: "#303f9f" }}
											onClick={() => {
												history.push(`/dashboard/audit_trail_report`);
											}}
										>
											View Auditlogs
										</a></Button>
									<Button id="save_button" style={{
										backgroundColor: '#303f9f',
										color: '#ffffff',
										borderColor: "#303f9f",
										borderRadius: "5px",

									}}
									disabled={buttonDisable}
										onClick={handleClick}

										type='primary'>Save Changes</Button>
								</div>
								<div style={{ height: "calc(100vh - 190px)", overflowY: "scroll", border: "0.5px solid blue" }}>
									{/* style={{height:"calc(100vh - 190px)"}} */}
									{/* <img src={imagepdf} width="100%" height="700px" /> */}
									{/* <iframe class="frame" src={imagepdf} width="600px" height="500px" ></iframe>   */}
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
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PbrUpdate