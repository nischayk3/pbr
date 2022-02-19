import React from 'react'
import './styles.scss'
import { Form, Input, Select, Table, Tag, Checkbox } from 'antd'
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons'

const { Option } = Select

const Editorcolumns = [
  {
    title: 'Math Editor',
    key: 'batch',
    dataIndex: 'batch',
  },
]
const columns = [
  {
    title: 'Batch',
    key: 'batch',
    dataIndex: 'batch',
  },
  {
    title: '1',
    key: 'parameter',
    dataIndex: 'parameter',
    render: parameter => (
      <>
        {parameter === 'yes' ? (
          <span className="batchChecked">
            <Checkbox checked={true} />
          </span>
        ) : (
          <span className="batchClosed">
            <CloseOutlined />
          </span>
        )}
      </>
    ),
  },
  {
    title: '2',
    key: 'aggregation',
    dataIndex: 'aggregation',
    render: aggregation => (
      <>
        {aggregation === 'yes' ? (
          <span className="batchChecked">
            <Checkbox />
          </span>
        ) : (
          <span className="batchClosed">
            <CloseOutlined />
          </span>
        )}
      </>
    ),
  },
  {
    title: '3',
    key: 'batch1',
    dataIndex: 'batch1',
    render: batch1 => (
      <>
        {batch1 === 'yes' ? (
          <span className="batchChecked">
            <Checkbox checked={true} />
          </span>
        ) : (
          <span className="batchClosed">
            <CloseOutlined />
          </span>
        )}
      </>
    ),
  },
  {
    title: '4',
    key: 'batch2',
    dataIndex: 'batch2',
    render: batch2 => (
      <>
        {batch2 === 'yes' ? (
          <span className="batchChecked">
            <Checkbox />
          </span>
        ) : (
          <span className="batchClosed">
            <CloseOutlined />
          </span>
        )}
      </>
    ),
  },
  {
    title: '5',
    key: 'batch3',
    dataIndex: 'batch3',
    render: batch3 => (
      <>
        {batch3 === 'yes' ? (
          <span className="batchChecked">
            <Checkbox />
          </span>
        ) : (
          <span className="batchClosed">
            <CloseOutlined />
          </span>
        )}
      </>
    ),
  },
  {
    title: '6',
    key: 'batch4',
    dataIndex: 'batch4',
    render: batch4 => (
      <>
        {batch4 === 'yes' ? (
          <span className="batchChecked">
            <Checkbox />
          </span>
        ) : (
          <span className="batchClosed">
            <CloseOutlined />
          </span>
        )}
      </>
    ),
  },
]

const dataSource = [
  {
    key: '1',
    batch: 'C1',
    parameter: 'yes',
    aggregation: 'yes',
    batch1: 'yes',
    batch2: 'yes',
    batch3: 'yes',
    batch4: 'no',
  },
  {
    key: '2',
    batch: 'C2',
    parameter: 'yes',
    aggregation: 'no',
    batch1: 'yes',
    batch2: 'yes',
    batch3: 'yes',
    batch4: 'no',
  },
  {
    key: '3',
    batch: 'C2',
    parameter: 'yes',
    aggregation: 'no',
    batch1: 'yes',
    batch2: 'yes',
    batch3: 'yes',
    batch4: 'no',
  },
]

function FunctionEditor(props) {
  const {
    moleculeId,
    setMoleculeId,
    materialsList,
    setMaterialsList,
    filterdData,
    setFilterdData,
    dataLoadingState,
    setDataLoadingState,
    viewSummaryTable,
    setViewSummaryTable,
    viewSummaryColumns,
    setViewSummaryColumns,
  } = props

  return (
    <div className="viewSummary-container functionEditor-container">
      <div className="viewSummary-FormBlock functionEditor-FormBlock">
        <Form.Item label="ID" name="id">
          <Input placeholder="Enter ID" />
        </Form.Item>
        <Form.Item label="Function Name" name="functionName">
          <Input placeholder="Enter Function Name" />
        </Form.Item>
        <Form.Item label="Aggregation" name="aggregation">
          <Select placeholder="Select Aggregation">
            <Option value="1">Min</Option>
            <Option value="2">Mean</Option>
            <Option value="3">Max</Option>
            <Option value="3">First</Option>
            <Option value="5">last</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Parameter" name="parameter">
          <Select placeholder="Select Parameter">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Function" name="function">
          <Select placeholder="Select Function">
            <Option value="1">round</Option>
            <Option value="2">sin</Option>
            <Option value="3">cos</Option>
            <Option value="4">ln</Option>
            <Option value="5">exp</Option>
            <Option value="6">log</Option>
          </Select>
        </Form.Item>
      </div>
      <div className="viewSummary-FormBlock MathEditor-FormBlock">
        <div>
          <Table
            className="viewSummary-table functionBatch-table"
            columns={Editorcolumns}
            dataSource={[]}
            pagination={false}
          />
        </div>
        <div>
          <Table
            className="viewSummary-table MathEditor-table"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      </div>
    </div>
  )
}

export default FunctionEditor
