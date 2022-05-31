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
import { Card, Table, Button, Input, Space, Col, Row, Select, Menu, Dropdown, Checkbox } from 'antd';
import { getPbrReviewerData } from '../../../../services/pbrService'
import { SearchOutlined } from "@ant-design/icons";
import { getCountData } from '../../../../services/workFlowServices';
import { returnData } from '../../../../duck/actions/auditTrialAction';
import { saveRecord } from '../../../../duck/actions/filterAction';
import { BMS_PBR_URL } from "../../../../constants/apiBaseUrl.js";
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import Highlighter from "react-highlight-words";
import Plot from 'react-plotly.js';
import './styles.scss'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BMS_APP_PYTHON_SERVICE, MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';

const { Search } = Input;

function PbrReviewer() {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([])
  const [templateColumns, setTemplateColumns] = useState([])
  const [searchText, setSearchText] = useState("");
  const [tableDataSource, setTableDataSource] = useState([]);
  const [chartList, setChartList] = useState([]);
  const [viewSearch, setViewSearch] = useState(false);
  const [tilesData, setTilesData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [userApproval, setUserApproval] = useState([]);
  const searchViewData = useRef([]);
  const ref = useRef(null);

  const [tableDataSourceFiltered, setTableDataSourceFiltered] =
    useState(null);
  const [searched, setSearched] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [toppings, setToppings] = useState(null)
  const [toppingsArray, setToppingsArray] = useState([])
  const [showFilterData, setShowFilterData] = useState("");
  // const [showApproved, setshowApproved] = useState("");
  const [pieChartData, setPieChartData] = useState([0, 0]);
  const [checked, setChecked] = useState(false);
  const [users, setUser] = useState([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState(null)
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
      }else{
        dispatch(hideLoader());
      }
    }
    catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.Message));
    }
  }

  const showfilterData = async (value) => {

    console.log('hello', value);
    let obj = { status: value.toLowerCase() }

    let res = await getPbrReviewerData(obj)

    setTemplateData(res.Data);


  };

  const searchTable = value => {
    const filterData = searchViewData.current.filter(o =>
      Object.keys(o).some(k =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )

    );
    setTemplateData(filterData);

  };
  const onSearchChange = e => {
    if (e.target.value === '') {
      setTemplateData(searchViewData.current);
    }
  };

<<<<<<< HEAD
  const handleReset = (clearFilters, setSearchText) => {
    clearFilters();
    setSearchText("");
  }; 

  


  const columns2 = [
    {
      title: 'File Path',
      key: 'file_path',
      dataIndex: 'file_path',
      ...getColumnSearchProps("file_path", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.file_path.localeCompare(b.file_path)
    },
    {
      title: 'Key',
      key: 'anchor_key',
      dataIndex: 'key_',
      ...getColumnSearchProps("key_", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.key_.localeCompare(b.key_)
    },
    {
      title: 'Value',
      key: 'snippet_value',
      dataIndex: 'value',
      ...getColumnSearchProps("value", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.value.localeCompare(b.value)
    },
    {
      title: 'Actual Value',
      key: 'actual_value',
      dataIndex: 'actual_value',
      ...getColumnSearchProps("actual_value", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.actual_value.localeCompare(b.view_actual_value),
      render: (text, record, index) => {
        return (
          <img src={"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO 9TXL0Y4OHwAAAABJRU5ErkJggg=="} width="50%" height="15%" />
        )
=======
  const onFocus = () => {
    setViewSearch(true);
  };

  const closeTableView = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      setViewSearch(false);
      setTemplateData(searchViewData.current);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', closeTableView);
    return () => {
      document.removeEventListener('mousedown', closeTableView);
    };
  }, []);
  const showfilters = async (value) => {

    console.log('hello', value);
    let obj = { confidence: value.toLowerCase() }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);


  };

  function globalTemplateSearch(value) {
    const filterdDataArr = tableDataSource.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setTableDataSourceFiltered(filterdDataArr);
  }

  // function showApproved(id){
  //   let item=users[id-1];
  //   setName(item.status)
  // }

  // function updateStatus (){

  //   let item={status}
  //   console.warn ("item", item)


  // }
  const getTilesData = async () => {
    let req = {};
    try {
      dispatch(showLoader());
      const tilesResponse = await getCountData(req);
      console.log(tilesResponse);

      if (tilesResponse['status-code'] == 200) {
        setTilesData(tilesResponse['Data']);
        setUserApproval(tilesResponse['counts'])
        dispatch(hideLoader());
      }

    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification('error', error.message));
    }
  };

  const chart = async (res) => {

    let obj = await getPbrReviewerData(res);
    console.log(obj.Data);

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
>>>>>>> 97786712157bc0e496a0750904694e928246873a
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


  function handleCheck(event) {
    const item = {
      "type": event.target.id,

    };
    if (event.target.checked) {
      setToppings(item);
      if (toppingsArray.map(val => val["type"]).indexOf(item["type"]) == -1) setToppingsArray([...toppingsArray, item]);
    } else {
      setToppingsArray(toppingsArray.filter(val => val["type"] != item["type"]));
    }
  }

  // const handleChange = async (e, res) => {

  //   let obj = await data1(res);
  //   console.log(obj);
  //   console.log(obj.Data);
  //   let record = obj.Data;
  //   let approved = [];
  //   if (e.target.checked === true) {

  //     alert("hi")



  //     //  console.log(record.status)
  //     // setChecked(!checked);

  //     // //approved.push(record);
  //     setChecked({ ...checked, [record.status]: e.target.value, });
  //     console.log(e.target.status);
  //   }
  //   else {
  //     //let filtered = this.state.unapprovedCheckbox.filter((item) => item.id !== record.id);
  //     //this.setState({ unapprovedCheckbox: filtered })
  //   }

  // };


  const handleChange = (e) => {
    let isChecked = e.target.checked;
    if (e.target.checked === true) {
      alert("hi")
    }
  }



  const getExcelFile = () => { };

  // getExcelFile = (value) => {
  //   var today = new Date();
  //   today.setDate(today.getDate() + 1);

  //   let endPoint = '/services/v1/audit-information?';
  //   let baseUrl = MDH_APP_PYTHON_SERVICE + endPoint;

  //   let startDate =
  //     this.state.selectedDate.length > 0
  //       ? this.state.selectedDate[0]
  //       : '2021-09-01';
  //   let endDate =
  //     this.state.selectedDate.length > 0
  //       ? this.state.selectedDate[1]
  //       : today.toISOString().slice(0, 10);
  //   let tableName = ['Parameter Data'];
  //   let activity = this.state.eventType.value;
  //   let userid = this.state.user.value;

  //   const myUrlWithParams = new URL(baseUrl);
  //   if (startDate == endDate) {
  //     myUrlWithParams.searchParams.append('startdate', startDate);
  //   } else {
  //     myUrlWithParams.searchParams.append('startdate', startDate);
  //     myUrlWithParams.searchParams.append('enddate', endDate);
  //   }

  //   if (activity) {
  //     myUrlWithParams.searchParams.append('activity', activity);
  //   }
  //   if (userid) {
  //     myUrlWithParams.searchParams.append('userid', userid);
  //   }
  //   myUrlWithParams.searchParams.append('table_name', tableName);

  //   if (value == 'excel') {
  //     myUrlWithParams.searchParams.append('export_csv', false);
  //   }
  //   if (value == 'csv') {
  //     myUrlWithParams.searchParams.append('export_csv', true);
  //   }

  //   let url = myUrlWithParams.href;
  //   window.open(url);
  // };
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
      ...getColumnSearchProps("id", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    {
      title: 'Attribute Name',
      key: 'anchor_key',
      dataIndex: 'anchor_key',
      ...getColumnSearchProps("anchor_key", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.view_anchor_key.localeCompare(b.view_anchor_key)
    },

    {
      title: 'Value',
      key: 'snippet_value',
      dataIndex: 'snippet_value',
      ...getColumnSearchProps("snippet_value", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.view_snippet_value.localeCompare(b.snippet_value)
    },
    {
      title: 'Snippet Value',
      key: 'snippet_image',
      dataIndex: 'snippet_image',
      ...getColumnSearchProps("snippet_image", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.view_snippet_image.localeCompare(b.view_snippet_image),
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
      ...getColumnSearchProps("confidence", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.confidence.localeCompare(b.confidence)
    },
    {
      title: 'File Path',
      key: 'file_path',
      dataIndex: 'file_path',
      ...getColumnSearchProps("file_path", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.file_path.localeCompare(b.file_path)
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      ...getColumnSearchProps("status", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      render: (text, record, index) => {
        return (

          text == "unapproved" ? <Checkbox
            onChange={(e) => { setChecked(e.target.value) }}
          /> : "approved"


        )
      }


    },
    {
      title: 'Updated by',
      key: 'username',
      dataIndex: 'username',
      ...getColumnSearchProps("username", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.view_username.localeCompare(b.view_username)
    },
    {
      title: 'Product',
      key: 'product_num',
      dataIndex: 'product_num',
      ...getColumnSearchProps("product_num", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.view_product_num.localeCompare(b.product_num),
      render: (text, record, index) => {
        return (
          <a
            style={{ color: "#1890ff" }}
            onClick={() => {
              history.push(`/dashBoard/pbr_update`);
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
      ...getColumnSearchProps("action", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.view_action.localeCompare(b.view_action)
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
      status: <Checkbox
        onChange={handleCheck} />,
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
      status: <Checkbox
        onChange={handleCheck} />,
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
      id: '2',
      status: <Checkbox
        onChange={handleCheck} />,
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
      status: <Checkbox
        onChange={handleCheck} />,
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




  // let chartData = [{



  //   //textinfo: 'none'
  // }]



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
  }

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
                // onClick={this.showApproved}
                // onClick = {handlechange}
                // onClick={() => showApproved(item.id)}
                >Approve</Button>
                {/* <Select
                  defaultValue="Batch"
                  style={{
                    width: 120,
                  }}
                 // onChange={handleChange}
                >
                  <Option value="Batch1">Batch 1</Option>
                  <Option value="Batch2">Batch 2</Option>
                </Select> */}
                {/* <div
                  style={{
                    marginTop: '10px',
                    float: 'right',
                    marginRight: '10px',
                  }}
                >

                  <Dropdown
                    style={{ color: '#ffffff' }}
                  //overlay={userMenu}
                  >
                    <Button
                      style={{
                        backgroundColor: '#495fc3',
                        color: '#ffffff',
                      }}
                      type='primary'
                    >
                      download
                    </Button>
                  </Dropdown>
                </div> */}

                {/* <Search
                  placeholder='Search '
                  allowClear
                  enterButton='Search'
                  size='large'
                  //onFocus={onFocus}
									//onChange={onSearchChange}
									//onSearch={searchTable}
                /> */}
                {/* {viewSearch && <Table templateData={templateData} />} */}


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