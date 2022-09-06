import React, { useState } from "react";
import "./viewPage.scss";
//antd-imports
import { Button, Tabs } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
//componenets
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import Model from "./model/Model";
import Preprocess from "./preproccessing/Preprocess";
import Transformation from "./transformations";
import ModelData from "./ModelData";

const ViewPageAnalysis = () => {
  const [modelData, setModelData] = useState();
  const [tableKey, setTableKey] = useState("1");
  const tabChange = (key) => {
    setTableKey(key);
  };

  return (
    <div className="custom-wrapper bread-wrapper view-analysis-container">
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
      <div className="custom-content-layout menu-tabs-color">
        <Tabs
          defaultActiveKey="1"
          activeKey={tableKey}
          onChange={tabChange}
          tabBarExtraContent={
            tableKey === "4" && (
              <Button className="save-button-extra">Save</Button>
            )
          }
        >
          <TabPane tab="Preprocess" key="1">
            <Preprocess setModelData={setModelData} setTableKey={setTableKey} />
          </TabPane>
          <TabPane tab="Model data" key="2">
            <ModelData modelData={modelData} />
          </TabPane>
          <TabPane tab="Model" key="3">
            <Model />
          </TabPane>
          <TabPane tab="Transformation" key="4">
            <Transformation />
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
