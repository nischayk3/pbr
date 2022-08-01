import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Input, Form } from 'antd';
import { useDispatch } from 'react-redux';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import { useLocation } from "react-router";
import { getPbrReviewerData, updateApprove } from '../../../../services/pbrService'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import queryString from "query-string";
import './styles.scss';
import { MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';
import { useHistory } from 'react-router';



const PbrUpdate = () => {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [imagepdf, setImagePdf] = useState("");
  const history = useHistory();
  const [textInput, setTextInput] = useState({
    changed_by: "",
    id: "",
    recordedDate: "",
    recordedTime: "",
    snippetValue: "",
    status: "",
    uomnum: ""
  });
  const [form] = Form.useForm();
  const [idarr, setIdArr] = useState([]);
  const location = useLocation();
  const params = queryString.parse(location.search);

  useEffect(() => {
    loadTableData();
  }, []);


  const loadTableData = async () => {
    dispatch(showLoader());
    let req = {
      confidence: null,
      createdBy: null,
      id: Number(params.id),
      limit: null,
      status: null,
      template_id: []
    }
    let res = await getPbrReviewerData(req);
    setTemplateData(res.Data);

    let filename = res.Data[0].file_path;
    getImage(filename);
    let obj = {
      changed_by: res.Data[0].changed_by == null ? "" : res.Data[0].changed_by,
      id: res.Data[0].id == null ? "" : res.Data[0].id,
      recordedDate: res.Data[0].recorded_date == null ? "" : res.Data[0].recorded_date,
      recordedTime: res.Data[0].recorded_time == null ? "" : res.Data[0].recorded_time,
      snippetValue: res.Data[0].snippet_value == null ? "" : res.Data[0].snippet_value,
      status: res.Data[0].status == null ? "" : res.Data[0].status,
      uomnum: res.Data[0].uom == null ? "" : res.Data[0].uom
    }
    setTextInput(obj)
    dispatch(hideLoader());
  };


  const getImage = async (val) => {
    dispatch(showLoader());
    let login_response = JSON.parse(localStorage.getItem('login_details'));
    var requestOptions = {
      method: "GET",
      response: "image/jpeg",
      psId: "",
      redirect: "follow",
      headers: new Headers({
        "x-access-token": login_response?.token ? login_response?.token : '',
        "resource-name": 'PBR'
      })
    };
    let response = await fetch(
      MDH_APP_PYTHON_SERVICE + `/pbr/udh/get_file_page_image?filename=${val.split('_page-0')[0]}.pdf&pageId=1`,
      requestOptions
    )
      .then((resp) => resp)
      .then((result) => result)
      .catch((error) => console.log("error", error));
    let res = await response.blob();
    setImagePdf(window.webkitURL.createObjectURL(res));
    dispatch(hideLoader());
  }

  const handleCancel = () => {
    setEditingRow(null);
  }

  const handleEdit = async (record) => {
    setEditingRow(record.key);
    form.setFieldsValue({
      changed_by: textInput.changedBy,
      recorded_date: textInput.recordedDate,
      recorded_time: textInput.recordedTime,
      snippet_value: textInput.snippetValue,
      uom: textInput.uomnum,
    });
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setTextInput({
      ...textInput, [event.target.name]: value
    });
  };

  const handleClick = async (event, record) => {
    dispatch(showLoader());
    event.preventDefault();
    let resp = [...idarr];
    resp.push(params.id);
    setIdArr(resp);
    let numberArray = resp.map(Number)
    let formvalues = {
      id: numberArray,
      changed_by: localStorage.getItem('user'),
      recorded_date: textInput.recordedDate,
      recorded_time: textInput.recordedTime,
      snippet_value: textInput.snippetValue,
      status: textInput.status,
      uom: textInput.uomnum,
    };
    let res = await updateApprove(formvalues);
    if (res.Status == "202") {
      dispatch(hideLoader());
      dispatch(showNotification("success", "Updated Successfully"))
      setEditingRow(null)
      loadTableData()

    } else {
      dispatch(hideLoader());
      dispatch(showNotification("erroe", "Error while updtating"))
    }

  };


  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "5%"
    },
    {
      title: "Parameter Name",
      dataIndex: "param_name",
      key: "param_name",
    },
    {
      title: "Anchor Key",
      dataIndex: "anchor_key",
      key: "anchor_key",
    },
    {
      title: "snippet value",
      dataIndex: "snippet_value",
      key: "snippet_value",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item>
              <Input
                id="snippetValue"
                defaultValue={record.snippet_value}
                type="text"
                name="snippetValue"
                onChange={handleChange}
              />
            </Form.Item>

          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Value Image",
      dataIndex: "snippet_image",
      key: "snippet_image",
      render: (text, record, index) => {
        return (
          <img src={`data:image/png;base64,${text}`} width="50%" height="15%" />
        )
      }
    },
    {
      title: "Recorded Date",
      dataIndex: "recorded_date",
      key: "recorded_date",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item>
              <Input
                id="recordedDate"
                defaultValue={record.recorded_date}
                type="text"
                name="recordedDate"
                onChange={handleChange}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Recorded Time",
      dataIndex: "recorded_time",
      key: "recorded_time",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (

            <Form.Item>
              <Input
                id="recordedTime"
                defaultValue={record.recorded_time}
                type="text"
                name="recordedTime"
                onChange={handleChange}
              />
            </Form.Item>
          );
        }
        else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item>
              <Input
                id="uomnum"
                defaultValue={record.uom}
                type="text"
                name="uomnum"
                onChange={handleChange}

              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },


    },
    {
      title: "Updated By",
      dataIndex: "changed_by",
      key: "changed_by",

    },
    {
      title: "Actions",
      fixed: 'right',
      width: "9%",
      render: (_, record) => {
        if (editingRow === record.key) {
          return (
            <Button
              type="link"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          );
        } else {
          return (
            <Button
              type="link"
              onClick={handleEdit}
            >
              Edit
            </Button>
          );
        }
      },
    },
  ]

  return (
    <div className='pbr-container'>
      <BreadCrumbWrapper
        urlName={`/dashboard/pbr_update/${params.id}`}
        value={params.id}
        data={params.id}
      />
      <div className='custom-wrapper'>
        <div className='content_section' >
          <div style={{ marginTop: 20 }}>

            <Row gutter={16}>
              <Col span={12}>
                <h3 style={{ marginBottom: "20px" }}>You may edit the selected unstructured data here.</h3>
                <Table
                  className='edit-table'
                  columns={columns}
                  dataSource={templateData}
                  pagination={false}
                  scroll={{ x: 1200 }}
                  style={{ border: '1px solid #ececec', borderRadius: '2px' }}
                />
              </Col>
              <Col span={12}>
                <div className='' style={{ display: "flex", marginBottom: "20px", flexDirection: "row", justifyContent: "right", alignItems: "center" }}>

                  <Button id="editLogs" style={{
                    borderRadius: "5px",
                    textTransform: "none",
                    background: "#ffffff",
                    borderColor: "#303f9f",
                    color: "#303f9f",
                    marginRight: '15px',

                  }}
                    type='primary'>
                    <a
                      style={{ color: "#303f9f" }}
                      onClick={() => {
                        history.push(`/dashboard/audit_trail_report`);
                      }}
                    >
                      View Auditlogs
                    </a></Button>
                  <Button id="save_button" style={{
                    backgroundColor: '#303f9f',
                    color: '#ffffff',
                    borderColor: "#303f9f",
                    borderRadius: "5px",

                  }}
                    onClick={handleClick}

                    type='primary'>Save Changes</Button>
                </div>
                <div >
                  <img src={imagepdf} width="100%" height="100%" />
                  {/* <iframe class="frame" src={imagepdf} width="600px" height="500px" ></iframe> */}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PbrUpdate