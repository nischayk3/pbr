import React from 'react'
import {
  Input, Select, Typography,
} from 'antd'
import './styles.scss'

const { Option } = Select;
const { Text } = Typography;


function ReportDesignerForm(props) {
  const { viewId, setViewId } = props
  return (
    <div className="reportDesigner-grid" >
      <div className="reportDesigner-block-left bg-white" >
        <Text className="filter-text" > Report ID  </Text>
        <Text className="filter-text" >Report Name</Text>
        <Text className="filter-text">View</Text>
        <Text className="filter-text">Status</Text>
        <Input className="filter-button" value="123456" disabled />
        <Input className="filter-button" value="123456" disabled />
        <Select className="filter-button" defaultValue="view1" >
          <Option value="view1">View 1</Option>
          <Option value="view1">View 2</Option>
          <Option value="Yiminghe">View 3</Option>
        </Select>
        <Input className="filter-button" value="123456" disabled />
      </div>
    </div>
  )
}

export default ReportDesignerForm
