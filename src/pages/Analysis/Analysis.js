import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Card, Row, Col, Input, Space, Divider, message } from "antd";
import LoadTable from "../../app/dashboard/chartPersonal/components/loadTable/LoadTable";
import Banner from '../../assets/images/AnalysisBanner.svg'
import { PlusOutlined } from "@ant-design/icons";

import { showLoader, hideLoader } from "../../duck/actions/commonActions";
import { getChartList } from "../../services/chartPersonalizationService";
import { getUpdatedChartsViewsData } from "../../services/workSpaceServices";
import "./Analysis.scss"

const { Search } = Input;

const Analysis = () => {
  const [modelData, setModelData] = useState([]);
  const [chartList, setChartList] = useState([]);
  const [viewSearch, setViewSearch] = useState(false);
  const searchViewData = useRef([]);
  const ref = useRef(null);

  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  let date = new Date();
  date = date.toDateString().substring(4, 15);

  const lastUpdatedChartsViews = async () => {
    let req = { limit: 5 };
    try {
      dispatch(showLoader());
      const chartResponse = await getUpdatedChartsViewsData(req);
      setModelData(chartResponse.last_created_or_changed_charts);
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      message.error("Unable to fetch charts");
    }
  };

  const getChartListSer = async () => {
    let reqChartList = { chart_status: "ALL" };
    try {
      dispatch(showLoader());
      const chartListRes = await getChartList(reqChartList);
      setChartList(chartListRes.data);
      searchViewData.current = chartListRes.data;
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
      message.error("Unable to fetch chart list");
    }
  };

  const onClickAdd = () => {
    console.log(match.url)
    history.push(`${match.url}/1`);
  };

  const searchTable = (value) => {
    const filterData = searchViewData.current.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setChartList(filterData);
  };

  const onSearchChange = (e) => {
    if (e.target.value === "") {
      setChartList(searchViewData.current);
    }
  };
  
  const onFocus = () => {
    setViewSearch(true);
  };

  const closeTableView = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setViewSearch(false);
      setChartList(searchViewData.current);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeTableView);
    return () => {
      document.removeEventListener("mousedown", closeTableView);
    };
  }, []);

  useEffect(() => {
    lastUpdatedChartsViews();
    getChartListSer();
  }, []);

  return (
    <div>
      <Row>
        <Col span={24} className="banner">
          <Card bordered={false}>
            <div className="card-body-div">
              <div className="text-descp">
                <h2>Howdy {localStorage.getItem("username")},</h2>
                <p>Let's get to building some models today!</p>
              </div>
              <img src={Banner} alt="banner" />
              <h6>{date}</h6>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="landing-content">
        <Col span={24}>
          <Card bordered={false}>
            <Row>
              <Col span={6} />
              <Col span={12} className="p36 table-data" ref={ref}>
                <Search
                  placeholder="Search by model name or IDs"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onFocus={onFocus}
                  onChange={onSearchChange}
                  onSearch={searchTable}
                />
                {viewSearch && <LoadTable chartList={chartList} />}
              </Col>
              <Col span={6} />
            </Row>
            <Row>
              <Col span={6} />
              <Col span={12} className="p36">
                <div className="create-new" onClick={onClickAdd}>
                  <PlusOutlined />
                  <p>Create new model</p>
                </div>
              </Col>
              <Col span={6} />
            </Row>
            {modelData && modelData.length !== 0 && (
              <Row className="recent-charts">
                <Col span={6} />
                <Col span={12} className="p36">
                  <Row gutter={16} className="title">
                    <Col span={8}>
                      <h3>Recently created models</h3>
                    </Col>
                    <Col span={14} className="title-legends">
                      <dl>
                        <dt className="grey"></dt>
                        <dd>Draft</dd>
                        <dt className="yellow"></dt>
                        <dd>Awaiting Approval</dd>
                        <dt className="green"></dt>
                        <dd>Approved</dd>
                      </dl>
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={24}>
                    {modelData &&
                      modelData.map((ele) => {
                        return (
                          <Link
                            key={ele.chart_disp_id}
                            to={`${match.url}/${ele.chart_disp_id}`}
                          >
                            <Col span={6} style={{ marginTop: "10px" }}>
                              <div className="chart-tiles">
                                <div
                                  className="legend"
                                  style={{
                                    background:
                                      ele.chart_status === "DRFT"
                                        ? "#363636"
                                        : ele.chart_status === "AWAP"
                                        ? "#F6BB61"
                                        : "#A4F588",
                                    color:
                                      ele.chart_status === "DRFT"
                                        ? "#FFFFFF"
                                        : "#000000",
                                  }}
                                >
                                  <p>{ele.chart_status}</p>
                                </div>
                                <div className="chart-info">
                                  <p className="cid">{ele.chart_disp_id}</p>
                                  <p className="chartName">{ele.chart_name}</p>
                                </div>
                              </div>
                            </Col>
                          </Link>
                        );
                      })}
                  </Row>
                </Col>
                <Col span={6} />
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;
