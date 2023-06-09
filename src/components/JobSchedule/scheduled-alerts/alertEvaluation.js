/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir
 */

import {
	ClockCircleOutlined,
	ExclamationCircleTwoTone
} from "@ant-design/icons";
import {
	Button, Col, DatePicker, Divider, Modal, Radio, Row, Select, Space, Tabs, TimePicker
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	hideLoader, showLoader, showNotification
} from "../../../duck/actions/commonActions";
import { getJob, putJob } from "../../../services/jobScheduleService";
import InputField from "../../InputField/InputField";
import SelectField from "../../SelectField/SelectField";
import ChartNotify from "./chartNotify";
import "./styles.scss";

const { TabPane } = Tabs;
const { Option } = Select;

const scheduleList = ["Repeat once", "Daily", "Weekly", "Monthly"];
const timeRange = ["Hour", "Minutes", "Seconds"];

const alertEvaluation = (props) => {
	const dispatch = useDispatch();

	const [selectedSchedule, setSelectedSchedule] = useState("Repeat Once");
	const [selectedTimeRange, setSelectedTimeRange] = useState("");
	const showReceipients = false;
	const [radioValue, setRadioValue] = useState(null);
	const [emailList, setEmailList] = useState([]);
	const [scheduleStartDate, setScheduleStartDate] = useState("");
	// const [scheduleEmailStartDate, setScheduleEmailStartDate] = useState("");
	const [scheduleTime, setScheduleTime] = useState("");
	const [modal, setModal] = useState(false);
	const [isSame, setIsSame] = useState(false);
	const [selectedDays, setSelectedDays] = useState({
		Sunday: false,
		Monday: false,
		Tuesday: false,
		Wednesday: false,
		Thursday: false,
		Friday: false,
		Saturday: false,
	});
	const [activeTab, setActiveTab] = useState("schedule_evaluation");
	// const [scheduleEmailTime, setScheduleEmailTime] = useState("");
	const [everyDayValue, setEveryDayValue] = useState("");
	const [emailLoad, setEmailLoad] = useState({});
	const [isLoad, setIsLoad] = useState(false);



	let days_obj = {
		Sunday: 0,
		Monday: 1,
		Tuesday: 2,
		Wednesday: 3,
		Thursday: 4,
		Friday: 5,
		Saturday: 6,
	};

	useEffect(() => {
		if (activeTab == "email" && scheduleStartDate.length > 0 && !isLoad) {
			setModal(true);
		}
	});

	useEffect(() => {
		if (props.job) {
			getJobs(props.job);
		}
	}, [props.job]);

	const onClear = () => {
		setEmailList([]);
		setSelectedSchedule("Repeat Once");
		setScheduleStartDate("");
		setScheduleTime("")
		// setScheduleEmailTime("");
		setRadioValue("");
		setSelectedDays({
			Sunday: false,
			Monday: false,
			Tuesday: false,
			Wednesday: false,
			Thursday: false,
			Friday: false,
			Saturday: false,
		});
		setEveryDayValue("")
		setSelectedTimeRange("Hour")
	};

	const checkValidRequest = () => {
		if (selectedSchedule == 'Weekly') {
			let arr = Object.keys(selectedDays).filter((k) => selectedDays[k] === true)
			console.log(arr)
			if (arr.length > 0)
				return true
			else
				return false
		}
		else {
			if (radioValue == 3 && everyDayValue.length <= 0) {
				return false
			}
			else
				return true
		}
	}
	const getJobs = async (job) => {
		dispatch(showLoader());
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		let request_headers = {
			"content-type": "application/json",
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "DASHBOARD",
		};

		let req = { app_type: props.appType, dag_id: job };
		let get_response = await getJob(req, request_headers);
		try {
			if (get_response.Data) {
				onClear()
				setIsLoad(true)
				unLoad(get_response.Data);
			}

			if (get_response.Status == 401) {
				dispatch(showNotification("error", "Session TimeOut Login again"));
			}

			dispatch(hideLoader());
		} catch (error) {
			dispatch(showNotification("error", error));
			dispatch(hideLoader());
		}
	};

	const unLoad = (data) => {
		dispatch(showLoader());
		data = data[0];
		if (data && data.job_type && data.job_type == "email") {
			setActiveTab("email");
			setEmailLoad(data);
			setModal(false)
		} else {
			if (data) {
				if (data.email_config.selected_days_obj)
					setSelectedDays(data.email_config.selected_days_obj);
				if (data.frequency_unit == 'Once') {
					setSelectedSchedule('Repeat Once');
				}
				else
					setSelectedSchedule(data.frequency_unit ? data.frequency_unit : '');
				setRadioValue(data.email_config.daily_frequency);
				setScheduleStartDate(data.scheduled_start);
				setScheduleTime(data.email_config.scheduled_time);
				if (data.email_config.daily_frequency == 3) {
					setEveryDayValue(data.email_config.every_day_value)
					setSelectedTimeRange(data.email_config.time_range)
				}
			}
			// setRadioValue(data.email_config.daily_frequency)
			// setSelectedDays(data.email_config.selected_days_obj)
			dispatch(hideLoader());
		}
	};
	const convertExpresion = (
		date,
		time,
		frequency,
		radio,
		f,
		days,
		everyDayValuee
	) => {

		let cron_string = "";
		let time_split = time.split(":");
		let date_split = date.split("-");


		if (frequency == "Daily") {
			if (radio == "Every Day") {
				cron_string = time_split[1] + " " + time_split[0] + " * * *";
			}
			if (radio == "Every WeekDay") {
				cron_string = time_split[1] + " " + time_split[0] + " * * 1-5";
			}
			if (radio == 3) {
				if (f == "Minutes") {
					cron_string = `*/${everyDayValuee}  * * * *`;
				}
				if (f == "Seconds") {
					cron_string = `*/${everyDayValuee}  * * * *`;
				}
				if (f == "Hour") {
					// cron_string = '*' + ' ' + time_split[0] + ' * * *'
					cron_string = `* */${everyDayValuee}  * * *`;
				}
			}
		}

		if (frequency == "Weekly") {
			let str = "";
			for (let i = 0; i < days.length; i++) {
				if (i > 0) {
					str = str + "," + days_obj[days[i]];
				} else {
					str = str + days_obj[days[i]];
				}
			}
			cron_string = time_split[1] + " " + time_split[0] + ` * * ${str}`;
		}

		if (frequency == "Monthly") {
			cron_string =
				time_split[1] + " " + time_split[0] + " " + date_split[2] + " " + "* *";
		}
		if (frequency == "Repeat Once") {
			cron_string = "once";
		}

		return cron_string;
	};

	const updateDays = (day) => {
		dispatch(showLoader());
		if (selectedDays[day]) {
			selectedDays[day] = false;
			setSelectedDays(selectedDays);
		} else {
			selectedDays[day] = true;
			setSelectedDays(selectedDays);
		}
		dispatch(hideLoader());
	};

	const handleSelectScheduleChange = (e) => {
		setSelectedSchedule(e);
	};

	const onChangeRadioButton = (e) => {
		setRadioValue(e.target.value);
	};
	const handleSelectTimeChange = (e) => {
		setSelectedTimeRange(e);
	};

	const handleReceipientsChange = (value) => {
		setEmailList(value);
	};
	const setEveryDayValues = (value) => {
		setEveryDayValue(value);
	};

	const handleModalClose = (value) => {
		setModal(false);
		setActiveTab("");
		setIsSame(value);
	};
	const SaveData = async () => {
		let is_valid = checkValidRequest()
		if (is_valid) {
			let req = {};
			let login_response = JSON.parse(localStorage.getItem("login_details"));

			let request_headers = {
				"content-type": "application/json",
				"x-access-token": login_response.token ? login_response.token : "",
				"resource-name": "DASHBOARD",
			};

			req["app_data"] = props.name ? props.name : props.appType;
			req["dag_id"] = " ";
			req["created_by"] = localStorage.getItem("username")
				? localStorage.getItem("username")
				: "";
			req["app_type"] = props.appType;
			req["app_id"] = props.id;

			let email_config = {};
			email_config["scheduled_time"] = scheduleTime;
			email_config["selected_days_obj"] = selectedDays;
			email_config["daily_frequency"] = radioValue;
			email_config["every_day_value"] = everyDayValue;
			email_config["time_range"] = selectedTimeRange;
			email_config["frequency"] = convertExpresion(
				scheduleStartDate,
				scheduleTime,
				selectedSchedule == "Repeat Once" ? "Once" : selectedSchedule,
				radioValue,
				selectedTimeRange,
				selectedDays ? Object.keys(selectedDays).filter((k) => selectedDays[k] === true) : [],
				everyDayValue
			);
			req["email_config"] = email_config;
			req["frequency"] =
				selectedSchedule == "Repeat Once"
					? "Once"
					: convertExpresion(
						scheduleStartDate,
						scheduleTime,
						selectedSchedule == "Repeat Once" ? "Once" : selectedSchedule,
						radioValue,
						selectedTimeRange,
						selectedDays ? Object.keys(selectedDays).filter((k) => selectedDays[k] === true) : [],
						everyDayValue
					);
			req["frequency_unit"] =
				selectedSchedule == "Repeat Once" ? "Once" : selectedSchedule;
			req["job_status"] = "scheduled";
			req["job_type"] = "event";
			req["notify_emails"] = [];
			req["scheduled_start"] = scheduleStartDate;
			req["scheduled_end"] =
				selectedSchedule == "Repeat Once" ? scheduleStartDate : "2030/12/12";
			if (props.job_id)
				req["job_id"] = props.job_id ? props.job_id : ' ';
			let res = await putJob(req, request_headers);

			if (res.Status == 200) {
				dispatch(showNotification("success", "Saved"));
				setIsLoad(false)
			} else {
				dispatch(showNotification("error", res.Message));
			}
		}
		else {
			dispatch(
				showNotification("error", 'Required Fields are missing')
			)
		}
	};
	const changeTab = (activeKey) => {
		setActiveTab(activeKey);
	};

	const onChangeStart = (date, dateString) => {
		setScheduleStartDate(dateString);
		// setstartTimeIso(moment(date).toISOString());
	};

	const onChangeTime = (date, dateString) => {
		setScheduleTime(dateString);
		// setstartTimeIso(moment(date).toISOString());
	};

	// const onChangeEmailStart = (date, dateString) => {
	// 	setScheduleEmailStartDate(dateString);
	// 	// setstartTimeIso(moment(date).toISOString());
	// };

	// const onChangeEmailTime = (date, dateString) => {
	// 	setScheduleEmailTime(dateString);
	// 	// setstartTimeIso(moment(date).toISOString());
	// };
	// const onChangeEnd = (date, dateString) => {
	//     setScheduleEndDate(dateString);
	//     // setendTimeIso(moment(date).toISOString());
	// };

	// const handleChange = (selectedItems) => {
	// 	setEmailList(selectedItems);
	// };
	return (
		<div className="chart-notify">
			<Tabs
				className="evaluation-tabs"
				onChange={changeTab}
				tabBarExtraContent={
					activeTab == "schedule_evaluation" ? (
						<div
							className="evaluation"
							style={{ marginRight: "20px", marginTop: "15px" }}
						>
							{" "}
							<Button
								className="schedule-evalutaion-button"
								onClick={() => SaveData()}
							>
								Schedule alert
							</Button>
							<Button className="clear-schedule" onClick={() => onClear()}>
								Clear
							</Button>
						</div>
					) : (
						<></>
					)
				}
			>
				<TabPane tab="Schedule evaluation" key="schedule_evaluation">
					<div style={{ margin: "24px" }}>
						<div style={{ width: "300px" }}>
							<ClockCircleOutlined
								style={{ color: "#093185", fontSize: "18px" }}
							/>{" "}
							<DatePicker
								placeholder="Start Date"
								style={{ width: "260px" }}
								onChange={onChangeStart}
								bordered={false}
								value={
									scheduleStartDate.length > 0
										? moment(scheduleStartDate, "YYYY/MM/DD HH:mm:ss")
										: ""
								}
							/>
							<hr
								style={{
									borderTop: "1px solid #dbdbdb",
									width: "90%",
									marginRight: "30px",
								}}
							/>
						</div>
						<div style={{ marginTop: "40px" }}>
							<Row gutter={[16, 24]}>
								<Col className="gutter-row" span={4}>
									<div className="select-report-antd">
										<Select
											placeholder="Schedule"
											value={selectedSchedule}
											onChange={(e) => handleSelectScheduleChange(e)}
											style={{ width: "100%", margin: "0px" }}
											// onClear={()=>setSelectedSchedule('Repeat Once')}
											defaultValue={selectedSchedule}
											className="antd-selectors"

										>
											{scheduleList &&
												scheduleList.map((item) => (
													<Select.Option key={item} value={item}>
														{item}
													</Select.Option>
												))}
										</Select>
									</div>
								</Col>
								<Col className="gutter-row" span={4}>
									<div>
										<TimePicker
											style={{
												width: "187px",
												marginLeft: "35px",
												height: "36px",
											}}
											onChange={onChangeTime}
											value={
												scheduleTime.length > 0
													? moment(scheduleTime, "HH:mm:ss")
													: ""
											}
										/>
									</div>
								</Col>
							</Row>
							{selectedSchedule == "Daily" ? (
								<div style={{ marginTop: "30px" }}>
									<Row className="radio-daily">
										<Col>
											<Radio.Group
												onChange={onChangeRadioButton}
												value={radioValue}
											>
												<Space direction="vertical">
													<Radio value="Every Day" className="alerts-radio">
														Every Day
													</Radio>
													<Radio value="Every WeekDay" className="alerts-radio">
														Every WeekDay
													</Radio>
													<div
														style={{
															display: "flex",
															flexDirection: "row",
															alignItems: "baseline",
														}}
													>
														<Radio value={3} className="alerts-radio">
															Every
														</Radio>
														<span
															style={{
																width: "73px",
																marginRight: "20px",
																marginTop: "12px",
																height: "32px",
															}}
														>
															<InputField
																value={everyDayValue}
																onChangeInput={(e) =>
																	setEveryDayValues(e.target.value)
																}
																style={{ height: "36px" }}
																id="everyFewTimeUnits"
																placeholder="4"
															/>
														</span>
														<div style={{ width: "102px", marginTop: "18px" }}>
															<SelectField
																className="alerts-radio"
																// defaultValue={selectedTimeRange}
																placeholder="Hour"
																selectList={timeRange}
																selectedValue={selectedTimeRange}
																onChangeSelect={(e) =>
																	handleSelectTimeChange(e)
																}
															/>
														</div>
													</div>
												</Space>
											</Radio.Group>
										</Col>
									</Row>
								</div>
							) : (
								""
							)}
							{selectedSchedule == "Weekly" ? (
								<div>
									<div className="select-days">
										<Button
											className={
												selectedDays && selectedDays["Sunday"]
													? "selected-day-buttons-alert-one"
													: "day-buttons-alert-one"
											}
											onClick={() => updateDays("Sunday")}
										>
											S
										</Button>
										<Button
											className={
												selectedDays && selectedDays["Monday"]
													? "selected-day-buttons"
													: "day-buttons"
											}
											onClick={() => updateDays("Monday")}
										>
											M
										</Button>
										<Button
											className={
												selectedDays && selectedDays["Tuesday"]
													? "selected-day-buttons"
													: "day-buttons"
											}
											onClick={() => updateDays("Tuesday")}
										>
											T
										</Button>
										<Button
											className={
												selectedDays && selectedDays["Wednesday"]
													? "selected-day-buttons"
													: "day-buttons"
											}
											onClick={() => updateDays("Wednesday")}
										>
											W
										</Button>
										<Button
											className={
												selectedDays && selectedDays["Thursday"]
													? "selected-day-buttons"
													: "day-buttons"
											}
											onClick={() => updateDays("Thursday")}
										>
											T
										</Button>
										<Button
											className={
												selectedDays && selectedDays["Friday"]
													? "selected-day-buttons"
													: "day-buttons"
											}
											onClick={() => updateDays("Friday")}
										>
											F
										</Button>
										<Button
											className={
												selectedDays && selectedDays["Saturday"]
													? "selected-day-buttons"
													: "day-buttons"
											}
											onClick={() => updateDays("Saturday")}
										>
											S
										</Button>
									</div>
								</div>
							) : (
								""
							)}
						</div>
						<div>
							{showReceipients && (
								<>
									<Select
										mode="tags"
										style={{ width: "90%", marginTop: "10px" }}
										placeholder={
											<span style={{ fontSize: "16px" }}>Recipients</span>
										}
										optionLabelProp="label"
										value={emailList}
										bordered={false}
										onChange={handleReceipientsChange}
									>
										<Option
											value="binkita.tiwari@mareana.com"
											label="binkita.tiwari@mareana.com"
										>
											binkita.tiwari@mareana.com
										</Option>
									</Select>
									<Divider />
								</>
							)}
						</div>
					</div>
				</TabPane>

				<TabPane tab="Email" key="email" onClick={() => setModal(true)}>
					<ChartNotify
						appType={props.appType}
						id={props.id}
						data={emailLoad}
						same={isSame}
						schedule={selectedSchedule}
						start_date={scheduleStartDate}
						start_time={scheduleTime}
						radio={radioValue}
						days={selectedDays}
						day={everyDayValue}
						name={props.name}
						job_id={props.job_id}
					/>
				</TabPane>
			</Tabs>
			<Modal
				visible={modal}
				footer={false}
				onCancel={handleModalClose}
				width="400px"
				style={{ marginTop: "250px" }}
			>
				<div>
					<div>
						<ExclamationCircleTwoTone
							twoToneColor="orange"
							style={{ marginRight: "20px", fontSize: "18px" }}
						/>{" "}
						Notify
					</div>
					<div style={{ marginTop: "10px", marginLeft: "39px" }}>
						Do you want to notify with same schedule or different ?
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "20px",
							marginTop: "20px",
							marginLeft: "40%",
						}}
					>
						<Button
							className="custom-secondary-btn schedule-notification-different"
							onClick={() => handleModalClose(false)}
						>
							Different
						</Button>
						<Button
							className="custom-secondary-btn schedule-notification-same"
							onClick={() => handleModalClose(true)}
						>
							Same
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default alertEvaluation;
