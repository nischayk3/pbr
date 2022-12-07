import React, { useState } from "react";
import illustrations from "../../../../../assets/images/ChartBanner.svg";
import ScreenHeader from "../../../../../components/ScreenHeader/screenHeader";
import DataEntryFormTabs from "./tabs/tabsList";
import DataEntryCardArea from "./cardArea/cardArea";
import { Col, Row } from "antd";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";

export default function FormEntryLanding() {

    const [id, setId] = useState('')
    const [templateData, setTemplateData] = useState([])

    return (
        <div className="custom-wrapper bread-wrap">
            <div className="sub-header">
                <BreadCrumbWrapper
                    urlName={`/elog_book/data_entry_forms/${id}`}
                    value={id ? id : "New"}
                    data={id ? id : "New"} />
            </div>
            <div className="custom-content-layout">
                <ScreenHeader
                    bannerbg={{
                        background:
                            "linear-gradient(180deg, #E7E5FF 0%, #FFF4F4 100%)",
                    }}
                    title={`Howdy ${localStorage.getItem("username")},`}
                    description="Filling in some data for products today? 
                    Let’s get started!"
                    source={illustrations}
                    sourceClass="dashboard-landing"
                />
                <Row>
                    <Col span={5}>
                        <DataEntryFormTabs setId={setId} setTemplateData={setTemplateData} />
                    </Col>
                    <Col span={19}>
                        <DataEntryCardArea templateData={templateData} id={id} />
                    </Col>
                </Row>
            </div>
        </div>
    )

}