import React, { useState, useEffect } from 'react'
import './Limitconfig.scss'
import { Table, Button, Dropdown, Space, Select } from 'antd'
import { DownOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { getLimitConfig, saveLimitConfigApi } from '../../../../services/limitConfig';
import LimitInputs from './LimitInputs';
import { useDispatch } from "react-redux";
import { hideLoader, showNotification, showLoader } from '../../../../duck/actions/commonActions';

const LimitTable = () => {

  const dispatch = useDispatch();
  const [editTable, setEditTable] = useState(false)
  const [openRow, setOpenRow] = useState();
  const [moleculeData, setMoleculeData] = useState([]);
  const [limitsData, setLimitsData] = useState([]);

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
        moleculeData.map((data, index) => {
          if (record.key === data.key) {
            if (record.key === openRow) {
              return (
                <Select
                  name="molecule"
                  style={{ width: '70%' }}
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
            {(record.key === openRow) && <a onClick={() => saveParammeterData()}>Save</a>}
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


  const getLimitConfigApi = async () => {
    try {
      dispatch(showLoader());
      const apiResponse = await getLimitConfig({});
      const tempMoleculeArray = [];
      Object.entries(apiResponse?.Data).forEach(([key, value], index) => {
        const obj = {
          key: index + 1,
          molecule: key,
          paramData: value
        }
        tempMoleculeArray.push(obj);
      })
      tempMoleculeArray?.forEach((ele) => { 
        ele?.paramData.forEach((param, index) => {
           param.key = index + 1
        })
      });
      setMoleculeData(tempMoleculeArray)
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification("error", error));
    }
  }

  const saveParammeterData = async () => {
		const data = {
			data: limitsData
		}
		try {
			dispatch(showLoader());
			const apiResponse = await saveLimitConfigApi(data);
			// const tempParamData = limitsData.filter((limit) => limit?.int_id !== int_id)
			// setLimitsData(tempParamData)
			console.log(apiResponse, 'api');
      setOpenRow('')
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

  const onEdit = (e, rowKey) => {
    if (editTable) {
      e.stopPropagation();
    }
    setOpenRow(rowKey)
  }

  useEffect(() => {
    getLimitConfigApi();
  }, [])



  return (
    <div className='limit-container'>
      <div className="landing-search-wrapper">
        <div className="landing-card">
          <Table
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => <LimitInputs limitsData={limitsData} setLimitsData={setLimitsData} paramData={record.paramData} editTable={editTable} selectedRowKey={record.key} openRow={openRow} />,
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
            dataSource={moleculeData}
            rowKey={(record) => record.key}
          />
        </div>
      </div>
    </div>
  )
}

export default LimitTable