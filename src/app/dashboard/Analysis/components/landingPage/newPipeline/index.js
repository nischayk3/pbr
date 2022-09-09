import React, { useEffect, useState, useRef } from "react";
import "./styles.scss";
//antd imports
import { Input, Modal, Row, Col, Button } from "antd";
const { Search } = Input;
//svgs
import AnalysisNewPipeline from "../../../../../../assets/images/AnalysisNewPipeline.svg";
//components
import InputField from "../../../../../../components/InputField/InputField";
import SelectField from "../../../../../../components/SelectField/SelectField";
//services
import { getViewList } from "../../../../../../services/analyticsService";
import { postChartPlotData } from "../../../../../../services/chartPersonalizationService";
//redux
import { useDispatch } from "react-redux";
import {
  hideLoader,
  showLoader,
  showNotification,
} from "../../../../../../duck/actions/commonActions";
// import ViewSearchTable from "./viewTable/ViewTable";
import ViewTable from "../../../../chartPersonal/components/viewPage/viewChart/ViewTable";
import ViewSearchTable from "../../../../chartPersonal/components/viewPage/viewChart/viewSearchTable";
import ViewJson from "./view.json";
import BatchesComponent from "./batchesPage";

const NewPipeline = (props) => {
  const { newPipeline, onCancel } = props;
  const [searchTableData, setSearchTableData] = useState([]);
  const [showViewTable, setShowViewTable] = useState(false);
  const [versionList, setVersionList] = useState([0]);
  const [parameterData, setParameterData] = useState([]);
  const deepSearch1 = useRef(false);
  const searchViewData = useRef([]);
  const [showBatchData, setShowBatchData] = useState(false);
  const [viewData, setViewData] = useState({
    viewName: "",
    viewDispId: " ",
    viewVersion: 0,
    searchValue: "",
    pipeLineName: "",
  });
  const [deepSearch, setDeepSearch] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);

  //function for getting viewdata list
  const getViewTableData = async () => {
    let reqView = { vew_status: "APRD" };
    let antdDataTable = [];

    try {
      dispatch(showLoader());
      const viewRes = await getViewList(reqView);
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

      dispatch(hideLoader());
    } catch (error) {
      /* istanbul ignore next */
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

  //on focus of input field showing table results.
  const onFocus = () => {
    setShowViewTable(true);
  };
  //on blur out of input field showing table results.
  const onBlurOut = () => {
    setShowViewTable(false);
  };

  //on search value changes
  const onSearchChange = (e) => {
    if (e.target.value === "") {
      setSearchTableData(searchViewData.current);
    }
    setViewData({ ...viewData, searchValue: e.target.value });
  };

  //function for closing view table result on click of outside.
  const closeTableView = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onBlurOut();
      setSearchTableData(searchViewData.current);
    }
  };
  //onclick of next button
  const onNextClick = async (batchFilters) => {
    const reqBody = {
      data: [
        {
          view_id: viewData.viewDispId,
          view_name: viewData.viewName,
          view_version: viewData.viewVersion,
          chart_type: "scatter",
          data_filter: batchFilters
            ? batchFilters
            : {
                date_range: "",
                unapproved_data: 0,
                site: "",
              },
          data: [
            {
              type: "scatter",
              mode: "markers",
              marker: {
                color: "#376dd4",
                size: 15,
              },
            },
          ],
        },
      ],
    };
    const apiResponse = await postChartPlotData(reqBody);
    if (apiResponse && apiResponse.data && apiResponse.data[0]?.extras) {
      setParameterData(apiResponse?.data[0]?.extras?.coverage);
      if (showBatchData === false) {
        setShowBatchData(true);
      }
    } else if (apiResponse && apiResponse?.Message) {
      setParameterData([]);
      dispatch(showNotification("error", apiResponse?.Message));
    } else {
      dispatch(showNotification("error", "Unable to get parameter data"));
    }
  };

  const onSelectedView = (record) => {
    let tempVersionList = [0];
    searchViewData.current.forEach((ele) => {
      if (ele.view_disp_id === record.view_disp_id) {
        tempVersionList.push(ele.view_version);
        tempVersionList = tempVersionList.sort((a, b) => a - b);
        setVersionList(tempVersionList);
      }
    });
    setViewData({
      ...viewData,
      viewName: record.view_name,
      viewDispId: record.view_disp_id,
      status: record.view_status,
      searchValue: record.view_disp_id,
      viewVersion: record.view_version,
    });
    setDeepSearch(false);
    deepSearch1.current = false;
  };

  useEffect(() => {
    getViewTableData();
    document.addEventListener("mousedown", closeTableView);
  }, []);

  return (
    <Modal
      title="Create new pipeline - Name"
      centered
      visible={newPipeline}
      onCancel={onCancel}
      footer={false}
      width={787}
    >
      {!showBatchData ? (
        <Row gutter={24} className="newPipelineContainer">
          <Col span={12} className="img-container">
            <img src={AnalysisNewPipeline} alt="Analysis new pipeline image" />
          </Col>
          <Col span={12}>
            <Row className="input-mb">
              <Col span={24}>
                <InputField
                  label="Pipeline name"
                  placeholder="What would you like to call your pipeline?"
                  value={viewData.pipeLineName}
                  onChangeInput={(e) =>
                    setViewData({ ...viewData, pipeLineName: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="input-mb">
              <Col span={24} ref={ref} className="search-table">
                <p>View ID</p>
                <Search
                  className="viewSearch"
                  placeholder="Select a view ID"
                  onFocus={onFocus}
                  value={viewData.searchValue}
                  onChange={onSearchChange}
                  onSearch={searchTable}
                />
                {showViewTable && (
                  <ViewSearchTable
                    searchTableData={searchTableData}
                    setViewSearch={setShowViewTable}
                    setDeepSearch={setDeepSearch}
                    deepSearch={deepSearch1}
                    viewData={viewData}
                    setViewData={setViewData}
                    searchViewData={searchViewData}
                    setVersionList={setVersionList}
                  />
                )}
              </Col>
            </Row>
            {!showViewTable && (
              <Row gutter={24} className="view-details">
                <Col span={12}>
                  <Row>
                    <Col span={10}>
                      <label>View ID</label>
                    </Col>
                    <Col span={10} className="wordBreak">
                      <label>: {viewData.viewName || "-"}</label>
                    </Col>
                  </Row>
                </Col>
                <Col span={12} className="col-pr">
                  <Row>
                    <Col span={10}>
                      <label>Version</label>
                    </Col>
                    <Col span={12}>
                      <SelectField
                        selectList={versionList}
                        selectedValue={viewData.viewVersion}
                        onChangeSelect={(e) =>
                          setViewData({ ...viewData, viewVersion: e })
                        }
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            <Row className="button-mt">
              <Button
                className="custom-primary-btn"
                onClick={() => onNextClick("")}
                disabled={!viewData.pipeLineName || !viewData.viewVersion}
              >
                Next
              </Button>
            </Row>
          </Col>
        </Row>
      ) : (
        <BatchesComponent
          setShowBatchData={setShowBatchData}
          viewData={viewData}
          parameterData={parameterData}
          setParameterData={setParameterData}
          onNextClick={onNextClick}
        />
      )}
      <Modal
        visible={deepSearch}
        onCancel={() => setDeepSearch(false)}
        width={700}
        closable={false}
        footer={false}
        title={
          <div className="header-title">
            <h4>Views</h4>
            <Input.Search
              placeholder="Search by..."
              onSearch={searchTable}
              value={viewData.searchValue}
              onChange={onSearchChange}
            />
          </div>
        }
      >
        <ViewTable
          searchTableData={searchTableData}
          setDeepSearch={setDeepSearch}
          deepSearch1={deepSearch1}
          onSelectedView={onSelectedView}
        />
      </Modal>
    </Modal>
  );
};

export default NewPipeline;
