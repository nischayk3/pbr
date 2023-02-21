import "./SelectFieldStyle.scss";
import React from "react";
import { Select } from "antd";

const SelectField = (props) => {

	function capitalizeFirstLetter(string) {
		if (typeof(string) !== 'number') {
			return string?.charAt(0)?.toUpperCase() + string?.slice(1)?.replace("_" , '');	
		}
		return string;
	  }
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
