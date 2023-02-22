import { Button, Input } from 'antd';
import React from 'react';
import './forms.scss';

function LineForm({ current, lineData, setLineData, layout, setLayout }) {
	const handleSave = () => {
		const templayout = JSON.parse(JSON.stringify(layout));
		templayout.forEach(row => {
			row.children.forEach((col) => {
				col.children.forEach((component) => {
					if (component.id === lineData.id) {
						component.lineAlign = lineData.lineAlign;
						component.width = lineData.width

					}
				})
			})
		});
		setLayout(templayout)
	}
	return (
		<div>
			<form className='textform'>
				<div className='textfields'>
					<label className='textlabels'>width</label>
					<Input type="number" name="width" value={lineData.width} onChange={(e) => setLineData({ ...lineData, width: e.target.value })} />
				</div>
				<Button onClick={handleSave} className={"custom-primary-btn"} type="primary">Save changes</Button>
			</form>
		</div>
	)
}

export default LineForm
