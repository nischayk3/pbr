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


function PbrReviewer() {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([])
  const [arr, setArr] = useState([]);
  const [pieChartData, setPieChartData] = useState([0, 0]);
  const [pieChartData1, setPieChartData1] = useState([0, 0, 0]);

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

    let obj = { status: value.toLowerCase() }

    let res = await getPbrReviewerData(obj)

    setTemplateData(res.Data);


  };
  const showfilters = async (value) => {

    let obj = { confidence: value }
    let res = await getPbrReviewerData(obj)
    setTemplateData(res.Data);


  };

  const updateStatus = (e, record) => {



    let resp = [...arr];
    resp.push(record.id);
    setArr(resp);


  };

  const showApproved = async () => {


    let req = {
      id: arr,
      recorded_date: "",
      recorded_time: "",
      snippet_value: "",
      status: "approved",
      uom: ""
    }
    let res = await updateApprove(req)

    if (res.Status == "202") {

      dispatch(showNotification("success", "Approved Successfully")),
      dispatch(showLoader());

        setTimeout( () => window.location.reload(),
          1000
        );
    }

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
      if (item.confidence === "High") {

        highcount++;

      }

    });

    let medcount = 0;
    jsondata.forEach(item => {
      if (item.confidence === "Medium") {
        medcount++;
      }

    });

    let lowcount = 0;
    jsondata.forEach(item => {
      if (item.confidence === "Low") {
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
      }
    },
    hoverinfo: 'label+percent+name',
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
          <img src={`https://cpv-poc.mareana.com/bms_poc_snippets/${text}`} width="50%" height="15%" />
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


    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      ...getColumnSearchProps('action'),
      sorter: (a, b) => a.action.length - b.action.length,
      sortDirections: ['descend', 'ascend'],
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

                        <Plot
                          data={appchart1}
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