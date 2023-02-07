import {
	AppstoreAddOutlined, AppstoreOutlined, AreaChartOutlined, BarChartOutlined, BlockOutlined,
	CheckCircleOutlined, CloudUploadOutlined, ClusterOutlined, CodeOutlined, DeploymentUnitOutlined, DiffOutlined, FileDoneOutlined,
	FileProtectOutlined, FileSearchOutlined, FileSyncOutlined, FundOutlined, FundProjectionScreenOutlined,
	NodeIndexOutlined, PartitionOutlined, SisternodeOutlined, TeamOutlined, UploadOutlined, UserOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./style.scss";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(true);
	const [openKeys, setOpenKeys] = useState([]);
	const rootKeys = ["sub2", "sub3", "sub4", "sub5", "sub6", "sub7"];
	const location = useLocation();
	const locationSplit = location?.pathname?.split("/")
	const path = `${'/' + locationSplit[1] + '/' + locationSplit[2]}`

	const validResource = useSelector((state) => state?.loginDetails?.resource_action)
	console.log("validResource", validResource);

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
			title: "Dashboard",
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
					style={{ marginTop: 0 }}
					id="workspace"
					className={path === "/dashboard/workspace" ? 'ant-menu-item-selected' : 'remove-selected'}
				>
					<Link to="/dashboard/workspace">Workspace</Link>
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
								className={item.linkTo == path ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to={item.linkTo}>{item.title}</Link>
							</Menu.Item>
						) : (
							<Menu.Item key={item.key} icon={item.icon} id={item.key} className={item.linkTo == path ? 'ant-menu-item-selected' : 'remove-selected'}>
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
						className={path === "/dashboard/molecule_hierarchy_configuration" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/molecule_hierarchy_configuration">
							Hierarchy Config
						</Link>
					</Menu.Item>
					<Menu.Item
						key="limit-config"
						icon={<DeploymentUnitOutlined className="menu-icons" />}
						id="limit-config"
						className={path === "/dashboard/limit-config" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/limit-config">
							Limit Config
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
						className={path === "/dashboard/audit_trail_report" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/audit_trail_report">Audit Trail</Link>
					</Menu.Item>
					<Menu.Item
						key="userTrail"
						icon={<UserOutlined className="menu-icons" />}
						id="user_trail"
						className={path === "/dashboard/user_trail_report" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/user_trail_report">User Log History</Link>
					</Menu.Item>
					<Menu.Item
						key="manual_data_upload"
						icon={<UploadOutlined className="menu-icons" />}
						id="manual_data_upload"
						className={path === "/dashboard/manual_data_upload" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/manual_data_upload">Manual Data Upload</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item
					key="report_designer"
					icon={<AppstoreAddOutlined className="menu-icons" />}
					id="1"
					className={path === "/dashboard/report_designer" ? 'ant-menu-item-selected' : 'remove-selected'}
				>
					<Link to="/dashboard/report_designer">Report Designer</Link>
				</Menu.Item>
				<Menu.Item
					key="report_generator"
					icon={<BlockOutlined className="menu-icons" />}
					id="2"
					className={path === "/dashboard/report_generator" ? 'ant-menu-item-selected' : 'remove-selected'}
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
						className={path === "/dashboard/data_science_studio" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						{/* <a href={JUPYTER_NOTEBOOK} target="_blank" >Data Science Studio</a> */}
						<Link to="/dashboard/data_science_studio">Data Science Studio</Link>
					</Menu.Item>
					<Menu.Item
						key="analysis"
						icon={<FundOutlined className="menu-icons" />}
						id="analysis"
						className={path === "/dashboard/analysis" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/analysis">Auto ML Analytics</Link>
					</Menu.Item>
					<Menu.Item
						key="cross batch comparison"
						icon={<FundOutlined className="menu-icons" />}
						id="analysis"
						className={path === "/dashboard/cross_batch_comparison" ? 'ant-menu-item-selected' : 'remove-selected'}
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
						className={path === "/dashboard/pbr_file_upload" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/pbr_file_upload">File Upload</Link>
					</Menu.Item>
					<Menu.Item
						key="paper-batch-records"
						icon={<DiffOutlined className="menu-icons" />}
						id="paper batch records"
						className={path === "/dashboard/paper_batch_records" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/paper_batch_records">Template</Link>
					</Menu.Item>
					<Menu.Item
						key="pbr_reviewer"
						icon={<CheckCircleOutlined className="menu-icons" />}
						id="pbr_reviewer"
						className={path === "/dashboard/pbr_reviewer" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/pbr_reviewer">Dashboard</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item
					key="user-roles-and-access"
					icon={<TeamOutlined className="menu-icons" />}
					id="user-roles-and-access"
					className={path === "/dashboard/user-roles-and-access" ? 'ant-menu-item-selected' : 'remove-selected'}
				>
					<Link to="/dashboard/user-roles-and-access">Roles and Access</Link>

				</Menu.Item>
				<SubMenu
					key="sub7"
					mode="inline"
					icon={<CheckCircleOutlined className="menu-icons" />}
					title="ELog-book"

				>
					<Menu.Item
						key="elog-boook"
						icon={<CheckCircleOutlined className="menu-icons" />}
						id="elog-book"
						className={path === "/dashboard/elog_book_data_entry" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/elog_book_data_entry">Data Entry</Link>
					</Menu.Item>
					<Menu.Item
						key="elog-book_template"
						icon={<CheckCircleOutlined className="menu-icons" />}
						id="elog-book_template"
						className={path === "/dashboard/elog_book_template" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/elog_book_template">Template Creation</Link>
					</Menu.Item>

				</SubMenu>
				<Menu.Item
					key="data-access-service"
					icon={<TeamOutlined className="menu-icons" />}
					id="data-access-service"
					className={path === "/dashboard/data-access-service" ? 'ant-menu-item-selected' : 'remove-selected'}
				>
					<Link to="/dashboard/data-access-service">Data Access Services</Link>
				</Menu.Item>
				<Menu.Item
					key="tableau-dashboard"
					icon={<TeamOutlined className="menu-icons" />}
					id="tableau-dashboard"
					className={path === "/dashboard/tableau-dashboard" ? 'ant-menu-item-selected' : 'remove-selected'}
				>
					<Link to="/dashboard/tableau-dashboard">Tableau Dashboard</Link>
				</Menu.Item>
			</Menu>
		</Sider >
	);
};

export default Sidebar;
