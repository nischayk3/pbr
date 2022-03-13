import './ChartDetailsStyle.scss';

import { Button, Card, Empty, Modal, Checkbox, Row, Col, Input } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
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
  // const [selectedLayout, setselectedLayout] = useState({});
  const [clickedBatchId, setclickedBatchId] = useState('');
  const [isExcluedModal, setisExcluedModal] = useState(false);
  const [isExcludeRecord, setisExcludeRecord] = useState(false);
  const counterId = useRef(0);
  const [exclusionValues, setExclusionValues] = useState({
    productCode:'',
    parameterName:'',
    parameterValue:'',
    unit:'',
    testDate:'',
    ncNumber:'',
    notes:'',
    excludeRecord:false
  })

  const chartPlotData = useSelector(
    (state) => state.chartDataReducer && state.chartDataReducer.chartData
  );

  const parameterData1 = useSelector(
    (state) => state.chartPersReducer.getBatchCoverage.data
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
    props.setselectedLayout(getChartObjData ? getChartObjData.layout : {});
  }, [getChartObjData]);

  useEffect(() => {
    setselectedData(chartPlotData.data);
    props.setselectedLayout(chartPlotData.layout);
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
    if (exclusionValues.excludeRecord) {
      let filtered = {};
      filtered = props.dataTable && props.dataTable.find((ele) => ele.batch_num === clickedBatchId)
      counterId.current = counterId.current + 1;
      filtered.timeStamp = new Date().toLocaleTimeString();
      filtered.exclusionDesc = exclusionValues.notes;
      filtered.userId = localStorage.getItem('user');
      filtered.exclusionId = counterId.current;
      props.setExclusionTableData([...props.exclusionTableData, filtered])
    }
  };
  const onChangeCheckbox = (checked) => {
    const isChecked = checked;
    setisExcludeRecord(checked);
  };

  const handleExcludeChange = (e) => {
      setExclusionValues({...exclusionValues, excludeRecord : e.target.checked })
  }

  const handleChangeNotes = (e) => {
    setExclusionValues({...exclusionValues, notes : e.target.value })
  }


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
          {props.selectedLayout && Object.keys(props.selectedLayout).length > 0 ? (
            <ScatterPlot
              data={selectedData}
              layout={props.selectedLayout}
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
        title='Batch Parameter'
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
                <InputField label='Product Code' value={exclusionValues.productCode} disabled />
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
                <InputField label='Parameter Name' value={exclusionValues.parameterName} disabled />
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='Parameter Value' value={exclusionValues.parameterValue} disabled />
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='Unit' value={exclusionValues.unit} disabled />
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='Test Date' value={exclusionValues.testDate} disabled />
              </div>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <div>
                <InputField label='NC Number' value={exclusionValues.ncNumber} disabled />
              </div>
            </Col>
            <Col className="gutter-row" span={12}>
            <Checkbox checked={exclusionValues.excludeRecord} onChange={handleExcludeChange}>Exclude Record</Checkbox>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <div>
                <label>Notes</label>
                <TextArea rows={2} placeholder="Reason for excluding Record." value={exclusionValues.notes} onChange={handleChangeNotes}  />
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

