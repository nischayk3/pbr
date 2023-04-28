import React, { useEffect, useState } from 'react'
import { Row, Col, Checkbox, Input, Button, Select, Modal, Slider } from 'antd'
import {
    ArrowRightOutlined
} from '@ant-design/icons';
import QueryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { expand_bbox, getAdvanceSetting, saveAdvanceSetting, loadAdvanceSetting } from '../../../../../services/pbrService'
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';

function SelectionMethod(props) {
    let { method, formValues, setFormValues, name, setAdvancePopup, advancePopup, imageHeight, imageWidth, pageNumber } = props
    const location = useLocation()
    const dispatch = useDispatch();
    let params = QueryString.parse(location.search)
    const [loadSettingOptions, setLoadSettingOptions] = useState([]);
    const [loadValue, setLoadValue] = useState('');
    const [word, setWord] = useState(false);
    const [line, setLine] = useState(false);
    const [invert, setInvert] = useState(false);
    const [areaSelector, setAreaSelector] = useState({
        up: 0,
        down: 0,
        right: 0,
        left: 0
    });
    const [showImage, setShowImage] = useState(false);
    const [imageData, setImageData] = useState('');
    const [mapper, setMapper] = useState([]);
    const [saveAs, setSaveAs] = useState(false);
    const [saveAsName, setSaveAsName] = useState('');

    const advanceSetting = async (val, flag) => {
        try {
            dispatch(showLoader());
            let req = {
                method: method,
                name: val,
                created_by: null
            }
            let res = await getAdvanceSetting(req)
            if (res.Status === 200) {
                dispatch(hideLoader());
                setAreaSelector({
                    up: res.Data[0]?.["bbox_delta"]['top_expander'],
                    down: res.Data[0]?.["bbox_delta"]['height_expander'],
                    right: res.Data[0]?.["bbox_delta"]['width_expander'],
                    left: res.Data[0]?.["bbox_delta"]['left_expander']
                })
                setWord(res.Data[0]?.["box_type"]['word'])
                setLine(res.Data[0]?.["box_type"]['line'])
                setInvert(res.Data[0]?.["box_type"]['invert'])
                // if (val === 'default' && flag==='apply') {
                //     let obj = formValues
                //     obj[name] = { ...obj[name], advance_setting: res.Data }
                //     setFormValues(obj)
                // }
            } else {
                dispatch(hideLoader());
                setWord(false)
                setLine(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const loadSetting = async (val) => {
        try {
            dispatch(showLoader());
            let user = localStorage.getItem("user_id")
            let req = {
                method: method,
                created_by: user
            }
            let res = await loadAdvanceSetting(req)
            if (res.Status === 200) {
                dispatch(hideLoader());
                setLoadSettingOptions(res.Data)
                setLoadValue(val ? val : res.Data[0]?.value)
                advanceSetting(val ? val : res.Data[0]?.value)
            } else {
                dispatch(hideLoader());
                setLoadSettingOptions([])
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (advancePopup) {
            if (formValues[name]?.advance_setting && method === formValues[name]?.advance_setting[0]?.method) {
                loadSetting(formValues[name]?.advance_setting[0]?.setting_name)
            }
            else {
                loadSetting()
            }
        }
        if (formValues[name]?.selection_method.length > 0) {
            let arr = formValues[name]?.selection_method?.map(item => ({ key: item.selectionVal, value: '' }))
            setMapper(arr)

        }
    }, [advancePopup])

    const handleLoadChange = (val) => {
        setLoadValue(val)
        advanceSetting(val)
    }

    const getAreaImage = async () => {
        try {
            let height = (formValues[name]?.selection_method[0]?.coords[3] - formValues[name]?.selection_method[0]?.coords[1]) / imageHeight
            let left = formValues[name]?.selection_method[0]?.coords[0] / imageWidth
            let top = formValues[name]?.selection_method[0]?.coords[1] / imageHeight
            let width = (formValues[name]?.selection_method[0]?.coords[2] - formValues[name]?.selection_method[0]?.coords[0]) / imageWidth
            let req = {
                filename: `${params.file?.split('.pdf')[0]}_page-${pageNumber - 1}.jpeg`,
                bbox: {
                    height: height,
                    left: left,
                    top: top,
                    width: width
                },
                bbox_delta: {
                    top_expander: areaSelector?.up,
                    left_expander: areaSelector?.left,
                    height_expander: areaSelector?.down,
                    width_expander: areaSelector?.right
                }
            }
            let res = await expand_bbox(req)
            if (res.status === 200) {
                setImageData(res.data)
            }

        } catch (err) {
            console.log(err)
        }
    }

    const handleSave = async () => {
        try {
            if (word || line) {
                dispatch(showLoader());
                let user = localStorage.getItem("user_id")
                let req = {
                    name: loadValue,
                    method: method,
                    settings: {
                        box_type: { "word": word, "line": line },
                        invert: false,
                        mapper: mapper,
                        setting_name: loadValue,
                        bbox_delta: {
                            top_expander: areaSelector?.up,
                            left_expander: areaSelector?.left,
                            height_expander: areaSelector?.down,
                            width_expander: areaSelector?.right
                        },
                        method: method
                    },
                    changed_by: user,
                    action_type: "save",
                    created_by: null
                }
                let res = await saveAdvanceSetting(req)
                if (res.Status === 202) {
                    dispatch(hideLoader());
                    let obj = formValues
                    obj[name] = { ...obj[name], advance_setting: res.Data }
                    setFormValues(obj)
                    // setAdvancePopup(false)
                } else {
                    dispatch(showNotification('error', res.Message));
                    dispatch(hideLoader());
                }
            } else {
                dispatch(showNotification('error', "Select WORD or Line"));
            }
        } catch (err) {
            console.log("err", err)
        }
    }

    const handleSaveAs = async () => {
        try {
            if ((word || line) && saveAsName.length > 0) {
                dispatch(showLoader());
                let user = localStorage.getItem("user_id")
                let req = {
                    name: saveAsName,
                    method: method,
                    settings: {
                        box_type: { "word": word, "line": line },
                        invert: false,
                        mapper: mapper,
                        setting_name: loadValue,
                        bbox_delta: {
                            top_expander: areaSelector?.up,
                            left_expander: areaSelector?.left,
                            height_expander: areaSelector?.down,
                            width_expander: areaSelector?.right
                        },
                        method: method
                    },
                    changed_by: null,
                    action_type: "save_as",
                    created_by: user
                }
                let res = await saveAdvanceSetting(req)
                if (res.Status === 202) {
                    dispatch(hideLoader());
                    let obj = formValues
                    obj[name] = { ...obj[name], advance_setting: res.Data }
                    setFormValues(obj)
                    setSaveAsName('')
                    setSaveAs(false)
                    setLoadValue(saveAsName)
                    // loadSetting(saveAsName)
                    // setAdvancePopup(false)
                } else {
                    dispatch(showNotification('error', res.Message));
                    dispatch(hideLoader());
                }
            } else {
                let str = ''
                if (saveAsName.length > 0) {
                    str = "Select WORD or Line"
                } else {
                    str = "Enter Name"
                }
                dispatch(showNotification('error', str));
            }
        } catch (err) {
            console.log("err", err)
        }
    }
   
    return (
        <div style={{ height: 450, overflowY: 'scroll' }}>
            <div>
                <Row >
                    <Col span={12}>
                        <Select onChange={handleLoadChange} value={loadValue} options={loadSettingOptions} placeholder="Load setting" style={{ width: 150 }} />
                    </Col>
                    <Col span={12}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button onClick={() => loadValue === 'default' ? advanceSetting('default', 'apply') : handleSave()} >{`Apply / Save`}</Button>
                            <Button onClick={() => setSaveAs(true)} className='custom-secondary-btn' style={{ marginLeft: 10 }}>Create New</Button>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }} >
                    <h4>
                        Custom Grading
                    </h4>
                </Row>
                {
                    formValues[name]?.selection_method?.map((item, index) => (
                        <Row style={{ marginTop: index === 0 ? 2 : 10 }}>
                            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                <Input value={item.selectionVal} />
                                <ArrowRightOutlined style={{ marginTop: 4, marginLeft: 20, marginRight: 20 }} />
                                <Input value={mapper[index]?.value} onChange={(e) => {
                                    let arr = [...mapper]
                                    arr[index]['value'] = e.target.value
                                    setMapper(arr)
                                }} />
                            </div>
                        </Row>
                    ))
                }
                {/* {
                    formValues[name]?.selection_method.length === 1 ?

                        <Row style={{ marginTop: 20 }}>
                            <Col span={16} >
                                <Row style={{ display: "flex", justifyContent: 'center' }}>
                                    <Input style={{ width: 100 }} />
                                </Row>
                                <Row style={{ display: "flex", justifyContent: 'space-between' }}>
                                    <Input style={{ width: 100 }} />
                                    <h5>Single select</h5>
                                    <Input style={{ width: 100 }} />
                                </Row>
                                <Row style={{ display: "flex", justifyContent: 'center' }}>
                                    <Input style={{ width: 100 }} />
                                </Row>
                            </Col>
                        </Row> : null
                } */}
                <Row style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <Checkbox onChange={(e) => setInvert(e.target.checked)} checked={invert}>Invert</Checkbox>
                    </Col>
                </Row>
                <Row style={{ marginTop: 40 }}>
                    <Col span={4}>
                        BoxType
                    </Col>
                    <Col span={4}>
                        <div style={{ display: "flex" }}>
                            <Checkbox onChange={(e) => setWord(e.target.checked)} checked={word} >Word</Checkbox>
                            <Checkbox onChange={(e) => setLine(e.target.checked)} checked={line}>Line</Checkbox>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: 40 }}>
                    {/* <Row > */}
                    <div style={{ width: 1000, display: 'flex', justifyContent: 'space-between' }}>
                        <h4>
                            Area Selector
                        </h4>
                        <Button onClick={() => {
                            getAreaImage()
                            setShowImage(true)
                        }}
                            className='custom-secondary-btn' >Preview</Button>
                    </div>

                    {/* </Row> */}
                    <Row>
                        <Col >
                            <div>
                                <h5>
                                    Up
                                </h5>
                                <Slider
                                    style={{ width: 190, marginTop: 20 }}
                                    onChange={(val) => setAreaSelector({ ...areaSelector, up: val })}
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    value={areaSelector?.up}
                                />
                            </div>
                            <div>
                                <h5>
                                    Down
                                </h5>
                                <Slider
                                    style={{ width: 190, marginTop: 20 }}
                                    onChange={(val) => setAreaSelector({ ...areaSelector, down: val })}
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    value={areaSelector?.down}
                                />
                            </div>
                        </Col>
                        <Col style={{ marginLeft: 20 }}>
                            <div>
                                <h5>
                                    Left
                                </h5>
                                <Slider
                                    style={{ width: 190, marginTop: 20 }}
                                    onChange={(val) => setAreaSelector({ ...areaSelector, left: val })}
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    value={areaSelector?.left}
                                />
                            </div>
                            <div>
                                <h5>
                                    Right
                                </h5>
                                <Slider
                                    style={{ width: 190, marginTop: 20 }}
                                    onChange={(val) => setAreaSelector({ ...areaSelector, right: val })}
                                    step={0.01}
                                    min={0}
                                    max={1}
                                    value={areaSelector?.right}
                                />
                            </div>
                        </Col>
                    </Row>



                </Row>
            </div>
            <Modal footer={null} title='Area Image' visible={showImage} onCancel={() => setShowImage(false)}>
                <img src={`data:image/png;base64,${imageData}`} width="470px" />

            </Modal>
            <Modal title="Enter Name" visible={saveAs} onOk={() => handleSaveAs()} onCancel={() => setSaveAs(false)}>
                <Input style={{ marginBottom: 20 }} value={saveAsName} placeholder="Enter Name" onChange={(e) => setSaveAsName(e.target.value)} />
            </Modal>
        </div>
    )
}

export default SelectionMethod