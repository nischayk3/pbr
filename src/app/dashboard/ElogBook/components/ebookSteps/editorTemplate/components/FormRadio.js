import React from 'react';
import { Radio } from 'antd';

function FormRadio({task}) {
  return (
    <div>
      <Radio.Group name="radiogroup" defaultValue={1}>
        {task?.fieldData?.map((i) => 
     <Radio key={i.id}>
     {i.value || `Enter a value ${i.id}`}
   </Radio>
    )}

  </Radio.Group>
    </div>
  )
}

export default FormRadio
