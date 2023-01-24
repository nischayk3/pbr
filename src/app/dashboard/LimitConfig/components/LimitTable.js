import React, { useState } from 'react'
import './Limitconfig.scss'
import { Table, Button, Dropdown, Space, Select } from 'antd'
import { DownOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import SelectField from "../../../../components/SelectField/SelectField";
import LimitInputs from './LimitInputs';

const LimitTable = () => {

  const [editTable, setEditTable] = useState(false)
  const [openRow, setOpenRow] = useState();
  const items = [
    {
      label: <div><DownloadOutlined />  &nbsp; Download template</div>,
      key: '0',
    },
    {
      label: <div><UploadOutlined /> &nbsp; Upload filled template</div>,
      key: '1',
    },
  ];

  const data = [
    {
      key: 1,
      molecule: 'Elixr-1',
    },
    {
      key: 2,
      molecule: 'Elixr-2',
    },
    {
      key: 3,
      molecule: 'TestinKp',
    },
    {
      key: 4,
      molecule: 'Elixr-3',
    },
  ];

  const molList = [
    {
      value: 'Elixr-1',
      label: 'Elixr-1',
    },
    {
      value: 'Elixr-2',
      label: 'Elixr-2',
    },
    {
      value: 'Elixr-3',
      label: 'Elixr-3',
    },
    {
      value: 'TestinKp',
      label: 'TestinKp',
    }
  ]

  const columns = [
    {
      title: 'Molecule',
      dataIndex: 'molecule',
      key: 'molecule',
      width: 1000,
      render: (text, record) =>
        data.map((data, index) => {
          if (record.key === data.key) {
            if (record.key === openRow) {
              return (
                <Select
                  name="molecule"
                  style={{width: '70%'}}
                  options={molList}
                  value={data.molecule}
                  onClick={(e) => e.stopPropagation()}
                  // onChangeSelect={(e) => handleChange(index, e, "", "limitType")}
                />
              );
            } else {
              return <p style={{ margin: "0" }}>{data.molecule}</p>;
            }
          }
        }),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => {
        return (
          <div className='action-table'>
            {(record.key !== openRow) && <a onClick={(e) => onEdit(e, record.key)}>Edit</a>}
            {(record.key === openRow) && <a onClick={() => setOpenRow('')}>Save</a>}
            <a onClick={(e) => e.stopPropagation()}>Delete</a>
            {(record.key === openRow) && <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.stopPropagation()}>
                <Space>
                  More
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>}
          </div>
        )
      },
    },
  ];

  const onEdit = (e, rowKey) => {
    if (editTable) {
      e.stopPropagation();
    }
    setOpenRow(rowKey)
  }

  return (
    <div className='limit-container'>
      <div className="landing-search-wrapper">
        <div className="landing-card">
          <Table
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => <LimitInputs editTable={editTable} selectedRowKey={record.key} openRow={openRow} />,
              // rowExpandable: (record) => record.name !== 'Not Expandable',
              expandRowByClick: true,
              onExpand: (expanded, record) => {
                if (!expanded) {
                  setEditTable(false)
                  setOpenRow('');
                } else {
                  setEditTable(true)
                }
              }
            }}
            // expandRowByClick={true}
            dataSource={data}
            rowKey={(record) => record.key}
          />
        </div>
      </div>
    </div>
  )
}

export default LimitTable