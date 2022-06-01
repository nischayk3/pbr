import {
  FundProjectionScreenOutlined,
  ClusterOutlined,
  BarChartOutlined,
  PartitionOutlined,
  FileDoneOutlined,
  DeploymentUnitOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
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

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="1"
          icon={<FundProjectionScreenOutlined style={{ fontSize: "23px" }} />}
          id="1"
        >
          <Link to="/dashboard/dashboard">Dashboard</Link>
        </Menu.Item>
        <SubMenu
          key="sub2"
          mode="inline"
          icon={<FundProjectionScreenOutlined style={{ fontSize: "23px" }} />}
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
          icon={<FundProjectionScreenOutlined style={{ fontSize: "23px" }} />}
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
          icon={<FundProjectionScreenOutlined style={{ fontSize: "23px" }} />}
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
      </Menu>
    </Sider>
  );
};

export default App;
