/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 22 April, 2022
 * @Last Changed By - @Mihir
 */

import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Tabs,
  DatePicker,
  TimePicker,
  Radio,
  Select,
  Divider,
  Space,
  Input,
} from "antd";
import SelectField from "../../SelectField/SelectField";
import InputField from "../../InputField/InputField";
import "./reportNotify.scss";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../../duck/actions/commonActions";
import { putJob, getJob } from "../../../services/jobScheduleService";
import { PaperClipOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Option } = Select;

// const { RangePicker } = DatePicker;

const scheduleList = ["Repeat Once", "Daily", "Weekly", "Monthly"];
const timeRange = ["Hour", "Minutes", "Seconds"];

const ReportNotify = (props) => {
  const [selectedSchedule, setSelectedSchedule] = useState("Repeat Once");
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const showReceipients = false;
  const [radioValue, setRadioValue] = useState(null);
  const [emailList, setEmailList] = useState([]);
  const [scheduleStartDate, setScheduleStartDate] = useState("");
  const [scheduleEmailStartDate, setScheduleEmailStartDate] = useState("");
  const [selectedDays, setSelectedDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  // const [activeTab, setActiveTab] = useState("schedule_evaluation");
  const [scheduleEmailTime, setScheduleEmailTime] = useState("");
  // const [frequency, setFrequency] = useState("");
  const [everyDayValue, setEveryDayValue] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectContent, setSubjectContent] = useState("");

  let days_obj = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.job) {
      getJobs(props.job);
    }
  }, [props.job]);

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

  const handleSubject = (subjects) => {
    setSubject(!subjects);
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
    onClear()
    dispatch(showLoader())
    data = data[0];
    setEmailList(data.notify_emails);
    if (data.frequency_unit == 'Once') {
      setSelectedSchedule('Repeat Once');
    }
    else
      setSelectedSchedule(data.frequency_unit ? data.frequency_unit : '');
    setScheduleEmailStartDate(data.email_config.scheduled_start);
    setScheduleEmailTime(data.email_config.scheduled_time);
    setRadioValue(data.email_config.daily_frequency);
    if (data.email_config.daily_frequency == 3) {
      setEveryDayValue(data.email_config.every_day_value)
      handleSelectTimeChange(data.email_config.time_range)
    }
    setSelectedDays(data.email_config.selected_days_obj);
    dispatch(hideLoader())

  };

  const onClear = () => {
    setEmailList([]);
    setScheduleEmailStartDate("");
    setSelectedSchedule("Repeat Once");
    setScheduleEmailTime("");
    setRadioValue("");
    // setSelectedTimeRange("")
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
    handleSelectTimeChange("Hour")
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
  // const handleReceipientsChange = (value) => {
  //   setEmailList(value);
  // };
  const checkValidRequest = () => {
    if (selectedSchedule == 'Weekly') {
      let arr = Object.keys(selectedDays).filter((k) => selectedDays[k] === true)
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
      req["app_id"] = props.id ? props.id : "R262";

      let email_config = {};
      email_config["subject"] =
        subjectContent.length > 0 ? subjectContent : `Update For ${props.id}`;
      email_config["scheduled_start"] = scheduleEmailStartDate;
      email_config["scheduled_time"] = scheduleEmailTime;
      email_config["frequency_unit"] = selectedSchedule == "Repeat Once" ? "Once" : selectedSchedule;
      email_config["email_list"] = emailList;
      email_config["attachment"] = "";
      email_config["created_by"] = localStorage.getItem("username")
        ? localStorage.getItem("username")
        : "";

      if (selectedSchedule == "Weekly") {
        email_config["selected_days"] = Object.keys(selectedDays).filter(
          (k) => selectedDays[k] === true
        );
        email_config["selected_days_obj"] = selectedDays;
      }
      if (selectedSchedule == "Daily") {
        if (radioValue == 3) {
          // email_config["daily_frequency"] =
          //   "Every" + " " + everyDayValue + " " + selectedTimeRange;
          email_config["daily_frequency"] = radioValue;
          email_config["every_day_value"] = everyDayValue;
          email_config["time_range"] = selectedTimeRange;

        } else {
          email_config["daily_frequency"] = radioValue;
        }
      }

      req["email_config"] = email_config;
      req["frequency"] = selectedSchedule == "Repeat Once"
        ? "Once"
        : convertExpresion(
          scheduleEmailStartDate,
          scheduleEmailTime,
          selectedSchedule == "Repeat Once" ? "Once" : selectedSchedule,
          radioValue,
          selectedTimeRange,
          selectedDays ? Object.keys(selectedDays).filter((k) => selectedDays[k] === true) : [],
          everyDayValue
        );
      req["frequency_unit"] =
        selectedSchedule == "Repeat Once" ? "Once" : selectedSchedule;
      req["job_status"] = "NEW";
      req["job_type"] = "email";
      req["notify_emails"] = emailList;
      req["scheduled_end"] =
        selectedSchedule == "Repeat Once" ? scheduleEmailStartDate : "2030-12-12";
      req["scheduled_start"] = scheduleEmailStartDate;

      // req["cron_exp"] = convertExpresion(
      //   scheduleEmailStartDate,
      //   scheduleEmailTime,
      //   selectedSchedule == "Repeat Once" ? "Once" : selectedSchedule,
      //   radioValue,
      //   selectedTimeRange,
      //   Object.keys(selectedDays).filter((k) => selectedDays[k] === true),
      //   everyDayValue
      // );
      if (props.job_id)
        req["job_id"] = props.job_id ? props.job_id : ' ';

      let res = await putJob(req, request_headers);

      if (res.Status == 200) {
        dispatch(showNotification("success", "Saved"));
      } else {
        dispatch(
          showNotification("error", res.Message ? res.Message : res.detail)
        );
      }
    }
    else {
      dispatch(
        showNotification("error", 'Required Fields are missing')
      )
    }
  };
  // const changeTab = (activeKey) => {
  //   setActiveTab(activeKey);
  // };



  const onChangeEmailStart = (date, dateString) => {
    setScheduleEmailStartDate(dateString);
    // setstartTimeIso(moment(date).toISOString());
  };

  const onChangeEmailTime = (date, dateString) => {
    setScheduleEmailTime(dateString);
    // setstartTimeIso(moment(date).toISOString());
  };
  const setEveryDayValues = (value) => {
    setEveryDayValue(value);
  };
  // const onChangeEnd = (date, dateString) => {
  //     setScheduleEndDate(dateString);
  //     // setendTimeIso(moment(date).toISOString());
  // };

  const handleChange = (selectedItems) => {
    setEmailList(selectedItems);
  };
  return (
    <div className="report-notify">
      <Tabs
        className="evaluation-tabs"
        // onChange={changeTab}
        // activeKey={activeTab}
        tabBarExtraContent={
          <div className="tab-btns">
            <Button
              className="schedule-evalutaion-button"
              onClick={() => SaveData()}
            >
              Schedule
            </Button>
            <Button className="clear-schedule" onClick={() => onClear()}>
              Clear
            </Button>
          </div>
        }
      >
        <TabPane tab="Email draft" key="email_draft">
          <Select
            mode="tags"
            style={{ width: "90%", marginTop: "10px" }}
            placeholder={
              <>
                <span className="email-recipients">Recipients</span>
                <span className="email-recipients-report">(Optional)</span>
              </>
            }
            optionLabelProp="label"
            value={emailList}
            bordered={false}
            onChange={handleChange}
          >
            {/* <Option
              value="mihir.bagga@mareana.com"
              label="mihir.bagga@mareana.com"
            >
              mihir.bagga@mareana.com
            </Option> */}
          </Select>
          <hr style={{ borderTop: "1px solid #dbdbdb", width: '60%', marginRight: '407px' }} />
          <span>
            <p
              onDoubleClick={() => handleSubject(subject)}
              className="email-subject"
            >
              Subject{" "}
              {subject ? (
                <Input.TextArea
                  style={{ width: "800px", marginLeft: "30px" }}
                  autoSize={true}
                  defaultValue={subjectContent}
                  onChange={(e) => setSubjectContent(e.target.value)}
                  onSubmit={() => handleSubject(subject)}
                />
              ) : (
                <>
                  <span className="email-sub">
                    {subjectContent.length > 0 ? (
                      subjectContent
                    ) : (
                      <> Update for {props.id}</>
                    )}
                  </span>{" "}
                </>
              )}{" "}
            </p>
          </span>
          <hr style={{ borderTop: "1px solid #dbdbdb", width: '60%', marginRight: '407px' }} />
          <br />
          <p className="email-content">
            {" "}
            Hey,
            <br />
            <br />
            <p>
              This is to inform you of the recent update to{" "}
              {localStorage.getItem("username") + "_variant"}. Check the
              attachment for details.
              <br />
              <br />
            </p>
            <br />
            Regards,
            <br />
            {localStorage.getItem("username")
              ? localStorage.getItem("username") + "_variant"
              : ""}
          </p>

          <div className="attachment-report-report">
            <span>
              <PaperClipOutlined
                style={{ marginLeft: "10px", marginTop: "4px" }}
              />
            </span>
            <span className="attachment-report-text"> Report_name.pdf</span>
          </div>
          {/* {emailList.length > 0 && ( */}
          {/* )} */}
        </TabPane>
        <TabPane tab="Email schedule" key="email_schedule">
          <div style={{ margin: "24px" }}>
            <div style={{ width: "300px" }}>
              <ClockCircleOutlined
                style={{ color: "#093185", fontSize: "18px" }}
              />{" "}
              <DatePicker
                style={{ width: "260px" }}
                placeholder="Start Date"
                bordered={false}
                onChange={onChangeEmailStart}
                value={
                  scheduleEmailStartDate.length > 0
                    ? moment(scheduleEmailStartDate, "YYYY/MM/DD HH:mm:ss")
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
                    {/* <SelectField
                                            placeholder='Schedule'
                                            onChangeSelect={(e) => handleSelectScheduleChange(e)}
                                            selectList={scheduleList}
                                            value={selectedSchedule}
                                            defaultValue="Repeat Once"
                                        /> */}
                    <Select
                      placeholder="Schedule"
                      value={selectedSchedule}
                      onChange={(e) => handleSelectScheduleChange(e)}
                      style={{ width: "100%", margin: "0px" }}
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
                      onChange={onChangeEmailTime}
                      value={
                        scheduleEmailTime.length > 0
                          ? moment(scheduleEmailTime, "HH:mm:ss")
                          : null
                      }
                    />
                  </div>
                </Col>
              </Row>
              {selectedSchedule == "Daily" ? (
                <div className="select-days">
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
                            }}
                          >
                            <Radio value={3} className="alerts-radio">
                              Every
                            </Radio>{" "}
                            <span
                              style={{
                                width: "72px",
                                marginRight: "20px",
                                marginTop: "15px",
                              }}
                            >
                              <InputField
                                value={everyDayValue}
                                onChangeInput={(e) =>
                                  setEveryDayValues(e.target.value)
                                }
                                className="alerts-radio"
                                placeholder="4"
                              />
                            </span>
                            <div style={{ width: "100px", marginTop: "15px" }}>
                              <SelectField
                                // className='alerts-radio'
                                placeholder="Hour"
                                selectList={timeRange}
                                selectedValue={selectedTimeRange}
                                // defaultValue={selectedTimeRange}
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
                <div className="select-days">
                  <Button
                    className={
                      selectedDays && selectedDays["Sunday"]
                        ? "selected-day-buttons-one"
                        : "day-buttons-one"
                    }
                    onClick={() => updateDays("Sunday")}
                  >
                    S
                  </Button>
                  <Button
                    className={
                      selectedDays && selectedDays["Monday"]
                        ? "selected-day-buttons-report"
                        : "day-buttons-report"
                    }
                    onClick={() => updateDays("Monday")}
                  >
                    M
                  </Button>
                  <Button
                    className={
                      selectedDays && selectedDays["Tuesday"]
                        ? "selected-day-buttons-report"
                        : "day-buttons-report"
                    }
                    onClick={() => updateDays("Tuesday")}
                  >
                    T
                  </Button>
                  <Button
                    className={
                      selectedDays && selectedDays["Wednesday"]
                        ? "selected-day-buttons-report"
                        : "day-buttons-report"
                    }
                    onClick={() => updateDays("Wednesday")}
                  >
                    W
                  </Button>
                  <Button
                    className={
                      selectedDays && selectedDays["Thursday"]
                        ? "selected-day-buttons-report"
                        : "day-buttons-report"
                    }
                    onClick={() => updateDays("Thursday")}
                  >
                    T
                  </Button>
                  <Button
                    className={
                      selectedDays && selectedDays["Friday"]
                        ? "selected-day-buttons-report"
                        : "day-buttons-report"
                    }
                    onClick={() => updateDays("Friday")}
                  >
                    F
                  </Button>
                  <Button
                    className={
                      selectedDays && selectedDays["Saturday"]
                        ? "selected-day-buttons-report"
                        : "day-buttons-report"
                    }
                    onClick={() => updateDays("Saturday")}
                  >
                    S
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* <div>
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
            </div> */}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ReportNotify;
