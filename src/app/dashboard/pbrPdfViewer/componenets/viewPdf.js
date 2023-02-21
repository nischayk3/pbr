import React, { useEffect, useState } from 'react'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import { useParams } from 'react-router-dom';
import { Col, Row, Card, Avatar } from 'antd';
import { getPdfData } from '../../../../services/pbrService'
import greenCircle from '../../../../assets/greenCircle.png'
import red_circle from '../../../../assets/red_circle.png'
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { MDH_APP_PYTHON_SERVICE } from '../../../../constants/apiBaseUrl';
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useDispatch } from 'react-redux';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import BatchRecordPdf from '../../../../assets/images/BatchRecordPdf.pdf'
import {
    hideLoader,
    showLoader,
    showNotification
} from '../../../../duck/actions/commonActions';
import SearchSidebarWithDefaultLayoutExample from './deepSearch'
import './style.scss'

function ViewPdf() {
    const dispatch = useDispatch();
    const { id } = useParams()
    const [cardData, setCardData] = useState([])
    const [pdfFile, setPdfFile] = useState(BatchRecordPdf)

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfVersion = "3.3.122"
    const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.min.js`

    useEffect(() => {
        getPdfMetaData()
    }, [])

    const getPdf = async (val) => {
        dispatch(showLoader());
        let login_response = JSON.parse(localStorage.getItem('login_details'));
        var requestOptions = {
            method: "GET",
            response: "application/pdf",
            psId: "",
            redirect: "follow",
            headers: new Headers({
                "x-access-token": login_response?.token ? login_response?.token : '',
                "resource-name": 'PBR'
            })
        };
        let response = await fetch(
            MDH_APP_PYTHON_SERVICE + `/pbr/udh/get_embedded_pdf?filename=${val}`,
            requestOptions
        )
            .then((resp) => resp)
            .then((result) => result)
            .catch((error) => console.log("error", error));
        let res = await response.blob();
        setPdfFile(URL.createObjectURL(res));
        dispatch(hideLoader());
    }

    const getPdfMetaData = async (value) => {
        dispatch(showLoader());
        try {
            let req = {
                search_text: null,
                file_id: Number(id),
                duration: null
            }
            let res = await getPdfData(req)
            if (res['status-code'] === 200) {
                dispatch(hideLoader());
                setCardData(res.Data)
                getPdf(res?.Data[0]?.filename)
            } else {
                dispatch(hideLoader());
                setCardData([])
            }
        } catch (err) {
            dispatch(hideLoader());
            console.log(err)
        }

    }

    const getRandomColor = index => {
        let colors = ['#56483F', '#728C69', '#c04000', '#c19578'];
        return colors[index % 4];
    };

    return (
        <div className='pbr-container'>
            <BreadCrumbWrapper
                urlName={`/dashboard/pbr-pdf-viewer/${id}`}
                value={id}
                data={id}
            />
            <Row className='landing-content p-28'>
                <Col className='viewPdfCard' span={24}>
                    <Card bordered={false}>
                        <Row>
                            <Col span={10}>
                                <div style={{ display: "flex" }}>
                                    <p className='pdfHeader'>{cardData[0]?.filename}</p>
                                    <div style={{ marginTop: 2, marginLeft: 14 }}>
                                        <img src={cardData[0]?.status === "P" ? greenCircle : red_circle} style={{ width: cardData[0]?.status === "P" ? 10 : 30 }} />
                                        <span style={{ fontWeight: 600, marginLeft: 15 }}>{cardData[0]?.status === "P" ? "Success" : "Fail"}</span>
                                    </div>
                                </div>
                                <Row style={{ marginTop: 25 }}>
                                    <Col span={10}>
                                        <div>
                                            <p className='pStyle' >Batch</p>
                                            <p className='pValue'> {cardData[0]?.batch_num}</p>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <div>
                                            <p className='pStyle' >Material Number</p>
                                            <p className='pValue'> {cardData[0]?.product_num}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 25 }}>
                                    <Col span={10}>
                                        <div>
                                            <p className='pStyle' >Site</p>
                                            <p className='pValue'> {cardData[0]?.site_code}</p>
                                        </div>

                                    </Col>
                                    <Col span={6}>
                                        <div style={{ marginRight: 66 }}>
                                            <p className='pStyle' >File ID</p>
                                            <p className='pValue'> {cardData[0]?.file_id}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 25 }}>
                                    <Col span={10}>
                                        <div>
                                            <p className='pStyle' >Time Zone</p>
                                            <p className='pValue'> {cardData[0]?.timezone}</p>
                                        </div>

                                    </Col>
                                    <Col span={6}>
                                        <div>
                                            <p className='pStyle' >Created On</p>
                                            <p className='pValue'> {cardData[0]?.created_on?.split("T")[0]}</p>
                                        </div>

                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 25 }}>
                                    <Col span={10}>
                                        <div style={{ width: 195 }}>
                                            <p className='pStyle' >Uploaded By</p>
                                            <Avatar
                                                className='avatar-icon'
                                                style={{ backgroundColor: getRandomColor(1 + 1) }}>
                                                {cardData[0]?.created_by?.split('')[0]?.toUpperCase()}{' '}
                                            </Avatar>
                                            <span className='avatar-text' style={{ marginLeft: 10 }}>{cardData[0]?.created_by.split('@')[0]}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={14}>
                                <Worker workerUrl={pdfWorkerUrl}>
                                    <div style={{ height: "720px" }}>
                                        {/* <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} /> */}
                                        <SearchSidebarWithDefaultLayoutExample fileUrl={pdfFile} />
                                    </div>
                                </Worker>
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ViewPdf