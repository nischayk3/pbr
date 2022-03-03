import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Filter from './genealogyFilter';

function Genealogy() {
  return (
    <div className='custom-wrapper'>
      <div className='sub-header'>
        <div className='sub-header-title'>
          <ArrowLeftOutlined className='header-icon' />
          <span className='header-title'>Genealogy</span>
        </div>
      </div>
      <div className='custom-content-layout'>
        <Filter />
      </div>
    </div>
  );
}

export default Genealogy;
