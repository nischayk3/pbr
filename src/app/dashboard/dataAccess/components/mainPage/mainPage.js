import React from "react";
import DataAccessLandingPage from "../landingPage/landing";
import DataAccessTabs from "../tabs/tabsList";
import DataAccessContentArea from "../contentArea/contentArea";
import { Col, Row } from "antd";
import './mainPage.scss'



export default function DataAccessMainPage() {
    return (
        <div>
            <DataAccessLandingPage />
            <div className="rows">
                <Row >
                    <Col span={6}> <DataAccessTabs /></Col>
                    <Col span={18}><DataAccessContentArea /></Col>
                </Row>
            </div>
        </div>
    )

}