import React, { useState } from 'react';
import './limitsStyles.scss';
//antd imports
import { Button, Card, Collapse, Table, Popconfirm, DatePicker, Input } from 'antd';
import {
    DeleteTwoTone,
    PlusOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import { postChartPlotData } from '../../../../../../services/chartPersonalizationService';
import { showLoader, hideLoader } from '../../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';

//main component
const Limits = ({ postChartData, setPostChartData }) => {
    const dispatch = useDispatch();
    //states for table data
    const [controlSource, setControlSource] = useState([]);
    const [specificationSource, setSpecificationSource] = useState([]);
    const [warningSource, setWarningSource] = useState([]);
    const [count, setCount] = useState(1);
    const [specCount, setSpecCount] = useState(1);
    const [warningCount, setWarningCount] = useState(1);

    //function to change control limit input values
    const handleChange = (index, event, dateString) => {
        if (dateString) {
            const rowsInput = [...controlSource];
            rowsInput[index]['valid_timestamp'] = (dateString._d).toLocaleDateString();
        } else {
            const { name, value } = event.target
            const rowsInput = [...controlSource];
            rowsInput[index][name] = value;
            setControlSource(rowsInput);
        }
    };

    //function to change specification limit input values
    const handleSpecChange = (index, event, dateString) => {
        if (dateString) {
            const rowsInput = [...specificationSource];
            rowsInput[index]['valid_timestamp'] = (dateString._d).toLocaleDateString();
        } else {
            const { name, value } = event.target
            const rowsInput = [...specificationSource];
            rowsInput[index][name] = value;
            setSpecificationSource(rowsInput);
        }
    };

    // function for change of warn input values
    const handleWarnChange = (index, event, dateString) => {
        if (dateString) {
            const rowsInput = [...warningSource];
            rowsInput[index]['valid_timestamp'] = (dateString._d).toLocaleDateString();
        } else {
            const { name, value } = event.target
            const rowsInput = [...warningSource];
            rowsInput[index][name] = value;
            setWarningSource(rowsInput);
        }
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
                controlSource.map((data, index) => {
                    if (record.key === data.key) {
                        return (
                            <Input type="text" name='lower' value={data.lower} onChange={(e) => handleChange(index, e)} />
                        )
                    }
                })
        },
        {
            title: 'Upper Limit',
            dataIndex: 'UL',
            key: 'UL',
            width: '100',
            render: (text, record) =>
                controlSource.map((data, index) => {
                    if (record.key === data.key) {
                        return (
                            <Input type="text" name='upper' value={data.upper} onChange={(e) => handleChange(index, e)} />
                        )
                    }
                })
        },
        {
            title: 'Valid Until   ',
            dataIndex: 'validuntill',
            key: 'validuntill',
            render: (text, record) =>
                controlSource.map((data, index) => {
                    if (record.key === data.key) {
                        return (
                            <DatePicker type="text" name='valid_timestamp' onChange={(dateString) => handleChange(index, '', dateString)} />
                        )
                    }
                })
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
                specificationSource.map((data, index) => {
                    if (record.key === data.key) {
                        return (
                            <Input type="text" name='lower' value={data.lower} onChange={(e) => handleSpecChange(index, e)} />
                        )
                    }
                })
        },
        {
            title: 'Upper Limit',
            dataIndex: 'UL',
            key: 'UL',
            width: '100',
            render: (text, record) =>
                specificationSource.map((data, index) => {
                    if (record.key === data.key) {
                        return (
                            <Input type="text" name='upper' value={data.upper} onChange={(e) => handleSpecChange(index, e)} />
                        )
                    }
                })
        },
        {
            title: 'Valid Until   ',
            dataIndex: 'validuntill',
            key: 'validuntill',
            render: (text, record) =>
                specificationSource.map((data, index) => {
                    console.log(record, 'rec')
                    if (record.key === data.key) {
                        return (
                            <DatePicker type="text" name='valid_timestamp' onChange={(dateString) => handleChange(index, '', dateString)} />
                        )
                    }
                })
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
                warningSource.map((data, index) => {
                    if (record.key === data.key) {
                        return (
                            <Input type="text" name='lower' value={data.lower} onChange={(e) => handleWarnChange(index, e)} />
                        )
                    }
                })
        },
        {
            title: 'Upper Limit',
            dataIndex: 'UL',
            key: 'UL',
            width: '100',
            render: (text, record) =>
                warningSource.map((data, index) => {
                    if (record.key === data.key) {
                        return (
                            <Input type="text" name='upper' value={data.upper} onChange={(e) => handleWarnChange(index, e)} />
                        )
                    }
                })
        },
        {
            title: 'Valid Until   ',
            dataIndex: 'validuntill',
            key: 'validuntill',
            width: '100',
            render: (text, record) =>
                warningSource.map((data, index) => {
                    if (record.key === data.key) {
                        return (
                            <DatePicker type="text" name='valid_timestamp' onChange={(dateString) => handleWarnChange(index, '', dateString)} />
                        )
                    }
                })
        }
    ];

    const handleAdd = () => {
        const newData = {
            key: count,
            upper: '',
            lower: '',
            valid_timestamp: '',
        };
        setControlSource([...controlSource, newData]);
        setCount(count + 1);
    }
    const handleSpecAdd = () => {
        const newData = {
            key: specCount,
            upper: '',
            lower: '',
            valid_timestamp: '',
        };

        setSpecificationSource([...specificationSource, newData]);
        setSpecCount(specCount + 1);
    }

    const handleWarnAdd = () => {
        const newData = {
            key: warningCount,
            upper: '',
            lower: '',
            valid_timestamp: '',
        };
        setWarningSource([...warningSource, newData]);
        setWarningCount(warningCount + 1);
    }

    const handleDelete = (key) => {
        const dataSource = [...controlSource]
        setControlSource(dataSource.filter((item) => item.key !== key));
        setCount(count - 1);
    };

    const handleSpecifyDelete = (key) => {
        const dataSource = [...specificationSource]
        setSpecificationSource(dataSource.filter((item) => item.key !== key));
        setSpecCount(specCount - 1);
    };

    const handleWarningDelete = (key) => {
        const dataSource = [...warningSource]
        setWarningSource(dataSource.filter((item) => item.key !== key));
        setWarningCount(warningCount - 1);
    };


    const onApplyClick = async () => {
        const data = {
            control: JSON.parse(JSON.stringify(controlSource)),
            specification: JSON.parse(JSON.stringify(specificationSource)),
            warning: JSON.parse(JSON.stringify(warningSource))
        }
        data.control.forEach((ele) => {
            ele.upper = Number(ele.upper);
            ele.lower = Number(ele.lower);
            ele.valid_timestamp = ele.valid_timestamp ? new Date(ele.valid_timestamp).toISOString() : null;
            delete ele.key;
        })
        data.specification.forEach((ele) => {
            ele.upper = Number(ele.upper);
            ele.lower = Number(ele.lower);
            ele.valid_timestamp = ele.valid_timestamp ? new Date(ele.valid_timestamp).toISOString() : null;
            delete ele.key;
        })
        data.warning.forEach((ele) => {
            ele.upper = Number(ele.upper);
            ele.lower = Number(ele.lower);
            ele.valid_timestamp = ele.valid_timestamp ? new Date(ele.valid_timestamp).toISOString() : null;
            delete ele.key;
        })
        const newArr = [...postChartData.data]
        newArr[0].limits = JSON.parse(JSON.stringify(data))
        setPostChartData({ ...postChartData, data: newArr })
        try {
            dispatch(showLoader());
            const viewRes = await postChartPlotData(postChartData);
            console.log(viewRes, 'view');
            let newdataArr = [...postChartData.data];
            newdataArr[0].limits = JSON.parse(JSON.stringify(data));
            setPostChartData({ ...postChartData, data: newdataArr });
            dispatch(hideLoader());
        } catch (error) {
            dispatch(hideLoader());
        }
        console.log(data, 'data');
    }

    return (
        <div className="limit-container">
            <div className='controlLimit'>
                <div className='table-bottom'>
                    <div className='control-header'>
                        <p>Control limit</p>
                        <Button className='custom-primary-btn' onClick={onApplyClick} >Apply</Button>
                        {/* <Button onClick={onApplyClick}>Apply <ArrowRightOutlined /></Button> */}
                    </div>
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
