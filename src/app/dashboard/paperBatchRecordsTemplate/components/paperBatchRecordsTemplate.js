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
import BatchRecordExample from '../../../../assets/images/BatchRecordImg.png';

import InputField from '../../../../components/InputField/InputField';

import Sider from 'antd/lib/layout/Sider';
import SelectField from '../../../../components/SelectField/SelectField';

const { Panel } = Collapse;
const { Option } = Select;
const { Dragger } = Upload;

function paperBatchRecordsTemplate() {
    const [form] = Form.useForm();
    const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
    const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
    const [paramaterAdded, setParamaterAdded] = useState(false);
    const [conditionList, setConditionList] = useState(['AND', 'OR', 'NOT']);
    const [snippetId, setSnippetId] = useState('');
    const [areaValue, setAreaValue] = useState('');
    const [draggerFirstAreaValue, setDraggerFirstAreaValue] = useState('');
    const [draggerLastAreaValue, setDraggerLastAreaValue] = useState('');
    const [coordLeftX, setCoordLeftX] = useState(120);
    const [coordLeftY, setCoordLeftY] = useState();
    const [coordRightX, setCoordRightX] = useState();
    const [coordRightY, setCoordRightY] = useState();
    const [boundingBoxClicked, setBoundingBoxClicked] = useState(false);
    const [DraggerActive, setDraggerActive] = useState(true);
    const [showInputAnchor, setShowInputAnchor] = useState(false);
    const [AREAS_MAP, setAREAS_MAP] = useState({
        name: 'my-map',
        areas: [
            {
                snippetID: '1',
                areaValue: 'Document ID',
                shape: 'rect',
                coords: [110, 55, 200, 75],
                preFillColor: 'transparent',
                fillColor: 'transparent',
                strokeColor: 'red',
            },
            {
                snippetID: '2',
                areaValue: 'MBR-0001',
                shape: 'rect',
                coords: [285, 100, 380, 65],
                preFillColor: 'transparent',
                fillColor: 'transparent',
                strokeColor: 'red',
            },
            {
                snippetID: '3',
                areaValue: 'Drug Substance Name',
                shape: 'rect',
                coords: [152, 106, 380, 131],
                preFillColor: 'transparent',
                fillColor: 'transparent',
                strokeColor: 'red',
            },
        ],
    });

    useEffect(()=>{
        console.log("rightPanelCollapsed",rightPanelCollapsed)
        console.log("leftPanelCollapsed",leftPanelCollapsed)
        if((leftPanelCollapsed == false && !rightPanelCollapsed)||(leftPanelCollapsed == true && rightPanelCollapsed) ){
            console.log("closed")
            console.log("AREAS_MAP",AREAS_MAP)
            let obj = {...AREAS_MAP}
            obj.areas.forEach((item,key)=>{
                if(key ===0){
                    console.log("iem",item)
                    item.coords = [152, 100, 276, 65]
                } 
                else if(key ===1){
                    console.log("iem",item)
                    item.coords = [285, 100, 380, 65]
                }
                else if(key ===2){
                    console.log("iem",item)
                    item.coords = [152, 106, 380, 131]
                } 
            })
            console.log("obj",obj)
            // AREAS_MAP = obj
            setAREAS_MAP(obj)
        }
        else{
            console.log("open")
            let obj =  {...AREAS_MAP}
            obj.areas.forEach((item,key)=>{
                if(key ===0){
                    item.coords = [110, 55, 200, 75]
                } 
                else if(key ===1){
                    console.log("iem",item)
                    item.coords = [210, 55, 300, 75]
                }
                else if(key ===2){
                    console.log("iem",item)
                    item.coords = [152, 106, 380, 131]
                } 
            })
            console.log("obj",obj)
            // AREAS_MAP = obj
            setAREAS_MAP(obj)
        }

    },[leftPanelCollapsed,rightPanelCollapsed])

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
        console.log('Left? : ' + x + ' ; Top? : ' + y);
    };

    const onChangeChart = (e, field) => {
        if (e.target.value !== null) {
            if (field === 'pageId') {
                console.log(e.target.value);
            }
        }
    };

    // let AREAS_MAP = {
    //     name: 'my-map',
    //     areas: [
    //         {
    //             snippetID: '1',
    //             areaValue: 'Document ID',
    //             shape: 'rect',
    //             coords: [110, 55, 200, 75],
    //             preFillColor: 'transparent',
    //             fillColor: 'transparent',
    //             strokeColor: 'red',
    //         },
    //         {
    //             snippetID: '2',
    //             areaValue: 'MBR-0001',
    //             shape: 'rect',
    //             coords: [285, 100, 380, 65],
    //             preFillColor: 'transparent',
    //             fillColor: 'transparent',
    //             strokeColor: 'red',
    //         },
    //         {
    //             snippetID: '3',
    //             areaValue: 'Drug Substance Name',
    //             shape: 'rect',
    //             coords: [152, 106, 380, 131],
    //             preFillColor: 'transparent',
    //             fillColor: 'transparent',
    //             strokeColor: 'red',
    //         },
    //     ],
    // };
    
    

    const load = () => {
        //alert('hello');
    };

    const clicked = (area) => {
        console.log('cliked area', area);
        setBoundingBoxClicked(true);
        setSnippetId(area.snippetID);
        setAreaValue(area.areaValue);
        setCoordLeftX(area.coords[0]);
        setCoordLeftY(area.coords[1]);
        setCoordRightX(area.coords[2]);
        setCoordRightY(area.coords[3]);
        if (DraggerActive) {
            setShowInputAnchor(true);
            setDraggerFirstAreaValue(area.areaValue);
        } else {
            setDraggerLastAreaValue(area.areaValue);
        }
    };

    console.log('d0', draggerFirstAreaValue);

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
                                                                    ) => {
                                                                        onChangeChart(
                                                                            e,
                                                                            'anchorValue'
                                                                        );
                                                                    }}
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
                                <ImageMapper
                                    className='pdfToImageWrapper'
                                    src={BatchRecordExample}
                                    map={AREAS_MAP}
                                    onLoad={() => load()}
                                    onClick={(area) => clicked(area)}
                                />
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
                                                value={snippetId}
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
                                                value={areaValue}
                                                label='Key 1'
                                                placeholder='Enter Key 1'
                                                onChangeInput={(e) => {
                                                    onChangeChart(
                                                        e,
                                                        'snippetKey1'
                                                    );
                                                }}
                                            />
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={coordLeftX}
                                                    label='X1'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(e, 'x1');
                                                    }}
                                                />
                                                <InputField
                                                    value={coordLeftY}
                                                    label='Y1'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(e, 'y1');
                                                    }}
                                                />
                                            </div>
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={coordRightX}
                                                    label='X2'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(e, 'x2');
                                                    }}
                                                />
                                                <InputField
                                                    value={coordRightY}
                                                    label='Y2'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(e, 'y2');
                                                    }}
                                                />
                                            </div>
                                            <div className='secondary-flexBox'>
                                                <InputField
                                                    value={areaValue}
                                                    label='Area'
                                                    placeholder='Enter Value'
                                                    onChangeInput={(e) => {
                                                        onChangeChart(
                                                            e,
                                                            'area'
                                                        );
                                                    }}
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

export default paperBatchRecordsTemplate;
