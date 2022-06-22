import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Button, Modal, Input, Form, DatePicker, TimePicker } from 'antd';
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
  const [modalData, setModalData] = useState([]);
  const [displayImage, setDisplayImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const { id } = useParams();
  const location = useLocation();
  const params = queryString.parse(location.search);
  useEffect(() => {

    loadTableData();

  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
  };


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

  const modalcolumns = [
    {
      title: "User",
      dataIndex: "created_by",
      key: "created_by",
      defaultSortOrder: "descend",
      onHeaderCell: (column) => {
        return {
          onClick: (e) => {
            this.loadData(column.dataIndex);
          }
        };
      },
    },
    {
      title: "Event",
      dataIndex: "activity",
      key: "3",
      defaultSortOrder: "descend",
      onHeaderCell: (column) => {
        return {
          onClick: (e) => {
            this.loadData(column.dataIndex);
          }
        };
      },
    },
    {
      title: "Old Value",
      dataIndex: "old_value",
      key: "3",
      defaultSortOrder: "descend",
      onHeaderCell: (column) => {
        return {
          onClick: (e) => {
            this.loadData(column.dataIndex);
          }
        };
      },
      className: "old_value_class",

      sorter: (a, b) => a.old_value - b.old_value
    },
    {
      title: "New Value",
      dataIndex: "new_value",
      key: "3",
      defaultSortOrder: "descend",
      className: "old_value_class",
      onHeaderCell: (column) => {
        return {
          onClick: (e) => {
            this.loadData(column.dataIndex);
          }
        };
      },
      sorter: (a, b) => a.new_value - b.new_value
    },
    {
      title: "Reason For Change",
      dataIndex: "reason",
      key: "2",
      defaultSortOrder: "descend",
      onHeaderCell: (column) => {
        return {
          onClick: (e) => {
            this.loadData(column.dataIndex);
          }
        };
      },
    },
    {
      title: "Changed On",
      dataIndex: "entry_date",
      key: "1",
      width: 200,
      defaultSortOrder: "descend",
      onHeaderCell: (column) => {
        return {
          onClick: (e) => {
            this.loadData(column.dataIndex);
          }
        };
      },
      sorter: (a, b) => new Date(a.entry_date) - new Date(b.entry_date),
      render: (text) => moment(text).format("YYYY-MM-DD")
    },

  ]

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
      changed_by: textInput.changedBy,
      recorded_date: textInput.recordedDate,
      recorded_time: textInput.recordedTime,
      snippet_value: textInput.snippetValue,
      uom: textInput.uomnum,
    });
  }

  // const handleChangeDate = (index, event, dateString, timeString) => {


  //   if (dateString != undefined) {
  //     const rowsInput = [textInput];
  //     rowsInput[index]["recordedDate"] = dateString._d.toLocaleDateString();
  //   }

  // }

  // const handleChangeTime = (index, event, dateString) => {

  //   if (dateString != undefined) {
  //     const rowsInput = [textInput];
  //     rowsInput[index]["recordedTime"] = dateString._d.toLocaleTimeString();
  //   }
  // }

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
      changed_by: textInput.changedBy,
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
      // width: "5%",
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
      title: "Recorded Date",
      dataIndex: "recorded_date",
      key: "recorded_date",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item>
              <Input
                defaultValue={record.recorded_date}
                type="text"
                name="recordedDate"
                onChange={handleChange}
              />
            </Form.Item>

            // <Input
            //   type="text"
            //   name="recordedDate"
            //   defaultValue={record.snippet_value}
            //   onChange={handleChange}
            //   // defaultValue={
            //   //   record.recorded_date ? moment(record.recorded_date) : ""
            //   // }
            //   // onChange={(dateString) => handleChangeDate(index, "", dateString)}
            // />

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
                defaultValue={record.recorded_time}
                type="text"
                name="recordedTime"
                onChange={handleChange}
              />
            </Form.Item>

            // <TimePicker
            //   name="recordedTime"
            //   onChange={(timeString) => handleChangeTime(index, "", timeString)}


            //   defaultValue={moment(record.recorded_time, 'HH:mm')}

            // />
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
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item>
              <Input
                defaultValue={record.changed_by}
                type="text"
                name="changedBy"
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
      fixed: 'right',
      width: "5%",
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
    <div className='pbr-container'>
      <BreadCrumbWrapper />
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

                style={{ border: '1px solid #ececec', borderRadius: '2px' }}
              />
            </Col>
            <Col span={12}>
              <div className='' style={{ display: "flex", marginBottom: "20px", flexDirection: "row", justifyContent: "right", alignItems: "center" }}>

                <Button style={{
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
                    // onClick={() => {
                    //   setIsModalVisible(true)
                    // history.push({
                    //     pathname: '/dashboard/molecule_hierarchy_configurations/untilted_view',
                    // });
                    // }}
                    onClick={() => {
                      history.push(`/dashBoard/audit_trail_report`);
                    }}
                  >

                    View Auditlogs
                  </a></Button>
                <Button style={{
                  backgroundColor: '#303f9f',
                  color: '#ffffff',
                  borderColor: "#303f9f",
                  borderRadius: "5px",

                }}
                  onClick={handleClick}

                  type='primary'>Save Changes</Button>
              </div>
              <div>
                <img src={imagepdf} width="100%" height="100%" />
              </div>


            </Col>
          </Row>
        </div>
      </div>
      </div>
      <Modal
        title='Preview'
        visible={isModalVisible}
        //onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        <Table
          className='pbrTemplates-table'
          columns={modalcolumns}
          dataSource={modalData}
          pagination={false}

        />
      </Modal>
    </div>
  )
}

export default PbrUpdate