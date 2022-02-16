import React from "react";
import { Input } from 'antd';
import './InputFieldStyle.scss';

const InputField = (props) => {

    return (
        <div className="input_field">
            <p>{props.label}</p>
            <Input placeholder={props.placeholder} value={props.value} onChange={props.onChangeInput} />

        </div>
    )
}

export default InputField