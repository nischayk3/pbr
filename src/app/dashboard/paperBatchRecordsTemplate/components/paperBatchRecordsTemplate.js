/**
 * @author Ranjith <ranjith.k@mareana.com>
 * @Mareana - BMS PBR
 * @version 1
 * @Last Modified - 05 May, 2022
 * @Last Changed By - @ranjith
 */

import {
	Button, Col,
	Collapse, Form,
	Input, message, Modal, notification, Row,
	Select, Table, Tooltip
} from 'antd';
import React, { useEffect, useState } from 'react';
import ImageMapper from 'react-image-mapper';
import { useLocation, useParams, useHistory, useRouteMatch } from 'react-router-dom';

import {
	DeleteOutlined, ArrowRightOutlined, LeftOutlined, MinusSquareTwoTone, MonitorOutlined, PlusSquareTwoTone, RightOutlined, InfoCircleOutlined, UndoOutlined,EditOutlined
} from '@ant-design/icons';

import Sider from 'antd/lib/layout/Sider';
import debounce from "lodash/debounce";
import QueryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import panelLeftImg from '../../../../assets/images/panel-leftIcon.svg';
import panelRightImg from '../../../../assets/images/panel-rightIcon.svg';
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import Signature from "../../../../components/ElectronicSignature/signature";
import { MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';
import {
	hideLoader,
	showLoader,
	showNotification
} from '../../../../duck/actions/commonActions';
import { loadTemplateInfo } from '../../../../duck/actions/pbrAction';
import {
	findParameter, getBoundingBoxData, getPbrTemplateData, savePbrTemplate, timeZone, workflowTemplateReject, getFileList
} from '../../../../services/pbrService';
import ChangeCoordiantes from '../components/rightSidePanel/changeCoordiantes';
import ParameterList from '../components/rightSidePanel/parameterList';
import DynamicTableForm from './dynamicTableForm';
import PageIdentifierForm from './pageIdentifierForm';
import RejectModal from './rejectModal';
import './styles.scss';
import TableIdentifier from './tableIdentifier/tableIdentifier';
import WorkflowPreviewModal from './workflowPreviewModal';
import AdvanceSetting from "./advanceSetting/advanceSetting"
import RelativeDirection from './relativeDirection'
import SelectionMethodInput from './selectionMethod'
const { Panel } = Collapse;
const { Option } = Select;

/* istanbul ignore next */
const PaperBatchRecordsTemplate = () => {

	var AREAS_MAP = {
		name: 'my-map',
		areas: [],
	};

	const initialColumns = [
		{
			title: 'File Name',
			dataIndex: 'file_path',
			key: 'name',
			render: (text) => text?.split('.')[0]
		},
		{
			title: 'Key',
			dataIndex: 'anchor_key',
			key: 'anchor_key',
		},
		{
			title: 'Value',
			dataIndex: 'snippet_value',
			key: 'snippet_value',
		},
		{
			title: 'Product',
			dataIndex: 'product_num',
			key: 'product_num',
		},
		{
			title: 'Batch',
			dataIndex: 'batch_num',
			key: 'batch_num',
		},
		{
			title: 'Site',
			dataIndex: 'site_code',
			key: 'site_code',
		},
		{
			title: 'UOM',
			dataIndex: 'uom',
			key: 'uom',
		},
		{
			title: 'Confidence',
			dataIndex: 'confidence',
			key: 'confidence',
		},
		{
			title: 'Date',
			dataIndex: 'recorded_date',
			key: 'recorded_date',
		},
		{
			title: 'Time',
			dataIndex: 'recorded_time',
			key: 'recorded_time',
		},
	];

	const modesValues = [
		{ label: "Word", value: "word" },
		{ label: "Line", value: "line" },
		{ label: "Key-Value", value: "key_value" },
		{ label: "Selection Element", value: "selection_element" },
		{ label: "Cell", value: "cell" },
		{ label: "Parameters", value: "parameters" }
	]
	let history = useHistory();
	const match = useRouteMatch();
	const location = useLocation()
	const { id } = useParams()
	const dispatch = useDispatch();
	let params = QueryString.parse(location.search)

	const mat_batch = useSelector((state) => state?.pbrReducer?.matBatchInfo)
	const esignPublishRes = useSelector((state) => state.commonReducer.publishRes)

	const [templateForm] = Form.useForm();
	const [parameterForm] = Form.useForm();
	const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
	const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
	const [paramaterAdded, setParamaterAdded] = useState(false);
	const [clickedSnippetId, setClickedSnippetId] = useState('');
	const [snippetNumber, setSnippetNumber] = useState(0);
	const [showInputAnchor, setShowInputAnchor] = useState(false);
	const [areasMap, setAreasMap] = useState(AREAS_MAP);
	const [callAdd, setCallAdd] = useState(false);
	const [displayImage, setDisplayImage] = useState("");
	const [areasMapObject, setAreasMapObject] = useState({
		snippetID: '',
		areaValue: '',
		shape: 'rect',
		coords: [],
		preFillColor: 'transparent',
		fillColor: 'transparent',
		strokeColor: '',
	});
	const [boundingObject, setBoundingObject] = useState({
		name: 'my-map',
		areas: [],
	});
	const [parameterValue, setParameterValue] = useState({
		param1: {
			anchorValue: '',
			anchorId: '',
			unitAnchor: '',
			unitId: '',
			timeAnchor: '',
			timeId: '',
			dateAnchor: '',
			dateId: '',
		},
	});
	const [activeNumber, setActiveNumber] = useState(0);
	const [activeKey, setActiveKey] = useState(0);
	const [areasMapFilteredArr, setAreasMapFilteredArr] = useState([]);
	const [open, setOpen] = useState(["1"]);
	const [formValues, setFormValues] = useState([]);
	const [selectionActive, setSelectionActive] = useState(false);
	const [selectionDraggedValue, setSelectionDraggedValue] = useState('');
	const [DraggerActiveMultiple, setDraggerActiveMultiple] = useState({
		value: false,
		valueSnippet: false,
		unit: false,
		unitSnippet: false,
		time: false,
		timeSnippet: false,
		date: false,
		dateSnippet: false,
	});
	const [fileList, setFileList] = useState([]);
	const [modalData, setModalData] = useState([]);
	const [imageWidth, setImageWidth] = useState(0);
	const [imageHeight, setimageHeight] = useState(0);
	const [pageLimit, setPageLimit] = useState(1);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [tableLoading, setTableLoading] = useState(false);
	const [searchedFileList, setSearchedFileList] = useState("");
	const [selectedMode, setSelectedMode] = useState("word");
	const [formLoadParameter, setFormLoadParameter] = useState({});
	// const [pageIdentifierData, setPageIdentifierData] = useState({});
	const [parameterFormData, setParameterFormData] = useState([]);
	const [isPublish, setIsPublish] = useState(false);
	const [approveReject, setApproveReject] = useState("");
	const [publishResponse, setPublishResponse] = useState({});
	const [templateId, setTemplateId] = useState("New");
	const [templateVersion, setTemplateVersion] = useState("");
	const [templateStatus, setTemplateStatus] = useState("DRFT");
	const [pageNumber, setPageNumber] = useState(1);
	const [originalResponse, setOriginalResponse] = useState({});
	const [templateInfo, setTemplateInfo] = useState([]);
	const [matBatch, setMatBatch] = useState(mat_batch);
	const [additionalData, setAdditionalData] = useState({});
	const [templateFormData, setTemplateFormData] = useState({})
	const [showRowColIdentifier, setShowRowColIdentifier] = useState(false)
	const [clickedTable, setClickedTable] = useState({})
	const [triggerPreview, setTriggerPreview] = useState(false);
	const [tableActiveKey, setTableActiveKey] = useState(0);
	const [formTableData, setFormTableData] = useState([]);
	const [modalColumns, setModalColumns] = useState(initialColumns);
	const [sideTableData, setSideTableData] = useState({
		colPanelValue: [],
		rowPanelValue: [],
		selectedColValues: [],
		selectedRowValues: [],
		selectedRowRows: []
	});
	const [triggerUpdate, setTriggerUpdate] = useState(false);
	const [initialSideTableData, setInitialSideTableData] = useState({});
	const [initialPageIdentifierData, setInitialPageIdentifierData] = useState({ users: [] });
	const [mainPanelValue, setMainPanelValue] = useState("")
	const [pageDragValue, setPageDragValue] = useState({})
	const [pageIdFormValues, setPageIdFormValues] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [workflowPreviewModal, setWorkflowPreviewModal] = useState(false);
	const [showUOM, setShowUOM] = useState(false);
	const [showTime, setShowTime] = useState(false);
	const [showDate, setShowDate] = useState(false);
	const [pageIdDropdownValues, setPageIdDropdownValues] = useState([])
	const [fileTimezoneData, setFileTimezoneData] = useState('')
	const [advancePopup, setAdvancePopup] = useState(false)
	const [changeFile, setChangeFile] = useState(false)
	const [changeFileOptions, setChangeFileOptions] = useState([])
	const [changeFileValue, setChangeFileValue] = useState('')
	const [saveAsModal, setSaveAsModal] = useState(false)
	const [originalFile, setOriginalFile] = useState(params?.file)
	const [saveAsName, setSaveAsName] = useState('')
	const [saveAsFlag, setSaveAsFlag] = useState(true)
	const toggleLeftCollapsed = () => {
		setLeftPanelCollapsed(!leftPanelCollapsed);
		setRightPanelCollapsed(!rightPanelCollapsed);
	};

	const toggleRightCollapsed = () => {
		setRightPanelCollapsed(!rightPanelCollapsed);
		setLeftPanelCollapsed(!leftPanelCollapsed);
	};
	/* istanbul ignore next */
	useEffect(() => {
		if (pageIdFormValues) {
			let arr = []
			pageIdFormValues.forEach(item => {
				if (item != undefined) {
					let obj = { lable: item?.name, value: item?.name }
					arr.push(obj)
				}

			})
			setPageIdDropdownValues(arr)
		}

	}, [pageIdFormValues])

	useEffect(() => {
		if (esignPublishRes?.status_code === 200) {
			setPublishResponse(res);
			setTemplateStatus(esignPublishRes.rep_stauts);
		}
	}, [esignPublishRes]);

	const parameterAddingHandler = (a) => {
		setFileList([])
		if (activeNumber !== 0) {
			setCallAdd(false)
			let param = { anchorValue: '', anchorId: '' };
			let obj = { ...parameterValue };
			obj[`param${activeNumber + 1}`] = param;
			setParameterValue(obj);
			setActiveNumber(activeNumber + 1);
			setActiveKey(activeKey + 1)
			// if (activeKey == NaN || activeKey == undefined) {
			//     setActiveKey(activeNumber)
			// } else {
			//     setActiveKey(activeKey + 1)
			// }

		} else {
			let openKey = parseInt(open) + 1
			setParamaterAdded(true);
			setOpen([`${openKey}`]);
			let param = { anchorValue: '', anchorId: '' };
			setParameterValue({ ...parameterValue, param1: param });
			setActiveNumber(activeNumber + 1);
			// setActiveKey(activeKey +1)
		}
	};

	const DraggerInputHandlerAnchor = (e, val) => {
		e.stopPropagation();
		let obj = {
			value: false,
			valueSnippet: false,
			unit: false,
			unitSnippet: false,
			time: false,
			timeSnippet: false,
			date: false,
			dateSnippet: false,
		}

		if (val === "value") {
			obj.value = true
			setDraggerActiveMultiple(obj)
		} else if (val === "unit") {
			obj.unit = true
			setDraggerActiveMultiple(obj)
		} else if (val === "time") {
			obj.time = true
			setDraggerActiveMultiple(obj)
		} else if (val === "date") {
			obj.date = true
			setDraggerActiveMultiple(obj)
		}
	};
	/* istanbul ignore next */
	const DraggerInputHandlerSnippet = (e, val) => {
		e.stopPropagation();
		let obj = {
			value: false,
			valueSnippet: false,
			unit: false,
			unitSnippet: false,
			time: false,
			timeSnippet: false,
			date: false,
			dateSnippet: false,
		}

		if (val === "value") {
			obj.valueSnippet = true
			setDraggerActiveMultiple(obj)
		} else if (val === "unit") {
			obj.unitSnippet = true
			setDraggerActiveMultiple(obj)
		} else if (val === "time") {
			obj.timeSnippet = true
			setDraggerActiveMultiple(obj)
		} else if (val === "date") {
			obj.dateSnippet = true
			setDraggerActiveMultiple(obj)
		}
	};
	/* istanbul ignore next */
	// const onClickImage = (e) => {
	// 	var rect = e.target.getBoundingClientRect();
	// 	var x = e.clientX - rect.left;
	// 	var y = e.clientY - rect.top;
	// };
	/* istanbul ignore next */
	const onChangeChart = (e, field, key, value) => {
		let arr = [...formValues]

		let obj = {
			snippetID: '',
			areaValue: '',
			shape: 'rect',
			coords: [0, 0, 0, 0],
			preFillColor: 'transparent',
			fillColor: 'transparent',
			strokeColor: '',
		};

		if (field === 'anchorValue') {
			// setDraggerFirstAreaValue(e.target.value);
			arr[key] = { ...arr[key], values: { ...arr[key]?.values, anchorValue: e.target.value } }
			setFormValues(arr)
			let obj1 = { ...parameterValue };
			obj1[`param${key + 1}`] = {
				...obj1[`param${key + 1}`],
				anchorValue: e.target.value,
			};
			setParameterValue(obj1);
		} else if (field === 'snippetValue') {
			//setDraggerLastAreaValue(e.target.value);
			arr[key] = { ...arr[key], values: { ...arr[key]?.values, anchorId: e.target.value } }
			setFormValues(arr)
			let obj2 = { ...parameterValue };
			obj2[`param${key + 1}`] = {
				...obj2[`param${key + 1}`],
				anchorId: e.target.value,
			};
			setParameterValue(obj2);
		} else if (field === 'uomanchorValue') {
			//setDraggerLastAreaValue(e.target.value);
			arr[key] = { ...arr[key], unitValues: { ...arr[key]?.unitValues, unitAnchor: e.target.value } }
			setFormValues(arr)
			let obj2 = { ...parameterValue };
			obj2[`param${key + 1}`] = {
				...obj2[`param${key + 1}`],
				unitAnchor: e.target.value,
			};
			setParameterValue(obj2);
		} else if (field === 'uomsnippetValue') {
			//setDraggerLastAreaValue(e.target.value);
			arr[key] = { ...arr[key], unitValues: { ...arr[key]?.unitValues, unitId: e.target.value } }
			setFormValues(arr)
			let obj2 = { ...parameterValue };
			obj2[`param${key + 1}`] = {
				...obj2[`param${key + 1}`],
				unitId: e.target.value,
			};
			setParameterValue(obj2);
		} else if (field === 'timeanchorValue') {
			//setDraggerLastAreaValue(e.target.value);
			arr[key] = { ...arr[key], timeValues: { ...arr[key]?.timeValues, timeAnchor: e.target.value } }
			setFormValues(arr)
			let obj2 = { ...parameterValue };
			obj2[`param${key + 1}`] = {
				...obj2[`param${key + 1}`],
				timeAnchor: e.target.value,
			};
			setParameterValue(obj2);
		} else if (field === 'timesnippetValue') {
			//setDraggerLastAreaValue(e.target.value);
			arr[key] = { ...arr[key], timeValues: { ...arr[key]?.timeValues, timeId: e.target.value } }
			setFormValues(arr)
			let obj2 = { ...parameterValue };
			obj2[`param${key + 1}`] = {
				...obj2[`param${key + 1}`],
				timeId: e.target.value,
			};
			setParameterValue(obj2);
		} else if (field === 'dateanchorValue') {
			//setDraggerLastAreaValue(e.target.value);
			arr[key] = { ...arr[key], dateValues: { ...arr[key]?.dateValues, dateAnchor: e.target.value } }
			setFormValues(arr)
			let obj2 = { ...parameterValue };
			obj2[`param${key + 1}`] = {
				...obj2[`param${key + 1}`],
				dateAnchor: e.target.value,
			};
			setParameterValue(obj2);
		} else if (field === 'datesnippetValue') {
			//setDraggerLastAreaValue(e.target.value);
			arr[key] = { ...arr[key], dateValues: { ...arr[key]?.dateValues, dateId: e.target.value } }
			setFormValues(arr)
			let obj2 = { ...parameterValue };
			obj2[`param${key + 1}`] = {
				...obj2[`param${key + 1}`],
				dateId: e.target.value,
			};
			setParameterValue(obj2);
		} else if (field === 'method') {
			arr[key] = { ...arr[key], method: value?.value }
			setFormValues(arr)
			if (value?.value === 'key_value_form') {
				handleMenuChange('key_value')
			}
			// else{
			// 	handleMenuChange('word')
			// }
		} else if (field === 'anchor_dir') {
			arr[key] = { ...arr[key], anchor_dir: value?.value }
			setFormValues(arr)
		} else if (field === 'pageIdValue') {
			arr[key] = { ...arr[key], pageIdValue: value?.value }
			setFormValues(arr)
		} else if (field === 'param_rule') {
			arr[key] = { ...arr[key], values: { ...arr[key]?.values, param_rule: value?.value } }
			setFormValues(arr)
		} else if (field === 'RegEx') {
			arr[key] = { ...arr[key], RegEx: e.target.value }
			setFormValues(arr)
		} else if (field === 'parameterName') {
			if (activeKey != 0) {
				if (e.target.value === formValues[key - 1]?.name) {
					openNotification("Name is same")
				}
			}
			arr[key] = { ...arr[key], name: e.target.value }
			setFormValues(arr)
		}
		else if (field === 'snippetId') {
			obj.snippetID = e.target.value;
			setAreasMapObject({
				...areasMapObject,
				snippetID: e.target.value,
			});
		} else if (field === 'snippetKey1') {
			obj.areaValue = e.target.value;
			setAreasMapObject({
				...areasMapObject,
				areaValue: e.target.value,
			});
		} else if (field === 'area') {
			obj.areaValue = e.target.value;
			// setAreasMapObject({
			//     ...areasMapObject,
			//     areaValue: e.target.value,
			// });
		} else if (field === 'x1') {
			obj.coords[0] = e.target.value;
			let tempArr = [...areasMapObject.coords];
			tempArr[0] = Number(e.target.value);
			setAreasMapObject({
				...areasMapObject,
				coords: tempArr,
			});
		} else if (field === 'y1') {
			obj.coords[1] = e.target.value;
			let tempArr = [...areasMapObject.coords];
			tempArr[1] = Number(e.target.value);
			setAreasMapObject({
				...areasMapObject,
				coords: tempArr,
			});
		} else if (field === 'x2') {
			obj.coords[2] = e.target.value;
			let tempArr = [...areasMapObject.coords];
			tempArr[2] = Number(e.target.value);
			setAreasMapObject({
				...areasMapObject,
				coords: tempArr,
			});
		} else if (field === 'y2') {
			obj.coords[3] = e.target.value;
			let tempArr = [...areasMapObject.coords];
			tempArr[3] = Number(e.target.value);
			setAreasMapObject({
				...areasMapObject,
				coords: tempArr,
			});
		}

		let newform = [...formValues]
		newform.forEach(item => {
			if (item.values) {
				if (item.values.snippetID === snippetNumber) {
					if (field === 'x1') {
						item.values.anchorCoords[0] = Number(e.target.value);
					} else if (field === 'y1') {
						item.values.anchorCoords[1] = Number(e.target.value);
					} else if (field === 'x2') {
						item.values.anchorCoords[2] = Number(e.target.value);
					} else if (field === 'y2') {
						item.values.anchorCoords[3] = Number(e.target.value);
					}
				}
				if (item.values.valueSnippetID === snippetNumber) {
					if (field === 'x1') {
						item.values.valueCoords[0] = Number(e.target.value);
					} else if (field === 'y1') {
						item.values.valueCoords[1] = Number(e.target.value);
					} else if (field === 'x2') {
						item.values.valueCoords[2] = Number(e.target.value);
					} else if (field === 'y2') {
						item.values.valueCoords[3] = Number(e.target.value);
					}
				}
			}
			if (item.unitValues) {
				if (item.unitValues.snippetID === snippetNumber) {
					if (field === 'x1') {
						item.unitValues.coords[0] = Number(e.target.value);
					} else if (field === 'y1') {
						item.unitValues.coords[1] = Number(e.target.value);
					} else if (field === 'x2') {
						item.unitValues.coords[2] = Number(e.target.value);
					} else if (field === 'y2') {
						item.unitValues.coords[3] = Number(e.target.value);
					}
				}
				if (item.unitValues.valueSnippetID === snippetNumber) {
					if (field === 'x1') {
						item.unitValues.valueCoords[0] = Number(e.target.value);
					} else if (field === 'y1') {
						item.unitValues.valueCoords[1] = Number(e.target.value);
					} else if (field === 'x2') {
						item.unitValues.valueCoords[2] = Number(e.target.value);
					} else if (field === 'y2') {
						item.unitValues.valueCoords[3] = Number(e.target.value);
					}
				}
			}
			if (item.timeValues) {
				if (item.timeValues.snippetID === snippetNumber) {
					if (field === 'x1') {
						item.timeValues.coords[0] = Number(e.target.value);
					} else if (field === 'y1') {
						item.timeValues.coords[1] = Number(e.target.value);
					} else if (field === 'x2') {
						item.timeValues.coords[2] = Number(e.target.value);
					} else if (field === 'y2') {
						item.timeValues.coords[3] = Number(e.target.value);
					}
				}
				if (item.timeValues.valueSnippetID === snippetNumber) {
					if (field === 'x1') {
						item.timeValues.valueCoords[0] = Number(e.target.value);
					} else if (field === 'y1') {
						item.timeValues.valueCoords[1] = Number(e.target.value);
					} else if (field === 'x2') {
						item.timeValues.valueCoords[2] = Number(e.target.value);
					} else if (field === 'y2') {
						item.timeValues.valueCoords[3] = Number(e.target.value);
					}
				}
			}
			if (item.dateValues) {
				if (item.dateValues.snippetID === snippetNumber) {
					if (field === 'x1') {
						item.dateValues.coords[0] = Number(e.target.value);
					} else if (field === 'y1') {
						item.dateValues.coords[1] = Number(e.target.value);
					} else if (field === 'x2') {
						item.dateValues.coords[2] = Number(e.target.value);
					} else if (field === 'y2') {
						item.dateValues.coords[3] = Number(e.target.value);
					}
				}
				if (item.dateValues.valueSnippetID === snippetNumber) {
					if (field === 'x1') {
						item.dateValues.valueCoords[0] = Number(e.target.value);
					} else if (field === 'y1') {
						item.dateValues.valueCoords[1] = Number(e.target.value);
					} else if (field === 'x2') {
						item.dateValues.valueCoords[2] = Number(e.target.value);
					} else if (field === 'y2') {
						item.dateValues.valueCoords[3] = Number(e.target.value);
					}
				}
			}

		})

		let filteredArr = [...areasMapFilteredArr];
		let newArr = [...areasMap.areas];
		newArr.forEach((ele, i) => {
			if (clickedSnippetId === ele.areaValue) {
				if (field === 'x1') {
					ele.coords[0] = Number(e.target.value);
				} else if (field === 'y1') {
					ele.coords[1] = Number(e.target.value);
				} else if (field === 'x2') {
					ele.coords[2] = Number(e.target.value);
				} else if (field === 'y2') {
					ele.coords[3] = Number(e.target.value);
				}
				filteredArr = filteredArr.filter(
					(item) => item.areaValue !== clickedSnippetId
				);
				filteredArr.push(ele);

			}
		});

		setAreasMap({ ...areasMap, areas: newArr });
		setAreasMapFilteredArr(filteredArr);

	};
	/**
	 * TODO: get boundingBoxData info
	 */
	/* istanbul ignore next */
	const getBoundingBoxDataInfo = async (width, height, mode, pageNumber = 0, table_identifier = {}, filename = null) => {
		try {
			dispatch(showLoader());
			let _reqBatch = {
				filename: filename ? `${filename?.split('.pdf')[0]}_page-${pageNumber}.jpeg.json` : `${params?.file?.split('.pdf')[0]}_page-${pageNumber}.jpeg.json`,
				bbox_type: params?.fromScreen == "Workflow" ? "PARAMETER_TABLE" : mode,
				page: pageNumber + 1,
				// action_type: params?.temp_disp_id ? "edit" : "create",
				action_type: params?.temp_disp_id && params?.fromScreen == "Workflow" ? "edit" : params?.temp_disp_id && params?.fromScreen == "Workspace" ? mode == "TABLE" ? "create" : "edit" : "create",
				temp_disp_id: params?.temp_disp_id ? params?.temp_disp_id : "",
				temp_version: params?.temp_disp_id ? 1 : 0,
				table_identifier: Object.keys(table_identifier).length > 0 ? table_identifier : null
			};
			const batchRes = await getBoundingBoxData(_reqBatch);
			setOriginalResponse(batchRes)
			setPageLimit(batchRes?.Page)
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
			} else if (batchRes.Data.length == 0) {
				setAreasMap({ ...areasMap, areas: [] });
				dispatch(hideLoader());
			}
			else {
				dispatch(hideLoader());
				dispatch(showNotification('error', `Unable to detect ${mode}`));
			}
		} catch (error) { /* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', 'No Data Found'));
		}
	};

	useEffect(() => {
		let template = {
			material_num: matBatch.material_num,
			batch: matBatch.batch,
			site: matBatch.site,
			template_name: additionalData?.newTempalteName ? additionalData?.newTempalteName : params?.tempalteName,
			status: templateStatus,
			template_id: params?.temp_disp_id ? params?.temp_disp_id : templateId,
			version: templateVersion ? templateVersion : "1",
			time_zone: fileTimezoneData,
			// template_name : saveAsName ? saveAsName : params?.tempalteName
		}
		templateForm.setFieldsValue(template)
		setTemplateFormData(template)
	}, [matBatch, templateId, templateStatus, templateVersion, fileTimezoneData])


	useEffect(() => {

		getImage()
		// let loadData =  getIdTemplateData()
		const params = QueryString.parse(location?.search)
		const getIdTemplateData = async () => {
			dispatch(showLoader());
			let req = {
				template_displ_id: params?.temp_disp_id,
				version: params?.version
			}
			let res = await getPbrTemplateData(req)
			let loadData = res.Data
			if (params?.temp_disp_id || localStorage.getItem("test_enabled") == !null) {
				setTemplateInfo(loadData[0]?.pbr_template_info?.pbrTemplateInfo)
				let loadMatBatch = {
					material_num: loadData[0].product_num,
					batch: loadData[0].batch_num,
					site: loadData[0].site_code
				}
				getTimeZone(loadMatBatch)
				getChangeFileData(loadMatBatch.material_num)
				let additional = {
					pbrDisplayId: loadData[0]?.pbr_template_disp_id,
					pbrTempId: loadData[0]?.pbr_temp_int_id,
					pbrTemplateStatus: loadData[0]?.pbr_template_status,
					pbrVersion: loadData[0]?.pbr_template_version
				}
				setMatBatch(loadMatBatch)
				setAdditionalData(additional)
				setTemplateStatus(loadData[0]?.pbr_template_status)
				setTemplateVersion(loadData[0]?.pbr_template_version)
				setTemplateId(loadData[0]?.pbr_template_disp_id)
				// if (Object.keys(loadData[0]?.pbr_template_info.pbrPageIdentifier).length > 0) {
				// 	let obj1 = {
				// 		key: loadData[0]?.pbr_template_info?.pbrPageIdentifier?.keys[0],
				// 		key_2: loadData[0]?.pbr_template_info?.pbrPageIdentifier?.keys[1]
				// 	}
				// 	setPageIdentifierData(obj1)
				// }
			} else {
				getTimeZone()
				getChangeFileData()
			}

			if (params?.temp_disp_id || localStorage.getItem("test_enabled") == !null) {
				let obj = {}
				loadData[0]?.pbr_template_info?.pbrTemplateInfo.forEach((item, index) => {
					obj[`param${index + 1}`] = {
						anchorValue: item?.param_key_text,
						anchorId: item?.param_value_text,
						unitAnchor: item?.uom_key_text,
						unitId: item?.uom_value_text,
						timeAnchor: item.time_key_text,
						timeId: item.time_value_text,
						dateAnchor: item.date_key_text,
						dateId: item.date_value_text,
					}
				})
				setParameterValue(obj)
				let demoValues = {
					users: []
				}
				let table = {
					users: []
				}
				let pageID = {
					users: []
				}
				loadData[0]?.pbr_template_info?.pbrTemplateInfo.forEach(item => {
					let obj = {
						name: item.name,
						method: item.method,
						pageIdValue: item?.page_name,
						regex: item.param_value_regex,
						AnchorDirection: item.param_value_direction,
						param_rule: item?.param_value_rule?.rule_name,
						param_key: item?.param_key_text,
						param_snippet_value: item?.param_value_text,
						param_valueArea: item?.param_value_rule?.regex_text,
						param_max: item?.param_value_rule?.range_max,
						param_min: item?.param_value_rule?.range_min,
						valueType: item?.param_value_type,
						param_valueTransformation: item?.param_value_rule?.factor,
						uom_rule: item?.uom_value_rule?.rule_name,
						uom_valueArea: item?.uom_value_rule?.regex_text,
						uom_max: item?.uom_value_rule?.range_max,
						uom_min: item?.uom_value_rule?.range_min,
						uom_valueTransformation: item?.uom_value_rule?.factor,
						time_rule: item?.time_value_rule?.rule_name,
						time_valueArea: item?.time_value_rule?.regex_text,
						time_max: item?.time_value_rule?.range_max,
						time_min: item?.time_value_rule?.range_min,
						time_valueTransformation: item?.time_value_rule?.factor,
						date_rule: item?.date_value_rule?.rule_name,
						date_valueArea: item?.date_value_rule?.regex_text,
						date_max: item?.date_value_rule?.range_max,
						date_min: item?.date_value_rule?.range_min,
						date_valueTransformation: item?.date_value_rule?.factor,
						time_transformation: item?.time_value_rule?.transformation,
						date_transformation: item?.date_value_rule?.transformation,
						uom_transformation: item?.uom_value_rule?.transformation,
						param_transformation: item?.param_value_rule?.transformation,

					}
					if (item?.param_value_direction && typeof (item?.param_value_direction) != 'string') {
						item?.param_value_direction.forEach((item, index) => {
							obj[`dir${index}`] = item
						})
					}
					if (item?.param_value_list) {
						item?.param_value_list?.param_value_text?.forEach((item, index) => {
							obj[`selection${index}`] = item
						})
					}
					demoValues.users.push(obj)
				})
				loadData[0]?.pbr_template_info?.pbrTableInfo.forEach((item, index) => {
					let sideData = {
						table_id: item?.table_id,
						name: item?.table_name,
						tableData: loadData[0]?.pbr_template_info?.tableData[index]?.tableData,
						pageIdValue: item?.page_name
					}
					table.users.push(sideData)
				})
				loadData[0]?.pbr_template_info?.pbrPageIdentifier.forEach((item, index) => {
					let sideData = {
						name: item?.name
					}
					if (item.keys.length > 0) {
						item.keys.forEach((i, index) => {
							sideData[`key${index + 1}`] = i
						})


					}
					sideData["keyCount"] = item.keys.length
					sideData["page_num"] = item.page_num
					pageID.users.push(sideData)
				})
				setPageIdFormValues(pageID?.users)
				setInitialSideTableData(table)
				setInitialPageIdentifierData(pageID)
				setFormLoadParameter(demoValues)
				setParameterFormData(demoValues?.users)
				setFormTableData(loadData[0]?.pbr_template_info?.tableData)
			}
		}
		getIdTemplateData()

	}, []);
	/* istanbul ignore next */
	useEffect(() => {
		if ((templateInfo?.length > 0 && imageWidth !== 0 && imageHeight !== 0) || localStorage.getItem("test_enabled") == !null) {
			let newArray = formValues
			let arr = templateInfo.map((item, index) => ({
				name: item.name,
				method: item.method,
				pageIdValue: item?.page_name,
				page_num: item?.param_page,
				advance_setting: [item?.settings],
				directions: item?.param_value_direction,
				selection_method: item?.param_value_list?.param_value_text.map((i, ind) => (
					{
						selectionVal: i,
						snippetID: item?.param_value_list?.param_value_snippet_id[ind],
						coords: [
							item?.param_value_list?.param_value_left[ind] * imageWidth, item?.param_value_list?.param_value_top[ind] * imageHeight,
							(item?.param_value_list?.param_value_left[ind] + item?.param_value_list?.param_value_width[ind]) * imageWidth, (item?.param_value_list?.param_value_top[ind] + item?.param_value_list?.param_value_height[ind]) * imageHeight
						]
					}
				)),
				values: {
					anchorValue: item?.param_key_text, anchorId: item?.param_value_text, snippetID: item?.param_key_snippet_id,
					anchorCoords: [
						item?.param_key_left * imageWidth, item?.param_key_top * imageHeight, (item?.param_key_left + item?.param_key_width) * imageWidth, (item?.param_key_top + item?.param_key_height) * imageHeight
					], valueCoords: [
						item?.param_value_left * imageWidth, item?.param_value_top * imageHeight, (item?.param_value_left + item?.param_value_width) * imageWidth, (item?.param_value_top + item?.param_value_height) * imageHeight
					], valueSnippetID: item?.param_value_snippet_id
				},
				unitValues: {
					unitAnchor: item?.uom_key_text, unitId: item?.uom_value_text, snippetID: item?.uom_key_snippet_id,
					coords: [
						item?.uom_key_left * imageWidth, item?.uom_key_top * imageHeight, (item?.uom_key_left + item?.uom_key_width) * imageWidth, (item?.uom_key_top + item?.uom_key_height) * imageHeight
					], valueCoords: [
						item?.uom_value_left * imageWidth, item?.uom_value_top * imageHeight, (item?.uom_value_left + item?.uom_value_width) * imageWidth, (item?.uom_value_top + item?.uom_value_height) * imageHeight
					], valueSnippetID: item?.uom_value_snippet_id
				},
				timeValues: {
					timeAnchor: item?.time_key_text, timeId: item?.time_value_text, snippetID: item?.time_key_snippet_id,
					coords: [
						item?.time_key_left * imageWidth, item?.time_key_top * imageHeight, (item?.time_key_left + item?.time_key_width) * imageWidth, (item?.time_key_top + item?.time_key_height) * imageHeight
					], valueCoords: [
						item?.time_value_left * imageWidth, item?.time_value_top * imageHeight, (item?.time_value_left + item?.time_value_width) * imageWidth, (item?.time_value_top + item?.time_value_height) * imageHeight
					], valueSnippetID: item?.time_value_snippet_id
				},
				dateValues: {
					dateAnchor: item?.date_key_text, dateId: item?.date_value_text, snippetID: item?.date_key_snippet_id,
					coords: [
						item?.date_key_left * imageWidth, item?.date_key_top * imageHeight, (item?.date_key_left + item?.date_key_width) * imageWidth, (item?.date_key_top + item?.date_key_height) * imageHeight
					], valueCoords: [
						item?.date_value_left * imageWidth, item?.date_value_top * imageHeight, (item?.date_value_left + item?.date_value_width) * imageWidth, (item?.date_value_top + item?.date_value_height) * imageHeight
					], valueSnippetID: item?.date_value_snippet_id
				}


			}))
			const ResultArrayObjOne = newArray.filter(({ name: name }) => !arr.some(({ name: name1 }) => name === name1));
			setFormValues([...arr, ...ResultArrayObjOne])
			setActiveNumber(templateInfo?.length)
			setParamaterAdded(true)
			// setTemplateInfo([])
			dispatch(loadTemplateInfo([]))
		}

	}, [imageWidth, imageHeight])

	const getImage = async (val, changeFile) => {
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
			MDH_APP_PYTHON_SERVICE + `/pbr/udh/get_file_page_image?filename=${changeFile ? changeFile : params?.file}&pageId=${val ? val : pageNumber}`,
			requestOptions
		)
			.then((response) => response)
			.then((result) => result)
			.catch((error) => console.log("error", error));

		let res = await response.blob();
		/* istanbul ignore next */
		if (res.type === "application/json") {
			openNotification("Page number not valid")
			dispatch(hideLoader());
		} else {/* istanbul ignore next */
			setDisplayImage(window.webkitURL.createObjectURL(res))
			// dispatch(hideLoader());
		}
	}

	const getChangeFileData = async (material_num) => {
		try {
			let req = {
				product_num: material_num ? material_num : matBatch?.material_num
			}
			let res = await getFileList(req)
			setChangeFileOptions(res.data)
			let val = res.data.filter(item => item.value === params.file)
			setChangeFileValue(val[0].value)
		} catch (err) {
			console.log(err)
		}

	}
	// useEffect(() => {
	//     if(displayImage!=""){
	//         dispatch(hideLoader());
	//     }
	// },[displayImage])

	useEffect(() => {
		// dispatch(showLoader());
		setTimeout(() => {
			const list = document.getElementsByTagName("canvas")[0]
			setImageWidth(list?.width)
			setimageHeight(list?.height)
			// dispatch(hideLoader());
		}, 3000)
	}, [document.getElementsByTagName("canvas")[0], displayImage]);
	/* istanbul ignore next */
	useEffect(() => {
		dispatch(showLoader());
		if ((imageWidth !== 0 && imageHeight !== 0) || localStorage.getItem("test_enabled") == !null) {
			for (let i = 0; i < 2; i++) {
				setTimeout(() => {
					getBoundingBoxDataInfo(imageWidth, imageHeight, selectedMode, pageNumber - 1);
				}, i * 1000)
			}
		}
	}, [imageWidth, imageHeight]);

	const getTimeZone = async (val) => {
		try {
			let req = {
				filename: params?.file,
				batchNum: val?.batch ? val.batch : matBatch?.batch,
				siteCode: val?.site ? val.site : matBatch?.site,
				productNum: val?.material_num ? val.material_num : matBatch?.material_num
			}
			let res = await timeZone(req)
			if (res["status-code"] === 200) {
				setFileTimezoneData(res?.Data)
			} else {
				dispatch(showNotification('error', res.Message))
			}

		} catch (err) {
			dispatch(showNotification('error', err))
		}
	}

	/* istanbul ignore next */
	const clicked = (area) => {
		if (showRowColIdentifier) {
			if (Object.keys(initialSideTableData).length > 0 && formTableData.length === initialSideTableData?.users.length) {
				dispatch(showNotification('error', "Valid with new parameters created"));
			} else if (formTableData.length > 0) {
				setClickedTable(area)
				let table_identifier = {
					"left": area?.coords[0] / imageWidth, "top": area?.coords[1] / imageHeight,
					"width": (area?.coords[2] - area?.coords[0]) / imageWidth, "height": (area?.coords[3] - area?.coords[1]) / imageHeight
				}
				for (let i = 0; i < 2; i++) {
					setTimeout(() => {
						getBoundingBoxDataInfo(imageWidth, imageHeight, "CELL", pageNumber - 1, table_identifier);
					}, i * 1000)
				}
			} else {
				dispatch(showNotification('error', "Create at least one Table Parameter"));
			}
		}
		if (mainPanelValue == 2) {
			setPageDragValue(area)
		}
		if (selectionActive) {
			setSelectionDraggedValue(area)
		} else {
			setClickedSnippetId(area.areaValue);
			setSnippetNumber(area.snippetID)
			let updateObj = { ...areasMap }
			updateObj.areas.forEach(item => {
				if (item.snippetID === area.snippetID) {
					item.strokeColor = "green",
						item['lineWidth'] = 3
				} else {
					item.strokeColor = "blue"
					item['lineWidth'] = 1
				}
			})
			setAreasMap(updateObj)
			let obj = {
				snippetID: area.snippetID,
				areaValue: area.areaValue,
				shape: area.shape,
				coords: area.coords,
				preFillColor: area.preFillColor,
				fillColor: area.fillColor,
				strokeColor: area.strokeColor,
			};
			setAreasMapObject(obj);
			let filteredArr = [...areasMapFilteredArr];
			if (DraggerActiveMultiple.value && mainPanelValue !== 2) {
				let obj1 = { ...parameterValue };
				obj1[`param${Number(activeKey) + 1}`] = {
					...obj1[`param${Number(activeKey) + 1}`],
					anchorValue: area.areaValue,
				};
				let arr = [...formValues]
				arr[activeKey] = { ...arr[activeKey], page_num: pageNumber, values: { ...arr[activeKey]?.values, anchorValue: area.areaValue, snippetID: area.snippetID, anchorCoords: area.coords } }
				setParameterValue(obj1);
				setFormValues(arr)
				let fields = parameterForm.getFieldsValue()
				fields.users[activeKey]["param_key"] = area.areaValue
				parameterForm.setFieldsValue(fields)

			} else if (DraggerActiveMultiple.unit && mainPanelValue !== "2") {
				let obj1 = { ...parameterValue };
				obj1[`param${Number(activeKey) + 1}`] = {
					...obj1[`param${Number(activeKey) + 1}`],
					unitAnchor: area.areaValue,
				};
				let arr = [...formValues]
				arr[activeKey] = { ...arr[activeKey], unitValues: { ...arr[activeKey]?.unitValues, unitAnchor: area.areaValue, snippetID: area.snippetID, coords: area.coords } }
				setFormValues(arr)
				setParameterValue(obj1);
			} else if (DraggerActiveMultiple.time && mainPanelValue !== "2") {
				let obj1 = { ...parameterValue };
				obj1[`param${Number(activeKey) + 1}`] = {
					...obj1[`param${Number(activeKey) + 1}`],
					timeAnchor: area.areaValue,
				};
				let arr = [...formValues]
				arr[activeKey] = { ...arr[activeKey], timeValues: { ...arr[activeKey]?.timeValues, timeAnchor: area.areaValue, snippetID: area.snippetID, coords: area.coords } }
				setFormValues(arr)
				setParameterValue(obj1);
			} else if (DraggerActiveMultiple.date && mainPanelValue !== "2") {
				let obj1 = { ...parameterValue };
				obj1[`param${Number(activeKey) + 1}`] = {
					...obj1[`param${Number(activeKey) + 1}`],
					dateAnchor: area.areaValue,
				};
				let arr = [...formValues]
				arr[activeKey] = { ...arr[activeKey], dateValues: { ...arr[activeKey]?.dateValues, dateAnchor: area.areaValue, snippetID: area.snippetID, coords: area.coords } }
				setFormValues(arr)
				setParameterValue(obj1);
			} else if (DraggerActiveMultiple.valueSnippet && mainPanelValue !== "2") {
				let obj1 = { ...parameterValue };
				obj1[`param${Number(activeKey) + 1}`] = {
					...obj1[`param${Number(activeKey) + 1}`],
					anchorId: area.areaValue,
				};
				let arr = [...formValues]
				arr[activeKey] = { ...arr[activeKey], values: { ...arr[activeKey]?.values, anchorId: area.areaValue, valueSnippetID: area.snippetID, valueCoords: area.coords } }
				setFormValues(arr)
				setParameterValue(obj1);
				let fields = parameterForm.getFieldsValue()
				fields.users[activeKey]["param_snippet_value"] = area.areaValue
				parameterForm.setFieldsValue(fields)
			} else if (DraggerActiveMultiple.unitSnippet && mainPanelValue !== "2") {
				let obj1 = { ...parameterValue };
				obj1[`param${Number(activeKey) + 1}`] = {
					...obj1[`param${Number(activeKey) + 1}`],
					unitId: area.areaValue,
				};
				let arr = [...formValues]
				arr[activeKey] = { ...arr[activeKey], unitValues: { ...arr[activeKey]?.unitValues, unitId: area.areaValue, valueSnippetID: area.snippetID, valueCoords: area.coords } }
				setFormValues(arr)
				setParameterValue(obj1);
			} else if (DraggerActiveMultiple.timeSnippet && mainPanelValue !== "2") {
				let obj1 = { ...parameterValue };
				obj1[`param${Number(activeKey) + 1}`] = {
					...obj1[`param${Number(activeKey) + 1}`],
					timeId: area.areaValue,
				};
				let arr = [...formValues]
				arr[activeKey] = { ...arr[activeKey], timeValues: { ...arr[activeKey]?.timeValues, timeId: area.areaValue, valueSnippetID: area.snippetID, valueCoords: area.coords } }
				setFormValues(arr)
				setParameterValue(obj1);
			} else if (DraggerActiveMultiple.dateSnippet && mainPanelValue !== "2") {
				let obj1 = { ...parameterValue };
				obj1[`param${Number(activeKey) + 1}`] = {
					...obj1[`param${Number(activeKey) + 1}`],
					dateId: area.areaValue,
				};
				let arr = [...formValues]
				arr[activeKey] = { ...arr[activeKey], dateValues: { ...arr[activeKey]?.dateValues, dateId: area.areaValue, valueSnippetID: area.snippetID, valueCoords: area.coords } }
				setFormValues(arr)
				setParameterValue(obj1);
			}
		}

	};
	/* istanbul ignore next */
	const tableDataReq = () => {
		if (formTableData.length > 0) {
			let data = []
			formTableData.forEach(item => {
				let obj = {
					table_id: item?.table_id,
					table_name: item?.name,
					filename: params?.file,
					page_name: item?.pageIdValue,
					page: item?.page_no,
					table_identifier: item?.tableData?.table_identifier,
					column_config: {
						columns: [],
						method: "row_index",
						params: {
							pk_row_index: item?.tableData?.colPanelValue.pk_index,
							start_index: item?.tableData?.colPanelValue.start,
							stop_index: item?.tableData?.colPanelValue.stop
						}
					},
					row_config: {
						method: "column_index",
						params: {
							pk_col_index: item?.tableData?.rowPanelValue?.pk_index,
							start_index: item?.tableData?.rowPanelValue?.start,
							stop_index: item?.tableData?.rowPanelValue?.stop
						},
						rows: []
					},

				}
				let arr = item?.tableData?.selectedColValues?.filter(item1 => item?.tableData?.selectedColRows?.includes(item1?.key))
				let arr1 = item?.tableData?.selectedRowValues?.filter(item2 => item?.tableData?.selectedRowRows?.includes(item2?.key))

				if (arr) {
					let cols = arr.map(item => (
						{
							col_id: item.columnindex,
							selected: true,
							Text: item.cell_text,
							method: item?.method,
							params: [item?.params],
							apply_to: item?.applicalbe_to
						}
					))
					obj.column_config.columns = cols
				}
				if (arr1) {
					let rows = arr1.map(item => (
						{
							row_id: item.rowindex,
							selected: true,
							Text: item.cell_text,
							method: item?.method,
							params: [item?.params],
							apply_to: item?.applicalbe_to
						}
					))
					obj.row_config.rows = rows
				}
				data.push(obj)
			})
			return data
		} else {
			return []
		}


	}
	/* istanbul ignore next */
	const savePbrTemplateDataInfo = async () => {
		// let validate = validation()
		try {/* istanbul ignore next */
			dispatch(showLoader());
			if (formValues.length > 0 || formTableData.length > 0) {
				let login_response = JSON.parse(localStorage.getItem('login_details'));
				let _reqBatch = {
					pbrTemplateName: params.tempalteName,
					custKey: '1000',
					pbrTemplateVersion: 1,
					// pbrTemplateStatus: 'DRFT',
					createdBy: login_response?.email_id,
					changedBy: params.temp_disp_id ? login_response?.email_id : "",
					templateInfo: { pbrTemplateInfo: [], pbrPageIdentifier: {}, pbrTableInfo: [], tableData: formTableData, filename: params?.file, },
					material: matBatch?.material_num,
					batch: matBatch?.batch,
					siteCode: matBatch?.site,
					actionType: templateId != "New" ? "edit" : "create",
					pbrDisplayId: additionalData?.pbrDisplayId ? additionalData?.pbrDisplayId : "",
					pbrTempId: additionalData?.pbrTempId ? additionalData?.pbrTempId : 0,
					pbrTemplateStatus: additionalData?.pbrTemplateStatus ? additionalData?.pbrTemplateStatus : "DRFT"
				};
				let arr = [];
				formValues.forEach((ele, index) => {
					let obj = {
						method: ele.method,
						filename: params?.file,
						name: ele.name,
						page_name: ele?.pageIdValue,
						param_value_direction: ele?.directions,
						param_value_regex: parameterFormData[index]?.regex,
						settings: ele?.advance_setting ? ele?.advance_setting[0] : {},
						param_value_type: "checkbox"
					}
					if (ele.values) {
						obj['color'] = "blue"
						obj['param_key_height'] = (ele?.values?.anchorCoords[3] - ele?.values?.anchorCoords[1]) / imageHeight
						obj['param_key_left'] = ele?.values?.anchorCoords[0] / imageWidth
						obj['param_key_text'] = ele?.values?.anchorValue
						obj['param_key_top'] = ele?.values?.anchorCoords[1] / imageHeight
						obj['param_key_width'] = (ele?.values?.anchorCoords[2] - ele?.values?.anchorCoords[0]) / imageWidth
						obj['param_page'] = ele?.page_num
						obj['param_key_snippet_id'] = ele?.values?.snippetID
						obj['param_value_height'] = (ele?.values?.valueCoords[3] - ele?.values?.valueCoords[1]) / imageHeight
						obj['param_value_left'] = ele?.values?.valueCoords[0] / imageWidth
						obj['param_value_text'] = ele?.values?.anchorId
						obj['param_value_top'] = ele?.values?.valueCoords[1] / imageHeight
						obj['param_value_width'] = (ele?.values?.valueCoords[2] - ele?.values?.valueCoords[0]) / imageWidth
						obj['param_value_snippet_id'] = ele?.values?.valueSnippetID
						obj['param_value_rule'] = {
							rule_name: parameterFormData[index]?.param_rule, regex_text: parameterFormData[index]?.param_valueArea,
							range_min: parameterFormData[index]?.param_min, range_max: parameterFormData[index]?.param_max,
							factor: parameterFormData[index]?.param_valueTransformation, transformation: parameterFormData[index]?.param_transformation
						}
					}
					if (ele.unitValues) {
						obj['uom_key_height'] = (ele?.unitValues?.coords[3] - ele?.unitValues?.coords[1]) / imageHeight
						obj['uom_key_left'] = ele?.unitValues?.coords[0] / imageWidth
						obj['uom_key_text'] = ele?.unitValues?.unitAnchor
						obj['uom_key_top'] = ele?.unitValues?.coords[1] / imageHeight
						obj['uom_key_width'] = (ele?.unitValues?.coords[2] - ele?.unitValues?.coords[0]) / imageWidth
						obj['uom_page'] = ele?.page_num
						obj['uom_key_snippet_id'] = ele?.unitValues?.snippetID
						obj['uom_value_height'] = (ele?.unitValues?.valueCoords[3] - ele?.unitValues?.valueCoords[1]) / imageHeight
						obj['uom_value_left'] = ele?.unitValues?.valueCoords[0] / imageWidth
						obj['uom_value_text'] = ele?.unitValues?.unitId
						obj['uom_value_top'] = ele?.unitValues?.valueCoords[1] / imageHeight
						obj['uom_value_width'] = (ele?.unitValues?.valueCoords[2] - ele?.unitValues?.valueCoords[0]) / imageWidth
						obj['uom_value_snippet_id'] = ele?.unitValues?.valueSnippetID
						obj['uom_value_rule'] = {
							rule_name: parameterFormData[index]?.uom_rule, regex_text: parameterFormData[index]?.uom_valueArea,
							range_min: parameterFormData[index]?.uom_min, range_max: parameterFormData[index]?.uom_max,
							factor: parameterFormData[index]?.uom_valueTransformation, transformation: parameterFormData[index]?.uom_transformation
						}

					}
					if (ele.timeValues) {
						obj['time_key_height'] = (ele?.timeValues?.coords[3] - ele?.timeValues?.coords[1]) / imageHeight
						obj['time_key_left'] = ele?.timeValues?.coords[0] / imageWidth
						obj['time_key_text'] = ele?.timeValues?.timeAnchor
						obj['time_key_top'] = ele?.timeValues?.coords[1] / imageHeight
						obj['time_key_width'] = (ele?.timeValues?.coords[2] - ele?.timeValues?.coords[0]) / imageWidth
						obj['time_page'] = ele?.page_num
						obj['time_key_snippet_id'] = ele?.timeValues?.snippetID
						obj['time_value_height'] = (ele?.timeValues?.valueCoords[3] - ele?.timeValues?.valueCoords[1]) / imageHeight
						obj['time_value_left'] = ele?.timeValues?.valueCoords[0] / imageWidth
						obj['time_value_text'] = ele?.timeValues?.timeId
						obj['time_value_top'] = ele?.timeValues?.valueCoords[1] / imageHeight
						obj['time_value_width'] = (ele?.timeValues?.valueCoords[2] - ele?.timeValues?.valueCoords[0]) / imageWidth
						obj['time_value_snippet_id'] = ele?.timeValues?.valueSnippetID
						obj['time_value_rule'] = {
							rule_name: parameterFormData[index]?.time_rule, regex_text: parameterFormData[index]?.time_valueArea,
							range_min: parameterFormData[index]?.time_min, range_max: parameterFormData[index]?.time_max,
							factor: parameterFormData[index]?.time_valueTransformation, transformation: parameterFormData[index]?.time_transformation
						}

					}
					if (ele.dateValues) {
						obj['date_key_height'] = (ele?.dateValues?.coords[3] - ele?.dateValues?.coords[1]) / imageHeight
						obj['date_key_left'] = ele?.dateValues?.coords[0] / imageWidth
						obj['date_key_text'] = ele?.dateValues?.dateAnchor
						obj['date_key_top'] = ele?.dateValues?.coords[1] / imageHeight
						obj['date_key_width'] = (ele?.dateValues?.coords[2] - ele?.dateValues?.coords[0]) / imageWidth
						obj['date_page'] = ele?.page_num
						obj['date_key_snippet_id'] = ele?.dateValues?.snippetID
						obj['date_value_height'] = (ele?.dateValues?.valueCoords[3] - ele?.dateValues?.valueCoords[1]) / imageHeight
						obj['date_value_left'] = ele?.dateValues?.valueCoords[0] / imageWidth
						obj['date_value_text'] = ele?.dateValues?.dateId
						obj['date_value_top'] = ele?.dateValues?.valueCoords[1] / imageHeight
						obj['date_value_width'] = (ele?.dateValues?.valueCoords[2] - ele?.dateValues?.valueCoords[0]) / imageWidth
						obj['date_value_snippet_id'] = ele?.dateValues?.valueSnippetID
						obj['date_value_rule'] = {
							rule_name: parameterFormData[index]?.date_rule, regex_text: parameterFormData[index]?.date_valueArea,
							range_min: parameterFormData[index]?.date_min, range_max: parameterFormData[index]?.date_max,
							factor: parameterFormData[index]?.date_valueTransformation, transformation: parameterFormData[index]?.date_transformation
						}

					}
					if (ele?.selection_method) {
						obj["param_value_list"] = {
							"param_value_height": [],
							"param_value_left": [],
							"param_value_text": [],
							"param_value_top": [],
							"param_value_width": [],
							"param_value_snippet_id": [],
						}
						ele.selection_method.forEach(item => {
							obj["param_value_list"]['param_value_height'].push((item?.coords[3] - item?.coords[1]) / imageHeight)
							obj["param_value_list"]['param_value_left'].push(item?.coords[0] / imageWidth)
							obj["param_value_list"]['param_value_text'].push(item?.selectionVal)
							obj["param_value_list"]['param_value_top'].push(item?.coords[1] / imageHeight)
							obj["param_value_list"]['param_value_width'].push((item?.coords[2] - item?.coords[0]) / imageWidth)
							obj["param_value_list"]['param_value_snippet_id'].push(item?.snippetID)
						})

					}
					arr.push(obj);

				});
				let pageArr = []
				if (pageIdFormValues) {
					pageIdFormValues?.forEach(item => {
						if (item != undefined) {
							let obj = { name: "", keys: [],page_num:'' }
							Object.entries(item).forEach(item1 => {
								if (item1[0] != "name" && item1[0] != "keyCount" && item1[0] != "page_num") {
									obj.keys.push(item1[1])
								}
								if (item1[0] === "name") {
									obj.name = item1[1]
								}
								if (item1[0] === "page_num") {
									obj.page_num = item1[1]
								}
							})
							pageArr.push(obj)
						}
					})
				}
				_reqBatch.templateInfo.pbrTemplateInfo = arr;
				_reqBatch.templateInfo.pbrPageIdentifier = pageArr;
				let tableRer = tableDataReq()
				_reqBatch.templateInfo.pbrTableInfo = tableRer;
				//api call
				const batchRes = await savePbrTemplate(_reqBatch);
				if (batchRes.Status === 202) {
					let additional = {
						pbrDisplayId: batchRes?.Data?.tempDispId,
						pbrTempId: Number(batchRes?.Data?.tempDispId.replace(/\D/g, '')),
						pbrTemplateStatus: batchRes?.Data?.tempStatus,
						pbrVersion: batchRes?.Data?.tempVersion
					}
					setAdditionalData(additional)
					message.success(batchRes.Message);
					setTemplateId(batchRes?.Data?.tempDispId)
					setTemplateVersion(batchRes?.Data?.tempVersion)
					setTemplateStatus(batchRes?.Data?.tempStatus)
					dispatch(hideLoader());
					dispatch(showNotification('success', batchRes?.Message));
					history.push(`${match.url}/${batchRes?.Data?.tempDispId}?file=${params?.file}&temp_disp_id=${batchRes?.Data?.tempDispId}&tempalteName=${params.tempalteName}&fromScreen=Workspace&version=${batchRes?.Data?.tempVersion}`);

				} else {
					message.error(batchRes.Message);
					dispatch(hideLoader());
					dispatch(showNotification('error', batchRes?.detail));
				}

			} else if (localStorage.getItem("test_enabled") != null) {
				let newReq = {
					pbrTemplateName: params.tempalteName,
					custKey: '1000',
					pbrTemplateVersion: 1,
					// pbrTemplateStatus: 'DRFT',
					createdBy: login_response?.email_id,
					changedBy: params.temp_disp_id ? login_response?.email_id : "",
					templateInfo: { pbrTemplateInfo: [], pbrPageIdentifier: {} },
					material: matBatch?.material_num,
					batch: matBatch?.batch,
					siteCode: matBatch?.site,
					actionType: templateId != "New" ? "edit" : "create",
					pbrDisplayId: additionalData?.pbrDisplayId ? additionalData?.pbrDisplayId : "",
					pbrTempId: additionalData?.pbrTempId ? additionalData?.pbrTempId : 0,
					pbrTemplateStatus: additionalData?.pbrTemplateStatus ? additionalData?.pbrTemplateStatus : "DRFT"
				}
				const batchRes = await savePbrTemplate(newReq);
				if (batchRes.Status === 202) {
					let additional = {
						pbrDisplayId: batchRes?.Data?.tempDispId,
						pbrTempId: Number(batchRes?.Data?.tempDispId.replace(/\D/g, '')),
						pbrTemplateStatus: batchRes?.Data?.tempStatus,
						pbrVersion: batchRes?.Data?.tempVersion
					}
					setAdditionalData(additional)
					message.success(batchRes.Message);
					setTemplateId(batchRes?.Data?.tempDispId)
					setTemplateVersion(batchRes?.Data?.tempVersion)
					setTemplateStatus(batchRes?.Data?.tempStatus)
					dispatch(hideLoader());
					dispatch(showNotification('success', batchRes?.Message));

				} else {
					openNotification('Create at least one Parameter before save')
				}
			} else {
				dispatch(hideLoader());
				openNotification('Create at least one Parameter before save')
			}
		} catch (error) { /* istanbul ignore next */
			dispatch(hideLoader());
			dispatch(showNotification('error', 'No Data Found'));
		}
	};

	const onFinish = values => {
		console.log('Received values of form:', values);
	};
	const parameterFormFinish = values => {
		savePbrTemplateDataInfo()
	};

	/* istanbul ignore next */
	const handleOnFinishFailed = ({ values, errorFields, outOfDate }) => {
		let str = "Please enter "
		let paraName = errorFields[0].name[1]
		errorFields.forEach(item => {
			if (item.name[1] == paraName) {
				str += item.name[2] + ","
			} else {
				str += "in " + values.users[paraName].name + ", "
				str += item.name[2] + ","
				paraName = item.name[1]
			}
		})
		str += "in " + values.users[paraName].name

		let newstr = str.replaceAll(/name/ig, "Name").replace(/method/ig, "Method").replace(/param_key/ig, "Anchor").replace(/param_snippet_value/ig, "Anchor Value")
			.replace(/param_min/ig, "Min").replace(/param_max/ig, "Max")
			.replace(/param_valueTransformation/ig, "Transformation").replace(/,in/ig, " in").replace(/table_id/ig, "Table Id")

		let newstr1 = ""
		values.users.forEach(item => {
			if (item.param_rule == "date" || item.date_rule == "date" || item.time_rule == "date" || item.uom_rule == "date") {
				newstr1 = newstr.replaceAll(/param_valueArea/ig, "Date").replaceAll(/uom_valueArea/ig, "Date").replaceAll(/date_valueArea/ig, "Date").replaceAll(/time_valueArea/ig, "Date")
			} else {
				newstr1 = newstr.replaceAll(/param_valueArea/ig, "RegEx").replaceAll(/uom_valueArea/ig, "RegEx").replaceAll(/date_valueArea/ig, "RegEx").replaceAll(/time_valueArea/ig, "RegEx")
			}
		})
		openNotification(newstr1)

	}


	const handleValuesChange = (changedValues, values) => {
		// console.log("changedValues", changedValues, values)
	};
	const parameterValuesChange = (changedValues, values) => {
		setParameterFormData(values.users)
	};
	const close = () => {
		console.log(
			'Notification was closed. Either the close button was clicked or duration time elapsed.',
		);
	};
	/* istanbul ignore next */
	const openNotification = (val) => {
		const key = `open${Date.now()}`;
		const btn = (
			<Button type="primary" size="small" onClick={() => notification.close(key)}>
				Confirm
			</Button>
		);
		let disc = formValues[activeKey]?.name == "" || formValues[activeKey]?.name == undefined ?
			'Please Enter Name ' : 'Please Enter Method'
		notification.open({
			message: 'Error',
			description: val ? val : disc,
			btn,
			key,
			style: { zIndex: 99999 },
			type: "error",
			placement: "top",
			onClose: close,
		});
	};
	/* istanbul ignore next */
	const findTemplate = async () => {
		dispatch(showLoader());
		if (localStorage.getItem("test_enabled") == null) {
			var req = {
				extraction_type: "all",
				extraction_filename: `${params?.file?.split('.pdf')[0]}_page-0.jpeg.json`,
				templateInfo: { pbrTemplateInfo: [], pbrPageIdentifier: [] },
				product_num: matBatch?.material_num,
				batch_num: matBatch?.batch,
				site_code: matBatch?.site
			}
		} else {
			req = {}
		}
		if (localStorage.getItem("test_enabled") == null) {/* istanbul ignore next */
			var obj = {
				filename: params?.file,
				name: formValues[activeKey]?.name,
				method: formValues[activeKey]?.method,
				page_name: formValues[activeKey]?.pageIdValue,
				param_value_direction: formValues[activeKey]?.directions,
				param_value_regex: parameterFormData[activeKey]?.regex,
				settings: formValues[activeKey]?.advance_setting ? formValues[activeKey]?.advance_setting[0] : {}
			}
			if (formValues[activeKey]?.values) {
				obj['color'] = "blue",
					obj['param_key_height'] = (formValues[activeKey]?.values?.anchorCoords[3] - formValues[activeKey]?.values?.anchorCoords[1]) / imageHeight
				obj['param_key_left'] = formValues[activeKey]?.values?.anchorCoords[0] / imageWidth
				obj['param_key_text'] = formValues[activeKey]?.values?.anchorValue
				obj['param_key_top'] = formValues[activeKey]?.values?.anchorCoords[1] / imageHeight
				obj['param_key_width'] = (formValues[activeKey]?.values?.anchorCoords[2] - formValues[activeKey]?.values?.anchorCoords[0]) / imageWidth
				obj['param_page'] = 1
				obj['param_snippet_id'] = formValues[activeKey]?.values?.snippetID
				obj['param_value_height'] = (formValues[activeKey]?.values?.valueCoords[3] - formValues[activeKey]?.values?.valueCoords[1]) / imageHeight
				obj['param_value_left'] = formValues[activeKey]?.values?.valueCoords[0] / imageWidth
				obj['param_value_text'] = formValues[activeKey]?.values?.anchorId
				obj['param_value_top'] = formValues[activeKey]?.values?.valueCoords[1] / imageHeight
				obj['param_value_width'] = (formValues[activeKey]?.values?.valueCoords[2] - formValues[activeKey]?.values?.valueCoords[0]) / imageWidth
				obj['param_value_rule'] = {
					rule_name: parameterFormData[activeKey]?.param_rule, regex_text: parameterFormData[activeKey]?.param_valueArea,
					range_min: parameterFormData[activeKey]?.param_min, range_max: parameterFormData[activeKey]?.param_max,
					factor: parameterFormData[activeKey]?.param_valueTransformation, transformation: parameterFormData[activeKey]?.param_transformation
				}
			}
			if (formValues[activeKey]?.unitValues) {
				obj['uom_key_height'] = (formValues[activeKey]?.unitValues?.coords[3] - formValues[activeKey]?.unitValues?.coords[1]) / imageHeight
				obj['uom_key_left'] = formValues[activeKey]?.unitValues?.coords[0] / imageWidth
				obj['uom_key_text'] = formValues[activeKey]?.unitValues?.unitAnchor
				obj['uom_key_top'] = formValues[activeKey]?.unitValues?.coords[1] / imageHeight
				obj['uom_key_width'] = (formValues[activeKey]?.unitValues?.coords[2] - formValues[activeKey]?.unitValues?.coords[0]) / imageWidth
				obj['uom_page'] = 1
				obj['uom_snippet_id'] = formValues[activeKey]?.unitValues?.snippetID
				obj['uom_value_height'] = (formValues[activeKey]?.unitValues?.valueCoords[3] - formValues[activeKey]?.unitValues?.valueCoords[1]) / imageHeight
				obj['uom_value_left'] = formValues[activeKey]?.unitValues?.valueCoords[0] / imageWidth
				obj['uom_value_text'] = formValues[activeKey]?.unitValues?.unitId
				obj['uom_value_top'] = formValues[activeKey]?.unitValues?.valueCoords[1] / imageHeight
				obj['uom_value_width'] = (formValues[activeKey]?.unitValues?.valueCoords[2] - formValues[activeKey]?.unitValues?.valueCoords[0]) / imageWidth
				obj['uom_value_rule'] = {
					rule_name: parameterFormData[activeKey]?.uom_rule, regex_text: parameterFormData[activeKey]?.uom_valueArea,
					range_min: parameterFormData[activeKey]?.uom_min, range_max: parameterFormData[activeKey]?.uom_max,
					factor: parameterFormData[activeKey]?.uom_valueTransformation, transformation: parameterFormData[activeKey]?.uom_transformation
				}
			}
			if (formValues[activeKey]?.timeValues) {
				obj['time_key_height'] = (formValues[activeKey]?.timeValues?.coords[3] - formValues[activeKey]?.timeValues?.coords[1]) / imageHeight
				obj['time_key_left'] = formValues[activeKey]?.timeValues?.coords[0] / imageWidth
				obj['time_key_text'] = formValues[activeKey]?.timeValues?.timeAnchor
				obj['time_key_top'] = formValues[activeKey]?.timeValues?.coords[1] / imageHeight
				obj['time_key_width'] = (formValues[activeKey]?.timeValues?.coords[2] - formValues[activeKey]?.timeValues?.coords[0]) / imageWidth
				obj['time_page'] = 1
				obj['time_snippet_id'] = formValues[activeKey]?.timeValues?.snippetID
				obj['time_value_height'] = (formValues[activeKey]?.timeValues?.valueCoords[3] - formValues[activeKey]?.timeValues?.valueCoords[1]) / imageHeight
				obj['time_value_left'] = formValues[activeKey]?.timeValues?.valueCoords[0] / imageWidth
				obj['time_value_text'] = formValues[activeKey]?.timeValues?.timeId
				obj['time_value_top'] = formValues[activeKey]?.timeValues?.valueCoords[1] / imageHeight
				obj['time_value_width'] = (formValues[activeKey]?.timeValues?.valueCoords[2] - formValues[activeKey]?.timeValues?.valueCoords[0]) / imageWidth
				obj['time_value_rule'] = {
					rule_name: parameterFormData[activeKey]?.time_rule, regex_text: parameterFormData[activeKey]?.time_valueArea,
					range_min: parameterFormData[activeKey]?.time_min, range_max: parameterFormData[activeKey]?.time_max,
					factor: parameterFormData[activeKey]?.time_valueTransformation, transformation: parameterFormData[activeKey]?.time_transformation
				}
			}
			if (formValues[activeKey]?.dateValues) {
				obj['date_key_height'] = (formValues[activeKey]?.dateValues?.coords[3] - formValues[activeKey]?.dateValues?.coords[1]) / imageHeight
				obj['date_key_left'] = formValues[activeKey]?.dateValues?.coords[0] / imageWidth
				obj['date_key_text'] = formValues[activeKey]?.dateValues?.dateAnchor
				obj['date_key_top'] = formValues[activeKey]?.dateValues?.coords[1] / imageHeight
				obj['date_key_width'] = (formValues[activeKey]?.dateValues?.coords[2] - formValues[activeKey]?.dateValues?.coords[0]) / imageWidth
				obj['date_page'] = 1
				obj['date_snippet_id'] = formValues[activeKey]?.dateValues?.snippetID
				obj['date_value_height'] = (formValues[activeKey]?.dateValues?.valueCoords[3] - formValues[activeKey]?.dateValues?.valueCoords[1]) / imageHeight
				obj['date_value_left'] = formValues[activeKey]?.dateValues?.valueCoords[0] / imageWidth
				obj['date_value_text'] = formValues[activeKey]?.dateValues?.dateId
				obj['date_value_top'] = formValues[activeKey]?.dateValues?.valueCoords[1] / imageHeight
				obj['date_value_width'] = (formValues[activeKey]?.dateValues?.valueCoords[2] - formValues[activeKey]?.dateValues?.valueCoords[0]) / imageWidth
				obj['date_value_rule'] = {
					rule_name: parameterFormData[activeKey]?.date_rule, regex_text: parameterFormData[activeKey]?.date_valueArea,
					range_min: parameterFormData[activeKey]?.date_min, range_max: parameterFormData[activeKey]?.date_max,
					factor: parameterFormData[activeKey]?.date_valueTransformation, transformation: parameterFormData[activeKey]?.date_transformation
				}
			}
			if (formValues[activeKey]?.selection_method) {
				obj["param_value_list"] = {
					"param_value_height": [],
					"param_value_left": [],
					"param_value_text": [],
					"param_value_top": [],
					"param_value_width": [],
					"param_value_snippet_id": [],
				}
				formValues[activeKey].selection_method.forEach(item => {
					obj["param_value_list"]['param_value_height'].push((item?.coords[3] - item?.coords[1]) / imageHeight)
					obj["param_value_list"]['param_value_left'].push(item?.coords[0] / imageWidth)
					obj["param_value_list"]['param_value_text'].push(item?.selectionVal)
					obj["param_value_list"]['param_value_top'].push(item?.coords[1] / imageHeight)
					obj["param_value_list"]['param_value_width'].push((item?.coords[2] - item?.coords[0]) / imageWidth)
					obj["param_value_list"]['param_value_snippet_id'].push(item?.snippetID)
				})

			}
			let pageArr = []
			if (pageIdFormValues) {
				pageIdFormValues.forEach(item => {
					if (item != undefined) {
						let obj = { name: "", keys: [] }
						Object.entries(item).forEach(item1 => {
							if (item1[0] != "name" && item1[0] != "keyCount") {
								obj.keys.push(item1[1])
							}
							if (item1[0] === "name") {
								obj.name = item1[1]
							}
						})
						pageArr.push(obj)
					}
				})
			}
			req.templateInfo.pbrTemplateInfo.push(obj)
			req.templateInfo.pbrPageIdentifier = pageArr
		}

		// _reqBatch.templateInfo.pbrTemplateInfo = arr;
		// _reqBatch.templateInfo.pbrPageIdentifier = pageIdentifierData;
		let res = await findParameter(req)
		if (res?.found_file_list?.length > 0) {
			dispatch(showNotification('success', res?.message))
			setFileList(res.found_file_list)
			setSearchedFileList(res.searched_file_list)
			dispatch(hideLoader());

		} else {
			setFileList(res.found_file_list)
			setSearchedFileList(res.searched_file_list)
			dispatch(showNotification('error', res.message))
			dispatch(hideLoader());

		}

	}
	/* istanbul ignore next */
	const showModal = async (flag) => {
		if (flag) {
			setIsModalVisible(true);
		}
		if (!showRowColIdentifier) {
			dispatch(showLoader());
			setTableLoading(true)
			var req1 = {
				extraction_type: "custom",
				templateInfo: { pbrTemplateInfo: [], pbrPageIdentifier: [] },
				extraction_filename: `${params?.file?.split('.pdf')[0]}_page-${pageNumber - 1}.jpeg.json`,
				product_num: matBatch?.material_num,
				batch_num: matBatch?.batch,
				site_code: matBatch?.site
			}
			var arr = []
			formValues.forEach((ele, index) => {
				var obj = {
					filename: params?.file,
					name: ele.name,
					page_name: ele?.pageIdValue,
					method: ele.method,
					param_value_direction: ele?.directions,
					param_value_regex: parameterFormData[index]?.regex,
					settings: ele?.advance_setting ? ele?.advance_setting[0] : {},
					param_value_type: "checkbox"

				}
				if (ele.values) {
					obj['color'] = "blue"
					obj['param_key_height'] = (ele?.values?.anchorCoords[3] - ele?.values?.anchorCoords[1]) / imageHeight
					obj['param_key_left'] = ele?.values?.anchorCoords[0] / imageWidth
					obj['param_key_text'] = ele?.values?.anchorValue
					obj['param_key_top'] = ele?.values?.anchorCoords[1] / imageHeight
					obj['param_key_width'] = (ele?.values?.anchorCoords[2] - ele?.values?.anchorCoords[0]) / imageWidth
					obj['param_page'] = 1
					obj['param_key_snippet_id'] = ele?.values?.snippetID
					obj['param_value_height'] = (ele?.values?.valueCoords[3] - ele?.values?.valueCoords[1]) / imageHeight
					obj['param_value_left'] = ele?.values?.valueCoords[0] / imageWidth
					obj['param_value_text'] = ele?.values?.anchorId
					obj['param_value_top'] = ele?.values?.valueCoords[1] / imageHeight
					obj['param_value_width'] = (ele?.values?.valueCoords[2] - ele?.values?.valueCoords[0]) / imageWidth
					obj['param_value_snippet_id'] = ele?.values?.valueSnippetID
					obj['param_value_rule'] = {
						rule_name: parameterFormData[index]?.param_rule, regex_text: parameterFormData[index]?.param_valueArea,
						range_min: parameterFormData[index]?.param_min, range_max: parameterFormData[index]?.param_max,
						factor: parameterFormData[index]?.param_valueTransformation, transformation: parameterFormData[index]?.param_transformation
					}

				}
				if (ele.unitValues) {
					obj['uom_key_height'] = (ele?.unitValues?.coords[3] - ele?.unitValues?.coords[1]) / imageHeight
					obj['uom_key_left'] = ele?.unitValues?.coords[0] / imageWidth
					obj['uom_key_text'] = ele?.unitValues?.unitAnchor
					obj['uom_key_top'] = ele?.unitValues?.coords[1] / imageHeight
					obj['uom_key_width'] = (ele?.unitValues?.coords[2] - ele?.unitValues?.coords[0]) / imageWidth
					obj['uom_page'] = 1
					obj['uom_key_snippet_id'] = ele?.unitValues?.snippetID
					obj['uom_value_height'] = (ele?.unitValues?.valueCoords[3] - ele?.unitValues?.valueCoords[1]) / imageHeight
					obj['uom_value_left'] = ele?.unitValues?.valueCoords[0] / imageWidth
					obj['uom_value_text'] = ele?.unitValues?.unitId
					obj['uom_value_top'] = ele?.unitValues?.valueCoords[1] / imageHeight
					obj['uom_value_width'] = (ele?.unitValues?.valueCoords[2] - ele?.unitValues?.valueCoords[0]) / imageWidth
					obj['uom_value_snippet_id'] = ele?.unitValues?.valueSnippetID
					obj['uom_value_rule'] = {
						rule_name: parameterFormData[index]?.uom_rule, regex_text: parameterFormData[index]?.uom_valueArea,
						range_min: parameterFormData[index]?.uom_min, range_max: parameterFormData[index]?.uom_max,
						factor: parameterFormData[index]?.uom_valueTransformation, transformation: parameterFormData[index]?.uom_transformation
					}

				}
				if (ele.timeValues) {
					obj['time_key_height'] = (ele?.timeValues?.coords[3] - ele?.timeValues?.coords[1]) / imageHeight
					obj['time_key_left'] = ele?.timeValues?.coords[0] / imageWidth
					obj['time_key_text'] = ele?.timeValues?.timeAnchor
					obj['time_key_top'] = ele?.timeValues?.coords[1] / imageHeight
					obj['time_key_width'] = (ele?.timeValues?.coords[2] - ele?.timeValues?.coords[0]) / imageWidth
					obj['time_page'] = 1
					obj['time_key_snippet_id'] = ele?.timeValues?.snippetID
					obj['time_value_height'] = (ele?.timeValues?.valueCoords[3] - ele?.timeValues?.valueCoords[1]) / imageHeight
					obj['time_value_left'] = ele?.timeValues?.valueCoords[0] / imageWidth
					obj['time_value_text'] = ele?.timeValues?.timeId
					obj['time_value_top'] = ele?.timeValues?.valueCoords[1] / imageHeight
					obj['time_value_width'] = (ele?.timeValues?.valueCoords[2] - ele?.timeValues?.valueCoords[0]) / imageWidth
					obj['time_value_snippet_id'] = ele?.timeValues?.valueSnippetID
					obj['time_value_rule'] = {
						rule_name: parameterFormData[index]?.time_rule, regex_text: parameterFormData[index]?.time_valueArea,
						range_min: parameterFormData[index]?.time_min, range_max: parameterFormData[index]?.time_max,
						factor: parameterFormData[index]?.time_valueTransformation, transformation: parameterFormData[index]?.time_transformation
					}

				}
				if (ele.dateValues) {
					obj['date_key_height'] = (ele?.dateValues?.coords[3] - ele?.dateValues?.coords[1]) / imageHeight
					obj['date_key_left'] = ele?.dateValues?.coords[0] / imageWidth
					obj['date_key_text'] = ele?.dateValues?.dateAnchor
					obj['date_key_top'] = ele?.dateValues?.coords[1] / imageHeight
					obj['date_key_width'] = (ele?.dateValues?.coords[2] - ele?.dateValues?.coords[0]) / imageWidth
					obj['date_page'] = 1
					obj['date_key_snippet_id'] = ele?.dateValues?.snippetID
					obj['date_value_height'] = (ele?.dateValues?.valueCoords[3] - ele?.dateValues?.valueCoords[1]) / imageHeight
					obj['date_value_left'] = ele?.dateValues?.valueCoords[0] / imageWidth
					obj['date_value_text'] = ele?.dateValues?.dateId
					obj['date_value_top'] = ele?.dateValues?.valueCoords[1] / imageHeight
					obj['date_value_width'] = (ele?.dateValues?.valueCoords[2] - ele?.dateValues?.valueCoords[0]) / imageWidth
					obj['date_value_snippet_id'] = ele?.dateValues?.valueSnippetID
					obj['date_value_rule'] = {
						rule_name: parameterFormData[index]?.date_rule, regex_text: parameterFormData[index]?.date_valueArea,
						range_min: parameterFormData[index]?.date_min, range_max: parameterFormData[index]?.date_max,
						factor: parameterFormData[index]?.date_valueTransformation, transformation: parameterFormData[index]?.date_transformation
					}
				}
				if (ele?.selection_method) {
					obj["param_value_list"] = {
						"param_value_height": [],
						"param_value_left": [],
						"param_value_text": [],
						"param_value_top": [],
						"param_value_width": [],
						"param_value_snippet_id": [],
					}
					ele.selection_method.forEach(item => {
						obj["param_value_list"]['param_value_height'].push((item?.coords[3] - item?.coords[1]) / imageHeight)
						obj["param_value_list"]['param_value_left'].push(item?.coords[0] / imageWidth)
						obj["param_value_list"]['param_value_text'].push(item?.selectionVal)
						obj["param_value_list"]['param_value_top'].push(item?.coords[1] / imageHeight)
						obj["param_value_list"]['param_value_width'].push((item?.coords[2] - item?.coords[0]) / imageWidth)
						obj["param_value_list"]['param_value_snippet_id'].push(item?.snippetID)
					})

				}
				arr.push(obj);
			});
			let pageArr = []
			if (pageIdFormValues) {
				pageIdFormValues.forEach(item => {
					if (item != undefined) {
						let obj = { name: "", keys: [] }
						Object.entries(item).forEach(item1 => {
							if (item1[0] != "name" && item1[0] != "keyCount") {
								obj.keys.push(item1[1])
							}
							if (item1[0] === "name") {
								obj.name = item1[1]
							}
						})
						pageArr.push(obj)
					}
				})
			}
			req1.templateInfo.pbrTemplateInfo = arr;
			req1.templateInfo.pbrPageIdentifier = pageArr;
			let res = await findParameter(req1)
			if (res?.found_file_list?.length > 0) {
				setModalData(res.extraction)
				dispatch(showNotification('success', res?.message))
			} else {
				setModalData(res.extraction)
				dispatch(showNotification('error', res?.message))
			}
			setTableLoading(false)
			dispatch(hideLoader());
		} else {
			setTriggerPreview(true)
			setTableLoading(false)
			dispatch(hideLoader());
		}
	};
	/* istanbul ignore next */
	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setTriggerPreview(false)
		setModalColumns(initialColumns)

	};

	/* istanbul ignore next */
	const handleMenuChange = (item) => {
		setSelectedMode(item)
		for (let i = 0; i < 2; i++) {
			setTimeout(() => {
				getBoundingBoxDataInfo(imageWidth, imageHeight, item, pageNumber - 1);
			}, i * 1000)
		}
	}

	const handleClose = () => {
		setIsPublish(false);
	};
	/* istanbul ignore next */
	const PublishResponse = (res) => {
		setPublishResponse(res);
		setTemplateStatus(res.rep_stauts);
	};

	/* istanbul ignore next */
	const handlePageChange = (val) => {
		// setDisplayImage("")
		// setAreasMap({ ...areasMap, areas: [] });
		if (val < 1) {
			dispatch(showNotification('error', 'Minium page 1'))
		} else {
			if (val > pageLimit) {
				dispatch(showNotification('error', `Maximum page ${pageLimit}`))
			} else {
				getImage(val, null)
				setPageNumber(val)
				for (let i = 0; i < 2; i++) {
					setTimeout(() => {
						getBoundingBoxDataInfo(imageWidth, imageHeight, selectedMode, val - 1);
					}, i * 1000)

				}
				dispatch(hideLoader());
			}

		}

	}
	/* istanbul ignore next */
	const handlePageTextChange = debounce((val) => {
		if (isNaN(Number(val))) {
			dispatch(showNotification('error', "Please enter valid Page Number"))
		} else if (val === "") {
			// dispatch(showNotification('error', `Minium page number 1`))
			setPageNumber(val)
		} else if (Number(val) > pageLimit) {
			dispatch(showNotification('error', `Maximum page ${pageLimit}`))
		}
		else if (Number(val) < 1) {
			dispatch(showNotification('error', 'Minium page 1'))
		} else {
			let num = Number(val)
			setPageNumber(num)
		}

	}, 300)

	const handlePageChangeEnter = () => {
		getImage(pageNumber, null)
		for (let i = 0; i < 2; i++) {
			setTimeout(() => {
				getBoundingBoxDataInfo(imageWidth, imageHeight, selectedMode, pageNumber - 1);
			}, i * 1000)
		}
		dispatch(hideLoader());
	}

	const genExtra = (remove, name, key, restfield) => (
		<div>
			<Tooltip title={'Go to page'}>
				<ArrowRightOutlined style={{marginRight:10}} onClick={() => {
					formValues[name]?.page_num ?
						handlePageChange(formValues[name]?.page_num) :
						dispatch(showNotification('error', "Create Parameter with Anchor and Value"))
				}} />
			</Tooltip>

			<DeleteOutlined
				id="deleteParameter"
				onClick={event => {
					// If you don't want click extra trigger collapse, you can prevent this:
					remove(name)
					let arr = [...formValues]
					arr.splice(name, 1)
					setFormValues(arr)
					// event.stopPropagation();
				}}
			/>
		</div>

	);
	/* istanbul ignore next */
	function initDraw(canvas) {
		function setMousePosition(e) {
			var ev = e || window.event; //Moz || IE
			if (ev.pageX) { //Moz
				mouse.x = ev.pageX + window.pageXOffset;
				mouse.y = ev.pageY + window.pageYOffset;
			} else if (ev.clientX) { //IE
				mouse.x = ev.clientX + document.body.scrollLeft;
				mouse.y = ev.clientY + document.body.scrollTop;
			}
		};

		var mouse = {
			x: 0,
			y: 0,
			startX: 0,
			startY: 0
		};
		var element = null;

		canvas.onmousemove = function (e) {
			setMousePosition(e);
			if (element !== null) {
				element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
				element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
				element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
				element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
			}
		}

		canvas.onclick = function (e) {
			if (element !== null) {
				element = null;
				canvas.style.cursor = "default";
			} else {
				mouse.startX = mouse.x;
				mouse.startY = mouse.y;
				element = document.createElement('div');
				element.className = 'rectangle'
				element.style.left = mouse.x + 'px';
				element.style.top = mouse.y + 'px';
				// element.style.position = "sticky";
				canvas.appendChild(element)
				canvas.style.cursor = "crosshair";
			}
		}
	}
	/* istanbul ignore next */
	const handleDrawSnippet = () => {
		initDraw(document.getElementById('drawRectangle'));
	}
	/* istanbul ignore next */
	const handleSideState = () => {
		setTriggerUpdate(true)
		for (let i = 0; i < 2; i++) {
			setTimeout(() => {
				getBoundingBoxDataInfo(imageWidth, imageHeight, "TABLE", pageNumber - 1);
			}, i * 1000)
		}
	}

	const handleWorkFlowApprove = async () => {
		try {
			dispatch(showLoader());
			let login_response = JSON.parse(localStorage.getItem('login_details'))
			let req = {
				message: '',
				page: pageNumber,
				status: "APRD",
				template_id: params?.temp_disp_id,
				template_version: templateVersion,
				user_id: `${login_response?.firstname} ${login_response?.lastname}`
			}
			let res = await workflowTemplateReject(req)
			if (res.Status == 202) {
				setIsModalOpen(false)
				dispatch(hideLoader());
				dispatch(showNotification('success', res?.Message));
			}

		} catch (err) {
			console.log("err", err)
		}
	}

	const handleChangeFileOk = (val) => {
		if (params.temp_disp_id) {
			history.push(`${match.url}/${params.temp_disp_id ? params.temp_disp_id : `Untitled`}?file=${val ? val : changeFileValue}&temp_disp_id=${params.temp_disp_id ? params.temp_disp_id : null}&tempalteName=${params.tempalteName ? params.tempalteName : null}&fromScreen=Workspace&version=${params.version ? params.version : null}`);
		} else {
			history.push(`${match.url}/Untitled?file=${val ? val : changeFileValue}&tempalteName=${params.tempalteName}&fromScreen=Workspace`);
		}
		getImage(null, val ? val : changeFileValue)
		for (let i = 0; i < 2; i++) {
			setTimeout(() => {
				getBoundingBoxDataInfo(imageWidth, imageHeight, selectedMode, pageNumber - 1, {}, val ? val : changeFileValue);
			}, i * 1000)
		}
		if (params?.temp_disp_id) {
			setSaveAsFlag(false)
		}

		setChangeFile(false)
	}

	const handleSaveAs = async () => {
		if (saveAsName.length > 0) {
			try {
				dispatch(showLoader());
				if (formValues.length > 0 || formTableData.length > 0) {
					let login_response = JSON.parse(localStorage.getItem('login_details'));
					let _reqBatch = {
						pbrTemplateName: saveAsName,
						custKey: '1000',
						pbrTemplateVersion: 1,
						// pbrTemplateStatus: 'DRFT',
						createdBy: login_response?.email_id,
						changedBy: params.temp_disp_id ? login_response?.email_id : "",
						templateInfo: { pbrTemplateInfo: [], pbrPageIdentifier: {}, pbrTableInfo: [], tableData: formTableData, filename: params?.file, },
						material: matBatch?.material_num,
						batch: matBatch?.batch,
						siteCode: matBatch?.site,
						actionType: "create",
						pbrDisplayId: "",
						pbrTempId: 0,
						pbrTemplateStatus: "DRFT"
					};
					let arr = [];
					formValues.forEach((ele, index) => {
						let obj = {
							method: ele.method,
							filename: params?.file,
							name: ele.name,
							page_name: ele?.pageIdValue,
							param_value_direction: ele?.directions,
							param_value_regex: parameterFormData[index]?.regex,
							settings: ele?.advance_setting ? ele?.advance_setting[0] : {}
						}
						if (ele.values) {
							obj['color'] = "blue"
							obj['param_key_height'] = (ele?.values?.anchorCoords[3] - ele?.values?.anchorCoords[1]) / imageHeight
							obj['param_key_left'] = ele?.values?.anchorCoords[0] / imageWidth
							obj['param_key_text'] = ele?.values?.anchorValue
							obj['param_key_top'] = ele?.values?.anchorCoords[1] / imageHeight
							obj['param_key_width'] = (ele?.values?.anchorCoords[2] - ele?.values?.anchorCoords[0]) / imageWidth
							obj['param_page'] = ele?.page_num
							obj['param_key_snippet_id'] = ele?.values?.snippetID
							obj['param_value_height'] = (ele?.values?.valueCoords[3] - ele?.values?.valueCoords[1]) / imageHeight
							obj['param_value_left'] = ele?.values?.valueCoords[0] / imageWidth
							obj['param_value_text'] = ele?.values?.anchorId
							obj['param_value_top'] = ele?.values?.valueCoords[1] / imageHeight
							obj['param_value_width'] = (ele?.values?.valueCoords[2] - ele?.values?.valueCoords[0]) / imageWidth
							obj['param_value_snippet_id'] = ele?.values?.valueSnippetID
							obj['param_value_rule'] = {
								rule_name: parameterFormData[index]?.param_rule, regex_text: parameterFormData[index]?.param_valueArea,
								range_min: parameterFormData[index]?.param_min, range_max: parameterFormData[index]?.param_max,
								factor: parameterFormData[index]?.param_valueTransformation, transformation: parameterFormData[index]?.param_transformation
							}
						}
						if (ele.unitValues) {
							obj['uom_key_height'] = (ele?.unitValues?.coords[3] - ele?.unitValues?.coords[1]) / imageHeight
							obj['uom_key_left'] = ele?.unitValues?.coords[0] / imageWidth
							obj['uom_key_text'] = ele?.unitValues?.unitAnchor
							obj['uom_key_top'] = ele?.unitValues?.coords[1] / imageHeight
							obj['uom_key_width'] = (ele?.unitValues?.coords[2] - ele?.unitValues?.coords[0]) / imageWidth
							obj['uom_page'] = ele?.page_num
							obj['uom_key_snippet_id'] = ele?.unitValues?.snippetID
							obj['uom_value_height'] = (ele?.unitValues?.valueCoords[3] - ele?.unitValues?.valueCoords[1]) / imageHeight
							obj['uom_value_left'] = ele?.unitValues?.valueCoords[0] / imageWidth
							obj['uom_value_text'] = ele?.unitValues?.unitId
							obj['uom_value_top'] = ele?.unitValues?.valueCoords[1] / imageHeight
							obj['uom_value_width'] = (ele?.unitValues?.valueCoords[2] - ele?.unitValues?.valueCoords[0]) / imageWidth
							obj['uom_value_snippet_id'] = ele?.unitValues?.valueSnippetID
							obj['uom_value_rule'] = {
								rule_name: parameterFormData[index]?.uom_rule, regex_text: parameterFormData[index]?.uom_valueArea,
								range_min: parameterFormData[index]?.uom_min, range_max: parameterFormData[index]?.uom_max,
								factor: parameterFormData[index]?.uom_valueTransformation, transformation: parameterFormData[index]?.uom_transformation
							}

						}
						if (ele.timeValues) {
							obj['time_key_height'] = (ele?.timeValues?.coords[3] - ele?.timeValues?.coords[1]) / imageHeight
							obj['time_key_left'] = ele?.timeValues?.coords[0] / imageWidth
							obj['time_key_text'] = ele?.timeValues?.timeAnchor
							obj['time_key_top'] = ele?.timeValues?.coords[1] / imageHeight
							obj['time_key_width'] = (ele?.timeValues?.coords[2] - ele?.timeValues?.coords[0]) / imageWidth
							obj['time_page'] = ele?.page_num
							obj['time_key_snippet_id'] = ele?.timeValues?.snippetID
							obj['time_value_height'] = (ele?.timeValues?.valueCoords[3] - ele?.timeValues?.valueCoords[1]) / imageHeight
							obj['time_value_left'] = ele?.timeValues?.valueCoords[0] / imageWidth
							obj['time_value_text'] = ele?.timeValues?.timeId
							obj['time_value_top'] = ele?.timeValues?.valueCoords[1] / imageHeight
							obj['time_value_width'] = (ele?.timeValues?.valueCoords[2] - ele?.timeValues?.valueCoords[0]) / imageWidth
							obj['time_value_snippet_id'] = ele?.timeValues?.valueSnippetID
							obj['time_value_rule'] = {
								rule_name: parameterFormData[index]?.time_rule, regex_text: parameterFormData[index]?.time_valueArea,
								range_min: parameterFormData[index]?.time_min, range_max: parameterFormData[index]?.time_max,
								factor: parameterFormData[index]?.time_valueTransformation, transformation: parameterFormData[index]?.time_transformation
							}

						}
						if (ele.dateValues) {
							obj['date_key_height'] = (ele?.dateValues?.coords[3] - ele?.dateValues?.coords[1]) / imageHeight
							obj['date_key_left'] = ele?.dateValues?.coords[0] / imageWidth
							obj['date_key_text'] = ele?.dateValues?.dateAnchor
							obj['date_key_top'] = ele?.dateValues?.coords[1] / imageHeight
							obj['date_key_width'] = (ele?.dateValues?.coords[2] - ele?.dateValues?.coords[0]) / imageWidth
							obj['date_page'] = ele?.page_num
							obj['date_key_snippet_id'] = ele?.dateValues?.snippetID
							obj['date_value_height'] = (ele?.dateValues?.valueCoords[3] - ele?.dateValues?.valueCoords[1]) / imageHeight
							obj['date_value_left'] = ele?.dateValues?.valueCoords[0] / imageWidth
							obj['date_value_text'] = ele?.dateValues?.dateId
							obj['date_value_top'] = ele?.dateValues?.valueCoords[1] / imageHeight
							obj['date_value_width'] = (ele?.dateValues?.valueCoords[2] - ele?.dateValues?.valueCoords[0]) / imageWidth
							obj['date_value_snippet_id'] = ele?.dateValues?.valueSnippetID
							obj['date_value_rule'] = {
								rule_name: parameterFormData[index]?.date_rule, regex_text: parameterFormData[index]?.date_valueArea,
								range_min: parameterFormData[index]?.date_min, range_max: parameterFormData[index]?.date_max,
								factor: parameterFormData[index]?.date_valueTransformation, transformation: parameterFormData[index]?.date_transformation
							}

						}
						if (ele?.selection_method) {
							obj["selection_method"] = {
								"param_value_height": [],
								"param_value_left": [],
								"param_value_text": [],
								"param_value_top": [],
								"param_value_width": [],
								"param_value_snippet_id": [],
							}
							ele.selection_method.forEach(item => {
								obj["selection_method"]['param_value_height'].push((item?.coords[3] - item?.coords[1]) / imageHeight)
								obj["selection_method"]['param_value_left'].push(item?.coords[0] / imageWidth)
								obj["selection_method"]['param_value_text'].push(item?.selectionVal)
								obj["selection_method"]['param_value_top'].push(item?.coords[1] / imageHeight)
								obj["selection_method"]['param_value_width'].push((item?.coords[2] - item?.coords[0]) / imageWidth)
								obj["selection_method"]['param_value_snippet_id'].push(item?.snippetID)
							})

						}
						arr.push(obj);

					});



					let pageArr = []
					if (pageIdFormValues) {
						pageIdFormValues?.forEach(item => {
							if (item != undefined) {
								let obj = { name: "", keys: [] }
								Object.entries(item).forEach(item1 => {
									if (item1[0] != "name" && item1[0] != "keyCount") {
										obj.keys.push(item1[1])
									}
									if (item1[0] === "name") {
										obj.name = item1[1]
									}
								})
								pageArr.push(obj)
							}
						})
					}

					_reqBatch.templateInfo.pbrTemplateInfo = arr;
					_reqBatch.templateInfo.pbrPageIdentifier = pageArr;
					let tableRer = tableDataReq()
					_reqBatch.templateInfo.pbrTableInfo = tableRer;
					//api call
					const batchRes = await savePbrTemplate(_reqBatch);
					if (batchRes.Status === 202) {
						let additional = {
							pbrDisplayId: batchRes?.Data?.tempDispId,
							pbrTempId: Number(batchRes?.Data?.tempDispId.replace(/\D/g, '')),
							pbrTemplateStatus: batchRes?.Data?.tempStatus,
							pbrVersion: batchRes?.Data?.tempVersion,
							newTempalteName : saveAsName
						}
						setAdditionalData(additional)
						message.success(batchRes.Message);
						setTemplateId(batchRes?.Data?.tempDispId)
						setTemplateVersion(batchRes?.Data?.tempVersion)
						setTemplateStatus(batchRes?.Data?.tempStatus)
						dispatch(hideLoader());
						dispatch(showNotification('success', batchRes?.Message));
						history.push(`${match.url}/${batchRes?.Data?.tempDispId}?file=${params?.file}&temp_disp_id=${batchRes?.Data?.tempDispId}&tempalteName=${params.tempalteName}&fromScreen=Workspace&version=${batchRes?.Data?.tempVersion}`);
						setSaveAsFlag(true)
						setSaveAsName('')
						setSaveAsModal(false)
						// }

					} else {
						message.error(batchRes.Message);
						dispatch(hideLoader());
						dispatch(showNotification('error', batchRes?.detail));
					}

				} else {
					dispatch(hideLoader());
					openNotification('Create at least one Parameter before save')
				}
			} catch (error) { /* istanbul ignore next */
				dispatch(hideLoader());
				dispatch(showNotification('error', 'No Data Found'));
			}
		} else {
			dispatch(showNotification('error', 'Please Enter Name'));
		}

	}
	
	return (
		<div className='pbr-content-layout' >
			<div className='custom-wrapper pbr-wrapper'>
				<div className='sub-header'>
					<BreadCrumbWrapper
						urlName={`/dashboard/paper_batch_records/${id}`}
						value={templateId ? templateId : "New"}
						data={templateId ? templateId : "New"}
					/>
				</div>
				<div className='sub-header'>
					<div className='sub-header-title'>
						{Object.keys(params) &&
							Object.keys(params).length > 0 &&
							params.fromScreen !== "Workflow" ?
							(<div className='btns'>
								<Button
									className='custom-primary-btn'
									id="saveButton"
									style={{ margin: "0px 16px" }}
									disabled={saveAsFlag}
									onClick={() => setSaveAsModal(true)}
								>Save As</Button>
								<Button className='custom-primary-btn'
									id="saveButton"
									type='default'
									form="myForm"
									key="submit"
									htmlType="submit"
									disabled={params?.fromScreen === "Workflow" ? true : false}>Save</Button>
								<Button
									id="publisgButton"
									className='custom-secondary-btn'
									disabled={templateStatus != "DRFT"}
									style={{ margin: "0px 16px" }}
									onClick={() => {
										setIsPublish(true);
										setApproveReject("P");
									}}>
									Publish
								</Button>

							</div>)
							: (
								<div className='btns'>
									<Button
										className='custom-primary-btn'
										disabled={publishResponse.rep_stauts}
										style={{ marginRight: 10 }}
										onClick={() => {
											setIsPublish(true);
											setApproveReject("R");
											// history.push(`/dashboard/signature_module?status=R&dispId=${templateId}&version=${templateVersion}&screenName=Pbr Creation&appType=PBR`);
										}}>
										Reject
									</Button>
									<Button className='custom-primary-btn'
										style={{ marginRight: 10 }}
										disabled={publishResponse.rep_stauts}
										onClick={() => {
											// history.push(`/dashboard/signature_module?status=A&dispId=${templateId}&version=${templateVersion}&screenName=Pbr Creation&appType=PBR`);
											setIsPublish(true);
											setApproveReject("A");
										}}
									>Approve</Button>
									{/* <Button style={{ marginRight: 10 }} className='custom-secondary-btn'
										onClick={() => { setWorkflowPreviewModal(true) }}
									>Preview</Button> */}
								</div>
							)
						}
					</div>
				</div>
			</div>

			<div className='pbrTemplateRowContainer'>
				<div className='pbrTemplateLeft'>
					<div className='pbrPanel pbrRightPanel'>
						<Sider
							trigger={null}
							collapsible
							collapsed={leftPanelCollapsed}
						>
							<span
								className='trigger'
								onClick={toggleLeftCollapsed}
							>
								<img src={panelLeftImg} className='panelImg' />
							</span>
							<Collapse
								accordion
								expandIconPosition='right'
								defaultActiveKey={['1']}
								onChange={(val) => {
									/* istanbul ignore next */
									setMainPanelValue(val)
									if (val == 4) {
										setShowRowColIdentifier(true)
										for (let i = 0; i < 2; i++) {
											setTimeout(() => {
												getBoundingBoxDataInfo(imageWidth, imageHeight, "TABLE", pageNumber - 1)
											}, i * 1000)
										}
										// setSelectedMode("TABLE")
									} else {
										if (showRowColIdentifier) {
											for (let i = 0; i < 2; i++) {
												setTimeout(() => {
													getBoundingBoxDataInfo(imageWidth, imageHeight, "word", pageNumber - 1)
												}, i * 1000)

											}
											setSelectedMode("word")
										}

										setShowRowColIdentifier(false)
									}

								}}

							>
								<Panel header='Template' key='1'>
									<Form onValuesChange={handleValuesChange} name="template_desc" onFinish={onFinish}
										form={templateForm}
										autoComplete="off"
										layout='vertical'
										initialValues={templateFormData}
									>
										<Form.Item
											name='template_id'
											label="Template ID"
											style={{ marginBottom: 10 }}
										>
											<Input disabled />
										</Form.Item>
										<Form.Item
											name='template_name'
											label="Template Name"
											style={{ marginBottom: 10 }}
										>
											<Input disabled />
										</Form.Item>
										<Form.Item
											name='status'
											label="Status"
											style={{ marginBottom: 10 }}
										>
											<Input disabled />
											{/* <Input/> */}
										</Form.Item>
										<Form.Item
											name='material_num'
											label="Material"
											style={{ marginBottom: 10 }}
										>
											<Input disabled />
											{/* <Input/> */}
										</Form.Item>
										<Form.Item
											name='site'
											label="Site"
											style={{ marginBottom: 10 }}
										>
											<Input disabled />
											{/* <Input/> */}
										</Form.Item>
										<Form.Item
											name='version'
											label="Version"
											style={{ marginBottom: 10 }}
										>
											<Input disabled />
											{/* <Input/> */}
										</Form.Item>
										<Form.Item
											name='time_zone'
											label="Time Zone"
											style={{ marginBottom: 10 }}
										>
											<Input disabled />
											{/* <Input/> */}
										</Form.Item>
									</Form>
								</Panel>
								<Panel id="page-Identifier" header='Page Identifier' key='2'>
									<PageIdentifierForm handlePageChange={handlePageChange} pageNumber={pageNumber} pageDragValue={pageDragValue} setPageIdFormValues={setPageIdFormValues}
										handleOnFinishFailed={handleOnFinishFailed} parameterFormFinish={parameterFormFinish}
										initialPageIdentifierData={initialPageIdentifierData} matBatch={matBatch} params={params} />
								</Panel>
								<Panel id="parameter-panel" header='Parameter' key='3'>
									<Form onValuesChange={parameterValuesChange} name="dynamic_form_nest_item" onFinish={parameterFormFinish}
										initialValues={formLoadParameter}
										disabled={params.fromScreen == "Workflow"}
										layout='vertical'
										id="myForm"
										onFinishFailed={handleOnFinishFailed}
										form={parameterForm}
										autoComplete="off">
										<div className='addParameterContainer'>
											<div className='addParameterBlock'>
												<div className='singleParameterBlock'>
													<Form.List name="users">
														{(fields, { add, remove }) => (
															<>
																<Collapse activeKey={activeKey} accordion expandIconPosition='right' onChange={(val) => {
																	/* istanbul ignore next */
																	if (val !== undefined) {
																		setActiveKey(Number(val))
																	} else {
																		setActiveKey(val)
																	}
																	setFileList([])
																	setShowUOM(false)
																	setShowTime(false)
																	setShowDate(false)
																}}>
																	{fields.map(({ key, name, ...restField }) => (

																		// <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
																		<Panel header={parameterFormData[name]?.name ? `${parameterFormData[name]?.name}` : `Parameter ${name + 1} created`} key={`${name}`} extra={params.fromScreen != "Workflow" ? genExtra(remove, name, key, restField) : ""}>
																			<div className='addParameterBlock'>
																				<div className='parameterAdded-block'>
																					<Form.Item
																						{...restField}
																						name={[name, 'name']}
																						label="Name"
																						rules={[{ required: true, message: 'Please enter parameter name' },
																						() => ({
																							validator(_, value) {
																								let flag = false
																								parameterFormData.forEach((item, index) => {
																									if (index != name && item.name === value) {
																										flag = true
																									}
																								})
																								if (flag) {
																									return Promise.reject('Parameter Name cannot be same');
																								}

																								return Promise.resolve();
																							},
																						})]}
																					>
																						<Input
																							placeholder='Enter name'
																							onChange={(
																								e
																							) =>
																								onChangeChart(
																									e,
																									'parameterName',
																									name
																								)
																							}
																						// style={{ marginLeft: 10, width: 200 }}

																						/>
																					</Form.Item>
																					<div style={{ display: "flex", justifyContent: "space-between" }}>
																						<Form.Item
																							{...restField}
																							name={[name, 'method']}
																							label="Method"
																							rules={[{ required: true, message: 'Select Method' }]}
																						>

																							<Select style={{ width: 220 }} placeholder="Select Method" onChange={(e, value) => onChangeChart(e, 'method', name, value)} allowClear={true}>
																								<Option value='absolute_coordinate'>
																									Get By Absolute Coordinate
																								</Option>
																								{/* <Option value='regex'>
																									Get By Regex
																								</Option> */}
																								<Option value='key_value_form'>
																									Get By Form Key Value
																								</Option>
																								<Option value='relative_direction'>
																									Get By Relative Direction
																								</Option>
																								<Option value='absolute_distance'>
																									Get By Absolute Distance
																								</Option>
																								<Option value='selection_method'>
																									Get By Selection Method
																								</Option>
																							</Select>


																						</Form.Item>
																						<InfoCircleOutlined onClick={() => formValues[name]?.method && setAdvancePopup(true)} style={{ marginTop: 36, fontSize: 19, cursor: formValues[name]?.method ? "pointer" : 'not-allowed' }} />

																					</div>

																					{formValues[name]?.method === "regex" &&
																						<Form.Item {...restField}
																							name={[name, 'regex']}
																							rules={[{ required: true, message: 'Enter Regex' }]}
																						// label="AnchorDirection"
																						>

																							<Input placeholder='Enter Regex' />
																						</Form.Item>}
																					{(pageIdDropdownValues.length > 0 || initialPageIdentifierData?.users.length > 0) &&
																						<Form.Item {...restField}
																							name={[name, 'pageIdValue']}
																							label="Page Id"
																							rules={[{ required: true, message: 'Enter pageId' }]}
																						// label="AnchorDirection"
																						>

																							<Select placeholder='Enter PageID' options={pageIdDropdownValues} onChange={(e, value) => onChangeChart(e, 'pageIdValue', name, value)} />
																						</Form.Item>}

																					<p>
																						Value
																					</p>

																					<Form.Item
																						{...restField}
																						name={[name, 'param_key']}
																						style={{ marginBottom: 10 }}
																						rules={[{ required: true, message: 'Enter Anchor Value' }]}
																					>
																						<Input
																							id="form_input1"
																							value={
																								parameterValue[`param${name + 1}`]?.anchorValue
																							}
																							className='uploadSnippetInput'
																							placeholder='Click and select anchor'
																							onClick={(e) => DraggerInputHandlerAnchor(e, "value")}
																							onChange={(
																								e
																							) =>
																								onChangeChart(
																									e,
																									'anchorValue', name
																								)
																							}
																						/>
																					</Form.Item>

																					<span>
																					</span>
																					<Form.Item
																						{...restField}
																						name={[name, 'param_snippet_value']}
																						style={{ marginBottom: 10 }}
																						rules={[{ required: true, message: 'Enter Anchor Snippet Value' }]}
																					>
																						<Input
																							id="form_input2"
																							value={
																								parameterValue[`param${name + 1}`]?.anchorId

																							}
																							className='uploadSnippetInput'
																							placeholder='Click and select snippet'
																							onClick={
																								(e) => DraggerInputHandlerSnippet(e, "value")
																							}
																							onChange={(
																								e
																							) =>
																								onChangeChart(
																									e,
																									'snippetValue', name
																								)
																							}
																						/>
																					</Form.Item>
																					{formValues[name]?.method === "relative_direction" &&
																						<RelativeDirection advancePopup={advancePopup} modalData={modalData} showModal={() => showModal(false)} parameterForm={parameterForm} setParameterFormData={setParameterFormData} parameterFormData={parameterFormData} name={name} setFormValues={setFormValues} formValues={formValues} restField={restField} />
																					}
																					{formValues[name]?.method === "selection_method" &&
																						<SelectionMethodInput selectionDraggedValue={selectionDraggedValue} setSelectionActive={setSelectionActive} parameterForm={parameterForm} setParameterFormData={setParameterFormData} parameterFormData={parameterFormData} name={name} setFormValues={setFormValues} formValues={formValues} restField={restField} />
																					}
																					<div className='parameterAddingBlock parameterValueBlock' style={{ marginTop: formValues[name]?.method === "relative_direction" ? 10 : 5 }}>
																						<Form.Item  {...restField}
																							name={[name, 'param_rule']}
																						>
																							<Select id="rule1" placeholder="Rule" allowClear value={null} onChange={(e, value) => onChangeChart(e, 'param_rule', name, value)}>
																								<Option value='date'>
																									Date
																								</Option>
																								<Option value='range'>
																									Range
																								</Option>
																								<Option value='regex'>
																									RegEx
																								</Option>
																							</Select>
																						</Form.Item>

																						{parameterFormData[name]?.param_rule === "range" ?
																							<Row gutter={8}>
																								<Col span={11}>
																									<Form.Item {...restField}
																										name={[name, 'param_min']}
																										rules={[{ pattern: new RegExp('^[+]?([0-9]{0,})*[.]?([0-9]{0,2})?$', 'g'), message: 'Input is not a number' },
																										{ required: true, message: 'Enter min value' }]}
																									>

																										<Input placeholder='Min' />
																									</Form.Item>
																								</Col>
																								{/* <Col span={1}>-</Col> */}
																								<Col span={12}>
																									<Form.Item {...restField}
																										name={[name, 'param_max']}
																										rules={[{ pattern: new RegExp('^[+]?([0-9]{0,})*[.]?([0-9]{0,2})?$', 'g'), message: 'Input is not a number' },
																										{ required: true, message: 'Enter max value' },
																										() => ({
																											validator(_, value) {
																												if (!value) {
																													return Promise.reject();
																												}
																												if (Number(value) < Number(parameterFormData[name]?.param_min)) {
																													return Promise.reject("Enter value greater then Min");
																												}
																												return Promise.resolve();
																											},
																										})
																										]}
																									>
																										<Input placeholder='Max' />
																									</Form.Item>
																								</Col>
																							</Row> :
																							<Form.Item {...restField}
																								name={[name, 'param_valueArea']}
																								rules={[{ required: parameterFormData[name]?.param_rule ? true : false, message: 'Enter value' }]}>
																								<Input placeholder='Enter expression' />
																							</Form.Item>}

																						<Form.Item  {...restField}
																							name={[name, 'param_transformation']}>
																							<Select placeholder="Trans." allowClear value={null}>
																								<Option value='add'>
																									ADD
																								</Option>
																								<Option value='substract'>
																									Substract
																								</Option>
																								<Option value='multiply'>
																									Multiply
																								</Option>
																								<Option value='divide'>
																									Divide
																								</Option>
																							</Select>
																						</Form.Item>
																						<Form.Item {...restField}
																							name={[name, 'param_valueTransformation']}
																							rules={[{ required: parameterFormData[name]?.param_transformation ? true : false, message: 'Enter transformation' }]}>
																							<Input placeholder='Enter transformation' />
																						</Form.Item>

																					</div>
																					<p>
																						{showUOM ? <MinusSquareTwoTone onClick={() => setShowUOM(false)} /> : <PlusSquareTwoTone onClick={() => setShowUOM(true)} />}
																						UOM
																					</p>
																					<div style={{ display: showUOM ? "" : "none" }}>
																						<Input
																							id="form_input3"
																							value={
																								parameterValue[`param${name + 1}`]?.unitAnchor
																							}
																							style={{ marginBottom: 10 }}
																							className='uploadSnippetInput'
																							placeholder='Click and select anchor'
																							onClick={
																								(e) => DraggerInputHandlerAnchor(e, "unit")
																							}
																							onChange={(
																								e
																							) =>
																								onChangeChart(
																									e,
																									'uomanchorValue', name
																								)
																							}
																						/>

																						<Input
																							id="form_input4"
																							value={
																								parameterValue[`param${name + 1}`]?.unitId

																							}
																							style={{ marginBottom: 10 }}
																							className='uploadSnippetInput'
																							placeholder='Click and select snippet'
																							onClick={
																								(e) => DraggerInputHandlerSnippet(e, "unit")
																							}
																							onChange={(
																								e
																							) => {
																								onChangeChart(
																									e,
																									'uomsnippetValue', name
																								);
																							}}
																						/>
																						{/* </p>
                                                                                    </Dragger> */}
																						<div className='parameterAddingBlock parameterValueBlock'>
																							<Form.Item  {...restField}
																								name={[name, 'uom_rule']}>
																								<Select placeholder="Rule" allowClear value={null} onChange={(e, value) => onChangeChart(e, 'uom_rule', name, value)}>
																									<Option value='date'>
																										Date
																									</Option>
																									<Option value='range'>
																										Range
																									</Option>
																									<Option value='regex'>
																										RegEx
																									</Option>
																								</Select>
																							</Form.Item>

																							{parameterFormData[name]?.uom_rule === "range" ?
																								<Row gutter={8}>
																									<Col span={11}>
																										<Form.Item {...restField}
																											name={[name, 'uom_min']}
																											rules={[{ pattern: new RegExp('^[+]?([0-9]{0,})*[.]?([0-9]{0,2})?$', 'g'), message: 'Input is not a number' },
																											{ required: true, message: 'Enter min value' }]}
																										>
																											<Input placeholder='Min' />
																										</Form.Item>
																									</Col>
																									{/* <Col span={1}>-</Col> */}
																									<Col span={12}>
																										<Form.Item {...restField}
																											name={[name, 'uom_max']}
																											rules={[{ pattern: new RegExp('^[+]?([0-9]{0,})*[.]?([0-9]{0,2})?$', 'g'), message: 'Input is not a number' },
																											{ required: true, message: 'Enter max value' },
																											() => ({
																												validator(_, value) {
																													if (!value) {
																														return Promise.reject();
																													}
																													if (Number(value) < Number(parameterFormData[name]?.uom_min)) {
																														return Promise.reject("Enter value greater then Min");
																													}
																													return Promise.resolve();
																												},
																											})
																											]}
																										>
																											<Input placeholder='Max' />
																										</Form.Item>
																									</Col>
																								</Row> :
																								<Form.Item {...restField}
																									name={[name, 'uom_valueArea']}
																									rules={[{ required: parameterFormData[name]?.uom_rule ? true : false, message: 'Enter value' }]}>
																									<Input placeholder='Enter expression' />
																								</Form.Item>}
																							<Form.Item  {...restField}
																								name={[name, 'uom_transformation']}>
																								<Select placeholder="Trans." allowClear value={null}>
																									<Option value='add'>
																										ADD
																									</Option>
																									<Option value='substract'>
																										Substract
																									</Option>
																									<Option value='multiply'>
																										Multiply
																									</Option>
																									<Option value='divide'>
																										Divide
																									</Option>
																								</Select>
																							</Form.Item>
																							<Form.Item {...restField}
																								name={[name, 'uom_valueTransformation']}
																								rules={[{ required: parameterFormData[name]?.uom_transformation ? true : false, message: 'Enter transformation' }]}>
																								<Input placeholder='Enter transformation' />
																							</Form.Item>

																						</div>
																					</div>

																					<p>
																						{showTime ? <MinusSquareTwoTone onClick={() => setShowTime(false)} /> : <PlusSquareTwoTone onClick={() => setShowTime(true)} />}
																						Time
																					</p>
																					<div style={{ display: showTime ? "" : "none" }}>
																						<Input
																							id="form_input5"
																							value={
																								parameterValue[`param${name + 1}`]?.timeAnchor
																							}
																							style={{ marginBottom: 10 }}
																							className='uploadSnippetInput'
																							placeholder='Click and select anchor'
																							onClick={
																								(e) => DraggerInputHandlerAnchor(e, "time")
																							}
																							onChange={(
																								e
																							) =>
																								onChangeChart(
																									e,
																									'timeanchorValue', name
																								)
																							}
																						/>
																						<Input
																							id="form_input6"
																							value={
																								parameterValue[`param${name + 1}`]?.timeId
																							}
																							style={{ marginBottom: 10 }}
																							className='uploadSnippetInput'
																							placeholder='Enter Snippet Value'
																							onClick={
																								(e) => DraggerInputHandlerSnippet(e, "time")
																							}
																							onChange={(
																								e
																							) => {
																								onChangeChart(
																									e,
																									'timesnippetValue', name
																								);
																							}}
																						/>
																						<div className='parameterAddingBlock parameterValueBlock'>
																							<Form.Item  {...restField}
																								name={[name, 'time_rule']}>
																								<Select placeholder="Rule" allowClear value={null} onChange={(e, value) => onChangeChart(e, 'time_rule', name, value)}>

																									<Option value='range'>
																										Range
																									</Option>
																									<Option value='regex'>
																										RegEx
																									</Option>
																								</Select>
																							</Form.Item>

																							{parameterFormData[name]?.time_rule === "range" ?
																								<Row gutter={8}>
																									<Col span={11}>
																										<Form.Item {...restField}
																											name={[name, 'time_min']}
																											rules={[{ pattern: new RegExp('^[+]?([0-9]{0,})*[.]?([0-9]{0,2})?$', 'g'), message: 'Input is not a number' },
																											{ required: true, message: 'Enter min value' }]}
																										>
																											<Input placeholder='Min' />
																										</Form.Item>
																									</Col>
																									{/* <Col span={1}>-</Col> */}
																									<Col span={12}>
																										<Form.Item {...restField}
																											name={[name, 'time_max']}
																											rules={[{ pattern: new RegExp('^[+]?([0-9]{0,})*[.]?([0-9]{0,2})?$', 'g'), message: 'Input is not a number' },
																											{ required: true, message: 'Enter max value' },
																											() => ({
																												validator(_, value) {
																													if (!value) {
																														return Promise.reject();
																													}
																													if (Number(value) < Number(parameterFormData[name]?.time_min)) {
																														return Promise.reject("Enter value greater then Min");
																													}
																													return Promise.resolve();
																												},
																											})
																											]}
																										>
																											<Input placeholder='Max' />
																										</Form.Item>
																									</Col>
																								</Row> :
																								<Form.Item {...restField}
																									name={[name, 'time_valueArea']}
																									rules={[{ required: parameterFormData[name]?.time_rule ? true : false, message: 'Enter value' }]}>
																									<Input placeholder='Enter expression' />
																								</Form.Item>}
																							<Form.Item  {...restField}
																								name={[name, 'time_transformation']}>
																								<Select placeholder="Trans." allowClear value={null}>
																									<Option value='add'>
																										ADD
																									</Option>
																									<Option value='substract'>
																										Substract
																									</Option>
																									<Option value='multiply'>
																										Multiply
																									</Option>
																									<Option value='divide'>
																										Divide
																									</Option>
																								</Select>
																							</Form.Item>
																							<Form.Item {...restField}
																								name={[name, 'time_valueTransformation']}
																								rules={[{ required: parameterFormData[name]?.time_transformation ? true : false, message: 'Enter transformation' }]}>
																								<Input placeholder='Enter transformation' />
																							</Form.Item>

																						</div>
																					</div>
																					<p>
																						{showDate ? <MinusSquareTwoTone onClick={() => setShowDate(false)} /> : <PlusSquareTwoTone onClick={() => setShowDate(true)} />}
																						Date
																					</p>
																					<div style={{ display: showDate ? "" : "none" }}>
																						<Input
																							id="form_input7"
																							value={
																								parameterValue[`param${name + 1}`]?.dateAnchor

																							}
																							onClick={
																								(e) => DraggerInputHandlerAnchor(e, "date")
																							}
																							style={{ marginBottom: 10 }}
																							className='uploadSnippetInput'
																							placeholder='Click and select anchor'
																							onChange={(
																								e
																							) =>
																								onChangeChart(
																									e,
																									'dateanchorValue', name
																								)
																							}
																						/>
																						<Input
																							id="form_input8"
																							value={
																								parameterValue[`param${name + 1}`]?.dateId

																							}
																							style={{ marginBottom: 10 }}
																							className='uploadSnippetInput'
																							placeholder='Click and select snippet'
																							onClick={
																								(e) => DraggerInputHandlerSnippet(e, "date")
																							}
																							onChange={(
																								e
																							) => {
																								onChangeChart(
																									e,
																									'datesnippetValue', name
																								);
																							}}
																						/>

																						<div className='parameterAddingBlock parameterValueBlock'>
																							<Form.Item  {...restField}
																								name={[name, 'date_rule']}>
																								<Select placeholder="Rule" allowClear value={null} onChange={(e, value) => onChangeChart(e, 'date_rule', name, value)}>
																									<Option value='date'>
																										Date
																									</Option>
																									<Option value='range'>
																										Range
																									</Option>
																									<Option value='regex'>
																										RegEx
																									</Option>
																								</Select>
																							</Form.Item>

																							{parameterFormData[name]?.date_rule === "range" ?
																								<Row gutter={8}>
																									<Col span={11}>
																										<Form.Item {...restField}
																											name={[name, 'date_min']}
																											rules={[{ pattern: new RegExp('^[+]?([0-9]{0,})*[.]?([0-9]{0,2})?$', 'g'), message: 'Input is not a number' },
																											{ required: true, message: 'Enter min value' }]}
																										>
																											<Input placeholder='Min' />
																										</Form.Item>
																									</Col>
																									{/* <Col span={1}>-</Col> */}
																									<Col span={12}>
																										<Form.Item {...restField}
																											name={[name, 'date_max']}
																											rules={[{ pattern: new RegExp('^[+]?([0-9]{0,})*[.]?([0-9]{0,2})?$', 'g'), message: 'Input is not a number' },
																											{ required: true, message: 'Enter nax value' },
																											() => ({
																												validator(_, value) {
																													if (!value) {
																														return Promise.reject();
																													}
																													if (Number(value) < Number(parameterFormData[name]?.date_min)) {
																														return Promise.reject("Enter value greater then Min");
																													} return Promise.resolve();
																												},
																											})
																											]}
																										>
																											<Input placeholder='Max' />
																										</Form.Item>
																									</Col>
																								</Row> :
																								<Form.Item {...restField}
																									name={[name, 'date_valueArea']}
																									rules={[{ required: parameterFormData[name]?.date_rule ? true : false, message: 'Enter value' }]}>
																									<Input placeholder='Enter expression' />
																								</Form.Item>}
																							<Form.Item  {...restField}
																								name={[name, 'date_transformation']}>
																								<Select placeholder="Trans." allowClear value={null}>
																									<Option value='add'>
																										ADD
																									</Option>
																									<Option value='substract'>
																										Substract
																									</Option>
																									<Option value='multiply'>
																										Multiply
																									</Option>
																									<Option value='divide'>
																										Divide
																									</Option>
																								</Select>
																							</Form.Item>
																							<Form.Item {...restField}
																								name={[name, 'date_valueTransformation']}
																								rules={[{ required: parameterFormData[name]?.date_transformation ? true : false, message: 'Enter transformation' }]}>
																								<Input placeholder='Enter transformation' />
																							</Form.Item>
																						</div>
																					</div>
																					<Button type='primary' className='defineTableBtn' onClick={findTemplate}>
																						<MonitorOutlined /> Find
																					</Button>
																					{fileList?.length > 0 &&
																						<p>Found in {`${fileList?.length}/${searchedFileList?.length}`} files</p>
																					}

																					<div>{fileList?.map(item => (
																						<p>{item?.split('.')[0]}</p>
																					))}</div>

																					{/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
																				</div>

																			</div>

																		</Panel>
																		// </Space>

																	))}
																</Collapse>
																{params?.fromScreen != "Workflow" &&
																	<Form.Item>
																		<div
																			className='firstParameter-para'
																			style={{ pointerEvents: params.fromScreen === "Workflow" ? "none" : "all" }}
																			onClick={() => {
																				// if (activeNumber === 0) {
																				parameterAddingHandler()
																				add()
																				// } else {
																				//     if ((formValues[activeNumber - 1]?.name === "" || formValues[activeNumber - 1]?.name === undefined) ||
																				//         (formValues[activeNumber - 1]?.method === "" || formValues[activeNumber - 1]?.method === undefined)
																				//     ) {
																				//         openNotification("Please enter name and method")
																				//     } else {
																				//         parameterAddingHandler()
																				//         add()
																				//     }
																				// }

																			}}
																			type="primary"
																			htmltype="submit"
																		>
																			<p>
																				{paramaterAdded
																					? 'Add another paramater'
																					: 'Add your first Parameter'}
																			</p>

																		</div>
																	</Form.Item>
																}
															</>
														)}
													</Form.List>
												</div>
												{/* <div className='saveSnippetsBlock'>
                                                    <Button
                                                        type='default'
                                                        form="myForm"
                                                        key="submit"
                                                        htmlType="submit"
                                                        className='saveSnippetsBtn'
                                                        // onClick={() => saveTemplateHandler()}
                                                        // onClick={() => parameterForm.submit()}
                                                        disabled={params?.fromScreen === "Workflow" ? true : false}
                                                    >
                                                        Save
                                                    </Button>
                                                </div> */}
											</div>
										</div>
									</Form>
								</Panel>
								<Panel id="tableExtraction" header='Table' key='4'>
									<div className='tabletype'>
										<DynamicTableForm handleSideState={handleSideState} sideTableData={sideTableData} handlePageChange={handlePageChange}
											setTableActiveKey={setTableActiveKey} setFormTableData={setFormTableData} initialSideTableData={initialSideTableData}
											handleOnFinishFailed={handleOnFinishFailed} parameterFormFinish={parameterFormFinish} params={params}
											pageIdDropdownValues={pageIdDropdownValues} initialPageIdentifierData={initialPageIdentifierData} pageNumber={pageNumber}
										/>
									</div>
								</Panel>
							</Collapse>
						</Sider>
					</div>
				</div>
				<div className='pbrTemplateCenter'>
					<div className='pbrPanel pbrCenterPanel'>
						<div className='pbrCenterPanel-header'>
							<Row className='pbrCenterPanelRow'>
								<Col
									span={14}
									className='pbrCenterPanelCol pbrCenterBlockLeft'
								>
									<div className='preview_page_finder'>
										<p className='pbrCenterPanelHeader-para' onClick={showModal}>
											Preview
										</p>
										<Tooltip title={params?.file}>
											<span onClick={() => setChangeFile(true)} style={{ marginTop: 4, cursor: 'pointer' }}>{params?.file?.slice(0, 28)}</span>
											{!saveAsFlag &&
												<span onClick={() => {
													setChangeFileValue(originalFile)
													handleChangeFileOk(originalFile)
													setSaveAsFlag(true)
												}} style={{ marginLeft: 8, marginTop: 4, cursor: 'pointer' }}><UndoOutlined /></span>
											}
										</Tooltip>
										<div>
											<LeftOutlined disabled={true} className='icon_size' onClick={() => handlePageChange(pageNumber - 1)} />
											<Input style={{ width: 48 }} value={pageNumber} onChange={(e) => handlePageTextChange(e.target.value)} onPressEnter={handlePageChangeEnter} />
											<span style={{ fontSize: 15, marginLeft: 6 }}>/ {pageLimit}</span>
											<RightOutlined className='icon_size' onClick={() => handlePageChange(pageNumber + 1)} />
										</div>

									</div>
								</Col>

								<Col
									span={10}
									className='pbrCenterPanelCol pbrCenterBlockRight'
									style={{ justifyContent: params?.fromScreen == "Workflow" ? "" : "right" }}
								>
									{/* <div className='drawSnippet'>
                                        <EditOutlined onClick={()=>handleDrawSnippet()}/>
                                        Draw Snippet
                                    </div> */}
									{/* {params?.fromScreen == "Workflow" ?
										<div className='btns' style={{ marginLeft: 40 }}>
											<Button
												className='custom-primary-btn'
												onClick={() => {
													setIsModalOpen(true)
												}}>
												Reject Page
											</Button>
											<Button style={{ margin: "0px 16px" }} className='custom-primary-btn'
												onClick={() => {
													handleWorkFlowApprove()
												}}
											>Approve Page</Button>
										</div> : ""} */}
									{params?.fromScreen == "Workflow" ? "" :
										<div>
											<div className='cropSnippet'>
												<Select disabled={showRowColIdentifier} style={{ width: 150 }} value={selectedMode} options={modesValues} onChange={(e) => handleMenuChange(e)} />
											</div>
										</div>
									}
								</Col>
							</Row>
						</div>
						<div className='pbrCenterPdfBlock' st>

							{showRowColIdentifier &&
								<TableIdentifier clickedTable={clickedTable} metaData={params} imageHeight={imageHeight} imageWidth={imageWidth}
									triggerPreview={triggerPreview} params={params} triggerUpdate={triggerUpdate} setSideTableData={setSideTableData}
									setTriggerUpdate={setTriggerUpdate} tableActiveKey={tableActiveKey} formTableData={formTableData} setModalData={setModalData} setModalColumns={setModalColumns}
									templateVersion={templateVersion} initialSideTableData={initialSideTableData} pageIdFormValues={pageIdFormValues} pageNumber={pageNumber} />}

							{/* <DrawAnnotations /> */}
							{/* <h3>hello</h3> */}

							<div id='drawRectangle'>
								<div className='pdfToImgBlock'>

									<ImageMapper
										id='imageMApper'
										className='pdfToImageWrapper'
										src={displayImage}
										map={areasMap}
										// onLoad={() => load()}
										onClick={area => clicked(area)}
									/>

								</div>
							</div>

						</div>
					</div>
					<Modal
						title='Preview'
						visible={isModalVisible}
						// style={{height:300,overflowY:"scroll"}}
						onOk={handleOk}
						onCancel={handleCancel}
						footer={null}>
						<Table
							loading={tableLoading}
							className='pbrTemplates-table'
							columns={modalColumns}
							dataSource={modalData}
							pagination={false}
							scroll={{ x: 1000, y: 300 }}
						/>
					</Modal>
					<RejectModal templateVersion={templateVersion} pageNumber={pageNumber} params={params} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

				</div>
				<div className='pbrTemplateRight'>
					<div className='pbrPanel pbrRightPanel'>
						<Sider trigger={null} collapsible collapsed={rightPanelCollapsed}>
							<span className='trigger' onClick={toggleRightCollapsed}>
								<img src={panelRightImg} className='panelImg' />
							</span>
							{params?.fromScreen == "Workflow" ? <ParameterList originalResponse={originalResponse} setAreasMap={setAreasMap} areasMap={areasMap} /> :
								<ChangeCoordiantes areasMapObject={areasMapObject} params={params} clickedSnippetId={clickedSnippetId} onChangeChart={onChangeChart} />
							}
						</Sider>
					</div>
				</div>
			</div>
			{advancePopup && <AdvanceSetting pageNumber={pageNumber} imageHeight={imageHeight} imageWidth={imageWidth} formValues={formValues} setFormValues={setFormValues} name={activeKey} method={formValues[activeKey]?.method} advancePopup={advancePopup} setAdvancePopup={setAdvancePopup} />}
			<WorkflowPreviewModal templateVersion={templateVersion} params={params} isModalOpen={workflowPreviewModal} setIsModalOpen={setWorkflowPreviewModal} />
			<Modal title="Change File" visible={changeFile} onOk={() => handleChangeFileOk()} onCancel={() => setChangeFile(false)}>
				<Select onChange={(val) => setChangeFileValue(val)} value={changeFileValue} options={changeFileOptions} style={{ width: 400 }} />
			</Modal>
			<Modal title="Save As" visible={saveAsModal} onOk={handleSaveAs} onCancel={() => {
				setSaveAsFlag(true)
				setSaveAsName('')
				setSaveAsModal(false)
			}}>
				<Input onChange={(e) => setSaveAsName(e.target.value)} value={saveAsName} style={{ width: 400 }} />
			</Modal>
			<Signature
				isPublish={isPublish}
				handleClose={handleClose}
				screenName="Pbr Creation"
				PublishResponse={PublishResponse}
				appType="PBR_TEMPLATE"
				dispId={templateId}
				version={templateVersion}
				status={approveReject}
			/>
		</div>
	);
}

export default PaperBatchRecordsTemplate;
