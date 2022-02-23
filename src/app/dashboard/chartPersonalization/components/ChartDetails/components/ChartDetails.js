import React, { useState } from 'react';
import { WarningTwoTone } from '@ant-design/icons';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import './ChartDetailsStyle.scss';
import { LineChartOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import InputField from '../../../../../../components/InputField/InputField';
import ScatterPlot from './ScatterPlot';

function ChartDetails(props) {
  const chartPlotData = useSelector(
    (state) => state.chartPersReducer.chartData
  );
  //   const plotData = {
  //     x: [1, 2, 3, 4, 5],
  //     y: [1, 6, 3, 6, 1],
  //     mode: 'markers',
  //     type: 'scatter',
  //     name: 'Shale',
  //     text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
  //     marker: { size: 12 },
  //   };

  //   const plotLayout = {
  //     xaxis: {
  //       range: [0.75, 5.25],
  //     },
  //     yaxis: {
  //       range: [0, 8],
  //     },
  //     // title: 'Data Labels on the Plot',
  //     height: 280,
  //     width: 450,
  //     showlegend: true,
  //     legend: { orientation: 'h' },
  //     margin: {
  //       l: 50,
  //       r: 50,
  //       b: 50,
  //       t: 50,
  //       pad: 5,
  //     },
  //   };

  //const [chart_name, setChart_Name] = useState(props.chartName);

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
            Scatter Plot
            <WarningTwoTone
              style={{ marginLeft: 125 }}
              twoToneColor='red'
            />{' '}
            <span style={{ color: 'grey', fontSize: '14px' }}>
              Data unavailable for Y-Axis: Pressure
            </span>
          </span>
        }
        // style={{ height: '320px' }}
      >
        {Object.keys(chartPlotData).length > 0 ? (
          <ScatterPlot
            data={chartPlotData.Data}
            layout={chartPlotData.layout}
          />
        ) : (
          <div className='no-chart-data'>
            <LineChartOutlined />
          </div>
        )}
      </Card>
    </div>
  );
}

ChartDetails.propTypes = {
  chartObj: PropTypes.object.isRequired,
};

export default ChartDetails;
