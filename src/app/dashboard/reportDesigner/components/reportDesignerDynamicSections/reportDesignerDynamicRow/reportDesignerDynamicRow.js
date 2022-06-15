import React from 'react';
import { Form, Input, Popconfirm, Switch } from 'antd';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import './styles.scss';

function ReportDesignerDynamicRow(props) {
	const { fieldKey } = props;

	const isEditableHandler = (_prev, _current, _name, _fieldKeys) => {
		let value_curr = [];
		return value_curr ? value_curr : false;
	};

	return (
		<Form.List name={[fieldKey, 'dymamic_rows']}>
			{(rows, { add, remove }) => (
				<>
					{rows.map(({ key, name, ...restField1 }) => (
						<tr key={key}>
							<td>
								<Popconfirm
									title='Are you Sure you want to delete?'
									onConfirm={() => remove(name)}
									disabled={props.show}>
									<DeleteTwoTone
										twoToneColor='red'
										style={{ fontSize: '18px', paddingRight: '20px' }}
										disabled={props.show}
									/>
								</Popconfirm>
							</td>
							<td>
								<Form.Item
									{...restField1}
									shouldUpdate={(prevValues, currentValues) =>
										isEditableHandler(prevValues, currentValues, name, fieldKey)
									}>
									{({ getFieldValue }) => {
										let res = getFieldValue('response');
										let dynamic_rows = res[fieldKey] ? res[fieldKey] : [];
										let dynamic_rows_row = dynamic_rows['dymamic_rows']
											? dynamic_rows['dymamic_rows']
											: [];
										let value = dynamic_rows_row[name]
											? dynamic_rows_row[name]
											: [];

										return value['editable'] === true ? (
											<Form.Item name={[name, 'keyName']}>
												<Input.TextArea
													allowClear
													className="report-designer__row-input"
													autoSize={true}
													style={{ width: '150px' }}
													placeholder='Enter key'
													name={[name, 'keyName']}
													disabled
												/>
											</Form.Item>
										) : (
											<Form.Item name={[name, 'keyName']}>
												<Input.TextArea
													bordered
													className="report-designer__row-input"
													allowClear
													autoSize={true}
													style={{ width: '150px' }}
													placeholder='Enter key'
													disabled={props.show}
												/>
											</Form.Item>
										);
									}}
								</Form.Item>
							</td>
							<td>
								<Form.Item
									{...restField1}
									shouldUpdate={(prevValues, currentValues) =>
										isEditableHandler(prevValues, currentValues, name, fieldKey)
									}>
									{({ getFieldValue }) => {
										let res = getFieldValue('response');
										let dynamic_rows = res[fieldKey] ? res[fieldKey] : [];
										let dynamic_rows_row = dynamic_rows['dymamic_rows']
											? dynamic_rows['dymamic_rows']
											: [];
										let value = dynamic_rows_row[name]
											? dynamic_rows_row[name]
											: [];

										return value['editable'] === true ? (
											<Form.Item name={[name, 'value']}>
												<Input.TextArea
													bordered
													className="report-designer__row-input"
													allowClear
													autoSize={true}
													placeholder='Enter value'
													name={[name, 'value']}
													disabled
												/>
											</Form.Item>
										) : (
											<Form.Item name={[name, 'value']}>
												<Input.TextArea
													bordered
													className="report-designer__row-input"
													allowClear
													autoSize={true}
													placeholder='Enter value'
													disabled={props.show}
												/>
											</Form.Item>
										);
									}}
								</Form.Item>
							</td>

							<td>
								<Form.Item
									{...restField1}
									name={[name, 'editable']}
									valuePropName='checked'
									defaultChecked>
									<Switch
										defaultChecked={false}
										size='small'
										disabled={props.show}
									/>
								</Form.Item>
							</td>
						</tr>
					))}
					<tr>
						<td></td>
						<td></td>
						<td>
							<Form.Item>
								<div className='add-row-btn' onClick={() => add()}>
									{' '}
									<PlusOutlined
										style={{
											color: '#093185',
											marginRight: '5px',
										}}
									/>{' '}
									Add new row{' '}
								</div>
							</Form.Item>
						</td>
					</tr>
				</>
			)}
		</Form.List>
	);
}

export default ReportDesignerDynamicRow;
