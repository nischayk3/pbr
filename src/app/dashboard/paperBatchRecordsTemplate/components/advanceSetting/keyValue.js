import React, { useEffect, useState } from 'react'
import { Row, Col, Checkbox, Input, Button, Select, Modal, Slider } from 'antd'
import { loadAdvanceSetting, getAdvanceSetting, saveAdvanceSetting } from '../../../../../services/pbrService'
import { InfoCircleOutlined } from '@ant-design/icons';
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';
function KeyValue(props) {
    let { method, formValues, setFormValues, name, setAdvancePopup, advancePopup } = props
    const dispatch = useDispatch();
    const [loadSettingOptions, setLoadSettingOptions] = useState([]);
    const [loadValue, setLoadValue] = useState('');
    const [fuzzyThreashold, setFuzzyThreashold] = useState();
    const [fuzzyValue, setFuzzyValue] = useState();
    const [saveAs, setSaveAs] = useState(false);
    const [saveAsName, setSaveAsName] = useState('');

    const fuzzyOptions = [{ lable: 'ratio', value: 'ratio' }, { lable: 'partial_ratio', value: 'partial_ratio' }, { lable: 'wratio', value: 'wratio' }, { lable: 'token_sort_ratio', value: 'token_sort_ratio' },
    { lable: 'token_set_ratio', value: 'token_set_ratio' }, { lable: 'partial_token_sort_ratio', value: 'partial_token_sort_ratio' }, { lable: 'partial_token_set_ratio', value: 'partial_token_set_ratio' }]

    const advanceSetting = async (val) => {
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
                setFuzzyValue(res.Data['fuzz_method'])
                setFuzzyThreashold(res.Data['fuzz_threshold'])
                if (val === 'default') {
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
        if (advancePopup) {
            if(formValues[name]?.advance_setting){
                loadSetting(formValues[name]?.advance_setting[0]?.setting_name)
            }
            else{
                loadSetting()
            }
        }
    }, [advancePopup])


    const handleSave = async () => {
        try {
                dispatch(showLoader());
                let user = localStorage.getItem("user_id")
                let req = {
                    name: loadValue,
                    method: method,
                    settings: {
                        fuzz_method: fuzzyValue,
                        fuzz_threshold: fuzzyThreashold,
                        setting_name:loadValue
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

                    // loadSetting()
                    // setAdvancePopup(false)

                } else {
                    dispatch(showNotification('error', res.Message));
                    dispatch(hideLoader());
                }
        } catch (err) {
            console.log("err", err)
        }
    }

    const handleSaveAs = async () => {
        try {
            if (saveAsName.length > 0) {
                dispatch(showLoader());
                let user = localStorage.getItem("user_id")
                let req = {
                    name: saveAsName,
                    method: method,
                    settings: {
                        fuzz_method: fuzzyValue,
                        fuzz_threshold: fuzzyThreashold,
                        setting_name:loadValue
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
                let str = "Enter Name"
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
                            <Button onClick={() => loadValue === 'default' ? advanceSetting('default') : handleSave()}>{loadValue === 'default' ? 'Apply' : `Apply / Save`}</Button>
                            <Button onClick={() => setSaveAs(true)} className='custom-secondary-btn' style={{ marginLeft: 10 }}>Create New</Button>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                    <Col span={8}>
                        Fuzzy Method
                    </Col>
                    <Col span={8}>
                        <Select options={fuzzyOptions} onChange={(val) => setFuzzyValue(val)} value={fuzzyValue} placeholder="Fuzzy Method" style={{ width: 150 }} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 30 }}>
                    <Col span={8}>
                        Fuzzy Threshold
                    </Col>
                    <Col span={8}>
                        <Slider min={0}
                            max={100} value={fuzzyThreashold} onChange={(val) => setFuzzyThreashold(val)} />
                    </Col>
                    <Col span={6}>
                        <div style={{ marginTop: 5, marginLeft: 10, fontWeight: 'bold' }}>
                            {fuzzyThreashold}
                        </div>
                    </Col>
                </Row>
            </div>
            <Modal title="Enter Name" visible={saveAs} onOk={() => handleSaveAs()} onCancel={() => setSaveAs(false)}>
                <Input style={{ marginBottom: 20 }} value={saveAsName} placeholder="Enter Name" onChange={(e) => setSaveAsName(e.target.value)} />
            </Modal>
        </div>
    )
}

export default KeyValue