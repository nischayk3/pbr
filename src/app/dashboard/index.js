import './dashboard.scss';
import React, { lazy, useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import Auth from '../../utils/auth';
import BreadCrumbWrapper from '../../components/BreadCrumbWrapper';
import HeaderBar from '../../components/Header';
import Help from '../../components/Help';
import { Layout } from 'antd';
import Sidebar from '../../components/Sidebar';
import SuspenseWrapper from '../../components/SuspenseWrapper';
import Uploader from './dataLoad/index';
import LoginRedirect from '../user/login/redirect';
import RedirectSign from '../user/login/redirectSign';

// DASHBOARD ROUTE COMPONENTS
const Home = lazy(() => import('./home'));
const ManualDataUpload = lazy(() => import('./manualDataUpload'));
// const ChartPersonalization = lazy(() => import('./chartPersonalization'));
const ChartPersonal = lazy(() => import('./chartPersonal'));
const SystemErrorReport = lazy(() => import('./systemErrorReport'));
const ViewCreation = lazy(() => import('./viewCreation'));
const View = lazy(() => import('./viewScreen/components/View'));
const DataLoad = lazy(() => import('./dataLoad'));
const ReportDesigner = lazy(() => import('./reportDesigner'));
const AuditTrial = lazy(() => import('./auditTrial'));
const ReportGenerator = lazy(() => import('./reportGenerator'));
const Workflow = lazy(() => import('./wokflow'));
const Workspace = lazy(() => import('./workspace'));
const Genealogy = lazy(() => import('./genealogy'));
const DashboardScreen = lazy(() => import('./dashboardScreen'));
const ViewLanding = lazy(() => import('./viewScreen'));
const ViewChart = lazy(() =>
	import('./dashboardScreen/components/viewChart/viewChart')
);
const Faq = lazy(() => import('./faq'));
const { Content } = Layout;

const Dashboard = () => {
	const match = useRouteMatch();
	const history = useHistory();
  const location = useLocation();
  const screen = location.pathname.split('/')

	useEffect(() => {
		// if (!Auth.isAuthenticated()) {
		//   history.push('/user/login');
		// }
	}, [history]);
	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
				<HeaderBar />
				<Layout>
					<Sidebar />
          {screen[2] !== 'faq' &&  <Help />}
					<Content>
						{/* <BreadCrumbWrapper /> */}
						<SuspenseWrapper>
							<Switch>
								<Route key='home' path={`${match.url}/home`}>
									<Home />
								</Route>
								<Route
									key='manual_data_upload'
									path={`${match.url}/manual_data_upload`}>
									<ManualDataUpload />
								</Route>
								<Route
									key='view_creation'
									path={`${match.url}/view_creation_view`}>
									<View />
								</Route>
								<Route
									key='view_creation_landing'
									path={`${match.url}/view_creation_landing`}>
									<ViewLanding />
								</Route>
								<Route
									key='view_creation_old'
									path={`${match.url}/view_creation_old`}>
									<ViewCreation />
								</Route>
								<Route
									key='chart_personalization'
									path={`${match.url}/chart_personalization`}>
									<ChartPersonal />
								</Route>
								<Route
									key='system_error_report'
									path={`${match.url}/system_error_report`}>
									<SystemErrorReport />
								</Route>
								<Route key='data_load' path={`${match.url}/data_load`}>
									<DataLoad />
								</Route>
								<Route
									key='report_designer'
									path={`${match.url}/report_designer`}>
									<ReportDesigner />
								</Route>
								<Route
									key='audit_trail_report'
									path={`${match.url}/audit_trail_report`}>
									<AuditTrial />
								</Route>
								<Route
									key='report_generator'
									path={`${match.url}/report_generator`}>
									<ReportGenerator />
								</Route>
								<Route key='genealogy' path={`${match.url}/genealogy`}>
									<Genealogy />
								</Route>
								<Route key='workflow' path={`${match.url}/workflow`}>
									<Workflow />
								</Route>
								<Route key='workspace' path={`${match.url}/workspace`}>
									<Workspace />
								</Route>
								<Route key='dashboard' path={`${match.url}/dashboard`}>
									<DashboardScreen />
								</Route>
								<Route key='redirect' path={`${match.url}/redirect`}>
									<LoginRedirect />
								</Route>
								<Route key='redirect_sign' path={`${match.url}/redirect_sign`}>
									<RedirectSign />
								</Route>
                <Route key='faq' path={`${match.url}/faq`}>
                  <Faq />
                </Route>
							</Switch>
						</SuspenseWrapper>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};

export default Dashboard;
