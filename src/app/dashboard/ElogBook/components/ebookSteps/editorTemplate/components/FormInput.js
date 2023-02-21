import { Input } from 'antd';
import React from 'react';

function FormInput({ task, layout }) {
	return (
		<div>
			<div>
				<label>{task.label}</label>
				<Input type={task.datatype} name={task.technicalname} style={{ width: `${task.width || 200}px` }} />
			</div>
		</div>
	)
}

export default FormInput
