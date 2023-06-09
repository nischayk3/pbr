import React, { useState,useEffect } from 'react'
import { Button, Modal } from 'antd';
import AbsoluteCoordinate from './absoluteCoordinate';
import AbsoluteDistance from './absoluteDistance';
import KeyValue from './keyValue'
import RelativeDistance from './relativeDistance';
import SelectionMethod from './selection_method';
function AdvanceSetting(props) {
    let { advancePopup, setAdvancePopup,method,formValues,setFormValues,name,imageHeight,imageWidth,pageNumber } = props
    const [mainMethod, setMainMethod] = useState('');

    useEffect(() => {
        setMainMethod(methodSelection())
    }, [advancePopup])

    const methodSelection  = () => {
        if (method === undefined || method === ''){
            return <div>Select Method</div>
        }else if(method === "absolute_coordinate"){
            return <AbsoluteCoordinate method={method} formValues={formValues} setFormValues={setFormValues} advancePopup={advancePopup} name={name} setAdvancePopup={setAdvancePopup}/>
        }
        else if(method === "absolute_distance"){
            return <AbsoluteDistance method={method} formValues={formValues} setFormValues={setFormValues} name={name} advancePopup={advancePopup} setAdvancePopup={setAdvancePopup}/>
        }
        else if(method === "key_value_form"){
            return <KeyValue method={method} formValues={formValues} setFormValues={setFormValues} name={name} advancePopup={advancePopup} setAdvancePopup={setAdvancePopup}/>
        }else if(method === "relative_direction"){
            return <RelativeDistance method={method} formValues={formValues} setFormValues={setFormValues} name={name} advancePopup={advancePopup} setAdvancePopup={setAdvancePopup} />
        }
        else if(method === "selection_method"){
            return <SelectionMethod pageNumber={pageNumber} method={method} formValues={formValues} setFormValues={setFormValues} name={name} advancePopup={advancePopup} setAdvancePopup={setAdvancePopup}  imageHeight={imageHeight} imageWidth={imageWidth} />
        }else{
            return <div>Coming Soon....</div>
        }
    }
    
    return (
        <div>
            <Modal footer={null} title={method?.split('_').join(' ')} visible={advancePopup} onCancel={() => setAdvancePopup(false)}>
                {mainMethod}
            </Modal>
        </div>
    )
}

export default AdvanceSetting