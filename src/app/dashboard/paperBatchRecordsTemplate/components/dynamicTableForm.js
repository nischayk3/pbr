import React, { useState, useEffect } from 'react'
import { Form, Collapse, Input, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;
/* istanbul ignore next */
function DynamicTableForm(props) {
    let { handleSideState, sideTableData, setTableActiveKey, setFormTableData, initialSideTableData, handleOnFinishFailed, parameterFormFinish, pageIdDropdownValues, initialPageIdentifierData } = props
    const [tableCount, setTableCount] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [activeKey, setActiveKey] = useState(0);

    const checkNested = (obj, ...props) => {
        for (const prop of props) {
            if (!obj || !Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
            obj = obj[prop];
        }
        return true;
    }
    useEffect(() => {
        if (initialSideTableData?.users?.length > 0) {
            setTableData(initialSideTableData?.users)
            setTableCount(initialSideTableData?.users?.length)
        }

    }, [initialSideTableData])

    useEffect(() => {
        if (activeKey != undefined && checkNested(sideTableData["colPanelValue"], "start")) {
            let arr = tableData
            arr[activeKey] = { ...arr[activeKey], tableData: sideTableData }
            setTableData(arr)
            setFormTableData(arr)
        }

    }, [sideTableData])

    const parameterValuesChange = (changedValues, values) => {
        setTableData(values.users)
        setFormTableData(values.users)
    };

    const genExtra = (remove, name, key, restfield) => (
        <DeleteOutlined
            id="deleteParameter"
            onClick={event => {
                remove(name)
                let arr = [...tableData]
                arr.splice(name, 1)
                setTableData(arr)
                setFormTableData(arr)
            }}
        />
    );

    return (
        <Form name="dynamic_form_nest_item"
            onValuesChange={parameterValuesChange}
            onFinishFailed={handleOnFinishFailed}
            onFinish={parameterFormFinish}
            initialValues={initialSideTableData}
            layout='vertical'
            id="myForm"
            autoComplete="off">
            <div className='addParameterContainer'>
                <div className='addParameterBlock'>
                    <div className='singleParameterBlock'>
                        <Form.List name="users">
                            {(fields, { add, remove }) => (
                                <>
                                    <Collapse accordion expandIconPosition='right' onChange={(val) => {
                                        if (val !== undefined) {
                                            setActiveKey(Number(val))
                                            setTableActiveKey(Number(val))
                                        }
                                    }}>
                                        {fields.map(({ key, name, ...restField }) => (

                                            // <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Panel header={tableData[name]?.name ? `${tableData[name]?.name}` : `Parameter ${name + 1} created`} key={`${name}`} extra={genExtra(remove, name, key, restField)}>
                                                <div className='addParameterBlock'>
                                                    <div className='parameterAdded-block'>
                                                        {/* <Form.Item
                                                            {...restField}
                                                            name={[name, 'table_id']}
                                                            label="Table ID"
                                                            rules={[{ required: true, message: 'Please enter Table ID' }]}
                                                        >
                                                            <Input
                                                                placeholder='Table ID'

                                                            />
                                                        </Form.Item> */}
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'name']}
                                                            label="Name"
                                                            rules={[{ required: true, message: 'Please enter Name' },
                                                            () => ({
                                                                validator(_, value) {
                                                                    let flag = false
                                                                    tableData.forEach((item, index) => {
                                                                        if (index != name && item.name === value) {
                                                                            flag = true
                                                                        }
                                                                    })
                                                                    if (flag) {
                                                                        return Promise.reject('Table Parameter Name cannot be same');
                                                                    }
                                                                    return Promise.resolve();
                                                                   
                                                                },
                                                            })]}
                                                        >
                                                            <Input
                                                                placeholder='Name'

                                                            />
                                                        </Form.Item>
                                                        {(pageIdDropdownValues.length > 0 || initialPageIdentifierData?.users?.length > 0) &&
                                                            <Form.Item {...restField}
                                                                name={[name, 'pageIdValue']}
                                                                label="Page Id"
                                                                rules={[{ required: true, message: 'Enter pageId' }]}
                                                            // label="AnchorDirection"
                                                            >

                                                                <Select placeholder='Enter PageID' options={pageIdDropdownValues} />
                                                            </Form.Item>}
                                                        {/* <Form.Item
                                                            {...restField}
                                                            name={[name, 'multipage']}
                                                            label="Multipage Document"
                                                        >
                                                            <Select placeholder="Select Multipage Yes/No" defaultValue={"NO"}>
                                                                <Option value='yes'>Yes</Option>
                                                                <Option value='no'>No</Option>
                                                            </Select>
                                                        </Form.Item> */}
                                                    </div>
                                                </div>
                                            </Panel>
                                        ))}
                                    </Collapse>
                                    <Form.Item>
                                        <div
                                            className='firstParameter-para'
                                            onClick={() => {
                                                add()
                                                if (tableCount !== 0) {
                                                    handleSideState()
                                                } else {
                                                    setTableCount(tableCount + 1)
                                                    handleSideState()
                                                }

                                            }}
                                            type="primary"
                                            htmltype="submit"
                                        >
                                            <p>
                                                Add Table Paramater
                                                {/* {paramaterAdded
                                                    ? 'Add another paramater'
                                                    : 'Add your first Parameter'} */}
                                            </p>

                                        </div>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default DynamicTableForm