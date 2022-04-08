/**
 * @author Fahad Siddiqui <fahad.siddiqui@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 05 April, 2022
 * @Last Changed By - Fahad
 */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Drawer,Popover,Menu,Collapse,Input,Space} from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import { faqData } from '../../services/helpService';
import './style.scss';

const { Panel } = Collapse;
const { Search } = Input;

const jsondata =  [
  {
    "questions":"How to upload a file?",
    "answer":"To upload file in click on upload file option and choose file."
  },
  {
    "questions":"How to upload a file?",
    "answer":"To upload file in click on upload file option and choose file."
  },
  {
    "questions":"How to upload a file?",
    "answer":"To upload file in click on upload file option and choose file."
  },
  {
    "questions":"How to upload a file?",
    "answer":"To upload file in click on upload file option and choose file."
  },
  {
    "questions":"How to upload a file?",
    "answer":"To upload file in click on upload file option and choose file."
  }
]

const Help = () => {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([]);
    const location = useLocation();
    const history = useHistory();

    const getScreenData = async (search)=>{
        const screen = location.pathname.split('/');
        let params ={
            screens:screen.length > 0?[screen[2]]:"",
            search:search
        }
        try{
            const res = await faqData(params)
            setData(res.Data);
        }catch(error){
            setData({});
            console.log(error)
        }
    }

    useEffect(()=>{
        if(visible){
            getScreenData("")
        }
    },[visible])
    const showDrawers = ()=>{ 
        setVisible(true)  
    }

    const onClose =()=>{
        setVisible(false); 
    }
  
    const onSearch = (value)=>{
        getScreenData(value)
      
    }
  
  return (
    <>
        <Popover className='help-popover' overlayClassName= "custom_style" placement="leftTop"  content={
                <>
                    <div className="help_item" ><a onClick={showDrawers}>Help support</a></div>
                    <div className="feedback_item" ><a onClick={showDrawers}>Feedback</a></div>
                </>
                
                
            } >
                < QuestionCircleFilled  className="hepIcon" />
        </Popover>

          <Drawer
            title=""
            placement="right"
            width={500}
            onClose={onClose}
            visible={visible}
        extra={
          <Space>
            <a href='/#/dashboard/faq' target="_blank">Main FAQ Page </a>
          </Space>
        }
      >
        <Search
            placeholder="Search"
              allowClear
              enterButton="Search"
              size="large"
            onSearch={onSearch}
        />

            { data && Object.keys(data).map((value,index)=>{
                            return(
                                <>
                                {data[value].length > 0 &&  <Collapse className='panel-text-style' >
                                    {data[value].map((val,i)=>{
                                        return(
                                        <>
                                            <Panel header={val.question} key={i+1}>
                                                <p>{val.answer}</p>
                                            </Panel>
                                        </> 
                                        )
                                    })}
                                 </Collapse>}

                                </>
                        )
                    }
                    )}
        {/* <Collapse className='panel-text-style'>
            {data.length > 0 && data.map((value,index)=>{
            return(
                <>
                    <Panel header={value.questions} key={index+1}>
                        <p>{value.answer}</p>
                    </Panel>
                </>
            )
            }
            )}
        </Collapse> */}
        
        
        
      </Drawer>
        
    </>
  );
};

export default Help;
