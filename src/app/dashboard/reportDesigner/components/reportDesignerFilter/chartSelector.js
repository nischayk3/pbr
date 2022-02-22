import React, { useState } from 'react';
import {
    Card,
    Select,
    Typography,
    Form,
    Space,
    Popconfirm
} from 'antd';
import { PlusSquareTwoTone, DeleteTwoTone } from '@ant-design/icons';
import './styles.scss';

const { Option } = Select;
const { Text } = Typography;


function ChartSelector() {
    const [form] = Form.useForm();
    const [data, setData] = useState({})

    const handleValuesChange = (changedValues, values) => {
        setData(values)
    };

    console.log(data)
    return (
        <div>
            <Card className="chartid-main" title="Chart">
                <Form name="dynamic_form_nest_item" autoComplete="off" form={form} onValuesChange={handleValuesChange}>
                    <Form.List name="chart_id">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'chart']}
                                        >
                                            <Select placeholder="Select Chart">
                                                <Option value="1">1</Option>
                                                <Option value="2">2</Option>
                                            </Select>
                                        </Form.Item>
                                        <Popconfirm title="Are you Sure you want to delete?" onConfirm={() => remove(name)}>
                                            <DeleteTwoTone twoToneColor="red" />
                                        </Popconfirm>
                                        <PlusSquareTwoTone style={{ marginLeft: '200px' }} onClick={() => add()} twoToneColor="#093185" />
                                        <b><u style={{ marginLeft: '10px' }} onClick={() => add()} >Add New Chart</u> </b>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <PlusSquareTwoTone onClick={() => add()} twoToneColor="#093185" />
                                    <b><u style={{ marginLeft: '10px' }} onClick={() => add()}>Add New Chart</u> </b>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Card>
        </div>
    );
}

export default ChartSelector;
