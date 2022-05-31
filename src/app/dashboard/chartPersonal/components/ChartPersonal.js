import React from "react";
import "./style.scss";
//antd imports
import { Tabs } from "antd";
//components
import LandingPage from "./landingPage/LandingPage";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";

const { TabPane } = Tabs;

//main component
const ChartPersonal = () => {
  return (
    <div className="custom-wrapper bread-wrap">
      <div className="sub-header">
        <BreadCrumbWrapper />
      </div>
      <div className="custom-content-layout">
        <LandingPage />
      </div>
    </div>
  );
};

export default ChartPersonal;
