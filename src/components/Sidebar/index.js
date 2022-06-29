import React, { useState } from "react";
import "./style.scss";
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
	FundProjectionScreenOutlined,
	UploadOutlined,
	BlockOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Sider } = Layout;
const { SubMenu } = Menu;

const cpvMenu = [
	{
		key: "view_creation",
		icon: <ClusterOutlined className="menu-icons" />,
		title: "View Creation",
		linkTo: "/dashboard/view_creation",
	},
	{
		key: "chart_personalization",
		icon: <BarChartOutlined className="menu-icons" />,
		title: "Chart Personalization",
		linkTo: "/dashboard/chart_personalization",
	},
	{
		key: "chart_configuration",
		icon: <FundProjectionScreenOutlined className="menu-icons" />,
		title: "Chart Configuration",
		linkTo: "/dashboard/dashboard",
	},
	{
		key: "genealogy",
		icon: <PartitionOutlined className="menu-icons" />,
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
			className={!collapsed ? "collapse-side-bar" : ""}
		>
			<Menu theme="dark" mode="inline">
				<Menu.Item
					key="workspace"
					icon={<AppstoreOutlined className="menu-icons" />}
					id="workspace"
				>
					<Link to="/dashboard/workspace">Dashboard</Link>
				</Menu.Item>
				<SubMenu
					key="sub2"
					mode="inline"
					icon={<NodeIndexOutlined className="menu-icons" />}
					title="CPV"
				>
					{cpvMenu.map((item) => (
						item.key === 'chart_configuration' ? (
							<Menu.Item key={item.key} icon={item.icon} id={item.key} onClick={() => window.location.reload()}>
								<Link to={item.linkTo}>{item.title}</Link>
							</Menu.Item>
						) : (
							<Menu.Item key={item.key} icon={item.icon} id={item.key}>
								<Link to={item.linkTo}>{item.title}</Link>
							</Menu.Item>
						)
					))}
				</SubMenu>
				<SubMenu
					key="sub3"
					mode="inline"
					icon={<SisternodeOutlined className="menu-icons" />}
					title="Configuration"
				>
					<Menu.Item
						key="hierarchy"
						icon={<DeploymentUnitOutlined className="menu-icons" />}
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
					icon={<FileSyncOutlined className="menu-icons" />}
					title="Reports"
				>
					<Menu.Item
						key="audit"
						icon={<FileSearchOutlined className="menu-icons" />}
						id="audit"
					>
						<Link to="/dashboard/audit_trail_report">Audit Trail</Link>
					</Menu.Item>
					<Menu.Item
						key="manual_data_upload"
						icon={<UploadOutlined className="menu-icons" />}
						id="manual_data_upload"
					>
						<Link to="/dashboard/manual_data_upload">Manual Data Upload</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item
					key="report_designer"
					icon={<AppstoreAddOutlined className="menu-icons" />}
					id="1"
				// onClick={() => window.location.reload()}
				>
					<Link to="/dashboard/report_designer">Report designer</Link>
				</Menu.Item>
				<Menu.Item
					key="report_generator"
					icon={<BlockOutlined className="menu-icons" />}
					id="1"
				>
					<Link to="/dashboard/report_designer">Report generator</Link>
				</Menu.Item>
				<SubMenu
					key="sub5"
					mode="inline"
					icon={<AreaChartOutlined className="menu-icons" />}
					title="Analytics"
				>
					<Menu.Item
						key="data_science_studio"
						icon={<CodeOutlined className="menu-icons" />}
						id="data_science_studio"
					>
						<Link to="/dashboard/pythonNoteBook">Data Science Studio</Link>
					</Menu.Item>
					<Menu.Item
						key="analysis"
						icon={<FundOutlined className="menu-icons" />}
						id="analysis"
					>
						<Link to="/dashboard/analysis">Auto ML analytics</Link>
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub6"
					mode="inline"
					icon={<FileProtectOutlined className="menu-icons" />}
					title="Paper batch records"
				>
					<Menu.Item
						key="paper-batch-records"
						icon={<DiffOutlined className="menu-icons" />}
						id="paper batch records"
					>
						<Link to="/dashboard/paper_batch_records">Create template</Link>
					</Menu.Item>
					<Menu.Item
						key="pbr_reviewer"
						icon={<CheckCircleOutlined className="menu-icons" />}
						id="pbr_reviewer"
					>
						<Link to="/dashboard/pbr_reviewer">Approve</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item
					key="user-roles-and-access"
					icon={<TeamOutlined className="menu-icons" />}
					id="user-roles-and-access"
				>
					<Link to="/dashboard/user-roles-and-access">Roles and access</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Sidebar;
