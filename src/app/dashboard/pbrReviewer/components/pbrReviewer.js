import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import Highlighter from 'react-highlight-words';
import { Card, Table, Button, Col, Row, Checkbox, Input, Space } from 'antd';
import { getPbrReviewerData, updateApprove } from '../../../../services/pbrService'
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
  const [pieChartData, setPieChartData] = useState([0, 0]);
  const [pieChartData1, setPieChartData1] = useState([0, 0, 0]);
  const [searchText, setSearchText] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [showResetConfidence, setShowResetConfidence] = useState(false);
  let [filteredData] = useState();

  const history = useHistory();
  useEffect(() => {
    cardTableData()
  }, []);
  const cardTableData = async () => {
    let req = ``
    try {
      dispatch(showLoader());
      const tableResponse = await getPbrReviewerData(req);
      if (tableResponse['status-code'] === 200) {
        setTemplateData(tableResponse.Data);
        dispatch(hideLoader());
      }
      else if (tableResponse['status-code'] === 404) {
        dispatch(hideLoader());
        setTemplateData(tableResponse.Data);
        dispatch(showNotification('error', tableResponse.Message));
      }
    }
    catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.Message));
    }
  };

  const showfilterData = async (value) => {
    setShowReset(true)
    let obj = { status: value.toLowerCase() }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);
  };

  const showfilters = async (value) => {
    setShowResetConfidence(true)
    let obj = { confidence: value.toLowerCase() }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);


  };

  const updateStatus = (e, record) => {

    let resp = [...arr];
    resp.push(record.id);
    setArr(resp);

  };
  const eSignId = async (esign) => {
    console.log("esign", esign);
    let req = {
      id: arr,
      recorded_date: "",
      recorded_time: "",
      snippet_value: "",
      status: "approved",
      uom: ""
    }
    if (esign) {
      let res = await updateApprove(req)

      if (res.Status == "202") {

        dispatch(showNotification("success", "Approved Successfully")),
          dispatch(showLoader());

        setTimeout(() => window.location.reload(),
          1000
        );
      }
    }

  };
  const handleClose = () => {
    setIsPublish(false);
  };

  const showApproved = async () => {

    setIsPublish(true);
    setApproveReject("A");
    // let req = {
    //   id: arr,
    //   recorded_date: "",
    //   recorded_time: "",
    //   snippet_value: "",
    //   status: "approved",
    //   uom: ""
    // }
    // let res = await updateApprove(req)

    // if (res.Status == "202") {

    //   dispatch(showNotification("success", "Approved Successfully")),
    //     dispatch(showLoader());

    //   setTimeout(() => window.location.reload(),
    //     1000
    //   );
    // }

  };




  const chart = async (res) => {

    let obj = await getPbrReviewerData(res);

    let jsondata = obj.Data;
    let unappcount = 0;
    jsondata.forEach(item => {
      if (item.status === "unapproved") {
        unappcount++;
      }
    });

    let appcount = 0;
    jsondata.forEach(item => {
      if (item.status === "approved") {
        appcount++;
      }
    });

    setPieChartData([unappcount, appcount]);

  };


  const chart1 = async (res) => {



    let obj = await getPbrReviewerData(res);

    let jsondata = obj.Data;
    let highcount = 0;
    jsondata.forEach(item => {
      if (item.confidence === "high") {

        highcount++;

      }

    });



    let medcount = 0;
    jsondata.forEach(item => {
      if (item.confidence === "medium") {
        medcount++;
      }

    });

    let lowcount = 0;
    jsondata.forEach(item => {
      if (item.confidence === "low") {
        lowcount++;
      }

    });

    setPieChartData1([lowcount, medcount, highcount]);
  };
  let appchart1 = [{
    values: pieChartData1,
    labels: ["Low", "Medium", "High"],
    marker: {
      colors: ['#1f77b4', '#ff7f0e', '#2ca02c'],
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
    labels: ["Unapproved", "Approved"],
    marker: {
      colors: ['#ff7f0e', '#2ca02c'],
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
    type: 'pie',
    hole: .7,

  }]

  useEffect(() => {

    chart();
    chart1();

  }, []);

  const columns2 = [

    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Attribute Name',
      key: 'anchor_key',
      dataIndex: 'anchor_key',
      ...getColumnSearchProps('anchor_key'),
      sorter: (a, b) => a.anchor_key.length - b.anchor_key.length,
      sortDirections: ['descend', 'ascend'],
    },

    {
      title: 'Value',
      key: 'snippet_value',
      dataIndex: 'snippet_value',
      ...getColumnSearchProps('snippet_value'),
      sorter: (a, b) => a.snippet_value.length - b.snippet_value.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Snippet Value',
      key: 'snippet_image',
      dataIndex: 'snippet_image',
      ...getColumnSearchProps('snippet_image'),
      sorter: (a, b) => a.snippet_image.length - b.snippet_image.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => {
        return (
          <img src={`data:image/png;base64,${text}`} width="80%" height="80%" />
        )
      }
    },
    {
      title: 'Confidence',
      key: 'confidence',
      dataIndex: 'confidence',
      ...getColumnSearchProps('confidence'),
      sorter: (a, b) => a.confidence - b.confidence,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'File Path',
      key: 'file_path',
      dataIndex: 'file_path',
      ...getColumnSearchProps('file_path'),
      sorter: (a, b) => a.file_path.length - b.file_path.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a.status.length - b.status.length,
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
      sorter: (a, b) => a.site_code.length - b.site_code.length,
      sortDirections: ['descend', 'ascend'],
    },



    {
      title: 'Product',
      key: 'product_num',
      dataIndex: 'product_num',
      ...getColumnSearchProps('product_num'),
      sorter: (a, b) => a.product_num.length - b.product_num.length,
      sortDirections: ['descend', 'ascend'],
      // render: (text, record, index) => {
      //   return (
      //     <a
      //       style={{ color: "#1890ff" }}
      //       onClick={() => {
      //         history.push(`/dashBoard/pbr_update?id=${record.id}`);
      //       }}

      //     >
      //       {text}
      //     </a>
      //   )
      // }
    },
    {
      title: 'Batch',
      key: 'batch_num',
      dataIndex: 'batch_num',
      ...getColumnSearchProps('batch_num'),
      sorter: (a, b) => a.batch_num.length - b.batch_num.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Updated by',
      key: 'username',
      dataIndex: 'username',
      ...getColumnSearchProps('username'),
      sorter: (a, b) => a.username.length - b.username.length,
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
              window.open(`/#/dashBoard/pbr_update?id=${record.id}`)
            }}

          >
            Edit
          </a>
        )
      }
    },





  ]
  const data1 = [
    {
      file_path: 'Batch Record Example 1.pdf',
      key: 'Product ; value',
      value: '001',
      actual_value: 'snippet_Batch_Record_Example_1_1004.png',
      id: '5',
      status: <Checkbox />,
      confidence: 'High',
      site: "US01",
      product: 'New Product 001',
      batch: 'B001',
      reference_fields: 'asgdsagdsad.pdf',


    },
    {
      file_path: 'Batch Record Example 1.pdf',
      attribute_name: 'Balance Readout',
      key: 'Product ; value',
      value: '002',
      actual_value: 'snippet_Batch_Record_Example_1_1004.png',
      id: '1',
      status: <Checkbox />,
      confidence: 'High',
      site: "US01",
      product: 'New Product 002',
      batch: 'B001',
      reference_fields: 'asgdsagdsad.pdf',


    },
    {
      file_path: 'Batch Record Example 1.pdf',
      attribute_name: 'Balance Readout',
      key: 'Product ; value',
      value: '003',
      actual_value: 'snippet_Batch_Record_Example_1_1004.png',
      status: <Checkbox />,
      confidence: 'High',
      site: "US01",
      product: 'New Product 003',
      batch: 'B001',
      reference_fields: 'asgdsagdsad.pdf',


    },
    {
      file_path: 'Batch Record Example 1.pdf',
      attribute_name: 'Balance Readout',
      key: 'Product ; value',
      value: '004',
      actual_value: 'snippet_Batch_Record_Example_1_1004.png',
      id: '3',
      status: <Checkbox />,
      confidence: 'High',
      site: "US01",
      product: 'New Product 004',
      batch: 'B001',
      reference_fields: 'asgdsagdsad.pdf',


    },

  ]




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
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
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
  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText('');
  }

  const landingSearch = value => {
    setSearchedLanding(true);
    const tableData = templateData;
    const filterTable = tableData.filter(o =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTableLanding(filterTable);
  };

  const resetConfidence = () => {
    setShowReset(false)
    setShowResetConfidence(false)
    cardTableData()

  }

  return (
    <>
      <BreadCrumbWrapper />
      <div className='custom-wrapper'>
        <div className='custom-content-layout'>

          <div className='review-wrapper'>
            <div className='content_section' >

              <div>

                <Row gutter={16}>
                  <Col span={12}>
                    <Card className="review-card1" >
                      <div id="my-div" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 200 }}>
                        <h3>Status</h3>
                        {showReset && (
                          <p className="status" onClick={resetConfidence}>Reset</p>
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

                            }, paper_bgcolor: "rgba(0,0,0,0)", width: 400, title: ''
                          }} />

                      </div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card className="review-card2">
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", height: 200 }}>
                        <h3>Confidence</h3>
                        {showResetConfidence && (
                          <p className="status" onClick={resetConfidence}>Reset</p>
                        )}

                        <Plot
                          data={appchart1}
                          onClick={(e) => showfilters(e.points[0].label)}
                          layout={{
                            showlegend: true,
                            legend: {
                              x: 1.3,
                              y: 0.5

                            }, paper_bgcolor: "rgba(0,0,0,0)", width: 400, title: ''
                          }} />
                      </div>
                    </Card>
                  </Col>
                </Row>

              </div>

              <div style={{ marginTop: 20 }}>
                <div>

                  <Search
                    className='dashboard-search'
                    placeholder='Search by template ID, name, creator or date of creation'
                    allowClear
                    enterButton='Search'
                    size='large'
                    icon={<SearchOutlined />}
                    onSearch={landingSearch}
                  />


                </div>
                <Button style={{
                  margin: "7px",
                  right: 8,
                  borderRadius: "5px",
                  textTransform: "none",
                  background: "#ffffff",
                  borderColor: "#303f9f",
                  color: "#303f9f"

                }}
                  onClick={showApproved}

                >Approve</Button>




                <Table
                  columns={columns2}
                  dataSource={filterTableLanding === null
                    ? templateData
                    : filterTableLanding}
                  pagination={{ pageSize: 5 }}
                  scroll={{
                    x: 1500,
                  }}
                  style={{ border: '1px solid #ececec', borderRadius: '2px' }}
                />

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
        appType="VIEW"
      />
    </>
  )
}

export default PbrReviewer