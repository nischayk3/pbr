import React, { useEffect, useState } from 'react'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper';
import { useLocation, useParams } from 'react-router-dom';
import { Input, Col, Row, Card, Avatar } from 'antd';
import { getPdfData } from '../../../../services/pbrService'
import greenCircle from '../../../../assets/greenCircle.png'
import red_circle from '../../../../assets/red_circle.png'
import QueryString from 'query-string';
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { pdfjs } from 'react-pdf';
import BatchRecordPdf from '../../../../assets/images/BatchRecordPdf.pdf'

import './style.scss'



function ViewPdf() {
    const { id } = useParams()
    const [cardData, setCardData] = useState([])

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfVersion = "3.3.122"
    const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`

    useEffect(() => {
        getPdfMetaData()
    }, [])

    const getPdfMetaData = async (value) => {
        try {
            let req = {
                search_text: null,
                file_id: Number(id),
                duration: null
            }
            let res = await getPdfData(req)
            if (res['status-code'] === 200) {
                setCardData(res.Data)
            } else {
                setCardData([])
            }
        } catch (err) {
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
                                <div style={{ marginTop: 30 }}>
                                    <div className='metaData'>
                                        <div>
                                            <p className='pStyle' >Batch</p>
                                            <p className='pValue'> {cardData[0]?.batch_num}</p>
                                        </div>
                                        <div>
                                            <p className='pStyle' >Material Number</p>
                                            <p className='pValue'> {cardData[0]?.product_num}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 30 }}>
                                    <div className='metaData'>
                                        <div>
                                            <p className='pStyle' >Site</p>
                                            <p className='pValue'> {cardData[0]?.site_code}</p>
                                        </div>
                                        <div style={{ marginRight: 66 }}>
                                            <p className='pStyle' >File ID</p>
                                            <p className='pValue'> {cardData[0]?.file_id}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 30 }}>
                                    <div className='metaData1' >
                                        <div>
                                            <p className='pStyle' >Time Zone</p>
                                            <p className='pValue'> {cardData[0]?.timezon}</p>
                                        </div>
                                        <div>
                                            <p className='pStyle' >Uploaded By</p>
                                            <Avatar
                                                className='avatar-icon'
                                                style={{ backgroundColor: getRandomColor(1 + 1) }}>
                                                {cardData[0]?.created_by?.split('')[0]?.toUpperCase()}{' '}
                                            </Avatar>
                                            <span className='avatar-text' style={{ marginLeft: 10 }}>{cardData[0]?.created_by.split('@')[0]}</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={14}>
                                <Worker workerUrl={pdfWorkerUrl}>
                                    <div style={{ height: "720px" }}>
                                        <Viewer fileUrl={BatchRecordPdf} plugins={[defaultLayoutPluginInstance]} />
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