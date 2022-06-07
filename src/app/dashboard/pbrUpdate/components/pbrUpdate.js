import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router";

import { getPbrReviewerData, updateApprove } from '../../../../services/pbrService'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import queryString from "query-string";
import './styles.scss'
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';




const PbrUpdate = () => {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([]);
  const location = useLocation();
  useEffect(() => {

    loadTableData();

  }, []);

  const loadTableData = async (props) => {

    let antdDataTable = [];


    const params = queryString.parse(location.search);
    const viewRes = await getPbrReviewerData(params);

    viewRes.Data.forEach((item, key) => {
      let antdObj = {};
      antdObj['key'] = params.id;
      antdObj['recorded_date'] = item.recorded_date;
      antdObj['recorded_time'] = item.recorded_time;
      antdObj['snippet_value'] = item.snippet_value;
      antdObj['uom'] = item.uom;
      antdDataTable.push(antdObj);

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