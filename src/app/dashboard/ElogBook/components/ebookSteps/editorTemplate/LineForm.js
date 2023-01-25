import React from 'react';
import { Input, Button, Select } from 'antd';

function LineForm({ current, lineData, setLineData, layout, setLayout}) {
    const handleSave =() => {
        const templayout = JSON.parse(JSON.stringify(layout));
        templayout.forEach(row => {
         row.children.forEach((col) => {
             col.children.forEach((component) => {
                 if(component.id === lineData.id){
                         component.lineAlign= lineData.lineAlign;
                         component.width= lineData.width
                   
                 }
             })
         } )
        });
        setLayout(templayout)
     //    console.log(templayout);
     }
     console.log(lineData);
  return (
    <div>
    {/* {current === "1" ? */}
        <form className='textform'>
            {/* <div className='textfields'>
                <label className='textlabels'>Technical name</label>
                <Input type="text" name="technicalname" value={inputData.technicalname} onChange={(e) => setInputData({...inputData, technicalname: e.target.value})} />
            </div> */}
            {/* <div className='textfields'>
                <label className='textlabels'>Align</label> <br/>
                <Select name="lineAlign" style={{ width: "100%"}} value={lineData.lineAlign} onChange={(e) => setLineData({...lineData, lineAlign: e})}
                    options={[
                        {
                            value: 'start',
                            label: 'start',
                        },
                        {
                            value: 'center',
                            label: 'center',
                        },
                        {
                            value: 'end',
                            label: 'end',
                        }
                    ]}
                />
            </div> */}
            <div className='textfields'>
                <label className='textlabels'>width</label>
                <Input type="number" name="width" value={lineData.width} onChange={(e) => setLineData({...lineData, width: e.target.value})} />
            </div>
            <Button onClick={handleSave}>Save changes</Button>
        </form> 
        {/* : "" */}
    {/* } */}
</div>
  )
}

export default LineForm
