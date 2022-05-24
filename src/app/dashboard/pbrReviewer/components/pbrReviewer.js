import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import ScreenHeader from "../../../../components/ScreenHeader/screenHeader";
import illustrations from "../../../../assets/images/Dashboard-Banner.svg";
import { Table, Button, Input, Space } from 'antd';
import { getPbrReviewerData } from '../../../../services/pbrService'
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Plot from 'react-plotly.js';
import './styles.scss'

function PbrReviewer() {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([])
  const [templateColumns, setTemplateColumns] = useState([])
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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
  }

  const getColumnSearchProps = (
    dataIndex,
    searchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => (searchInput = node)}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex, setSearchText, setSearchedColumn)}
          style={{ width: 240, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(
                selectedKeys,
                confirm,
                dataIndex,
                setSearchText,
                setSearchedColumn
              )
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              handleReset(
                clearFilters,
                setSearchText,
                setSearchText,
                setSearchedColumn
              )
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
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
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
    setSearchText,
    setSearchedColumn
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

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
      key: 'key',
      dataIndex: 'key_',
      ...getColumnSearchProps("key_", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.key_.localeCompare(b.key_)
    },
    {
      title: 'Value',
      key: 'value',
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
          <img src={`https://cpv-poc.mareana.com/bms_poc_snippets/${text}`} width="50%" height="15%" />
        )
      }
    },
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      ...getColumnSearchProps("id", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      ...getColumnSearchProps("status", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.status.localeCompare(b.status)
    },
    {
      title: 'Confidence',
      key: 'confidence',
      dataIndex: 'confidence',
      ...getColumnSearchProps("confidence", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.confidence.localeCompare(b.confidence)
    },
    {
      title: 'Site',
      key: 'site',
      dataIndex: 'site',
      ...getColumnSearchProps("site", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.site.localeCompare(b.site)
    },
    {
      title: 'Product',
      key: 'product',
      dataIndex: 'product',
      ...getColumnSearchProps("product", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.product.localeCompare(b.product),
      render: (text, record, index) => {
        return (
          <a
            style={{ color: "#1890ff" }}
          >
            {text}
          </a>
        )
      }
    },
    {
      title: 'Batch',
      key: 'batch',
      dataIndex: 'batch',
      ...getColumnSearchProps("batch", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.batch.localeCompare(b.batch)
    },
    {
      title: 'Reference Fields',
      key: 'reference_fields',
      dataIndex: 'reference_fields',
      ...getColumnSearchProps("reference_fields", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
      sorter: (a, b) => a.reference_fields.localeCompare(b.reference_fields)
    },

  ]
  const data1 = [
    {
      file_path: 'Batch Record Example 1.pdf',
      key: 'Product ; value',
      value: 'New Product 001',
      actual_value: 'snippet_Batch_Record_Example_1_1004.png',
      id: '21',
      status: 'Unapproved',
      confidence: 'High',
      site: "US01",
      product: 'New Product 001',
      batch: 'B001',
      reference_fields: 'asgdsagdsad.pdf',


    },
    {
      file_path: 'Batch Record Example 1.pdf',
      key: 'Product ; value',
      value: 'New Product 001',
      actual_value: 'snippet_Batch_Record_Example_1_1004.png',
      id: '21',
      status: 'Unapproved',
      confidence: 'High',
      site: "US01",
      product: 'New Product 001',
      batch: 'B001',
      reference_fields: 'asgdsagdsad.pdf',


    },
    {
      file_path: 'Batch Record Example 1.pdf',
      key: 'Product ; value',
      value: 'New Product 001',
      actual_value: 'snippet_Batch_Record_Example_1_1004.png',
      id: '21',
      status: 'Unapproved',
      confidence: 'High',
      site: "US01",
      product: 'New Product 001',
      batch: 'B001',
      reference_fields: 'asgdsagdsad.pdf',


    },
    {
      file_path: 'Batch Record Example 1.pdf',
      key: 'Product ; value',
      value: 'New Product 001',
      actual_value: 'snippet_Batch_Record_Example_1_1004.png',
      id: '21',
      status: 'Unapproved',
      confidence: 'High',
      site: "US01",
      product: 'New Product 001',
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
  let chartData = [{
    values: [16, 789],
    labels: ["Unapproved", "Approved"],
    // marker: { colors: "grey" },
    type: 'pie',
    //textinfo: 'none'
  }]
  let chartData1 = [{
    values: [627,78,100],
    labels: ["High","Medium","Low"],
    //marker: { colors: confidenceColor },
    // marker: { colors: ultimateColors },
    type: 'pie',
    //textinfo: 'none'
  }]


  return (
    <div className='custom-wrapper'>
      <div className='sub-header'>
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
        <div className='content_section' >
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div id="my-div">
                {/* <h6 style={{marginTop: "35px",marginLeft: "200px"}}>Status</h6> */}
                {/* {this.state.resetStatus && (
                  <p className="status" onClick={this.resetStatus}>Reset</p>
                )} */}
                <Plot
                  data={chartData}
                  // onClick={(e) => this.showfilterData(e.points[0].label)}
                  layout={{ width: 500, height: 400, title: "Status" }} />

              </div>
              <div style={{ marginLeft: "150px" }}>
                {/* {this.state.resetConfidence && (
                  <p className="confidence" onClick={this.resetConfidence}>Reset</p>
                )} */}
                <Plot
                  data={chartData1}
                  // onClick={(e) => this.showfilters(e.points[0].label)}
                  layout={{ width: 500, height: 400, title: 'Confidence' }} />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Table
              columns={columns2}
              dataSource={templateData}
              style={{ border: '1px solid #ececec', borderRadius: '2px' }}
            />
          </div>
        </div>



      </div>
    </div>
  )
}

export default PbrReviewer