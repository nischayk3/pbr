import React, { useState } from 'react';
import { Button, Form, Input, Popconfirm, Switch } from 'antd';
import {
    PlusSquareTwoTone,
    UnlockOutlined,
    LockOutlined,
    DeleteTwoTone
} from '@ant-design/icons';
import './styles.scss';

function ReportDesignerDynamicRow(props) {
    const { fieldKey } = props;

    const isEditableHandler = (prev, current, name, fieldKey) => {
        // console.log(prev,current,name,fieldKey)
        let res = prev['response']
        let dynamic_rows = res[fieldKey] ? res[fieldKey] : []
        let dynamic_rows_row = dynamic_rows['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
        let value = dynamic_rows_row[name] ? dynamic_rows_row[name] : []

        let res_curr = current['response']
        let dynamic_rows_curr = res_curr[fieldKey] ? res[fieldKey] : []
        let dynamic_rows_row_curr = dynamic_rows_curr['dymamic_rows'] ? dynamic_rows['dymamic_rows'] : []
        let value_curr = dynamic_rows_row_curr[name] ? dynamic_rows_row[name] : []
        // console.log(value_curr ? value_curr : false,value_curr)
        return value_curr ? value_curr : false

    }

    return (
        <Form.List name={[fieldKey, 'dymamic_rows']}>
            {(rows, { add, remove }) => (
                <>
                    {rows.map(({ key, name, ...restField1 }) => (
                        <tr
                            className="dynamicSections-spaceRows"
                            key={key} >
                            <td><Form.Item>
                                <PlusSquareTwoTone onClick={() => add()} />
                            </Form.Item></td>
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

                                        // console.log(value)

                                        return value['editable'] === true ? (
                                            <Form.Item name={[name, 'keyName']} >
                                                <Input placeholder="Enter Key" name={[name, 'keyName']} disabled />
                                            </Form.Item>
                                        ) : (
                                            <Form.Item name={[name, 'keyName']} >
                                                <Input placeholder="Enter Key" style={{ backgroundColor: '#baeaff' }} bordered={true} />
                                            </Form.Item>
                                        )
                                    }}
                                </Form.Item>
                                {/* <Form.Item {...restField1} name={[name, 'keyName']}>
                                    <Input placeholder="Enter key" />
                                </Form.Item> */}
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

                                        // console.log(value)

                                        return value['editable'] === true ? (
                                            <Form.Item name={[name, 'value']} >
                                                <Input placeholder="Enter Value" name={[name, 'value']} disabled />
                                            </Form.Item>
                                        ) : (
                                            <Form.Item name={[name, 'value']} >
                                                <Input placeholder="Enter Value" style={{ backgroundColor: '#baeaff' }} bordered={true} />
                                            </Form.Item>
                                        )
                                    }}
                                </Form.Item>
                                {/* <Form.Item {...restField1} name={[name, 'value']}>
                                    <Input placeholder="Enter Value" />
                                </Form.Item> */}
                            </td>
                            <td >
                                <Popconfirm title="Are you Sure you want to delete?" onConfirm={() => remove(name)}>
                                    <DeleteTwoTone twoToneColor="red" />
                                </Popconfirm>
                            </td>
                            <td >
                                <Form.Item {...restField1} name={[name, 'editable']} valuePropName="checked" defaultChecked>
                                    <Switch defaultChecked={false} />
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

                                        // console.log(value)

                                        return value['editable'] === true ? (
                                            <LockOutlined style={{ backgroundColor: '#BAE7FF' }} />
                                        ) : (
                                            <UnlockOutlined style={{ backgroundColor: '#E0E0E0' }} />
                                        )
                                    }}
                                </Form.Item>
                            </td>
                        </tr>
                    ))}
                    <Form.Item>
                        <PlusSquareTwoTone  onClick={() => add()} />
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
}

export default ReportDesignerDynamicRow;
