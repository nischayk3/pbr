import { CloseOutlined } from '@ant-design/icons';
import { Button, Select, Spin } from 'antd';
import React from 'react';
import './SelectSearchField.scss';
const SelectSearchField = props => {
	return (
		<div className='select_field_search'>
			<p>
				{props.label} {props.iconlabel}
			</p>
			<div className='search-block'>
				<Select
					id={props.id}
					disabled={props.disabled}
					mode={props.mode}
					showSearch={props.showSearch}
					placeholder={props.placeholder}
					value={props.selectedValue}
					onChange={props.onChangeSelect}
					onSearch={props.onSearchSelect}
					loading={props.loading}
					notFoundContent={props.loading ? <Spin size="small" /> : null}
					style={{ width: '100%', margin: '0px' }}>
					{props.options}
				</Select>
				{props.selectedValue !== '' ? (
					<Button onClick={props.handleClearSearch} className='close-search'>
						<CloseOutlined />
					</Button>
				) : (
					<></>
				)}
			</div>
			<p className='field-error'>{props.error}</p>
		</div>
	);
};

export default SelectSearchField;
