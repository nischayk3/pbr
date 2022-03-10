// Fahad Siddiqui
// Mareana Software
// Version 1
// Last modified - 03 March, 2022
import '../Personalization.scss';
import './style.scss';
<Checkbox>Remember me</Checkbox>
import { Button, Card, Collapse, Table, Popconfirm, DatePicker, Input, Switch, Form, Checkbox, Select, Row, Col } from 'antd';
import React, { Component, useState, useEffect, useRef } from 'react';
import {
    DeleteTwoTone
} from '@ant-design/icons';

import InputField from '../../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../../components/SelectField/SelectField';
const { Panel } = Collapse;
const { Option } = Select;

const Display = (props) => {
    const figureObj = {
        lines: false,
        lineWidth: '',
        stairCases: false,
        areaFill: '',
        areaGradient: '',
        points: false,
        alertTreshold: false,
        panelOptions: {
            title: '',
            desc: '',
            transparentBackground: ''
        }
    }
    const legendObj = {
        options: {
            show: false,
            atTable: false,
            toRight: false,
        },
        values: {
            min: false,
            max: false,
            avg: false,
            current: false,
            total: false,
            decimal: false,
        },
        hideSeries: {
            withOnlyNull: false,
            withOnlyZero: false
        }
    }
    const axesObj = {
        leftX: {
            show: false,
            unit: '',
            scale: '',
            ymin: '',
            ymax: '',
            decimal: '',
            label: '',
        },
        rightX: {
            show: false,
            unit: '',
            scale: '',
            ymin: '',
            ymax: '',
            decimal: '',
            label: '',
        },
        xaxis: {
            show: false,
            unit: ''
        }
    }
    const [figure, setFigure] = useState(figureObj)
    const [legend, setLegend] = useState(legendObj)
    const [axes, setAxes] = useState(axesObj)
    return (
        <>
            <div className='display-section'>

                <Collapse
                    expandIconPosition='right'
                    ghost
                >

                    {/* Figure */}
                    <Panel header="Figure" key='5'>
                        <div className='figure-container'>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Lines:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" name='lines' checked={figure.lines} onChange={(e) => setFigure({ ...figure, lines: e })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs select-top" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Line Width:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Select defaultValue="1" onChange={(e) => setFigure({ ...figure, lineWidth: e })}>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Stair Cases:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={figure.stairCases} onChange={(e) => setFigure({ ...figure, stairCases: e })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Area Fill:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>

                                    <Select defaultValue="1" onChange={(e) => setFigure({ ...figure, areaFill: e })}>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Area Gradient:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>

                                    <Select defaultValue="1" onChange={(e) => setFigure({ ...figure, areaGradient: e })}>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Points:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={figure.points} onChange={(e) => setFigure({ ...figure, points: e })} />
                                </Col>
                            </Row>
                            <Row className="figure-inputs" gutter={24}>
                                <Col className="gutter-row" span={14}>
                                    <label>Alert Treshold:</label>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Switch size="small" checked={figure.alertTreshold} onChange={(e) => setFigure({ ...figure, alertTreshold: e })} />
                                </Col>
                            </Row>
                            <div className='figure-inputs'>
                                Panel Options
                            </div>
                            <div className='figure-inputs'>
                                <label>Title</label>
                                <Input value={figure.panelOptions.title} onChange={(e) => setFigure({ ...figure, panelOptions: { ...figure.panelOptions, title: e.target.value } })} />
                            </div>
                            <div className='figure-inputs'>
                                <label>Title Description</label>
                                <Input.TextArea maxLength={100} value={figure.panelOptions.desc} onChange={(e) => setFigure({ ...figure, panelOptions: { ...figure.panelOptions, desc: e.target.value } })} />
                            </div>
                            <div className='figure-inputs'>
                                <label>Transparent Background:</label>
                                <Switch size="small" checked={figure.panelOptions.transparentBackground} onChange={(e) => setFigure({ ...figure, panelOptions: { ...figure.panelOptions, transparentBackground: e } })} />
                            </div>
                        </div>
                    </Panel>

                    {/* Legend */}
                    <Panel header='Legend' key='6'>
                        <div>Options</div>
                        <div>
                            <label>Show:</label>
                            <Switch size="small" checked={legend.options.show} onChange={(e) => setLegend({ ...legend, options: { ...legend.options, show: e } })} />
                        </div>
                        <div>
                            <label>At table:</label>
                            <Switch size="small" checked={legend.options.atTable} onChange={(e) => setLegend({ ...legend, options: { ...legend.options, atTable: e } })} />
                        </div>
                        <div>
                            <label>To right:</label>
                            <Switch size="small" checked={legend.options.toRight} onChange={(e) => setLegend({ ...legend, options: { ...legend.options, toRight: e } })} />
                        </div>
                        <div>Values</div>
                        <div>
                            <label>Min:</label>
                            <Switch size="small" checked={legend.values.min} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, min: e } })} />
                        </div>
                        <div>
                            <label>Max:</label>
                            <Switch size="small" checked={legend.values.max} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, max: e } })} />
                        </div>
                        <div>
                            <label>Avg:</label>
                            <Switch size="small" checked={legend.values.avg} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, avg: e } })} />
                        </div>
                        <div>
                            <label>Current:</label>
                            <Switch size="small" checked={legend.values.current} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, current: e } })} />
                        </div>
                        <div>
                            <label>Total:</label>
                            <Switch size="small" checked={legend.values.total} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, total: e } })} />
                        </div>
                        <div>
                            <label>Decimal:</label>
                            <Switch size="small" checked={legend.values.decimal} onChange={(e) => setLegend({ ...legend, values: { ...legend.values, decimal: e } })} />
                        </div>
                        <div>Hide Series</div>
                        <div>
                            <label>With only null:</label>
                            <Switch size="small" checked={legend.hideSeries.withOnlyNull} onChange={(e) => setLegend({ ...legend, hideSeries: { ...legend.hideSeries, withOnlyNull: e } })} />
                        </div>
                        <div>
                            <label>with only Zero:</label>
                            <Switch size="small" checked={legend.hideSeries.withOnlyZero} onChange={(e) => setLegend({ ...legend, hideSeries: { ...legend.hideSeries, withOnlyZero: e } })} />
                        </div>
                    </Panel>

                    {/* Axes */}
                    <Panel header='Axes' key='7'>
                        <div>Left X</div>
                        <div>
                            <label>Show:</label>
                            <Switch size="small" checked={axes.leftX.show} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, show: e } })} />
                        </div>
                        <div>
                            <label>Unit:</label>
                            <Select defaultValue="Short" value={axes.leftX.unit} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, unit: e } })}>
                                <Option value="Short">Short</Option>
                                <Option value="Long">Long</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Scale:</label>
                            <Select defaultValue="Linear" value={axes.leftX.scale} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, scale: e } })}>
                                <Option value="Linear">Linear</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Y Min:</label>
                            <Select defaultValue="Auto" value={axes.leftX.ymin} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, ymin: e } })}>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Y Max:</label>
                            <Select defaultValue="Auto" value={axes.leftX.ymax} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, ymax: e } })}>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Decimal:</label>
                            <Select defaultValue="Auto" value={axes.leftX.decimal} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, decimal: e } })}>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Label:</label>
                            <Select defaultValue="Auto" value={axes.leftX.label} onChange={(e) => setAxes({ ...axes, leftX: { ...axes.leftX, label: e } })}>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <div>right X</div>
                        <div>
                            <label>Show:</label>
                            <Switch size="small" checked={axes.rightX.show} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, show: e } })} />
                        </div>
                        <div>
                            <label>Unit:</label>
                            <Select value={axes.rightX.unit} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, unit: e } })}>
                                <Option value="Short">Short</Option>
                                <Option value="Long">Long</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Scale:</label>
                            <Select value={axes.rightX.scale} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, scale: e } })}>
                                <Option value="Linear">Linear</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Y Min:</label>
                            <Select value={axes.rightX.ymin} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, ymin: e } })}>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Y Max:</label>
                            <Select value={axes.rightX.ymax} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, ymax: e } })}>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Decimal:</label>
                            <Select value={axes.rightX.decimal} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, decimal: e } })}>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <div>
                            <label>Label:</label>
                            <Select value={axes.rightX.label} onChange={(e) => setAxes({ ...axes, rightX: { ...axes.rightX, label: e } })}>
                                <Option value="Auto">Auto</Option>
                            </Select>
                        </div>
                        <div>X - Axis</div>
                        <div>
                            <label>Show:</label>
                            <Switch size="small" checked={axes.xaxis.show} onChange={(e) => setAxes({ ...axes, xaxis: { ...axes.xaxis, show: e } })} />
                        </div>
                        <div>
                            <label>Unit:</label>
                            <Select value={axes.xaxis.unit} onChange={(e) => setAxes({ ...axes, xaxis: { ...axes.xaxis, unit: e } })}>
                                <Option value="Short">Short</Option>
                                <Option value="Long">Long</Option>
                            </Select>
                        </div>
                    </Panel>


                </Collapse>

            </div>
        </>
    );

}


export default Display;
