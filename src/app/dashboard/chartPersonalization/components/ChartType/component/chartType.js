import React, { Component } from 'react';

import { WarningTwoTone } from '@ant-design/icons';
import { Card, Select, Typography, Input } from 'antd';

import './styles.scss';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getChartType } from '../../../../../../duck/actions/auditTrialAction';
import { getChartData } from '../../../../../../duck/actions/chartDataAction';

const { Option } = Select;
const { Text } = Typography;

class ChartType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScatter: true,
            chartTypeList: [],
            toastOpen: false,
            toastMessage: '',
            toastVariant: '',
            selectedChartType: this.props.chartObj.chart_type,
            selectedXAxis: '',
            selectedYAxis: '',
        };
    }

    componentDidMount() {
        this.getChartTypeHandler();
    }

    getChartTypeHandler() {
        let req = { user_id: JSON.parse(localStorage.getItem('username')) };
        getChartType(req).then((res) => {
            console.log('res', res);
            if (res.statuscode === 200) {
                this.setState({ chartTypeList: res.data });
            }
            if (res.statuscode === 401) {
                this.setState({
                    toastOpen: true,
                    toastMessage: 'Unauthorized User',
                    toastVariant: 'error',
                });
            }
        });
    }

    handleClose() {
        this.setState({ toastOpen: false });
    }

    selectChartType(value) {
        const { chartTypeList } = this.state;

        let selectedChart = chartTypeList.filter(function (el) {
            return el.chart_name == value;
        });

        let obj = selectedChart[0]['chart_info'];
        this.props.getChartData(selectedChart[0]);

        let x_axis_value = obj['x-axis'];
        let y_axis_value = obj['y-axis'];

        if ('x-axis' in obj && 'y-axis' in obj) {
            console.log(x_axis_value, y_axis_value);
            this.setState({
                selectedChartType: value,
                selectedXAxis: x_axis_value,
                selectedYAxis: y_axis_value,
                isScatter: true,
            });
        } else {
            console.log(x_axis_value, y_axis_value);
            this.setState({
                selectedChartType: value,
                selectedXAxis: x_axis_value,
                selectedYAxis: y_axis_value,
                isScatter: false,
            });
        }
    }

    render() {
        const { isScatter, chartTypeList } = this.state;
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
                                onChange={this.selectChartType}
                                value={this.state.selectedChartType}
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
                                value={this.state.selectedXAxis}
                                style={{ width: 150 }}
                                disabled
                            />
                            <div>
                                <Input
                                    value={this.state.selectedYAxis}
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
                                value={this.state.selectedYAxis}
                                disabled
                            />
                        </div>
                    )}
                </Card>
            </div>
        );
    }
}

ChartType.propTypes = {
    chartObj: PropTypes.object.isRequired,
    getChartData: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        getChartData: getChartData(dispatch),
    };
};

export default connect(null, mapDispatchToProps)(ChartType);
