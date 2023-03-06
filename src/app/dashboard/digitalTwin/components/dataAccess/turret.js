import React, { useEffect, useState, useForm } from 'react'
import { Button, Table, InputNumber, Form, Input, Select, Row, Col } from 'antd';
import './styles.scss'

function Turret(props) {
    let { setTurretOutput, turretOutput, tabletOutput,turretFormValues, setTurretFormValues,tabsList } = props
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState({})
    const [showDiv, setShowDiv] = useState(false)
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = (values) => {
        setTurretOutput(values.production_rate / (60 * values.no_stations))
        setShowDiv(true)
    };

    useEffect(() => {
        tabsList.forEach(item => {
            if (item.selected == true) {
                form.setFieldsValue(turretFormValues)
            }
            if(turretFormValues?.production_rate){
                setShowDiv(true)
            } 
        })

    }, [tabsList])

    const onReset = () => {
        form.resetFields();
    };

    const handleValueChange = (changedValues, allValues) => {
        setTurretFormValues(allValues)

    }
    
    return (
        <div>
            <div className='tableDiv'>
                <Form
                    // {...layout}
                    // layout="vertical"
                    onValuesChange={handleValueChange}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 900 }}
                >
                    <Row>
                        <Col span={10}>

                            <div className='rightform_force'>
                                <Form.Item className='production_rate' name="production_rate" label="Production rate" rules={[{ required: true },
                                { type: 'number' },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-100000000");
                                        } else if (value >= 100000000) {
                                            return Promise.reject("Valid Range 0-100000000");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                },
                                ]}>
                                    <InputNumber style={{ width: 164, marginLeft: 44 }} />
                                </Form.Item>
                                <Form.Item className='no_stations' name="no_stations" label="Number of stations (n)" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 5) {
                                            return Promise.reject("Valid Range 5-100");
                                        } else if (value > 100) {
                                            return Promise.reject("Valid Range 5-100");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                },]}>
                                    <InputNumber style={{ width: 164 }} />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={12}>
                            {showDiv && <div>
                                <p>For total components weighing 266.6kg, and with production rate at {formValues?.production_rate},the number of tablets produced would be {(266600000 / tabletOutput.tabletWeight).toFixed(2)} .</p>
                                {/* <p>The total runtime to produce the above number of tablets is {((266600000 / tabletOutput.tabletWeight) / formValues?.production_rate).toFixed(2)}hrs.</p> */}

                            </div>}

                        </Col>
                    </Row>
                    <Row className='submitbutton_turret'>
                        <Form.Item {...tailLayout} className='submititem'>
                            <Button style={{ marginRight: 20 }} htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </div >
            {/* <div>Output:{turretOutput}</div> */}
            <div style={{ display: 'flex', marginTop: 20, fontWeight: 500 }}>Turret Speed:<div className='output'>{turretOutput?.toFixed(3)}</div><p style={{ marginLeft: 10 }}>rpm</p></div>
        </div>
    )
}

export default Turret