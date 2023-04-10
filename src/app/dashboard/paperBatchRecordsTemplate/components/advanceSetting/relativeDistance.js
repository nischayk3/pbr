import React, { useState, useEffect } from 'react'
import { Radio, Row, Col, Select, Button, InputNumber, Slider, Checkbox, Modal, Input } from 'antd';
import { loadRelativeDirectionSetting, saveRelativeDirection, getRelativeDirectionSetting } from '../../../../../services/pbrService'
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';

function RelativeDistance(props) {
    let { method, formValues, setFormValues, name, setAdvancePopup, advancePopup } = props
    const dispatch = useDispatch();
    const [value, setValue] = useState(1);
    const [loadSettingOptions, setLoadSettingOptions] = useState([]);
    const [loadValue, setLoadValue] = useState('');
    const [settingValues, setSettingValues] = useState({
        measureFrom: 0,
        measureTo: 0,
        angle: 180,
        angleRange1: 228,
        angleRange2: 135,
        word: false,
        line: false,
        range: [0.3, 0.8]

    });
    const [saveAs, setSaveAs] = useState(false);
    const [saveAsName, setSaveAsName] = useState('');


    const advanceSetting = async (val) => {
        try {
            dispatch(showLoader());
            let str = val?.lastIndexOf("-");
            console.log("str",str)
            let req = {
                version: 1,
                name: val.slice(0,str),
                created_by: null
            }
            let res = await getRelativeDirectionSetting(req)
            if (res.status === 200) {
                dispatch(hideLoader());
                setSettingValues({
                    measureFrom: res.data[0].get_from,
                    measureTo: res.data[0].get_to,
                    angle: res.data[0].angle,
                    angleRange1: res.data[0].angle_range[0],
                    angleRange2: res.data[0].angle_range[1],
                    word: res.data[0].word,
                    line: res.data[0].line,
                    range: res.data[0].dist_range
                })
                // if (val === 'default') {
                //     let obj = formValues
                //     obj[name] = { ...obj[name], advance_setting: res.Data }
                //     setFormValues(obj)
                // }
            } else {
                dispatch(hideLoader());
                // setWord(false)
                // setLine(false)
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
                created_by: user
            }
            let res = await loadRelativeDirectionSetting(req)
            if (res.Status === 200) {
                dispatch(hideLoader());
                setLoadSettingOptions(res.Data)
                setLoadValue(val ? val : res.Data[0]?.value)
                advanceSetting(val ? val : res.Data[0]?.value)
            } else {
                dispatch(hideLoader());
                // setLoadSettingOptions([])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const onChangeMF = (e) => {
        setSettingValues({ ...settingValues, measureFrom: e.target.value })
    };

    const onChangeMT = (e) => {
        setSettingValues({ ...settingValues, measureTo: e.target.value })
    };

    const handleLoadChange = (val) => {
        setLoadValue(val)
        advanceSetting(val)
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
    }, [advancePopup])

    const handleSave = async () => {
        try {
            if (settingValues.word || settingValues.line) {
                dispatch(showLoader());
                let user = localStorage.getItem("user_id")
                let str = loadValue?.lastIndexOf("-");
                let req = {
                    name: loadValue.slice(0,str),
                    version: 1,
                    settings: {
                        word: settingValues.word,
                        line: settingValues.line,
                        get_from: settingValues.measureFrom,
                        get_to: settingValues.measureTo,
                        dist_range: settingValues.range,
                        angle: settingValues.angle,
                        angle_range: [settingValues.angleRange1, settingValues.angleRange2],
                        method:method,
                        setting_name:loadValue
                    },
                    action_type: "save",
                    created_by: user
                }
                let res = await saveRelativeDirection(req)
                if (res.status === 202) {
                    dispatch(hideLoader());
                    let obj = formValues
                    obj[name] = { ...obj[name], advance_setting: res.data }
                    setFormValues(obj)
                    // setAdvancePopup(false)
                } else {
                    dispatch(showNotification('error', res.message));
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
            if ((settingValues.word || settingValues.line) && saveAsName.length > 0) {
                dispatch(showLoader());
                let user = localStorage.getItem("user_id")
                let req = {
                    name: saveAsName,
                    version: 1,
                    settings: {
                        word: settingValues.word,
                        line: settingValues.line,
                        get_from: settingValues.measureFrom,
                        get_to: settingValues.measureTo,
                        dist_range: settingValues.range,
                        angle: settingValues.angle,
                        angle_range: [settingValues.angleRange1, settingValues.angleRange2],
                        method:method,
                        setting_name:loadValue
                    },
                    action_type: "save_as",
                    created_by: user
                }
                let res = await saveRelativeDirection(req)
                if (res.status === 202) {
                    dispatch(hideLoader());
                    let obj = formValues
                    obj[name] = { ...obj[name], advance_setting: res.data }
                    setFormValues(obj)
                    setSaveAsName('')
                    setSaveAs(false)
                    setLoadValue(saveAsName)
                    // loadSetting(saveAsName)
                    // setAdvancePopup(false)
                } else {
                    dispatch(showNotification('error', res.message));
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
        <div>
            <div>
                <Row >
                    <Col span={12}>
                        <Select onChange={handleLoadChange} value={loadValue} options={loadSettingOptions} placeholder="Load setting" style={{ width: 150 }} />
                    </Col>
                    <Col span={12}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button onClick={() => handleSave()} >Save</Button>
                            <Button onClick={() => setSaveAs(true)} className='custom-secondary-btn' style={{ marginLeft: 10 }}>Create New</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <Row style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <h4>
                            Measure From
                        </h4>
                        <Radio.Group onChange={onChangeMF} value={settingValues?.measureFrom} style={{ border: '1px solid #d6d2d2', padding: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120 }}>
                                <Radio value={1}></Radio>
                                <Radio value={2}></Radio>
                                <Radio value={3}></Radio>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120, marginTop: 15 }}>
                                <Radio value={4}></Radio>
                                <Radio value={5}></Radio>
                                <Radio value={6}></Radio>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120, marginTop: 15 }}>
                                <Radio value={7}></Radio>
                                <Radio value={8}></Radio>
                                <Radio value={9}></Radio>
                            </div>
                        </Radio.Group>
                    </Col>
                    <Col span={12}>
                        <h4>
                            Measure To
                        </h4>
                        <Radio.Group onChange={onChangeMT} value={settingValues?.measureTo} style={{ border: '1px solid #d6d2d2', padding: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120 }}>
                                <Radio value={1}></Radio>
                                <Radio value={2}></Radio>
                                <Radio value={3}></Radio>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120, marginTop: 15 }}>
                                <Radio value={4}></Radio>
                                <Radio value={5}></Radio>
                                <Radio value={6}></Radio>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120, marginTop: 15 }}>
                                <Radio value={7}></Radio>
                                <Radio value={8}></Radio>
                                <Radio value={9}></Radio>
                            </div>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <Row style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <h4>Angle</h4>
                        <InputNumber onChange={(val) => setSettingValues({ ...settingValues, angle: val })} min={1} max={360} value={settingValues.angle} />
                    </Col>
                    <Col span={12}>
                        <h4>Angle Range</h4>
                        <InputNumber onChange={(val) => setSettingValues({ ...settingValues, angleRange1: val })} min={1} max={360} value={settingValues.angleRange1} />
                        <InputNumber onChange={(val) => setSettingValues({ ...settingValues, angleRange2: val })} style={{ marginLeft: 10 }} min={1} max={360} value={settingValues.angleRange2} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={4}>
                        <h4> BoxType</h4>
                    </Col>
                    <Col span={4}>
                        <div style={{ display: "flex" }}>
                            <Checkbox checked={settingValues?.word} onChange={(e) => setSettingValues({ ...settingValues, word: e.target.checked })}>Word</Checkbox>
                            <Checkbox checked={settingValues?.line} onChange={(e) => setSettingValues({ ...settingValues, line: e.target.checked })}>Line</Checkbox>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <h4>Range</h4>
                        <Slider
                            range={{
                                draggableTrack: true,
                            }}
                            onChange={(val) => setSettingValues({ ...settingValues, range: val })}
                            step={0.1}
                            min={0}
                            max={1}
                            value={settingValues?.range}
                        />
                    </Col>
                </Row>
            </div>
            <Modal title="Enter Name" visible={saveAs} onOk={() => handleSaveAs()} onCancel={() => setSaveAs(false)}>
                <Input style={{ marginBottom: 20 }} value={saveAsName} placeholder="Enter Name" onChange={(e) => setSaveAsName(e.target.value)} />
            </Modal>
        </div>
    )
}

export default RelativeDistance