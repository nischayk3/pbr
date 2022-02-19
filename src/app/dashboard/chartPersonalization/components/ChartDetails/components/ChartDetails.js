import React, { Component, useState } from 'react';
import Plot from 'react-plotly.js';
import { Card } from 'antd';
import InputField from '../../../../../../components/InputField/InputField';
import './ChartDetailsStyle.scss';
import { WarningTwoTone } from '@ant-design/icons';
import { connect } from 'react-redux';

function ChartDetails(props) {
    const [trace1, setTrace1] = useState({
        x: [1, 2, 3, 4, 5],
        y: [1, 6, 3, 6, 1],
        mode: 'markers',
        type: 'scatter',
        name: 'Shale',
        text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
        marker: { size: 12 },
    });
    const [trace2, setTrace2] = useState({
        x: [1.5, 2.5, 3.5, 4.5, 5.5],
        y: [4, 1, 7, 1, 4],
        mode: 'markers',
        type: 'scatter',
        name: 'Sandstone',
        text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
        marker: { size: 12 },
    });
    const [chart_name, setChart_Name] = useState(props.chartName);

    return (
        <div>
            <Card title='Chart'>
                <div className='chart-details-input'>
                    <InputField
                        label='ID'
                        // value={props.chartName ? props.chartName.chart_id : ''}
                        value={props.chartObj.chart_id}
                        disabled
                    />
                    <InputField
                        label='Version'
                        value={props.chartObj.chart_version}
                        disabled
                    />
                    <InputField
                        label='Status'
                        value={props.chartObj.chart_status}
                        disabled
                    />
                    <InputField
                        label='Chart Name '
                        // value={
                        //     props.chartName ? props.chartName.chart_name : ''
                        // }
                        value={props.chartObj.chart_name}
                        disabled
                    />
                    <InputField
                        value={props.chartObj.chart_description}
                        label='Description'
                        disabled
                        // value={
                        //     props.chartName.chart_info
                        //         ? props.chartName.chart_info['Title']
                        //         : ''
                        // }
                    />
                </div>
            </Card>
            <Card
                title={
                    <span>
                        Scatter Plot{' '}
                        <WarningTwoTone
                            style={{ marginLeft: 125 }}
                            twoToneColor='red'
                        />{' '}
                        <span style={{ color: 'grey', fontSize: '14px' }}>
                            Data unavailable for Y-Axis: Pressure
                        </span>{' '}
                    </span>
                }
            >
                <Plot
                    data={[trace1, trace2]}
                    layout={{
                        xaxis: {
                            range: [0.75, 5.25],
                        },
                        yaxis: {
                            range: [0, 8],
                        },
                        // title: 'Data Labels on the Plot',
                        height: 280,
                        width: 450,
                        showlegend: true,
                        legend: { orientation: 'h' },
                        margin: {
                            l: 50,
                            r: 50,
                            b: 50,
                            t: 50,
                            pad: 5,
                        },
                    }}
                />
            </Card>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        chartName: state.chartDataReducer.chartName,
    };
};

export default connect(mapStateToProps, null)(ChartDetails);
