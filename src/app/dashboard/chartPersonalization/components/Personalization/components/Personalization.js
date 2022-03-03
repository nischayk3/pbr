import './Personalization.scss';

import { Card, Collapse } from 'antd';
import React, { Component } from 'react';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import Alerts from './alerts'
import ControLimits from './controlLimts'
const { Panel } = Collapse;



const  Personalization = (props)=>{
  


    return (
      <>
      <Card className='Configuration-card' title='Configuration'>
        <Collapse
          expandIconPosition='right'
          ghost
        >
          {/* Alert */}
          <Panel header='Alerts' key='1'>
            <Alerts/>
          </Panel>

          {/* Customization */}
          <Panel header='Customization' key='2'></Panel>

          {/* control Limits */}
          <Panel header='Control Limits' key='3'>
             <ControLimits/>
          </Panel>
        </Collapse>
      </Card>
      </>
    );
    
  }


export default Personalization;
