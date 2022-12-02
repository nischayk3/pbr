import React,{ useState } from 'react';
import { Empty, Button  } from 'antd';
import Add from "../../../../../../assets/editornew/add.png";
import Arrow from "../../../../../../assets/editornew/arrow.png";
import './editoeNew.scss';
import { set } from 'lodash';


function EditorNew({sendDataToParent}) {
    const [state, setState] = useState(false)

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

       <Empty description={false} />
       <div className="button-layouts">
						<Button
							className="custom-secondary-btn"
							type="primary"
							// onClick={(e) => handleNext(e)}
						>
                            <img src={Arrow} alt="upload" className='img' />
							Import a form
						</Button>
						<Button
							className="pbbutton custom-secondary-btn"
							type="primary"
							onClick={ handleNext}
						>
                            <img src={Add} alt="create" className='img' />
							Create new form
						</Button>
					</div>
    </div>
   
</div>
  )
}

export default EditorNew
