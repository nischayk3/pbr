import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import {
  sendChartData,
  sendChartId,
  sendChartVersion,
} from '../../duck/actions/chartPersonalizationAction';

import InputView from '../InputView/InputView';
import { useDispatch } from 'react-redux';

const LoadModal = (props) => {
  console.log('load modal props', props);
  const [chartId, setchartId] = useState('');
  const [chartVersion, setchartVersion] = useState('');
  const [chartViewId, setchartViewId] = useState('');

  const dispatch = useDispatch();

  const viewChartData = props.data && props.data.length > 0 ? props.data : [];
  const options = viewChartData.map((item, i) => (
    <Option key={i} value={`${item.chart_disp_id}-${item.chart_version}`}>
      {`${item.chart_disp_id}-${item.chart_version}`}
    </Option>
  ));

  const callbackView = () => {
    props.callbackLoadModal();
  };

  const handleOk = () => {
    let displayChartId = chartId;
    let displayChartVersion = chartVersion;
    props.handleOkModal(displayChartId, displayChartVersion);
  };

  const handleClose = () => {
    props.handleCloseModal();
  };

  const handleClickChart = (value) => {
    let selectedVlaue = value ? value : '';
    console.log('selectedVlaue', selectedVlaue);
    let splitValue = selectedVlaue ? selectedVlaue.split('-') : [];

    let filterChart = viewChartData.filter(
      (item) => item.chart_disp_id === splitValue[0]
    );
    setchartViewId(selectedVlaue);
    setchartId(splitValue[0]);
    setchartVersion(splitValue[1]);
    dispatch(sendChartId(splitValue[0]));
    dispatch(sendChartVersion(splitValue[1]));
    dispatch(sendChartData(filterChart));
  };

  return (
    <Modal
      title='Load'
      style={{ left: '20' }}
      width={400}
      visible={props.isModal}
      onCancel={handleClose}
      footer={[
        <Button
          onClick={handleClose}
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
    >
      <InputView
        label='Chart ID'
        placeholder='Chart Id'
        onClickPopup={callbackView}
        selectedValue={chartViewId}
        onChangeSelect={(e) => handleClickChart(e)}
        option={options}
      />
    </Modal>
  );
};

export default LoadModal;
