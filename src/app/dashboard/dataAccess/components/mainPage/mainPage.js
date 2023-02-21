import React, { useState } from "react";
import DataAccessLandingPage from "../landingPage/landing";
import DataAccessTabs from "../tabs/tabsList";
import DataAccessContentArea from "../contentArea/contentArea";
import { Col, Row } from "antd";
import "./mainPage.scss";

export default function DataAccessMainPage() {
  const [selectedTab, setSelectedTab] = useState("Genealogy");
  return (
    <div>
      <DataAccessLandingPage />
      <div className="rows">
        <Row>
          <Col span={6}>
            {" "}
            <DataAccessTabs setSelectedTab={setSelectedTab} />
          </Col>
          <Col span={18}>
            <DataAccessContentArea selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
