import { Button, Input } from 'antd';
import React from 'react';
import './forms.scss';

function CheckboxForm({ layout, current, checkboxData, setCheckboxData, setLayout }) {
	const handleSave = () => {
		const templayout = JSON.parse(JSON.stringify(layout));
		templayout.forEach(row => {
			row.children.forEach((col) => {
				col.children.forEach((component) => {
					if (component.id === checkboxData.id) {
						component.textlabel = checkboxData.textlabel;
						component.defaultvalue = checkboxData.defaultvalue;

					}
				})
			})
		});
		setLayout(templayout)
	}
	return (
		<div>
			{current === "1" ?
				<form className='textform'>
					<div className='textfields'>
						<label className='textlabels'>Text label</label>
						<Input type="text" name="textlabel" value={checkboxData.textlabel} onChange={(e) => setCheckboxData({ ...checkboxData, textlabel: e.target.value })} />
					</div>
					<Button onClick={handleSave}>Save changes</Button>
				</form> : ""
			}
		</div>
	)
}

export default CheckboxForm
