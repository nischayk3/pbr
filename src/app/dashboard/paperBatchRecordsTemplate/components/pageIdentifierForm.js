import React, { useState, useEffect } from 'react'
import { Form, Collapse, Input, Select } from 'antd'
import { DeleteOutlined, PlusSquareTwoTone, MinusSquareTwoTone } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;

function PageIdentifierForm(props) {
    let { pageDragValue, setPageIdFormValues, handleOnFinishFailed, parameterFormFinish, initialPageIdentifierData } = props
    const [pageIdentifierFormValues, setPageIdentifierFormValues] = useState(initialPageIdentifierData ? initialPageIdentifierData : { users: [] });
    const [activeKey, setActiveKey] = useState(0);
    const [parameterCount, setParameterCount] = useState(0);
    const [updateKeyValueClicked, setUpdateKeyValueClicked] = useState("");
    const [fieldCount, setFieldCount] = useState([1]);

    useEffect(() => {
        if (pageIdentifierFormValues.users[activeKey]) {
            let obj = { ...pageIdentifierFormValues.users[activeKey] }
            if (pageIdentifierFormValues?.users[activeKey]?.keyCount && fieldCount.length === 1) {
                obj["keyCount"] = pageIdentifierFormValues?.users[activeKey]?.keyCount
            }else{
                obj["keyCount"] = fieldCount?.length
            }
            // obj["keyCount"] = fieldCount?.length
            let newVal = { ...pageIdentifierFormValues }
            newVal.users[activeKey] = obj
            setPageIdentifierFormValues(newVal)
        }

    }, [fieldCount])

    useEffect(() => {
        if (pageIdentifierFormValues?.users[activeKey]?.keyCount) {
            let count = pageIdentifierFormValues?.users[activeKey]?.keyCount
            let arr = []
            for (let i = 1; i <= count; i++) {
                arr.push(i)
            }
            setFieldCount(arr)
        } else {
            setFieldCount([1])
        }
    }, [activeKey])

    const parameterValuesChange = (changedValues, values) => {
        setPageIdentifierFormValues({ ...pageIdentifierFormValues, users: values.users })
    };

    const addKeyFiled = () => {
        let arr = [...fieldCount]
        arr.push(fieldCount.length + 1)
        setFieldCount(arr)
    }

    useEffect(() => {
        if (pageIdentifierFormValues?.users?.length > 0) {
            setParameterCount(pageIdentifierFormValues?.users?.length)
            setPageIdFormValues(pageIdentifierFormValues?.users)
        }

    }, [pageIdentifierFormValues])

    useEffect(() => {
        if (initialPageIdentifierData?.users?.length > 0) {
            setParameterCount(initialPageIdentifierData?.users?.length)
            setPageIdFormValues(initialPageIdentifierData?.users)
            // setPageIdentifierFormValues(initialPageIdentifierData)
            let count = initialPageIdentifierData?.users[activeKey]?.keyCount
            let arr = []
            for (let i = 1; i <= count; i++) {
                arr.push(i)
            }
            setFieldCount(arr)
        }

    }, [initialPageIdentifierData])

    const removeKeyFiled = () => {
        if (fieldCount.length > 1) {
            let arr = [...fieldCount]
            arr.pop()
            setFieldCount(arr)
        }
    }

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
    useEffect(() => {
        if (Object.keys(pageDragValue).length) {
            let obj = { ...pageIdentifierFormValues.users[activeKey] }
            obj[updateKeyValueClicked] = pageDragValue.areaValue
            let newVal = { ...pageIdentifierFormValues }
            newVal.users[activeKey] = obj
            setPageIdentifierFormValues(newVal)
        }

    }, [pageDragValue])

    const DragInputValue = (e, key) => {
        setUpdateKeyValueClicked(key)
    }

    return (
        <Form name="dynamic_form_nest_item"
            onValuesChange={parameterValuesChange}
            // onFinishFailed={handleOnFinishFailed}
            // onFinish={parameterFormFinish}
            initialValues={pageIdentifierFormValues}
            layout='vertical'
            // id="myForm"
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
                                        }
                                    }}>
                                        {fields.map(({ key, name, ...restField }) => (

                                            // <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Panel header={pageIdentifierFormValues?.users[name]?.name ? `${pageIdentifierFormValues?.users[name]?.name}` : `Parameter ${name + 1} created`} key={`${name}`} extra={genExtra(remove, name, key, restField)}>
                                                <div className='addParameterBlock'>
                                                    <div className='parameterAdded-block'>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'name']}
                                                            label="Page Name"
                                                        // rules={[{ required: true, message: 'Please enter Page Name' }]}
                                                        >
                                                            <Input
                                                                placeholder='Page Name'
                                                            />
                                                        </Form.Item>
                                                        <PlusSquareTwoTone style={{ display: "block", float: "right", fontSize: "20px", marginTop: 3 }} onClick={addKeyFiled} />
                                                        <MinusSquareTwoTone style={{ display: "block", float: "right", fontSize: "20px", marginTop: 3, marginRight: 10 }} onClick={removeKeyFiled} />
                                                        {fieldCount && fieldCount.map(item =>
                                                        (
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, `key${item}`]}
                                                                label={`Key${item}`}
                                                            // rules={[{ required: true, message: 'Please enter key2' }]}
                                                            >
                                                                <Input
                                                                    placeholder={`Key${item}`}
                                                                    style={{ width: 266 }}
                                                                    onClick={(e) => DragInputValue(e, `key${item}`)}
                                                                />
                                                            </Form.Item>
                                                        )
                                                        )}
                                                    </div>
                                                </div>
                                            </Panel>
                                        ))}
                                    </Collapse>
                                    <Form.Item>
                                        <div
                                            className='firstParameter-para'
                                            onClick={() => {
                                                if (parameterCount !== 0) {
                                                    add()

                                                } else {
                                                    add()
                                                }
                                            }}
                                            type="primary"
                                            htmltype="submit"
                                        >
                                            <p>
                                                Add Paramater
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

export default PageIdentifierForm