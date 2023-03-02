import { ExclamationCircleOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import queryString from "query-string";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import InputField from "../../../../components/InputField/InputField";
import Sharing from '../../../../components/Sharing/sharing';
import {
	hideLoader, showLoader, showNotification
} from "../../../../duck/actions/commonActions";
import { getChartList } from "../../../../services/chartPersonalizationService";
import { saveDashboardData } from "../../../../services/dashboardServices";
import { getChartPlotData } from "../../../../services/workSpaceServices";
import LandingPage from "./landingPage/landingPage";
import "./styles.scss";
import ChartPage from "./viewChart/viewChart";

/* istanbul ignore next */
const DashboardScreen = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	//to show landing page
	const [showChartCard, setShowChartCard] = useState(false);
	//to create the dashboard name
	const [dashboardName, setdashboardName] = useState("");
	const [dashboardId, setDashboardId] = useState("");
	const [dashboardVersion, setDashboardVersion] = useState("");
	//serach table data
	const [searchTableData, setSearchTableData] = useState([]);
	const [rawTableData, setRawTableData] = useState([]);
	const [viewData, setViewData] = useState({
		chartName: "",
		status: "",
		chartDispId: "",
		searchValue: "",
		chartVersion: 0,
	});
	const searchData = useRef([]);
	const ref = useRef();
	const [landingChartData, setLandingChartData] = useState([]);
	const [landingChartLayoutX, setLandingChartLayoutX] = useState([]);
	const [landingChartLayoutY, setLandingChartLayoutY] = useState([]);
	const [showSaveModal, setShowSaveModal] = useState(false);
	const [saveType, setSaveType] = useState("");
	const [isSave, setIsSave] = useState(false);
	const [isShare, setIsShare] = useState(false)
	const params = queryString.parse(location.search);


	const handleShareVisible = () => {
		setIsShare(true);
	};

	const handleShareCancel = () => {
		setIsShare(false)
	}

	//for creating new dashboard name
	const settingDashboardName = (value) => {
		setdashboardName(value);
	};

	const chartCard = (value) => {
		setShowChartCard(value);
	};

	useEffect(() => {
		getTableData();
		idFromUrl();
	}, []);

	useEffect(() => {
		if (viewData.chartDispId != "") {
			getChartData();
		}
	}, [viewData.chartDispId]);

	//get table data
	const getTableData = async () => {
		let req = { chart_status: "ALL" };
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "DASHBOARD",
		};
		let antdDataTable = [];

		try {
			dispatch(showLoader());
			const viewRes = await getChartList(req, headers);
			viewRes.data.forEach((item, key) => {
				let antdObj = {};
				antdObj["key"] = key;
				antdObj["created_by"] = item.created_by;
				antdObj["chart_disp_id"] = item.chart_disp_id;
				antdObj["chart_name"] = item.chart_name;
				antdObj["chart_status"] = item.chart_status;
				antdObj["chart_version"] = item.chart_version;
				antdObj["chart_info"] = item.chart_info;
				antdDataTable.push(antdObj);
			});
			searchData.current = JSON.parse(JSON.stringify(antdDataTable));
			setSearchTableData(antdDataTable);
			setRawTableData(JSON.parse(JSON.stringify(antdDataTable)));
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error.message));
		}
	};

	//function to handle search
	const searchTable = (value) => {
		const filterData = searchData.current.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(viewData.searchValue.toLowerCase())
			)
		);
		setSearchTableData(filterData);
	};

	//on search value changes
	const onSearchChange = (e) => {
		if (e.target.value === "") {
			setSearchTableData(searchData.current);
		}
		setViewData({ ...viewData, searchValue: e.target.value });
	};

	//get chart data to plot
	const getChartData = async () => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let req = { chartId: viewData.chartDispId };
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "DASHBOARD",
		};
		try {
			dispatch(showLoader());
			const chartResponse = await getChartPlotData(req, headers);
			setLandingChartData(chartResponse.data[0].data);
			setLandingChartLayout(chartResponse.data[0].layout);
			setLandingChartLayoutX(chartResponse.data[0].layout.xaxis);
			setLandingChartLayoutY(chartResponse.data[0].layout.yaxis);
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			// dispatch(showNotification("error", error.Message));
		}
	};

	const idFromUrl = () => {
		if (params.id) {
			setIsSave(true)
			setDashboardId(params.id);
			setDashboardVersion(params.version);
			setShowChartCard(true);
		} else {
			setDashboardId("");
			setShowChartCard(false);
		}
	};
	const layout = {
		xaxis: landingChartLayoutX,
		yaxis: landingChartLayoutY,
		autosize: false,
		width: 150,
		height: 50,
	};

	const chartLayout = {
		xaxis: landingChartLayoutX,
		yaxis: landingChartLayoutY,
		autosize: false,
		width: 580,
		height: 250,
		margin: {
			l: 60,
			r: 50,
			//b: 75,
			t: 10,
			pad: 4,
		},
	};

	const handleSave = async (value) => {
		let json = ref.current.getChildState();
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "DASHBOARD",
		};
		let req = {
			...json,
			savetype: value ? value : saveType,
		};
		try {
			dispatch(showLoader());
			let res = await saveDashboardData(req, headers);

			if (res?.statuscode == 200) {
				dispatch(hideLoader());
				setIsSave(true)
				history.push(
					`/dashboard/dashboard/${res.dashboard_id}?id=${res.dashboard_id}&version=${res.dashboard_version}`);
				dispatch(
					showNotification(
						"success",
						`${json.dashboard_name} has been successfully saved`
					)
				);
				setShowSaveModal(false);
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", res.message));
				setShowSaveModal(false);
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error.Message));
		}
	};
	const handleSavePopUp = (value) => {
		setShowSaveModal(true);
		setSaveType(value);

	};

	const handleCancel = () => {
		setShowSaveModal(false);
	};
	const onChangeInputSaveAs = (e) => {
		setdashboardName(e.target.value);
	};
	return (
		<div className="custom-wrapper">
			{/* <BreadCrumbWrapper /> */}
			<div className="sub-header">
				<div onClick={() => window.location.reload()}>
					<BreadCrumbWrapper
						urlName={`/dashboard/dashboard/${dashboardId}`}
						value={dashboardId}
						data="Untitled"
					/>
				</div>

				{!params['share'] && showChartCard ? (
					<div className="btns">
						<Button
							className="viewCreation-saveBtn"
							onClick={() => handleShareVisible()}
							id="save-view"
							disabled={isSave ? false : true}
						>
							Share
						</Button>
						{isSave || dashboardId ? (
							<Button onClick={() => handleSavePopUp("saveAs")}>Save As</Button>) : <></>
						}
						<Button
							onClick={() => {
								setSaveType("save");
								handleSave("save");
							}}
						>
							Save
						</Button>

						<ShareAltOutlined style={{ color: "#093185", fontSize: "18px" }} />
					</div>
				) : (params['share'] ? (<div className="btns">
					<Button
						className="viewCreation-saveBtn"
						onClick={() => handleShareVisible()}
						id="save-view"
					>
						Share
					</Button></div>) : (<></>))}
			</div>
			<div className="custom-content-layout">
				{!showChartCard && (
					<LandingPage
						chartCard={chartCard}
						dashboarNameFunction={settingDashboardName}
						dashboardName={dashboardName}
						searchTableData={searchTableData}
						setSearchTableData={setSearchTableData}
						searchTable={searchTable}
						onSearchChange={onSearchChange}
						searchData={searchData}
						viewData={viewData}
						setViewData={setViewData}
						plotData={landingChartData}
						plotLayout={layout}
						idFromUrl={idFromUrl}
					/>
				)}
				{showChartCard && (
					<ChartPage
						ref={ref}
						dashboardName={dashboardName}
						plotData={landingChartData}
						plotLayout={chartLayout}
						viewData={viewData}
						searchTableData={searchTableData}
						setSearchTableData={setSearchTableData}
						searchTable={searchTable}
						onSearchChange={onSearchChange}
						searchData={searchData}
						setViewData={setViewData}
						dashboardId={dashboardId}
						dashboardVersion={dashboardVersion}
						getChartData={getChartData}
						rawTableData={rawTableData}
					/>
				)}
				<Modal
					className="dashboard-save"
					title={
						<span>
							<ExclamationCircleOutlined
								style={{
									color: "#FAAD14",
									fontSize: "18px",
									marginRight: "15px",
								}}
							/>
							{saveType == "save" ? "Save" : "Save As"}
						</span>
					}
					visible={showSaveModal}
					//onOk={handleOk}
					onCancel={handleCancel}
					footer={[
						<Button style={{ border: "none" }} onClick={() => handleCancel()}>
							Cancel
						</Button>,
						<Button
							style={{
								backgroundColor: "#093185",
								color: "white",
								borderRadius: "4px",
							}}
							onClick={() => handleSave()}
						>
							Save
						</Button>,
					]}
				>
					{saveType == "saveAs" && (
						<div>
							<InputField
								placeholder="Enter dashboard name"
								label="Dashboard Name"
								onChangeInput={(e) => onChangeInputSaveAs(e)}
								value={dashboardName}
							/>
						</div>
					)}
				</Modal>
			</div>
			<Sharing isShare={isShare} handleShareCancel={handleShareCancel} shareSreen="DASHBOARD" />
		</div>
	);
};

export default DashboardScreen;
