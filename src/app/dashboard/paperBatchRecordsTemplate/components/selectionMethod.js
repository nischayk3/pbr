import React, { useEffect, useState } from 'react'
import { DeleteTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
import { Button, Col, Collapse, Form, Input, Row, Select } from 'antd';

function SelectionMethodInput(props) {
    let { name, restField, setSelectionActive, selectionDraggedValue, setParameterFormData, parameterFormData, formValues, setFormValues, parameterForm, showModal, modalData } = props
    const [fieldCount, setFieldCount] = useState([1]);
    const [itemIndex, setItemIndex] = useState('');
    const typeOptions = [{ label: "Checkbox", value: 'checkbox' }, { label: "Encircle", value: 'encircle' }]

    const addKeyFiled = () => {
        let arr = [...fieldCount]
        arr.push(fieldCount.length + 1)
        setFieldCount(arr)
    }

    useEffect(() => {
        let fields = parameterForm.getFieldsValue()
        fields.users[name][`selection${itemIndex}`] = selectionDraggedValue?.areaValue
        parameterForm.setFieldsValue(fields)
        let arr = [...formValues]
        let obj = {
            selectionVal: selectionDraggedValue?.areaValue,
            snippetID: selectionDraggedValue?.snippetID,
            coords: selectionDraggedValue?.coords
        }
        let arr1 = arr[name]?.selection_method ? [...arr[name]?.selection_method] : []
        arr1[itemIndex] = obj
        arr[name] = { ...arr[name], selection_method: arr1 }
        setFormValues(arr)
        setSelectionActive(false)

    }, [selectionDraggedValue])

    useEffect(() => {
        // getDirctionValues()
        if(formValues[name]?.selection_method){
            let arr = formValues[name]?.selection_method?.map((item,index )=> index)
            setFieldCount(arr)
        }
    }, [])

    const removeKeyFiled = (item) => {
        if (fieldCount.length > 1) {
            let arr = [...fieldCount]
            let val = arr.splice(item,1)
            let arr1 = [...formValues]
            let value = arr1[name]?.selection_method
            value.splice(item,1)
            arr1[name] = { ...arr1[name], selection_method: value }
            setFormValues(arr1)
            let fields = parameterForm.getFieldsValue()
            for(let i = item ; i<fieldCount.length ;i++){
                fields.users[name][`selection${i}`] = fields.users[name][`selection${i+1}`]
                delete fields?.users[name][`selection${i+1}`]
            }
            parameterForm.setFieldsValue(fields)
            setFieldCount(arr)
        }
    }

    return (
        <div>
            <div>
                <Form.Item
                    {...restField}
                    name={[name, `valueType`]}
                    style={{ marginBottom: 5 }}
                >
                    <Select options={typeOptions} placeholder='Select type' style={{ width: 252 }} />
                </Form.Item>
            </div>
            <Row style={{ display: "flex", justifyContent: 'space-between' }}>
                <div >
                    <PlusSquareTwoTone style={{ display: "block", float: "right", fontSize: "17px", marginTop: 3 }} onClick={addKeyFiled} />
                    {/* <MinusSquareTwoTone style={{ display: "block", float: "right", fontSize: "20px", marginTop: 3 }} onClick={removeKeyFiled} /> */}
                </div>

            </Row>
            {fieldCount && fieldCount.map((item, index) =>
            (
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <Row key={index}>
                        <Form.Item
                            {...restField}
                            name={[name, `selection${index}`]}
                            style={{ marginBottom: 5 }}
                        >
                            <Input
                                placeholder={`text`}
                                style={{ width: 233 }}
                                onClick={() => {
                                    setItemIndex(index)
                                    setSelectionActive(true)
                                }}
                            // onChange={(val) => handleChange(val.target.value, index, "value")}
                            />
                        </Form.Item>
                    </Row>
                    <DeleteTwoTone style={{ display: "block", float: "right", fontSize: "17px", marginTop: 5 }} onClick={() => removeKeyFiled(index)} />
                </div>

            )
            )}</div>
    )
}

export default SelectionMethodInput