import { useState } from "react";
import { Row, Col, Form, Steps, Input, Button } from "antd";
import MetaData from "./metaData/metaData"
const { Step } = Steps;
const { Item } = Form;

import "antd/dist/antd.css";

const EbookStep = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const handleClickNext = () => {
    form
      .validateFields()
      .then(() => {
        // Here make api call of something else
        setCurrent(current + 1);
      })
      .catch((err) => console.log(err));
  };
  const description = 'This is a description.';
  
  return (
    <div>

      <Row>
          <Col>
          <div style={{ paddingLeft: "26px", fontSize: "16px", paddingBottom: "10px", fontWeight: "500"}}>
      New template - [template_name_entered_by_user]
    </div></Col>
      </Row>

      <Row style={{ background: '#ffffff' }}>  
        <Col span={5}>
    <div style={{ width: 208, margin: "40px auto", height: '420px' }}>
      <Steps direction="vertical" current={current}>
        <Step key={0} title="Meta data" description='Configure basic details' />
        <Step key={1} title="Design form" description="Build the template" />
        <Step key={2} title="Script editor" description="Verify all technical names" />
      </Steps>
     
    </div>
    </Col>
    <Col span={19} >
    <div style={{ background: "#EDECFF", margin: "23px", borderRadius: "12px", height: "455px" }}>
    <div style={{ margin: "0px 70px"}}>
        <Form form={form}>
          {current === 0 && (
            <MetaData />
          )}

          {current === 1 && (
            <h3>Step2</h3>
          )}
        </Form>
      </div>

      {current < 2 && (
        <div style={{ textAlign: "center" }}>
          
        </div>
      )}
      </div>
    </Col>
    </Row>

    </div>
  );
};


export default EbookStep
