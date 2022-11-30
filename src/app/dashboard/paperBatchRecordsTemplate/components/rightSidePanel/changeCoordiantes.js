import {
	CaretDownOutlined
} from '@ant-design/icons';
import {
	Collapse,
	Form
} from 'antd';
import React from 'react';
import InputField from '../../../../../components/InputField/InputField';
const { Panel } = Collapse;
/* istanbul ignore next */
function ChangeCoordiantes(props) {
	let { areasMapObject, params, clickedSnippetId, onChangeChart } = props
	return (
		<Collapse
			accordion
			expandIconPosition='right'
			defaultActiveKey={['1']}>
			<Panel header='Snippet Attributes' key='1'>
				<div className='snippetsBlock'>
					<Form
						layout='vertical'
						// form={form}
						className='formNewTemplate'>
						<InputField
							disabled
							value={areasMapObject.snippetID}
							label='Snippet ID'
							placeholder='Snippet ID'
						/>
						<InputField
							value={areasMapObject.areaValue}
							label='Key 1'
							placeholder='Key 1'
							disabled
						/>
						<div className='secondary-flexBox'>
							<InputField
								id="cord1"
								value={areasMapObject.coords[0]}
								label='X1'
								placeholder='Enter Value'
								onChangeInput={e => {
									onChangeChart(e, 'x1');
								}}
							/>
							<InputField
								id="cord2"
								value={areasMapObject.coords[1]}
								label='Y1'
								placeholder='Enter Value'
								onChangeInput={e => {
									onChangeChart(e, 'y1');
								}}
							/>
						</div>
						<div className='secondary-flexBox'>
							<InputField
								id="cord3"
								value={areasMapObject.coords[2]}
								label='X2'
								placeholder='Enter Value'
								onChangeInput={e => {
									onChangeChart(e, 'x2');
								}}
							/>
							<InputField
								id="cord4"
								value={areasMapObject.coords[3]}
								label='Y2'
								placeholder='Enter Value'
								onChangeInput={e => {
									onChangeChart(e, 'y2');
								}}
							/>
						</div>
						<div className='secondary-flexBox'>
							<InputField
								value={areasMapObject.areaValue}
								label='Area'
								placeholder='Enter Value'
								disabled
							/>
						</div>
						<div className='hierarchyBlock'>
							<p>Hierarchy</p>
							<div className='hierarchyDiv hierarchyDiv1'>
								<CaretDownOutlined />
								{params?.tempalteName}
							</div>
							<div className='hierarchyDiv hierarchyDiv2'>
								<CaretDownOutlined />
								0001-6.0
							</div>
							<div className='hierarchyDiv hierarchyDiv3'>
								<CaretDownOutlined />1
							</div>
							<div className='hierarchyDiv hierarchyDiv4'>
								<CaretDownOutlined />
								{clickedSnippetId ? clickedSnippetId : "Document"}
							</div>
						</div>
					</Form>
				</div>
			</Panel>
		</Collapse>
	)
}

export default ChangeCoordiantes