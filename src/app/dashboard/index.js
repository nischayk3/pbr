import { Layout } from "antd";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Route,
	Switch,
	useHistory,
	useLocation,
	useRouteMatch
} from "react-router-dom";
import SuspenseWrapper from "../../components/SuspenseWrapper";
import { showNotification } from "../../duck/actions/commonActions";
import { getAuthorisedPermission } from "../../services/authProvider";
import LoginRedirect from "../user/login/redirect";
import RedirectSign from "../user/login/redirectSign";
import "./dashboard.scss";
import PrivateRoute from "./ProtectedRoute";
// DASHBOARD ROUTE COMPONENTS

const HeaderBar = lazy(() => import("../../components/Header"))
const Help = lazy(() => import("../../components/Help"))
const Sidebar = lazy(() => import("../../components/Sidebar"))
const ViewPage = lazy(() => import("./chartPersonal/components/viewPage/ViewPage"));
const RolesAndAccess = lazy(() => import("./UserRolesAndAccess/RolesAndAccess/RolesAndAccess"));
const ScreenControls = lazy(() => import("./UserRolesAndAccess/ScreenControls/ScreenControls"));
const UserConfiguration = lazy(() => import("./UserRolesAndAccess/UserConfiguration/UserConfiguration"));
const UserRolesAndAccess = lazy(() => import("./UserRolesAndAccess/UserRolesAndAccess"));
const Analysis = lazy(() => import("./Analysis/components"));
const ViewPageAnalysis = lazy(() => import("./Analysis/components/ViewPage"));
const PaperBatchRecordsTemplate = lazy(() => import("./paperBatchRecordsTemplate"));
const FileUpload = lazy(() => import("./pbrFileUpload"));
const PbrReviewer = lazy(() => import("./pbrReviewer"));
const pbrTableUpdate = lazy(() => import("./pbrTableReviewer"));
const UnAuthorisedScreen = lazy(() => import("./unAuthorised"));
const ManualDataUpload = lazy(() => import("./manualDataUpload"));
const ChartPersonal = lazy(() => import("./chartPersonal"));
const View = lazy(() => import("./viewScreen/components/View"));
const ReportDesigner = lazy(() => import("./reportDesigner"));
const AuditTrial = lazy(() => import("./auditTrial"));
const PbrUpdate = lazy(() => import("./pbrUpdate"));
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
const ElogBook = lazy(() => import("./ElogBook"))
const EBookStep = lazy(() => import("./ElogBook/components/ebookSteps/eBookStep"))

const { Content } = Layout;

const Dashboard = () => {
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const screen = location.pathname.split("/");
	const [authorised, setAuthorised] = useState(true);

	// useEffect(() => {
	// 	// if (!Auth.isAuthenticated()) {
	// 	//   history.push('/user/login');
	// 	// }
	// }, [history]);

	useEffect(() => {
		if (JSON.parse(localStorage.getItem('login_details')) == null && !window.location.href.includes('user/login') && !window.location.href.includes('/redirect')) {
			dispatch(showNotification('error', 'Please login first to proceed'))
			setTimeout(() => {
				history.push('/user/login');
				window.location.reload()
			}, 1000)
		}
	}, []);

	const requiredAuth = async (resource) => {
		let authResponse = {};
		try {
			// dispatch(showLoader());
			authResponse = await getAuthorisedPermission("", resource);
			if (authResponse.status === 200) {
				setAuthorised(true);
				// dispatch(hideLoader());
			} else {
				setAuthorised(false);
				// dispatch(hideLoader());
			}
		} catch (err) {
			setAuthorised(false);
			// dispatch(hideLoader());
		}
	};

	useEffect(() => {
		setAuthorised(true);
		let view;
		if (location.pathname.includes("chart_personalization")) {
			view = "CHART";
		} else if (location.pathname.includes("view_creation")) {
			view = "VIEW";
		} else if (location.pathname.includes("genealogy")) {
			view = "GENEALOGY";
		} else if (location.pathname.includes("workflow")) {
			view = "WORKITEMS";
		} else if (location.pathname.includes("molecule_hierarchy_configuration")) {
			view = "CONFIGURATION";
		} else if (location.pathname.includes("audit_trail_report")) {
			view = "AUDIT_REPORT";
		} else if (location.pathname.includes("user_trail_report")) {
			view = "USER_REPORT";
		} else if (location.pathname.includes("manual_data_upload")) {
			view = "FILE_UPLOAD";
		} else if (location.pathname.includes("report_designer")) {
			view = "REPORT_DESIGNER";
		} else if (location.pathname.includes("analysis")) {
			view = "ANALYTICS";
		} else if (location.pathname.includes("paper_batch_records")) {
			view = "PBR";
		} else if (location.pathname.includes("pbr_reviewer")) {
			view = "PBR";
		} else if (location.pathname.includes("user-roles-and-access")) {
			view = "CONFIGURATION";
		} else if (location.pathname.includes("dashboard/dashboard")) {
			view = "DASHBOARD";
		} else if (location.pathname.includes("report_generator")) {
			view = "REPORT_GENERATOR";
		} else if (location.pathname.includes("cross_batch_comparison")) {
			view = "ANALYTICS";
		} else if (location.pathname.includes("data_science_studio")) {
			view = "ANALYTICS";
		} else if (location.pathname.includes("elog_book_template")) {
			view = "Elog_Book_Template";
		}
		if (view && view.length > 1) {
			requiredAuth(view);
		}
	}, [location]);

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<HeaderBar />
				<Layout>
					<Sidebar />
					{screen[2] !== "faq" && <Help />}
					<Content>
						{/* <BreadCrumbWrapper /> */}
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
									component={pbrTableUpdate}
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
												path={`${url}/:id`}
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

								{/* <Route
									key="data_science_studio"
									path={`${match.url}/data_science_studio`}
									component={DataScienceStudio}
								/> */}
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
												path={`${url}/elog_book_template`}
												component={ElogBook}
												exact
												authorised={authorised}
											/>
											<PrivateRoute
												path={`${url}/new-template`}
												component={EBookStep}
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
							</Switch>
						</SuspenseWrapper>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default Dashboard;
