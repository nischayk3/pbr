import React, { useState, useEffect } from 'react';
import './designTable.scss';
import { Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import InputField from '../../../../../../components/InputField/InputField';


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

const DesignTable = () => {

    const [form] = Form.useForm();

    const [editingKey, setEditingKey] = useState('');
    console.log(editingKey);
    const isEditing = (record) =>
        record.key === editingKey;

    const isRowEditing = (record) => record === editingKey;


    const [datas, setDatas] = useState([]);
    const [formData, setFormData] = useState({ rows: '', columns: '' });
    const [rowheader, setRowheader] = useState({ title: '', dataIndex: '', key: '', editable: '' });
    const [rrr, setrrr] = useState([{ title: '' }])
    const [columns, setCol] = useState([]);




    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < formData.rows; i++) {
            rows.push({ title: '', dataIndex: i, key: i + 1, editable: true })
            //   rows.push(...roo)
            setrrr(rows)
            setrow([...rows, ...roo])


        }


        for (let j = 0; j < formData.columns; j++) {
            columns.unshift(Object.assign({ "key": j + 1 }, rows.map(i => i.title)));
            setCol([...columns])

        }


        datas.push({ rows, columns })


    };

    const save = async (key, arrayIndex, record) => {

        console.log(key, record, datas, columns);
        try {
            const row = await form.validateFields();
            datas.map((i) => {
                const index = i.columns.findIndex((item) => key === item.key);
                if (index + 1 > -1) {
                    const item = i.columns[index];
                    i.columns.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    setCol(i.columns)
                    setEditingKey('');

                } else {
                    i.columns.push(row);
                    setCol(i.columns);
                    setEditingKey('');
                }
            })
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }

    };
    console.log(columns);

    const rowedit = (record) => {
        setEdu(false)
        setEduu(true)
        console.log(record);
        record.map((i) => {
            for (const [key, val] of Object.entries(i)) {

                form.setFieldsValue({

                    [Number(key)]: '',
                    title: '',
                    record: '',
                    ...record,
                });

            }
        })

        setEditingKey(record);
    }
    const edit = (record) => {
        console.log(record);
        for (const [key, val] of Object.entries(record)) {
            form.setFieldsValue({

                [Number(key)]: '',
                record: '',
                ...record,
            });
            setEdu(true)
            setEduu(false)
        }
        setEditingKey(record.key);

    };
    const cancel = () => {
        setEditingKey('');
    };

    const [edu, setEdu] = useState(true);
    const [eduu, setEduu] = useState(false);
    const [rows, setrow] = useState([])

    const [roo, setRoo] = useState([
        {
            title: "operation",
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                setEdu(edu)
                return edu ? (
                    <span>
                        <ul><li>
                            <div>
                                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    Edit
                                </Typography.Link>
                            </div>
                        </li>
                            <li>
                                {datas.map((i, index) =>
                                    <Typography.Link
                                        onClick={() => save(record.key, index, record)}
                                        style={{
                                            marginRight: 8,
                                        }}
                                    >
                                        Save
                                    </Typography.Link>
                                )}

                                {/* <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm> */}
                            </li></ul>
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
            render: (index, record) =>

                datas.length >= 1 && (
                    datas.map((i, index) =>
                        <div key={index}>
                            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key, index)}>
                                <a>Delete</a>
                            </Popconfirm>
                        </div>
                    )
                )
        },
    ])

    const handleDelete = (key, index) => {
        datas[index].columns = datas[index].columns.filter((i) => i.key !== key)
        setDatas([...datas])
    };

    const handleRow = (e, index) => {
        const { name, value } = e.target;
        const list = [...rrr]
        list[index]['title'] = value;
        setrrr(list)
    }
    const handleRowSubmit = (e) => {
        e.preventDefault();
        setrow([...rrr, ...roo])
    }
    console.log(rows);
    return (
        <div className="custom-wrapper">
            <div className="custom-content-layout">
                <div className="form-wrap">
                    <div className="left-panel">
                        {datas.map((i) =>

                            <div>


                                <Form form={form} component={false}>
                                    <Table
                                        components={{
                                            body: {
                                                cell: EditableCell,
                                            },
                                        }}
                                        bordered
                                        dataSource={[...i.columns]}
                                        columns={rows.map((col) => {
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

                                                })
                                            };
                                        })}

                                        rowClassName="editable-row"
                                        pagination={{
                                            onChange: cancel,
                                        }}
                                    />
                                </Form>
                            </div>
                        )
                        }

                    </div>

                    <div className="right-panel">
                        <form onSubmit={handleSubmit}>
                            <div className='form-field'>
                                <InputField
                                    label="Enter Columns"
                                    name="rows"
                                    type="number"
                                    value={formData.rows}
                                    onChangeInput={(e) =>
                                        setFormData({ ...formData, rows: e.target.value })
                                    }
                                />
                            </div>
                            <div className='form-field'>
                                <InputField
                                    label="Enter Rows"
                                    name="columns"
                                    type="number"
                                    value={formData.columns}
                                    onChangeInput={(e) =>
                                        setFormData({ ...formData, columns: e.target.value })
                                    }
                                />
                            </div>
                            <div className='form-field'>
                                <Button className="custom-secondary-btn" type="default" onClick={handleSubmit}>Create Table</Button>
                            </div>
                        </form>
                        {datas.map((i) =>

                            <form onSubmit={handleRowSubmit}>
                                {rrr.map((i, index) =>
                                    <div key={i.key}>
                                        <label>Enter Header{i.key}</label>
                                        <InputField
                                            name="title"
                                            type="text"
                                            value={rrr.title}
                                            onChangeInput={(e) =>
                                                handleRow(e, index)
                                            }
                                        />
                                    </div>
                                )
                                }

                                <div>
                                    <Button className="custom-secondary-btn" type="default" onClick={handleRowSubmit}>Update title</Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

            </div>
        </div>



    );
};
export default DesignTable;