import React from "react";
import "./transformationStyles.scss";
import TransformationList from "./transformationList/TransformationList";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const Transformation = () => {
  return (
    <div className="trans-container">
      <Tabs tabPosition="left">
        <TabPane tab="Transformations" key="1">
          <TransformationList type="transformation" />
        </TabPane>
        <TabPane tab="Feature Union" key="2">
          <TransformationList type="futureUnion" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Transformation;
