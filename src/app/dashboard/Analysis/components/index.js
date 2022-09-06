import React from "react";
import "./styles.scss";
//components
import LandingPage from "./landingPage";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";

//main component
const Analysis = () => {
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

export default Analysis;
