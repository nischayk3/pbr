/**
 * @author Binkita Tiwari <binkita.tiwari@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 31 March, 2022
 * @Last Changed By - binkita
 */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  hideLoader,
  showLoader,
  showNotification,
} from "../../../../duck/actions/commonActions";
import {
  getCountData,
  getTableData,
  getUnapprovedData,
  approveParamData,
} from "../../../../services/workFlowServices";
import { Card, Empty, Tabs, Button, Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import DashCard from "../../../../components/CardComponent/customCard";
import illustrations from "../../../../assets/images/Banner illustration.svg";
import WorkflowTable from "./workflowTable/workflowTable";
import "./styles.scss";
import ScreenHeader from "../../../../components/ScreenHeader/screenHeader";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import Signature from "../../../../components/ElectronicSignature/signature";

const { TabPane } = Tabs;
const Workflow = () => {
  const [itemCount, setItemCount] = useState();
  const [cardTitle, setCardTitle] = useState("");
  //const [indexCount, setIndexCount] = useState(0);
  const [isPublish, setIsPublish] = useState(false);
  //const [resultDate, setResultDate] = useState("");
  const [tilesData, setTilesData] = useState([]);
  const [activeDiv, setActiveDiv] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [approveReject, setApproveReject] = useState("");
  const [isApprove, setIsApprove] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    getTilesData();

  }, []);

  useEffect(() => {
    if (cardTitle != "") {
      cardTableData();
    }
  }, [cardTitle, activeTab]);

  useEffect(() => {
    if (cardTitle === "Param Data Approval") {
      getUnApprovedParamData();
    }
  }, [cardTitle, activeTab]);


  const cardTableData = async () => {
    let req;
    if (itemCount != 0) {
      if (activeTab === "1") {
        req = `/${applicationType}/awaiting_approval`;
      } else {
        req = `/${applicationType}/recently_approved`;
      }
      try {
        dispatch(showLoader());
        const tableResponse = await getTableData(req);
        if (tableResponse["status-code"] === 200) {
          setColumns(tableResponse.Data.config);
          setDataSource(tableResponse.Data.data);
          dispatch(hideLoader());
        } else if (tableResponse["status-code"] === 404) {
          setColumns(tableResponse.Data.config);
          setDataSource(tableResponse.Data.data);
          dispatch(hideLoader());
          dispatch(showNotification("error", tableResponse.Message));
        }
      } catch (error) {
        dispatch(hideLoader());
        dispatch(showNotification("error", error.Message));
      }
    }
  };

  const getTilesData = async () => {
    let req = {};
    try {
      dispatch(showLoader());
      const tilesResponse = await getCountData(req);
      setTilesData(tilesResponse["Data"]);
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification("error", error.message));
    }
  };

  const getUnApprovedParamData = async () => {
    let _reqData = {
      limit: 10,
    };

    const dataColumns = [
      {
        title: "Product",
        key: "product_num",
        dataIndex: "product_num",
      },
      {
        title: "Batch",
        key: "batch_num",
        dataIndex: "batch_num",
      },
      {
        title: "Parameter Name",
        key: "parameter_name",
        dataIndex: "parameter_name",
      },
      {
        title: "Parameter Value",
        key: "parameter_value",
        dataIndex: "parameter_value",
      },

      {
        title: "Site",
        key: "site_code",
        dataIndex: "site_code",
      },
      {
        title: "UOM",
        key: "uom_code",
        dataIndex: "uom_code",
      },
      {
        title: "Created By",
        key: "created_by",
        dataIndex: "created_by",
      },
      {
        title: "Date",
        key: "recorded_date",
        dataIndex: "recorded_date",
      },
    ];

    try {
      dispatch(showLoader());
      const dataRes = await getUnapprovedData(_reqData);
      if (dataRes.statuscode === 200) {
        setDataSource(dataRes.Data);
        setColumns(dataColumns);
      } else {
        dispatch(hideLoader());
        dispatch(showNotification("error", "No data found"));
      }
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification("error", "No data found"));
    }
  };

  const approveData = async (_reqParam) => {
    try {
      dispatch(showLoader());
      const approveRes = await approveParamData(_reqParam);
      if (approveRes.Status === 200) {
        dispatch(showNotification("success", approveRes.Message));
        getUnApprovedParamData();
        setIsApprove(true);
      } else {
        dispatch(hideLoader());
        dispatch(showNotification("error", "No data found"));
      }
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification("error", "No data found"));
    }
  };

  const tilesClicked = (item, index) => {
    setItemCount(item.item_count);
    //setIndexCount(index);
    setCardTitle(item.text);
    setActiveDiv(item.text);
    setApplicationType(item.application_type);
  };

  const changeTab = (activeKey) => {
    setActiveTab(activeKey);
  };

  const handleClose = () => {
    setIsPublish(false);
  };

  const eSignId = (esign) => {
    console.log("esign", esign);
    let _approveReq = {
      esign_id: esign.toString(),
      prod_param_id: selectedRowKeys,
    };

    approveData(_approveReq);
  };

  console.log("state selected row keys:", isApprove);
  return (
    <div className="custom-wrapper">
      <BreadCrumbWrapper />

      <div className="custom-content-layout">
        <ScreenHeader
          bannerbg={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #B9D6FF 100%)",
          }}
          title={`Hello ${localStorage.getItem("username")}!`}
          description="Today is a great day to approve some records! Lets take look"
          source={illustrations}
          sourceClass="geanealogy-image"
        />

        <div className="workflow_items">
          {
            <div className="approve-wrapper">
              {tilesData &&
                tilesData.map((item, index) => {
                  return (
                    <div
                      onClick={() => tilesClicked(item, index)}
                      style={{ cursor: "pointer" }}
                    >
                      <DashCard
                        count={item.item_count}
                        desc={item.text}
                        active={activeDiv}
                      />
                    </div>
                  );
                })}
            </div>
          }
          {itemCount >= 0 ? (
            <div className="approval-table-block workflow-right-block">
              <Card
                className="table-cards "
                title={
                  <div className="table-head">
                    {cardTitle}
                    <DownloadOutlined
                      style={{
                        color: "#093185",
                        marginLeft: "25px",
                        fontSize: "20px",
                      }}
                    />
                  </div>
                }
              >
                {cardTitle === "Param Data Approval" ? (
                  <>
                    <div style={{ margin: "25px 0px 20px 0px" }}>
                      <Button
                        className="custom-secondary-btn"
                        disabled={isApprove}
                        onClick={() => {
                          setIsPublish(true);
                          setApproveReject("A");
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        className="custom-primary-btn"
                        style={{ marginLeft: "16px" }}
                        disabled={isApprove}
                        onClick={() => {
                          setIsPublish(true);
                          setApproveReject("R");
                        }}
                      >
                        Reject
                      </Button>
                    </div>

                    <Table
                      rowSelection={{
                        selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                          setIsApprove(false);
                          setSelectedRowKeys(selectedRowKeys);
                        },
                      }}
                      className="approval-table"
                      columns={columns}
                      dataSource={dataSource}
                      rowKey="prod_param_id"
                      style={{
                        border: "1px solid #ececec",
                        borderRadius: "2px",
                      }}
                      pagination={false}
                      scroll={{ x: 500, y: 280 }}
                    />
                  </>
                ) : (
                  <Tabs
                    className="workflow-tabs"
                    activeKey={activeTab}
                    onChange={changeTab}
                  >
                    <TabPane tab="Awaiting Approval" key="1">
                      <WorkflowTable
                        columns={columns}
                        dataSource={dataSource}
                        activeTab={activeTab}
                      />
                    </TabPane>
                    <TabPane tab="Recently Approved" key="2">
                      <WorkflowTable
                        columns={columns}
                        dataSource={dataSource}
                        activeTab={activeTab}
                      />
                    </TabPane>
                  </Tabs>
                )}
              </Card>
            </div>
          ) : (
            <Empty
              className="empty-workflow workflow-right-block"
              description={<span>Please select one to view its approvals</span>}
            />
          )}
        </div>
      </div>
      <Signature
        isPublish={isPublish}
        status={approveReject}
        handleClose={handleClose}
        eSignId={eSignId}
        screenName="Workflow"
        appType="WORKITEMS"
      />
    </div>
  );
};

export default Workflow;
