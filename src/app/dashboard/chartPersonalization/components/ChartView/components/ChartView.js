import './ChartViewStyles.scss';

import { Card, Empty, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  sendViewId,
  sendViewName,
  sendViewStatus,
  sendViewVersion,
} from '../../../../../../duck/actions/chartPersonalizationAction';
import { useDispatch, useSelector } from 'react-redux';

import InputField from '../../../../../../components/InputField/InputField';
import InputView from '../../../../../../components/InputView/InputView';
import PropTypes from 'prop-types';
import { WarningOutlined } from '@ant-design/icons';

function ChartView(props) {
  const coverage = [];
  const selectedView = useSelector(
    (state) => state.chartViewReducer.selectedView
  );

  const batchCoverage = useSelector(
    (state) => state.chartPersReducer.getBatchCoverage
  );

  const getChartObjData = useSelector(
    (state) =>
      state.chartDataReducer && state.chartDataReducer.selectedChartData[0]
  );
  console.log('getBatchCoverage', batchCoverage);
  const [showParam, setShowParam] = useState(false);
  const [viewId, setViewId] = useState('');
  const [viewName, setViewName] = useState('');
  const [viewStatus, setViewStatus] = useState('');
  const [viewVersion, setViewVersion] = useState('');
  const [viewIdVersion, setviewIdVersion] = useState();
  const [viewTableData, setViewTableData] = useState([]);
  const [batchData, setbatchData] = useState({});
  const [batchStatus, setbatchStatus] = useState({});
  const [showBatch, setshowBatch] = useState(false);

  const dispatch = useDispatch();

  const propsData = props !== undefined ? props : {};
  console.log('propsData', propsData);

  useEffect(() => {
    console.log('use effect 1');
    if (selectedView) {
      setViewId(selectedView.view_disp_id);
      setViewName(selectedView.view_name);
      setViewStatus(selectedView.view_status);
      setViewVersion(selectedView.view_version);
    }

    setViewTableData(props.viewTableData);
  }, [props.viewTableData, selectedView]);

  useEffect(() => {
    console.log('use effect 2');
    setViewId(
      getChartObjData && getChartObjData.view_id !== undefined
        ? getChartObjData.view_id
        : ''
    );
    setViewName(
      getChartObjData && getChartObjData.view_name !== undefined
        ? getChartObjData.view_name
        : ''
    );
    setViewStatus(
      getChartObjData && getChartObjData.view_status !== undefined
        ? getChartObjData.view_status
        : ''
    );
    setViewVersion(
      getChartObjData && getChartObjData.view_version !== undefined
        ? getChartObjData.view_version
        : ''
    );
  }, [getChartObjData]);

  useEffect(() => {
    console.log('use effect 3');
    let chartCoverage = batchCoverage && batchCoverage.coverage;
    let chartBatchStatus = batchCoverage && batchCoverage.batchstats;

    let cov =
      chartCoverage !== undefined &&
      Object.entries(chartCoverage).forEach(([key, value]) => {
        let createObj = {};
        createObj[key] = value;
        coverage.push(createObj);
      });
    let cov1 =
      chartCoverage !== undefined &&
      Object.entries(chartBatchStatus).forEach(([key1, value1]) => {
        let createObj1 = {};
        createObj1[key1] = value1;
        coverage.push(createObj1);
      });

    setbatchData(chartBatchStatus);
    setbatchStatus(chartCoverage);
  }, [batchCoverage]);

  const handleClickLoad = (value) => {
    let view_value = value ? value : '';
    let split_view_id = view_value ? view_value.split('-') : [];
    setViewId(split_view_id[0]);
    setViewVersion(split_view_id[1]);
    setviewIdVersion(view_value);
    setShowParam(true);
    setshowBatch(true);
    let filterViewData = viewTableData.filter((item) => item.view === value);
    setViewName(filterViewData[0].view_name);
    setViewStatus(filterViewData[0].view_status);

    dispatch(sendViewId(split_view_id[0]));
    dispatch(sendViewName(filterViewData[0].view_name));
    dispatch(sendViewStatus(filterViewData[0].view_status));
    dispatch(sendViewVersion(split_view_id[1]));
    props.callbackViewData(value);
  };

  const callbackView = () => {
    setShowParam(true);
    props.callbackViewTable(selectedView.view_disp_id);
  };

  const viewData = viewTableData.length > 0 ? viewTableData : [];

  const options = viewData.map((item, i) => (
    <Option key={i} value={item.view}>
      {item.view}
    </Option>
  ));
  console.log('props.isNew');
  return (
    <div>
      <Card title='View'>
        <div className='chartview-input'>
          <InputView
            label='View ID'
            selectedValue={viewId}
            placeholder='Select View Id'
            onClickPopup={callbackView}
            onChangeSelect={(e) => handleClickLoad(e)}
            option={options}
          />

          <InputField label='View Name' value={viewName} disabled />
          <InputField label='Status' value={viewStatus} disabled />
          <InputField
            placeholder='Enter Version '
            label='Version'
            value={viewVersion}
          />
        </div>{' '}
        {props && props.showBatch && (
          <Card
            title='Batch Coverage'
            style={{ marginTop: '24px', height: '184px' }}
          >
            {batchStatus !== undefined &&
            Object.keys(batchStatus).length > 0 ? (
              <div className='alert-tags'>
                {batchStatus !== undefined &&
                  Object.entries(batchStatus).map(([key1, value1]) => {
                    if (value1.replace(/\d+% ?/g, 0) < 100.0) {
                      return (
                        <div className='alert-tags_error'>
                          <WarningOutlined style={{ color: '#FA541C' }} />
                          <Tag className='alert-tags-label' color='magenta'>
                            {key1}
                          </Tag>
                          <p className='tag-percent'>{value1.toString()}</p>
                          {batchData !== undefined &&
                            Object.entries(batchData).map(([key, value]) => {
                              if (key1 === key) {
                                return (
                                  <p className='tag-stats'>
                                    {value.toString()}
                                  </p>
                                );
                              }
                            })}
                        </div>
                      );
                    } else {
                      return (
                        <div className='alert-tags_error'>
                          <div></div>
                          <Tag className='alert-tags-label' color='magenta'>
                            {key1}
                          </Tag>
                          <p className='tag-percent'>{value1.toString()}</p>
                          {batchData !== undefined &&
                            Object.entries(batchData).map(([key, value]) => {
                              if (key1 === key) {
                                return (
                                  <p className='tag-stats'>
                                    {value.toString()}
                                  </p>
                                );
                              }
                            })}
                        </div>
                      );
                    }
                  })}
              </div>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description='Please select View ID to load batch coverage'
              />
            )}
          </Card>
        )}
      </Card>
    </div>
  );
}

ChartView.propTypes = {
  chartObj: PropTypes.object.isRequired,
};

export default ChartView;
