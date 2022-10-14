import React, { useEffect, useState } from "react";
import "./preprocess.scss";
import { Row, Col, Button, Table, Select } from "antd";
import {
  getPreprocessing,
  savePreprocessing,
} from "../../../../../../services/analyticsService";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  hideLoader,
  showLoader,
  showNotification,
} from "../../../../../../duck/actions/commonActions";
import { useSelector } from "react-redux";
import { getAnalyticsViewData } from "../../../../../../duck/actions/analyticsView";

const Preprocess = ({ setModelData, setTableKey }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [preprocessData, setPreprocessData] = useState([]);
  const [selectedValues, setSelectedValues] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const selectedViewData = useSelector(
    (state) => state.analyticsReducer.viewData
  );
  let columns = [];

  const first = "batch_num";
  let objkeys = (
    preprocessData !== undefined && preprocessData.length > 0
      ? Object.keys(preprocessData[0])
      : []
  ).sort(function (x, y) {
    return x == first ? -1 : y == first ? 1 : 0;
  });

  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const filterColumn = objkeys.filter(uniqueArr);
  filterColumn.forEach((item, i) => {
    columns.push({
      title: item.toUpperCase().replace("_", " "),
      dataIndex: item,
      key: `${item}-${i}`,
      render: (text) => String(text),
    });
  });
  columns = columns.filter((ele) => ele.title !== "KEY");
  const getPreprocessingData = async (filter) => {
    const request = {
      batch_filter: filter ? filter : [],
      data_filter: location?.state?.data[0]?.data_filter,
      view_disp_id: location?.state?.view_id,
      view_version: location?.state?.view_version,
    };
    request.data_filter.site = request.data_filter.site
      ? request.data_filter.site
      : "";
    dispatch(showLoader());
    const apiResponse = await getPreprocessing(request);
    if (apiResponse.Status === 200) {
      dispatch(hideLoader());
      apiResponse?.compressed_output.forEach((ele) => {
        ele.key = ele.batch_num;
      });
      setPreprocessData(apiResponse?.compressed_output);
      if (filterData && filterData.length === 0) {
        setFilterData(apiResponse?.all_batches);
      }
    } else {
      dispatch(hideLoader());
      dispatch(showNotification("error", "Unable to fetch preprocessing data"));
    }
  };
  const handleChange = (value) => {
    setSelectedValues(value);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            return index % 2 !== 0 ? false : true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            return index % 2 !== 0 ? true : false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const onSaveClick = async () => {
    dispatch(showLoader());
    const req = {
      analysis_preprocessing: {
        batch_filter: selectedRowKeys,
        data_filter: location?.state?.data[0]?.data_filter,
        view_disp_id: location?.state?.view_id,
        view_version: location?.state?.view_version,
      },
    };
    const newViewData = JSON.parse(JSON.stringify(selectedViewData));
    newViewData.batch_filter = selectedRowKeys ? selectedRowKeys : [];
    const apiResponse = await savePreprocessing(req);
    const data = await apiResponse;
    if (apiResponse.Status === 200) {
      dispatch(hideLoader());
      dispatch(getAnalyticsViewData(newViewData));
      setModelData(data.html_string);
      setTableKey("2");
    } else {
      dispatch(hideLoader());
      dispatch(showNotification("error", "Unable to fetch preprocessing data"));
    }
  };

  useEffect(() => {
    getPreprocessingData();
  }, []);

  return (
    <div className="preprocess-container">
      <Row className="col-bottom save-button">
        <Col>
          <Button
            className="custom-primary-btn"
            disabled={selectedRowKeys.length === 0}
            onClick={onSaveClick}
          >
            Save
          </Button>
        </Col>
      </Row>
      <Row className="col-bottom">
        <Col span={6} className="filter">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            onChange={handleChange}
            placeholder="Filter by batch"
          >
            {filterData &&
              filterData.map((ele) => {
                return <Option key={ele}>{ele}</Option>;
              })}
          </Select>
          <Button
            className="custom-primary-btn"
            onClick={() => getPreprocessingData(selectedValues)}
          >
            Go
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={preprocessData}
            pagination={{ pageSize: 8 }}
            rowKey={(record) => record.key}
            rowSelection={rowSelection}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Preprocess;
