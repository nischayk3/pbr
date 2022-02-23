import React, { useState, useEffect } from 'react';

import { WarningOutlined } from '@ant-design/icons';
import { Card, Divider, Select, Tag } from 'antd';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';

import './ChartViewStyles.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

function ChartView(props) {
  console.log('chart props', props, props.chartObj.view_id);
  const selectedView = useSelector(
    (state) => state.chartPersReducer.selectedView
  );
  console.log('selectedViewId', selectedView);
  const [selectedViewType, setSelectedViewType] = useState('');
  const [viewTypeList, setViewTypeList] = useState(['View 1', 'View 2']);
  const [showParam, setShowParam] = useState(false);
  const [viewId, setViewId] = useState('');
  const [viewName, setViewName] = useState('');
  const [viewStatus, setViewStatus] = useState('');
  const [viewVersion, setViewVersion] = useState('');

  useEffect(() => {
    if (selectedView) {
      setShowParam(true);
      setViewId(selectedView.view_disp_id);
      setViewName(selectedView.view_name);
      setViewStatus(selectedView.view_status);
      setViewVersion(selectedView.view_version);

      props.callbackViewType(selectedView.view_disp_id);
    }
  }, [selectedView]);

  const handleSelectChange = (value) => {
    if (value !== null) {
      setSelectedViewType(value);
      setShowParam(true);
      setViewId(props.chartObj.view_id);
      setViewName(props.chartObj.view_name);
      setViewStatus(props.chartObj.chart_status);
      setViewVersion(props.chartObj.chart_version);
      props.callbackViewType(value);
    }
  };

  return (
    <div>
      <Card title='View' style={{ width: showParam ? 'inherit' : 250 }}>
        <div>
          <div
            className={classNames({
              'chartview-select': showParam,
            })}
          >
            <SelectField
              label='View Type'
              onChangeSelect={(e) => handleSelectChange(e)}
              selectList={viewTypeList}
              selectedValue={selectedViewType}
            />
          </div>
          {showParam && (
            <div className='chartview-input'>
              <InputField label='View ID' value={viewId} disabled />
              <InputField label='View Name' value={viewName} disabled />
              <InputField label='Status' value={viewStatus} disabled />
              <InputField label='Version' value={viewVersion} disabled />
            </div>
          )}
        </div>
      </Card>
      {showParam && (
        <Card title='Parameter'>
          <div className='alert-tags'>
            <div className='alert-tags_block'>
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
            </div>
            <div className='alert-tags_block'>
              <Tag className='alert-tags-label'>Temparature</Tag>
              <Tag className='alert-progress'>100%</Tag>
            </div>
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
