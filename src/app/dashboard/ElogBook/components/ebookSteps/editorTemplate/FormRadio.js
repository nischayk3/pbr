import React from 'react';
import { Radio } from 'antd';

function FormRadio({task}) {
    console.log(task);
  return (
    <div>
      <Radio.Group name="radiogroup" defaultValue={1}>
        {task?.fieldData.map((i) => 
     <Radio key={i.id}>
     {i.value}
   </Radio>
    )}

  </Radio.Group>
    </div>
  )
}

export default FormRadio
