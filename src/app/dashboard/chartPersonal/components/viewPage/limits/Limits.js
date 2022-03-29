import React, { useState } from 'react';
import './limitsStyles.scss';
//antd imports
import { Button, Card, Collapse, Table, Popconfirm, DatePicker, Input } from 'antd';
import {
    DeleteTwoTone,
    PlusOutlined
} from '@ant-design/icons';


//main component
const Limits = () => {
    //states for table data
    const [controlSource, setControlSource] = useState([]);
    const [specificationSource, setSpecificationSource] = useState([]);
    const [warningSource, setWarningSource] = useState([]);
    const [controlColumns, setControlColumns] = useState({ ll: '', ul: '', date: '' });
    const [specifyColumns, setSpecifyColumns] = useState({ ll: '', ul: '', date: '' });
    const [warningColumns, setWarningColumns] = useState({ ll: '', ul: '', date: '' });
    const [count, setCount] = useState(1);
    const [specCount, setSpecCount] = useState(1);
    const [warningCount, setWarningCount] = useState(1);

    //function to change control limit input values
    const handleChange = (event, record) => {
        const { name, value } = event.target;
        setControlColumns((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        const data = [...controlSource]
        data.forEach((ele) => {
            if (ele.key === record.key) {
                if (name === 'ul') {
                    ele.ul = value
                }
                if (name === 'll') {
                    ele.ll = value
                }
            }
        })
        setControlSource([...data]);
    };
    // function for change of control input date value
    const handleDateChange = (dateString, record) => {
        setControlColumns((prevState) => {
            return {
                ...prevState,
                date: dateString
            }
        })
        const data = [...controlSource]
        data.forEach((ele) => {
            if (ele.key === record.key) {
                ele.date = (dateString._d).toLocaleDateString()
            }
        })
        setControlSource([...data]);
    }

    //function to change specification limit input values
    const handleSpecChange = (event, record) => {
        const { name, value } = event.target;
        setSpecifyColumns((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        const data = [...specificationSource]
        data.forEach((ele) => {
            if (ele.key === record.key) {
                if (name === 'ul') {
                    ele.ul = value
                }
                if (name === 'll') {
                    ele.ll = value
                }
            }
        })
        setSpecificationSource([...data]);
    };

    // function for change of specification input date value
    const handleSpecifyDateChange = (dateString, record) => {
        setSpecifyColumns((prevState) => {
            return {
                ...prevState,
                date: dateString
            }
        })
        const data = [...specificationSource]
        data.forEach((ele) => {
            if (ele.key === record.key) {
                ele.date = (dateString._d).toLocaleDateString()
            }
        })
        setSpecificationSource([...data]);
    }

    // function for change of warn input date value
    const handleWarnDateChange = (dateString, record) => {
        setWarningColumns((prevState) => {
            return {
                ...prevState,
                date: dateString
            }
        })
        const data = [...warningSource]
        data.forEach((ele) => {
            if (ele.key === record.key) {
                ele.date = (dateString._d).toLocaleDateString()
            }
        })
        setWarningSource([...data]);
    }

    // function for change of warn input values
    const handleWarnChange = (event, record) => {
        const { name, value } = event.target;
        setWarningColumns((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
        const data = [...warningSource]
        data.forEach((ele) => {
            if (ele.key === record.key) {
                if (name === 'ul') {
                    ele.ul = value
                }
                if (name === 'll') {
                    ele.ll = value
                }
            }
        })
        setWarningSource([...data]);
    };

    //columns array for control table
    const columns = [
        {
            title: 'Action',
            dataIndex: 'action',
            width: '100',
            render: (_, record) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <DeleteTwoTone twoToneColor="red" />
                </Popconfirm>
        },
        {
            title: 'Lower Limit',
            dataIndex: 'Lower Limit',
            key: 'Lower Limit',
            width: '100',
            render: (text, record) =>
                <Input type="text" name='ll' value={controlColumns.ll} onChange={(e) => handleChange(e, record)} />
        },
        {
            title: 'Upper Limit',
            dataIndex: 'UL',
            key: 'UL',
            width: '100',
            render: (text, record) =>
                <Input type="text" name='ul' value={controlColumns.ul} onChange={(e) => handleChange(e, record)} />
        },
        {
            title: 'Valid Until   ',
            dataIndex: 'validuntill',
            key: 'validuntill',
            render: (text, row, index) => <a><DatePicker suffixIcon={null} name='date' value={controlColumns.date} onChange={(dateString) => handleDateChange(dateString, row)} /></a>,
        },
    ];

    //columns array for specs table
    const specColumns = [
        {
            title: 'Action',
            dataIndex: 'action',
            width: '100',
            render: (_, record) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleSpecifyDelete(record.key)}>
                    <DeleteTwoTone twoToneColor="red" />
                </Popconfirm>
        },
        {
            title: 'Lower Limit',
            dataIndex: 'Lower Limit',
            key: 'Lower Limit',
            width: '100',
            render: (text, record) =>
                <Input type="text" name='ll' value={specifyColumns.ll} onChange={(e) => handleSpecChange(e, record)} />
        },
        {
            title: 'Upper Limit',
            dataIndex: 'UL',
            key: 'UL',
            width: '100',
            render: (text, record) =>
                <Input type="text" name='ul' value={specifyColumns.ul} onChange={(e) => handleSpecChange(e, record)} />
        },
        {
            title: 'Valid Until   ',
            dataIndex: 'validuntill',
            key: 'validuntill',
            render: (text, row, index) => <a><DatePicker suffixIcon={null} name='date' value={specifyColumns.date} onChange={(dateString) => handleSpecifyDateChange(dateString, row)} /></a>,
        }
    ];

    //columns array for warn table
    const warnColumns = [
        {
            title: 'Action',
            dataIndex: 'action',
            width: '100',
            render: (_, record) =>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleWarningDelete(record.key)}>
                    <DeleteTwoTone twoToneColor="red" />
                </Popconfirm>
        },
        {
            title: 'Lower Limit',
            dataIndex: 'Lower Limit',
            key: 'Lower Limit',
            width: '100',
            render: (text, record) =>
                <Input type="text" name='ll' value={warningColumns.ll} onChange={(e) => handleWarnChange(e, record)} />
        },
        {
            title: 'Upper Limit',
            dataIndex: 'UL',
            key: 'UL',
            width: '100',
            render: (text, record) =>
                <Input type="text" name='ul' value={warningColumns.ul} onChange={(e) => handleWarnChange(e, record)} />
        },
        {
            title: 'Valid Until   ',
            dataIndex: 'validuntill',
            key: 'validuntill',
            width: '100',
            render: (text, row, index) => <a><DatePicker suffixIcon={null} name='date' value={warningColumns.date} onChange={(dateString) => handleWarnDateChange(dateString, row)} /></a>,
        }
    ];

    const handleAdd = () => {
        const newData = {
            key: count,
        };
        setControlSource([...controlSource, newData]);
        setCount(count + 1);
    }

    const handleSpecAdd = () => {
        const newData = {
            key: specCount,
        };

        setSpecificationSource([...specificationSource, newData]);
        setSpecCount(specCount + 1);
    }

    const handleWarnAdd = () => {
        const newData = {
            key: warningCount,
        };
        setWarningSource([...warningSource, newData]);
        setWarningCount(warningCount + 1);
    }

    const handleDelete = (key) => {
        const dataSource = [...controlSource]
        setControlSource(dataSource.filter((item) => item.key !== key));
    };

    const handleSpecifyDelete = (key) => {
        const dataSource = [...specificationSource]
        setSpecificationSource(dataSource.filter((item) => item.key !== key));
    };

    const handleWarningDelete = (key) => {
        const dataSource = [...warningSource]
        setWarningSource(dataSource.filter((item) => item.key !== key));
    };

    return (
        <div className="limit-container">
            <div className='controlLimit'>
                <div className='table-bottom'>
                    <p>Control limit</p>
                    <Table
                        pagination={false}
                        dataSource={controlSource}
                        columns={columns}
                    />
                    <Button onClick={() => handleAdd()}><PlusOutlined />Add new row</Button>
                </div>
                <div className='table-bottom'>
                    <p>Specification</p>
                    <Table
                        pagination={false}
                        dataSource={specificationSource}
                        columns={specColumns}
                    />
                    <Button onClick={() => handleSpecAdd()}><PlusOutlined />Add new row</Button>
                </div>
                <div className='table-bottom'>
                    <p>Warning</p>
                    <Table
                        pagination={false}
                        dataSource={warningSource}
                        columns={warnColumns}
                    />
                    <Button onClick={() => handleWarnAdd()}><PlusOutlined />Add new row</Button>
                </div>
            </div>

        </div>
    );

}


export default Limits;
