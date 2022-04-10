import React, { useEffect, useState } from "react";
import "./style.scss";
//antd imports
import {
  Card,
  Row,
  Col,
  Button,
  Menu,
  Dropdown,
  message,
  Modal,
  Tabs,
} from "antd";
import {
  ArrowLeftOutlined,
  CloudUploadOutlined,
  MoreOutlined,
  DesktopOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
//components
import LandingPage from "./landingPage/LandingPage";
import ViewPage from "./viewPage/ViewPage";
//cjson object
import chartJson from "./viewPage/chartObj.json";
//services
import { saveChartPlotData } from "../../../../services/chartPersonalizationService";
//react-redux
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../../duck/actions/commonActions";
//schedule-alert table
import AlertTable from "./scheduled-alerts/scheduledAlertsTable";
//alert evaluation
import AlertEvaluation from "./scheduled-alerts/alertEvaluation";

const { TabPane } = Tabs;

//main component
const ChartPersonal = () => {
  //for showing schedule alert modal
  const [alertModal, setAlertModal] = useState(false);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setAlertModal(false);
  };

  return (
    <div className="custom-wrapper">
      <div className="sub-header">
        <div className="sub-header-title">
          <ArrowLeftOutlined className="header-icon" /> &nbsp;
          <span className="header-title">Process Control Charts</span>
        </div>
      </div>
      <div className="custom-content-layout">
        <LandingPage />
      </div>
      <Modal
        title="Schedule Alert"
        className="schedule-modal"
        visible={alertModal}
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
                  <a>View More Details</a>
                  <ArrowRightOutlined
                    style={{ marginLeft: "10px", color: "#093185" }}
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
    </div>
  );
};

export default ChartPersonal;
