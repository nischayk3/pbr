import './parameter.scss';

import React, { useEffect, useState } from 'react';

import { Table } from 'antd';
import { useSelector } from 'react-redux';

function ParameterTable(props) {
  //   const parameterData = useSelector(
  //     (state) => state.chartPersReducer.getBatchCoverage.data
  //   );

  //   console.log('parameterData', parameterData);
  //   const [paramData, setparamData] = useState([]);

  //   useEffect(() => {
  //     setparamData();
  //   }, [parameterData]);
  return (
    <>
      <Table
        size='small'
        className='parameter_table'
        columns={[]}
        dataSource={[]}
        bordered
        pagination={false}
      />
    </>
  );
}

export default ParameterTable;
