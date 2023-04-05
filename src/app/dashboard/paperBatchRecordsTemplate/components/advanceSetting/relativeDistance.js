import React, { useState } from 'react'
import { Radio, Row, Col, Select, Button, InputNumber, Slider } from 'antd';
function RelativeDistance() {
    return (
        <div>
            <div>
                <Row >
                    <Col span={12}>
                        <Select placeholder="Load setting" style={{ width: 150 }} />
                    </Col>
                    <Col span={12}>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <Button >Apply / Save</Button>
                            <Button className='custom-secondary-btn' style={{ marginLeft: 10 }}>Create New</Button>
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
                        <Radio.Group style={{ border: '1px solid #d6d2d2', padding: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120 }}>
                                <Radio value={1}></Radio>
                                <Radio value={2}></Radio>
                                <Radio value={3}></Radio>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120, marginTop: 15 }}>
                                <Radio value={5}></Radio>
                                <Radio value={6}></Radio>
                                <Radio value={7}></Radio>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120, marginTop: 15 }}>
                                <Radio value={9}></Radio>
                                <Radio value={10}></Radio>
                                <Radio value={11}></Radio>
                            </div>
                        </Radio.Group>
                    </Col>
                    <Col span={12}>
                        <h4>
                            Measure To
                        </h4>
                        <Radio.Group style={{ border: '1px solid #d6d2d2', padding: 8 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120 }}>
                                <Radio value={1}></Radio>
                                <Radio value={2}></Radio>
                                <Radio value={3}></Radio>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120, marginTop: 15 }}>
                                <Radio value={5}></Radio>
                                <Radio value={6}></Radio>
                                <Radio value={7}></Radio>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: 120, marginTop: 15 }}>
                                <Radio value={9}></Radio>
                                <Radio value={10}></Radio>
                                <Radio value={11}></Radio>
                            </div>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
            <div>
                <Row style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <h4>Angle</h4>
                        <InputNumber min={1} max={360} defaultValue={180} />
                    </Col>
                    <Col span={12}>
                        <h4>Angle Range</h4>
                        <InputNumber min={1} max={360} defaultValue={225} />
                        <InputNumber style={{ marginLeft: 10 }} min={1} max={360} defaultValue={135} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col span={12}>
                        <h4>Range</h4>
                        <Slider
                            range={{
                                draggableTrack: true,
                            }}
                            step={0.1}
                            min={0}
                            max={1}
                            value={[0.3,0.8]}
                        />
                    </Col>

                </Row>

            </div>
        </div>
    )
}

export default RelativeDistance