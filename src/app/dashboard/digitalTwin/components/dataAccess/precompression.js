import React, { useEffect, useState, useForm } from 'react'
import { Button, Table, InputNumber, Form, Input, Select, Row, Col } from 'antd';
import './styles.scss'

function Precompression(props) {
    let { tabsList, setPreCompressionObject, preCompressionObject, preCompressionOutput, setPreCompressionOutput } = props
    const [form] = Form.useForm();
    const [fcValue, setFcValue] = useState(0)
    const [LoValue, setLoValue] = useState(0)
    const [L_Pre, setLPre] = useState(0)
    const [initialFormData, setInitialFormData] = useState({})
    // const [porosity, setporosity] = useState(0)

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    useEffect(() => {
        tabsList.forEach(item => {
            if (item.selected == true) {
                form.setFieldsValue(preCompressionOutput)
                setFcValue(preCompressionOutput?.fc)
                setLoValue(preCompressionOutput?.L0)
                setLPre(preCompressionOutput?.L_pre)
            }

        })

    }, [tabsList])


    const onFinish = (values) => {
        let Atablet = (3.14 * values.tablet_diameter * values.tablet_diameter) / 4
        let V0 = Atablet * values.L0
        let Vpre = Atablet * values.L_pre
        let Vtablet = Atablet * values.L_main
        let lamdaPre = V0 * (values.pre_p - 1) + Vpre // ask epsilon value porosity
        let CPpre = values.b1 * (V0 - Vpre) / lamdaPre
        let CFpre = CPpre * Atablet
        let Emain = 1 - ((1 - values.pre_p) * V0 / Vpre) // ask epsilon value porosity
        let lamdaMain = Vpre * (Emain - 1) + Vtablet
        let CPmain = values.b2 * (Vpre - Vtablet) / lamdaMain
        let CFmain = CPmain * Atablet
        setPreCompressionObject({
            Atablet: Atablet, V0: V0, Vpre: Vpre, Vtablet: Vtablet, lamdaPre: lamdaPre, CPpre: CPpre
            , CFpre: CFpre, Emain: Emain, lamdaMain: lamdaMain, CPmain: CPmain, CFmain: CFmain, porosity: values.pre_p
        })
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleValueChange = (changedValues, allValues) => {
        setPreCompressionOutput(allValues)
        if (changedValues?.fc) {
            setFcValue(changedValues?.fc)
        }
        else if (changedValues?.L0) {
            setLoValue(changedValues?.L0)
        } else if (changedValues?.L_pre) {
            setLPre(changedValues?.L_pre)
        }
    }

    const onFinishFailed =({ values, errorFields, outOfDate })=>{
        console.log("errorFields",values, errorFields,)
    }
    return (
        <div>
            <div className='tableDiv'>
                <Form
                    onValuesChange={handleValueChange}
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 900 }}
                    initialValues={initialFormData}
                    onFinishFailed ={onFinishFailed}
                >
                    <Row>
                        <Col span={12}>

                            <div className='rightform_force'>
                                <Form.Item className='fc' name="fc" label="Fill cam (FC)" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 4) {
                                            return Promise.reject("Valid Range 4-22");
                                        } else if (value > 22) {
                                            return Promise.reject("Valid Range 4-22");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                },]}>
                                    <InputNumber style={{ width: 90, marginLeft: 26 }} />
                                   
                                </Form.Item>
                                <Form.Item className='tablet_diameter' name="tablet_diameter" label="Tablet diameter" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 11) {
                                            return Promise.reject("Valid Range 11-25");
                                        } else if (value > 25) {
                                            return Promise.reject("Valid Range 11-25");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 8 }} />
                                   
                                </Form.Item>
                                <Form.Item className='L0' name="L0" label="Fill depth (L0)" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject(`Valid Range 0-${fcValue}`);
                                        } else if (value > fcValue) {
                                            return Promise.reject(`Valid Range Range 0-${fcValue}`);
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 20 }} />
                                   
                                </Form.Item>
                                <Form.Item className='L_pre' name="L_pre" label="Pre-Comp height" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject(`Valid Range 0-${LoValue}`);
                                        } else if (value > LoValue) {
                                            return Promise.reject(`Valid Range Range 0-${LoValue}`);
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90 }} />
                                   
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={12} style={{ paddingLeft: 30 }}>
                            <div className='leftform_force'>
                                <Form.Item className='L_main' name="L_main" label="Main Comp height​" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject(`Valid Range 0-${L_Pre}`);
                                        } else if (value > L_Pre) {
                                            return Promise.reject(`Valid Range Range 0-${L_Pre}`);
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90 }} />
                                   
                                </Form.Item>

                                <Form.Item className='porosity​' name="pre_p" label="Porosity​" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject(`Valid Range 0-1`);
                                        } else if (value > 1) {
                                            return Promise.reject(`Valid Range Range 0-1`);
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 62 }} />
                                </Form.Item>
                                <Form.Item className='b1' name="b1" label="B1​" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject(`Valid Range 0-100`);
                                        } else if (value > 100) {
                                            return Promise.reject(`Valid Range Range 0-100`);
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 97 }} />
                                </Form.Item>
                                <Form.Item className='b1' name="b2" label="B2​" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject(`Valid Range 0-100`);
                                        } else if (value > 100) {
                                            return Promise.reject(`Valid Range Range 0-100`);
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 97 }} />
                                </Form.Item>

                            </div>
                        </Col>
                        {/* <Col span={8}>
                            <div>
                                <img src={digitalTwinFormula} style={{ width: 210, height: 210 }} />
                            </div>

                        </Col> */}

                    </Row>
                    <Row >
                        <Col span={12}></Col>
                        <Col span={10} >
                            <Form.Item {...tailLayout} style={{ marginRight: 79 }}>
                                <Button style={{ marginRight: 20 }} htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <div style={{ display: 'flex', fontWeight: 500 }}>Pre-Compression Force:<div className='output'>{preCompressionObject?.CFpre?.toFixed(3)}</div><p style={{ marginLeft: 10 }}>kn</p></div>
                <div style={{ display: 'flex', marginLeft: 40, fontWeight: 500 }}>Main-Compression Force:<div className='output'>{preCompressionObject?.CFmain?.toFixed(3)}</div><p style={{ marginLeft: 10 }}>kn</p></div>
            </div>

        </div>
    )
}

export default Precompression