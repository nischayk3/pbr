import React from 'react';
import { Form, Input, Popconfirm, Switch } from 'antd';
import { DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import './styles.scss';

function ReportDesignerDynamicRow(props) {
	const { fieldKey } = props;

	const isEditableHandler = (prev, current, name, fieldKey) => {
		let res = prev['response'];
		let dynamic_rows = res[fieldKey] ? res[fieldKey] : [];
		let dynamic_rows_row = dynamic_rows['dymamic_rows']
			? dynamic_rows['dymamic_rows']
			: [];
		let value = dynamic_rows_row[name] ? dynamic_rows_row[name] : [];

		let res_curr = current['response'];
		let dynamic_rows_curr = res_curr[fieldKey] ? res[fieldKey] : [];
		let dynamic_rows_row_curr = dynamic_rows_curr['dymamic_rows']
			? dynamic_rows['dymamic_rows']
			: [];
		let value_curr = dynamic_rows_row_curr[name] ? dynamic_rows_row[name] : [];
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
							<td >
                                <Form.Item
                                    {...restField1}
                                    shouldUpdate={(prevValues, currentValues) => isEditableHandler(prevValues, currentValues, name, fieldKey)
                                    }
                                >
                                    {({ getFieldValue }) => {
                                        let res = getFieldValue('response')
                                        let dynamic_rows = res[fieldKey] ? res[fieldKey] : []
                                        let dynamic_rows_row = dynamic_rows['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
                                        let value = dynamic_rows_row[name] ? dynamic_rows_row[name] : []
                                        
                                        return (
                                            <Form.Item name={[name, 'keyName']}>
                                                <Input.TextArea className="report-designer__row-input" allowClear autoSize={true} style={{ width: '150px' }} placeholder="Enter Key" name={[name, 'keyName']} disabled={value['editable'] === false} />
                                            </Form.Item>
                                        )
                                    }}
                                </Form.Item>
                            </td>
                            <td >
                                <Form.Item
                                    {...restField1}
                                    shouldUpdate={(prevValues, currentValues) => isEditableHandler(prevValues, currentValues, name, fieldKey)
                                    }
                                >
                                    {({ getFieldValue }) => {
                                        let res = getFieldValue('response')
                                        let dynamic_rows = res[fieldKey] ? res[fieldKey] : []
                                        let dynamic_rows_row = dynamic_rows['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
                                        let value = dynamic_rows_row[name] ? dynamic_rows_row[name] : []

                                        return (
                                            <Form.Item name={[name, 'value']} >
                                                <Input.TextArea className="report-designer__row-input" bordered allowClear autoSize={true} placeholder="Enter Value" name={[name, 'value']} disabled={value['editable'] === false} />
                                            </Form.Item>
                                        )
                                    }}
                                </Form.Item>
                            </td>

                            <td >
                                <Form.Item {...restField1} name={[name, 'editable']} valuePropName="checked">
                                    <Switch defaultChecked={true} size="small" disabled={props.show} />
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
