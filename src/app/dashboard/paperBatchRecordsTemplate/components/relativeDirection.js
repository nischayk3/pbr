import React, { useEffect, useState } from 'react';
import { RightCircleTwoTone, DeleteTwoTone, RetweetOutlined, PlusSquareTwoTone } from '@ant-design/icons';
import { loadRelativeDirectionSetting, findPageIdentifier } from '../../../../services/pbrService'
import { Button, Col, Collapse, Form, Input, Row, Select } from 'antd';
import { useDispatch } from 'react-redux';
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../duck/actions/commonActions';
import './styles.scss';

function RelativeDirection(props) {
    let { name, restField, setParameterFormData, parameterFormData, formValues, setFormValues, parameterForm, showModal, modalData } = props
    const dispatch = useDispatch();
    const [fieldCount, setFieldCount] = useState([1]);
    const [loadSettingOptions, setLoadSettingOptions] = useState([]);
    const [update, setUpdate] = useState(false);
    const [directionValues, setDirectionValues] = useState([]);

    const addKeyFiled = () => {
        let arr = [...fieldCount]
        arr.push(fieldCount.length + 1)
        setFieldCount(arr)
    }

    const getDirctionValues = async () => {
        try {
            let user = localStorage.getItem("user_id")
            let req = {
                created_by: user
            }
            let res = await loadRelativeDirectionSetting(req)
            if (res.Status === 200) {
                dispatch(hideLoader());
                setLoadSettingOptions(res.Data)
            } else {
                dispatch(hideLoader());
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        console.log("formValues",formValues)
        getDirctionValues()
        if(formValues[name]?.directions && typeof(formValues[name]?.directions) != 'string'){
            let arr = formValues[name]?.directions?.map((item,index )=> index)
            setFieldCount(arr)
        }
    }, [])

    useEffect(() => {
        if (update) {
            let fields = parameterForm.getFieldsValue()
            fields.users[name][`dirVal${fieldCount.length-1}`] = modalData[name]?.snippet_value
            parameterForm.setFieldsValue(fields)
            setUpdate(false)
        }
    }, [modalData])


    const removeKeyFiled = (item) => {
        if (fieldCount.length > 1) {
            let arr = [...fieldCount]
            let val = arr.splice(item,1)
            let arr1 = [...formValues]
            let value = arr1[name]?.directions
            value.splice(item,1)
            arr1[name] = { ...arr1[name], directions: value }
            setFormValues(arr1)
            let fields = parameterForm.getFieldsValue()
            for(let i = item ; i<fieldCount.length ;i++){
                fields.users[name][`dir${i}`] = fields.users[name][`dir${i+1}`]
                fields.users[name][`dirVal${i}`] = fields.users[name][`dirVal${i+1}`]
                delete fields?.users[name][`dirVal${i+1}`]
                delete fields?.users[name][`dir${i+1}`]
            }
            parameterForm.setFieldsValue(fields)
            setFieldCount(arr)
        }
    }

    const handleChange = (val, index, value) => {
        if (value === 'dir') {
            let arr = [...formValues]
            let value = arr[name]?.directions
            if(value){
                value[index] = val
                arr[name] = { ...arr[name], directions: value }
            }else{
                arr[name] = { ...arr[name], directions: [val] }
            }
            setFormValues(arr)
        }
    }
    
    return (
        <div>
            <Row style={{ display: "flex", justifyContent: 'space-between' }}>
                <div >
                    <PlusSquareTwoTone style={{ display: "block", float: "right", fontSize: "20px", marginTop: 3 }} onClick={addKeyFiled} />
                    {/* <MinusSquareTwoTone style={{ display: "block", float: "right", fontSize: "20px", marginTop: 3 }} onClick={removeKeyFiled} /> */}
                </div>
                <div>

                    <RightCircleTwoTone onClick={() => {
                        showModal()
                        setUpdate(true)
                    }
                    } style={{ display: "block", float: "right", fontSize: "20px", marginTop: 3, marginRight: 20 }} />

                </div>

            </Row>
            {fieldCount && fieldCount.map((item, index) =>
            (
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <Row key={index}>
                        <Form.Item
                            {...restField}
                            name={[name, `dir${index}`]}
                            style={{ marginBottom: 5 }}
                        >
                            <Select onChange={(val) => handleChange(val, index, 'dir')} placeholder="Direction" options={loadSettingOptions} style={{ width: 233 }} />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, `dirVal${index}`]}
                            style={{ marginBottom: 5 }}
                        >
                            <Input
                                placeholder={`text`}
                                style={{ width: 233 }}
                                onChange={(val) => handleChange(val.target.value, index, "value")}
                            />
                        </Form.Item>
                    </Row>
                    <DeleteTwoTone style={{ display: "block", float: "right", fontSize: "20px", marginTop: 25 }} onClick={() => removeKeyFiled(index)} />
                </div>

            )
            )}

        </div>
    )
}

export default RelativeDirection