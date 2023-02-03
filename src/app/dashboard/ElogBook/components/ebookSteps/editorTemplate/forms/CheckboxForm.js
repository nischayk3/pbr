import React from 'react'
import { Input, Select, Button } from 'antd'
import './forms.scss'

function CheckboxForm({ layout, current, checkboxData, setCheckboxData,setLayout }) {
    const handleSave =() => {
        const templayout = JSON.parse(JSON.stringify(layout));
        templayout.forEach(row => {
         row.children.forEach((col) => {
             col.children.forEach((component) => {
                 if(component.id === checkboxData.id){
                         component.textlabel= checkboxData.textlabel;
                         component.defaultvalue= checkboxData.defaultvalue;
                   
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
                <label  className='textlabels'>Text label</label>
                <Input type="text" name="textlabel" value={checkboxData.textlabel} onChange={(e) => setCheckboxData({...checkboxData, textlabel: e.target.value})} />
                </div>
                {/* <div className='textfields'>
                        <label  className='textlabels'>Default value</label>
                        <Select name="defaultvalue" style={{ width: "100%"}}  value={checkboxData.defaultvalue} onChange={(e) => setCheckboxData({...checkboxData, defaultvalue: e})}
                            options={[
                                {
                                    value: 'true',
                                    label: 'true',
                                },
                                {
                                    value: 'false',
                                    label: 'false',
                                }
                            ]}
                        />
                    </div> */}
                <Button onClick={handleSave}>Save changes</Button>
            </form> : ""
    }
        </div>
  )
}

export default CheckboxForm
