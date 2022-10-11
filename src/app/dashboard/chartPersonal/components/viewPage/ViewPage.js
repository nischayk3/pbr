import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";
import "./viewPageStyles.scss";
import { useHistory, useParams } from "react-router-dom";
//antd imports
import { Row, Col, Tabs, Button, Modal } from "antd";
import {
  CloudUploadOutlined,
  DesktopOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
//components
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import ViewChart from "./viewChart/ViewChart";
import Limits from "./limits/Limits";
import Display from "./display/Display";
import Chart from "./chart/Chart";
import Threshold from "./Threshold/threshold";
import Rules from "./Rules/rules";
//chart json object
import chartJson from "./chartObj.json";
//redux
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../../../../duck/actions/commonActions";
//services
import {
  saveChartPlotData,
  getChartPlotData,
} from "../../../../../services/chartPersonalizationService";
//alert evaluation
import AlertEvaluation from "../scheduled-alerts/alertEvaluation";
//schedule-alert table
import AlertTable from "../scheduled-alerts/scheduledAlertsTable";
import JobSchedule from "../../../../../components/JobSchedule";
import Signature from "../../../../../components/ElectronicSignature/signature";
import queryString from "query-string";
import ViewChartApprover from "./viewChart/ViewChartApprover";
import ChartApprover from "./chart/ChartApprover";
import DisplayApprover from "./display/DisplayApprover";
import Sharing from "../../../../../components/Sharing/sharing";

const { TabPane } = Tabs;

//main component
const ViewPage = () => {
  const { id } = useParams();
  const history = useHistory();
  //state for chart json data
  const [postChartData, setPostChartData] = useState({});
  const chartDetails = useRef({ chartId: "", chartVersion: "" });
  const [alertModal, setAlertModal] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [publishResponse, setPublishResponse] = useState({});
  const [approveReject, setApproveReject] = useState("");
  const [disablePublishButton, setDisablePublishButton] = useState(false);
  const [isShare, setIsShare] = useState(false)

  const dispatch = useDispatch();
  const location = useLocation();
  const params = queryString.parse(location.search);

  const callback = () => { };

  const handleCancel = () => {
    setAlertModal(false);
  };

  const handleShareVisible = () => {
    setIsShare(true);
  };

  const handleShareCancel = () => {
    setIsShare(false)
  }

  //function for saving chart data
  const saveAs = async (type) => {
    const postData = JSON.parse(JSON.stringify(postChartData));
    let obj = {};
    if (Number(id) !== 0) {
      if (type === "save") {
        obj = {
          ...postData,
          savetype: "save",
        };
      } else {
        postData.data[0].chart_id = "";
        postData.data[0].chart_version = "";
        postData.data[0].chart_status = "";
        obj = {
          ...postData,
          savetype: "saveas",
        };
      }
    } else {
      obj = {
        ...postData,
        savetype: "saveas",
      };
    }
    let access = false;
    postData.data.forEach((element) => {
      if (element.view_id === "") {
        dispatch(
          showNotification("error", "Select the view to save the chart")
        );
        access = true;
        return;
      }
      if (element.chart_name === "") {
        dispatch(showNotification("error", "Chart name required"));
        access = true;
        return;
      }
      if (element.chart_description === "") {
        dispatch(showNotification("error", "Chart description required"));
        access = true;
        return;
      }
    });
    if (access) {
      return false;
    }
    try {
      dispatch(showLoader());
      const viewRes = await saveChartPlotData(obj);
      if (viewRes.statuscode === 200) {
        if (Number(id) !== 0) {
          if (type === "save") {
            getChart();
            dispatch(showNotification("success", "Chart updated successfully"));
          } else {
            dispatch(
              showNotification("success", "New Chart created successfully")
            );
            history.push(
              `/dashboard/chart_personalization/${viewRes.chart_id}&${viewRes.chart_version}`
            );
          }
        } else {
          dispatch(showNotification("success", "Chart created successfully"));
          history.push(
            `/dashboard/chart_personalization/${viewRes.chart_id}&${viewRes.chart_version}`
          );
        }
      }
      dispatch(hideLoader());
    } catch (error) {
      /* istanbul ignore next */
      dispatch(hideLoader());
      dispatch(showNotification("error", "Chart creation failed"));
    }
  };

  const handleClose = () => {
    setIsPublish(false);
  };

  const PublishResponse = (res) => {
    setPublishResponse(res);
    getChart();
  };
  //function for getting chart data
  const getChart = async () => {
    const req = {
      chartId: chartDetails.current.chartId,
      version: chartDetails.current.chartVersion,
    };
    try {
      const viewRes = await getChartPlotData(req);
      setPostChartData(viewRes);
    } catch (err) {
      /* istanbul ignore next */
      dispatch(showNotification("error", "Load chart failed"));
    }
  };

  useEffect(() => {
    if (Number(id) === 0) {
      const newObj = JSON.parse(JSON.stringify(chartJson));
      setPostChartData(newObj);
    } else {
      const value = id.split("&");
      chartDetails.current.chartId = value[0];
      chartDetails.current.chartVersion = value[1];
      getChart();
    }
  }, [id]);



  useEffect(() => {
    postChartData &&
      postChartData.data &&
      postChartData.data.forEach((el) => {
        if (el.chart_status === "APRD" || el.chart_status === "AWAP") {
          setDisablePublishButton(true);
        } else {
          setDisablePublishButton(false);
        }
      });
  }, [postChartData]);

  return (
    <div className="custom-wrapper bread-wrapper">
      <div className="sub-header">
        <BreadCrumbWrapper
          urlName={`/dashboard/chart_personalization/${id}`}
          value={chartDetails.current.chartId}
          data="Untitled"
        />
        {!params['share'] ?
          <div className="btns">
            {Object.keys(params).length > 0 &&
              params.fromScreen !== "Workspace" ? (
              <>
                <Button
                  onClick={() => {
                    setIsPublish(true);
                    setApproveReject("R");
                  }}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    setIsPublish(true);
                    setApproveReject("A");
                  }}
                >
                  Approve
                </Button>
              </>
            ) : (
              <div>
                <Button disabled={postChartData && postChartData['data'] && postChartData['data'][0]?.chart_status == 'APRD' ? false : true} onClick={() => handleShareVisible()}
                >Share</Button>
                <Button onClick={() => setAlertModal(true)}>
                  Schedule Alert
                </Button>
                <Button onClick={() => saveAs("saveas")}>Save As</Button>
                <Button onClick={() => saveAs("save")}>Save</Button>
                <Button
                  disabled={disablePublishButton}
                  onClick={() => {
                    setIsPublish(true);
                    setApproveReject("P");
                  }}
                >
                  {" "}
                  <CloudUploadOutlined />
                  Publish
                </Button>
              </div>
            )}
          </div> : <div className="btns"><Button onClick={() => handleShareVisible()}
          >Share</Button></div>
        }
      </div>
      <div className="custom-content-layout">
        <Row gutter={24}>
          <Col span={7} className="tab-container">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="View" key="1">
                {Object.keys(params).length > 0 &&
                  params.fromScreen !== "Workspace" ? (
                  <ViewChartApprover postChartData={postChartData} />
                ) : (
                  <ViewChart
                    postChartData={postChartData}
                    setPostChartData={setPostChartData}
                  />
                )}
              </TabPane>
              <TabPane tab="Limit" key="2">
                <Limits
                  postChartData={postChartData}
                  setPostChartData={setPostChartData}
                />
              </TabPane>
              <TabPane tab="Display" key="3">
                {Object.keys(params).length > 0 ? (
                  <DisplayApprover
                    postChartData={postChartData}
                    setPostChartData={setPostChartData}
                  />
                ) : (
                  <Display
                    postChartData={postChartData}
                    setPostChartData={setPostChartData}
                  />
                )}
              </TabPane>
              <TabPane tab="Threshold" key="4">
                <Threshold
                  postChartData={postChartData}
                  setPostChartData={setPostChartData}
                />
              </TabPane>
              <TabPane tab="Rule" key="5">
                <Rules
                  postChartData={postChartData}
                  setPostChartData={setPostChartData}
                />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={17}>
            {Object.keys(params).length > 0 ? (
              <ChartApprover
                postChartData={postChartData}
                setPostChartData={setPostChartData}
              />
            ) : (
              <Chart
                postChartData={postChartData}
                setPostChartData={setPostChartData}
              />
            )}
          </Col>
        </Row>
      </div>
      <Modal
        title="Schedule Alert"
        className="schedule-modal"
        visible={false}
        onCancel={handleCancel}
        footer={false}
        width={1300}
      >
        <Tabs tabPosition="left" className="schedule-menu">
          <TabPane
            tab={
              <span>
                <DesktopOutlined />
                Alerts
              </span>
            }
            key="1"
          >
            <AlertEvaluation />
          </TabPane>
          <TabPane
            tab={
              <span>
                <DesktopOutlined />
                Schedule Alerts
              </span>
            }
            key="2"
          >
            <div className="schedule-alerts">
              <div className="alerts-text">
                <p className="alert-title">Scheduled Alerts</p>
                <span className="alert-arrow">
                  <a href="/">View More Details</a>
                  <ArrowRightOutlined
                    style={{
                      marginLeft: "10px",
                      color: "#093185",
                    }}
                  />
                </span>
              </div>
              <div>
                <AlertTable />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
      <JobSchedule
        visible={alertModal}
        app_type="CHART"
        handleCancel={handleCancel}
        id={postChartData.data && postChartData.data[0].chart_id}
        version={postChartData.data && postChartData.data[0].chart_version}

      />
      <Signature
        isPublish={isPublish}
        handleClose={handleClose}
        screenName="Chart Personalization"
        PublishResponse={PublishResponse}
        appType="CHART"
        dispId={postChartData.data && postChartData.data[0].chart_id}
        version={postChartData.data && postChartData.data[0].chart_version}
        status={approveReject}
      />
      <Sharing isShare={isShare} handleShareCancel={handleShareCancel} shareSreen="VIEW" />

    </div>
  );
};

export default ViewPage;
