import React from 'react';

import { Input, Button } from 'antd';
import PopupIcon from '../../assets/popup_open.png';
import './InputViewStyle.scss';

const InputView = (props) => {
  return (
    <div className='input_field_view'>
      <p>{props.label}</p>
      <div className='input_view'>
        <Input
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChangeInput}
          disabled={props.disabled}
          onClick={props.onChangeClick}
        />
        <Button onClick={props.onClickPopup}>
          <img src={PopupIcon} />
        </Button>
      </div>
    </div>
  );
};

export default InputView;
