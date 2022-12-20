import { Button, Steps } from 'antd';
import React, { useState, useEffect } from 'react';
import Createvector from "../../../../../../assets/editornew/Createvector.png";
import Emptyimage from "../../../../../../assets/editornew/Image.png";
import Importvector from "../../../../../../assets/editornew/Importvector.png";
import ImportForm from '../importForms/importForm';
import './editoeNew.scss';
const { Step } = Steps;

function EditorNew({ Sdata }) {
    const [state, setState] = useState(false)
    const [isTemplateModal, setIsTemplateModal] = useState(false);
    const [current, setCurrent] = useState(1);
    const [data, setData] = useState('')

    const handleNext = (e) => {
        e.preventDefault()
        setState(true);
        // sendDataToParent(state)
    }
    const sendDataToParent = (index) => { // callback
        
		Sdata(index)
		
	};
    const handleCreate = () =>{

    }
    // useEffect(() => {
    //     // setIsTemplateModal(false)
    // },[isTemplateModal])
    return (
        <div>
            <div className='editor-part'>
            <div className="metadata-subheader ">
                <div className="title-layout">
                    <p>Design form</p>
                </div>
                <div className="stepper-layout">
                    <Steps
                        size="small"
                        current={0}
                    >
                        <Step key={0} title="Design form" />
                        <Step key={1} title="Script editor" />

                    </Steps>
                    <div>


                        {current === 0 && (
                            <div>

                            </div>

                        )}

                        {current < 1 && (
                            <div style={{ textAlign: "center" }}>
                                
                            </div>
                        )}
                    </div>
                </div>
                <div className="button-layout">
                <Button
                    className={"custom-secondary-btn"}
                    type="primary"
                    onClick={(e) => handleNext(e)}
                    disabled
                >
                    Save form
                </Button>
                <Button
                    className={"pbbutton custom-secondary-btn"}
                    type="primary"
                    onClick={(e) => handleNext(e)}
                    disabled
                >
                    Publish form
                </Button>
            </div>


           
            </div>
            
                <div className="empty-box">
                    {/* <Empty description={false} imageStyle={{ size:"large"}} className="empty-box" /> */}
                    <img src={Emptyimage} alt="Emptyimage" className='emty-img' />
                </div>
                <div className="button-layouts">
                    <Button
                        className="custom-secondary-btn"
                        type="primary"
                        size="large"
                        onClick={(e) => {
                            setIsTemplateModal(!isTemplateModal)
                        }}
                    >
                        <img src={Importvector} alt="upload" className='img' />
                        Import a form
                    </Button>
                    <Button
                        className="pbbutton custom-secondary-btn"
                        type="primary"
                        onClick={handleCreate}
                        size="large"
                    >
                        <img src={Createvector} alt="create" className='img' />
                        Create new form
                    </Button>
                </div>
                <ImportForm isTemplateModal={isTemplateModal} sendDataToParent={sendDataToParent} />
            </div>
        </div>
    )
}

export default EditorNew
