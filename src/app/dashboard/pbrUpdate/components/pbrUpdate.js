import React , { useState  } from 'react'
import {Table , Row, Col , Button , Input} from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import ScreenHeader from "../../../../components/ScreenHeader/screenHeader";
import illustrations from "../../../../assets/images/Dashboard-Banner.svg";
//import {Card,  Table, Button, Input, Space , Col, Row} from 'antd';
import { getPbrReviewerData } from '../../../../services/pbrService'
import { SearchOutlined } from "@ant-design/icons";
import {returnData} from '../../../../duck/actions/auditTrialAction';
import {saveRecord} from '../../../../duck/actions/filterAction';
import { BMS_PBR_URL } from "../../../../constants/apiBaseUrl.js";
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import queryString from "query-string";
import Highlighter from "react-highlight-words";
import Plot from 'react-plotly.js';

import './styles.scss'
import {ArrowLeftOutlined} from '@ant-design/icons';




const PbrUpdate = () => {
    const dispatch = useDispatch();
    const [templateData, setTemplateData] = useState([])
  const [templateColumns, setTemplateColumns] = useState([])
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const history = useHistory();
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


  const loadTableData = () => {

    let antdDataTable = [...this.state.tableData];
    this.setState({ loader: true });
    let params = queryString.parse(this.props.location.search);
    console.log("paramsssss", params.id);
    let data = [], file = "", key = "", extractedValue = "", file_name = "", user = "", comments = "", updated = "", status = "";
    let id = "";
    let reqObj = {
        //appId: "MDH_APP",
        appId: "BMS",
        filters: [{
            field: 'id',
            operator: 'equals',
            value: [params.id]
        }],
        metadata: true,
        pageSize: 100,
        pageNumber: 1,
        resultsetId: "cpv_pbr_data",
    };
    console.log(reqObj);
    returnData(reqObj)
        .then((res) => {
            console.log(res);
            if (res.data.content.length > 0) {
                res.data.content.forEach((i) => {
                    if (i.key_ !== null) {
                        console.log(res);
                        res.data.content.forEach((item) => {
                            let antdObj = {};
                            antdObj["key"] = antdDataTable.length + 1;
                            antdObj["id"] = item.id;
                            //antdObj["file_name"] = item.file_name;
                            antdObj["key_"] = item.key_;
                            antdObj["value"] = item.value;
                            antdObj["actual_value"] = <img src={`${BMS_PBR_URL}${item.actual_value}`}  />
                            //antdObj["key_image"] = item.actual_value;
                            antdObj["file_path"] = item.file_path;
                            antdObj["product"] = item.product;
                            antdObj["batch"] = item.batch;
                            antdObj["site"] = item.site;

                            data.push(antdObj);
                            file = `${BMS_PBR_URL}${item.file_path}`;
                            extractedValue = item.value;
                            key = item.key_;
                            id = item.id
                            file_name = item.file_name;
                            user = item.username;
                            comments = item.comments;
                            updated = item.lastupdated;
                            status = item.status;
                            if (status === "Unapproved") {
                                this.setState({ current: 0, text: "Reviewed" })
                            } else if (status === "Reviewed") {
                                this.setState({ current: 1, text: "Approved" })
                            } else if (status === "Approved") {
                                this.setState({ current: 2 })
                                document.getElementById("btn1").style.display = "none";
                            }
                        })
                        this.setState({

                            loader: false,
                            // showLoader: false,
                            tableData: data,
                            filename: file,
                            extractedValue: extractedValue,
                            key: key,
                            //file_name: file_name,
                            id: id,
                            userName: user,
                            comments: comments,
                            updatedON: updated,
                            status: status

                        });
                    }
                })


            } else {
                this.setState({
                    toastOpen: true,
                    toastMessage: "No data is returned",
                    toastVariant: "error",
                });
            }

        })
        .catch((err) => {
            this.setState({
                toastOpen: true,
                toastMessage: err.message,
                toastVariant: "error",
            });
        });

}



const columns = [
    {
        title: "Id ",
        dataIndex: "id",
        key: "1",
        width: "5%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.id - b.id,
    },
    // {
    //     title: "Product",
    //     dataIndex: "product",
    //     key: "6",
    //     defaultSortOrder: "descend",
    //     sorter: (a, b) => a.product - b.product,
    // },
    {
        title: "Batch Number",
        dataIndex: "batch",
        key: "7",
        width: "10%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.batch - b.batch,
    },
    {
        title: "Site",
        dataIndex: "site",
        key: "8",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.site - b.site,
    },
    //   {
    //     title: "Drug Substance Number",
    //     dataIndex: "drug_substance_number",
    //     key: "8",
    //     width:"5%",
    //     defaultSortOrder: "descend",
    //     sorter: (a, b) => a.extracted_value - b.extracted_value,
    //   },
    // {
    //     title: "Snippet Name  ",
    //     dataIndex: "file_name",
    //     key: "2",
    //     defaultSortOrder: "descend",
    //     sorter: (a, b) => a.snippet_name - b.snippet_name,
    // },
    // {
    //     title: "key",
    //     dataIndex: "key_",
    //     key: "2",
    //     defaultSortOrder: "descend",
    //     sorter: (a, b) => a.key_ - b.key_,
    // },
    {
        title: "Extracted Value",
        dataIndex: "value",
        key: "3",
        width: "15%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.value - b.value,
    },
    {
        title: "Value Image",
        dataIndex: "actual_value",
        key: "4",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.actual_value - b.actual_value,
        width:"300px"
    },
    

]

  return (
    <>
    <BreadCrumbWrapper />
    <div className='custom-wrapper'>
      <div className='sub-header'>
      <div className='sub-header-title'>
                        <ArrowLeftOutlined className='header-icon' />
                        <span className='header-title'>
                            Edit Data
                        </span>
                    </div>
      </div>
      
      <div style={{ marginTop: 20 }}>

      <Row gutter={16}>
            <Col span={12}>
            <h3 style={{marginBottom : "20px" }}>You may edit the selected unstructured data here.</h3>
            <Table
              className='edit-table'
              columns={columns}
              dataSource={templateData}
              pagination={false}
              style={{ border: '1px solid #ececec', borderRadius: '2px' }}
            />
            </Col>
            <Col span={12}>
            <div className='' style={{ display: "flex",marginBottom : "20px" , flexDirection: "row" , justifyContent: "center", alignItems: "center" }}>
            <Input.Search
                  className='modal-table-search'
                  size='middle'
                  placeholder='Search any content in the document'
                  enterButton={<SearchOutlined />}
                  
            
                />
            <Button style={{
                      borderColor: '#093185',
                      color: '#093185',
                      backgroundColor: '#fff',
                    }}
                    type='primary'><a
                    style={{ color: "#1890ff" }}
                    onClick={() => {
                      history.push(`/dashBoard/audit_logs`);
                    }}
        
                  >
                    View Auditlogs
                  </a></Button>
            <Button  style={{
                      backgroundColor: '#093185',
                      color: '#ffffff',
                    }}
                    type='primary'>Save Changes</Button>
            </div>
            <iframe src="" width="650px" height="600px" type="application/pdf">
              </iframe>
              </Col>
        </Row>
          </div>
      </div>
      </>
  )
}

export default PbrUpdate