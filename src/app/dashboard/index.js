import { Layout } from "antd";
import React, { lazy, useEffect, useState } from "react";
import ReactGA from 'react-ga4';
import { useDispatch } from "react-redux";
import {
	Route,
	Switch,
	useHistory,
	useLocation,
	useRouteMatch
} from "react-router-dom";
import HeaderBar from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import SuspenseWrapper from "../../components/SuspenseWrapper";
import { PRODUCT_FOR } from "../../constants/apiBaseUrl";
import LoginRedirect from "../user/login/redirect";
import RedirectSign from "../user/login/redirectSign";
import RedirectSAMLSign from "../user/login/samlRedirectSign";
import PrivateRoute from "./ProtectedRoute";
import "./dashboard.scss";
// DASHBOARD ROUTE COMPONENTS
// const HeaderBar = lazy(() => import("../../components/Header"))
//const Sidebar = lazy(() => import("../../components/Sidebar"))
const Help = lazy(() => import("../../components/Help"))
const ViewPage = lazy(() => import("./chartPersonal/components/viewPage/ViewPage"));
const RolesAndAccess = lazy(() => import("./UserRolesAndAccess/RolesAndAccess/RolesAndAccess"));
const RolesAndAccessV2 = lazy(() => import("./UserRolesAndAccess/RolesAndAccess/RolesAndAccessV2"));
const ScreenControls = lazy(() => import("./UserRolesAndAccess/ScreenControls/ScreenControls"));
const UserConfiguration = lazy(() => import("./UserRolesAndAccess/UserConfiguration/UserConfiguration"));
const UserRolesAndAccess = lazy(() => import("./UserRolesAndAccess/UserRolesAndAccess"));
const Analysis = lazy(() => import("./Analysis/components"));
const ViewPageAnalysis = lazy(() => import("./Analysis/components/ViewPage"));
const PaperBatchRecordsTemplate = lazy(() => import("./paperBatchRecordsTemplate"));
const FileUpload = lazy(() => import("./pbrFileUpload"));
const PbrReviewer = lazy(() => import("./pbrReviewer"));
const PbrTableUpdate = lazy(() => import("./pbrTableReviewer"));
const UnAuthorisedScreen = lazy(() => import("./unAuthorised"));
const ManualDataUpload = lazy(() => import("./manualDataUpload"));
const ChartPersonal = lazy(() => import("./chartPersonal"));
const View = lazy(() => import("./viewScreen/components/View"));
const ReportDesigner = lazy(() => import("./reportDesigner"));
const AuditTrial = lazy(() => import("./auditTrial"));
const PbrUpdate = lazy(() => import("./pbrUpdate"));
const DigitalTwin = lazy(() => import("./digitalTwin"));
const PaperBatchRecords = lazy(() => import("./paperBatchRecords"));
const ReportGenerator = lazy(() => import("./reportGenerator"));
const Workflow = lazy(() => import("./wokflow"));
const Workspace = lazy(() => import("./workspace"));
const Genealogy = lazy(() => import("./genealogy"));
const DashboardScreen = lazy(() => import("./dashboardScreen"));
const ViewLanding = lazy(() => import("./viewScreen"));
const Hierarchy = lazy(() => import("./hierarchyConfig"));
const HierarchyMain = lazy(() =>
	import("./hierarchyConfig/components/hierarchy/hierarchy")
);

const ViewCreationLanding = lazy(() => import("./viewCreation"));
const ViewCreation = lazy(() => import("./viewCreation/components/view/view"))

const DataAccess = lazy(() =>
	import("./dataAccess/index")
);
const DesignCharts = lazy(() =>
	import("./reportDesigner/components/reportDesignerNew")
);
const UserTrail = lazy(() => import("./userTrail"));
const FaqMain = lazy(() => import("./faq"));
const Profile = lazy(() => import("./profile"));
const CrossBatchComparison = lazy(() => import("./crossBatchComparison"));
const DataScienceStudio = lazy(() => import("./DataScienceStudio"));
const TargetVariable = lazy(() => import("./DataScienceStudio/components/targetVariable/TargetVariable"));
const ElogBook = lazy(() => import("./ElogBook/components/entryLanding/entryLanding"));
const ElogBookEntry = lazy(() => import("./ElogBook/components/dataEntryForm/dataEntryForm"));
const EBookStep = lazy(() => import("./ElogBook/components/ebookSteps/eBookStep"));
const ELogBookTemplate = lazy(() => import("./ElogBook/components/landingPage/Landing"));
const TableauDashboard = lazy(() => import("./TableauDashboard/tableauDashboard"));
const PbrPdfViewer = lazy(() => import("./pbrPdfViewer"));
const PbrViewPdf = lazy(() => import("./pbrPdfViewer/componenets/viewPdf"));
const SystemConfig = lazy(() => import("./SystemConfig/systemConfig"));
const LimitConfig = lazy(() => import("./LimitConfig/components/landing/LimitConfig"));


const { Content } = Layout;

const Dashboard = () => {
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const screen = location.pathname.split("/");
	const [authorised, setAuthorised] = useState(true);

	useEffect(() => {
		const status = localStorage.getItem("loginwith")
		if (window.location.host == 'merck-mi-dev.mareana.com' || window.location.host == 'mi-devv3-7.mareana.com') {
			ReactGA.send({ hitType: "pageview", page: location.pathname, title: "Page visited" });

		}
		if (PRODUCT_FOR == 'BMS') {
			if (status !== "WITHOUT_AD" || status == "") {
				localStorage.setItem("loginwith", 'WITH_SAML')
			}
		}
	}, [location.pathname]);

	// const requiredAuth = async (resource) => {
	// 	let authResponse = {};
	// 	try {
	// 		authResponse = await getAuthorisedPermission("", resource);
	// 		if (authResponse.status === 200) {
	// 			setAuthorised(true);
	// 		} else {
	// 			setAuthorised(false);
	// 		}
	// 	} catch (err) {
	// 		setAuthorised(false);
	// 	}
	// };

	useEffect(() => {
		// setAuthorised(true);
		// let view;
		// if (location.pathname.includes("chart_personalization")) {
		// 	view = "CHART";
		// } else if (location.pathname.includes("view_creation")) {
		// 	view = "VIEW";
		// } else if (location.pathname.includes("genealogy")) {
		// 	view = "GENEALOGY";
		// } else if (location.pathname.includes("workflow")) {
		// 	view = "WORKITEMS";
		// } else if (location.pathname.includes("molecule_hierarchy_configuration")) {
		// 	view = "CONFIGURATION";
		// } else if (location.pathname.includes("audit_trail_report")) {
		// 	view = "AUDIT_REPORT";
		// } else if (location.pathname.includes("user_trail_report")) {
		// 	view = "USER_REPORT";
		// } else if (location.pathname.includes("manual_data_upload")) {
		// 	view = "FILE_UPLOAD";
		// } else if (location.pathname.includes("report_designer")) {
		// 	view = "REPORT_DESIGNER";
		// } else if (location.pathname.includes("analysis")) {
		// 	view = "ANALYTICS";
		// } else if (location.pathname.includes("paper_batch_records")) {
		// 	view = "PBR";
		// } else if (location.pathname.includes("pbr_reviewer")) {
		// 	view = "PBR";
		// } else if (location.pathname.includes("signature_module")) {
		// 	view = "PBR";
		// } else if (location.pathname.includes("user-roles-and-access")) {
		// 	view = "CONFIGURATION";
		// } else if (location.pathname.includes("dashboard/dashboard")) {
		// 	view = "DASHBOARD";
		// } else if (location.pathname.includes("report_generator")) {
		// 	view = "REPORT_GENERATOR";
		// } else if (location.pathname.includes("cross_batch_comparison")) {
		// 	view = "ANALYTICS";
		// } else if (location.pathname.includes("data_science_studio")) {
		// 	view = "ANALYTICS";
		// }
		// if (view && view.length > 1) {
		// 	requiredAuth(view);
		// }
	}, [location]);

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<HeaderBar />
				<Layout>
					<Sidebar />
					{screen[2] !== "faq" && <Help />}
					<Content>
						<SuspenseWrapper>
							<Switch>
								<Route key="unauthorised" path={`${match.url}/unauthorised`}>
									<UnAuthorisedScreen />
								</Route>
								<PrivateRoute
									key="manual_data_upload"
									path={`${match.url}/manual_data_upload`}
									component={ManualDataUpload}
									authorised={authorised}
								/>
								<Route
									path={`${match.url}/view_creation`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												exact
												authorised={authorised}
												component={ViewLanding}
											/>

											<PrivateRoute
												path={`${url}/:id`}
												authorised={authorised}
												component={View}
											/>
										</>
									)}
								/>

								<Route
									path={`${match.url}/view`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												exact
												authorised={authorised}
												component={ViewCreationLanding}
											/>

											<PrivateRoute
												path={`${url}/:id`}
												authorised={authorised}
												component={ViewCreation}
											/>
										</>
									)}
								/>

								<Route
									path={`${match.url}/chart_personalization`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												component={ChartPersonal}
												exact
												authorised={authorised}
											/>
											<PrivateRoute
												path={`${url}/:id`}
												component={ViewPage}
												authorised={authorised}
											/>
										</>
									)}
								/>
								<PrivateRoute
									key="audit_trail_report"
									path={`${match.url}/audit_trail_report`}
									authorised={authorised}
									component={AuditTrial}
								/>
								<PrivateRoute
									key="user_trail_report"
									path={`${match.url}/user_trail_report`}
									authorised={authorised}
									component={UserTrail}
								/>
								<Route key="profile" path={`${match.url}/profile`}>
									<Profile />
								</Route>
								<Route key="cross_batch_comparison" path={`${match.url}/cross_batch_comparison`}>
									<CrossBatchComparison />
								</Route>

								<Route key="pbr_update" path={`${match.url}/pbr_update`}>
									<PbrUpdate />
								</Route>
								<Route
									path={`${match.url}/report_generator`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												component={ReportDesigner}
												authorised={authorised}
												exact
											/>
											<PrivateRoute
												path={`${url}/:id`}
												component={ReportGenerator}
												authorised={authorised}
											/>
										</>
									)}
								/>
								<PrivateRoute
									key="genealogy"
									path={`${match.url}/genealogy`}
									authorised={authorised}
									component={Genealogy}
								/>
								<PrivateRoute
									key="workflow"
									path={`${match.url}/workflow`}
									authorised={authorised}
									component={Workflow}
								/>
								<Route key="workspace" path={`${match.url}/workspace`}>
									<Workspace />
								</Route>
								<PrivateRoute
									key="dashboard"
									path={`${match.url}/dashboard`}
									authorised={authorised}
									component={DashboardScreen}
								/>

								<PrivateRoute
									key="pbr_reviewer"
									component={PbrReviewer}
									authorised={authorised}
									path={`${match.url}/pbr_reviewer`}
								/>

								<PrivateRoute
									key="pbr_table_reviewer"
									component={PbrTableUpdate}
									authorised={authorised}
									path={`${match.url}/pbr_table_reviewer`}
								/>
								<PrivateRoute
									key="pbr_file_upload"
									component={FileUpload}
									authorised={authorised}
									path={`${match.url}/pbr_file_upload`}
								/>

								<Route
									path={`${match.url}/paper_batch_records`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												authorised={authorised}
												component={PaperBatchRecords}
												exact
											/>
											<PrivateRoute
												path={`${url}/:id`}
												authorised={authorised}
												component={PaperBatchRecordsTemplate}
											/>
										</>
									)}
								/>
								<Route key="redirect" path={`${match.url}/redirect`}>
									<LoginRedirect />
								</Route>
								<Route key="redirect_sign" path={`${match.url}/redirect_sign`}>
									<RedirectSign />
								</Route>
								<Route key="redirect-saml-sign" path={`${match.url}/saml-redirect`}>
									<RedirectSAMLSign />
								</Route>
								<Route key="faq" path={`${match.url}/faq`}>
									<FaqMain />
								</Route>

								<Route
									path={`${match.url}/report_designer`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												component={ReportDesigner}
												authorised={authorised}
												exact
											/>
											<PrivateRoute
												path={`${url}/:id`}
												component={DesignCharts}
												authorised={authorised}
											/>
										</>
									)}
								/>

								<Route
									path={`${match.url}/molecule_hierarchy_configuration`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												exact
												authorised={authorised}
												component={Hierarchy}
											/>
											<PrivateRoute
												path={`${url}/tabs`}
												authorised={authorised}
												component={HierarchyMain}
											/>
										</>
									)}
								/>
								<PrivateRoute
									key="userRolesAndAccess"
									path={`${match.url}/user-roles-and-access`}
									exact
									component={UserRolesAndAccess}
									authorised={authorised}
								/>
								<PrivateRoute
									key="user-configuration"
									path={`${match.url}/user-roles-and-access/user-configuration`}
									component={UserConfiguration}
									authorised={authorised}
								/>
								<PrivateRoute
									key="roles-and-access"
									path={`${match.url}/user-roles-and-access/roles-and-access`}
									component={RolesAndAccess}
									authorised={authorised}
								/>
								<PrivateRoute
									key="roles-and-access"
									path={`${match.url}/user-roles-and-access/roles-and-access-version-2`}
									component={RolesAndAccessV2}
									authorised={authorised}
								/>
								<PrivateRoute
									key="application-controls"
									path={`${match.url}/user-roles-and-access/application-controls`}
									component={ScreenControls}
									authorised={authorised}
								/>
								<PrivateRoute
									key="screen-controls"
									path={`${match.url}/user-roles-and-access/screen-controls`}
									component={ScreenControls}
									authorised={authorised}
								/>
								<PrivateRoute
									key="limit-config"
									path={`${match.url}/limit-config`}
									component={LimitConfig}
									authorised={authorised}
								/>
								<PrivateRoute
									key="system-config"
									path={`${match.url}/system-config`}
									component={SystemConfig}
									authorised={authorised}
								/>
								<Route
									path={`${match.url}/analysis`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												key={"analysis"}
												path={`${url}/`}
												component={Analysis}
												exact
												authorised={authorised}
											/>
											<PrivateRoute
												path={`${url}/:id`}
												component={ViewPageAnalysis}
												authorised={authorised}
											/>
										</>
									)}
								/>

								<Route
									path={`${match.url}/data_science_studio`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												exact
												authorised={authorised}
												component={DataScienceStudio}
											/>
											<PrivateRoute
												path={`${url}/target_variable`}
												authorised={authorised}
												component={TargetVariable}
											/>
										</>
									)}
								/>
								<Route
									path={`${match.url}/elog_book_template`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												key={"elog_book_template"}
												path={`${url}/`}
												component={ELogBookTemplate}
												exact
												authorised={authorised}
											/>
											<PrivateRoute
												key={"new-template"}
												path={`${url}/new-template`}
												component={EBookStep}
												exact
												authorised={authorised}
											/>

										</>
									)}
								/>


								<Route
									path={`${match.url}/elog_book_data_entry`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												key={"elog_book"}
												path={`${url}/`}
												component={ElogBook}
												exact
												authorised={authorised}
											/>
											<PrivateRoute
												path={`${url}/data_entry_forms`}
												component={ElogBookEntry}
												authorised={authorised}
											/>
										</>
									)}
								/>
								<PrivateRoute
									key="data-access-service"
									path={`${match.url}/data-access-service`}
									exact
									component={DataAccess}
									authorised={authorised}
								/>
								<PrivateRoute
									key="tableau-dashboard"
									path={`${match.url}/tableau-dashboard`}
									exact
									component={TableauDashboard}
									authorised={authorised}
								/>
								{/* <PrivateRoute
									key="pbr-pdf-viewer"
									path={`${match.url}/pbr-pdf-viewer`}
									exact
									component={PbrPdfViewer}
									authorised={authorised}
								/> */}
								<Route
									path={`${match.url}/pbr-pdf-viewer`}
									render={({ match: { url } }) => (
										<>
											<PrivateRoute
												path={`${url}/`}
												authorised={authorised}
												component={PbrPdfViewer}
												exact
											/>
											<PrivateRoute
												path={`${url}/:id`}
												authorised={authorised}
												component={PbrViewPdf}
											/>
										</>
									)}
								/>
								<PrivateRoute
									key="digitalTwin"
									path={`${match.url}/digitalTwin`}
									exact
									component={DigitalTwin}
									authorised={authorised}
								/>
							</Switch>
						</SuspenseWrapper>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default Dashboard;
