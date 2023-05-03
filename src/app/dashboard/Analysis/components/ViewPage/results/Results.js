/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 28 April, 2023
 * @Last Changed By - @Mihir
 */

import { Collapse, Row, Col, Table, Select } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./results.scss";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRightOutlined, TrophyTwoTone } from '@ant-design/icons';
import { MDH_AIRFLOW_ANALYTICS } from "../../../../../../constants/apiBaseUrl";
import Plot from "react-plotly.js";

const { Panel } = Collapse;

const Results = ({ tablekey, resultsData, jobId, metricList, resultStatus, setResultsData, message }) => {
  const selectedViewData = useSelector(
    (state) => state.analyticsReducer.viewData
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedMetric, setSelectedMetric] = useState('');

  const onChangeMetric = (value) => {
    setSelectedMetric(value)
    let result_data = [...resultsData]
    let find_index = result_data.findIndex((i) => i.name == metricList[value])
    if (find_index >= 0) {
      let deleted_obj = result_data[find_index]
      result_data.splice(find_index, 1)
      result_data.unshift(deleted_obj)
      setResultsData(result_data)
    }
  }
  const getColumns = (score_array) => {
    let columns = []
    const objkeys = score_array
      ? Object.keys(score_array)
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
    return columns
  }

  const lists = Object.keys(metricList).map((i, idx) => { return { value: i, labele: i, key: idx } })
  return (
    <div className="result_container">
      {resultsData && resultsData.length > 1 && <> <Row style={{ display: 'inline-block' }}>
        Metric: <Select placeholder="Select Metric" style={{ borderRadius: '50%', width: '200px' }} options={lists} onChange={onChangeMetric} />
      </Row><br /><br /></>}
      {(resultStatus !== 'Failed') && resultsData.length && (
        <Collapse expandIconPosition="right" accordion>
          {resultsData && resultsData.length > 0 && resultsData.map((i) => (
            <Panel header={<span style={{ display: 'inline' }}><>{i.name} &nbsp;&nbsp;&nbsp;&nbsp;</>{resultsData.length > 1 ? i.name == metricList[selectedMetric] && <TrophyTwoTone twoToneColor="orange" style={{ fontSize: '20px' }} /> : resultsData.length == 1 ? <TrophyTwoTone twoToneColor="orange" style={{ fontSize: '20px' }} /> : <></>} </span>}>
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
                      columns={getColumns(i.score[0])}
                      dataSource={i.score}
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
                        {i?.charts?.length}
                      </label>
                    </div>
                  }
                  key="2"
                >
                  <div style={{ maxHeight: '65vh', overflow: 'auto' }}>
                    {i?.charts?.map((ele) => {
                      return <Plot data={ele[0].data} layout={ele[0].layout} />;
                    })}
                  </div>
                </Panel>

              </Collapse>

            </Panel>))}
        </Collapse>)}
      {(resultStatus === 'Failed') && (
        <div>
          <h3>Model Execution Failed</h3>
          <p>Failure Reason : {message || '-'}</p>
          <a className="view-link" href={`${MDH_AIRFLOW_ANALYTICS}/${id}_ANALYTICS_${jobId?.current}/grid?`} target="_blank">View logs</a> <span className='alert-arrow'><ArrowRightOutlined /></span>
        </div>
      )}
    </div>
  );
};
export default Results;
