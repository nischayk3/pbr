
/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir 
 */

import React, { useEffect, useState } from 'react'
import { Card, Tabs, Table, Popconfirm, Button, Input, Modal, Row, Col, Select, message } from 'antd'
import './hierStyle.scss'
import { ArrowRightOutlined, DeleteTwoTone, PlusOutlined } from '@ant-design/icons'
import Banner from '../../../../../assets/images/Popup-Side.svg';
import BreadCrumbWrapper from '../../../../../components/BreadCrumbWrapper';
import Display from '../display/display';
import { putMolecule, putProcessStep, getProcessStep, getProcessStepMap, putProcessStepMap } from '../../../../../services/viewHierarchyServices';
import { showNotification } from '../../../../../duck/actions/commonActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEdges } from 'react-flow-renderer';

const { TabPane } = Tabs

function Hierarchy() {
    const [hierarchyName, setHierarchyName] = useState('Untitled')
    const Option = Select
    const [moleculeData, setMoleculeData] = useState([])
    const [stepData, setStepData] = useState([])
    const [stepMappingData, setStepMappingData] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [stepArray, setStepArray] = useState([]);
    const [show, setShow] = useState(false)

    const [count, setCount] = useState(1);
    const [stepCount, setStepCount] = useState(1);
    const [stepMapCount, setStepMapCount] = useState(1);
    const [tableData,setTableData] = useState([])

    const [activeTab, setActiveTab] = useState('Plant and molecules')

    const dispatch = useDispatch()

    const hier_name = useSelector((state) => state.viewHierarchy.drugName);

    useEffect(() => {
        handleAdd()
        handleStepAdd()
        if (hier_name)
            setHierarchyName(hier_name)


    }, [])
    useEffect(() => {
        if (stepData && stepData.length > 0 && moleculeData && moleculeData.length > 0 && activeTab == 'Process step mapping') {
            getStepMapping()
        }
    }, [activeTab])


    const getStepMapping = async () => {
        let req = { ds_name: hierarchyName }
        let mapResponse = getProcessStepMap(req)

        if (mapResponse['status-code'] == 200) {
             setTableData(mapResponse.data)
             setStepArray(mapResponse.options)
        }
    }
    const plantMoleculeColumns =
        [
            {
                title: "Action",
                dataIndex: "action",
                width: "10%",
                render: (_, record) => (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <DeleteTwoTone twoToneColor="red" />
                    </Popconfirm>
                ),
            },
            {
                title: "Molecule",
                dataIndex: "Molecule",
                key: "Molecule",
                width: "20%",
                render: (text, record) =>
                    moleculeData.map((data, index) => {
                        if (record.key === data.key) {
                            return (
                                <Input
                                    type="text"
                                    name="Molecule"
                                    value={data.Molecule}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            );
                        }
                    }),
            },
            {
                title: "Plant",
                dataIndex: "Plant",
                key: "Plant",
                width: "80%",
                render: (text, record) =>
                    moleculeData.map((data, index) => {
                        if (record.key === data.key) {
                            return (
                                <Input
                                    type="text"
                                    name="Plant"
                                    value={data.Plant}
                                    onChange={(e) => handleChange(index, e)}

                                />
                            );
                        }
                    }),
            },
        ]

    const stepMapColumns =
        [
            {
                title: "Action",
                dataIndex: "action",
                width: "10%",
                render: (_, record) => (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleStepDelete(record.key)}
                    >
                        <DeleteTwoTone twoToneColor="red" />
                    </Popconfirm>
                ),
            },
            {
                title: "Sequence No",
                dataIndex: "Sequence",
                key: "Sequence",
                width: "20%",
                render: (text, record) =>
                    stepData.map((data, index) => {
                        if (record.key === data.key) {
                            return (
                                <Input
                                    type="text"
                                    name="Sequence"
                                    value={data.Molecule}
                                    onChange={(e) => handleStepChange(index, e)}

                                />
                            );
                        }
                    }),
            },
            {
                title: "Process Step",
                dataIndex: "Step",
                key: "Step",
                width: "70%",
                render: (text, record) =>
                    stepData.map((data, index) => {
                        if (record.key === data.key) {
                            return (
                                <Input
                                    type="text"
                                    name="Step"
                                    value={data.Plant}
                                    onChange={(e) => handleStepChange(index, e)}
                                />
                            );
                        }
                    }),
            },
        ]

    const mappingColumns = [
        {
            title: "Product",
            dataIndex: "molecule_num",
            key: "molecule_num",
            width: "200",
        },
        {
            title: "Plant",
            dataIndex: "site_num",
            key: "site_num",
            width: "200",
        },
        {
            title: "Level1",
            dataIndex: "l1_product",
            key: "l1_product",
            width: "200",
        },
        {
            title: "Description",
            dataIndex: "Description",
            key: "Description",
            width: "200",
        },
        {
            title: "Process Step",
            dataIndex: "process_step",
            key:'process_step',
            width: "200",
            align: 'left',
            render: (text, record) => {
                return (
                    <Select
                        row={1}
                        className="filter-button"
                        allowClear
                        dropdownStyle={{ border: '10' }}
                        notFoundContent="No Result"
                        placeholder="Select Step"
                        style={{ width: '100%', borderRadius: '4px', right: '15px' }}
                    >
                        {stepArray.length > 0 ? stepArray.map(item => (
                            <Option value={item} key={item}>
                                {item}
                            </Option>
                        )) : <Option >

                        </Option>}
                    </Select>
                )
            }
        },

    ]


    const handleAdd = () => {
        const newData = {
            key: count,
            Plant: "",
            Molecule: "",
        };
        setMoleculeData([...moleculeData, newData]);
        setCount(count + 1);
    };

    const handleStepAdd = () => {
        const newData = {
            key: stepCount,
            Sequence: "",
            Step: "",
        };
        setStepData([...stepData, newData]);
        setStepCount(stepCount + 1);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const rowsInput = [...moleculeData];
        rowsInput[index][name] = value;
        setMoleculeData(rowsInput);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleStepChange = (index, event) => {

        const { name, value } = event.target;
        const rowsInput = [...stepData];
        rowsInput[index][name] = value;
        setStepArray(rowsInput.map(function (el) { return el.Step; }))
        setStepData(rowsInput);
    }

    const handleDelete = (key) => {
        const dataSource = [...moleculeData];
        setMoleculeData(dataSource.filter((item) => item.key !== key));
        setCount(count - 1);
    };

    const handleStepDelete = (key) => {
        const dataSource = [...stepData];
        setStepData(dataSource.filter((item) => item.key !== key));
        setStepCount(stepCount - 1);
    };

    const handleChangeTab = (value) => {
        setActiveTab(value)
    }

    const handleNext = () => {
        if (activeTab == 'Process steps')
            setActiveTab('Process step mapping')
        if (activeTab == 'Plant and molecules')
            setActiveTab('Process steps')
    }

    const handleNew = (name) => {
        setShow(false)
        setHierarchyName(name)
    }

    const handleSave = async () => {
        if (activeTab == 'Plant and molecules') {
            let req = {
                ds_name: hierarchyName,
                product_num: moleculeData.map((i) => { return parseInt(i.Molecule) }),
                site_code: moleculeData.map((i) => { return parseInt(i.Plant) }),
                delete_row: false
            }
            let response = await putMolecule(req)
            if (response['statuscode'] == 200) {
                message.success('Saved')
            }
            else {
                message.error(response.message)
            }
        }
        if (activeTab == 'Process steps') {
            let req = {
                ds_name: hierarchyName,
                seq_no: stepData.map((i) => { return parseInt(i.Sequence) }),
                process_step: stepData.map((i) => { return i.Step }),
                delete_row: false
            }
            let response = await putProcessStep(req)
            if (response['status-code'] == 200) {
                message.success('Saved')
            }
            else {
                message.error(response.message)
            }
        }

    }

    return (

        <div className='custom-wrapper'>
            <BreadCrumbWrapper />
            <div className='custom-content-layout'>
                {!show ?
                    <Card
                        className="hierarchy-card"
                        title={<span><span>Molecule Hierarchy Configuration -</span> <span className="title-card">{hierarchyName}</span> <span className="title-button"> </span></span>}
                    >
                        <Tabs className="hier-tab" activeKey={activeTab} onChange={handleChangeTab} tabBarExtraContent={<Button className="tab-button-two" onClick={() => handleSave()} >Save</Button>}>
                            <TabPane tab="Plant and molecules" key="Plant and molecules">
                                <p className="tab-title"> Enter the product and plant details for {hierarchyName} <Button className="data-button-one"> {activeTab == 'Process step mapping' ? <span className="tab-button-text">Finish</span> : <span className="tab-button-text" onClick={() => handleNext()}>Next</span>}</Button> </p>
                                <Table className="hierarchy-table" columns={plantMoleculeColumns} dataSource={moleculeData} pagination={false} />
                                <div className="add-button">
                                    <Button
                                        onClick={() => handleAdd()}
                                        className="add-row-button"
                                    >
                                        <PlusOutlined />
                                        Add new row
                                    </Button>
                                </div>
                            </TabPane>
                            <TabPane tab="Process steps" key="Process steps">
                                <p className="tab-title">Enter the process step for {hierarchyName} <Button className="data-button"> {activeTab == 'Process step mapping' ? <span className="tab-button-text">Finish</span> : <span className="tab-button-text" onClick={() => handleNext()}>Next</span>}</Button></p>
                                <Table className="hierarchy-table" columns={stepMapColumns} dataSource={stepData} pagination={false} />
                                <div className="add-button">
                                    <Button
                                        onClick={() => handleStepAdd()}
                                        className="add-row-button"
                                    >
                                        <PlusOutlined />
                                        Add new row
                                    </Button>
                                </div>

                            </TabPane>
                            <TabPane tab="Process step mapping" key="Process step mapping">
                                <p className="tab-title">Enter the process step for {hierarchyName}</p>
                                <div className="map-grid">
                                    <Table className="hierarchy-map-table" columns={mappingColumns} dataSource={tableData} />
                                    {/* <div className="map-box">
                                        <p className="map-box-text">Process steps available</p>
                                        {stepArray && stepArray.map((i) =>
                                            <div className="map-box-tile">
                                                <p className="map-box-tile-text">{i}</p>
                                            </div>
                                        )}
                                    </div> */}
                                </div>
                            </TabPane>

                        </Tabs>
                    </Card> : <Display handleNew={handleNew} />}
                <Modal
                    className='landing-modal'
                    title="Create New Dashboard"
                    visible={isModalVisible}
                    //onOk={handleOk} 
                    onCancel={handleCancel}
                    footer={[
                        <Button className="custom-secondary-button" onClick={() =>
                            handleOk()
                        }>Let's Go!</Button>
                    ]}>
                    <div>
                        <Row>
                            <Col span={12}>
                                <img src={Banner} />
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <p>Name of the drug you want to add</p>
                                    <Input
                                        placeholder='Enter Name'
                                        onChange={(e) => setHierarchyName(e.target.value)}
                                        value={hierarchyName}
                                    />
                                </Row>

                            </Col>
                        </Row>
                    </div>

                </Modal>
            </div>
        </div>
    )
}


export default Hierarchy