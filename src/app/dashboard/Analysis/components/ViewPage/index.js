import React from "react";
//antd-imports
import { Button, Tabs } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
//componenets
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import Model from "./model/Model";
import Preprocess from "./preproccessing/Preprocess";

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
      <div className="custom-content-layout">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Preprocess" key="1">
            <Preprocess />
          </TabPane>
          <TabPane tab="Model" key="2">
            <Model />
          </TabPane>
          <TabPane tab="Model data" key="3">
            ModelData
          </TabPane>
        </Tabs>
      </div>
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
