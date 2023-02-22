import React, { useState, useEffect, useRef } from 'react'
import './Limitconfig.scss'
import { Table, Button, Dropdown, Space, Select, Upload, Popconfirm } from 'antd'
import { DownOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { getLimitConfig, saveLimitConfigApi, deleteLimitsApi, getMoleculeData, uploadLimitConfig } from '../../../../services/limitConfig';
import LimitInputs from './LimitInputs';
import { useDispatch } from "react-redux";
import { getMoleculeList, } from '../../../../services/viewCreationPublishing';
import { hideLoader, showNotification, showLoader } from '../../../../duck/actions/commonActions';

const LimitTable = () => {

  const dispatch = useDispatch();
  const [editTable, setEditTable] = useState(false)
  const [openRow, setOpenRow] = useState();
  const [moleculeData, setMoleculeData] = useState([]);
  const [limitsData, setLimitsData] = useState([]);
  const [moleculeList, setMoleculeList] = useState([])
  const [siteList, setSiteList] = useState([]);
  const [parameterList, setParameterList] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const selectedMol = useRef('');
  const totalViewList = useRef([]);

  const handleInternalChange = async (info) => {
    var formData = new FormData();
    formData.append('file_name', info?.fileList[0]?.originFileObj);
    let res = await uploadLimitConfig(formData)
    if (res.status === 200) {
      getLimitConfigApi();
	  setFileList(info.fileList)
      setOpenRow('')
    } else {
		dispatch(showNotification("error", res?.Message));
	}
  }

  const items = [
    {
      label: <div><DownloadOutlined />  &nbsp;
        <a
		  onClick={(e) => e.stopPropagation()}
          style={{ color: 'black' }}
          href={require('../../../../assets/xlsx/chartLimit.xlsx')}
          download='chartLimit.xlsx'>
          Download template
        </a>
      </div>,
      key: '0',
    },
    {
      label:
        <div onClick={(e) => e.stopPropagation()}>
          <Upload
            name="file"
            fileList={fileList}
            accept=".xls, .xlsx"
            beforeUpload={() => false}
            onChange={handleInternalChange}
            onClick={(e) => e.stopPropagation()}
          >
            <UploadOutlined /> &nbsp; Upload filled template
          </Upload>
        </div>,
      key: '1',
    },
  ];


  const handleChange = (index, event) => {
    const rowsInput = [...moleculeData];
    rowsInput[index]['molecule'] = event;
    rowsInput[index]['paramData']?.forEach((param) => {
      param.molecule = event
    })
    getMoleData('site', event, '')
    getMoleData('view', event, '')
    selectedMol.current = event
    setMoleculeData(rowsInput);
  };

  const columns = [
    {
      title: 'Molecule',
      dataIndex: 'molecule',
      key: 'molecule',
      width: 800,
      render: (text, record) =>
        moleculeData.map((data, index) => {
          if (record.key === data.key) {
            if (record.key === openRow) {
              return (
                <Select
                  name="molecule"
                  style={{ width: '70%' }}
                  options={moleculeList}
                  value={data.molecule}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleChange(index, e)}
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
            {(record.key === openRow) && <a onClick={(e) => saveParammeterData(e)}>Save</a>}
            <Popconfirm
              title="Are you sure to delete?"
              description="Are you sure to delete?"
              onConfirm={(e) => {
                e.stopPropagation();
                onDelete(e, record)
              }}
              okText="Yes"
              cancelText="No"
			        onCancel={(e) => e.stopPropagation()}
            >
              <a href="#" onClick={(e) => e.stopPropagation()}>Delete</a>
            </Popconfirm>
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
          param.parameter_class = param.parameter_class ? param.parameter_class : [];
        })
      });
      setMoleculeData(tempMoleculeArray)
      dispatch(hideLoader());
    } catch (error) {
      /* istanbul ignore next */
      dispatch(hideLoader());
      /* istanbul ignore next */
      dispatch(showNotification("error", error));
    }
  }


  const handleVersionList = (viewId) => {
    let tempVersionList = [];
    totalViewList.current.forEach((view) => {
      if (view?.split('-')[0] === viewId) {
        const viewVersion = view?.split('-')[1]
        tempVersionList.push(viewVersion);
      }
    });
    tempVersionList = [...new Set(tempVersionList)]
    return tempVersionList
  }

  const getMoleculeLists = async () => {
    let req = {
      data: {},
      parameters: {},
    };
    let molecule_list = await getMoleculeList(req);
    if ((molecule_list?.Status === 200) && molecule_list?.Data && molecule_list?.Data?.hierarchy) {
      let tabs_list_data = molecule_list.Data.hierarchy
      let tabs_list_array = []
      tabs_list_data.forEach(v => {
        tabs_list_array.push({
          value: v.ds_name,
          label: v.ds_name,
        })
      });
      setMoleculeList(tabs_list_array)
    } else {
      dispatch(showNotification("error", molecule_list));
    }
  };

  const onDelete = (e, record) => {
    e.stopPropagation()
    deleteMolecule(record)
  }

  const deleteMolecule = async (record) => {
    const obj = {
      data: []
    }
    record?.paramData?.forEach((param) => {
      obj.data.push(param?.int_id)
    })
    if (record?.added) {
      const deleteExisting = moleculeData.filter((mol) => mol.key !== record.key)
      setMoleculeData(deleteExisting)

      return;
    }
    try {
      dispatch(showLoader());
      const apiResponse = await deleteLimitsApi(obj);
      if (apiResponse.Status === 200) {
        getLimitConfigApi();
      }
      dispatch(hideLoader());
    } catch (error) {
      /* istanbul ignore next */
      dispatch(hideLoader());
      /* istanbul ignore next */
      dispatch(showNotification("error", error));
    }
  }

  const saveParammeterData = async (e) => {
    e.stopPropagation()
    const tempLimitData = JSON.parse(JSON.stringify(limitsData))
    let flag = false;
    tempLimitData.forEach((limits) => {
      if (Number(limits.from_) && Number(limits.to_)) {
        if (Number(limits.from_) >= Number(limits.to_)) {
          flag = true;
          dispatch(
            showNotification(
              "error",
              "Lower limits should be less than upper limit"
            )
          );
        }
      } else {
        flag = true;
        dispatch(
          showNotification(
            "error",
            "Both upper and lower limits should present"
          )
        );
      }
      limits.from_ = Number(limits?.from_);
      limits.to_ = Number(limits?.to_);
      limits.molecule = selectedMol.current
      limits.view_version = Number(limits?.view_version)
      limits.validity_date = limits.validity_date ? new Date(limits.validity_date).toISOString() : null
    })
    if (flag) {
      return;
    }
    const data = {
      data: tempLimitData
    }
    try {
      dispatch(showLoader());
      const apiResponse = await saveLimitConfigApi(data);
      if(apiResponse?.Status === 200) {
        getLimitConfigApi();
        setOpenRow('')
        dispatch(hideLoader());
      } else {
        dispatch(showNotification("error", apiResponse?.detail));
        dispatch(hideLoader());
      }
      
    } catch (error) {
      /* istanbul ignore next */
      dispatch(hideLoader());
      /* istanbul ignore next */
      dispatch(showNotification("error", error));
    }
  }

  const onEdit = (e, rowKey) => {
    if (editTable) {
      e.stopPropagation();
    }
    setOpenRow(rowKey)
  }

  const getMoleData = async (param, paramData, view) => {
    const obj = {
      populate: param,
      ds_name: paramData,
      site: '',
      "view-id": view ? view : undefined
    }
    try {
      dispatch(showLoader());
      const apiResponse = await getMoleculeData(obj);
      let tempArr = []
      let tempParam = []
      let tempViewList = []
      if (apiResponse?.status === 200) {
        apiResponse?.data.forEach((siteData) => {
          if (param === 'site') {
            tempArr.push(siteData.site_code)
          } else if (param === 'parameter') {
            tempParam.push(siteData?.parameter)
          } else {
            tempViewList.push(siteData?.view_id?.split('-')[0])
            tempViewList = [...new Set(tempViewList)]
            totalViewList.current.push(siteData?.view_id)
          }
        })
        if (param === 'site') {
          setSiteList(tempArr)
        } else if (param === 'parameter') {
          setParameterList(tempParam)
        } else {
          setViewList(tempViewList)
        }
      }
      const tempMol = [...moleculeData]
      tempMol.forEach((ele) => {
        ele.paramData.forEach((item) => {
          item.versionList = handleVersionList(item?.view_disp_id)
        })
      })
      setMoleculeData(tempMol)
      if (param === 'parameter') {
        const tempLimit = [...limitsData]
        tempLimit.forEach((ele) => {
          ele.param_list = tempParam
        })
        setLimitsData(tempLimit)
      }
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      console.log(error, 'error')
      // dispatch(showNotification("error", error));
    }
  }

  const addMolecule = () => {
    const newData = {
      key: moleculeData?.length + 1,
      molecule: '',
      paramData: [],
      added: true
    }
    setMoleculeData([...moleculeData, newData]);
  }

  useEffect(() => {
    getLimitConfigApi();
    getMoleculeLists();
  }, [])



  return (
    <div className='limit-container'>
      <div className="landing-search-wrapper-limit" style={{ width: '100%'}}>
        <div className="landing-card-limit">
          <Button className='add-molec-button custom-primary-btn' onClick={addMolecule}>Add Molecule</Button>
          <Table
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: (record) => <LimitInputs getMoleData={getMoleData} siteList={siteList} totalViewList={totalViewList} viewList={viewList} selectedMol={selectedMol} parameterList={parameterList} limitsData={limitsData} setLimitsData={setLimitsData} paramData={record.paramData} editTable={editTable} selectedRowKey={record.key} openRow={openRow} />,
              // rowExpandable: (record) => record.key === openRow,
              expandRowByClick: true,
              onExpand: (expanded, record) => {
                if (!expanded) {
                  setEditTable(false)
                  setOpenRow('');
                } else {
                  getMoleData('site', record?.molecule, '')
                  getMoleData('view', record?.molecule)
                  selectedMol.current = record?.molecule
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