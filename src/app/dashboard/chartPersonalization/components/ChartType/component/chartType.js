/* eslint-env browser, node */
import React, { useState, useEffect } from 'react';

import { WarningTwoTone } from '@ant-design/icons';
import { Card, Select, Typography, Input } from 'antd';

import './styles.scss';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { getChartType } from '../../../../../../duck/actions/auditTrialAction';
import { getChartData } from '../../../../../../duck/actions/chartDataAction';
import { showNotification } from '../../../../../../duck/actions/commonActions';
import chartTypeJson from '../chartType.json';
console.log('chartTypeJson', chartTypeJson);
const { Option } = Select;
const { Text } = Typography;

const ChartType = (props) => {
    const [isScatter, setisScattetruer] = useState(true);
    const [chartTypeList, setchartTypeList] = useState(chartTypeJson);
    const [selectedChartType, setselectedChartType] = useState(
        props.chartObj.chart_type
    );
    const [selectedXAxis, setselectedXAxis] = useState('');
    const [selectedYAxis, setselectedYAxis] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        getChartTypeHandler();
    }, []);

    const getChartTypeHandler = () => {
        let req = { user_id: JSON.parse(localStorage.getItem('username')) };
        getChartType(req).then((res) => {
            console.log('res', res);
            if (res.data.statuscode === 200) {
                setchartTypeList(res.data);
            } else if (
                res.data.statuscode === 400 ||
                res.data.statuscode === 401
            ) {
                console.log('res.statuscode', res.statuscode);
                console.log('res.data.message', res.data.message);
                dispatch(
                    showNotification(
                        'error',
                        'Chart Type Error - ' + res.data.message
                    )
                );
            }
        });
    };

    const selectChartType = (value) => {
        const { chartTypeList } = this.state;

        let selectedChart = chartTypeList.filter(function (el) {
            return el.chart_name == value;
        });

        let obj = selectedChart[0]['chart_info'];
        this.props.getChartData(selectedChart[0]);

        let x_axis_value = obj['x-axis'];
        let y_axis_value = obj['y-axis'];

        if ('x-axis' in obj && 'y-axis' in obj) {
            setselectedChartType(value);
            setselectedXAxis(x_axis_value);
            setselectedYAxis(y_axis_value);
            setisScattetruer(true);
        } else {
            setselectedChartType(value);
            setselectedXAxis(x_axis_value);
            setselectedYAxis(y_axis_value);
            setisScattetruer(false);
        }
    };
    return (
        <div>
            <Card title='Chart'>
                <div>
                    <div>
                        <Text level={5} style={{ marginRight: '8%' }}>
                            Chart Type
                        </Text>
                    </div>
                    <div>
                        <Select
                            style={{ width: 150, marginBottom: 5 }}
                            onChange={selectChartType}
                            value={selectedChartType}
                        >
                            {chartTypeList.map((item, i) => {
                                return (
                                    <Option key={i} value={item.chart_name}>
                                        {item.chart_name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </div>
                </div>

                {isScatter ? (
                    <div className='chartview-input'>
                        <Text style={{ width: 150 }}>X-Axis</Text>
                        <Text style={{ marginLeft: 10 }}>Y-Axis</Text>
                        <Input
                            value={selectedXAxis}
                            style={{ width: 150 }}
                            disabled
                        />
                        <div>
                            <Input
                                value={selectedYAxis}
                                style={{ width: 150 }}
                                disabled
                            />{' '}
                            <WarningTwoTone
                                style={{ marginLeft: 10 }}
                                twoToneColor='red'
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <Text style={{ width: 150 }}>Y-Axis</Text>
                        <br />
                        <Input
                            style={{ width: 150, float: 'left' }}
                            value={selectedYAxis}
                            disabled
                        />
                    </div>
                )}
            </Card>
        </div>
    );
};

ChartType.propTypes = {
    chartObj: PropTypes.object.isRequired,
};

export default ChartType;
