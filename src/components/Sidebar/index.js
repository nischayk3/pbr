import {
	AppstoreAddOutlined, AppstoreOutlined, AreaChartOutlined, BarChartOutlined, BlockOutlined,
	CheckCircleOutlined, CloudUploadOutlined, ClusterOutlined, CodeOutlined, DeploymentUnitOutlined, DiffOutlined, FileDoneOutlined, FilePdfOutlined, FileProtectOutlined, FileSearchOutlined, FileSyncOutlined, FundOutlined, FundProjectionScreenOutlined,
	NodeIndexOutlined, PartitionOutlined, SisternodeOutlined, TeamOutlined, UploadOutlined, UserOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./style.scss";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(true);
	const [permissions, setPermissions] = useState({});
	const [openKeys, setOpenKeys] = useState([]);
	const rootKeys = ["sub2", "sub3", "sub4", "sub5", "sub6", "sub7"];
	const location = useLocation();
	const locationSplit = location?.pathname?.split("/")
	const path = `${'/' + locationSplit[1] + '/' + locationSplit[2]}`

	const validResource = JSON.parse(localStorage.getItem('login_details'));

	let resourceKey = validResource?.resource_action
	let resKey = resourceKey && Object.keys(resourceKey)

	useEffect(() => {
		let permission = { ...permissions }
		resKey && resKey.forEach((item) => {
			permission[item] = true;
		})
		setPermissions(permission)
	}, [])


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

				{permissions && permissions['GENEALOGY'] && (
					<Menu.Item
						key='genealogy'
						icon={<PartitionOutlined className="menu-icons" />}
						id='genealogy'
						className={path == '/dashboard/genealogy' ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to='/dashboard/genealogy'>Genealogy</Link>
					</Menu.Item>
				)}

				{permissions && permissions['WORKITEMS'] && (
					<Menu.Item
						key='workflow'
						icon={<FileDoneOutlined style={{ fontSize: "26px" }} />}
						id='workflow'
						className={path == '/dashboard/workflow' ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to='/dashboard/workflow'>Workflow</Link>
					</Menu.Item>
				)}

				{permissions &&
					permissions['VIEW'] ||
					permissions['CHART'] ||
					permissions['DASHBOARD'] ?
					(
						<SubMenu
							key="sub2"
							mode="inline"
							icon={<NodeIndexOutlined className="menu-icons" />}
							title="CPV"
						>
							{permissions['VIEW'] && (
								<Menu.Item
									key='view_creation'
									icon={<ClusterOutlined className="menu-icons" />}
									id='view_creation'
									className={path == '/dashboard/view_creation' ? 'ant-menu-item-selected' : 'remove-selected'}
								>
									<Link to='/dashboard/view_creation'>View Creation</Link>
								</Menu.Item>
							)}

							{permissions['CHART'] && (
								<Menu.Item
									key='chart_personalization'
									icon={<BarChartOutlined className="menu-icons" />}
									id='chart_personalization'
									className={path == '/dashboard/chart_personalization' ? 'ant-menu-item-selected' : 'remove-selected'}
								>
									<Link to='/dashboard/chart_personalization'>Chart Personalization</Link>
								</Menu.Item>
							)}

							{permissions['DASHBOARD'] && (
								<Menu.Item
									key='chart_configuration'
									icon={<FundProjectionScreenOutlined className="menu-icons" />}
									id='chart_configuration'
									className={path == '/dashboard/dashboard' ? 'ant-menu-item-selected' : 'remove-selected'}
								>
									<Link to='/dashboard/dashboard'>Dashboard</Link>
								</Menu.Item>
							)}
						</SubMenu>
					) : null}

				{permissions &&
					permissions['HIERARCHY_CONFIG'] ||
					permissions['LIMIT_CONFIG'] ? (
					<SubMenu
						key="sub3"
						mode="inline"
						icon={<SisternodeOutlined className="menu-icons" />}
						title="Configuration"
					>
						{permissions['HIERARCHY_CONFIG'] && (
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
						)}

						{permissions['LIMIT_CONFIG'] && (
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
						)}

						{permissions['SYSTEM_CONFIG'] && (
							<Menu.Item
								key="system-config"
								icon={<DeploymentUnitOutlined className="menu-icons" />}
								id="limit-config"
								className={path === "/dashboard/system-config" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/system-config">
									System Config
								</Link>
							</Menu.Item>
						)}
					</SubMenu>
				) : null}

				{permissions &&
					permissions['AUDIT_REPORT'] ||
					permissions['USER_REPORT'] ||
					permissions['PARAM_DATA_FILE_UPLOAD'] ||
					permissions['REPORT_DESIGNER'] ||
					permissions['REPORT_GENERATOR'] ? (
					<SubMenu
						key="sub4"
						mode="inline"
						icon={<FileSyncOutlined className="menu-icons" />}
						title="Reports"
					>
						{permissions['AUDIT_REPORT'] && (
							<Menu.Item
								key="audit"
								icon={<FileSearchOutlined className="menu-icons" />}
								id="audit"
								className={path === "/dashboard/audit_trail_report" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/audit_trail_report">Audit Trail</Link>
							</Menu.Item>
						)}

						{permissions['USER_REPORT'] && (
							<Menu.Item
								key="userTrail"
								icon={<UserOutlined className="menu-icons" />}
								id="user_trail"
								className={path === "/dashboard/user_trail_report" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/user_trail_report">User Log History</Link>
							</Menu.Item>
						)}

						{permissions['PARAM_DATA_FILE_UPLOAD'] && (
							<Menu.Item
								key="manual_data_upload"
								icon={<UploadOutlined className="menu-icons" />}
								id="manual_data_upload"
								className={path === "/dashboard/manual_data_upload" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/manual_data_upload">Manual Data Upload</Link>
							</Menu.Item>
						)}

						{permissions['REPORT_DESIGNER'] && (
							<Menu.Item
								key="report_designer"
								icon={<AppstoreAddOutlined className="menu-icons" />}
								id="1"
								className={path === "/dashboard/report_designer" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/report_designer">Report Designer</Link>
							</Menu.Item>
						)}

						{permissions['REPORT_GENERATOR'] && (
							<Menu.Item
								key="report_generator"
								icon={<BlockOutlined className="menu-icons" />}
								id="2"
								className={path === "/dashboard/report_generator" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/report_generator">Report Generator</Link>
							</Menu.Item>
						)}
					</SubMenu>
				) : null}

				{permissions &&
					permissions['DSS'] ||
					permissions['AUTO_ML'] ||
					permissions['CROSS_BATCH'] ? (

					<SubMenu
						key="sub5"
						mode="inline"
						icon={<AreaChartOutlined className="menu-icons" />}
						title="Analytics"
					>
						{permissions['DSS'] && (
							<Menu.Item
								key="data_science_studio"
								icon={<CodeOutlined className="menu-icons" />}
								id="data_science_studio"
								className={path === "/dashboard/data_science_studio" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/data_science_studio">Data Science Studio</Link>
							</Menu.Item>
						)}
						{permissions['AUTO_ML'] && (
							<Menu.Item
								key="analysis"
								icon={<FundOutlined className="menu-icons" />}
								id="analysis"
								className={path === "/dashboard/analysis" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/analysis">Auto ML Analytics</Link>
							</Menu.Item>
						)}

						{permissions['CROSS_BATCH'] && (
							<Menu.Item
								key="cross batch comparison"
								icon={<FundOutlined className="menu-icons" />}
								id="analysis"
								className={path === "/dashboard/cross_batch_comparison" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/cross_batch_comparison">Cross Batch Comparison</Link>
							</Menu.Item>
						)}

					</SubMenu>
				) : null}

				{permissions &&
					permissions['PBR_FILE_UPLOAD'] ||
					permissions['PBR_TEMPLATE'] ||
					permissions['PBR_DASHBOARD'] ||
					permissions['PBR_FILE_SEARCH'] ? (
					<SubMenu
						key="sub6"
						mode="inline"
						icon={<FileProtectOutlined className="menu-icons" />}
						title="Paper Batch Records"
					>
						{permissions['PBR_FILE_UPLOAD'] && (
							<Menu.Item
								key="pbr_file_upload"
								icon={<CloudUploadOutlined className="menu-icons" />}
								id="pbr file upload"
								className={path === "/dashboard/pbr_file_upload" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/pbr_file_upload">File Upload</Link>
							</Menu.Item>
						)}
						{permissions['PBR_FILE_SEARCH'] && <Menu.Item
							key="pbr-pdf-viewer"
							icon={<FilePdfOutlined className="menu-icons" />}
							id="pbr-pdf-viewer"
							className={path === "/dashboard/pbr-pdf-viewer" ? 'ant-menu-item-selected' : 'remove-selected'}
						>
							<Link to="/dashboard/pbr-pdf-viewer">Pdf Search</Link>
						</Menu.Item>}

						{permissions['PBR_TEMPLATE'] && (
							<Menu.Item
								key="paper-batch-records"
								icon={<DiffOutlined className="menu-icons" />}
								id="paper batch records"
								className={path === "/dashboard/paper_batch_records" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/paper_batch_records">Template</Link>
							</Menu.Item>
						)}

						{permissions['PBR_DASHBOARD'] && (
							<Menu.Item
								key="pbr_reviewer"
								icon={<CheckCircleOutlined className="menu-icons" />}
								id="pbr_reviewer"
								className={path === "/dashboard/pbr_reviewer" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/pbr_reviewer">Dashboard</Link>
							</Menu.Item>
						)}


					</SubMenu>
				) : null}

				{permissions &&
					permissions['USER_CONFIG'] ||
					permissions['ROLES_CONFIG'] ? (
					<Menu.Item
						key="user-roles-and-access"
						icon={<TeamOutlined className="menu-icons" />}
						id="user-roles-and-access"
						className={path === "/dashboard/user-roles-and-access" ? 'ant-menu-item-selected' : 'remove-selected'}
					>
						<Link to="/dashboard/user-roles-and-access">Roles and Access</Link>

					</Menu.Item>
				) : null}

				{permissions &&
					permissions['ELOG_BOOK_DATA_ENTRY'] ||
					permissions['ELOG_BOOK_TEMPLATE_CREATION'] ? (
					<SubMenu
						key="sub7"
						mode="inline"
						icon={<CheckCircleOutlined className="menu-icons" />}
						title="ELog-book"
					>
						{permissions['ELOG_BOOK_DATA_ENTRY'] && (
							<Menu.Item
								key="elog-boook"
								icon={<CheckCircleOutlined className="menu-icons" />}
								id="elog-book"
								className={path === "/dashboard/elog_book_data_entry" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/elog_book_data_entry">Data Entry</Link>
							</Menu.Item>
						)}

						{permissions['ELOG_BOOK_TEMPLATE_CREATION'] && (
							<Menu.Item
								key="elog-book_template"
								icon={<CheckCircleOutlined className="menu-icons" />}
								id="elog-book_template"
								className={path === "/dashboard/elog_book_template" ? 'ant-menu-item-selected' : 'remove-selected'}
							>
								<Link to="/dashboard/elog_book_template">Template Creation</Link>
							</Menu.Item>
						)}
					</SubMenu>
				) : null}

				{permissions &&
					permissions['DATA_ACCESS'] && (
						<Menu.Item
							key="data-access-service"
							icon={<TeamOutlined className="menu-icons" />}
							id="data-access-service"
							className={path === "/dashboard/data-access-service" ? 'ant-menu-item-selected' : 'remove-selected'}
						>
							<Link to="/dashboard/data-access-service">Data Access Services</Link>
						</Menu.Item>
					)}

				{permissions &&
					permissions['TABLEAU_DASHBOARD'] && (
						<Menu.Item
							key="tableau-dashboard"
							icon={<TeamOutlined className="menu-icons" />}
							id="tableau-dashboard"
							className={path === "/dashboard/tableau-dashboard" ? 'ant-menu-item-selected' : 'remove-selected'}
						>
							<Link to="/dashboard/tableau-dashboard">Tableau Dashboard</Link>
						</Menu.Item>
					)}
			</Menu>
		</Sider >
	);
};

export default Sidebar;
