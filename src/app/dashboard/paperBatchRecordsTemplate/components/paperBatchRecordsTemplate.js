/**
 * @author Ranjith <ranjith.k@mareana.com>
 * @Mareana - BMS PBR
 * @version 1
 * @Last Modified - 05 May, 2022
 * @Last Changed By - @ranjith
 */

import {
    Col,
    Collapse,
    Form,
    Input,
    Row,
    Select,
    Button,
    Upload,
    message,
    Space,
    notification,
    Modal,
    Table,
    Dropdown,
    Menu,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageMapper from 'react-image-mapper';

import {
    ArrowLeftOutlined,
    EditOutlined,
    ArrowRightOutlined,
    EllipsisOutlined,
    CaretDownOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    MonitorOutlined,
} from '@ant-design/icons';

import {
    hideLoader,
    showLoader,
    showNotification,
} from '../../../../duck/actions/commonActions';
import { useDispatch, useSelector } from 'react-redux';
import panelLeftImg from '../../../../assets/images/panel-leftIcon.svg';
import panelRightImg from '../../../../assets/images/panel-rightIcon.svg';
import cropImg from '../../../../assets/images/cropImg.svg';
import undoImg from '../../../../assets/images/undoImg.svg';
import redoImg from '../../../../assets/images/redoImg.svg';
import contrastImg from '../../../../assets/images/contrastImg.svg';
import BatchRecordExample from '../../../../assets/images/BatchRecordExample2.jpg';

import InputField from '../../../../components/InputField/InputField';
import QueryString from 'query-string';
import Sider from 'antd/lib/layout/Sider';
import { ImCrop } from 'react-icons/im';
import AddParameter from './addParameter/AddParameter';
import { MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';
import './styles.scss'; ImCrop
import {
    getBoundingBoxData,
    savePbrTemplate,
    processBatchRecord,
    findParameter,
} from '../../../../services/pbrService';
// import { ImCrop } from "react-icons/im";
const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

function PaperBatchRecordsTemplate() {
    var AREAS_MAP = {
        name: 'my-map',
        areas: [],
    };
    const templateInfo = useSelector((state) => state.pbrReducer.templateData)
    const location = useLocation()
    const dispatch = useDispatch();
    const params = QueryString.parse(location.search)
    const [form] = Form.useForm();
    const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
    const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
    const [paramaterAdded, setParamaterAdded] = useState(false);
    const [conditionList, setConditionList] = useState(['AND', 'OR', 'NOT']);
    const [draggerFirstAreaValue, setDraggerFirstAreaValue] = useState('');
    const [draggerLastAreaValue, setDraggerLastAreaValue] = useState('');
    const [clickedSnippetId, setClickedSnippetId] = useState('');
    const [snippetNumber, setSnippetNumber] = useState(0);
    const [boundingBoxClicked, setBoundingBoxClicked] = useState(false);
    const [DraggerActive, setDraggerActive] = useState(true);
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
    const [imageWidth, setImageWidth] = useState(868);
    const [imageHeight, setimageHeight] = useState(1123);
    const [origianalResponse, setOrigianalResponse] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [searchedFileList, setSearchedFileList] = useState("");
    const [selectedMode, setSelectedMode] = useState("word");
    const [menuKey, setMenuKey] = useState("word");
    const [formLoadParameter, setFormLoadParameter] = useState({});
    const toggleLeftCollapsed = () => {
        setLeftPanelCollapsed(!leftPanelCollapsed);
    };

    const toggleRightCollapsed = () => {
        setRightPanelCollapsed(!rightPanelCollapsed);
    };

    const parameterAddingHandler = (a) => {
        setFileList([])
        if (activeNumber !== 0) {
            if ((formValues[activeNumber - 1]?.name === "" || formValues[activeNumber - 1]?.name === undefined) ||
                (formValues[activeNumber - 1]?.method === "" || formValues[activeNumber - 1]?.method === undefined)
            ) {
                setCallAdd(true)
                openNotification()
                let param = { anchorValue: '', anchorId: '' };
                let obj = { ...parameterValue };
                obj[`param${activeNumber + 1}`] = param;
                setParameterValue(obj);
                setActiveNumber(activeNumber + 1);

            } else {
                setCallAdd(false)
                let param = { anchorValue: '', anchorId: '' };
                let obj = { ...parameterValue };
                obj[`param${activeNumber + 1}`] = param;
                setParameterValue(obj);
                setActiveNumber(activeNumber + 1);
            }

        } else {
            let openKey = parseInt(open) + 1
            setParamaterAdded(true);
            setOpen([`${openKey}`]);
            let key = Object.keys(parameterValue).length;
            let param = { anchorValue: '', anchorId: '' };
            let val = `param${key}`;
            let obj = { ...parameterValue };
            if (activeNumber === 0) {
                setParameterValue({ ...parameterValue, param1: param });
                setActiveNumber(activeNumber + 1);
            } else {
                obj[`param${activeNumber + 1}`] = param;
                setParameterValue(obj);
                setActiveNumber(activeNumber + 1);
            }
        }


    };

    const DraggerInputHandlerAnchor = (e, val) => {
        e.stopPropagation();
        setDraggerActive(true);
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

    const DraggerInputHandlerSnippet = (e, val) => {
        e.stopPropagation();
        setDraggerActive(false);
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

    const onClickImage = (e) => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
    };

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
            setDraggerFirstAreaValue(e.target.value);
            arr[key] = { ...arr[key], values: { ...arr[key]?.values, anchorValue: e.target.value } }
            setFormValues(arr)
            let obj1 = { ...parameterValue };
            obj1[`param${key + 1}`] = {
                ...obj1[`param${key + 1}`],
                anchorValue: e.target.value,
            };
            setParameterValue(obj1);
        } else if (field === 'snippetValue') {
            setDraggerLastAreaValue(e.target.value);
            arr[key] = { ...arr[key], values: { ...arr[key]?.values, anchorId: e.target.value } }
            setFormValues(arr)
            let obj2 = { ...parameterValue };
            obj2[`param${key + 1}`] = {
                ...obj2[`param${key + 1}`],
                anchorId: e.target.value,
            };
            setParameterValue(obj2);
        } else if (field === 'uomanchorValue') {
            setDraggerLastAreaValue(e.target.value);
            arr[key] = { ...arr[key], unitValues: { ...arr[key]?.unitValues, unitAnchor: e.target.value } }
            setFormValues(arr)
            let obj2 = { ...parameterValue };
            obj2[`param${key + 1}`] = {
                ...obj2[`param${key + 1}`],
                unitAnchor: e.target.value,
            };
            setParameterValue(obj2);
        } else if (field === 'uomsnippetValue') {
            setDraggerLastAreaValue(e.target.value);
            arr[key] = { ...arr[key], unitValues: { ...arr[key]?.unitValues, unitId: e.target.value } }
            setFormValues(arr)
            let obj2 = { ...parameterValue };
            obj2[`param${key + 1}`] = {
                ...obj2[`param${key + 1}`],
                unitId: e.target.value,
            };
            setParameterValue(obj2);
        } else if (field === 'timeanchorValue') {
            setDraggerLastAreaValue(e.target.value);
            arr[key] = { ...arr[key], timeValues: { ...arr[key]?.timeValues, timeAnchor: e.target.value } }
            setFormValues(arr)
            let obj2 = { ...parameterValue };
            obj2[`param${key + 1}`] = {
                ...obj2[`param${key + 1}`],
                timeAnchor: e.target.value,
            };
            setParameterValue(obj2);
        } else if (field === 'timesnippetValue') {
            setDraggerLastAreaValue(e.target.value);
            arr[key] = { ...arr[key], timeValues: { ...arr[key]?.timeValues, timeId: e.target.value } }
            setFormValues(arr)
            let obj2 = { ...parameterValue };
            obj2[`param${key + 1}`] = {
                ...obj2[`param${key + 1}`],
                timeId: e.target.value,
            };
            setParameterValue(obj2);
        } else if (field === 'dateanchorValue') {
            setDraggerLastAreaValue(e.target.value);
            arr[key] = { ...arr[key], dateValues: { ...arr[key]?.dateValues, dateAnchor: e.target.value } }
            setFormValues(arr)
            let obj2 = { ...parameterValue };
            obj2[`param${key + 1}`] = {
                ...obj2[`param${key + 1}`],
                dateAnchor: e.target.value,
            };
            setParameterValue(obj2);
        } else if (field === 'datesnippetValue') {
            setDraggerLastAreaValue(e.target.value);
            arr[key] = { ...arr[key], dateValues: { ...arr[key]?.dateValues, dateId: e.target.value } }
            setFormValues(arr)
            let obj2 = { ...parameterValue };
            obj2[`param${key + 1}`] = {
                ...obj2[`param${key + 1}`],
                dateId: e.target.value,
            };
            setParameterValue(obj2);
        } else if (field === 'method') {
            arr[key] = { ...arr[key], method: value.value }
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
            setAreasMapObject({
                ...areasMapObject,
                areaValue: e.target.value,
            });
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
    console.log("formVALLSSS", formValues)
    /**
     * TODO: get boundingBoxData info
     */
    const getBoundingBoxDataInfo = async (width, height, mode) => {
        try {
            let _reqBatch = {
                filename: `${params?.file?.split('_')[0]}_page-0.jpeg.json`,
                bbox_type: mode,
                action_type: params?.temp_disp_id ? "edit":"create",
                temp_disp_id: params?.temp_disp_id ? params?.temp_disp_id:""
            };
            const batchRes = await getBoundingBoxData(_reqBatch);
            setOrigianalResponse(batchRes)
            let areasArr = [];
            let width1 = width ? width : 856
            let height1 = height ? height : 1108
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
                        snippetID: e.key_snippet_id,
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
            } else if (batchRes.status === 404) {
                setAreasMap();
                // dispatch(showNotification('error', batchRes.detail));
            }
            // dispatch(hideLoader());
        } catch (error) {
            // dispatch(hideLoader());
            // dispatch(showNotification('error', 'No Data Found'));
        }
    };

    useEffect(() => {
        getImage()
        if (templateInfo) {
            let obj = {}
            templateInfo.forEach((item, index) => {
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
            templateInfo.forEach(item => {
                let obj = {
                    name: item.name,
                    method: item.method
                }
                demoValues.users.push(obj)
            })
            setFormLoadParameter(demoValues)

        }
    }, []);

    useEffect(() => {
        if (templateInfo?.length > 0) {
            let arr = templateInfo.map((item, index) => ({
                name: item.name,
                method: item.method,
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
            setFormValues(arr)
            setActiveNumber(templateInfo?.length)
            setParamaterAdded(false)
        }
    }, [areasMap])

    const getImage = async () => {
        var requestOptions = {
            method: "GET",
            // headers: myHeaders,
            response: "image/jpeg",
            psId: "",
            //body: raw,
            redirect: "follow",
        };
        let response = await fetch(
            MDH_APP_PYTHON_SERVICE + `/pbr/udh/get_file_page_image?filename=${params?.file?.split('_')[0]}.pdf&pageId=1`,
            requestOptions
        )
            .then((response) => response)
            .then((result) => result)
            .catch((error) => console.log("error", error));

        let res = await response.blob();

        setDisplayImage(window.webkitURL.createObjectURL(res))
    }


    useEffect(() => {
        setTimeout(() => {
            const list = document.getElementsByTagName("canvas")[0]
            getBoundingBoxDataInfo(list?.width, list?.height, selectedMode);
            setImageWidth(list?.width)
            setimageHeight(list?.height)

        }, 3000)

    }, [document.getElementsByTagName("canvas")[0]]);


    const load = () => { };

    const clicked = (area) => {
        setBoundingBoxClicked(true);
        setClickedSnippetId(area.areaValue);
        setSnippetNumber(area.snippetID)
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
        if (DraggerActiveMultiple.value) {
            let obj1 = { ...parameterValue };
            obj1[`param${Number(activeKey) + 1}`] = {
                ...obj1[`param${Number(activeKey) + 1}`],
                anchorValue: area.areaValue,
            };
            let arr = [...formValues]
            arr[activeKey] = { ...arr[activeKey], values: { ...arr[activeKey]?.values, anchorValue: area.areaValue, snippetID: area.snippetID, anchorCoords: area.coords } }
            setParameterValue(obj1);
            setFormValues(arr)

        } else if (DraggerActiveMultiple.unit) {
            let obj1 = { ...parameterValue };
            obj1[`param${Number(activeKey) + 1}`] = {
                ...obj1[`param${Number(activeKey) + 1}`],
                unitAnchor: area.areaValue,
            };
            let arr = [...formValues]
            arr[activeKey] = { ...arr[activeKey], unitValues: { ...arr[activeKey]?.unitValues, unitAnchor: area.areaValue, snippetID: area.snippetID, coords: area.coords } }
            setFormValues(arr)
            setParameterValue(obj1);
        } else if (DraggerActiveMultiple.time) {
            let obj1 = { ...parameterValue };
            obj1[`param${Number(activeKey) + 1}`] = {
                ...obj1[`param${Number(activeKey) + 1}`],
                timeAnchor: area.areaValue,
            };
            let arr = [...formValues]
            arr[activeKey] = { ...arr[activeKey], timeValues: { ...arr[activeKey]?.timeValues, timeAnchor: area.areaValue, snippetID: area.snippetID, coords: area.coords } }
            setFormValues(arr)
            setParameterValue(obj1);
        } else if (DraggerActiveMultiple.date) {
            let obj1 = { ...parameterValue };
            obj1[`param${Number(activeKey) + 1}`] = {
                ...obj1[`param${Number(activeKey) + 1}`],
                dateAnchor: area.areaValue,
            };
            let arr = [...formValues]
            arr[activeKey] = { ...arr[activeKey], dateValues: { ...arr[activeKey]?.dateValues, dateAnchor: area.areaValue, snippetID: area.snippetID, coords: area.coords } }
            setFormValues(arr)
            setParameterValue(obj1);
        } else if (DraggerActiveMultiple.valueSnippet) {
            let obj1 = { ...parameterValue };
            obj1[`param${Number(activeKey) + 1}`] = {
                ...obj1[`param${Number(activeKey) + 1}`],
                anchorId: area.areaValue,
            };
            let arr = [...formValues]
            arr[activeKey] = { ...arr[activeKey], values: { ...arr[activeKey]?.values, anchorId: area.areaValue, valueSnippetID: area.snippetID, valueCoords: area.coords } }
            setFormValues(arr)
            setParameterValue(obj1);
        } else if (DraggerActiveMultiple.unitSnippet) {
            let obj1 = { ...parameterValue };
            obj1[`param${Number(activeKey) + 1}`] = {
                ...obj1[`param${Number(activeKey) + 1}`],
                unitId: area.areaValue,
            };
            let arr = [...formValues]
            arr[activeKey] = { ...arr[activeKey], unitValues: { ...arr[activeKey]?.unitValues, unitId: area.areaValue, valueSnippetID: area.snippetID, valueCoords: area.coords } }
            setFormValues(arr)
            setParameterValue(obj1);
        } else if (DraggerActiveMultiple.timeSnippet) {
            let obj1 = { ...parameterValue };
            obj1[`param${Number(activeKey) + 1}`] = {
                ...obj1[`param${Number(activeKey) + 1}`],
                timeId: area.areaValue,
            };
            let arr = [...formValues]
            arr[activeKey] = { ...arr[activeKey], timeValues: { ...arr[activeKey]?.timeValues, timeId: area.areaValue, valueSnippetID: area.snippetID, valueCoords: area.coords } }
            setFormValues(arr)
            setParameterValue(obj1);
        } else if (DraggerActiveMultiple.dateSnippet) {
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
        form.setFieldsValue({
            anchorValue: area.snippetID,
        });
    };

    const savePbrTemplateDataInfo = async () => {
        if (formValues.length > 0) {
            try {
                dispatch(showLoader());
                let _reqBatch = {
                    pbrTemplateName: params.tempalteName,
                    custKey: 'PBR',
                    pbrTemplateVersion: '1',
                    pbrTemplateStatus: 'DRFT',
                    createdBy: 'demo',
                    changedBy: null,
                    pbrTemplateInfo: [],
                };
                let arr = [];
                formValues.forEach((ele) => {
                    let obj = {
                        method: ele.method,
                        filename: 'Batch Record Example 2_page-0.jpeg.json',
                        name: ele.name,
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
                        obj['param_value_snippet_id'] = ele?.values?.valueSnippetID / imageWidth

                    }
                    if (ele.unitValues) {
                        obj['uom_key_height'] = (ele?.unitValues?.coords[3] - ele?.unitValues?.coords[1]) / imageHeight
                        obj['uom_key_left'] = ele?.unitValues?.coords[0] / imageWidth
                        obj['uom_key_text'] = ele?.unitValues?.unitAnchor
                        obj['uom_key_top'] = ele?.unitValues?.coords[1] / imageHeight
                        obj['uom_key_width'] = (ele?.unitValues?.coords[2] - ele?.unitValues?.coords[0])/ imageWidth
                        obj['uom_page'] = 1
                        obj['uom_key_snippet_id'] = ele?.unitValues?.snippetID
                        obj['uom_value_height'] = (ele?.unitValues?.valueCoords[3] - ele?.unitValues?.valueCoords[1]) / imageHeight
                        obj['uom_value_left'] = ele?.unitValues?.valueCoords[0] / imageWidth
                        obj['uom_value_text'] = ele?.unitValues?.unitId
                        obj['uom_value_top'] = ele?.unitValues?.valueCoords[1] / imageHeight
                        obj['uom_value_width'] = (ele?.unitValues?.valueCoords[2] - ele?.unitValues?.valueCoords[0]) / imageWidth
                        obj['uom_value_snippet_id'] = ele?.values?.valueSnippetID / imageWidth

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
                        obj['time_value_snippet_id'] = ele?.values?.valueSnippetID / imageWidth

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
                        obj['date_value_snippet_id'] = ele?.values?.valueSnippetID / imageWidth

                    }
                    arr.push(obj);
                });
                _reqBatch.pbrTemplateInfo = arr;

                //api call
                const batchRes = await savePbrTemplate(_reqBatch);
                if (batchRes.Status === 202) {
                    message.success(batchRes.Message);
                    dispatch(hideLoader());
                    dispatch(showNotification('success', batchRes.Message));
                } else if (batchRes.Status === 404) {
                    message.error(batchRes.Message);
                    dispatch(hideLoader());
                    // dispatch(showNotification('error', batchRes.detail));
                }
               
            } catch (error) {
                dispatch(hideLoader());
                dispatch(showNotification('error', 'No Data Found'));
            }
        } else {
            openNotification('Please Create Template Before Save')
        }
    };
    const saveTemplateHandler = () => {
        savePbrTemplateDataInfo();
    };
    const batchProcess = async () => {
        dispatch(showLoader());
        let req = ""
        let res = await processBatchRecord(req)
        if (res.Found_file_list.length > 0) {
            message.success(res.Message);
            dispatch(hideLoader());
        } else {
            message.error(res.Message);
            dispatch(hideLoader());
            // dispatch(showNotification('error', batchRes.detail));
        }
        dispatch(hideLoader());


    };
    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    const handleValuesChange = (changedValues, values) => {
        console.log("changedValues", changedValues, values)
    };
    const close = () => {
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };
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
            type: "error",
            placement: "top",
            onClose: close,
        });
    };
    const findTemplate = async () => {
        dispatch(showLoader());
        let req = {
            extraction_type: "all",
            extraction_filename: params?.file,
            template_list: []
        }
        let obj = {
            filename: "Batch Record Example 2_page-0.jpeg.json",
            method: formValues[activeKey]?.method
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
        }
        req.template_list.push(obj)
        let res = await findParameter(req)
        if (res?.Found_file_list?.length > 0) {
            message.success(res.Message);
            setFileList(res.Found_file_list)
            setSearchedFileList(res.Searched_file_list)
            dispatch(hideLoader());
        } else {
            message.error(res.Message);
            dispatch(hideLoader());
            // dispatch(showNotification('error', batchRes.detail));
        }

    }
    const showModal = async () => {
        setIsModalVisible(true);
        setTableLoading(true)
        let req1 = {
            extraction_type: "custom",
            template_list: [],
            extraction_filename: params?.file,
        }
        let arr = []
        let obj = {

            filename: params.file,
            method: formValues[activeKey]?.method
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
        }
        req1.template_list.push(obj)
        let res = await findParameter(req1)
        if (res?.Found_file_list?.length > 0) {
            message.success(res.Message);
            setModalData(res.Extraction)
        } else {
            message.error(res.Message);
            // dispatch(showNotification('error', batchRes.detail));
        }
        setTableLoading(false)
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);

    };
    const modalColumns = [
        {
            title: 'File Name',
            dataIndex: 'file_path',
            key: 'name',
            render: (text) => text.split('_')[0]
        },
        {
            title: 'Key',
            dataIndex: 'key_',
            key: 'key',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Batch',
            dataIndex: 'batch',
            key: 'batch',
        },
        {
            title: 'Site',
            dataIndex: 'site',
            key: 'site',
        },
    ];
    const handleMenuChange = (item) => {
        setSelectedMode(item.key)
        setMenuKey(item.key)
        setAreasMap({ ...areasMap, areas: [] });
        getBoundingBoxDataInfo(imageWidth, imageHeight, item.key)

    }
    const modes = (
        <Menu defaultSelectedKeys={["word"]} selectedKeys={[menuKey]} onClick={(item) => handleMenuChange(item)}>
            <Menu.Item key='word'>
                Word
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='line'>
                Line
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='key_value'>
                Key Value
            </Menu.Item>
        </Menu>
    );
    const areas = [
        { label: 'Beijing', value: 'Beijing' },
        { label: 'Shanghai', value: 'Shanghai' },
    ];

    const sights = {
        Beijing: ['Tiananmen', 'Great Wall'],
        Shanghai: ['Oriental Pearl', 'The Bund'],
    };
    const handleChange = () => {
        form.setFieldsValue({ sights: [] });
    };


    return (
        <div className='pbr-container pbrTemplate-container'>
            <div className='custom-wrapper pbr-wrapper'>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <ArrowLeftOutlined className='header-icon' />
                        <span className='header-title'>
                            Paper Batch Records /
                        </span>
                        <span className='header-title'>{`TEMPLATE-${params?.tempalteName.toUpperCase()}`}</span>
                    </div>
                </div>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <Button type='primary' className='defineTableBtn'>
                            <ArrowRightOutlined /> Define Table
                        </Button>
                        <Button type='primary' className='defineTableBtn' onClick={batchProcess}>
                            <ArrowRightOutlined /> Batch Process
                        </Button>
                        <EllipsisOutlined className='ellipseIconMenu' />
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
                            >
                                <Panel header='Page Identifier' key='1'>
                                    <div className='pageIdentifierBlock'>
                                        <Form
                                            layout='vertical'
                                            form={form}
                                            className='formNewTemplate'
                                        >
                                            <InputField
                                                label='Page ID'
                                                placeholder='Enter Page ID'
                                                onChangeInput={(e) => {
                                                    onChangeChart(e, 'pageId');
                                                }}
                                            />
                                            <InputField
                                                label='Key 1'
                                                placeholder='Enter Key 1'
                                                onChangeInput={(e) => {
                                                    onChangeChart(e, 'Key1');
                                                }}
                                            />
                                            <InputField
                                                label='Key 2'
                                                placeholder='Enter Key 2'
                                                onChangeInput={(e) => {
                                                    onChangeChart(e, 'Key2');
                                                }}
                                            />
                                            <Form.Item
                                                label='Condition'
                                                name='condition'
                                            >
                                                <div className='conditonBlock'>
                                                    <span>Key 1</span>
                                                    <span>
                                                        <Select defaultValue='AND'>
                                                            <Option value='AND'>
                                                                AND
                                                            </Option>
                                                            <Option value='OR'>
                                                                OR
                                                            </Option>
                                                            <Option value='NOT'>
                                                                NOT
                                                            </Option>
                                                        </Select>
                                                    </span>
                                                    <span>Key 2</span>
                                                </div>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Panel>
                                <Panel header='Add Parameter' key='2'>
                                    <Form onValuesChange={handleValuesChange} name="dynamic_form_nest_item" onFinish={onFinish}
                                        initialValues={formLoadParameter}
                                        autoComplete="off">
                                        <div className='addParameterContainer'>
                                            <div className='addParameterBlock'>
                                                <div className='singleParameterBlock'>
                                                    <Form.List name="users">
                                                        {(fields, { add, remove }) => (
                                                            <>
                                                                <Collapse accordion expandIconPosition='right' onChange={(val) => setActiveKey(val)}>
                                                                    {fields.map(({ key, name, ...restField }) => (

                                                                        // <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                                        <Panel header={`Parameter ${key + 1} created`} key={`${key}`}>
                                                                            <div className='addParameterBlock'>
                                                                                <div className='parameterAdded-block'>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        name={[name, 'name']}
                                                                                        // label="Name"
                                                                                        rules={[{ required: true, message: 'Missing first name' }]}
                                                                                    >
                                                                                        <Input
                                                                                            placeholder='Enter name'
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                onChangeChart(
                                                                                                    e,
                                                                                                    'parameterName',
                                                                                                    key
                                                                                                )
                                                                                            }

                                                                                        />
                                                                                    </Form.Item>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        name={[name, 'method']}
                                                                                        rules={[{ required: true, message: 'method' }]}
                                                                                    >
                                                                                        <Select placeholder="Select Method" onChange={(e, value) => onChangeChart(e, 'method', key, value)} value={formValues[key]?.method}>
                                                                                            <Option value='absolute_coordinate'>
                                                                                                Get By Absolute Coordinate
                                                                                            </Option>
                                                                                            {/* <Option value='regex'>
                                                                                                Get By Regex
                                                                                            </Option> */}
                                                                                            <Option value='key_value_form'>
                                                                                                Get By Form Key Value
                                                                                            </Option>
                                                                                            {/* <Option value='relative_direction '>
                                                                                                Get By Relative Direction
                                                                                            </Option> */}
                                                                                        </Select>
                                                                                    </Form.Item>
                                                                                    <div className='parameterAddingBlock parameterValueBlock'>
                                                                                        <p>
                                                                                            Value
                                                                                        </p>
                                                                                        <p></p>
                                                                                        <Dragger
                                                                                            className={`draggerSnippet ${DraggerActive
                                                                                                ? 'activeBorder'
                                                                                                : 'inActiveBorder'
                                                                                                }`}
                                                                                            style={{ pointerEvents: "none" }}
                                                                                        >
                                                                                            <p className='ant-upload-drag-icon'>
                                                                                                <PlusOutlined />
                                                                                            </p>
                                                                                            <p className='ant-upload-text'>
                                                                                                Drag
                                                                                                and
                                                                                                drop
                                                                                                anchor
                                                                                            </p>
                                                                                            {/* {showInputAnchor && ( */}
                                                                                            <p
                                                                                                className='ant-upload-text-input'
                                                                                                onClick={(e) => DraggerInputHandlerAnchor(e, "value")}
                                                                                                style={{ pointerEvents: "auto" }}
                                                                                            >
                                                                                                <Form.Item
                                                                                                    {...restField}
                                                                                                // name={[name, 'param_key']}
                                                                                                // rules={[{ required: true, message: 'Missing last name' }]}
                                                                                                >
                                                                                                    <Input
                                                                                                        value={
                                                                                                            parameterValue[`param${key + 1}`]?.anchorValue
                                                                                                        }
                                                                                                        className='uploadSnippetInput'
                                                                                                        placeholder='Enter Anchor Value'
                                                                                                        onChange={(
                                                                                                            e
                                                                                                        ) =>
                                                                                                            onChangeChart(
                                                                                                                e,
                                                                                                                'anchorValue', key
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </Form.Item>
                                                                                            </p>
                                                                                            {/* )} */}
                                                                                        </Dragger>
                                                                                        <Dragger
                                                                                            className={`draggerSnippet ${DraggerActive
                                                                                                ? 'inActiveBorder'
                                                                                                : 'activeBorder'
                                                                                                }`}
                                                                                            style={{ pointerEvents: "none" }}
                                                                                        >
                                                                                            <p className='ant-upload-drag-icon'>
                                                                                                <PlusOutlined />
                                                                                            </p>
                                                                                            <p className='ant-upload-text'>
                                                                                                Drag
                                                                                                and
                                                                                                drop
                                                                                                snippet
                                                                                            </p>
                                                                                            <p
                                                                                                className='ant-upload-text-input'
                                                                                                onClick={
                                                                                                    (e) => DraggerInputHandlerSnippet(e, "value")
                                                                                                }
                                                                                                style={{ pointerEvents: "auto" }}
                                                                                            >
                                                                                                <span>
                                                                                                    Or
                                                                                                    enter
                                                                                                    snippet
                                                                                                    number
                                                                                                </span>
                                                                                                <Form.Item
                                                                                                    {...restField}
                                                                                                // name={[name, 'param_value']}
                                                                                                // rules={[{ required: true, message: 'Missing last name' }]}
                                                                                                >
                                                                                                    <Input
                                                                                                        value={
                                                                                                            parameterValue[`param${key + 1}`]?.anchorId

                                                                                                        }
                                                                                                        className='uploadSnippetInput'
                                                                                                        placeholder='Enter Snippet Value'
                                                                                                        onChange={(
                                                                                                            e
                                                                                                        ) =>
                                                                                                            onChangeChart(
                                                                                                                e,
                                                                                                                'snippetValue', key
                                                                                                            )
                                                                                                        }
                                                                                                    />
                                                                                                </Form.Item>

                                                                                            </p>
                                                                                        </Dragger>
                                                                                        <Form.Item  {...restField}
                                                                                            name={[name, 'param_valueFormat']}>
                                                                                            <Select >
                                                                                                <Option value='FORMAT'>
                                                                                                    FORMAT
                                                                                                </Option>
                                                                                            </Select>
                                                                                        </Form.Item>
                                                                                        <Form.Item {...restField}
                                                                                            name={[name, 'param_valueTransformation']}>
                                                                                            <Input placeholder='Enter transformation' />
                                                                                        </Form.Item>

                                                                                        <Form.Item {...restField}
                                                                                            name={[name, 'param_valueArea']}>
                                                                                            <Input placeholder='Enter area' />
                                                                                        </Form.Item>
                                                                                        <Form.Item {...restField}
                                                                                            name={[name, 'param_valueAnchorDirection']}>
                                                                                            <Select defaultValue='AnchorDirection'>
                                                                                                <Option value='top'>
                                                                                                    Top
                                                                                                </Option>
                                                                                                <Option value='left'>
                                                                                                    Left
                                                                                                </Option>
                                                                                                <Option value='bottom'>
                                                                                                    Bottom
                                                                                                </Option>
                                                                                                <Option value='right'>
                                                                                                    Right
                                                                                                </Option>
                                                                                            </Select>
                                                                                        </Form.Item>

                                                                                    </div>
                                                                                    <p>
                                                                                        Unit of Manufacturing
                                                                                    </p>
                                                                                    {/* <p></p> */}
                                                                                    <div className='parameterAddingBlock parameterValueBlock'>
                                                                                        <Dragger
                                                                                            className={`draggerSnippet ${DraggerActive
                                                                                                ? 'activeBorder'
                                                                                                : 'inActiveBorder'
                                                                                                }`}
                                                                                            style={{ pointerEvents: "none" }}
                                                                                        >
                                                                                            <p className='ant-upload-drag-icon'>
                                                                                                <PlusOutlined />
                                                                                            </p>
                                                                                            <p className='ant-upload-text'>
                                                                                                Drag
                                                                                                and
                                                                                                drop
                                                                                                anchor
                                                                                            </p>
                                                                                            {/* {showInputAnchor && ( */}
                                                                                            <p
                                                                                                className='ant-upload-text-input'
                                                                                                onClick={
                                                                                                    (e) => DraggerInputHandlerAnchor(e, "unit")
                                                                                                }
                                                                                                style={{ pointerEvents: "auto" }}
                                                                                            >
                                                                                                <Input
                                                                                                    value={
                                                                                                        parameterValue[`param${key + 1}`]?.unitAnchor
                                                                                                    }
                                                                                                    className='uploadSnippetInput'
                                                                                                    placeholder='Enter Anchor Value'
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        onChangeChart(
                                                                                                            e,
                                                                                                            'uomanchorValue', key
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </p>
                                                                                            {/* )} */}
                                                                                        </Dragger>
                                                                                        <Dragger
                                                                                            className={`draggerSnippet ${DraggerActive
                                                                                                ? 'inActiveBorder'
                                                                                                : 'activeBorder'
                                                                                                }`}
                                                                                            style={{ pointerEvents: "none" }}
                                                                                        >
                                                                                            <p className='ant-upload-drag-icon'>
                                                                                                <PlusOutlined />
                                                                                            </p>
                                                                                            <p className='ant-upload-text'>
                                                                                                Drag
                                                                                                and
                                                                                                drop
                                                                                                snippet
                                                                                            </p>
                                                                                            <p
                                                                                                className='ant-upload-text-input'
                                                                                                onClick={
                                                                                                    (e) => DraggerInputHandlerSnippet(e, "unit")
                                                                                                }
                                                                                                style={{ pointerEvents: "auto" }}
                                                                                            >
                                                                                                <span>
                                                                                                    Or
                                                                                                    enter
                                                                                                    snippet
                                                                                                    number
                                                                                                </span>
                                                                                                <Input
                                                                                                    value={
                                                                                                        parameterValue[`param${key + 1}`]?.unitId

                                                                                                    }
                                                                                                    className='uploadSnippetInput'
                                                                                                    placeholder='Enter Snippet Value'
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) => {
                                                                                                        onChangeChart(
                                                                                                            e,
                                                                                                            'uomsnippetValue', key
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </p>
                                                                                        </Dragger>
                                                                                        <Form.Item name='valueFormat'>
                                                                                            <Select defaultValue='FORMAT'>
                                                                                                <Option value='FORMAT'>
                                                                                                    FORMAT
                                                                                                </Option>
                                                                                            </Select>
                                                                                        </Form.Item>
                                                                                        <Form.Item name='valueTransformation'>
                                                                                            <Input placeholder='Enter transformation' />
                                                                                        </Form.Item>

                                                                                        <Form.Item name='valueArea'>
                                                                                            <Input placeholder='Enter area' />
                                                                                        </Form.Item>
                                                                                        <Form.Item name='valueAnchorDirection'>
                                                                                            <Select defaultValue='AnchorDirection'>
                                                                                                <Option value='AnchorDirection'>
                                                                                                    Anchor
                                                                                                    Direction
                                                                                                </Option>
                                                                                            </Select>
                                                                                        </Form.Item>
                                                                                    </div>
                                                                                    <div className='parameterAddingBlock parameterValueBlock'>
                                                                                        <p>
                                                                                            Time
                                                                                        </p>
                                                                                        <p></p>
                                                                                        <Dragger
                                                                                            className={`draggerSnippet ${DraggerActive
                                                                                                ? 'activeBorder'
                                                                                                : 'inActiveBorder'
                                                                                                }`}
                                                                                            style={{ pointerEvents: "none" }}
                                                                                        >
                                                                                            <p className='ant-upload-drag-icon'>
                                                                                                <PlusOutlined />
                                                                                            </p>
                                                                                            <p className='ant-upload-text'>
                                                                                                Drag
                                                                                                and
                                                                                                drop
                                                                                                anchor
                                                                                            </p>
                                                                                            {/* {showInputAnchor && ( */}
                                                                                            <p
                                                                                                className='ant-upload-text-input'
                                                                                                onClick={
                                                                                                    (e) => DraggerInputHandlerAnchor(e, "time")
                                                                                                }
                                                                                                style={{ pointerEvents: "auto" }}
                                                                                            >
                                                                                                <Input
                                                                                                    value={
                                                                                                        parameterValue[`param${key + 1}`]?.timeAnchor
                                                                                                    }
                                                                                                    className='uploadSnippetInput'
                                                                                                    placeholder='Enter Anchor Value'
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        onChangeChart(
                                                                                                            e,
                                                                                                            'timeanchorValue', key
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </p>
                                                                                            {/* )} */}
                                                                                        </Dragger>
                                                                                        <Dragger
                                                                                            className={`draggerSnippet ${DraggerActive
                                                                                                ? 'inActiveBorder'
                                                                                                : 'activeBorder'
                                                                                                }`}
                                                                                            style={{ pointerEvents: "none" }}
                                                                                        >
                                                                                            <p className='ant-upload-drag-icon'>
                                                                                                <PlusOutlined />
                                                                                            </p>
                                                                                            <p className='ant-upload-text'>
                                                                                                Drag
                                                                                                and
                                                                                                drop
                                                                                                snippet
                                                                                            </p>
                                                                                            <p
                                                                                                className='ant-upload-text-input'
                                                                                                onClick={
                                                                                                    (e) => DraggerInputHandlerSnippet(e, "time")
                                                                                                }
                                                                                                style={{ pointerEvents: "auto" }}
                                                                                            >
                                                                                                <span>
                                                                                                    Or
                                                                                                    enter
                                                                                                    snippet
                                                                                                    number
                                                                                                </span>
                                                                                                <InputField
                                                                                                    value={
                                                                                                        parameterValue[`param${key + 1}`]?.timeId
                                                                                                    }
                                                                                                    className='uploadSnippetInput'
                                                                                                    placeholder='Enter Snippet Value'
                                                                                                    onChangeInput={(
                                                                                                        e
                                                                                                    ) => {
                                                                                                        onChangeChart(
                                                                                                            e,
                                                                                                            'timesnippetValue', key
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </p>
                                                                                        </Dragger>
                                                                                        <Form.Item name='valueFormat'>
                                                                                            <Select defaultValue='FORMAT'>
                                                                                                <Option value='FORMAT'>
                                                                                                    FORMAT
                                                                                                </Option>
                                                                                            </Select>
                                                                                        </Form.Item>
                                                                                        <Form.Item name='valueTransformation'>
                                                                                            <Input placeholder='Enter transformation' />
                                                                                        </Form.Item>

                                                                                        <Form.Item name='valueArea'>
                                                                                            <Input placeholder='Enter area' />
                                                                                        </Form.Item>
                                                                                        <Form.Item name='valueAnchorDirection'>
                                                                                            <Select defaultValue='AnchorDirection'>
                                                                                                <Option value='AnchorDirection'>
                                                                                                    Anchor
                                                                                                    Direction
                                                                                                </Option>
                                                                                            </Select>
                                                                                        </Form.Item>
                                                                                    </div>
                                                                                    <div className='parameterAddingBlock parameterValueBlock'>
                                                                                        <p>
                                                                                            Date
                                                                                        </p>
                                                                                        <p></p>
                                                                                        <Dragger
                                                                                            className={`draggerSnippet ${DraggerActive
                                                                                                ? 'activeBorder'
                                                                                                : 'inActiveBorder'
                                                                                                }`}
                                                                                            style={{ pointerEvents: "none" }}
                                                                                        >
                                                                                            <p className='ant-upload-drag-icon'>
                                                                                                <PlusOutlined />
                                                                                            </p>
                                                                                            <p className='ant-upload-text'>
                                                                                                Drag
                                                                                                and
                                                                                                drop
                                                                                                anchor
                                                                                            </p>
                                                                                            {/* {showInputAnchor && ( */}
                                                                                            <p
                                                                                                className='ant-upload-text-input'
                                                                                                onClick={
                                                                                                    (e) => DraggerInputHandlerAnchor(e, "date")
                                                                                                }
                                                                                                style={{ pointerEvents: "auto" }}
                                                                                            >
                                                                                                <InputField
                                                                                                    value={
                                                                                                        parameterValue[`param${key + 1}`]?.dateAnchor

                                                                                                    }
                                                                                                    className='uploadSnippetInput'
                                                                                                    placeholder='Enter Anchor Value'
                                                                                                    onChangeInput={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        onChangeChart(
                                                                                                            e,
                                                                                                            'dateanchorValue', key
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            </p>
                                                                                            {/* )} */}
                                                                                        </Dragger>
                                                                                        <Dragger
                                                                                            className={`draggerSnippet ${DraggerActive
                                                                                                ? 'inActiveBorder'
                                                                                                : 'activeBorder'
                                                                                                }`}
                                                                                            style={{ pointerEvents: "none" }}
                                                                                        >
                                                                                            <p className='ant-upload-drag-icon'>
                                                                                                <PlusOutlined />
                                                                                            </p>
                                                                                            <p className='ant-upload-text'>
                                                                                                Drag
                                                                                                and
                                                                                                drop
                                                                                                snippet
                                                                                            </p>
                                                                                            <p
                                                                                                className='ant-upload-text-input'
                                                                                                onClick={
                                                                                                    (e) => DraggerInputHandlerSnippet(e, "date")
                                                                                                }
                                                                                                style={{ pointerEvents: "auto" }}
                                                                                            >
                                                                                                <span>
                                                                                                    Or
                                                                                                    enter
                                                                                                    snippet
                                                                                                    number
                                                                                                </span>
                                                                                                <InputField
                                                                                                    value={
                                                                                                        parameterValue[`param${key + 1}`]?.dateId

                                                                                                    }
                                                                                                    className='uploadSnippetInput'
                                                                                                    placeholder='Enter Snippet Value'
                                                                                                    onChangeInput={(
                                                                                                        e
                                                                                                    ) => {
                                                                                                        onChangeChart(
                                                                                                            e,
                                                                                                            'datesnippetValue', key
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                            </p>
                                                                                        </Dragger>
                                                                                        <Form.Item name='valueFormat'>
                                                                                            <Select defaultValue='FORMAT'>
                                                                                                <Option value='FORMAT'>
                                                                                                    FORMAT
                                                                                                </Option>
                                                                                            </Select>
                                                                                        </Form.Item>
                                                                                        <Form.Item name='valueTransformation'>
                                                                                            <Input placeholder='Enter transformation' />
                                                                                        </Form.Item>

                                                                                        <Form.Item name='valueArea'>
                                                                                            <Input placeholder='Enter area' />
                                                                                        </Form.Item>
                                                                                        <Form.Item name='valueAnchorDirection'>
                                                                                            <Select defaultValue='AnchorDirection'>
                                                                                                <Option value='AnchorDirection'>
                                                                                                    Anchor
                                                                                                    Direction
                                                                                                </Option>
                                                                                            </Select>
                                                                                        </Form.Item>
                                                                                        <Button type='primary' className='defineTableBtn' onClick={findTemplate}>
                                                                                            <MonitorOutlined /> Find
                                                                                        </Button>
                                                                                        <p>Found in {`${fileList.length}/${searchedFileList.length}`} files</p>
                                                                                    </div>
                                                                                    <div>{fileList.map(item => (
                                                                                        <p>{item?.split('_')[0]}</p>
                                                                                    ))}</div>

                                                                                    {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                                                                                </div>

                                                                            </div>

                                                                        </Panel>
                                                                        // </Space>

                                                                    ))}
                                                                </Collapse>
                                                                <Form.Item>
                                                                    <div
                                                                        className='firstParameter-para'
                                                                        onClick={() => parameterAddingHandler()}
                                                                    >
                                                                        <p
                                                                            onClick={() => {
                                                                                // if(callAdd == false){
                                                                                add()
                                                                                // }
                                                                            }


                                                                            }
                                                                        >
                                                                            {paramaterAdded
                                                                                ? 'Add another paramater'
                                                                                : 'Add your first Parameter'}
                                                                        </p>

                                                                    </div>
                                                                </Form.Item>
                                                            </>
                                                        )}
                                                    </Form.List>
                                                </div>
                                                <div className='saveSnippetsBlock'>
                                                    <Button
                                                        type='default'
                                                        className='saveSnippetsBtn'
                                                        onClick={() => saveTemplateHandler()}
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
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
                                    span={12}
                                    className='pbrCenterPanelCol pbrCenterBlockLeft'
                                >
                                    <p className='pbrCenterPanelHeader-para' onClick={showModal}>
                                        Preview
                                        <span>{params?.file?.split('_')[0]}</span>
                                    </p>
                                </Col>
                                <Col
                                    span={12}
                                    className='pbrCenterPanelCol pbrCenterBlockRight'
                                >
                                    <div className='drawSnippet'>
                                        <EditOutlined />
                                        Draw Snippet
                                    </div>
                                    <div className='cropSnippet'>
                                        {/* <img
                                            src={cropImg}
                                            className='panelCenterImg'
                                        /> */}
                                        <Dropdown
                                            style={{ color: '#ffffff' }}
                                            trigger={['click']}
                                            overlay={modes}>
                                            <ImCrop />
                                        </Dropdown>
                                    </div>
                                    <div className='undoSnippet'>
                                        <img src={undoImg} className='panelCenterImg' />
                                    </div>
                                    <div className='redoSnippet'>
                                        <img src={redoImg} className='panelCenterImg' />
                                    </div>
                                    <div className='contrastSnippet'>
                                        <img src={contrastImg} className='panelCenterImg' />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='pbrCenterPdfBlock'>
                            <div className='pdfContent'>
                                <div className='snippetsFound'></div>
                                <div className='snippetsImg'></div>
                            </div>
                            <div className='pdfToImgBlock' onClick={onClickImage}>
                                {areasMap.areas.length > 0 && (
                                    <ImageMapper
                                        id='imageMApper'
                                        className='pdfToImageWrapper'
                                        src={displayImage}
                                        map={areasMap}
                                        // onLoad={() => load()}
                                        onClick={area => clicked(area)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <Modal
                        title='Preview'
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}>
                        <Table
                            loading={tableLoading}
                            className='pbrTemplates-table'
                            columns={modalColumns}
                            dataSource={modalData}
                            pagination={false}
                        />
                    </Modal>
                </div>
                <div className='pbrTemplateRight'>
                    <div className='pbrPanel pbrRightPanel'>
                        <Sider trigger={null} collapsible collapsed={rightPanelCollapsed}>
                            <span className='trigger' onClick={toggleRightCollapsed}>
                                <img src={panelRightImg} className='panelImg' />
                            </span>
                            <Collapse
                                accordion
                                expandIconPosition='right'
                                defaultActiveKey={['1']}>
                                <Panel header='Snippet Attributes' key='1'>
                                    <div className='snippetsBlock'>
                                        <Form
                                            layout='vertical'
                                            form={form}
                                            className='formNewTemplate'>
                                            <InputField
                                                value={areasMapObject.snippetID}
                                                label='Snippet ID'
                                                placeholder='Enter Snippet ID'
                                                onChangeInput={e => {
                                                    onChangeChart(e, 'snippetId');
                                                }}
                                            />
                                            <InputField
                                                value={areasMapObject.areaValue}
                                                label='Key 1'
                                                placeholder='Enter Key 1'
                                                onChangeInput={e => {
                                                    onChangeChart(e, 'snippetKey1');
                                                }}
                                                disabled
                                            />
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={areasMapObject.coords[0]}
                                                    label='X1'
                                                    placeholder='Enter Value'
                                                    onChangeInput={e => {
                                                        onChangeChart(e, 'x1');
                                                    }}
                                                />
                                                <InputField
                                                    value={areasMapObject.coords[1]}
                                                    label='Y1'
                                                    placeholder='Enter Value'
                                                    onChangeInput={e => {
                                                        onChangeChart(e, 'y1');
                                                    }}
                                                />
                                            </div>
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={areasMapObject.coords[2]}
                                                    label='X2'
                                                    placeholder='Enter Value'
                                                    onChangeInput={e => {
                                                        onChangeChart(e, 'x2');
                                                    }}
                                                />
                                                <InputField
                                                    value={areasMapObject.coords[3]}
                                                    label='Y2'
                                                    placeholder='Enter Value'
                                                    onChangeInput={e => {
                                                        onChangeChart(e, 'y2');
                                                    }}
                                                />
                                            </div>
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={areasMapObject.areaValue}
                                                    label='Area'
                                                    placeholder='Enter Value'
                                                    onChangeInput={e => {
                                                        onChangeChart(e, 'area');
                                                    }}
                                                    disabled
                                                />
                                            </div>
                                            <div className='hierarchyBlock'>
                                                <p>Hierarchy</p>
                                                <div className='hierarchyDiv hierarchyDiv1'>
                                                    <CaretDownOutlined />
                                                    TemplateNew01
                                                </div>
                                                <div className='hierarchyDiv hierarchyDiv2'>
                                                    <CaretDownOutlined />
                                                    0001-6.0
                                                </div>
                                                <div className='hierarchyDiv hierarchyDiv3'>
                                                    <CaretDownOutlined />8
                                                </div>
                                                <div className='hierarchyDiv hierarchyDiv4'>
                                                    <CaretDownOutlined />
                                                    ID001
                                                </div>
                                            </div>
                                            <div className='saveSnippetsBlock'>
                                                <Button
                                                    type='default'
                                                    className='saveSnippetsBtn'
                                                    onClick={() => saveTemplateHandler()}>
                                                    Save
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </Panel>
                            </Collapse>
                        </Sider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaperBatchRecordsTemplate;
