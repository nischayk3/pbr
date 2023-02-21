import { Divider } from 'antd';
import React from 'react';

function FormLine({ task }) {
	return (
		<div style={{ width: `${task.width}px`, alignItems: task.lineAlign }}>
			<Divider style={{ color: "#000000" }} />
		</div>
	)
}

export default FormLine
