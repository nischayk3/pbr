import {
	AppstoreAddOutlined, AppstoreOutlined, AreaChartOutlined, BarChartOutlined, BlockOutlined,
	CheckCircleOutlined, CloudUploadOutlined, ClusterOutlined, CodeOutlined, DeploymentUnitOutlined, DiffOutlined, FileDoneOutlined,
	FileProtectOutlined, FileSearchOutlined, FileSyncOutlined, FundOutlined, FundProjectionScreenOutlined,
	NodeIndexOutlined, PartitionOutlined, SisternodeOutlined, TeamOutlined, UploadOutlined, UserOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
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
	const [openKeys, setOpenKeys] = useState([]);
	const rootKeys = ["sub2", "sub3", "sub4", "sub5", "sub6"];
	const mouseHover = () => {
		setCollapsed(false);
	};
	// Open only one submenu at a time
	const onOpenChange = items => {
		const latestOpenKey = items.find(key => openKeys.indexOf(key) === -1);
		if (rootKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(items);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};
	return (
		<Sider
			collapsed={collapsed}
			onMouseOver={mouseHover}
			onMouseLeave={() => setCollapsed(true)}
			id="sidebar"
			className={!collapsed ? "collapse-side-bar" : ""}
		>
			<Menu theme="dark" mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
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
					{cpvMenu.map((item) =>
						item.key === "chart_configuration" ? (
							<Menu.Item
								key={item.key}
								icon={item.icon}
								id={item.key}
								onClick={() => window.location.reload()}
							>
								<Link to={item.linkTo}>{item.title}</Link>
							</Menu.Item>
						) : (
							<Menu.Item key={item.key} icon={item.icon} id={item.key}>
								<Link to={item.linkTo}>{item.title}</Link>
							</Menu.Item>
						)
					)}
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
						key="userTrail"
						icon={<UserOutlined className="menu-icons" />}
						id="user_trail"
					>
						<Link to="/dashboard/user_trail_report">User Log History</Link>
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
					<Link to="/dashboard/report_designer">Report Designer</Link>
				</Menu.Item>
				<Menu.Item
					key="report_generator"
					icon={<BlockOutlined className="menu-icons" />}
					id="1"
				>
					<Link to="/dashboard/report_generator">Report Generator</Link>
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
						{/* <a href={JUPYTER_NOTEBOOK} target="_blank" >Data Science Studio</a> */}
						<Link to="/dashboard/data_science_studio">Data Science Studio</Link>
					</Menu.Item>
					<Menu.Item
						key="analysis"
						icon={<FundOutlined className="menu-icons" />}
						id="analysis"
					>
						<Link to="/dashboard/analysis">Auto ML Analytics</Link>
					</Menu.Item>
					<Menu.Item
						key="cross batch comparison"
						icon={<FundOutlined className="menu-icons" />}
						id="analysis"
					>
						<Link to="/dashboard/cross_batch_comparison">Cross Batch Comparison</Link>
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key="sub6"
					mode="inline"
					icon={<FileProtectOutlined className="menu-icons" />}
					title="Paper Batch Records"
				>
					<Menu.Item
						key="pbr_file_upload"
						icon={<CloudUploadOutlined className="menu-icons" />}
						id="pbr file upload"
					>
						<Link to="/dashboard/pbr_file_upload">File Upload</Link>
					</Menu.Item>
					<Menu.Item
						key="paper-batch-records"
						icon={<DiffOutlined className="menu-icons" />}
						id="paper batch records"
					>
						<Link to="/dashboard/paper_batch_records">Template</Link>
					</Menu.Item>
					<Menu.Item
						key="pbr_reviewer"
						icon={<CheckCircleOutlined className="menu-icons" />}
						id="pbr_reviewer"
					>
						<Link to="/dashboard/pbr_reviewer">Dashboard</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item
					key="user-roles-and-access"
					icon={<TeamOutlined className="menu-icons" />}
					id="user-roles-and-access"
				>
					<Link to="/dashboard/user-roles-and-access">Roles and Access</Link>

				</Menu.Item>
				<Menu.Item
					key="elog-boook"
					icon={<CheckCircleOutlined className="menu-icons" />}
					id="elog-book"
				>
					<Link to="/dashboard/elog_book">eLog Book</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Sidebar;
