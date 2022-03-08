import './Personalization.scss';

import { Card, Collapse } from 'antd';
import React, { useState, useEffect } from 'react';

import InputField from '../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../components/SelectField/SelectField';
import Alerts from './alerts';
import ControLimits from './controlLimts';
import { PlusSquareOutlined ,ControlOutlined} from '@ant-design/icons';
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


  return (
    <>
      <Card className='Configuration-card' title='Configuration'>
        <Collapse
          expandIconPosition='right'
          ghost
        >
          
            {/* Limits */}
            <Panel header="Limits" key='3'>
                  <ControLimits />
          </Panel>

          {/* Display */}
          <Panel header='Display' key='2'>
            
          </Panel>


        </Collapse>
      </Card>
    </>
  );

}


export default Personalization;
