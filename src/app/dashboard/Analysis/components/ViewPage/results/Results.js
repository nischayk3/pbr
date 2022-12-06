import { Collapse, Row, Col, Table } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import "./results.scss";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRightOutlined } from '@ant-design/icons';
import { MDH_AIRFLOW_ANALYTICS } from "../../../../../../constants/apiBaseUrl";
import Plot from "react-plotly.js";
const { Panel } = Collapse;

const Results = ({tablekey, resultsData, jobId}) => {
  const selectedViewData = useSelector(
    (state) => state.analyticsReducer.viewData
  );
  const { id } = useParams();
  const dispatch = useDispatch();


  let columns = [];
  const objkeys = (resultsData?.metric_vals !== undefined && resultsData?.metric_vals?.length > 0)
      ? Object.keys(resultsData?.metric_vals[0])
      : [];
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

  

  return (
    <div className="result_container">
      {(resultsData?.run_status !== 'Failed') && resultsData?.chart && resultsData?.chart.length && (
        <Collapse expandIconPosition="right" accordion>
          <Panel
            header={
              <div>
                Scores
              </div>
            }
            key="1"
          >
            <div style={{ maxHeight: '65vh', overflow: 'auto' }}>
              <Table
                columns={columns}
                dataSource={resultsData?.metric_vals}
              />
            </div>
          </Panel>
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
            key="2"
          >
            <div style={{ maxHeight:'65vh', overflow:'auto'}}>
              {resultsData?.chart?.map((ele) => {
                return <Plot data={ele.data} layout={ele.layout} />;
              })}
            </div>
          </Panel>
        </Collapse>
      )}
      {(resultsData?.run_status === 'Failed') && (
        <div>
          <h3>Model Execution Failed</h3>
          <p>Failure Reason : {resultsData?.res_message || '-'}</p>
          <a className="view-link" href={`${MDH_AIRFLOW_ANALYTICS}/${id}_ANALYTICS_${jobId?.current}/grid?`} target="_blank">View logs</a> <span className='alert-arrow'><ArrowRightOutlined /></span>
          </div>
      )}
    </div>
  );
};
export default Results;
