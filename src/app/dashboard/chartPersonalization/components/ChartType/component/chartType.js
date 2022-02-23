/* eslint-env browser, node */
import React, { useState, useEffect } from 'react';

import { WarningTwoTone } from '@ant-design/icons';
import { Card, Select, Typography, Input, Button } from 'antd';

import './styles.scss';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import SelectField from '../../../../../../components/SelectField/SelectField';
import { getChartType } from '../../../../../../duck/actions/auditTrialAction';
import { generateChart } from '../../../../../../duck/actions/chartPersonalizationAction';
import { getChartData } from '../../../../../../duck/actions/chartDataAction';
import { showNotification } from '../../../../../../duck/actions/commonActions';
import chartTypeJson from '../chartType.json';
import InputField from '../../../../../../components/InputField/InputField';

console.log('chartTypeJson', chartTypeJson);

const { Text } = Typography;

const ChartType = (props) => {
  const [isScatter, setisScattetruer] = useState(true);
  const [chartTypeList, setchartTypeList] = useState(
    chartTypeJson.map((item) => item.chart_type)
  );
  const [selectedChartType, setselectedChartType] = useState(
    props.chartObj.chart_type
  );
  const [selectedXAxis, setselectedXAxis] = useState('');
  const [selectedYAxis, setselectedYAxis] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    getChartTypeHandler();
  }, []);

  const getChartTypeHandler = () => {
    let req = { user_id: JSON.parse(localStorage.getItem('username')) };
    getChartType(req).then((res) => {
      console.log('res', res);
      if (res.data.statuscode === 200) {
        // setchartTypeList(res.data);
      } else if (res.data.statuscode === 400 || res.data.statuscode === 401) {
        console.log('res.statuscode', res.statuscode);
        console.log('res.data.message', res.data.message);
        dispatch(
          showNotification('error', 'Chart Type Error - ' + res.data.message)
        );
      }
    });
  };

  const selectChartType = (value) => {
    let selectedChart = chartTypeJson.filter(function (el) {
      return el.chart_type === value;
    });

    let obj = selectedChart[0]['chart_info'];
    //this.props.getChartData(selectedChart[0]);
    console.log('selectedChart', obj['x-axis'], obj);
    let x_axis_value = obj[0]['x-axis'];
    let y_axis_value = obj[0]['y-axis'];
    if ('x-axis' in obj && 'y-axis' in obj) {
      setselectedChartType(value);
      setselectedXAxis(x_axis_value);
      setselectedYAxis(y_axis_value);
      setSelectedTitle(obj[0].Title);
      setisScattetruer(true);
    } else {
      setselectedChartType(value);
      setselectedXAxis(x_axis_value);
      setselectedYAxis(y_axis_value);
      setSelectedTitle(obj[0].Title);
      setisScattetruer(true);
    }
  };

  const Data = {
    x: [
      '2021-05-22 09:30:00',
      '2021-05-23 09:30:00',
      '2021-05-24 09:30:00',
      '2021-05-24 09:30:00',
      '2021-05-24 09:30:00',
      '2021-05-25 09:30:00',
      '2021-05-26 09:30:00',
      '2021-05-27 09:30:00',
      '2021-05-27 09:30:00',
      '2021-05-28 09:30:00',
    ],
    y: [0.9211, 1.84, 0.22, 3.39, 3.39, 0.54, 1.28, 2.58, 2.79, 2.79],
    mode: 'markers',
    type: 'scatter',
    marker: { size: 12 },
  };
  const Layout = {
    // plot_bgcolor: 'rgb(230, 230, 230)',
    // xlabel: selectedXAxis,
    // ylabel: selectedYAxis,
    title: selectedTitle,
    xaxis: {
      range: [0.75, 5.25],
    },
    yaxis: {
      range: [0, 8],
    },

    height: 150,
    width: 250,
    showlegend: true,
    legend: { orientation: 'h' },
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 5,
    },
  };

  const createChart = () => {
    const plotlyData = {
      Data: Data,
      Layout: Layout,
    };
    dispatch(generateChart(plotlyData));
  };
  return (
    <div>
      <Card title='Chart'>
        <div className='grid-2-columns'>
          <SelectField
            label='Chart Type'
            onChangeSelect={(e) => selectChartType(e)}
            selectList={chartTypeList}
            selectedValue={selectedChartType}
          />
          <Button
            type='primary'
            className='custom-secondary-btn'
            onClick={createChart}
            style={{ marginTop: '22px' }}
          >
            Apply
          </Button>
        </div>

        {isScatter ? (
          <div className='grid-2-columns' style={{ marginTop: '10px' }}>
            <InputField
              label='X-Axis'
              placeholder='X-Axis '
              //onChangeClick={(e) => handleDateClick(e)}
              value={selectedXAxis}
              disabled
            />
            <InputField
              label='Y-Axis'
              placeholder=' Y-Axis '
              //onChangeClick={(e) => handleDateClick(e)}
              value={selectedYAxis}
              disabled
            />
            {/* <WarningTwoTone style={{ marginLeft: 10 }} twoToneColor='red' /> */}
          </div>
        ) : (
          <InputField
            label='Y-Axis'
            placeholder=' Y-Axis '
            //onChangeClick={(e) => handleDateClick(e)}
            value={selectedYAxis}
            disabled
          />
        )}
      </Card>
    </div>
  );
};

ChartType.propTypes = {
  chartObj: PropTypes.object.isRequired,
};

export default ChartType;
