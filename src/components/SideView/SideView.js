import React from "react";
import { Row, Col, Switch, Tooltip, Table, Popover, DatePicker, Input } from "antd";
import { FilterOutlined } from '@ant-design/icons';
import SelectField from '../SelectField/SelectField';

const { Search } = Input
const { RangePicker } = DatePicker

const SideView = () => {
  const columns = [
    {
      title: "Status",
      key: "param",
      dataIndex: "param",
      //   render: (text, record, index) => (
      //     <>
      //       {record.coverage_metric_percent === "100.0%" ||
      //       record.coverage_metric_percent === "100%" ? (
      //         <span>
      //           <img src={StatusCorrect} />
      //         </span>
      //       ) : (
      //         <span>
      //           <img src={StatusWrong} />
      //         </span>
      //       )}
      //     </>
      //   ),
    },
    {
      title: "Derived parameter",
      key: "function_name",
      dataIndex: "function_name",
      //   render: (function_name) => (
      //     <Tooltip title={function_name}>
      //       <Tag color="geekblue" className="parameter-tag">
      //         {function_name}
      //       </Tag>
      //     </Tooltip>
      //   ),
    },
    {
      title: "Batch Coverage",
      key: "coverage_metric" + "coverage_metric_percent",
      dataIndex: "coverage_metric_percent",
      align: "right",
      //   render: (text, record) => (
      //     <span>
      //       {record.batchstats}({record.coverage_metric_percent})
      //     </span>
      //   ),
    },
  ];
  return (
    <div className="view-container">
      <Row>
        <Col span={24} className="search-table">
          <p>View ID</p>
          <Search placeholder="Search" />
        </Col>
      </Row>
      <Row className="view-details">
        <Col span={19}>
          <Row gutter={16}>
            <Col span={8}>
              <label>View name</label>
            </Col>
            <Col span={14}>
              <p>:</p>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <p>Status</p>
            </Col>
            <Col span={8}>
              <p>:</p>
            </Col>
          </Row>
        </Col>
 
        <Col span={5} className="pb">
          <p>Version</p>
          <SelectField />
        </Col>
      </Row>
      <>
        <Row gutter={16} className="filter">
          <Col span={11}>
            <SelectField placeholder="Site" allowClear />
          </Col>
          <Col span={13} className="unapproved">
            <label>Show unapproved data</label>&emsp;&nbsp;
            <Switch type="primary" size="small" />
          </Col>
        </Row>
        <Row gutter={16} className="filter">
          <Col span={22}>
            <RangePicker />
          </Col>
          <Col
            span={1}
            //   className={
            //     batchFilters.time || batchFilters.duration
            //       ? "date date-active"
            //       : "date"
            //   }
          >
            <Popover
              overlayClassName="cppopup-over"
              placement="bottomLeft"
              title="Search quick time range"
              trigger="click"
            >
              <Tooltip title="Advanced Filters">
                <FilterOutlined />
              </Tooltip>
            </Popover>
          </Col>
        </Row>
        <Row className="table-cont">
          <Col span={24}>
            <Table pagination={false} columns={columns} />
          </Col>
        </Row>
      </>
    </div>
  );
};

export default SideView;
