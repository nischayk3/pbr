import React, { useState } from 'react'
import { Table } from 'antd'

import './styles.scss'

const dataSource = [
  {
    key: '1',
    chartId: 'Exclusion/Shift/Trend',
    IdName: '',
  },
  {
    key: '2',
    chartId: 'Rule Violation',
    IdName: '',
  },
  {
    key: '3',
    chartId: 'Parameters',
    IdName: '',
  },
  {
    key: '4',
    chartId: 'Exclusions',
    IdName: '',
  },
]

const columns = [
  {
    title: 'Chart ID',
    dataIndex: 'chartId',
    key: 'chartId',
  },
  {
    title: 'ID Name',
    dataIndex: 'IdName',
    key: 'IdName',
  },
  Table.SELECTION_COLUMN,
]

function ReportDesignerChartTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys)
    setSelectedRowKeys(selectedRowKeys)
  }

  const rowSelection = {
    order: 2,
    selectedRowKeys,
    onChange: onSelectChange,
    columnTitle: 'Multi Select',
  }

  return (
    <div className="reportDesigner-ChartTableBlock">
      <Table
        rowSelection={rowSelection}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}

export default ReportDesignerChartTable
