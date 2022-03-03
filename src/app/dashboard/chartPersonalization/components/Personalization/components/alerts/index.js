import '../Personalization.scss';
import './style.scss';
import { Card, Collapse } from 'antd';
import React, { Component } from 'react';

import InputField from '../../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../../components/SelectField/SelectField';


const  Alerts = (props)=>{
  
    return (
      <>
            <div className='alerts-input'>
              <p>Params</p>
              <div className='alerts-input-param'>
                <InputField vlaue='' />
                <SelectField />
                <InputField vlaue='' />
              </div>
            </div>
            <div>
              <InputField label='Users' vlaue='' />
            </div>
            <div>
              <SelectField label='Schedule' />
            </div>
      </>
    );
    
  }


export default Alerts;
