// Fahad Siddiqui
// Mareana Software
// Version 1
// Last modified - 03 March, 2022
import '../Personalization.scss';
import './style.scss';
import { Button, Card, Collapse ,Table,Popconfirm,DatePicker,Input} from 'antd';
import React, { Component, useState,useEffect } from 'react';
import {
  DeleteTwoTone
} from '@ant-design/icons';

import InputField from '../../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../../components/SelectField/SelectField';



const columns = [
    {
      title: 'LL',
      dataIndex: 'LL',
      key: 'LL',
      width: '18%',
      render:(text, record) =>
      <Input defaultValue={text} type="text"/>
     
    },
    {
      title: 'UL',
      dataIndex: 'UL',
      key: 'UL',
      width: '18%',
      render:(text, record) =>
        <Input defaultValue={text} type="text"/>
    },
    {
      title: 'Valid Until   ',
      dataIndex: 'validuntill',
      key: 'validuntill',
      render: (text, row, index) => <a><DatePicker suffixIcon={null}/></a>,
    },
    
  ];

const  ControLimits = (props)=>{
    const[controlSource,setControlSource]= useState([])
    const [specificationSource, setSpecificationSource] = useState([])
    const [warningSource, setWarningSource] = useState([])
    const [controlColumns, setControlColumns] = useState([])
    const [specificationColumns, setSpecificationColumn] = useState([])
    const [warningColumns, setWarningColumns] = useState([])
    


    useEffect(()=>{

      ['controlLimit','specification','warning'].map((val)=>{
          let column = [...columns]

          let actionColumn = {
            title: 'action',
            dataIndex: 'action',
            width: '8%',
            render: (_, record) =>
              
             
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(val,record.key)}>
                  <DeleteTwoTone twoToneColor="red" />
                </Popconfirm>
          }
          if(val == 'controlLimit'){
            setControlColumns([...column, actionColumn])
          }else if(val == 'specification'){
              setSpecificationColumn([...column, actionColumn])
          }else{
            setWarningColumns([...column,actionColumn])
          }
      });
      },[]);

    
    const handleAdd = (table_id)=>{
      let source ;
      if(table_id == 'controlLitmit'){
        source = [...controlSource]
      }else if(table_id == 'specification'){
        source = [...specificationSource]
      }else{
        source = [...warningSource]
      }
       
      const newData = {
        key: source.length + 1,
        LL:'1',
        UL: '2',
        validuntill: '',
      };
      if(table_id == 'controlLitmit'){
       setControlSource([...source, newData])
      }else if(table_id == 'specification'){
        setSpecificationSource([...source,newData])
      }else{
        setWarningSource([...source,newData])
      }
     
    }

    const handleDelete = (table_id,key) => {
      
      console.log("=========",controlSource)
      console.log(key)
      if(table_id == 'controlLimit'){
        let source = [...controlSource]
        console.log("===============control",[...source].filter((item) => item.key !== key))
        
        setControlSource([...source].filter((item) => item.key !== key));
      }else if(table_id == 'specification'){
        setSpecificationSource([...specificationSource].filter((item) => item.key !== key));
      }else{
        setWarningSource([...warningSource].filter((item) => item.key !== key));
      }
      
     
    };


  
 


  
    return (
      <>
      <div className='controlLimit'>
        
      <div style={{marginBottom:'15px'}}>
          <Table 
          bordered
          title={()=>{
            return (
              <>
                <span>{'Control Limit'}</span>
                <Button onClick={()=>handleAdd('controlLitmit')} className='add-row-btn' type="primary">Add Row</Button>
              </>
              )
            }
          }
          pagination={false}
          dataSource={controlSource} 
          columns={controlColumns}
         />
      
        </div>




        <div style={{marginBottom:'15px'}}>
          <Table 
          bordered
          title={()=>{
            return (
              <>
        <span>{'Specification'}</span>
        <Button onClick={()=>handleAdd('specification')} className='add-row-btn' type="primary">Add Row</Button>
      </>
            )
          }
          }
          pagination={false}
          dataSource={specificationSource} 
          columns={specificationColumns}
         />
      
        </div>



        <div style={{marginBottom:'15px'}}>
          <Table 
          bordered
          title={()=>{
            return (
              <>
        <span>{'Warning'}</span>
        <Button onClick={()=>handleAdd('warning')} className='add-row-btn' type="primary">Add Row</Button>
      </>
            )
          }
          }
          pagination={false}
          dataSource={warningSource} 
          columns={warningColumns}
         />
      
        </div>

      
         </div>
        
      </>
    );
    
  }


export default ControLimits;
