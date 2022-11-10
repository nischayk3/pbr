import { Collapse, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const Results = ({tablekey, modelType}) => {
  const selectedViewData = useSelector(
    (state) => state.analyticsReducer.viewData
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const [resultsData, setResultsData] = useState();

  const getResultFunc = async () => {
    const reqBody = {
      pipelineid: id,
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
    if (tablekey === '5') {
      getResultFunc();
    }
  }, [tablekey]);

  return (
    <div className="result_container">
      <Row gutter={16}>
        <Col span={2}>
          <p>Val Score</p>
        </Col>
        <Col span={10}>
          <p>: {resultsData?.test_score?.toFixed(2) || "-"}</p>
        </Col>
        <Col span={6} />
      </Row>
      <Row gutter={16}>
        <Col span={2}>
          <p>Train Score</p>
        </Col>
        <Col span={10}>
          <p>: {resultsData?.train_score?.toFixed(2) || "-"}</p>
        </Col>
        <Col span={6} />
      </Row>
      {resultsData?.chart && resultsData?.chart.length && (
        <Collapse expandIconPosition="right" accordion>
          <Panel
            header={
              <div>
                Charts
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
