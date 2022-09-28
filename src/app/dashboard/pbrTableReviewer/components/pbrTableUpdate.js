
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
import EditableRow from './EditTable'
/* istanbul ignore next */
const pbrTableUpdate = () => {
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
    let rowArray = ["id", "param_name", "anchor_key", "snippet_value", "snippet_image", "recorded_date", "recorded_time", "uom", "changed_by"]

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
        let arr = res?.Data[0]?.table_value.map((item, index) => ({ ...item, key: index }))
        setTemplateData(arr);
        let filename = res.Data[0].file_path;
        getImage(filename);
        let obj = {
            changed_by: res.Data[0].changed_by == null ? "" : res.Data[0].changed_by,
            id: res.Data[0].id == null ? "" : res.Data[0].id,
            recorded_date: res.Data[0].recorded_date == null ? "" : res.Data[0].recorded_date,
            recorded_time: res.Data[0].recorded_time == null ? "" : res.Data[0].recorded_time,
            snippet_value: res.Data[0].snippet_value == null ? "" : res.Data[0].snippet_value,
            status: res.Data[0].status == null ? "" : res.Data[0].status,
            uom: res.Data[0].uom == null ? "" : res.Data[0].uom
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
            MDH_APP_PYTHON_SERVICE + `/pbr/udh/get_file_page_image?filename=${val.split('_page-')[0]}.pdf&pageId=1`,
            requestOptions
        )
            .then((resp) => resp)
            .then((result) => result)
            .catch((error) => console.log("error", error));
        let res = await response.blob();
        setImagePdf(window.webkitURL.createObjectURL(res));
        dispatch(hideLoader());
    }



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
            recorded_date: textInput.recorded_date,
            recorded_time: textInput.recorded_time,
            snippet_value: textInput.snippet_value,
            status: textInput.status,
            uom: textInput.uom,
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

                        <Row gutter={15}>
                            <Col span={12}>
                                <h3 style={{ marginBottom: "20px" }}>You may edit the selected unstructured data here.</h3>
                                {templateData &&
                                    <div style={{ height: "calc(100vh - 190px)", overflowY: "scroll",border: "0.5px solid blue",marginTop:26 }}>
                                        <EditableRow templateData={templateData} setTemplateData={setTemplateData} setTextInput={setTextInput} textInput={textInput} />
                                    </div>
                                }
                                {/* <Table
                  className='edit-table'
                  size='middle'
                  columns={columns}
                  showHeader={false}
                  dataSource={templateData}
                  pagination={false}
                  // scroll={{ x: 1200 }}
                  style={{ border: '1px solid #ececec', borderRadius: '2px',marginTop:26 }}
                /> */}
                            </Col>
                            <Col span={12}>
                                <div className='' style={{ display: "flex", marginBottom: "20px", flexDirection: "row", justifyContent: "right", alignItems: "center" }}>
                                    <Button id="save_button" style={{
                                        backgroundColor: '#303f9f',
                                        color: '#ffffff',
                                        borderColor: "#303f9f",
                                        borderRadius: "5px",

                                    }}
                                        onClick={handleClick}

                                        type='primary'>Save Changes</Button>
                                </div>
                                <div style={{ height: "calc(100vh - 190px)", overflowY: "scroll", border: "0.5px solid blue" }}>
                                    {/* style={{height:"calc(100vh - 190px)"}} */}
                                    <img src={imagepdf} width="100%" height="700px" />
                                    {/* <iframe class="frame" src={imagepdf} width="600px" height="500px" ></iframe>   */}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default pbrTableUpdate