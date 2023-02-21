import { Radio } from 'antd';
import React from 'react';

function FormRadio({ task }) {
	return (
		<div>
			<Radio.Group name="radiogroup" defaultValue={1}>
				{task?.fieldData?.map((i) =>
					<Radio key={i.id}>
						{i.value || `Enter a value ${i.id}`}
					</Radio>
				)}
			</Radio.Group>
		</div>
	)
}

export default FormRadio
