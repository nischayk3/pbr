import React, { Component } from "react";
import {
  ArrowLeftOutlined,
  FileDoneOutlined,
  Loading3QuartersOutlined,
  SaveOutlined,
  ShareAltOutlined,
  PlusOutlined,
  CheckCircleTwoTone,
  InfoCircleTwoTone
} from "@ant-design/icons";
import {
  Button, Modal, Input, Typography,
} from "antd";
import ChartView from "./components/ChartView/index";
import ChartFilter from "./components/ChartFilter/index";
import ChartDataTable from "./components/ChartDataTable/index";
import ChartType from "./components/ChartType/index";
import ChartDetails from "./components/ChartDetails";
import Personalization from "./components/Personalization/components/Personalization";
import "./ChartStyle.scss";

const { Text } = Typography;

class ChartPersonalization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isShare: false,
      isLoad: false,
      isNew: false,
      isSave: false,
      isDiscard: false,
    };

    const handleOk = () => {
      this.setState({
        loading: true,
      });
      setTimeout(() => {
        this.setState({
          loading: false,
          visible: false,
          isShare: false,
          isLoad: false,
          isNew: false,
          isSave: false,
          isSaveAs: false,
          isDiscard: false,
        });
      }, 3000);
    };

    const handleCancel = () => {
      this.setState({
        visible: false,
        isShare: false,
        isLoad: false,
        isNew: false,
        isSave: false,
        isSaveAs: false,
        isDiscard: false,
      });
    };

    const handleTitleChange = () => {
      const {
        isShare, isSave, isNew, isSaveAs, isLoad, isDiscard,
      } = this.state;
      if (isDiscard) {
        return (
          <span>
            <InfoCircleTwoTone twoToneColor="orange" />
            {" "}
            Discard Changes
          </span>
        );
      }
      if (isSave) { return <span>Congratulations</span>; }
      if (isLoad) {
        return (
          <span>
            <InfoCircleTwoTone twoToneColor="orange" />
            {" "}
            Load
          </span>
        );
      }
      if (isNew) {
        return (
          <span>
            <InfoCircleTwoTone twoToneColor="orange" />
            {" "}
            Unsaved Changes
          </span>
        );
      }
      if (isShare) {
        return (
          <span>
            <ShareAltOutlined twoToneColor="Green" />
            {" "}
            Share
          </span>
        );
      }
    };
  }

  render() {
    const {
      isShare, isSave, isNew, isLoad, isDiscard, visible,
    } = this.state;
    return (
      <div className="chart-wrapper">
        <div className="viewCreation-block">
          <h1 className="reportDesigner-headline">
            <ArrowLeftOutlined />

            Chart Personalization
          </h1>
          <div className="viewCreation-btns">
            <Button type="text" className="viewCreation-loadBtn" onClick={() => this.setState({ visible: true, isNew: true })}>
              <PlusOutlined />
              {" "}
              New
            </Button>
            <Button className="viewCreation-loadBtn" onClick={() => this.setState({ visible: true, isLoad: true })}>
              <Loading3QuartersOutlined />
              {" "}
              Load
            </Button>
            <Button className="viewCreation-saveBtn" onClick={() => this.setState({ visible: true, isSave: true })}>
              <SaveOutlined />
              {" "}
              Save
            </Button>
            <Button className="viewCreation-saveAsBtn">
              <FileDoneOutlined />
              {" "}
              Save As
            </Button>
            <Button className="viewCreation-shareBtn" onClick={() => this.setState({ visible: true, isShare: true })}>
              <ShareAltOutlined />
              {" "}
              Share
            </Button>
          </div>
        </div>
        <div className="chart-block">
          <div className="chart-left-panel">
            <div style={{ marginBottom: "10px" }}>
              <ChartView />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <ChartFilter />
            </div>
            <div>
              <ChartType />
            </div>
          </div>

          <div className="chart-center-panel">
            <ChartDetails />
            <ChartDataTable />
          </div>
          <div className="chart-right-panel">
            <Personalization />
          </div>

        </div>
        <div className="modalPopup">
          <Modal
            visible={visible}
            title={() => this.handleTitleChange()}
            width={500}
            mask
            onCancel={this.handleCancel}
            centered
            footer={null}
          >

            {isSave && (
              <div>
                <center>
                  <CheckCircleTwoTone className="circleIcon" twoToneColor="Green" />
                  <br />
                  <b>Your Changes Have Been Successfully Saved</b>
                </center>

              </div>
            )}

            {isShare && (
              <div>
                <div>
                  <div className="shareButton">
                    <Text>Edit</Text>
                    <Text>View</Text>
                  </div>
                </div>
                <div>
                  <div className="shareButton">
                    <Input width="30" />
                    <Input />
                  </div>
                </div>
              </div>
            )}
            {
              isLoad && (
                <div>
                  <p>
                    You Have made some changes
                    <br />
                    {" "}
                    Do you want to save or discard them ?
                  </p>
                  <div className="loadButton">
                    <Button className="viewCreation-loadBtn">Save As</Button>
                    <Button className="viewCreation-loadBtn">Save</Button>
                    <Button className="viewCreation-loadBtn" onClick={() => this.setState({ visible: true, isDiscard: true, isLoad: false })}>Discard</Button>
                  </div>
                </div>
              )
            }
            {
              isNew && (
                <div>
                  <p>
                    You Have made some changes
                    <br />
                    {" "}
                    Do you want to save or discard them ?
                  </p>
                  <div className="loadButton">
                    <Button className="viewCreation-loadBtn">Save As</Button>
                    <Button className="viewCreation-loadBtn">Save</Button>
                    <Button className="viewCreation-loadBtn" onClick={() => this.setState({ visible: true, isDiscard: true, isNew: false })}>Discard</Button>
                  </div>
                </div>
              )
            }
            {
              isDiscard && (
                <div>
                  <p>Are you sure you want to discard changes ?</p>
                  <div className="loadButton">
                    <Button className="viewCreation-loadBtn">Ok</Button>
                    <Button className="viewCreation-loadBtn">Cancel</Button>
                  </div>
                </div>
              )
            }

          </Modal>
        </div>

      </div>
    );
  }
}

export default ChartPersonalization;
