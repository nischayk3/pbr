import './SelectSearchField.scss';

import React from 'react';
import { Select } from 'antd';

const SelectSearchField = (props) => {
  return (
    <div className='select_field_search'>
      <p>
        {props.label} {props.iconlabel}
      </p>

      <Select
        showSearch={props.showSearch}
        placeholder={props.placeholder}
        value={props.selectedValue}
        onChange={props.onChangeSelect}
        style={{ width: '100%', margin: '0px' }}
      >
        {props.selectList &&
          props.selectList.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
      </Select>
    </div>
  );
};

export default SelectSearchField;
