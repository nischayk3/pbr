import './styles.scss';

import { Button, Card } from 'antd';
/* eslint-env browser, node */
import React, { useEffect, useState } from 'react';
import {
  generateChart,
  sendChartMapping,
  sendChartType,
  sendChartxAxis,
  sendChartyAxis,
  sendData,
  sendLayout,
} from '../../../../../../duck/actions/chartPersonalizationAction';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import { WarningTwoTone } from '@ant-design/icons';
import chartTypeJson from '../chartType.json';

const ChartType = (props) => {
  const [isScatter, setisScattetruer] = useState(true);
  const [chartTypeList, setchartTypeList] = useState(
    chartTypeJson.map((item) => item.chart_type)
  );
  const [selectedChartType, setselectedChartType] = useState('');
  const [selectedXAxis, setselectedXAxis] = useState('');
  const [selectedYAxis, setselectedYAxis] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [xAxisList, setxAxisList] = useState([]);
  const [yAxisList, setyAxisList] = useState([]);
  const [chartBatchData, setChartBatchData] = useState({});
  const [batchData, setbatchData] = useState([]);
  const [isDisabled, setisDisabled] = useState(true);
  const [axisDataArray, setaxisDataArray] = useState([]);

  const [isDisableXAxis, setisDisableXAxis] = useState(false);
  const [isDisabledYAxis, setisDisabledYAxis] = useState(false);
  const [showWarn, setshowWarn] = useState(false);

  const dispatch = useDispatch();
  const getChartObjData = useSelector(
    (state) =>
      state.chartDataReducer && state.chartDataReducer.selectedChartData
  );

  const batchCoverage = useSelector(
    (state) => state.chartPersReducer.getBatchCoverage
  );

  const chartDesc = useSelector((state) => state.chartPersReducer.chartDesc);

  useEffect(() => {
    setselectedChartType(getChartObjData?.chart_type);
    setselectedXAxis(getChartObjData?.chart_mapping?.x?.function_name);
    setselectedYAxis(getChartObjData?.chart_mapping?.y?.function_name);
  }, [getChartObjData]);

  useEffect(() => {
    const xAxis = [];
    const yAxis = [];
    const batch = [];
    const temp = [];
    const ph = [];
    const axisArray = [];

    const fetchXYAxis =
      batchCoverage &&
      batchCoverage.coverage !== undefined &&
      Object.entries(batchCoverage.coverage).map(([key, value]) => {
        let axisObj = {};

        axisObj['key'] = key;
        axisObj['value'] = value;

        axisArray.push(axisObj);
        xAxis.push(key);
        yAxis.push(key);
      });

    const filterChartBatch =
      batchCoverage &&
      batchCoverage.data !== undefined &&
      batchCoverage.data.map((item) => {
        batch.push(item.batch_num),
          temp.push(item.Temperature),
          ph.push(item.pH);
      });

    const data = {
      batch: batch,
      ph: ph,
      Temperature: temp,
    };
    setbatchData(data);
    setChartBatchData(batchCoverage);
    setxAxisList(xAxis.filter(uniqueArr));
    setyAxisList(yAxis.filter(uniqueArr));
    setaxisDataArray(axisArray);
  }, [batchCoverage]);

  useEffect(() => {
    setSelectedTitle(chartDesc);
  }, [chartDesc]);

  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const chartData = {
    x: batchData.ph !== undefined ? batchData.ph : [],
    y: batchData.Temperature !== undefined ? batchData.Temperature : [],
    text: batchData.batch !== undefined ? batchData.batch : [],
    mode: 'markers',
    type: 'scatter',
    marker: { size: 12 },
  };
  const chartLayout = {
    title: {
      text: selectedTitle !== undefined ? selectedTitle : '',
    },
    xaxis: {
      title: {
        text: selectedXAxis,
      },
    },
    yaxis: {
      title: {
        text: selectedYAxis,
      },
    },
    showlegend:true,
    height: 250,
    width: 450,
    // margin: {
    //   l: 50,
    //   r: 50,
    //   b: 50,
    //   t: 50,
    //   pad: 5,
    // },
  };

  const selectChartType = (value, field) => {
    setisDisabled(false);
    if (value !== null) {
      if (field === 'charttype') {
        setselectedChartType(value);
        if (value === 'Scatter Plot') {
          setisScattetruer(true);
        } else if (value === 'Process Control') {
          setisScattetruer(false);
        }
      } else if (field === 'xaxis') {
        setselectedXAxis(value);
        let warnCheck = axisDataArray.map((item) => {
          if (item.value.replace(/\d+% ?/g, 0) < 100.0) {
            if (item.key === value) {
              setshowWarn(true);
            } else {
              setshowWarn(false);
            }
          }
        });
      } else if (field === 'yaxis') {
        setselectedYAxis(value);
        let warnCheck = axisDataArray.map((item) => {
          if (item.value.replace(/\d+% ?/g, 0) < 100.0) {
            if (item.key === value) {
              setshowWarn(true);
            } else {
              setshowWarn(false);
            }
          }
        });
      }
    }
  };

  const createChart = () => {
    const chartMapping = {
      x: {
        function_id: '1',
        function_name: selectedXAxis,
      },
      y: {
        function_id: '2',
        function_name: selectedYAxis,
      },
    };
    const plotlyData = {
      data: chartData,
      layout: chartLayout,
    };

    dispatch(sendData(chartData));
    dispatch(sendLayout(chartLayout));
    dispatch(generateChart(plotlyData));
    dispatch(sendChartType(selectedChartType));
    dispatch(sendChartxAxis(selectedXAxis));
    dispatch(sendChartyAxis(selectedXAxis));
    dispatch(sendChartMapping(chartMapping));
  };

  return (
    <div>
      <Card title='Chart'>
        <div className='grid-2-columns'>
          <SelectField
            label='Chart Type'
            onChangeSelect={(e) => selectChartType(e, 'charttype')}
            selectList={chartTypeList}
            selectedValue={selectedChartType}
          />
        </div>

        {isScatter ? (
          <div className='grid-2-columns' style={{ marginTop: '10px' }}>
            <SelectField
              iconlabel={
                showWarn ? (
                  <WarningTwoTone
                    style={{ marginLeft: 10 }}
                    twoToneColor='red'
                  />
                ) : (
                  ''
                )
              }
              label='X-Axis'
              placeholder='X-Axis '
              onChangeSelect={(e) => selectChartType(e, 'xaxis')}
              selectList={xAxisList}
              selectedValue={selectedXAxis}
            />
            <SelectField
              iconlabel={
                showWarn ? (
                  <WarningTwoTone
                    style={{ marginLeft: 10 }}
                    twoToneColor='red'
                  />
                ) : (
                  ''
                )
              }
              label='Y-Axis'
              placeholder='Y-Axis '
              onChangeSelect={(e) => selectChartType(e, 'yaxis')}
              selectList={yAxisList}
              selectedValue={selectedYAxis}
            />
          </div>
        ) : (
          <InputField
            label='Y-Axis'
            placeholder=' Y-Axis '
            //onChangeClick={(e) => handleDateClick(e)}
            value={selectedYAxis}
          />
        )}
        <Button
          type='primary'
          className='custom-secondary-btn'
          onClick={createChart}
          style={{ marginTop: '12px', float: 'right' }}
          disabled={isDisabled}
        >
          Apply
        </Button>
      </Card>
    </div>
  );
};

export default ChartType;
