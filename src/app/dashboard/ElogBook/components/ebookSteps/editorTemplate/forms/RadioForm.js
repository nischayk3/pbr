import React,{ useState } from 'react';
import { Input, Button } from 'antd';
import './forms.scss'

function RadioForm({current,radioData,setRadioData,layout,setLayout}) {
    const [numFields,setnumFields] = useState('');
    const [idCheked,setIdCheked] = useState({textlabel:''});
    const [dynamiclyData, setDynamiclyData] = useState( [
        // { id: 1, value: "Enter value1" },
       
      ]);
    const handleSave =() => {
        const templayout = JSON.parse(JSON.stringify(layout));
        templayout.forEach(row => {
         row.children.forEach((col) => {
             col.children.forEach((component) => {
                 if(component.id === radioData.id){
                         component.textlabel= radioData.textlabel;
                         component.fieldData = radioData.fieldData;
                       
      
                 }
             })
         } )
        });
        setLayout(templayout)
     }
    const handleFields = (e) => {
        e.preventDefault();
        let tempData = []
        for(let i=0; i < Number(numFields); i++){
            tempData.push({id: tempData.length+1, value:`Enter value${tempData.length+1}`})
        }
        setDynamiclyData(tempData)
        
    }

    const handleRadioData = (e,i) => {
         let dynamiclyData_data = [...dynamiclyData]
         const fdata = dynamiclyData_data.findIndex((j) => j.id == i.id)

 dynamiclyData[fdata].value = e.target.value
         setIdCheked({...idCheked, textlabel: e.target.value})
         setRadioData({...radioData, fieldData: dynamiclyData})
    }
  return (
    <div>
    {current === "1" ?
            <form className='textform'>
                  <div className='textfields'>
                <label className='textlabels'>Enter number field</label>
                <Input type="number" name="fieldLength" value={numFields} onChange={(e) => setnumFields( e.target.value)} />
                </div>
                <Button className='textlabels' onClick={handleFields}>Add fields</Button>
                <div className='radiolabels'>
                {dynamiclyData.map((i) => 
                <div className='textfields' key={i.id}>
                   
                <label className='textlabels'>{`Content${i.id}`}</label>
                <Input type="text" name="textlabel" value={i.value} onChange={(e) => handleRadioData(e,i)} />
                </div> 
                )}
              {dynamiclyData.length > 0 ? <Button className='textlabels' onClick={handleSave}>Save</Button> : ''}
              </div>
            </form> : ""
    }
        </div>
  )
}

export default RadioForm
