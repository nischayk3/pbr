import React, { useState } from 'react';
import { WarningTwoTone } from '@ant-design/icons';
import { Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import './ChartDetailsStyle.scss';
import { LineChartOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import InputField from '../../../../../../components/InputField/InputField';
import ScatterPlot from './ScatterPlot';
import {
  sendChartDesc,
  sendChartName,
} from '../../../../../../duck/actions/chartPersonalizationAction';

function ChartDetails(props) {
  // const chartPlotData = useSelector(
  //   (state) => state.chartPersReducer && state.chartPersReducer.chartData
  // );

  // const [chartName, setchartName] = useState(
  //   props.chartObj && props.chartObj.chart_name ? props.chartObj.chart_name : ''
  // );
  // const [chartDescription, setchartDescription] = useState(
  //   props.chartObj && props.chartObj.chart_description
  //     ? props.chartObj.chart_description
  //     : ''
  // );
  // const [chartStatus, setchartStatus] = useState(
  //   props.chartObj && props.chartObj.chart_status
  //     ? props.chartObj.chart_status
  //     : ''
  // );
  // const [chartId, setchartId] = useState(
  //   props.chartObj && props.chartObj.chart_id ? props.chartObj.chart_id : ''
  // );
  // const [chartVersion, setchartVersion] = useState(
  //   props.chartObj && props.chartObj.chart_version
  // );
  const chartPlotData = useSelector(
    (state) => state.chartPersReducer && state.chartPersReducer.chartData
  );

  const [chartName, setchartName] = useState('');
  const [chartDescription, setchartDescription] = useState('');
  const [chartStatus, setchartStatus] = useState('');
  const [chartId, setchartId] = useState('');
  const [chartVersion, setchartVersion] = useState('');

  const dispatch = useDispatch();

  const onChangeChart = (e, field) => {
    console.log('eeee', e);
    if (e.target.value !== null) {
      if (field === 'chart_name') {
        setchartName(e.target.value);
        dispatch(sendChartName(e.target.value));
      } else if (field === 'description') {
        setchartDescription(e.target.value);
        dispatch(sendChartDesc(e.target.value));
      }
    }
  };

  return (
    <div>
      <Card title='Chart'>
        <div className='chart-details-input'>
          <InputField label='ID' value={chartId} disabled />
          <InputField label='Version' value={chartVersion} disabled />
          <InputField label='Status' value={chartStatus} disabled />
          <InputField
            onChangeInput={(e) => {
              onChangeChart(e, 'chart_name');
            }}
            label='Chart Name '
            value={chartName}
          />
          <InputField
            onChangeInput={(e) => {
              onChangeChart(e, 'description');
            }}
            label='Description'
            value={chartDescription}
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
        {/* {Object.keys(chartPlotData).length > 0 ? ( */}
        <ScatterPlot data={chartPlotData.Data} layout={chartPlotData.layout} />
        {/* ) : (
          <div className='no-chart-data'>
            <LineChartOutlined />
          </div>
        )} */}
      </Card>
    </div>
  );
}

ChartDetails.propTypes = {
  chartObj: PropTypes.object.isRequired,
};

export default ChartDetails;
