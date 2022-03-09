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




  

const  ControLimits = (props)=>{
    const[controlSource,setControlSource]= useState([]);
    const [controlColumns, setControlColumns] = useState([]);
    const [count, setCount] = useState(0);
    
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
      {
        title: 'action',
        dataIndex: 'action',
        width: '8%',
        render: (_, record) =>
          
         
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <DeleteTwoTone twoToneColor="red" />
            </Popconfirm>
      }
      
    ];

    


    const handleAdd = ()=>{
       
      const newData = {
        key: count,
        LL:'1',
        UL: '2',
        validuntill: ''
      };
      
       setControlSource([...controlSource, newData]);
       setCount(count+1);
    
    }

    const handleDelete = (key) => {
        const dataSource = [...controlSource]
        setControlSource(dataSource.filter((item) => item.key !== key));
     
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
        <Button onClick={()=>handleAdd()} className='add-row-btn' type="primary">Add Row</Button>
      </>
            )
          }
          }
          pagination={false}
          dataSource={controlSource} 
          columns={columns}
         />
        </div>
         </div>
        
      </>
    );
    
  }


export default ControLimits;
