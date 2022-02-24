import React, { useState, useEffect } from 'react';
import { WarningOutlined } from '@ant-design/icons';
import { Card, Tag } from 'antd';
import InputField from '../../../../../../components/InputField/InputField';
import './ChartViewStyles.scss';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import InputView from '../../../../../../components/InputView/InputView';
import {
  sendViewId,
  sendViewName,
  sendViewStatus,
  sendViewVersion,
} from '../../../../../../duck/actions/chartPersonalizationAction';

function ChartView(props) {
  console.log('chart props', props);
  const selectedView = useSelector(
    (state) => state.chartPersReducer.selectedView
  );

  const [showParam, setShowParam] = useState(false);
  const [viewId, setViewId] = useState('');
  const [viewName, setViewName] = useState('');
  const [viewStatus, setViewStatus] = useState('');
  const [viewVersion, setViewVersion] = useState('');
  const [viewIdVersion, setviewIdVersion] = useState();
  const [viewTableData, setViewTableData] = useState([]);
  const [batchData, setbatchData] = useState(
    props.batchCoverageData.data.coverage
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedView) {
      setViewId(selectedView.view_disp_id);
      setViewName(selectedView.view_name);
      setViewStatus(selectedView.view_status);
      setViewVersion(selectedView.view_version);
    }
    setViewTableData(props.viewTableData);
  }, [props.viewTableData]);

  const handleClickLoad = (value) => {
    console.log('eeeee', value);
    let view_value = value ? value : '';
    let split_view_id = view_value ? view_value.split('-') : [];
    setViewId(split_view_id[0]);
    setViewVersion(split_view_id[1]);
    setviewIdVersion(view_value);
    setShowParam(true);

    let filterViewData = viewTableData.filter((item) => item.view === value);
    setViewName(filterViewData[0].view_name);
    setViewStatus(filterViewData[0].view_status);

    dispatch(sendViewId(split_view_id[0]));
    dispatch(sendViewName(filterViewData[0].view_name));
    dispatch(sendViewStatus(filterViewData[0].view_status));
    dispatch(sendViewVersion(split_view_id[1]));
    props.callbackViewData(split_view_id[0]);
    console.log('filterViewData', filterViewData, view_value, split_view_id);
  };

  console.log('view', viewId, viewName, viewStatus, viewVersion);

  const handleSearch = (value) => {
    console.log('value', value);
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

  return (
    <div>
      <Card title='View'>
        <div>
          <div className='chartview-input'>
            <InputView
              label='View ID'
              selectedValue={viewId}
              placeholder='View Id'
              onClickPopup={callbackView}
              onChangeSelect={(e) => handleClickLoad(e)}
              selectList={viewData}
            />

            <InputField
              placeholder='Enter View Name'
              label='View Name'
              value={viewName}
              disabled
            />
            <InputField
              placeholder='Status'
              label='Status'
              value={viewStatus}
              disabled
            />
            <InputField
              placeholder='Enter Version '
              label='Version'
              value={viewVersion}
            />
          </div>
        </div>
      </Card>
      {showParam && (
        <Card title='Parameter'>
          <div className='alert-tags'>
            {/* {batchData} */}
            {/* <div className='alert-tags_block'>
              <Tag className='alert-tags-label'>Temperature</Tag>
              <Tag className='alert-progress'>100%</Tag>
            </div>
            <div className='alert-tags_error'>
              <Tag className='alert-tags-label' color='magenta'>
                Pressure
              </Tag>
              <WarningOutlined style={{ color: '#FA541C' }} />
              <Tag className='alert-progress-error'>80%</Tag>
            </div>
            <div className='alert-tags_error'>
              <Tag className='alert-tags-label' color='magenta'>
                PH
              </Tag>
              <WarningOutlined style={{ color: '#FA541C' }} />
              <Tag className='alert-progress-error'>90%</Tag>
            </div> */}
            {/* <div className='alert-tags_block'>
              <Tag className='alert-tags-label'>Temparature</Tag>
              <Tag className='alert-progress'>100%</Tag>
            </div> */}
          </div>
        </Card>
      )}
    </div>
  );
}

ChartView.propTypes = {
  chartObj: PropTypes.object.isRequired,
};

export default ChartView;
