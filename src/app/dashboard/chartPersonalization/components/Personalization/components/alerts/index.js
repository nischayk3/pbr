// Fahad Siddiqui
// Mareana Software
// Version 1
// Last modified - 03 March, 2022
import React, { useState, useEffect } from 'react';
import '../Personalization.scss';
import './style.scss';
import { Card, Collapse, Form, Button, Input, Space, Popconfirm, Select, Checkbox, Tag,message } from 'antd';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';

import InputField from './InputField/InputField';
import InputView from './InputComponent/inputComponent';

const Alerts = (props) => {

  const [type, setType] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userEmailArray, setUserEmailArray] = useState([]);
  let scheduleData = ['Hourly', 'Weekly', 'Daily'];
  let typeData = ['Control Limits', 'Rule', 'Threshold'];
  const checkboxOptions = ['Control', 'Specification', 'Warning']
  const options_schedule = scheduleData.map((item, i) => (
    <Option key={i} value={item}>
      {item}
    </Option>
  ));

  const options_type = typeData.map((item, i) => (
    <Option key={i} value={item}>
      {item}
    </Option>
  ));

  const handleChange = (value) => {
    let typeValue = value ? value : ''
    setType(typeValue);
  }

  const hanldeCheckboxChange = (value) => {

  }
  const handleUserChange = (e) => {
    setUserEmail(e.target.value);

  }
  const handleUserClick = () => {
    let data = [...userEmailArray];
    data.push(userEmail);
    setUserEmailArray(data);
  }

  const handleDelete = () => {
    props.deleteAlert(props.data);
  }
  const handleTitle = () => {
    return (
      <div>
        <InputField
          placeholder='Enter Alert Name'
        />
        <span><DeleteOutlined style={{ color: 'red', marginLeft: '55px' }} onClick={() => handleDelete()} /></span>
      </div>
    )

    }
  
  const cancel=(e) =>{
    message.error('Click on No');
  }
  
  return (
    
    <Card title={<div>Alert Name1
      <Popconfirm
        title="Are you sure to delete this task?"
        onConfirm={handleDelete}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
      <DeleteOutlined style={{ color: 'red', marginLeft: '55px' }}  />
      </Popconfirm>
    </div>}
      className='alert-main'
      bordered>
      <div className='alert-comp'>
        <InputField
          label='Users'
          placeholder='Enter Mail Id'
          type='email'
          onChangeInput={(e) => handleUserChange(e)}
          suffix={<PlusSquareOutlined onClick={() => handleUserClick()} />}
        />
        {userEmailArray.map((item, i) => {
          return (
            <Tag closable onClose={() => {}} key={i}>
              {item}
            </Tag>
          )


        })}

        <InputView
          label='Schedule'
          placeholder='Select Schedule'
          option={options_schedule}
        />
        <InputView
          label='Type'
          placeholder='Select Type'
          option={options_type}
          selectedValue={type}
          onChangeSelect={(e) => handleChange(e)}
        />
      </div>


      <div className='alert-types'>
        {type === 'Control Limits' && (
          <div>
            <p>Condition</p>
            <Checkbox.Group options={checkboxOptions} defaultValue={['Control', 'Specification']} onChange={hanldeCheckboxChange} />
          </div>
        )}

        {type === 'Rule' && (
          <InputView
            label='Condition'
            placeholder='Select Condition'
          //  option={options_type}
          //  selectedValue={type}
          //  onChangeSelect={(e)=>handleChange(e)}
          />
        )}

        {type === 'Threshold' && (
          <div className='threshold'>
            <InputView
              label='Condition'
              placeholder='Select Parameter'
            />
            <InputView
              placeholder='Select Method'
            />
            <InputField
              placeholder='Enter Number'
              type='text'
            />

          </div>
        )}
      </div>

    </Card>


  )
}

export default Alerts;