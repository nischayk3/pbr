import React, { useEffect, useRef, useState, useCallback } from "react";
import "./preprocess.scss";
import { Row, Col, Button, Table, Select, Skeleton, Progress } from "antd";
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
import ModalComponent from "../../../../../../components/Modal/Modal";

const Preprocess = ({ setModelData, setTableKey, editFinalJson }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [preprocessData, setPreprocessData] = useState([]);
  const [selectedValues, setSelectedValues] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [progressBarPercentage, setProgressbarPercentage] = useState(10)
  const progress = useRef(10);
  const [showProgressBar, setShowProgressBar] = useState(false)
  const tempFilterKeys = useRef();
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
      data_filter:  editFinalJson?.input_data?.data_filter ? editFinalJson?.input_data?.data_filter : location?.state?.data[0]?.data_filter,
      view_disp_id: editFinalJson?.view_disp_id ? editFinalJson?.view_disp_id : location?.state?.view_id,
      view_version: editFinalJson?.view_version ? editFinalJson?.view_version : location?.state?.view_version,
    };
    request.data_filter.site = request?.data_filter?.site
      ? request?.data_filter?.site
      : "";
    dispatch(showLoader());
    const apiResponse = await getPreprocessing(request);
    if (apiResponse.Status === 200) {
      apiResponse?.compressed_output.forEach((ele) => {
        ele.key = ele.batch_num;
      });
      setPreprocessData(apiResponse?.compressed_output);
      if (filterData && filterData.length === 0) {
        setFilterData(apiResponse?.all_batches);
      }
      dispatch(hideLoader());
    } else {
       /* istanbul ignore next */
      dispatch(hideLoader());
       /* istanbul ignore next */
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


  const counterValid = progressBarPercentage < 90;
  useEffect(() => {
    if (showProgressBar) {
      const intervalId = counterValid && setInterval(() => 
      setProgressbarPercentage((t) => t + 10)
      , 2000);
      return () => clearInterval(intervalId)
    }
  }, [counterValid, showProgressBar]);

 
  const onSaveClick = async (edit) => {
    const is_same = (tempFilterKeys?.current?.length === selectedRowKeys?.length) && tempFilterKeys?.current?.every(function(element, index) {
      return element === selectedRowKeys[index]; 
    });

    if (is_same) {
      setTableKey("2");
    } else {
      setShowProgressBar(true);
    // dispatch(showLoader());
    const req = {
      analysis_preprocessing: {
        batch_filter: selectedRowKeys,
        data_filter:  selectedViewData?.data_filter,
        view_disp_id: selectedViewData?.view_id,
        view_version: selectedViewData?.view_version,
      },
    };
    const newViewData = JSON.parse(JSON.stringify(selectedViewData));
    newViewData.batch_filter = selectedRowKeys ? selectedRowKeys : [];
    tempFilterKeys.current = JSON.parse(JSON.stringify(selectedRowKeys))
    const apiResponse = await savePreprocessing(req);
    const data = await apiResponse;
    if (apiResponse.Status === 200) {
      dispatch(getAnalyticsViewData(newViewData));
      setModelData(data.html_string);
      setShowProgressBar(false);
      setProgressbarPercentage(10)
      if (edit) {
        setTableKey("2");
      }
    } else {
       /* istanbul ignore next */
      setShowProgressBar(false);
       /* istanbul ignore next */
      setProgressbarPercentage(10)
       /* istanbul ignore next */
      dispatch(showNotification("error", "Unable to save preprocessing data"));
      }
    }
  };

  

  useEffect(() => {
    if (editFinalJson?.input_data?.batch_filter) {
      let tempFilter = [...selectedRowKeys]
      tempFilter = tempFilter.concat(editFinalJson?.input_data?.batch_filter)
      tempFilterKeys.current = JSON.parse(JSON.stringify(tempFilter))
      setSelectedRowKeys(tempFilter)
    }
    getPreprocessingData();
  }, [editFinalJson]);


  return (
    <div className="preprocess-container">
      {showProgressBar && <ModalComponent isModalVisible={showProgressBar} closable={false} centered={true} >
        <p>Processing Data. Please wait ...</p>
        <Progress percent={progressBarPercentage} />
      </ModalComponent>}
     {preprocessData && preprocessData.length ? <><Row className="col-bottom save-button">
        <Col>
          <Button
            className="custom-primary-btn"
            disabled={selectedRowKeys.length === 0}
            onClick={() => onSaveClick(true)}
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
      </Row></> : <Skeleton style={{ marginTop: '50px'}} active paragraph={{
      rows: 15,
    }} />}
    </div>
  );
};

export default Preprocess;
