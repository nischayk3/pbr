import React, { useState } from 'react';
import { Input, Select, Button } from 'antd';
import './forms.scss'

function InputForm({ layout, current, inputData, setInputData,setLayout }) {
  
    const handleSave =() => {
       const templayout = JSON.parse(JSON.stringify(layout));
       templayout.forEach(row => {
        row.children.forEach((col) => {
            col.children.forEach((component) => {
                if(component.id === inputData.id){
                        component.technicalname= inputData.technicalname;
                        component.datatype=inputData.datatype;
                        component.label=inputData.label;
                        component.tooltip= inputData.tooltip;
                        component.width= inputData.width
                  
                }
            })
        } )
       });
       setLayout(templayout)
    }
    return (

        <div>
            {current === "1" ?
                <form className='textform'>
                    <div className='textfields'>
                        <label className='textlabels'>Technical name</label>
                        <Input type="text" name="technicalname" value={inputData.technicalname} onChange={(e) => setInputData({...inputData, technicalname: e.target.value})} />
                    </div>
                    <div className='textfields'>
                        <label className='textlabels'>Data type</label> <br/>
                        <Select name="datatype" style={{ width: "100%"}} value={inputData.datatype} onChange={(e) => setInputData({...inputData, datatype: e})}
                            options={[
                                {
                                    value: 'text',
                                    label: 'text',
                                },
                                {
                                    value: 'number',
                                    label: 'number',
                                }
                            ]}
                        />
                    </div>
                    <div className='textfields'>
                        <label className='textlabels'>Label</label>
                        <Input type="text" name="label" value={inputData.label} onChange={(e) => setInputData({...inputData, label: e.target.value})} />
                    </div>
                    <div className='textfields'>
                        <label className='textlabels'>Tooltip</label>
                        <Input type="text" name="tooltip" value={inputData.tooltip} onChange={(e) => setInputData({...inputData, tooltip: e.target.value})} />
                    </div>
                    <div className='textfields'>
                        <label className='textlabels'>width</label>
                        <Input type="text" name="width" value={inputData.width} onChange={(e) => setInputData({...inputData, width: e.target.value})} />
                    </div>
                    <Button className={"custom-primary-btn"} type="primary" onClick={handleSave}>Save changes</Button>
                </form> : ""
            }
        </div>
    )
}

export default InputForm
