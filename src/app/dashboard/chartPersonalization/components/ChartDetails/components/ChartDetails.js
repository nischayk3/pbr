import './ChartDetailsStyle.scss';

import { Button, Card, Empty, Modal, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  sendChartDesc,
  sendChartName,
} from '../../../../../../duck/actions/chartPersonalizationAction';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../../../../../../components/InputField/InputField';
import { LineChartOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ScatterPlot from './ScatterPlot';
import { WarningTwoTone } from '@ant-design/icons';

function ChartDetails(props) {
  const [chartName, setchartName] = useState('');
  const [chartDescription, setchartDescription] = useState('');
  const [chartStatus, setchartStatus] = useState('');
  const [chartId, setchartId] = useState('');
  const [chartVersion, setchartVersion] = useState('');
  const [selectedData, setselectedData] = useState([]);
  const [selectedLayout, setselectedLayout] = useState({});
  const [clickedBatchId, setclickedBatchId] = useState('');
  const [isExcluedModal, setisExcluedModal] = useState(false);
  const [isExcludeRecord, setisExcludeRecord] = useState(false);

  const chartPlotData = useSelector(
    (state) => state.chartDataReducer && state.chartDataReducer.chartData
  );

  const getChartObjData = useSelector(
    (state) =>
      state.chartDataReducer && state.chartDataReducer.selectedChartData[0]
  );

  useEffect(() => {
    console.log('use 111');
    setchartId(getChartObjData ? getChartObjData.chart_id : '');
    setchartVersion(getChartObjData ? getChartObjData.chart_version : '');
    setchartStatus(getChartObjData ? getChartObjData.chart_status : '');
    setchartName(getChartObjData ? getChartObjData.chart_name : '');
    setchartDescription(
      getChartObjData ? getChartObjData.chart_description : ''
    );
    let chartPlot = {
      data: getChartObjData ? getChartObjData.data : [],
    };
    let chartLayouts = {
      layout: getChartObjData ? getChartObjData.layout : {},
    };
    setselectedData(getChartObjData ? getChartObjData.data : []);
    setselectedLayout(getChartObjData ? getChartObjData.layout : {});
  }, [getChartObjData]);

  useEffect(() => {
    console.log('use 222');
    setselectedData(chartPlotData.data);
    setselectedLayout(chartPlotData.layout);
  }, [chartPlotData]);

  console.log('chart data =', selectedData, selectedLayout);
  const dispatch = useDispatch();

  const onChangeChart = (e, field) => {
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

  const chartNodeClicked = (batch) => {
    console.log('batchhhhhhhhhhh', batch);
    setisExcluedModal(true);
    setclickedBatchId(batch);
  };

  const handleCloseModal = () => {
    setisExcluedModal(false);
  };
  const handleOk = () => {
    setisExcluedModal(false);
  };
  const onChangeCheckbox = (checked) => {
    const isChecked = checked;
    setisExcludeRecord(checked);
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
            placeholder='Enter Chart Name'
            value={chartName}
          />
          <InputField
            onChangeInput={(e) => {
              onChangeChart(e, 'description');
            }}
            placeholder='Enter Description'
            label='Description'
            value={chartDescription}
          />
        </div>
        <Card
          title={
            <span>
              Scatter Plot
              {/* <WarningTwoTone style={{ marginLeft: 125 }} twoToneColor='red' />
              <span style={{ color: 'grey', fontSize: '14px' }}>
                Data unavailable for Y-Axis: Pressure
              </span> */}
            </span>
          }
          style={{ marginTop: '24px' }}
        >
          {selectedLayout && Object.keys(selectedLayout).length > 0 ? (
            (console.log('object selectedData', selectedData),
            (
              <ScatterPlot
                data={selectedData}
                layout={selectedLayout}
                nodeClicked={chartNodeClicked}
              />
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description='Please select a chart type and enter relevant field data to load chart'
            />
          )}
        </Card>
      </Card>
      <Modal
        title='Exclude Record'
        visible={isExcluedModal}
        footer={[
          <Button
            onClick={handleCloseModal}
            className='custom-primary-btn'
            key='cancel'
          >
            Cancel
          </Button>,
          <Button
            onClick={handleOk}
            className='custom-secondary-btn'
            key='link'
            type='primary'
          >
            Ok
          </Button>,
        ]}
        width={400}
      >
        <InputField label='Batch' value={clickedBatchId} disabled />
        <div className='show-data'>
          <p>Exclude Record </p>
          <Switch type='primary' size='small' onChange={onChangeCheckbox} />
        </div>
      </Modal>
    </div>
  );
}

ChartDetails.propTypes = {
  chartObj: PropTypes.object.isRequired,
};

export default ChartDetails;
