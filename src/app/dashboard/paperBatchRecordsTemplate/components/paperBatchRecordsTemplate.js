/**
 * @author Ranjith <ranjith.k@mareana.com>
 * @Mareana - BMS PBR
 * @version 1
 * @Last Modified - 18 March, 2022
 * @Last Changed By - @ranjith
 */

import { Col, Collapse, Form, Input, Row, Select, Button, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.scss';

import ImageMapper from 'react-image-mapper';

import {
    ArrowLeftOutlined,
    EditOutlined,
    ArrowRightOutlined,
    EllipsisOutlined,
    CaretDownOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import panelLeftImg from '../../../../assets/images/panel-leftIcon.svg';
import panelRightImg from '../../../../assets/images/panel-rightIcon.svg';
import cropImg from '../../../../assets/images/cropImg.svg';
import undoImg from '../../../../assets/images/undoImg.svg';
import redoImg from '../../../../assets/images/redoImg.svg';
import contrastImg from '../../../../assets/images/contrastImg.svg';
// import BatchRecordExample from '../../../../assets/images/BatchRecordImg.png';
import BatchRecordExample from '../../../../assets/images/BatchRecordExample2.jpg';

import InputField from '../../../../components/InputField/InputField';

import Sider from 'antd/lib/layout/Sider';
import AddParameter from './addParameter/AddParameter';
import { getBoundingBoxData } from '../../../../services/pbrService';

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

function PaperBatchRecordsTemplate() {
    var AREAS_MAP = {
        name: 'my-map',
        areas: [
            // {
            //     snippetID: '1',
            //     areaValue: 'Document ID',
            //     shape: 'rect',
            //     coords: [120, 90, 245, 65],
            //     preFillColor: 'transparent',
            //     fillColor: 'transparent',
            //     strokeColor: 'red',
            // },
            // {
            //     snippetID: '2',
            //     areaValue: 'MBR-0001',
            //     shape: 'rect',
            //     coords: [250, 90, 340, 65],
            //     preFillColor: 'transparent',
            //     fillColor: 'transparent',
            //     strokeColor: 'red',
            // },
            // {
            //     snippetID: '3',
            //     areaValue: 'Drug Substance Name',
            //     shape: 'rect',
            //     coords: [120, 90, 350, 120],
            //     preFillColor: 'transparent',
            //     fillColor: 'transparent',
            //     strokeColor: 'red',
            // },
        ],
    };

    const [form] = Form.useForm();
    const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
    const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
    const [paramaterAdded, setParamaterAdded] = useState(false);
    const [conditionList, setConditionList] = useState(['AND', 'OR', 'NOT']);
    const [draggerFirstAreaValue, setDraggerFirstAreaValue] = useState('');
    const [draggerLastAreaValue, setDraggerLastAreaValue] = useState('');
    const [clickedSnippetId, setClickedSnippetId] = useState('');
    const [boundingBoxClicked, setBoundingBoxClicked] = useState(false);
    const [DraggerActive, setDraggerActive] = useState(true);
    const [showInputAnchor, setShowInputAnchor] = useState(false);
    const [areasMap, setAreasMap] = useState(AREAS_MAP);
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

    const toggleLeftCollapsed = () => {
        setLeftPanelCollapsed(!leftPanelCollapsed);
    };

    const toggleRightCollapsed = () => {
        setRightPanelCollapsed(!rightPanelCollapsed);
    };

    const parameterAddingHandler = () => {
        setParamaterAdded(true);
    };

    const DraggerInputHandlerAnchor = (e) => {
        e.stopPropagation();
        setDraggerActive(true);
    };

    const DraggerInputHandlerSnippet = (e) => {
        e.stopPropagation();
        setDraggerActive(false);
    };

    const onClickImage = (e) => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
    };

    const onChangeChart = (e, field) => {
        if (e.target.value !== null) {
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
            } else if (field === 'snippetValue') {
                setDraggerLastAreaValue(e.target.value);
            } else if (field === 'snippetId') {
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

            let newArr = [...areasMap.areas];
            newArr.forEach((ele, i) => {
                if (clickedSnippetId === ele.areaValue) {
                    // (ele.snippetID = obj.snippetID),
                    //     (ele.areaValue = obj.areaValue);
                    if (field === 'x1') {
                        ele.coords[0] = e.target.value;
                    } else if (field === 'y1') {
                        ele.coords[1] = e.target.value;
                    } else if (field === 'x2') {
                        ele.coords[2] = e.target.value;
                    } else if (field === 'y2') {
                        ele.coords[3] = e.target.value;
                    }
                }
            });
            setAreasMap({ ...areasMap, areas: newArr });
        }
    };

    /**
     * TODO: get boundingBoxData info
     */
    const getBoundingBoxDataInfo = async (_reqBatch) => {
        try {
            // dispatch(showLoader());
            // let _reqBatch = {
            //     fileId: 'Batch Record Example 2.pdf.json',
            //     pageId: 0,
            // };
            const batchRes = await getBoundingBoxData(_reqBatch);
            let areasArr = [];
            if (batchRes.Data.length > 0) {
                batchRes.Data.forEach((e) => {
                    let x1 = e.key_left * 1032;
                    let x2 = (e.key_left + e.key_width) * 1032;
                    let y1 = e.key_top * 1336;
                    let y2 = (e.key_top + e.key_height) * 1336;
                    let obj = {
                        snippetID: e.snippet_id,
                        areaValue: e.key_text,
                        shape: 'rect',
                        coords: [x1, y1, x2, y2],
                        preFillColor: 'transparent',
                        fillColor: 'transparent',
                        strokeColor: e.color,
                    };
                    let valuex1 = e.value_left * 1032;
                    let valuex2 = (e.value_left + e.value_width) * 1032;
                    let valuey1 = e.value_top * 1336;
                    let valuey2 = (e.value_top + e.value_height) * 1336;
                    let obj1 = {
                        snippetID: e.snippet_id,
                        areaValue: e.value_text,
                        shape: 'rect',
                        coords: [valuex1, valuey1, valuex2, valuey2],
                        preFillColor: 'transparent',
                        fillColor: 'transparent',
                        strokeColor: e.color,
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
        getBoundingBoxDataInfo();
    }, []);
    const load = () => {};

    const clicked = (area) => {
        setBoundingBoxClicked(true);
        setClickedSnippetId(area.areaValue);

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

        if (DraggerActive) {
            setShowInputAnchor(true);
            setDraggerFirstAreaValue(area.areaValue);
        } else {
            setDraggerLastAreaValue(area.snippetID);
        }
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
                        <span className='header-title'>Template001</span>
                    </div>
                </div>
                <div className='sub-header'>
                    <div className='sub-header-title'>
                        <Button type='primary' className='defineTableBtn'>
                            <ArrowRightOutlined /> Define Table
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
                                    <div className='addParameterBlock'>
                                        {paramaterAdded ? (
                                            <div className='parameterAdded-block'>
                                                <InputField
                                                    label='Name'
                                                    placeholder='Enter name'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(
                                                            e,
                                                            'parameterName'
                                                        );
                                                    }}
                                                />
                                                <div className='parameterAddingBlock parameterValueBlock'>
                                                    <p>Value</p>
                                                    <p></p>
                                                    <Dragger
                                                        className={`draggerSnippet ${
                                                            DraggerActive
                                                                ? 'activeBorder'
                                                                : 'inActiveBorder'
                                                        }`}
                                                    >
                                                        <p className='ant-upload-drag-icon'>
                                                            <PlusOutlined />
                                                        </p>
                                                        <p className='ant-upload-text'>
                                                            Drag and drop anchor
                                                        </p>
                                                        {showInputAnchor && (
                                                            <p
                                                                className='ant-upload-text-input'
                                                                onClick={
                                                                    DraggerInputHandlerAnchor
                                                                }
                                                            >
                                                                <InputField
                                                                    value={
                                                                        draggerFirstAreaValue
                                                                    }
                                                                    className='uploadSnippetInput'
                                                                    placeholder='Enter Anchor Value'
                                                                    onChangeInput={(
                                                                        e
                                                                    ) =>
                                                                        onChangeChart(
                                                                            e,
                                                                            'anchorValue'
                                                                        )
                                                                    }
                                                                />
                                                            </p>
                                                        )}
                                                    </Dragger>
                                                    <Dragger
                                                        className={`draggerSnippet ${
                                                            DraggerActive
                                                                ? 'inActiveBorder'
                                                                : 'activeBorder'
                                                        }`}
                                                    >
                                                        <p className='ant-upload-drag-icon'>
                                                            <PlusOutlined />
                                                        </p>
                                                        <p className='ant-upload-text'>
                                                            Drag and drop
                                                            snippet
                                                        </p>
                                                        <p
                                                            className='ant-upload-text-input'
                                                            onClick={
                                                                DraggerInputHandlerSnippet
                                                            }
                                                        >
                                                            <span>
                                                                Or enter snippet
                                                                number
                                                            </span>
                                                            <InputField
                                                                value={
                                                                    draggerLastAreaValue
                                                                }
                                                                className='uploadSnippetInput'
                                                                placeholder='Enter Snippet Value'
                                                                onChangeInput={(
                                                                    e
                                                                ) => {
                                                                    onChangeChart(
                                                                        e,
                                                                        'snippetValue'
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
                                                                Anchor Direction
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className='firstParameter-para'
                                                onClick={parameterAddingHandler}
                                            >
                                                <p>Add your first paramater</p>
                                            </div>
                                        )}
                                        {paramaterAdded && (
                                            <div className='firstParameter-para'>
                                                <p>Add another paramater</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* <Form
                                        layout='vertical'
                                        form={form}
                                        className='formNewTemplate'
                                    >
                                        <AddParameter
                                            paramaterAdded={paramaterAdded}
                                            setParamaterAdded={
                                                setParamaterAdded
                                            }
                                        />
                                    </Form> */}
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
                                    <p className='pbrCenterPanelHeader-para'>
                                        Preview
                                        <span>loremipsum23.pdf</span>
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
                                        <img
                                            src={cropImg}
                                            className='panelCenterImg'
                                        />
                                    </div>
                                    <div className='undoSnippet'>
                                        <img
                                            src={undoImg}
                                            className='panelCenterImg'
                                        />
                                    </div>
                                    <div className='redoSnippet'>
                                        <img
                                            src={redoImg}
                                            className='panelCenterImg'
                                        />
                                    </div>
                                    <div className='contrastSnippet'>
                                        <img
                                            src={contrastImg}
                                            className='panelCenterImg'
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className='pbrCenterPdfBlock'>
                            <div className='pdfContent'>
                                <div className='snippetsFound'></div>
                                <div className='snippetsImg'></div>
                            </div>
                            <div
                                className='pdfToImgBlock'
                                onClick={onClickImage}
                            >
                                {areasMap.areas.length > 0 && (
                                    <ImageMapper
                                        className='pdfToImageWrapper'
                                        src={BatchRecordExample}
                                        map={areasMap}
                                        onLoad={() => load()}
                                        onClick={(area) => clicked(area)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pbrTemplateRight'>
                    <div className='pbrPanel pbrRightPanel'>
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={rightPanelCollapsed}
                        >
                            <span
                                className='trigger'
                                onClick={toggleRightCollapsed}
                            >
                                <img src={panelRightImg} className='panelImg' />
                            </span>
                            <Collapse
                                accordion
                                expandIconPosition='right'
                                defaultActiveKey={['1']}
                            >
                                <Panel header='Snippet Attributes' key='1'>
                                    <div className='snippetsBlock'>
                                        <Form
                                            layout='vertical'
                                            form={form}
                                            className='formNewTemplate'
                                        >
                                            <InputField
                                                value={areasMapObject.snippetID}
                                                label='Snippet ID'
                                                placeholder='Enter Snippet ID'
                                                onChangeInput={(e) => {
                                                    onChangeChart(
                                                        e,
                                                        'snippetId'
                                                    );
                                                }}
                                            />
                                            <InputField
                                                value={areasMapObject.areaValue}
                                                label='Key 1'
                                                placeholder='Enter Key 1'
                                                onChangeInput={(e) => {
                                                    onChangeChart(
                                                        e,
                                                        'snippetKey1'
                                                    );
                                                }}
                                                disabled
                                            />
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={
                                                        areasMapObject.coords[0]
                                                    }
                                                    label='X1'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(e, 'x1');
                                                    }}
                                                />
                                                <InputField
                                                    value={
                                                        areasMapObject.coords[1]
                                                    }
                                                    label='Y1'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(e, 'y1');
                                                    }}
                                                />
                                            </div>
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={
                                                        areasMapObject.coords[2]
                                                    }
                                                    label='X2'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(e, 'x2');
                                                    }}
                                                />
                                                <InputField
                                                    value={
                                                        areasMapObject.coords[3]
                                                    }
                                                    label='Y2'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(e, 'y2');
                                                    }}
                                                />
                                            </div>
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={
                                                        areasMapObject.areaValue
                                                    }
                                                    label='Area'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(
                                                            e,
                                                            'area'
                                                        );
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
                                                >
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
