import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import InputField from '../../../../../../components/InputField/InputField';
InputField;

const ChartLanding = (props) => {
  const selectedView = useSelector(
    (state) => state.chartPersReducer.selectedView
  );

  const [viewId, setViewId] = useState('');
  const [viewName, setViewName] = useState('');
  const [viewStatus, setViewStatus] = useState('');
  const [viewVersion, setViewVersion] = useState('');

  // useEffect(() => {
  //   if (selectedView) {
  //     setViewId(selectedView.view_disp_id);
  //     setViewName(selectedView.view_name);
  //     setViewStatus(selectedView.view_status);
  //     setViewVersion(selectedView.view_version);

  //     props.callbackViewType(selectedView.view_disp_id);
  //   }
  // }, [selectedView]);
  return (
    <div className='chartview-input-landing'>
      <InputField
        label='View ID'
        // value={viewName}
        placeholder='View ID'
        disabled
      />
      <InputField
        label='View Name'
        placeholder='View Name'
        // value={viewName}
        disabled
      />
      <InputField
        label='Status'
        placeholder='Status'
        //  value={viewStatus}
        disabled
      />
      <InputField
        label='Version'
        placeholder='Version'
        // value={viewVersion}
        disabled
      />
    </div>
  );
};

export default ChartLanding;
