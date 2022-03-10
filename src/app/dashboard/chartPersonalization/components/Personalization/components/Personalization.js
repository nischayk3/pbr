import './Personalization.scss';

import { Card, Collapse } from 'antd';
import React, { useState, useEffect } from 'react';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import Alerts from './alerts/index';
import ControLimits from './controlLimts';
import Display from './display';
import { ControlOutlined, StarOutlined} from '@ant-design/icons';
const { Panel } = Collapse;



const Personalization = (props) => {
  const [count, setCount] = useState(1);
  const [alertCount, setAlertCount] = useState([1]);

  const handleClick=()=>{
    setCount(count + 1);
    setAlertCount([...alertCount,count+1]);
  }

  const deleteAlert=(value)=>{
    console.log(value);
    console.log("before",alertCount);
    let data=[...alertCount];
    let index=data.findIndex(el=>el==value);
    data.splice(index,1)
    console.log("after",data);
    setAlertCount(data);
  }

  const limits = 'Limits'

  return (
    <>
      <Card className='Configuration-card' title='Configuration'>
        <Collapse
          expandIconPosition='right'
          ghost
        >
           <Panel header="Alerts" key='1'>
                  <Alerts />
          </Panel>
          
            {/* Limits */}
          <Panel header={<div><StarOutlined />Limits</div>} key='3'>
                  <ControLimits />
          </Panel>

          {/* Display */}
          <Panel header={<div><ControlOutlined />Display</div>} key='2'>
            <Display/>
          </Panel>


        </Collapse>
      </Card>
    </>
  );

}


export default Personalization;
