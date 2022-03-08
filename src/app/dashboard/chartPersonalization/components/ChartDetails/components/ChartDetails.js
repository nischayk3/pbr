import './ChartDetailsStyle.scss';

import { Button, Card, Empty, Modal, Switch, Row, Col, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  sendChartDesc,
  sendChartName,
} from '../../../../../../duck/actions/chartPersonalizationAction';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../../../../../../components/InputField/InputField';
import { LineChartOutlined } from '@ant-design/icons';
import ScatterPlot from './ScatterPlot';
import { WarningTwoTone } from '@ant-design/icons';


const { TextArea } = Input;

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
      state.chartDataReducer && state.chartDataReducer.selectedChartData
  );

  useEffect(() => {
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
    setselectedData(chartPlotData.data);
    setselectedLayout(chartPlotData.layout);
  }, [chartPlotData]);

  const dispatch = useDispatch();

  const onChangeChart = (e, field) => {
    if (e.target.value !== null) {
      if (field === 'chart_name') {
        setchartName(e.target.value);
        dispatch(sendChartName(e.target.value));
        props.isChartNameEmpty(false);
      } else if (field === 'description') {
        setchartDescription(e.target.value);
        dispatch(sendChartDesc(e.target.value));
      }
    }
  };

  const chartNodeClicked = (batch) => {
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
          <InputField
            label='ID'
            value={props.resChartId ? props.resChartId : chartId}
            disabled
          />
          <InputField
            label='Version'
            value={props.resChartVersion ? props.resChartVersion : chartVersion}
            disabled
          />
          <InputField
            label='Status'
            value={props.resChartStatus ? props.resChartStatus : chartStatus}
            disabled
          />
          {props.isFieldEmpty ? (
            <div className='input-error-label'>
              <InputField
                onChangeInput={(e) => {
                  onChangeChart(e, 'chart_name');
                }}
                label='Chart Name *'
                placeholder='Enter Chart Name'
                value={chartName}
              />
              <p className='error-label'>Please Enter Chart Name </p>
            </div>
          ) : (
            <InputField
              onChangeInput={(e) => {
                onChangeChart(e, 'chart_name');
              }}
              label='Chart Name *'
              placeholder='Enter Chart Name'
              value={chartName}
            />
          )}

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
          bordered={false}
          title={
            <span>
              Scatter Plot
              {/* <WarningTwoTone style={{ marginLeft: 125 }} twoToneColor='red' />
              <span style={{ color: 'grey', fontSize: '14px' }}>
                Data unavailable for Y-Axis: Pressure
              </span> */}
            </span>
          }
          style={{ marginTop: '24px', border: '1px solid #d9d9d9' }}
        >
          {selectedLayout && Object.keys(selectedLayout).length > 0 ? (
            <ScatterPlot
              data={selectedData}
              layout={selectedLayout}
              nodeClicked={chartNodeClicked}
            />
          ) : (
            <Empty
              style={{ height: '85px' }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description='Please select a chart type and enter relevant field data to load chart'
            />
          )}
        </Card>
      </Card>
      <Modal
        title='Exclude Record'
        visible={isExcluedModal}
        onCancel={handleCloseModal}
        footer={null}
        closable
        width={500}
      >
        <div className='exclusion-modal'>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='Product Code' value={clickedBatchId} disabled />
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='Unit' value={clickedBatchId} disabled />
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='NC Number' value={clickedBatchId} disabled />
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='Batch Number' value={clickedBatchId} disabled />
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='Test Date' value={clickedBatchId} disabled />
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div className="radio-btn">
                <p>Show/Hide Record</p>
                <Switch type='primary' size='small' onChange={onChangeCheckbox} />
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <div>
                <InputField label='Parameter Name' value={clickedBatchId} disabled />
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <div>
                <label>Notes</label>
              <TextArea rows={2} placeholder="Reason for excluding Record." maxLength={6} />
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row btn-three" span={24}>
              <Button
                onClick={handleCloseModal}
                className='custom-primary-btn'
                key='cancel'
              >
                Create NC
              </Button>
              <div className='last-btn'>
                <Button
                  onClick={handleCloseModal}
                  className='custom-primary-btn'
                  key='cancel'
                >
                  Genealogy
                </Button>
                <Button
                  onClick={handleOk}
                  className='custom-secondary-btn'
                  key='link'
                  type='primary'
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default ChartDetails;


{/* <InputField label='Batch' value={clickedBatchId} disabled />
        <div className='show-data'>
          <p>Exclude Record </p>
          <Switch type='primary' size='small' onChange={onChangeCheckbox} />
        </div> */}
