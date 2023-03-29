import React, { useState,useEffect } from 'react'
import { Button, Modal } from 'antd';
import AbsoluteCoordinate from './absoluteCoordinate';
import AbsoluteDistance from './absoluteDistance';
function AdvanceSetting(props) {
    let { advancePopup, setAdvancePopup,method,formValues,setFormValues,name } = props
    const [mainMethod, setMainMethod] = useState('');

    useEffect(() => {
        setMainMethod(method)
    }, [])

    const methodSelection  = () => {
        if (method === undefined || method === ''){
            return <div>Select Method</div>
        }else if(method === "absolute_coordinate"){
            return <AbsoluteCoordinate method={method} formValues={formValues} setFormValues={setFormValues} name={name} setAdvancePopup={setAdvancePopup}/>
        }
        else if(method === "absolute_distance"){
            return <AbsoluteDistance method={method} formValues={formValues} setFormValues={setFormValues} name={name} advancePopup={advancePopup} setAdvancePopup={setAdvancePopup}/>
        }else{
            return <div>Coming Soon....</div>
        }
    }
    return (
        <div>
            <Modal footer={null} title={method?.split('_').join(' ')} visible={advancePopup} onCancel={() => setAdvancePopup(false)}>
                {methodSelection()}
            </Modal>
        </div>
    )
}

export default AdvanceSetting