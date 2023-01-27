import React from 'react';
import { Checkbox } from "antd";

function FormCheckbox({task}) {
  return (
    <div>
      <Checkbox defaultChecked={task.defaultvalue == "true" ? true : false} >{task.textlabel}</Checkbox>
    </div>
  )
}

export default FormCheckbox
