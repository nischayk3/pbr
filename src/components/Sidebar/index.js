import React from "react";
import {
  ClusterOutlined,
  BarChartOutlined,
  PartitionOutlined,
  FileDoneOutlined,
  DeploymentUnitOutlined,
  FileSearchOutlined,
  CheckCircleOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  AppstoreOutlined,
  FileSyncOutlined,
  AreaChartOutlined,
  FundOutlined,
  SisternodeOutlined,
  NodeIndexOutlined,
  CodeOutlined,
  FileProtectOutlined,
  DiffOutlined,
  // ControlOutlined,
  BlockOutlined,
  // QuestionCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
const { Sider } = Layout;
const { SubMenu } = Menu;

const cpvMenu = [
  {
    key: "view_creation",
    icon: <ClusterOutlined style={{ fontSize: "23px" }} />,
    title: "View Creation",
    linkTo: "/dashboard/view_creation",
  },
  {
    key: "chart_personalization",
    icon: <BarChartOutlined style={{ fontSize: "23px" }} />,
    title: "Chart Personalization",
    linkTo: "/dashboard/chart_personalization",
  },
  {
    key: "genealogy",
    icon: <PartitionOutlined style={{ fontSize: "23px" }} />,
    title: "Genealogy",
    linkTo: "/dashboard/genealogy",
  },
  {
    key: "workflow",
    icon: <FileDoneOutlined style={{ fontSize: "26px" }} />,
    title: "Workflow",
    linkTo: "/dashboard/workflow",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const mouseHover = () => {
    setCollapsed(false);
  };
  return (
    <Sider
      collapsed={collapsed}
      onMouseOver={mouseHover}
      onMouseLeave={() => setCollapsed(true)}
      id="sidebar"
    >
      <Menu theme="dark" mode="inline">
        <Menu.Item
          key="dashboard"
          icon={<AppstoreOutlined style={{ fontSize: "23px" }} />}
          id="dashboard"
        >
          <Link to="/dashboard/dashboard">Dashboard</Link>
        </Menu.Item>
        <SubMenu
          key="sub2"
          mode="inline"
          icon={<NodeIndexOutlined style={{ fontSize: "23px" }} />}
          title="CPV"
        >
          {cpvMenu.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} id={item.key}>
              <Link to={item.linkTo}>{item.title}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
        <SubMenu
          key="sub3"
          mode="inline"
          icon={<SisternodeOutlined style={{ fontSize: "23px" }} />}
          title="Configuration"
        >
          <Menu.Item
            key="hierarchy"
            icon={<DeploymentUnitOutlined style={{ fontSize: "23px" }} />}
            id="hierarchy"
          >
            <Link to="/dashboard/molecule_hierarchy_configuration">
              Hierarchy Config
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          mode="inline"
          icon={<FileSyncOutlined style={{ fontSize: "23px" }} />}
          title="Reports"
        >
          <Menu.Item
            key="audit"
            icon={<FileSearchOutlined style={{ fontSize: "23px" }} />}
            id="audit"
          >
            <Link to="/dashboard/audit_trail_report">Audit Trail</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="report_designer"
          icon={<AppstoreAddOutlined style={{ fontSize: "23px" }} />}
          id="1"
        >
          <Link to="/dashboard/report_designer">Report designer</Link>
        </Menu.Item>
        <Menu.Item
          key="report_generator"
          icon={<BlockOutlined style={{ fontSize: "23px" }} />}
          id="1"
        >
          <Link to="/dashboard/dashboard">Report generator</Link>
        </Menu.Item>
        <SubMenu
          key="sub5"
          mode="inline"
          icon={<AreaChartOutlined style={{ fontSize: "23px" }} />}
          title="Analytics"
        >
          <Menu.Item
            key="data_science_studio"
            icon={<CodeOutlined style={{ fontSize: "23px" }} />}
            id="data_science_studio"
          >
            <Link to="/dashboard/pythonNoteBook">Data Science Studio</Link>
          </Menu.Item>
          <Menu.Item
            key="analysis"
            icon={<FundOutlined style={{ fontSize: "23px" }} />}
            id="analysis"
          >
            <Link to="/dashboard/analysis">Auto ML analytics</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub6"
          mode="inline"
          icon={<FileProtectOutlined style={{ fontSize: "23px" }} />}
          title="Paper batch records"
        >
          <Menu.Item
            key="paper batch records"
            icon={<DiffOutlined style={{ fontSize: "23px" }} />}
            id="paper batch records"
          >
            <Link to="/dashboard/paper_batch_records">Create template</Link>
          </Menu.Item>
          <Menu.Item
            key="pbr_reviewer"
            icon={<CheckCircleOutlined style={{ fontSize: "23px" }} />}
            id="pbr_reviewer"
          >
            <Link to="/dashboard/pbr_reviewer">Approve</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key="user-roles-and-access"
          icon={<TeamOutlined style={{ fontSize: "23px" }} />}
          id="user-roles-and-access"
        >
          <Link to="/dashboard/user-roles-and-access">Roles and access</Link>
        </Menu.Item>
        {/* <Menu.Item
          key="settings"
          icon={<ControlOutlined style={{ fontSize: "23px" }} />}
          id="settings"
        >
          <Link to="/dashboard/audit_trail_report">Settings</Link>
        </Menu.Item>
        <Menu.Item
          key="help"
          icon={<QuestionCircleOutlined style={{ fontSize: "23px" }} />}
          id="help"
        >
          <Link to="/dashboard/audit_trail_report">Help</Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
