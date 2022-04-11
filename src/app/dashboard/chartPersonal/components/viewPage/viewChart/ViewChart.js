import React, { useEffect, useRef, useState } from "react";
import "./viewChartStyles.scss";
//antd imports
import {
  Row,
  Col,
  Input,
  Select,
  Divider,
  Switch,
  Tag,
  Tooltip,
  Table,
  Button,
  message,
  DatePicker,
} from "antd";
import { ArrowRightOutlined, FilterOutlined } from "@ant-design/icons";
//components
import InputField from "../../../../../../components/InputField/InputField";
import SelectField from "../../../../../../components/SelectField/SelectField";
import ViewSearchTable from "./viewSearchTable";
import Modal from "../../../../../../components/Modal/Modal";
import StatusWrong from "../../../../../../assets/statusWrong.svg";
import StatusCorrect from "../../../../../../assets/statusCorrect.svg";
//redux
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../../../../../duck/actions/commonActions";
//services
import { getViewTable } from "../../../../../../services/commonService";
import {
  postChartPlotData,
  getSiteId,
} from "../../../../../../services/chartPersonalizationService";
//cjson
import chartJson from "../chartObj.json";

//unpacking antd components
const { Search } = Input;
const { Option } = Select;

const ViewChart = ({ postChartData, setPostChartData }) => {
  //redux variables
  const dispatch = useDispatch();
  //state variables
  const [viewSearch, setViewSearch] = useState(false);
  const [searchTableData, setSearchTableData] = useState([]);
  const [coverageTableData, setCoverageTableData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [versionList, setVersionList] = useState([0]);
  const [siteList, setSiteList] = useState([]);
  const searchViewData = useRef([]);
  const postChart = useRef();
  const postChartView = useRef({});
  const ref = useRef(null);
  const [viewData, setViewData] = useState({
    viewName: "",
    status: "",
    viewDispId: " ",
    searchValue: "",
    chartVersion: 0,
  });

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
        <Tooltip title={function_name}>
          <Tag color="geekblue" className="parameter-tag">
            {function_name}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Batch Coverage",
      key: "coverage_metric" + "coverage_metric_percent",
      dataIndex: "coverage_metric_percent",
      align: "right",
      render: (text, record) => (
        <span>
          {record.batchstats}({record.coverage_metric_percent})
        </span>
      ),
    },
  ];

  //function for getting viewdata list
  const getViewTableData = async () => {
    let reqView = { vew_status: "APRD" };
    let antdDataTable = [];

    try {
      dispatch(showLoader());
      const viewRes = await getViewTable(reqView);
      viewRes.Data.forEach((item, key) => {
        let antdObj = {};
        antdObj["key"] = key;
        antdObj["created_by"] = item.created_by;
        antdObj["created_on"] = item.created_on;
        antdObj["product_num"] = item.product_num;
        antdObj["view_disp_id"] = item.view_disp_id;
        antdObj["view_info"] = item.view_info;
        antdObj["view_name"] = item.view_name;
        antdObj["view_status"] = item.view_status;
        antdObj["view_version"] = item.view_version;
        antdObj["view"] = item.view;
        antdDataTable.push(antdObj);
      });
      searchViewData.current = JSON.parse(JSON.stringify(antdDataTable));
      setSearchTableData(antdDataTable);
      // setviewTableData(antdDataTable);

      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification("error", error.message));
    }
  };

  //function to handle search
  const searchTable = (value) => {
    const filterData = searchViewData.current.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(viewData.searchValue.toLowerCase())
      )
    );
    setSearchTableData(filterData);
  };

  const setData = async () => {
    try {
      dispatch(showLoader());
      const viewRes = await postChartPlotData(postChartData);
      getSites(viewRes.data[0].view_id);
      setPostChartData({
        ...postChartData,
        extras: viewRes.extras,
        view_status: viewRes.view_status,
      });
      // setCoverageTableData(viewRes.extras.coverage)
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      message.error("Unable to fetch coverages");
    }
  };

  //on search value changes
  const onSearchChange = (e) => {
    if (e.target.value === "") {
      setSearchTableData(searchViewData.current);
    }
    setViewData({ ...viewData, searchValue: e.target.value });
  };

  //on focus of input field showing table results.
  const onFocus = () => {
    setViewSearch(true);
  };

  //function for closing view table result on click of outside.
  const closeTableView = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setViewSearch(false);
      setSearchTableData(searchViewData.current);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeTableView);
  }, []);

  //function for handle version change
  const handleVersionChange = (e) => {
    setViewData({ ...viewData, chartVersion: e });
    if (e !== viewData.chartVersion) {
      const newArr = [...postChartData.data];
      newArr.forEach((item) => {
        item.view_version = e;
      });
      setPostChartData({ ...postChartData, data: newArr });
      setData();
    }
  };
  //function for getting site-ids
  const getSites = async (id) => {
    const obj = { view_id: id };
    try {
      const siteRes = await getSiteId(obj);
      setSiteList(siteRes.Data[0]);
    } catch (error) {
      message.error("Unable to fetch sites");
    }
  };

  const onAdvanceClick = () => {
    setIsModalVisible(!isModalVisible);
  };
  //useEffect for calling view list.
  useEffect(() => {
    getViewTableData();
  }, []);

  useEffect(() => {
    console.log(postChartData, "data");
    postChartData &&
      postChartData.data &&
      postChartData.data.forEach((ele) => {
        console.log(ele, "ele");
        setViewData({
          ...viewData,
          viewName: ele.view_name,
          viewDispId: ele.view_id,
          status: postChartData.view_status,
          searchValue: ele.view_id,
          chartVersion: ele.view_version,
        });
      });
    setCoverageTableData(postChartData.extras && postChartData.extras.coverage);
  }, [postChartData]);

  return (
    <div className="view-container">
      <Row>
        <Col ref={ref} span={24} className="search-table">
          <label>View ID</label>
          <Search
            placeholder="Search"
            onFocus={onFocus}
            value={viewData.searchValue}
            onChange={onSearchChange}
            onSearch={searchTable}
          />
          {viewSearch && (
            <ViewSearchTable
              getSites={getSites}
              postChartView={postChartView}
              setVersionList={setVersionList}
              searchViewData={searchViewData}
              postChartData={postChartData}
              setPostChartData={setPostChartData}
              setData={setData}
              setViewSearch={setViewSearch}
              searchTableData={searchTableData}
              viewData={viewData}
              setViewData={setViewData}
            />
          )}
        </Col>
      </Row>
      <Row className="view-details">
        <Col span={19}>
          <Row gutter={16}>
            <Col span={8}>
              <p>View Name</p>
            </Col>
            <Col span={14}>
              <p>: {viewData.viewName}</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <p>Status</p>
            </Col>
            <Col span={8}>
              <p>: {viewData.status}</p>
            </Col>
          </Row>
        </Col>
        {/* <Col span={3} /> */}
        <Col span={5} className="pb">
          <p>Version</p>
          <SelectField
            placeholder="Select Chart type"
            selectList={versionList}
            selectedValue={viewData.chartVersion}
            onChangeSelect={handleVersionChange}
          />
        </Col>
      </Row>
      <Row className="batch">
        <Col span={24} className="pb">
          <p>Batch Coverage</p>
          <Divider />
        </Col>
      </Row>
      <Row gutter={16} className="filter">
        <Col span={11}>
          <SelectField
            placeholder="Site"
            // onChangeSelect={(e) => handleSelectChange(e)}
            selectList={siteList}
            // selectedValue={selectedSite}
          />
        </Col>
        <Col span={13} className="unapproved">
          <label>Show Unapproved data</label>&emsp;&nbsp;
          <Switch type="primary" size="small" />
        </Col>
      </Row>
      <Row gutter={16} className="filter">
        <Col span={11}>
          <DatePicker placeholder="From Date" />
        </Col>
        <Col span={11}>
          <DatePicker placeholder="To Date" />
        </Col>
        <Col span={1} className="date">
          <Tooltip title="Advanced Filters">
            <FilterOutlined onClick={onAdvanceClick} />
          </Tooltip>
        </Col>
      </Row>
      <Row gutter={24} className="filter">
        <Col span={12} />
        <Col className="arrow-right" span={12}>
          <Button>Apply</Button>
          <ArrowRightOutlined />
        </Col>
      </Row>
      <Row className="table-cont">
        <Col span={24}>
          <Table
            pagination={false}
            columns={columns}
            dataSource={coverageTableData}
            rowKey={(record) => record.function_name}
          />
        </Col>
      </Row>
      <Modal isModalVisible={isModalVisible}>Modal</Modal>
    </div>
  );
};

export default ViewChart;
