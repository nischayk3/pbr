import React, { useState } from "react";
import { Card } from "antd";
import "./contentArea.scss";
import TabContent from "./tabContent";
import ContentRenderComponent from "./contentRender";
import { render_side_tab_view, dataSourceView, columnsView, content_view, parametersGenealogy_url, view_request } from '../Data/view'
import { postViewDownload } from "../../../../../services/viewHierarchyServices";
export default function DataAccessContentArea(props) {

  const [activeTabKey, setActiveTabKey] = useState("tab1");

  const tabList = [
    {
      key: "tab1",
      tab: "Genealogy Extraction",
    },
  ];

  const renderContent = (selectedTab) => {
    switch (selectedTab) {
      case 'Genealogy':
        return <TabContent />;
      case "View":
        return <ContentRenderComponent render_side_tab={render_side_tab_view} columns={columnsView} dataSource={dataSourceView} content={content_view} url={parametersGenealogy_url} request={view_request} getData={postViewDownload} selectedTab={props.selectedTab} />;
      default:
        return <TabContent />;
    }
  }
  const contentList = {
    tab1: renderContent(props.selectedTab),
    tab2: <ContentRenderComponent />,
    tab3: <p>content3</p>,
  };
  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <div className="content-card">
      <Card
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTabChange(key);
        }}
        title={false}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
}
