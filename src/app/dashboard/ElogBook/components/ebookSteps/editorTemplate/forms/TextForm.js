import React from 'react'
import { Input,Button,Radio } from 'antd';
import './forms.scss'

function TextForm({layout, current, textData, setTextData,setLayout}) {
  const handleSave =() => {
    const templayout = JSON.parse(JSON.stringify(layout));
    templayout.forEach(row => {
     row.children.forEach((col) => {
         col.children.forEach((component) => {
             if(component.id === textData.id){
                     component.textlabel= textData.textlabel;
                     component.fontSize=textData.fontSize;
                     component.fontWeight=textData.fontWeight;
  
             }
         })
     } )
    });
    setLayout(templayout)
 }
  return (
    <div>
{current === "1" ?
        <form className='textform' key={textData.id}>
            <div className='textfields'>
            <label className='textlabels'>Content</label>
            <Input type="text" name="textlabel" value={textData.textlabel} onChange={(e) => setTextData({...textData, textlabel: e.target.value})} />
            </div>
            <div className='textfields'>
            <label className='textlabels'>Font size</label>
            <Input type="number" name="fontSize" value={textData.fontSize} onChange={(e) => setTextData({...textData, fontSize: e.target.value})} />
            </div>
            <div className='textfields'>
            <label className='textlabels'>Font weight</label>
            <Input type="number" name="fontWeight"  value={textData.fontWeight} onChange={(e) => setTextData({...textData, fontWeight: e.target.value})} />
            </div>
            <div className='textfields'>
            {/* <label className='textlabels'>Font weight</label> */}
            <Radio checked={textData.mandatory} onChange={(e) => setTextData({...textData, mandatory: e.target.checked})}> Mandatory</Radio>
            </div>
           
            <Button className='textlabels' onClick={handleSave}>Save changes</Button>
        </form> : ""
}
    </div>
  )
}

export default TextForm
