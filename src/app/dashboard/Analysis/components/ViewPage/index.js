import React, { useState } from "react";
import "./viewPage.scss";
//antd-imports
import { Button, Tabs, Dropdown, Menu, Space, DatePicker } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
//componenets
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import Model from "./model/Model";
import Preprocess from "./preproccessing/Preprocess";
import Transformation from "./transformations";
import ModelData from "./ModelData";
import ModalComponent from "../../../../../components/Modal/Modal";
import ModelExcecute from "./ModelExcecute";
import { useSelector, useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../../../../duck/actions/commonActions";
import { putPipelineObj } from "../../../../../services/analyticsService";
import { putJob } from "../../../../../services/jobScheduleService";
import moment from "moment";
import Results from "./results/Results";

const ViewPageAnalysis = () => {
  const [modelData, setModelData] = useState();
  const [tableKey, setTableKey] = useState("1");
  const [exectStart, setExectStart] = useState(false);
  const [exectLater, setExectLater] = useState(false);
  const [executed, setEXecuted] = useState(false);
  const [exectLaterDate, setExectLaterDate] = useState("");
  const [finalModelJson, setFinalModelJson] = useState({});
  const tabChange = (key) => {
    setTableKey(key);
  };
  const dispatch = useDispatch();
  const selectedViewData = useSelector((state) => state.analyticsReducer);
  const menu = (
    <Menu
      items={[
        {
          label: "Now",
          key: "0",
          onClick: () => {
            const date = moment().format("YYYY-MM-DD");
            onExecuteClick(date);
            setExectLaterDate("");
          },
        },
        {
          label: "Later",
          key: "1",
          onClick: () => {
            setExectLater(true);
            setExectLaterDate("");
            // const date = moment().format("YYYY-MM-DD");
            // onExecuteClick(date);
          },
        },
      ]}
    />
  );
  const onSaveClick = async () => {
    const req = {
      ...selectedViewData.viewData,
      data: [{ ...finalModelJson }],
      savetype: "save",
      pipeline_disp_id: selectedViewData.viewData.pipeline_id,
    };
    dispatch(showLoader());
    const apiResponse = await putPipelineObj(req);
    if (apiResponse.statuscode === 200) {
      dispatch(hideLoader());
      setExectStart(true);
      dispatch(showNotification("success", "Model saved successfully"));
    } else {
      dispatch(hideLoader());
      setExectStart(false);
      dispatch(showNotification("error", "Model saving failed"));
    }
  };

  const onExecuteClick = async (date) => {
    const login_response = JSON.parse(localStorage.getItem("login_details"));
    const request_headers = {
      "content-type": "application/json",
      "x-access-token": login_response.token ? login_response.token : "",
      "resource-name": "ANALYTICS",
    };
    const reqBody = {
      app_data: "ANALYTICS",
      dag_id: " ",
      created_by: localStorage.getItem("username")
        ? localStorage.getItem("username")
        : "",
      app_type: "ANALYTICS",
      app_id: selectedViewData.viewData.pipeline_id,
      email_config: {},
      frequency: "Once",
      frequency_unit: "Once",
      job_status: "scheduled",
      job_type: "event",
      notify_emails: [],
      scheduled_start: date,
      scheduled_end: date,
    };
    dispatch(showLoader());
    const apiResponse = await putJob(reqBody, request_headers);
    if (apiResponse.Status === 200) {
      dispatch(hideLoader());
      setEXecuted(true);
      dispatch(showNotification("success", "Model executed successfully"));
    } else {
      dispatch(hideLoader());
      dispatch(showNotification("error", "Model execution failed"));
    }
  };

  const onSchedule = () => {
    const date = moment(exectLaterDate).format("YYYY-MM-DD");
    onExecuteClick(date);
    setExectLater(false);
  };

  return (
    <div className="custom-wrapper bread-wrapper view-analysis-container">
      <div className="sub-header">
        <BreadCrumbWrapper
          urlName={`/dashboard/analysis/${1}`}
          value={selectedViewData.viewData.pipeline_id}
          data={selectedViewData.viewData.pipeline_id}
        />
        <div className="btns">
          <div>
            <Button>Share</Button>
            <Button onClick={onSaveClick}>Save</Button>
            <Button>Save As</Button>
            {/* <Button onClick={() => setExectStart(true)}>Execute</Button> */}
            <Dropdown overlay={menu} trigger={["click"]} disabled={!exectStart}>
              <Button>Execute</Button>
            </Dropdown>
            <Button>
              <CloudUploadOutlined />
              Publish
            </Button>
          </div>
        </div>
      </div>
      <div className="custom-content-layout menu-tabs-color">
        <Tabs
          defaultActiveKey="1"
          activeKey={tableKey}
          onChange={tabChange}
          tabBarExtraContent={
            tableKey === "4" && (
              <Button className="save-button-extra">Save</Button>
            )
          }
        >
          <TabPane tab="Preprocess" key="1">
            <Preprocess setModelData={setModelData} setTableKey={setTableKey} />
          </TabPane>
          <TabPane tab="Model data" key="2">
            <ModelData modelData={modelData} />
          </TabPane>
          <TabPane tab="Model" key="3">
            <Model
              finalModelJson={finalModelJson}
              setFinalModelJson={setFinalModelJson}
            />
          </TabPane>
          {/* <TabPane tab="Transformation" key="4">
            <Transformation />
          </TabPane> */}
          {executed && !exectLater && (
            <TabPane tab="Results" key="5">
              <Results />
            </TabPane>
          )}
        </Tabs>
      </div>
      {/* <Signature
        isPublish={isPublish}
        handleClose={handleClose}
        screenName="Chart Personalization"
        PublishResponse={PublishResponse}
        appType="CHART"
        dispId={postChartData.data && postChartData.data[0].chart_id}
        version={postChartData.data && postChartData.data[0].chart_version}
        status={approveReject}
      /> */}
      {/* <ModalComponent isModalVisible={exectStart} closable={false} centered>
        <ModelExcecute />
      </ModalComponent> */}
      <ModalComponent
        title="Schedule Execution"
        isModalVisible={exectLater}
        closable={true}
        centered
        handleCancel={() => setExectLater(false)}
        width={400}
      >
        <label>Select Date</label>
        <DatePicker
          style={{ width: "100%", marginTop: "6px" }}
          value={exectLaterDate}
          onChange={(dateString) => setExectLaterDate(dateString)}
        />
        <div
          style={{
            display: "flex",
            marginTop: "20px",
            columnGap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <Button className="custom-primary-btn" onClick={onSchedule}>
            Schedule
          </Button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ViewPageAnalysis;
