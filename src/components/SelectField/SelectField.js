import "./SelectFieldStyle.scss";
import React from "react";
import { Select } from "antd";

const SelectField = (props) => {
  return (
    <div className="select_field">
      {props.label ||
        (props.iconlabel && (
          <p>
            {props.label} {props.iconlabel}
          </p>
        ))}

      <Select
        placeholder={props.placeholder}
        value={props.selectedValue}
        onChange={props.onChangeSelect}
        style={{ width: "100%", margin: "0px" }}
        allowClear={props.allowClear}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
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

export default SelectField;
