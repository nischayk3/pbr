import React, { useState } from 'react'
import './Limitconfig.scss'
import { Table, Button } from 'antd'
import LimitInputs from './LimitInputs';

const LimitTable = () => {

  const [editTable, setEditTable] = useState(false)

  const columns = [
    {
      title: 'Molecule',
      dataIndex: 'molecule',
      key: 'molecule',
      width: 1000
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => {
        return (
          <div className='action-table'>
            {!editTable && <a onClick={() => setEditTable(!editTable)}>Edit</a> }
            {editTable && <a onClick={() => setEditTable(!editTable)}>Save</a> }
            <a>Delete</a>
          </div>
        )
      },
    },
  ];

  const data = [
    {
      key: 1,
      molecule: 'Belactpet',
    },
    {
      key: 2,
      molecule: 'Elixr',
    },
    {
      key: 3,
      molecule: 'TestinKp',
    },
    {
      key: 4,
      molecule: 'Belactpet',
    },
  ];

  return (
    <div className='limit-container'>
      <div className="landing-search-wrapper">
        <div className="landing-card">
          <Table
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => <LimitInputs editTable={editTable} />,
              rowExpandable: (record) => record.name !== 'Not Expandable',
              expandRowByClick: true
            }}
            // expandRowByClick={true}
            dataSource={data}
          />
        </div>
      </div>
    </div>
  )
}

export default LimitTable