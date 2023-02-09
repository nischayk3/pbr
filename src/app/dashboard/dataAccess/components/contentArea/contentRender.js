import { Button, Row, Table, Col } from "antd";
import React, { useState } from "react";
import "./tabContent.scss";
import CodeEditor from "@uiw/react-textarea-code-editor";

export default function ContentRenderComponent(props) {

  const [request, setRequest] = useState(JSON.stringify(props.request));
  const [statusCode, setStatusCode] = useState(0);
  const [result, setResult] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("Overview");

  const getResult = async () => {
    let result = await props.getData(request);
    if (result.statuscode > 200) {
      setStatusCode(result.statuscode);
      setResult(JSON.stringify(result));
    } else {
      setStatusCode(200);
      setResult(result);
      const url = window.URL.createObjectURL(new Blob([result]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${props.selectedTab}-response.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleChange = (e) => {
    setRequest(e.target.value);
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
                To facilitate management, Apache Airflow supports a range of
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
            </div>

            {props.url}
            <Table
              className="parent_div"
              dataSource={props.dataSource}
              columns={props.columns}
              pagination={false}
            />
            {props.content}
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

            <div className="parent_div" id="section">
              <p className="content">Request</p>
              <CodeEditor
                value={request}
                onChange={(e) => handleChange(e)}
                language="json"
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#00000",
                  fontFamily: "Courier,monospace",
                  color: "white",
                  border: ".5px solid black",
                }}
              />
            </div>
            <div className="parent_div" id="Error Codes">
              <p className="overview">Error Codes</p>
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
              {result ? (
                <p>
                  {statusCode ? (
                    <p className="overview">
                      {" "}
                      Statuscode :{" "}
                      <Button
                        className={
                          statusCode == 200
                            ? "success-code-button"
                            : "error-code-button"
                        }
                      >
                        {statusCode}
                      </Button>{" "}
                    </p>
                  ) : (
                    <></>
                  )}
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="parent_div" id="Try Code">
              <Button className="button" onClick={() => getResult()}>
                Try code
              </Button>
            </div>
          </div>
        </Col>
        <Col span={1}>
          <div class="vl" />
        </Col>
        <Col span={5}>
          <ul style={{ listStyle: "none", justifyContent: "space-around" }}>
            {props.render_side_tab.map((i) => (
              <li
                className={
                  selectedDiv == i ? "side_list_selected" : "side_list"
                }
                onClick={(e) => scrollToSection(e)}
              >
                {i}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
}
