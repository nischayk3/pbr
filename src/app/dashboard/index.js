import React, { lazy, useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import HeaderBar from "../../components/Header";
import Help from "../../components/Help";
import { Layout } from "antd";
import Sidebar from "../../components/Sidebar";
import SuspenseWrapper from "../../components/SuspenseWrapper";
import LoginRedirect from "../user/login/redirect";
import RedirectSign from "../user/login/redirectSign";
import ViewPage from "./chartPersonal/components/viewPage/ViewPage";
import UserRolesAndAccess from "./UserRolesAndAccess/UserRolesAndAccess";
import UserConfiguration from "./UserRolesAndAccess/UserConfiguration/UserConfiguration";
import RolesAndAccess from "./UserRolesAndAccess/RolesAndAccess/RolesAndAccess";
import ScreenControls from "./UserRolesAndAccess/ScreenControls/ScreenControls";
// import PaperBatchRecords from './paperBatchRecords';
import PaperBatchRecordsTemplate from "./paperBatchRecordsTemplate";
import Analysis from "./Analysis/Analysis";
import AnalysisModel from "./Analysis/AnalysisModel/AnalysisModel";
import PbrReviewer from "./pbrReviewer";
import "./dashboard.scss";
import PythonNotebook from "./pythonNotebook/pythonNotebook";
// DASHBOARD ROUTE COMPONENTS

const ManualDataUpload = lazy(() => import("./manualDataUpload"));
const ChartPersonal = lazy(() => import("./chartPersonal"));
const View = lazy(() => import("./viewScreen/components/View"));
const ReportDesigner = lazy(() => import("./reportDesigner"));
const AuditTrial = lazy(() => import("./auditTrial"));
const Audit = lazy(() => import("./auditLogs"));
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
const DesignCharts = lazy(() => import('./reportDesigner/components/reportDesignerNew'));

const Faq = lazy(() => import("./faq"));
const { Content } = Layout;

const Dashboard = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const screen = location.pathname.split("/");

  useEffect(() => {
    // if (!Auth.isAuthenticated()) {
    //   history.push('/user/login');
    // }
  }, [history]);
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
                <Route
                  key="manual_data_upload"
                  path={`${match.url}/manual_data_upload`}
                >
                  <ManualDataUpload />
                </Route>

                <Route
                  path={`${match.url}/view_creation`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={ViewLanding} exact />
                      <Route path={`${url}/:id`} component={View} />
                    </>
                  )}
                />

                <Route
                  path={`${match.url}/chart_personalization`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={ChartPersonal} exact />
                      <Route path={`${url}/:id`} component={ViewPage} />
                    </>
                  )}
                />
                {/* <Route
                  key="report_designer"
                  path={`${match.url}/report_designer`}
                >
                  <ReportDesigner />
                </Route> */}
                {/* <Route
                  path={`${match.url}/molecule_hierarchy_configuration`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={Hierarchy} exact />
                      <Route
                        path={`${url}/:id`}
                        component={HierarchyMain}
                      />
                    </>
                  )}
                /> */}
                <Route
                  key="audit_trail_report"
                  path={`${match.url}/audit_trail_report`}
                >
                  <AuditTrial />
                </Route>
                <Route key="audit_logs" path={`${match.url}/audit_logs`}>
                  <Audit />
                </Route>
                <Route key="pbr_update" path={`${match.url}/pbr_update`}>
                  <PbrUpdate />
                </Route>
                {/* <Route
                  key="report_generator"
                  path={`${match.url}/report_generator`}
                >
                  <ReportGenerator />
                </Route> */}
                <Route
                  path={`${match.url}/report_generator`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={ReportDesigner} exact />
                      <Route
                        path={`${url}/:id`}
                        component={ReportGenerator}
                      />
                    </>
                  )}
                />
                <Route key="genealogy" path={`${match.url}/genealogy`}>
                  <Genealogy />
                </Route>
                <Route key="workflow" path={`${match.url}/workflow`}>
                  <Workflow />
                </Route>
                <Route key="workspace" path={`${match.url}/workspace`}>
                  <Workspace />
                </Route>
                <Route key="dashboard" path={`${match.url}/dashboard`}>
                  <DashboardScreen />
                </Route>
                {/* <Route
									key='paper_batch_records'
									path={`${match.url}/paper_batch_records`}>
									<PaperBatchRecords />
								</Route> */}
                <Route key="pbr_reviewer" path={`${match.url}/pbr_reviewer`}>
                  <PbrReviewer />
                </Route>

                {/* <Route key='audit_logs' path={`${match.url}/audit_logs`}>
									<Audit />
								</Route> */}
                {/* <Route
								<Route
									key='paper_batch_records_template'
									path={`${match.url}/pbr_template`}>
									<PaperBatchRecordsTemplate />
								</Route> */}
                <Route
                  path={`${match.url}/paper_batch_records`}
                  render={({ match: { url } }) => (
                    <>
                      <Route
                        path={`${url}/`}
                        component={PaperBatchRecords}
                        exact
                      />
                      <Route
                        path={`${url}/:id`}
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
                {/* <Route
                  path={`${match.url}/molecule_hierarchy_configuration`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={Hierarchy} exact />
                      <Route
                        path={`${url}/:id`}
                        component={HierarchyMain}
                      />
                    </>
                  )}
                /> */}
                <Route
                  path={`${match.url}/report_designer`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={ReportDesigner} exact />
                      <Route
                        path={`${url}/:id`}
                        component={DesignCharts}
                      />
                    </>
                  )}
                />
                {/* <Route
                  key="hierarchy"
                  path={`${match.url}/molecule_hierarchy_configuration`}
                >

                  <Hierarchy />
                </Route> */}
                <Route
                  path={`${match.url}/molecule_hierarchy_configuration`}
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} component={Hierarchy} exact />
                      <Route
                        path={`${url}/:id`}
                        component={HierarchyMain}
                      />
                    </>
                  )}
                />
                <Route
                  key="userRolesAndAccess"
                  path={`${match.url}/user-roles-and-access`}
                  exact
                  component={UserRolesAndAccess}
                />
                <Route
                  key="user-configuration"
                  path={`${match.url}/user-roles-and-access/user-configuration`}
                  component={UserConfiguration}
                />
                <Route
                  key="roles-and-access"
                  path={`${match.url}/user-roles-and-access/roles-and-access`}
                  component={RolesAndAccess}
                />
                <Route
                  key="application-controls"
                  path={`${match.url}/user-roles-and-access/application-controls`}
                  component={ScreenControls}
                />
                <Route
                  key={"analysis"}
                  path={`${match.url}/analysis`}
                  component={Analysis}
                  exact
                />
                <Route
                  key={"analysis-model"}
                  path={`${match.url}/analysis/:id`}
                  component={AnalysisModel}
                />
                {/* <Route
                  key="hierarchy_main"
                  path={`${match.url}/molecule_hierarchy_configurations`}
                >
                  <HierarchyMain />
                </Route> */}
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
