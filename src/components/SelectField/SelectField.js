import { Select } from "antd";
import React from "react";
import "./SelectFieldStyle.scss";

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
				id={props.id}
				value={props.selectedValue}
				onChange={props.onChangeSelect}
				style={{ width: "100%", margin: "0px" }}
				allowClear={props.allowClear}
				disabled={props.disabled}
				defaultValue={props.defaultValue}
				showSearch={props.showSearch}
			>
				{props.selectList &&
					props.selectList.map((item) => (
						<Select.Option key={item} value={item}  {...(props.menu && { onContextMenu: props.handleClick })}>
							{item}
						</Select.Option>
					))}
			</Select>
		</div>
	);
};

export default SelectField;
