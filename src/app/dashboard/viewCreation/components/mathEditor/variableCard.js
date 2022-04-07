import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const VariableCard = (props) => {
  return (
    <div className='var_block_card'>
      <p>{props.variableName}</p>
      <div className='var-btn'>
        <Button>
          <EditOutlined className='edit' />
        </Button>
        <Button>
          <DeleteOutlined className='delete' />
        </Button>
      </div>
    </div>
  );
};

export default VariableCard;
