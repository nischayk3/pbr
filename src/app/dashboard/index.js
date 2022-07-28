import { Layout } from "antd";
import React, { lazy, useEffect, useState } from "react";
import {
	Route,
	Switch,
	useHistory, useLocation, useRouteMatch
} from "react-router-dom";
import HeaderBar from "../../components/Header";
import Help from "../../components/Help";
import Sidebar from "../../components/Sidebar";
import SuspenseWrapper from "../../components/SuspenseWrapper";
import LoginRedirect from "../user/login/redirect";
import RedirectSign from "../user/login/redirectSign";
import ViewPage from "./chartPersonal/components/viewPage/ViewPage";
import RolesAndAccess from "./UserRolesAndAccess/RolesAndAccess/RolesAndAccess";
import ScreenControls from "./UserRolesAndAccess/ScreenControls/ScreenControls";
import UserConfiguration from "./UserRolesAndAccess/UserConfiguration/UserConfiguration";
import UserRolesAndAccess from "./UserRolesAndAccess/UserRolesAndAccess";
// import PaperBatchRecords from './paperBatchRecords';
import { getAuthorisedPermission } from "../../services/authProvider";
import Analysis from "./Analysis/Analysis";
import AnalysisModel from "./Analysis/AnalysisModel/AnalysisModel";
import "./dashboard.scss";
import PaperBatchRecordsTemplate from "./paperBatchRecordsTemplate";
import PbrReviewer from "./pbrReviewer";
import PrivateRoute from "./ProtectedRoute";
import PythonNotebook from "./pythonNotebook/pythonNotebook";
import UnAuthorisedScreen from "./unAuthorised";
// DASHBOARD ROUTE COMPONENTS

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
const DesignCharts = lazy(() =>
	import("./reportDesigner/components/reportDesignerNew")
);

const Faq = lazy(() => import("./faq"));
const { Content } = Layout;

const Dashboard = () => {
	const match = useRouteMatch();
	const history = useHistory();
	const location = useLocation();
	const screen = location.pathname.split("/");
	const [authorised, setAuthorised] = useState(true);

	useEffect(() => {
		// if (!Auth.isAuthenticated()) {
		//   history.push('/user/login');
		// }
	}, [history]);

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

											<PrivateRoute path={`${url}/:id`} authorised={authorised} component={View} />

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

								<Route key="pbr_update" path={`${match.url}/pbr_update`}>
									<PbrUpdate />
								</Route>
								<Route path={`${match.url}/report_generator`}
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
									)} />
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
								<PrivateRoute key="dashboard" path={`${match.url}/dashboard`} authorised={authorised} component={DashboardScreen} />

								<PrivateRoute
									key="pbr_reviewer"
									component={PbrReviewer}
									authorised={authorised}
									path={`${match.url}/pbr_reviewer`}
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
									<Faq />
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
											<PrivateRoute path={`${url}/:id`} component={DesignCharts} authorised={authorised}
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
											<PrivateRoute path={`${url}/:id`} authorised={authorised} component={HierarchyMain} />

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
								<PrivateRoute
									key={"analysis"}
									path={`${match.url}/analysis`}
									component={Analysis}
									exact
									authorised={authorised}
								/>
								<PrivateRoute
									key={"analysis-model"}
									path={`${match.url}/analysis/:id`}
									component={AnalysisModel}
									authorised={authorised}
								/>

								<Route
									key="data_science_studio"
									path={`${match.url}/pythonNoteBook`}
									component={PythonNotebook}
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
