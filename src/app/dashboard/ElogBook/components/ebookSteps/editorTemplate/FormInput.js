import React from 'react';
import { Input, Select, Button } from 'antd';


function FormInput({ task, layout }) {
    console.log(task,layout);
    return (

        <div>
            {/* {current === "1" ? */}
                
                    
                    <div>
                        <label>{task.label}</label>
                        <Input type={task.datatype} name={task.technicalname} style={{ width: `${task.width|| 200}px`}}  />
                    </div>
                  
         
                {/* : "" */}
            {/* } */}
        </div>
    )
}

export default FormInput
