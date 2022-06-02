import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router";

import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
//import {Card,  Table, Button, Input, Space , Col, Row} from 'antd';
import { getPbrReviewerData, updateApprove } from '../../../../services/pbrService'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import queryString from "query-string";
//import Highlighter from "react-highlight-words";
import './styles.scss'
import { ArrowLeftOutlined , SearchOutlined} from '@ant-design/icons';




const PbrUpdate = () => {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([]);
  const [array, setArray] = useState([]);
  //const { id } = props.match.params ;
//  const [loadstate, setLoadstate] = useState("");
  const location = useLocation();
  // const cardTableData = async () => {
  //   let req = ``
  //   try {
  //     dispatch(showLoader());
  //     const tableResponse = await getPbrReviewerData(req);
  //     if (tableResponse['status-code'] === 200) {
  //       // setTemplateColumns(newArray1)
  //       setTemplateData(tableResponse.Data);
  //       dispatch(hideLoader());
  //     }
  //     else if (tableResponse['status-code'] === 404) {
  //       dispatch(hideLoader());
  //       setTemplateData(tableResponse.Data);
  //       dispatch(showNotification('error', tableResponse.Message));
  //     }
  //   }
  //   catch (error) {
  //     dispatch(hideLoader());
  //     dispatch(showNotification('error', error.Message));
  //   }
  // }

  // const search = (value) => {
  //   const { templateData } = loadstate;
  //   console.log("PASS", { value });

  //   const filterTable = templateData.filter((o) =>
  //     Object.keys(o).some((k) =>
  //       String(o[k])
  //         .toLowerCase()
  //         .includes(value.toLowerCase())
  //     )
  //   );

  //   this.setState({ filterTable });
  // };

  // const arr = async () => {
  //   let obj = ''
  //   const tableResponse = await getPbrReviewerData(obj);
  //   setTemplateData(tableResponse.Data);
  //   console.log(tableResponse.Data);
  // }
  useEffect(() => {

    loadTableData();

  }, []);

  const loadTableData = async (props) => {

    let antdDataTable = [];
    

    const params = queryString.parse(location.search);
    console.log("paramsssss", params.id);
    //let antdDatatable = [...array]
    //antdDatatable.push(params.id)
   //setArray(antdDatatable)
   const viewRes = await getPbrReviewerData(params);
 
    viewRes.Data.forEach((item, key) => {
      let antdObj = {};
    antdObj['key'] = params.id;
    antdObj['recorded_date'] = item.recorded_date;
    antdObj['recorded_time'] = item.recorded_time;
    antdObj['snippet_value'] = item.snippet_value;
    antdObj['uom'] = item.uom;
    antdDataTable.push(antdObj);
    console.log(antdObj);
    
  });

  };



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
    width: "300px"
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
            <h3 style={{ marginBottom: "20px" }}>You may edit the selected unstructured data here.</h3>
            <Table
              className='edit-table'
              columns={columns}
              dataSource={templateData}
              pagination={false}
              style={{ border: '1px solid #ececec', borderRadius: '2px' }}
            />
          </Col>
          <Col span={12}>
            <div className='' style={{ display: "flex", marginBottom: "20px", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
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
              <Button style={{
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