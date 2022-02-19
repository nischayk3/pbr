import React from 'react';
import { Form, Input, Popconfirm} from 'antd';
import {
    PlusOutlined,
    UnlockOutlined,
    DeleteTwoTone
} from '@ant-design/icons';
import './styles.scss';

function ReportDesignerDynamicRow(props) {
    const { fieldKey } = props;

    return (
        <Form.List name={[fieldKey, 'dymamic-rows']}>
            {(rows, { add, remove }) => (
                <>
                    {rows.map(({ key, name, ...restField1 }) => (
                        <tr
                            className="dynamicSections-spaceRows"
                            key={key}   >        
                            <td>
                                <Form.Item {...restField1} name={[name, 'keyName']}>
                                    <Input placeholder="Enter key" />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item {...restField1} name={[name, 'value']}>
                                    <Input placeholder="Enter Value" />
                                </Form.Item>
                            </td>
                            <td>
                                <Popconfirm title="Are you Sure you want to delete?" onConfirm={() => remove(name)}>
                                    <DeleteTwoTone />
                                </Popconfirm>
                            </td>
                            <td>
                                <UnlockOutlined />
                            </td>
                        </tr>
                    ))}
                    <Form.Item>
                        <PlusOutlined onClick={() => add()} />
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
}

export default ReportDesignerDynamicRow;
