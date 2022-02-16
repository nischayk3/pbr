import React from "react";
import { Select } from 'antd';
import './SelectFieldStyle.scss'


const SelectField = (props) => {

    return (
        <div className="select_field">
            <p>{props.label}</p>

            <Select
                placeholder={props.placeholder}
                value={props.selectedValue}
                onChange={props.onChangeSelect}
                style={{ width: '100%', margin: '0px' }}
            >
                {/* {props.selectList.map(item => (
                    <Select.Option key={item} value={item}>
                        {item}
                    </Select.Option>
                ))} */}
            </Select>
        </div>
    )
}

export default SelectField