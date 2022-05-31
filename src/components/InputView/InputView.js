import React from "react";
import { Button, Select } from "antd";
import { SearchOutlined, BlockOutlined } from "@ant-design/icons";
import "./InputViewStyle.scss";

const InputView = (props) => {
  return (
    <div className="input_field_view">
      <p>{props.label}</p>
      <div className="input_view">
        <Select
          placeholder={props.placeholder}
          value={props.selectedValue}
          onChange={props.onChangeSelect}
          style={{ width: "100%", margin: "0px" }}
          prefix={
            <SearchOutlined style={{ fontSize: "16px", color: "#D7D7D7" }} />
          }
        >
          {props.option}
        </Select>
        <Button
          className="popup-btn"
          icon={<BlockOutlined style={{ fontSize: "16px" }} />}
          onClick={props.onClickPopup}
        />
      </div>
    </div>
  );
};

export default InputView;
