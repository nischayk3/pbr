import React, { useState } from 'react';
import { Row, Col, Button, Form, Input, Popconfirm, Table, Typography } from 'antd';
const { Title } = Typography;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const LogTable = ({ sendDataToParent }) => {
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const [dataSource, setDataSource] = useState([
        {
            key: 0,
            Subject: 'English',
            MaxMarks: '32',
            MinMarks: '20',
            ObtMarks: '10'
        },
        {
            key: 1,
            Subject: 'English',
            MaxMarks: '32',
            MinMarks: '20',
            ObtMarks: '10'
        },
    ]);
    const [count, setCount] = useState(2);
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    const defaultColumns = [
        {
            title: 'Subject',
            dataIndex: 'Subject',
            width: '20%',
            editable: true,
        },
        {
            title: 'Max Marks',
            dataIndex: 'MaxMarks',
            width: '20%',
            editable: true,
        },
        {
            title: 'Min Marks',
            dataIndex: 'MinMarks',
            width: '20%',
            editable: true,
        },
        {
            title: 'Obt. Marks',
            dataIndex: 'ObtMarks',
            width: '20%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleAdd = () => {
        const newData = {
            key: count,
            Subject: '',
            MaxMarks: '',
            MinMarks: '',
            ObtMarks: '',
            width: '30%',
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const edit = (record) => {
        form.setFieldsValue({
            Subject: '',
            MaxMarks: '',
            MinMarks: '',
            ObtMarks: '',
            record: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    console.log(editingKey);
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...dataSource];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setDataSource(newData);
                sendDataToParent(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setDataSource(newData);
                sendDataToParent(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const components = {
        body: {
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            }),
        };
    });
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    console.log(dataSource);

    return (
        <div>
            <Row>
                <Col span={8} align="start">
                    <Title level={5}>Grid Title</Title>
                </Col>
                <Col span={8} offset={8} align="end">
                    <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        Add a row
                    </Button>
                </Col>
            </Row>
            <Form form={form} component={false}>
                <Table
                    components={components}
                    rowSelection={rowSelection}
                    rowClassName="editable-row"
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </Form>
        </div>
    );
};
export default LogTable;