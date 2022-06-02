import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import ScreenHeader from "../../../../components/ScreenHeader/screenHeader";
import illustrations from "../../../../assets/images/Dashboard-Banner.svg";
import { Card, Table, Button, Col, Row, Checkbox } from 'antd';
import { getPbrReviewerData, updateApprove } from '../../../../services/pbrService'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import Plot from 'react-plotly.js';
import './styles.scss'
import { ArrowLeftOutlined } from '@ant-design/icons';
//import { BMS_APP_PYTHON_SERVICE, MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';


function PbrReviewer() {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([])
  const [searchText, setSearchText] = useState("");
  //const [viewSearch, setViewSearch] = useState(false);
  const [arr, setArr] = useState([]);
 // const searchViewData = useRef([]);
 // const ref = useRef(null);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pieChartData, setPieChartData] = useState([0, 0]);
  const history = useHistory();
  const refSearchInput = useRef();
  useEffect(() => {
    cardTableData()
  }, []);
  const cardTableData = async () => {
    let req = ``
    try {
      dispatch(showLoader());
      const tableResponse = await getPbrReviewerData(req);
      if (tableResponse['status-code'] === 200) {
        // setTemplateColumns(newArray1)
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

    //console.log('hello', value);
    let obj = { status: value.toLowerCase() }

    let res = await getPbrReviewerData(obj)

    setTemplateData(res.Data);


  };

  // useEffect(() => {
  //   document.addEventListener('mousedown', closeTableView);
  //   return () => {
  //     document.removeEventListener('mousedown', closeTableView);
  //   };
  // }, []);
  const showfilters = async (value) => {

    //console.log('hello', value);
    let obj = { confidence: value.toLowerCase() }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);


  };

  const updateStatus = (e, record) => {



    //console.log(e.target.checked);
    //console.log(record);
    let resp = [...arr];
    resp.push(record.id);
    setArr(resp);


  };

  const showApproved = async () => {

    // console.log(arr)
    let req = {
      id: arr,
      recorded_date: "",
      recorded_time: "",
      snippet_value: "",
      status: "approved",
      uom: ""
    }
    let res = await updateApprove(req)
    
    //console.log(res);
    if (res.Status == "202") {
    
      dispatch(showNotification('success', 'Approved Successfully'));
       setTimeout(
        () => window.location.reload(),
        2000
      );
    }

  };




  const chart = async (res) => {

    let obj = await getPbrReviewerData(res);
    // console.log(obj.Data);

    var jsondata = obj.Data;
    let unappcount = 0;
    jsondata.forEach(item => {
      if (item.status === "unapproved") {
        unappcount++;
      }
    });

    var appcount = 0;
    jsondata.forEach(item => {
      if (item.status === "approved") {
        appcount++;
      }
    });

    setPieChartData([unappcount, appcount]);

  };


  let appchart = [{
    values: pieChartData,
    labels: ["Unapproved", "Approved"],
    marker: {
      colors: ['#ff7f0e', '#2ca02c'],
      line: {
        color: 'white',
        width: 2
      }
    },
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.15
    },
    type: 'pie',
    name: 'GHG Emissions',
    hole: .7,

  }]

  useEffect(() => {

    chart();

  }, []);

  const columns2 = [
    // {
    //       title: "Anchor ",
    //       render:()=><Link to="/app/dashBoard/pbrUpdate" target="_blank" component={pbrUpdate}><FaAnchor/></Link>,
    //       dataIndex: "anchor",
    //       key: "1",
    //       width: 120,
    //       ...this.getColumnSearchProps('anchor'),
    //       defaultSortOrder: "descend",
    //       sorter: (a, b) => a.anchor - b.anchor,
    //   },

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
          <img src={`https://cpv-poc.mareana.com/bms_poc_snippets/${text}`} width="50%" height="15%" />
        )
      }
    },
    {
      title: 'Confidence',
      key: 'confidence',
      dataIndex: 'confidence',
      ...getColumnSearchProps('confidence'),
      sorter: (a, b) => a.confidence.length - b.confidence.length,
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
      title: 'Updated by',
      key: 'username',
      dataIndex: 'username',
      ...getColumnSearchProps('username'),
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Product',
      key: 'product_num',
      dataIndex: 'product_num',
      ...getColumnSearchProps('product_num'),
      sorter: (a, b) => a.product_num.length - b.product_num.length,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => {
        return (
          <a
            style={{ color: "#1890ff" }}
            onClick={() => {
              history.push(`/dashBoard/pbr_update?id=${record.id}`);
            }}

          >
            {text}
          </a>
        )
      }
    },

    // {
    //   title: 'Key',
    //   key: 'key',
    //   dataIndex: 'key',
    //   ...getColumnSearchProps("key", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
    //   sorter: (a, b) => a.view_key.localeCompare(b.view_key)
    // },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      ...getColumnSearchProps('action'),
      sorter: (a, b) => a.action.length - b.action.length,
      sortDirections: ['descend', 'ascend'],
    },


    // {
    //   title: 'Batch',
    //   key: 'batch',
    //   dataIndex: 'batch',
    //   ...getColumnSearchProps("batch", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
    //   sorter: (a, b) => a.view_batch.localeCompare(b.view_batch)
    // },
    // {
    //   title: 'Reference Fields',
    //   key: 'reference_fields',
    //   dataIndex: 'reference_fields',
    //   ...getColumnSearchProps("reference_fields", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
    //   sorter: (a, b) => a.view_reference_fields.localeCompare(b.view_reference_fields)
    // },

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
  // let colors = this.state.pieData.map(i => "");
  // if (selectedPart.length > 0) {
  //   colors = this.state.pieData.map(i => {
  //     if (selectedPart.includes(i.status)) {
  //       return "";
  //     } else {
  //       return "grey";
  //     }
  //   })
  // }




  let chartData1 = [{
    values: [627, 78],
    labels: ["low", "High"],
    marker: {
      colors: ['#e1e1e1', '#75e3d3'],
      line: {
        color: 'white',
        width: 2
      }
    },
    hoverinfo: 'label+percent+name',
    hole: .7,
    //marker: { colors: confidenceColor },
    //marker: { colors: ultimateColors },
    type: 'pie',
    //textinfo: 'none'
  }]

  function getColumnSearchProps(dataIndex) {
    // return {
    //     filterDropdown: ({
    //         setSelectedKeys,
    //         selectedKeys,
    //         confirm,
    //         clearFilters,
    //     }) => (
    //         <div style={{ padding: 8 }}>
    //             <Input
    //                 // ref={node => {
    //                 //   this.searchInput = node;
    //                 // }}
    //                 placeholder={`Search ${dataIndex}`}
    //                 value={selectedKeys[0]}
    //                 onChange={(e) =>
    //                     setSelectedKeys(
    //                         e.target.value ? [e.target.value] : []
    //                     )
    //                 }
    //                 onPressEnter={() =>
    //                     handleSearch(selectedKeys, confirm, dataIndex)
    //                 }
    //                 style={{
    //                     marginBottom: 8,
    //                     display: 'block',
    //                 }}
    //             />
    //             <Space>
    //                 <Button
    //                     type='primary'
    //                     onClick={() =>
    //                         handleSearch(selectedKeys, confirm, dataIndex)
    //                     }
    //                     icon={<SearchOutlined />}
    //                     size='small'
    //                     style={{ width: 90 }}
    //                 >
    //                     Search
    //                 </Button>
    //                 <Button
    //                     onClick={() => handleReset(clearFilters)}
    //                     size='small'
    //                     style={{ width: 90 }}
    //                 >
    //                     Reset
    //                 </Button>
    //                 <Button
    //                     type='link'
    //                     size='small'
    //                     onClick={() => {
    //                         confirm({ closeDropdown: false });
    //                         setSearchText(selectedKeys[0]);
    //                         setSearchedColumn(dataIndex);
    //                     }}
    //                 >
    //                     Filter
    //                 </Button>
    //             </Space>
    //         </div>
    //     ),
    //     filterIcon: (filtered) => (
    //         <SearchOutlined
    //             style={{ color: filtered ? '#1890ff' : undefined }}
    //         />
    //     ),
    //     onFilter: (value, record) =>
    //         record[dataIndex]
    //             .toString()
    //             .toLowerCase()
    //             .includes(value.toLowerCase()),
    //     onFilterDropdownVisibleChange: (visible) => {
    //         if (visible) {
    //             // setTimeout(() => this.searchInput.select());
    //         }
    //     },
    //     render: (text) =>
    //         searchedColumn === dataIndex ? (
    //             <Highlighter
    //                 highlightStyle={{
    //                     backgroundColor: '#ffc069',
    //                     padding: 0,
    //                 }}
    //                 searchWords={[searchText]}
    //                 autoEscape
    //                 textToHighlight={text.toString()}
    //             />
    //         ) : (
    //             text
    //         ),
    // };
  };



  return (
    <>
      <BreadCrumbWrapper />
      <div className='custom-wrapper'>
        <div className='sub-header'>
          <div className='sub-header-title'>
            <ArrowLeftOutlined className='header-icon' />
            <span className='header-title'>
              Review Data
            </span>
          </div>
        </div>
        <div className='custom-content-layout'>
          <div>
            <ScreenHeader
              bannerbg={{
                background:
                  "linear-gradient(180deg, rgba(199, 144, 129, 0.15) 0%, rgba(223, 165, 121, 0.56) 100%)",
              }}
              title={`Howdy ${localStorage.getItem("username")},`}
              description="Lets get designing some report templates"
              source={illustrations}
              sourceClass="dashboard-image"
            />
          </div>
          <div className='review-wrapper'>
            <div className='content_section' >

              <div>

                <Row gutter={16}>
                  <Col span={12}>
                    <Card className="review-card1" >
                      <div id="my-div" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <h3>Status</h3>
                        {/* {this.state.resetStatus && (
                  <p className="status" onClick={this.resetStatus}>Reset</p>
                )}    */}
                        <Plot
                          data={appchart}
                          onClick={(e) => showfilterData(e.points[0].label)}
                          layout={{ paper_bgcolor: "rgba(0,0,0,0)", width: 400, title: "" }} />

                      </div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card className="review-card2">
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <h3>Confidence</h3>
                        {/* {this.state.resetConfidence && (
                  <p className="confidence" onClick={this.resetConfidence}>Reset</p>
                )}   */}
                        <Plot
                          data={chartData1}
                          onClick={(e) => showfilters(e.points[0].label)}
                          layout={{ paper_bgcolor: "rgba(0,0,0,0)", width: 400, title: '' }} />
                      </div>
                    </Card>
                  </Col>
                </Row>

              </div>

              <div style={{ marginTop: 20 }}>
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
                  dataSource={templateData}
                  pagination={false}
                  style={{ border: '1px solid #ececec', borderRadius: '2px' }}
                />
              </div>
            </div>
          </div>



        </div>
      </div>
    </>
  )
}

export default PbrReviewer