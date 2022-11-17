import React from "react";
import "./style.scss";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import DataAccessMainPage from "./mainPage/mainPage";

const DataAccess = () => {
    return (
        <div className="custom-wrapper bread-wrap">
            <div className="sub-header">
                <BreadCrumbWrapper />
            </div>
            <div className="custom-content-layout">
                <DataAccessMainPage />
            </div>
        </div>
    );
};

export default DataAccess;
