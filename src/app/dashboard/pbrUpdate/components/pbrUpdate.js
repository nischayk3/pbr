import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Input, Form, DatePicker, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  hideLoader,
  showLoader,
  showNotification,
} from '../../../../duck/actions/commonActions';
import { useLocation, useParams } from "react-router";
import { getPbrReviewerData, updateApprove, getImage } from '../../../../services/pbrService'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import queryString from "query-string";
import './styles.scss';
import { MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';



const PbrUpdate = () => {
  const dispatch = useDispatch();
  const [templateData, setTemplateData] = useState([]);
  const [displayImage, setDisplayImage] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [imagepdf, setImagePdf] = useState("");
  const history = useHistory();
  const [textInput, setTextInput] = useState({
    id: "",
    recordedDate: "",
    recordedTime: "",
    snippetValue: "",
    status: "",
    uomnum: ""
  });
  const [form] = Form.useForm();
  const [idarr, setIdArr] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const params = queryString.parse(location.search);
  useEffect(() => {

    loadTableData();

  }, []);

  const loadTableData = async () => {

    let req = { id: params.id }
    let res = await getPbrReviewerData(req);
    setTemplateData(res.Data);
    let filename = res.Data[0].file_path;
    getImage(filename);

    // if (res.Data.length > 0) {
    //   res.Data.forEach((i) => {
    //     if (i.key_ !== null) {
    //       res.Data.forEach((item) => {

    //         let antdObj = {};
    //         antdObj["file_path"] = item.file_path;
    //         let file = `${MDH_APP_PYTHON_SERVICE}/pbr/udh/get_file_page_image?filename=${item.file_path?.split('_')[0]}.pdf&pageId=1`;
    //         setImagePdf(file);

    //       });

    //     }
    //   });

    // }





  };

  // const getImagePdf = async (file) => {

  //   let res = {
  //     filename: `${file.split('_')[0]}.pdf`,
  //     pageId: 1
  //   };


  //   let obj = await getImage(res);

  //   setImagePdf(window.webkitURL.createObjectURL(obj));

  // }


  const getImage = async (val) => {
    var requestOptions = {
      method: "GET",
      response: "image/jpeg",
      psId: "",
      redirect: "follow",
    };
    let response = await fetch(
      MDH_APP_PYTHON_SERVICE + `/pbr/udh/get_file_page_image?filename=${val.split('_')[0]}.pdf&pageId=1`,
      requestOptions
    )
      .then((response) => response)
      .then((result) => result)
      .catch((error) => console.log("error", error));
    let res = await response.blob();
    setImagePdf(window.webkitURL.createObjectURL(res));

  }




  const handleEdit = async (record) => {
    setEditingRow(record.key);

    form.setFieldsValue({
      recorded_date: textInput.recordedDate,
      recorded_time: textInput.recordedTime,
      snippet_value: textInput.snippetValue,
      uom: textInput.uomnum,
    });
  }

  const handleChangeDate = (index, event, dateString, timeString) => {


    if (dateString != undefined) {
      const rowsInput = [textInput];
      rowsInput[index]["recordedDate"] = dateString._d.toLocaleDateString();
    }

  }

  const handleChangeTime = (index, event, dateString) => {

    if (dateString != undefined) {
      const rowsInput = [textInput];
      rowsInput[index]["recordedTime"] = dateString._d.toLocaleTimeString();
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setTextInput({
      ...textInput, [event.target.name]: value
    });
  };




  const handleClick = async (event, record) => {

    event.preventDefault();

    let resp = [...idarr];
    resp.push(params.id);
    setIdArr(resp);

    let numberArray = resp.map(Number)
    let formvalues = {
      id: numberArray,
      recorded_date: textInput.recordedDate,
      recorded_time: textInput.recordedTime,
      snippet_value: textInput.snippetValue,
      status: null,
      uom: textInput.uomnum,
    };

    let res = await updateApprove(formvalues);

    if (res.Status == "202") {

      dispatch(showNotification("success", "Updated Successfully")),
        dispatch(showLoader());
      setTimeout(() => window.location.reload(),
        1000
      );

    }

  };



  const columns = [

    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Recorded Date",
      dataIndex: "recorded_date",
      key: "recorded_date",
      render: (text, record, index) => {
        if (editingRow === record.key) {
          return (

            <DatePicker
              type="text"
              name="recordedDate"
              defaultValue={
                record.recorded_date ? moment(record.recorded_date) : ""
              }
              onChange={(dateString) => handleChangeDate(index, "", dateString)}
            />

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
      render: (text, record, index) => {
        if (editingRow === record.key) {
          return (

            <TimePicker
              name="recordedTime"
              onChange={(timeString) => handleChangeTime(index, "", timeString)}


              defaultValue={moment(record.recorded_time, 'HH:mm')}

            />
          );

        }
        else {
          return <p>{text}</p>;
        }
      },

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
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item>
              <Input
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
      title: "Actions",
      render: (_, record) => {
        return (
          <>

            <Button
              type="link"
              onClick={handleEdit}
            >
              Edit
            </Button>


          </>
        );
      },
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
              <div className='' style={{ display: "flex", marginBottom: "20px", flexDirection: "row", justifyContent: "right", alignItems: "center" }}>

                <Button style={{
                  borderColor: '#093185',
                  color: '#093185',
                  marginRight: '20px',
                  backgroundColor: '#fff',
                }}
                  type='primary'><a
                    style={{ color: "#1890ff" }}
                    onClick={() => {
                      history.push(`/dashBoard/audit_trail_report`);
                    }}

                  >
                    View Auditlogs
                  </a></Button>
                <Button style={{
                  backgroundColor: '#093185',
                  color: '#ffffff',

                }}
                  onClick={handleClick}

                  type='primary'>Save Changes</Button>
              </div>
              <img src={imagepdf} width="750px" height="700px" type="application/pdf" />
              
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default PbrUpdate