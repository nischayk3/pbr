import React, { useState, useEffect, useRef } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./styles.scss";
import { Row, Col, Button, Switch, DatePicker, Table, Tag, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import StatusWrong from "../../../../../../../assets/statusWrong.svg";
import StatusCorrect from "../../../../../../../assets/statusCorrect.svg";
import { putPipelineObj } from "../../../../../../../services/analyticsService";
import { getSiteId } from "../../../../../../../services/chartPersonalizationService";
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../../../../../../duck/actions/commonActions";
import { getAnalyticsViewData } from "../../../../../../../duck/actions/analyticsView";
const { RangePicker } = DatePicker;
import moment from "moment";

const columns = [
  {
    title: "Status",
    key: "param",
    dataIndex: "param",
    render: (text, record, index) => (
      <>
        {record.coverage_metric_percent === "100.0%" ||
        record.coverage_metric_percent === "100%" ? (
          <span>
            <img src={StatusCorrect} />
          </span>
        ) : (
          <span>
            <img src={StatusWrong} />
          </span>
        )}
      </>
    ),
  },
  {
    title: "Parameter",
    key: "function_name",
    dataIndex: "function_name",
    render: (function_name) => (
      <Tag color="geekblue" className="parameter-tag">
        {function_name}
      </Tag>
    ),
  },
  {
    title: "Batch Coverage",
    key: "coverage_metric" + "coverage_metric_percent",
    dataIndex: "coverage_metric_percent",
    render: (text, record) => (
      <span>
        {record.batchstats}({record.coverage_metric_percent})
      </span>
    ),
  },
];

const BatchesComponent = (props) => {
  const { setShowBatchData, viewData, parameterData, onNextClick } = props;
  const [siteList, setSiteList] = useState([]);
  const [batchFilters, setBatchFilters] = useState({
    date_range: "",
    unapproved_data: 1,
    site: null,
  });
  const filterRef = useRef({
    date_range: "",
    unapproved_data: 1,
    site: null,
  });
  const dateFormat = "YYYY-MM-DD";
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const history = useHistory();
  const savePipeline = async () => {
    const viewDetails = {
      pipeline_name: viewData.pipeLineName,
      savetype: "saveas",
      view_id: viewData.viewDispId,
      view_version: viewData.viewVersion,
      view_name: viewData.viewName,
      view_status: viewData.status
    };
    const req = {
      data: [
        {
          data_filter: filterRef.current,
          datasplit: [],
          variable_mapping: [],
          transformation_mapping: [],
          save_transformation: [],
          estimator: [],
          save_model: [],
        },
      ],
      ...viewDetails,
      data_filter: filterRef.current,
      target_variable: '',
      batch_filter : []
    };
    viewDetails.data_filter = filterRef.current;
    dispatch(showLoader());
    const apiResponse = await putPipelineObj(req);
    if (apiResponse?.pipeline_disp_id) {
      dispatch(hideLoader());
      history.push({
        pathname: `${match.url}/${apiResponse?.pipeline_disp_id}`,
        state: req,
      });
      viewDetails.pipeline_id = apiResponse?.pipeline_disp_id;
      dispatch(getAnalyticsViewData(viewDetails));
    } else {
      /* istanbul ignore next */
      dispatch(hideLoader());
      dispatch(showNotification("error", "unable to save pipeline"));
    }
  };

  const handledatechange = (e) => {
    if (e) {
      setBatchFilters({
        ...batchFilters,
        startDate: e[0].format("YYYY-MM-DD"),
        endDate: e[1].format("YYYY-MM-DD"),
      });
    } else {
      setBatchFilters({
        ...batchFilters,
        startDate: null,
        endDate: null,
      });
    }
  };
  const onFilterChange = () => {
    const dateRange = batchFilters.startDate
      ? new Date(batchFilters.startDate).toISOString() +
        "/" +
        new Date(batchFilters.endDate).toISOString()
      : "";
    filterRef.current = {
      site: batchFilters.site ? batchFilters.site : "",
      unapproved_data: batchFilters.unapproved_data,
      date_range: dateRange,
    };
    onNextClick(filterRef.current);
  };

  //function for getting site-ids
  const getSites = async (id) => {
    const obj = { view_id: viewData.viewDispId };
    try {
      const siteRes = await getSiteId(obj);
      setSiteList(siteRes.Data);
    } catch (error) {
      /* istanbul ignore next */
      dispatch(showNotification("error", "Unable to fetch sites"));
    }
  };

  useEffect(() => {
    getSites();
  }, []);

  return (
    <div className="batch-container">
      <Row gutter={24} className="filter-data">
        <Col span={5}>
          <div>
            <Select
              placeholder="Site"
              value={batchFilters.site}
              onChange={(e) => setBatchFilters({ ...batchFilters, site: e })}
              style={{ width: "100%", margin: "0px" }}
              allowClear
            >
              {siteList &&
                siteList.map((ele, index) => {
                  return (
                    <Select.Option key={index} value={Object.values(ele)[0]}>
                      {Object.keys(ele)[0]}
                    </Select.Option>
                  );
                })}
            </Select>
          </div>
        </Col>
        <Col span={6} className="approved-data">
          <div>
            show approved data &nbsp;{" "}
            <Switch
              size="small"
              checked={batchFilters.unapproved_data === 1}
              onChange={(e) =>
                setBatchFilters({
                  ...batchFilters,
                  unapproved_data: e === true ? 1 : 0,
                })
              }
            />
          </div>
        </Col>
        <Col span={10}>
          <div className="date-icons">
            <RangePicker
              value={
                batchFilters.startDate
                  ? [
                      moment(batchFilters.startDate, dateFormat),
                      moment(batchFilters.endDate, dateFormat),
                    ]
                  : ""
              }
              format={dateFormat}
              onChange={(dateString) => handledatechange(dateString)}
            />{" "}
            <FilterOutlined />
          </div>
        </Col>
        <Col span={3}>
          <Button className="custom-primary-btn" onClick={onFilterChange}>
            Apply
          </Button>
        </Col>
      </Row>
      <Row
        style={{ maxHeight: "300px", overflow: "auto", marginBottom: "40px" }}
      >
        <Col span={24} className="table-data">
          <Table
            pagination={false}
            columns={columns}
            dataSource={parameterData}
            rowKey={(record) => record.function_name}
          />
        </Col>
      </Row>
      <Row className="buttons">
        <div className="button-gap">
          <Button
            className="custom-primary-btn"
            onClick={() => setShowBatchData(false)}
          >
            Back
          </Button>
          <Button
            className="custom-secondary-btn"
            disabled={!parameterData.length}
            onClick={savePipeline}
          >
            Let's go
          </Button>
        </div>
      </Row>
    </div>
  );
};

export default BatchesComponent;
