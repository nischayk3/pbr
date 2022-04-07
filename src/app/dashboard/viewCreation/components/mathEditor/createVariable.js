import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const CreateVariable = (props) => {
  return (
    <div className='add-var_block' onClick={props.addVariable}>
      {props.title === 'Create Variable' && (
        <>
          <PlusOutlined />
          <p>Create Variable</p>
        </>
      )}
      {props.title === 'Select parameters' && (
        <>
          <PlusOutlined />
          <p>Select parameters</p>
        </>
      )}
      {props.title === 'Done' && (
        <Button
          type='text'
          onClick={props.createVariable}
          className='custom-primary-btn '
        >
          Done
        </Button>
      )}
    </div>
  );
};

export default CreateVariable;
