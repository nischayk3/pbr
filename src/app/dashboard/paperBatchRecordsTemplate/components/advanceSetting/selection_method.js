import React, { useEffect, useState } from 'react'
import { Row, Col, Checkbox, Input, Button, Select, Modal } from 'antd'
import { loadAdvanceSetting, getAdvanceSetting, saveAdvanceSetting } from '../../../../../services/pbrService'
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';

function SelectionMethod(props) {
    let { method, formValues, setFormValues, name, setAdvancePopup, advancePopup } = props
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
    return (
        <div>
            <div>
                <Row >
                    <Col span={12}>
                        <Select placeholder="Load setting" style={{ width: 150 }} />
                    </Col>
                    <Col span={12}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button >{`Apply / Save`}</Button>
                            <Button className='custom-secondary-btn' style={{ marginLeft: 10 }}>Create New</Button>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <h4>
                        Custom Grading
                    </h4>
                </Row>
                <Row >
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
                </Row>
                <Row>
                    <Col span={12}>
                        <Checkbox >Invert</Checkbox>
                    </Col>
                </Row>
                <Row style={{ marginTop: 40 }}>
                    <Col span={4}>
                        BoxType
                    </Col>
                    <Col span={4}>
                        <div style={{ display: "flex" }}>
                            <Checkbox >Word</Checkbox>
                            <Checkbox >Line</Checkbox>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default SelectionMethod