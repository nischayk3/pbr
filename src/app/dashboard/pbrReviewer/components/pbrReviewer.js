import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import Highlighter from 'react-highlight-words';
import { Card, Table, Button, Col, Row, Checkbox, Input, Space, Affix, Select } from 'antd';
import { getPbrReviewerData, updateApprove, getPieChartData, geTemplateDropdown } from '../../../../services/pbrService'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import Signature from "../../../../components/ElectronicSignature/signature";
import Plot from 'react-plotly.js';
import './styles.scss'
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
const { Search } = Input;

function PbrReviewer() {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([])
  const [searchedColumn, setSearchedColumn] = useState('');
  const [arr, setArr] = useState([]);
  const [searchedLanding, setSearchedLanding] = useState(false);
  const [approveReject, setApproveReject] = useState("");
  const [filterTableLanding, setFilterTableLanding] = useState(null);
  const [isPublish, setIsPublish] = useState(false);
  const [statusreq, setStatusReq] = useState({});
  const [pieChartData, setPieChartData] = useState([0, 0]);
  const [pieChartData1, setPieChartData1] = useState([0, 0, 0]);
  const [searchText, setSearchText] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [showResetConfidence, setShowResetConfidence] = useState(false);
  const [templateArray, setTemplateArray] = useState([]);
  const [selectedTemplateArray, setSelectedTemplateArray] = useState([]);
  const [reviewerReq, setReviewerReq] = useState({
    confidence: null,
    createdBy: null,
    id: null,
    limit: null,
    status: null,
    template_id: []
  });

  let [filteredData] = useState();

  const history = useHistory();
  useEffect(() => {
    cardTableData()
    getTemplateID()
  }, []);
  const cardTableData = async (val) => {
    try {
      dispatch(showLoader());
      let req = {
        ...reviewerReq,
        template_id: selectedTemplateArray
      }
      const tableResponse = await getPbrReviewerData(val ? val : req);
      if (tableResponse['status-code'] === 200) {
        setTemplateData(tableResponse.Data);
        dispatch(hideLoader());
      }
      /* istanbul ignore next */
      else if (tableResponse['status-code'] === 404) {
        dispatch(hideLoader());
        setTemplateData(tableResponse.Data);
        dispatch(showNotification('error', tableResponse.Message));
        /* istanbul ignore next */
      } else {
        dispatch(hideLoader());
      }
    }
    /* istanbul ignore next */
    catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.Message));
    }
  };

  const getTemplateID = async () => {
    dispatch(showLoader());
    try {
      let res = await geTemplateDropdown()
      if (res['status-code'] == 200) {
        setTemplateArray(res?.Data)
        dispatch(hideLoader());
      } else {
        dispatch(hideLoader());
        dispatch(showNotification('error', res.Message));
      }
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.Message));
    }
  }

  const showfilterData = async (value) => {
    dispatch(showLoader());
    setShowReset(true)
    let obj = {
      ...reviewerReq, status: value.toLowerCase(), template_id: selectedTemplateArray
    }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);
    setReviewerReq(obj)
    dispatch(hideLoader());
  };
/* istanbul ignore next */
  const showfilters = async (value) => {
    dispatch(showLoader());
    setShowResetConfidence(true)
    let obj = {
      ...reviewerReq, confidence: value, template_id: selectedTemplateArray
    }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);
    setReviewerReq(obj)
    dispatch(hideLoader());

  };

  const updateStatus = (e, record) => {
    let resp = [...arr];
    if (resp.includes(record.id)) {
      const newArr = resp.filter(e => e !== record.id)
      setArr(newArr);
    } else {
      resp.push(record.id);
      setArr(resp);
    }


  };
  /* istanbul ignore next */
  const eSignId = async (esign) => {
    dispatch(showLoader());
    let login_response = JSON.parse(localStorage.getItem('login_details'));
    let req = {
      changed_by: login_response?.email_id,
      id: arr,
      recorded_date: null,
      recorded_time: null,
      snippet_value: null,
      status: "approved",
      uom: null
    }
    if (esign) {
      let res = await updateApprove(req)

      if (res.Status == "202") {
        dispatch(hideLoader());
        dispatch(showNotification("success", "Approved Successfully")),


          setTimeout(() => window.location.reload(),
            1000
          );
      }
    }

  };
  /* istanbul ignore next */
  const handleClose = () => {
    setIsPublish(false);
  };
  /* istanbul ignore next */
  const showApproved = async () => {
    setIsPublish(true);
    setApproveReject("A");
  };

  const chart = async (val) => {
    let req = { key: "status", id: selectedTemplateArray }
    let obj = await getPieChartData(val ? val : req);
    let jsondata = obj.Data;
    let approved = 0
    let unapproved = 0
    jsondata.forEach(item => {
      if (item.status == "approved") {
        approved = item.count
      } else if (item.status == "unapproved") {
        unapproved = item.count
      }
    })
    setPieChartData([approved, unapproved]);

  };


  const chart1 = async (val) => {
    let req = { key: "confidence", id: selectedTemplateArray }
    let obj = await getPieChartData(val ? val : req);
    let jsondata = obj.Data;
    let High = 0
    let Medium = 0
    let Low = 0
    jsondata.forEach(item => {
      if (item.confidence == "High") {
        High = item.count
      } else if (item.confidence == "Low") {
        Low = item.count
      } else if (item.confidence == "Medium") {
        Medium = item.count
      }
    })
    setPieChartData1([High, Medium, Low]);
  };

  let appchart1 = [{
    values: pieChartData1,
    labels: ["High", "Medium", "Low"],
    marker: {
      colors: ['#2ca02c', '#ff7f0e', '#1f77b4'],
      line: {
        color: 'white',
        width: 2
      },
      layout: {

        x: 1,
        xanchor: 'right',
        y: 1

      }

    },
    hole: .7,
    type: 'pie',
  }]

  let appchart = [{
    values: pieChartData,
    labels: ["Approved", "Unapproved"],
    marker: {
      colors: ['#2ca02c', '#ff7f0e'],
      line: {
        color: 'white',
        width: 2
      },
      layout: {
        x: 1,
        xanchor: 'right',
        y: 1
      }
    },
    hole: .7,
    type: 'pie',

  }]

  useEffect(() => {
    chart();
    chart1();
  }, []);
  /* istanbul ignore next */
  const columns2 = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
      width: "5%"
    },
    {
      title: 'Template Id',
      key: 'template_id',
      dataIndex: 'template_id',
      ...getColumnSearchProps('template_id'),
      sorter: (a, b) => {
        return a.template_id === null ||
          a.template_id === undefined ||
          a.template_id === ""
          ? -1
          : b.template_id == null ||
            b.template_id == undefined ||
            b.template_id == ""
            ? 1
            : a.template_id.toString().localeCompare(b.template_id);
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Template Name',
      key: 'template_name',
      dataIndex: 'template_name',
      ...getColumnSearchProps('template_name'),
      sorter: (a, b) => {
        return a.template_name === null ||
          a.template_name === undefined ||
          a.template_name === ""
          ? -1
          : b.template_name == null ||
            b.template_name == undefined ||
            b.template_name == ""
            ? 1
            : a.template_name.toString().localeCompare(b.template_name);
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Parameter Name',
      key: 'param_name',
      dataIndex: 'param_name',
      ...getColumnSearchProps('param_name'),
      sorter: (a, b) => {
        return a.param_name === null ||
          a.param_name === undefined ||
          a.param_name === ""
          ? -1
          : b.param_name == null ||
            b.param_name == undefined ||
            b.param_name == ""
            ? 1
            : a.param_name.toString().localeCompare(b.param_name);
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Attribute Name',
      key: 'anchor_key',
      dataIndex: 'anchor_key',
      ...getColumnSearchProps('anchor_key'),
      sorter: (a, b) => a.anchor_key?.length - b.anchor_key?.length,
      sortDirections: ['descend', 'ascend'],
    },

    {
      title: 'Value',
      key: 'snippet_value',
      dataIndex: 'snippet_value',
      ...getColumnSearchProps('snippet_value'),
      sorter: (a, b) => a.snippet_value?.length - b.snippet_value?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Snippet Value',
      key: 'snippet_image',
      dataIndex: 'snippet_image',
      render: (text, record, index) => {
        return (
          <img src={`data:image/png;base64,${text}`} width="130px" height="40px" />
        )
      }
    },
    {
      title: 'Confidence',
      key: 'confidence',
      dataIndex: 'confidence',
      ...getColumnSearchProps('confidence'),
      sorter: (a, b) => a.confidence?.length - b.confidence?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'File Path',
      key: 'file_path',
      dataIndex: 'file_path',
      // width:"17%",
      ...getColumnSearchProps('file_path'),
      sorter: (a, b) => a.file_path?.length - b.file_path?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a.status?.length - b.status?.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => {
        if (record.status == "approved") {
          return record.status;
        }
        else {
          return (
            <Checkbox
              onChange={(e) => { updateStatus(e, record) }}
            />


          )
        }
      }

    },
    {
      title: 'Site',
      key: 'site_code',
      dataIndex: 'site_code',
      ...getColumnSearchProps('site_code'),
      sorter: (a, b) => a.site_code - b.site_code,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Product',
      key: 'product_num',
      dataIndex: 'product_num',
      ...getColumnSearchProps('product_num'),
      sorter: (a, b) => a.product_num - b.product_num,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Batch',
      key: 'batch_num',
      dataIndex: 'batch_num',
      ...getColumnSearchProps('batch_num'),
      sorter: (a, b) => a.batch_num - b.batch_num,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'created By',
      key: 'created_by',
      dataIndex: 'created_by',
      // width:"10%",
      ...getColumnSearchProps('created_by'),
      sorter: (a, b) => a.created_by?.length - b.created_by?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record, index) => {
        return (
          <a
            style={{ color: "#1890ff" }}
            onClick={() => {
              window.open(`/#/dashboard/pbr_update?id=${record.id}`)
            }}

          >
            Review
          </a>
        )
      }
    },
  ]
  /* istanbul ignore next */
  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(
                e.target.value ? [e.target.value] : []
              )
            }
            onPressEnter={() =>
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type='primary'
              onClick={() =>
                handleSearch(selectedKeys, confirm, dataIndex)
              }
              icon={<SearchOutlined />}
              size='small'
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size='small'
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type='link'
              size='small'
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{ color: filtered ? '#1890ff' : undefined }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };

  };
  /* istanbul ignore next */
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }
  /* istanbul ignore next */
  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }

  const landingSearch = value => {
    if (value == "") {
      setFilterTableLanding(null);
    } else {
      setSearchedLanding(true);
      const tableData = templateData;
      const newArray = tableData.map(({ created_on, changed_on, snippet_image, recorded_date, recorded_time, ...keepAttrs }) => keepAttrs)
      const filterTable = newArray.filter(o =>
        Object.keys(o).some(k => {
          return String(o[k]).toLowerCase().includes(String(value).toLowerCase())
        }
        )
      );
      setFilterTableLanding(filterTable);
    }

  };
/* istanbul ignore next */
  const resetConfidence = async () => {
    dispatch(showLoader());
    let obj = { ...reviewerReq, confidence: null }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);
    setReviewerReq(obj)
    setShowResetConfidence(false)
    dispatch(hideLoader());

  }
  const resetStatus = async () => {
    dispatch(showLoader());
    let obj = { ...reviewerReq, status: null }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);
    setReviewerReq(obj)
    setShowReset(false)
    // setShowResetConfidence(false)
    //cardTableData()
    dispatch(hideLoader());

  }
/* istanbul ignore next */
  const handleTemplateChange = (val) => {
    if (val.length == 0) {
      let req = { ...reviewerReq, template_id: [] }
      let req1 = { key: "status", id: [] }
      let req2 = { key: "confidence", id: [] }
      cardTableData(req)
      chart(req1)
      chart1(req2)
    }
    setSelectedTemplateArray(val)
  }
  /* istanbul ignore next */
  const applyTemplateFilter = () => {
    cardTableData()
    chart()
    chart1()
  }

  return (
    <>
      <BreadCrumbWrapper />
      <div className='custom-wrapper'>
        <div className='custom-content-layout' style={{ overflowY: "hidden" }}>
          <div className="background"
          // style={{
          //   display: 'block', width: '100%',
          //   padding: 30, height: 220,
          //   scrollBehavior: 'auto'
          // }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Card className="review-card1" >
                  <div id="my-div" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 150 }}>
                    <h3 className="status_pos">Status</h3>
                    {showReset && (
                      <p className="status-approved" onClick={resetStatus}>Reset</p>
                    )}
                    <Plot
                      data={appchart}
                      onClick={(e) => showfilterData(e.points[0].label)}
                      layout={{
                        showlegend: true,
                        legend: {
                          x: 1.3,
                          xanchor: 'left',
                          y: 0.5

                        }, paper_bgcolor: "rgba(0,0,0,0)", width: 390, title: ''
                      }} />

                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="review-card2">
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 150 }}>
                    <h3 className="status_pos">Confidence</h3>
                    {showResetConfidence && (
                      <p className="status-confi" onClick={resetConfidence}>Reset</p>
                    )}

                    <Plot
                      data={appchart1}
                      onClick={(e) => showfilters(e.points[0].label)}
                      layout={{
                        showlegend: true,
                        legend: {
                          x: 1.3,
                          y: 0.5

                        }, paper_bgcolor: "rgba(0,0,0,0)", width: 350, title: ''
                      }} />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
          <div className='review-wrapper'>
            <div className='content_section' style={{ height: "100vh" }} >
              <div className="scrollable-container" >
                <div>
                  <Row justify="space-around" align="middle">
                    <Col span={16}>
                      <Search
                        className='dashboard-search'
                        placeholder='Search by template ID, name, creator or date of creation'
                        allowClear
                        enterButton='Search'
                        size='large'
                        icon={<SearchOutlined />}
                        onSearch={landingSearch}
                      />
                    </Col>
                    <Col span={4} >
                      <Select mode='multiple' maxTagCount={1} id="templateDrop" placeholder="Select Template ID" allowClear options={templateArray} onChange={handleTemplateChange} style={{ width: 160, marginLeft: 25 }} />
                    </Col>
                    <Col span={2} >
                      <Button id="applyFilter" style={{
                        margin: "7px 20px",
                        right: 8,
                        borderRadius: "5px",
                        textTransform: "none",
                        background: "#ffffff",
                        borderColor: "#303f9f",
                        color: "#303f9f"

                      }}
                        onClick={applyTemplateFilter}
                        disabled={selectedTemplateArray?.length == 0 ? true : false}
                      >Apply</Button>
                    </Col>
                    <Col span={2} >
                      <Button id="pbr-approve" style={{
                        margin: "7px 20px",
                        right: 8,
                        borderRadius: "5px",
                        textTransform: "none",
                        background: "#ffffff",
                        borderColor: "#303f9f",
                        color: "#303f9f"

                      }}
                        onClick={showApproved}
                        disabled={arr?.length == 0 ? true : false}
                      >Approve</Button>
                    </Col>
                  </Row>
                </div>
                <div >
                  <Table
                    columns={columns2}
                    className="pbr_reviewer_table"
                    dataSource={filterTableLanding === null
                      ? templateData
                      : filterTableLanding}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '50', '100', '200'] }}
                    scroll={{
                      x: 2300,
                      y: 'calc(100vh - 443px)',
                    }}
                    style={{ border: '1px solid #ececec', borderRadius: '2px' }}
                  />

                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
      <Signature
        isPublish={isPublish}
        status={approveReject}
        handleClose={handleClose}
        eSignId={eSignId}
        screenName="Pbr Creation"
        appType="PBR"
      />
    </>
  )
}

export default PbrReviewer