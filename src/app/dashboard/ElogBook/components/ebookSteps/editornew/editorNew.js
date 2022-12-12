import React,{ useState } from 'react';
import { Empty, Button  } from 'antd';
import Createvector from "../../../../../../assets/editornew/Createvector.png";
import Importvector from "../../../../../../assets/editornew/Importvector.png";
import Emptyimage from "../../../../../../assets/editornew/Image.png";
import './editoeNew.scss';
import { set } from 'lodash';
import ImportForm from '../importForms/importForm';


function EditorNew({sendDataToParent}) {
    const [state, setState] = useState(false)
    const [isTemplateModal, setIsTemplateModal] = useState(false);

    const handleNext =(e) => {
        e.preventDefault()
          setState(true);
          sendDataToParent(state)
    }
  return (
    <div>
    {/* <div className="flex-container">
        
       
    </div> */}
    <div className='editor-part'>
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
                                setIsTemplateModal(true)
                            }}
						>
                            <img src={Importvector} alt="upload" className='img' />
							Import a form
						</Button>
						<Button
							className="pbbutton custom-secondary-btn"
							type="primary"
							onClick={ handleNext}
                            size="large"
						>
                            <img src={Createvector} alt="create" className='img' />
							Create new form
						</Button>
					</div>
                    <ImportForm isTemplateModal={isTemplateModal} />
    </div>
   
</div>
  )
}

export default EditorNew
