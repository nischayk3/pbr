import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "./contentArea.scss";
import TabContent from "./tabContent";
import ContentRenderComponent from "./contentRender";
import { render_side_tab_view, dataSourceView, columnsView, content_view, parametersView_url, view_request } from '../Data/view'
import { render_side_tab_pbr, dataSourcePbr, columnsPbr, content_pbr, parametersPbr_url, pbr_request } from '../Data/pbr'
import { render_side_tab_roles, dataSourceRoles, columnsRoles, content_roles, parametersRoles_url, roles_request, parameterContent_roles } from '../Data/roles'
import { render_side_tab_access, dataSourceAccess, columnsAccess, content_access, parametersAccess_url, access_request, parameterContent_access } from '../Data/access'

import { postViewDownload } from "../../../../../services/viewHierarchyServices";
import { downloadRolesUsersDetails, downloadAllUsersDetails } from "../../../../../services/dataAccess";
import { getPbrReviewerData } from "../../../../../services/pbrService";
export default function DataAccessContentArea(props) {

  const [activeTabKey, setActiveTabKey] = useState("tab1");
  const [selectedSubTabKey, setSelectedSubTabKey] = useState("");

  const tabList = [
    {
      key: "tab1",
      tab: `${props.selectedTab} Extraction`,
    },
  ];

  const tabList_roles = [
    {
      key: "tab1",
      tab: `Roles Extraction`,
      name: "Roles and Access"
    },
    {
      key: "tab2",
      tab: "User Extraction",
      name: 'Access'
    },
  ];


  const renderContent = (selectedTab) => {
    props.setSelectedTab(selectedTab)
    switch (selectedTab) {
      case 'Genealogy':
        return <TabContent />;
      case "View":
        return <ContentRenderComponent render_side_tab={render_side_tab_view} columns={columnsView} dataSource={dataSourceView} content={content_view} url={parametersView_url} request={view_request} getData={postViewDownload} selectedTab={props.selectedTab} />;
      case "PBR":
        return <ContentRenderComponent render_side_tab={render_side_tab_pbr} columns={columnsPbr} dataSource={dataSourcePbr} content={content_pbr} url={parametersPbr_url} request={pbr_request} getData={getPbrReviewerData} selectedTab={props.selectedTab} />;
      case "Roles and Access":
        return <ContentRenderComponent render_side_tab={render_side_tab_roles} columns={columnsRoles} dataSource={dataSourceRoles} content={content_roles} url={parametersRoles_url} request={roles_request} selectedSubTabKey={selectedSubTabKey} getData={downloadRolesUsersDetails} selectedTab={props.selectedTab} parameterContent={parameterContent_roles} />;
      case "Access":
        return <ContentRenderComponent render_side_tab={render_side_tab_access} columns={columnsAccess} dataSource={dataSourceAccess} content={content_access} url={parametersAccess_url} request={access_request} selectedSubTabKey={selectedSubTabKey} getData={downloadAllUsersDetails} selectedTab={props.selectedTab} parameterContent={parameterContent_access} />;
      default:
        return <TabContent />;
    }
  }
  const contentList = {
    tab1: renderContent(props.selectedTab),
    tab2: renderContent(props.selectedTab),
    tab3: renderContent(props.selectedTab),
  };

  const onTabChange = (key, tab) => {
    setActiveTabKey(key);
    setSelectedSubTabKey(tabList_roles.find(x => x.key === key).name)
  };

  useEffect(() => {
    renderTab()
  }, [props.selectedTab, selectedSubTabKey])
  const renderTab = () => {
    if (props.selectedTab == "Roles and Access" || selectedSubTabKey == "Access") {
      return tabList_roles
    }
    else
      return tabList
  }
  console.log(props.selectedTab)
  return (
    <div className="content-card">
      <Card
        tabList={renderTab()}
        activeTabKey={activeTabKey}
        onTabChange={(key, tab) => {
          onTabChange(key, tab);
        }}
        title={false}
      >
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
}
