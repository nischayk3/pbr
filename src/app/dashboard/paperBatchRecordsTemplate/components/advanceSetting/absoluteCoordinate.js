import React, { useEffect, useState } from 'react'
import { Row, Col, Checkbox, Input, Button, Select, Modal } from 'antd'
import { loadAdvanceSetting, getAdvanceSetting, saveAdvanceSetting } from '../../../../../services/pbrService'
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';
function AbsoluteCoordinate(props) {
    let { method, formValues, setFormValues, name, setAdvancePopup, advancePopup } = props
    const dispatch = useDispatch();
    const [loadSettingOptions, setLoadSettingOptions] = useState([]);
    const [loadValue, setLoadValue] = useState('');
    const [word, setWord] = useState(false);
    const [line, setLine] = useState(false);
    const [saveAs, setSaveAs] = useState(false);
    const [saveAsName, setSaveAsName] = useState('');

    const advanceSetting = async (val,flag) => {
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
                setWord(res.Data[0]?.["box_type"]['word'])
                setLine(res.Data[0]?.["box_type"]['line'])
                if (val === 'default' && flag==='apply') {
                    let obj = formValues
                    obj[name] = { ...obj[name], advance_setting: res.Data }
                    setFormValues(obj)
                }
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

    const handleLoadChange = (val) => {
        setLoadValue(val)
        advanceSetting(val)
    }

    useEffect(() => {
        console.log("first",advancePopup)
        if (advancePopup) {
            if(formValues[name]?.advance_setting && method === formValues[name]?.advance_setting[0]?.method){
                loadSetting(formValues[name]?.advance_setting[0]?.setting_name)
            }
            else{
                loadSetting()
            }
        }
    }, [advancePopup])

    const handleSave = async () => {
        try {
            if (word || line) {
                dispatch(showLoader());
                let user = localStorage.getItem("user_id")
                let req = {
                    name: loadValue,
                    method: method,
                    settings: { "box_type": { "word": word, "line": line },setting_name:loadValue,method:method },
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
                    settings: {"box_type": { "word": word, "line": line },setting_name:loadValue,method:method},
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
        <div>
            <div>
                <Row >
                    <Col span={12}>
                        <Select onChange={handleLoadChange} value={loadValue} options={loadSettingOptions} placeholder="Load setting" style={{ width: 150 }} />
                    </Col>
                    <Col span={12}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button onClick={() => loadValue === 'default' ? advanceSetting('default','apply') : handleSave()}>{loadValue === 'default' ? 'Apply' : `Apply / Save`}</Button>
                            <Button onClick={() => setSaveAs(true)} className='custom-secondary-btn' style={{ marginLeft: 10 }}>Create New</Button>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: 40 }}>
                    <Col span={4}>
                        BoxType
                    </Col>
                    <Col span={4}>
                        <div style={{ display: "flex" }}>
                            <Checkbox onChange={(e) => setWord(e.target.checked)} checked={word}>Word</Checkbox>
                            <Checkbox onChange={(e) => setLine(e.target.checked)} checked={line}>Line</Checkbox>
                        </div>
                    </Col>
                </Row>
                {/* <Row style={{ marginTop: 50 }}>
                    <Col span={8}>
                        Location Threashold
                    </Col>
                    <Col span={8}>
                        <Slider min={0}
                            max={1} defaultValue={[0, 1]} />
                    </Col>


                </Row> */}
            </div>
            <Modal title="Enter Name" visible={saveAs} onOk={() => handleSaveAs()} onCancel={() => setSaveAs(false)}>
                <Input style={{ marginBottom: 20 }} value={saveAsName} placeholder="Enter Name" onChange={(e) => setSaveAsName(e.target.value)} />
            </Modal>
        </div>
    )
}

export default AbsoluteCoordinate