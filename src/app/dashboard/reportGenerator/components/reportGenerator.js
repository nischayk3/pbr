import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Collapse,
    Typography,
    Input,
    Modal,
    Radio,
    Space,
    Select
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import ReportDesignerForm from '../components/reportGeneratorHeader';
import { screenChange } from '../../../../duck/actions/reportDesignerAction';

const { Panel } = Collapse;
const { Text } = Typography;
const { Option } = Select


function ReportGenerator() {

    const repotData = useSelector(
        (state) => state.reportDesignerReducer.reportData
      );
      console.log(repotData)
      

    const [visible, setVisible] = useState(false)
    const [ReportData, setReportData] = useState(repotData)
    const [selectedUser, setSelectedUser] = useState(false)
    const [reportId,setReportId] = useState('')
    const [reportName,setReportName] = useState('')
    const dispatch = useDispatch();
    // const getData = useSelector((state)=>console.log(state))
    // console.log(getData)
    // useEffect(() => {

    // }, [ReportData]
    // );
    const unload = (ReportData) =>
    {
       setReportId(ReportData['rep_disp_id'])
       setReportName(ReportData['rep_name'])
    }
    console.log("ReportData",ReportData)

    return (
        <div className="reportDesigner-container">
            <div className="reportDesigner-block">
                <h1 className="reportDesigner-headline">
                    <ArrowLeftOutlined /> Report Generator
                </h1>
                <div className="reportDesigner-btns">
                    <Button onClick={()=>dispatch(screenChange(false))}>
                        Cancel
                    </Button>
                </div>
            </div>
            <ReportDesignerForm />
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr" }}>
                <Card title="Chart" style={{ width: 650 }}>
                    <Collapse accordion>
                        <Panel header="Chart 1" key="Chart 1">
                            <p></p>
                        </Panel>
                        <Panel header="Chart 2" key="Chart 2">
                            <p></p>
                        </Panel>
                        <Panel header="Chart 3" key="Chart 3">
                            <p></p>
                        </Panel>
                        <Panel header="Chart 4" key="Chart 4">
                            <p></p>
                        </Panel>

                    </Collapse>

                </Card>
                <Card title="Share" style={{ width: 650 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr" }}>
                        <div>
                            <Text>Schedule</Text><br /><br />
                            <Button onClick={() => { setVisible(true) }} >Click To Select Schedule</Button>
                        </div>
                        <div>
                            <Card title="Recipients"></Card>
                        </div>
                    </div>

                </Card>
            </div>
            <Card title="Table" style={{marginTop:'10px'}}>
            <Collapse accordion>
                        <Panel header="CPV REPORT" key="1">
                            <p></p>
                        </Panel>
                        <Panel header="SUMMARY" key="1">
                            <p></p>
                        </Panel>
                        

                    </Collapse>
            </Card>
            <Card title="Charts" style={{marginTop:'10px'}}>
            </Card>
            <Card title="Data" style={{marginTop:'10px'}}>
            <Collapse accordion>
                        <Panel header="Excrusion Shift Trend" key="1">
                            <p></p>
                        </Panel>
                        <Panel header="Parameters" key="1">
                            <p></p>
                        </Panel>
                        <Panel header="Exclusion" key="1">
                            <p></p>
                        </Panel>
                        

                    </Collapse>
            </Card>

            <Modal
                title="Schedule"
                visible={visible}
                onCancel={() => setVisible(false)}
            >
                <Radio.Group >
                    <Space direction="vertical">
                        <Radio value="Hourly">Hourly</Radio>
                        <Radio value="Monthly">Monthly</Radio>
                        <Radio value="Daily">Daily</Radio>
                    </Space>
                </Radio.Group> <br /> <br />

                <Text>Users</Text> <br />
                <Select
                    mode="multiple"
                    style={{ width: '50%', marginTop: '10px' }}
                    placeholder="Select Users"
                    defaultValue={['a@gmail.com']}
                    optionLabelProp="label"
                >
                    <Option value="a@gmail.com" label="a@gmail.com">
                        a@gmail.com
                    </Option>
                    <Option value="c@gmail.com" label="c@gmail.com">
                        c@gmail.com
                    </Option>
                    <Option value="b@gmail.com" label="b@gmail.com">
                        b@gmail.com
                    </Option>
                    <Option value="m@gmail.com" label="m@gmail.com">
                        m@gmail.com
                    </Option>
                </Select>

            </Modal>
        </div>
    );
}

export default ReportGenerator;
