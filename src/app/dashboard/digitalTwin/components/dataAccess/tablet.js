import React, { useEffect, useState, useForm } from 'react'
import { Button, Table, InputNumber, Form, Input, Select, Row, Col } from 'antd';
import './styles.scss'

function Precompression(props) {
    let { preCompressionObject, setTabletOutput, tabletOutput, tabsList } = props
    const [form] = Form.useForm();
    const [tabletWeight, setTabletWeight] = useState(0)
    const [tabletHardness, setTabletHardness] = useState(0)
    const [defalutValue, setDefalutValues] = useState({
        plant: "",
        product: "",
        batch: ""
    })

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const onFinish = (values) => {
        let roh = (values.Cellulose * values["roh_cellulose​"] + values.Croscarmel_USP * values.roh_Croscarmel_USP
            + values.Elixir190 * values["roh_Elixir190​"] + values.Magnesium * values.roh_Magnesium + values.Mannitol * values.roh_Mannitol3) / 5
        let tabletWeight = (1 - preCompressionObject.porosity) * preCompressionObject.V0 * roh
        let Vs = (1 - preCompressionObject.porosity) * preCompressionObject.V0   // ask epsilon value porosity
        let Pr = Vs / preCompressionObject.Vtablet  // doubt in V Vtablet
        let Pcr = Vs / preCompressionObject.V0
        let lamdaH = Math.log((1 - Pr) / (1 - Pcr))  // doubt in 2nd Pr
        let tabletHardness = 50 * (1 - Math.pow(Pr - Pcr + lamdaH, 2))   // doubt in 2nd Pr and exp value 2 0r 3
        setTabletWeight(tabletWeight)
        setTabletHardness(tabletHardness)
        setTabletOutput({ ...tabletOutput, tabletWeight: tabletWeight, tabletHardness: tabletHardness })

    };

    useEffect(() => {
        tabsList.forEach(item => {
            if (item.selected == true) {
                form.setFieldsValue(tabletOutput)
            } else {
                setDefalutValues({
                    plant: "",
                    product: "",
                    batch: ""
                })
            }

        })

    }, [tabsList])

    useEffect(() => {
        if (defalutValue?.plant && defalutValue?.product && defalutValue?.batch) {
            let obj = {
                roh_Magnesium: 1.09,
                roh_Mannitol3: 1.52,
                Cellulose: 0.04,
                Croscarmel_USP: 0.03,
                Elixir190: 0.45,
                Magnesium: 0.0182,
                Mannitol: 0.02,
                roh_Croscarmel_USP: 0.53,
                plant:"US01",
                product:"6978",
                batch:1888

            }
            obj['roh_Elixir190​'] = 0.5
            obj['roh_cellulose​'] = 1.5
            form.setFieldsValue(obj)
            setTabletOutput(obj)
            // setDefalutValues({
            //     plant: "",
            //     product: "",
            //     batch: ""
            // })
        }

    }, [defalutValue])

    const onReset = () => {
        form.resetFields();
    };

    const handleValueChange = (changedValues, allValues) => {
        setTabletOutput(allValues)

    }
    return (
        <div>
            {/* <div className='tabletDropdown'>
                <Select onChange={(val) => setDefalutValues({ ...defalutValue, plant: val })} options={[{ label: "US01", value: "US01" }]} placeholder="Plant" style={{ width: 150 }} />
                <Select onChange={(val) => setDefalutValues({ ...defalutValue, product: val })} options={[{ label: "6978 ", value: "6978 " }]} placeholder="Product" style={{ width: 150 }} />
                <Select onChange={(val) => setDefalutValues({ ...defalutValue, batch: val })} options={[{ label: "1888 ", value: "1888 " }]} placeholder="Batch" style={{ width: 150 }} />
            </div> */}
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
                        <div className='tabletDropdown'>
                            <Form.Item name="plant" label="Plant">
                                <Select onChange={(val) => setDefalutValues({ ...defalutValue, plant: val })} options={[{ label: "US01", value: "US01" }]} placeholder="Plant" style={{ width: 150 }} />
                            </Form.Item>
                            <Form.Item name="product" label="Product">
                                <Select onChange={(val) => setDefalutValues({ ...defalutValue, product: val })} options={[{ label: "6978 ", value: "6978 " }]} placeholder="Product" style={{ width: 150 }} />
                            </Form.Item>
                            <Form.Item name="batch" label="Batch">
                                <Select onChange={(val) => setDefalutValues({ ...defalutValue, batch: val })} options={[{ label: "1888 ", value: "1888 " }]} placeholder="Batch" style={{ width: 150 }} />
                            </Form.Item>
                        </div>
                    </Row>
                    <Row>
                        <Col span={10}>

                            <div className='rightform_force'>
                                <Form.Item className='componenet_x1' name="Elixir190" label="Solid Dispersion of Elixir190" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else if (value > 1) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, }} />
                                </Form.Item>
                                <Form.Item className='Croscarmel_USP' name="Croscarmel_USP" label="Croscarmel USP" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else if (value > 1) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 71 }} />
                                </Form.Item>
                                <Form.Item className='Cellulose' name="Cellulose" label="Cellulose" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else if (value > 1) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 116 }} />
                                </Form.Item>
                                <Form.Item className='Mannitol' name="Mannitol" label="Mannitol 100" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else if (value > 1) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 90 }} />
                                </Form.Item>
                                <Form.Item className='Magnesium' name="Magnesium" label="Magnesium Stearate" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else if (value > 1) {
                                            return Promise.reject("Valid Range 0-1");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 43 }} />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={12} style={{ marginLeft: 10 }}>
                            <div className='leftform_force'>
                                <Form.Item className='roh_Elixir190​1' name="roh_Elixir190​" label="Rho Solid Dispersion of Elixir190​" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else if (value > 100) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, }} />
                                </Form.Item>
                                <Form.Item className='roh_Croscarmel_USP' name="roh_Croscarmel_USP" label="Rho Croscarmel USP​" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else if (value > 100) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 73 }} />
                                </Form.Item>
                                <Form.Item className='roh_Cellulose​3' name="roh_cellulose​" label="Rho Cellulose​" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else if (value > 100) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 117 }} />
                                </Form.Item>
                                <Form.Item className='roh_Mannitol3' name="roh_Mannitol3" label="Rho Mannitol 100" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else if (value > 100) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 93 }} />
                                </Form.Item>
                                <Form.Item className='roh_Magnesium' name="roh_Magnesium" label="Rho Magnesium Stearate" rules={[{ required: true },
                                {
                                    validator: (_, value) => {
                                        if (value < 0) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else if (value > 100) {
                                            return Promise.reject("Valid Range 0-100");
                                        } else {
                                            return Promise.resolve();
                                        }
                                    }
                                }]}>
                                    <InputNumber style={{ width: 90, marginLeft: 46 }} />
                                </Form.Item>
                            </div>
                        </Col>


                    </Row>
                    {/* <Row className='submitbutton_tab'>
                        <Form.Item {...tailLayout} className='submititem' style={{marginRight:94}}>
                            <Button style={{ marginRight: 20 }} htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Row> */}
                    <Row >
                        <Col span={10}></Col>
                        <Col span={10}>
                            <Form.Item {...tailLayout} style={{ marginLeft: 63 }}>
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
                <div style={{ display: 'flex', fontWeight: 500 }}>Tablet-Weight:<div className='output'>{tabletOutput?.tabletWeight?.toFixed(3)}</div><p style={{ marginLeft: 10 }}>mg</p></div>
                <div style={{ display: 'flex', marginLeft: 73, fontWeight: 500 }}>Tablet-Hardness:<div className='output'>{tabletOutput?.tabletHardness?.toFixed(3)}</div><p style={{ marginLeft: 10 }}>kp</p></div>
            </div>
            {/* <div style={{ marginTop: 30 }}>
                <img src={tabletImg} />
            </div> */}
            {/* <div> Output:{tabletWeight}</div>
            <div> Output:{tabletHardness}</div> */}
        </div>
    )
}

export default Precompression