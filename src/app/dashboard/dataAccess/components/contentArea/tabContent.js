import { Button, Row, Table, Col, Popover } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons"
import React, { useState } from "react";
import "./tabContent.scss";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { getGeanealogy } from "../../../../../services/genealogyService";

export default function TabContent() {
  const [withLevel, setWithLevel] = useState(
    JSON.stringify({
      batch_ids: ["1255|1322454|ABL2257-03"],
      material_nums: ["1322454"],
      sites: ["1255"],
      level: 5,
    })
  );
  const [withoutLevel, setWithoutLevel] = useState(
    JSON.stringify({
      batch_ids: ["1255|1322454|ABL2257-03"],
      material_nums: ["1322454"],
      sites: ["1255"],
    })
  );
  const [level, setLevel] = useState("");
  const [statusCode, setStatusCode] = useState(0);
  const [statusCodeLevel, setStatusCodeLevel] = useState(0);

  const [resultLevel, setResultLevel] = useState("");
  const [resultLevelWithLevel, setResultWithLevel] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("Overview");
  const content = (
    <div className="parent_div" id="Error Codes">
      <ul>
        <li className="content">
          Success : 200 when a successful .csv or pdf is generated with
          correct data
        </li>
        <li className="content">
          Unauthorised: 401 User does not have access to views or API
          execution
        </li>
        <li className="content">
          Permission denied: 403.User is not authorised to execute for
          certain molecule or plant{" "}
        </li>
        <li className="content">
          Bad request: 400 Input parameters are incorrect
        </li>
        <li className="content">
          Not found: 404: No data found for required filter
        </li>
        <li className="content">
          Internal Server Error: 500. Database is not reachable.
        </li>
      </ul>
    </div>
  );
  const dataSource = [
    {
      key: "1",
      query: "batch_ids",
      type: "text",
      desc: (
        <>
          <p>Comma separated array of batch ids </p>
          <p>["1255|1322454|ABL2257-03","1255|1322454|ABL2257-04"]</p>{" "}
        </>
      ),
    },
    {
      key: "1",
      query: "material_nums",
      type: "text",
      desc: (
        <>
          <p>Comma separated array of material numbers </p>
          <p>Material number : [“1322454”]</p>{" "}
        </>
      ),
    },
    {
      key: "1",
      query: "sites",
      type: "integer",
      desc: (
        <>
          <p>Comma separated array of sites</p>
          <p>sites : [“1255”]</p>{" "}
        </>
      ),
    },
    {
      key: "1",
      query: "material_nums",
      type: "text",
      desc: "Level of detail needed  example 5",
    },
  ];

  const columns = [
    {
      title: "Query Parameter",
      dataIndex: "query",
      key: "query",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
  ];

  const handleLevel = (e) => {
    setWithLevel(e.target.value);
    setLevel("with");
  };
  const handleWithoutleLevel = (e) => {
    setWithoutLevel(e.target.value);
    setLevel("without");
  };

  const getData = async (Level) => {
    let req = {};
    if (level == "with" || Level == "with") {
      let js = JSON.parse(withLevel);
      req = js;
    } else {
      let js = JSON.parse(withoutLevel);
      req = js;
    }
    let result = await getGeanealogy(req);
    if (result.Status > 200) {
      if (level == "with" || Level == "with")
        setStatusCode(result.Status);
      else
        setStatusCodeLevel(result.Status)
      if (level == "with" || Level == "with")
        setResultLevel(JSON.stringify(result));
      else
        setResultWithLevel(JSON.stringify(result));
    } else {
      if (level == "with" || Level == "with")
        setStatusCode(200);
      else
        setStatusCodeLevel(200);
      if (level == "with" || Level == "with")
        setResultLevel(result);
      else
        setResultWithLevel(result);

      const url = window.URL.createObjectURL(new Blob([result]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "download.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  const scrollToSection = (e) => {
    const id_ = e.target.innerText;
    setSelectedDiv(id_);
    var element = document.getElementById(id_);
    element.scrollIntoView();
    element.scrollIntoView(false);
    element.scrollIntoView({ block: "center" });
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  return (
    <div>
      <Row>
        <Col span={18}>
          <div>
            <div className="parent_div" id="Overview">
              <p className="overview">Overview</p>
              <p className="content">
                To facilitate management,  MI  supports a range of
                REST API endpoints across its objects. This section provides an
                overview of the API design, methods, and supported use cases.
              </p>
              <p className="content">
                Most of the endpoints accept JSON as input and return JSON
                responses. This means that you must usually add the following
                headers to your request:
              </p>
            </div>
            <div className="black-div" id="projects">
              <p className="black_text">
                <br />
                Content-type: &nbsp;&nbsp;&nbsp; application
                <span className="slash">/</span>json
                <br />
                Accept-type: &nbsp;&nbsp;&nbsp; application
                <span className="slash">/</span>json
              </p>
            </div>
            <div className="parent_div" id="Resources">
              <p className="overview">Resources</p>
              <p className="content">
                The term resource refers to a single type of object. An API is
                broken up by its endpoint's corresponding resource. The name of
                a resource is typically plural and expressed in small letters
                and ‘-‘.
              </p>
              <p className="content">
                Resource names are used as part of endpoint URLs, as well as in
                API parameters and responses.
              </p>
            </div>
            <div className="parent_div" id="Parameters">
              <p className="overview">Parameters</p>
              <p className="content"> Read : </p>
              <p className="content">
                The HTTP <span className="slash">GET</span> request can be used
                to read a resource or to list a number of resources. A
                resource's id can be submitted in the request parameters to read
                a specific resource. The response usually returns a 200 OK
                response code upon success, with the resource's metadata in the
                response body.
              </p>
              <p className="content">
                Most of the endpoints accept JSON as input and return JSON
                responses. This means that you must usually add the following
                headers to your request:
              </p>

              <div className="black-div2" id="projects">
                <p className="black_text">
                  <br />
                  <span className="slash">/</span>mdhgenealogy
                  <span className="slash">/</span>v1
                  <span className="slash">/</span>get-genealogy
                </p>
              </div>
            </div>
            <Table
              className="parent_div"
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
            <div className="parent_div" id="Versioning and Endpoint Lifecycle">
              <p className="overview">Versioning and Endpoint Lifecycle</p>
              <ul>
                <li className="content">
                  API versioning is not synchronized to specific releases of the
                  MI
                </li>
                <li className="content">
                  APIs are designed to be backward compatible.
                </li>
                <li className="content">
                  Any changes to the API will first go through a deprecation
                  phase
                </li>
              </ul>
            </div>
            <span className="overview">Try it yourself</span>
            <span className="status_codes">See error codes <Popover content={content}> <ExclamationCircleOutlined style={{ color: '#162154' }} /> </Popover></span>
            <br />
            <br />

            <div className="try_area" id="section">
              <span>
                <p className="content">Request With level</p>
                <CodeEditor
                  value={withLevel}
                  onChange={(e) => handleLevel(e)}
                  language="json"
                  padding={15}
                  style={{
                    fontSize: 12,
                    height: '146px',
                    width: '404px',
                    backgroundColor: "#11171A",
                    fontFamily: "Courier,monospace",
                    color: "white",
                    border: ".5px solid black",
                    marginTop: '14px'
                  }}
                />
              </span>
              <span>
                <p style={{ marginLeft: '13px' }} className="content">Request without level</p>
                <CodeEditor
                  value={withoutLevel}
                  language="json"
                  onChange={(e) => handleWithoutleLevel(e)}
                  padding={15}
                  style={{
                    fontSize: 12,
                    height: '146px',
                    width: '404px',
                    backgroundColor: "#11171A",
                    fontFamily: "Courier,monospace",
                    color: "white",
                    border: ".5px solid black",
                    marginTop: '14px',
                    marginLeft: '14px'
                  }}
                /></span>
            </div>
            <div className="parent_div" id="Error Codes">
            </div>
            <Row>
              <Col span={14}>
                <Button className="button_genealogy" onClick={() => getData("with")}>
                  Try code
                </Button>
                <div className="result_status_genealogy">
                  <span className="result_key">Result</span> <span className="status_box_genealogy" >Status Code: {statusCode}</span>
                </div>
                <CodeEditor
                  value={resultLevel}
                  language="json"
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#B2E6FF",
                    fontFamily: "Courier,monospace",
                    color: "black",
                    border: ".5px solid black",
                    minHeight: "100px",
                    width: "404px",
                    height: "146px",
                    marginTop: "14px",
                    overflow: "auto",
                  }}
                />
              </Col>
              <Col span={8}>
                <Button className="button_genealogy_right" onClick={() => getData()}>
                  Try code
                </Button>
                <div className="result_status_genealogy" style={{ marginLeft: '20px' }}>
                  <span className="result_key">Result</span> <span className="status_box_genealogy">Status Code: {statusCodeLevel}</span>
                </div>
                <CodeEditor
                  value={resultLevelWithLevel}
                  language="json"
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#B2E6FF",
                    fontFamily: "Courier,monospace",
                    color: "black",
                    border: ".5px solid black",
                    minHeight: "100px",
                    width: "404px",
                    height: "146px",
                    marginTop: "14px",
                    overflow: "auto",
                    marginLeft: '20px'
                  }}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={1}>
          <div class="vl" />
        </Col>
        <Col span={5}>
          <ul style={{ listStyle: "none", justifyContent: "space-around" }}>
            <li
              className={
                selectedDiv == "Overview" ? "side_list_selected" : "side_list"
              }
              onClick={(e) => scrollToSection(e)}
            >
              Overview
            </li>
            <li
              className={
                selectedDiv == "Resources" ? "side_list_selected" : "side_list"
              }
              onClick={(e) => scrollToSection(e)}
            >
              Resources
            </li>
            <li
              className={
                selectedDiv == "Parameters" ? "side_list_selected" : "side_list"
              }
              onClick={(e) => scrollToSection(e)}
            >
              Parameters
            </li>
            <li
              className={
                selectedDiv == "Versioning and Endpoint Lifecycle"
                  ? "side_list_selected"
                  : "side_list"
              }
              onClick={(e) => scrollToSection(e)}
            >
              Versioning and Endpoint Lifecycle
            </li>
            <li
              className={
                selectedDiv == "Try Code" ? "side_list_selected" : "side_list"
              }
              onClick={(e) => scrollToSection(e)}
            >
              Try Code
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}
