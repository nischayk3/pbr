import React from "react";
//antd-imports
import { Button } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
//componenets
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";

const ViewPageAnalysis = () => {
  return (
    <div className="custom-wrapper bread-wrapper">
      <div className="sub-header">
        <BreadCrumbWrapper
          urlName={`/dashboard/chart_personalization/${1}`}
          // value={chartDetails.current.chartId}
          data="Untitled"
        />
        <div className="btns">
          <div>
            <Button>Share</Button>
            <Button>Save</Button>
            <Button>Save As</Button>
            <Button>Execute</Button>
            <Button>
              <CloudUploadOutlined />
              Publish
            </Button>
          </div>
        </div>
      </div>
      <div className="custom-content-layout"></div>
      {/* <Signature
        isPublish={isPublish}
        handleClose={handleClose}
        screenName="Chart Personalization"
        PublishResponse={PublishResponse}
        appType="CHART"
        dispId={postChartData.data && postChartData.data[0].chart_id}
        version={postChartData.data && postChartData.data[0].chart_version}
        status={approveReject}
      /> */}
    </div>
  );
};

export default ViewPageAnalysis;
