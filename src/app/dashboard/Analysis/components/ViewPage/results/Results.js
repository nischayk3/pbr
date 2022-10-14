import { Collapse, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import "./results.scss";
import { getResults } from "../../../../../../services/analyticsService";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoader,
  showLoader,
  showNotification,
} from "../../../../../../duck/actions/commonActions";
import Plot from "react-plotly.js";
const { Panel } = Collapse;

const Results = () => {
  const selectedViewData = useSelector(
    (state) => state.analyticsReducer.viewData
  );
  const dispatch = useDispatch();
  const [resultsData, setResultsData] = useState();

  const getResultFunc = async () => {
    const reqBody = {
      pipelineid: selectedViewData?.pipeline_id,
    };
    dispatch(showLoader());
    const apiResponse = await getResults(reqBody);
    if (apiResponse.statuscode === 200) {
      dispatch(hideLoader());
      setResultsData(apiResponse.data);
    } else {
      dispatch(hideLoader());
      showNotification("error", "Unable to get results");
    }
  };

  useEffect(() => {
    if (!resultsData) {
      getResultFunc();
    }
  }, [resultsData]);

  return (
    <div className="result_container">
      <Row gutter={16}>
        <Col span={2}>
          <p>Val Score</p>
        </Col>
        <Col span={10}>
          <p>: {resultsData?.test_score || "-"}</p>
        </Col>
        <Col span={6} />
      </Row>
      <Row gutter={16}>
        <Col span={2}>
          <p>Train Score</p>
        </Col>
        <Col span={10}>
          <p>: {resultsData?.train_score || "-"}</p>
        </Col>
        <Col span={6} />
      </Row>
      {resultsData?.chart && resultsData?.chart.length && (
        <Collapse expandIconPosition="right" accordion>
          <Panel
            header={
              <div>
                Metrics{" "}
                <label
                  style={{
                    marginLeft: "5px",
                    background: "#E4E4E4",
                    padding: "5px",
                    borderRadius: "50%",
                  }}
                >
                  {resultsData?.chart?.length}
                </label>
              </div>
            }
            key="1"
          >
            <div style={{ maxHeight:'65vh', overflow:'auto'}}>
              {resultsData?.chart?.map((ele) => {
                return <Plot data={ele.data} layout={ele.layout} />;
              })}
            </div>
          </Panel>
        </Collapse>
      )}
    </div>
  );
};
export default Results;
