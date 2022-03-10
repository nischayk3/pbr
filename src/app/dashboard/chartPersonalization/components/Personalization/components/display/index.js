// Fahad Siddiqui
// Mareana Software
// Version 1
// Last modified - 03 March, 2022
import '../Personalization.scss';
import './style.scss';
        <Checkbox>Remember me</Checkbox>
import { Button, Card, Collapse ,Table,Popconfirm,DatePicker,Input,Switch,Form,Checkbox,Select } from 'antd';
import React, { Component, useState,useEffect } from 'react';
import {
  DeleteTwoTone
} from '@ant-design/icons';

import InputField from '../../../../../../../components/InputField/InputField';
import SelectField from '../../../../../../../components/SelectField/SelectField';
const { Panel } = Collapse;
const { Option } = Select;

const  Display = (props)=>{
    
  const apllyFigure = (values)=>{
      console.log(values)
  }
    return (
      <>
      <div className='display-section'>

      <Collapse
          expandIconPosition='right'
          ghost
        >
          
            {/* Figure */}
          <Panel header="Figure" key='5'>

          <Form
            name="basic"
            onFinish={apllyFigure}  
        >
                <Form.Item
                    label="Lines"
                    name="lines"
                    labelCol={{span:16}}
                    wrapperCol={{span:5}}
                    
                >
                    <Switch size="small" />
                </Form.Item>

                <Form.Item
                    label="Line width"
                    name="linewidth"
                    labelCol={{span:16}}
                    wrapperCol={{span:8}}
                >
                    <Select defaultValue="1"  onChange={console.log()}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        </Select>
                </Form.Item>
                <Form.Item
                    label="Stair Cases"
                    name="staircases"
                    labelCol={{span:16}}
                    wrapperCol={{span:5}}
                >
                    <Switch size="small" />
                
                </Form.Item>
                <Form.Item
                    label="Area Fill"
                    name="areafill"
                    labelCol={{span:16}}
                    wrapperCol={{span:8}}
                >
                    <Select defaultValue="1"  onChange={console.log()}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        </Select>
                </Form.Item>
                <Form.Item
                    label="Area Gradient"
                    name="areaGradient"
                    labelCol={{span:16}}
                    wrapperCol={{span:8}}
                >
                    <Select defaultValue="1"  onChange={console.log()}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        </Select>
                </Form.Item>
                <Form.Item
                    label="Points"
                    name="point"
                    labelCol={{span:16}}
                    wrapperCol={{span:5}}
                >
                    <Switch size="small" />
                
                </Form.Item>
                <Form.Item
                    label="Alert Threshold"
                    name="alertthreshold"
                    labelCol={{span:16}}
                    wrapperCol={{span:5}}
                >
                    <Switch size="small" />
                
                </Form.Item>
                <Form.Item
                    label="Stair Cases"
                    name="staircases"
                    labelCol={{span:16}}
                    wrapperCol={{span:5}}
                >
                    <Switch size="small" />
                
                </Form.Item>
                <div>
                    Panel Options
                </div>

                <Form.Item
                    label="Title"
                    name="tiitle"
                    labelCol={{span:24}}
                >
                    <Input />
                    
                </Form.Item>
                <Form.Item
                    label="Title"
                    name="tiitle"
                    labelCol={{span:24}}
                >
                    <Input />
                    
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="tidescriptionitle"
                    labelCol={{span:24}}
                >
                    <Input.TextArea  maxLength={100} />
                    
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                    apply
                    </Button>
                </Form.Item>
                </Form>
          </Panel>

          {/* Legend */}
          <Panel header='Legend' key='6'>
          <Form
            name="basic"
            onFinish={apllyFigure}  
        >
                <div>Options</div>
                <Form.Item
                    label="Show"
                    name="show"
                    
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="At table"
                    name="attable"
                    
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="To right"
                    name="toright"
                    
                >
                    <Switch />
                </Form.Item>

                <div>Values</div>
                <Form.Item
                    label="Min"
                    name="min"
                    
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="Max"
                    name="max"
                    
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="Avg"
                    name="avg"
                    
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="Current"
                    name="current"
                    
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="total"
                    name="total"
                    
                >
                    <Switch />
                </Form.Item>
                <Form.Item
                    label="Decimal"
                    name="decimal"
                    
                >
                    <Switch />
                </Form.Item>

                <div>Hide Series</div>
                
                <Form.Item
                    label="With only null"
                    name="withonlynull"
                    
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="With only Zero"
                    name="withonlyzero"
                    
                >
                    <Switch />
                </Form.Item>
                
                </Form>
          </Panel>
           
           {/* Axes */}
          <Panel header='Axes' key='7'>

          <Form
            name="basic"
            onFinish={apllyFigure}  
        >
                <div>Left X</div>
                <Form.Item
                    label="Show"
                    name="showleftx"
                    
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="Unit"
                    name="unit"
                >
                    <Select defaultValue="Short"  onChange={console.log()}>
                        <Option value="Short">Short</Option>
                        <Option value="Long">Long</Option>
                        </Select>
                </Form.Item>

                <Form.Item
                    label="Scale"
                    name="scale"
                >
                    <Select defaultValue="Linear"  onChange={console.log()}>
                        <Option value="Linear">Linear</Option>
                        </Select>
                </Form.Item>
                <Form.Item
                    label="Y Min"
                    name="ymin"
                >
                    <Select defaultValue="Auto"  onChange={console.log()}>
                        <Option value="Auto">Auto</Option>
                        </Select>
                </Form.Item>
                <Form.Item
                    label="Y Max"
                    name="ymax"
                >
                    <Select defaultValue="Auto"  onChange={console.log()}>
                        <Option value="Auto">Auto</Option>
                        </Select>
                </Form.Item>

                <Form.Item
                    label="Decimal"
                    name="decimal"
                >
                    <Select defaultValue="Auto"  onChange={console.log()}>
                        <Option value="Auto">Auto</Option>
                        </Select>
                </Form.Item>

                <Form.Item
                    label="Lable"
                    name="label"
                >
                    <Select defaultValue="Auto"  onChange={console.log()}>
                        <Option value="Auto">Auto</Option>
                        </Select>
                </Form.Item>
                

                <div>right X</div>
                <Form.Item
                    label="Show"
                    name="showrightx"
                    
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="Unit"
                    name="unit"
                >
                    <Select defaultValue="Short"  onChange={console.log()}>
                        <Option value="Short">Short</Option>
                        <Option value="Long">Long</Option>
                        </Select>
                </Form.Item>

                <Form.Item
                    label="Scale"
                    name="scale"
                >
                    <Select defaultValue="Linear"  onChange={console.log()}>
                        <Option value="Linear">Linear</Option>
                        </Select>
                </Form.Item>
                <Form.Item
                    label="Y Min"
                    name="ymin"
                >
                    <Select defaultValue="Auto"  onChange={console.log()}>
                        <Option value="Auto">Auto</Option>
                        </Select>
                </Form.Item>
                <Form.Item
                    label="Y Max"
                    name="ymax"
                >
                    <Select defaultValue="Auto"  onChange={console.log()}>
                        <Option value="Auto">Auto</Option>
                        </Select>
                </Form.Item>

                <Form.Item
                    label="Decimal"
                    name="decimal"
                >
                    <Select defaultValue="Auto"  onChange={console.log()}>
                        <Option value="Auto">Auto</Option>
                        </Select>
                </Form.Item>

                <Form.Item
                    label="Lable"
                    name="label"
                >
                    <Select defaultValue="Auto"  onChange={console.log()}>
                        <Option value="Auto">Auto</Option>
                        </Select>
                </Form.Item>
                
                <div>X - Axis</div>
                <Form.Item
                    label="Show"
                    name="showxaxis"
                    
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="Unit"
                    name="unit"
                >
                    <Select defaultValue="Short"  onChange={console.log()}>
                        <Option value="Short">Short</Option>
                        <Option value="Long">Long</Option>
                        </Select>
                </Form.Item>
                
                
                </Form>
           
          </Panel>


        </Collapse>
          
      </div>
      </>
    );
    
  }


export default Display;
