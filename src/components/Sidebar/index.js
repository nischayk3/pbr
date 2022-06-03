import "./style.scss";
import {
	AppstoreAddOutlined,
	AppstoreOutlined,
	AreaChartOutlined,
	BarChartOutlined,
	ClusterOutlined,
	CodeOutlined,
	DeploymentUnitOutlined,
	FileDoneOutlined,
	FileProtectOutlined,
	FileSearchOutlined,
	FundProjectionScreenOutlined,
	HomeOutlined,
	LayoutOutlined,
	PartitionOutlined,
	SolutionOutlined,
	TeamOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MENU = [
	{
		key: "workspace",
		icon: <HomeOutlined style={{ fontSize: "23px" }} />,
		title: "Workspace",
		linkTo: "/dashboard/workspace",
	},
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
		key: "dashboard",
		icon: <FundProjectionScreenOutlined style={{ fontSize: "23px" }} />,
		title: "Dashboard",
		linkTo: "/dashboard/dashboard",
	},
	{
		key: "report_designer",
		icon: <AppstoreAddOutlined style={{ fontSize: "23px" }} />,
		title: "Report Designer",
		linkTo: "/dashboard/report_designer",
	},
	{
		key: "workflow",
		icon: <FileDoneOutlined style={{ fontSize: "26px" }} />,
		title: "Workflow",
		linkTo: "/dashboard/workflow",
	},
	{
		key: "genealogy",
		icon: <PartitionOutlined style={{ fontSize: "23px" }} />,
		title: "Genealogy",
		linkTo: "/dashboard/genealogy",
	},

	{
		key: "manual_data_upload",
		icon: <UploadOutlined style={{ fontSize: "23px" }} />,
		title: "Manual Data Upload",
		linkTo: "/dashboard/manual_data_upload",
	},
	{
		key: "audit_trail_report",
		icon: <FileSearchOutlined style={{ fontSize: "23px" }} />,
		title: "Audit Trail Report",
		linkTo: "/dashboard/audit_trail_report",
	},
	{
		key: "paper batch records",
		icon: <FileProtectOutlined style={{ fontSize: "23px" }} />,
		title: "Paper Batch Records",
		linkTo: "/dashboard/paper_batch_records",
	},
	{
		key: "pbr_reviewer",
		icon: <LayoutOutlined style={{ fontSize: "23px" }} />,
		title: "Pbr Reviewer",
		linkTo: "/dashboard/pbr_reviewer",
	},
	{
		key: "pbr_update",
		icon: <LayoutOutlined style={{ fontSize: "23px" }} />,
		title: "Pbr Update",
		linkTo: "/dashboard/pbr_update",
	},
	{
		key: "data_science_studio",
		icon: <CodeOutlined style={{ fontSize: "23px" }} />,
		title: "Data Science Studio",
		linkTo: "/dashboard/pythonNoteBook",
	},
	{
		key: "analysis",
		icon: <AreaChartOutlined style={{ fontSize: "23px" }} />,
		title: "Analysis",
		linkTo: "/dashboard/analysis",
	},
	{
		key: "user-roles-and-access",
		icon: <TeamOutlined style={{ fontSize: "23px" }} />,
		title: "User Roles",
		linkTo: "/dashboard/user-roles-and-access",
	},
	{
		key: "hierarchy",
		icon: <DeploymentUnitOutlined style={{ fontSize: "23px" }} />,
		title: "Hierarchy",
		linkTo: "/dashboard/molecule_hierarchy_configuration",
	}

];

const { Sider } = Layout;

const Sidebar = () => {
	const [selectedKey, setSelectedKey] = useState("");
	const location = useLocation();
	const collapsed = useSelector((state) => state.commonReducer.isMenuCollapsed);
	const theme = useSelector((state) => state.commonReducer.theme);

	const init = useCallback(() => {
		const screen = location.pathname.split("/");
		const key = MENU.filter((item) => {
			return screen.length > 2
				? screen[2]
					.toLowerCase()
					.includes(item.title.replace(/\s/g, "").toLowerCase())
				: false;
		})[0]?.["key"];
		if (key) {
			setSelectedKey(key);
		}
	}, [location.pathname]);

	useEffect(() => {
		init();
	}, [init, location.pathname]);
	return (
		<Sider collapsed={collapsed} theme={theme} id="sidebar">
			<div>
				{/* <div id='logo-small'></div> */}
				<Menu selectedKeys={[selectedKey]} mode="inline" theme={theme}>
					{MENU.map((item) => (
						<Menu.Item key={item.key} icon={item.icon} id={item.key}>
							<Link to={item.linkTo}>{item.title}</Link>
						</Menu.Item>
					))}
				</Menu>
			</div>
		</Sider>
	);
};

export default Sidebar;
