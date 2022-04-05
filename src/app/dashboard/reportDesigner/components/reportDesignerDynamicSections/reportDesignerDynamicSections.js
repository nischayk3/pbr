import React, { useState } from 'react';
import { Form, Input, Space, Popconfirm, Card, Button } from 'antd';
import { CheckCircleTwoTone, DeleteTwoTone, PlusSquareOutlined } from '@ant-design/icons';
import './styles.scss';
import ReportDesignerDynamicRow from './reportDesignerDynamicRow/reportDesignerDynamicRow';
import Chart from '../reportChart/chartComponent/chartComponent'
import { showLoader, hideLoader } from '../../../../../duck/actions/commonActions';
import { useDispatch } from 'react-redux';



function ReportDesignerDynamicSections(props) {

   
    const convertListToObj = (arr) => {
        let obj = []
        for (let i = 0; i < arr.length; i++) {
            let res = {}
            res.value = arr[i]
            res.clicked = false
            obj.push(res)
        }

        return obj
    }

    const dispatch = useDispatch();
    const [addedCharts, setAddedCharts] = useState({})
    const [chartList, setChartList] = useState([])

    const { formData,list } = props;

    const addChart = (chartName, section) => {
        
        dispatch(showLoader())
        section = section + 1
        if (`${section}` in addedCharts) {
            addedCharts[`${section}`].push(chartName)
            setAddedCharts(addedCharts)
            dispatch(hideLoader())
        }
        else {
            if (addedCharts && !addedCharts[`${section}`]) {
                addedCharts[`${section}`] = []
                addedCharts[`${section}`].push(chartName)
                setAddedCharts(addedCharts)
                dispatch(hideLoader())
            }
            else
                addedCharts[`${section}`].push(chartName)
            setAddedCharts(addedCharts)
            dispatch(hideLoader())
        }
        props.setSectionCharts(chartName,addedCharts)

    }

    return (
        <div className="reportDesigner-dynamicSections bg-white">
            <Card className="reportTableCard" title="Report Table" >
                {/* <div className="dynamicSections-container">
                    <div className="dynamicSections-section">
                        <div className="dynamicSections-block"> */}
                <div className="designer-block">
                    <Form.List name={["response"]}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                <div style={{ border: "1px solid #486BC9", marginBottom: "10px", minHeight: "160px", borderRadius: "4px" }}>
                                <p className="section-name">Section {name + 1}
                                            <div >
                                                <div className="add-chart" >+ Add Chart</div>
                                                <div>
                                                    <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => remove(name)} disabled={props.show}>
                                                        <DeleteTwoTone twoToneColor="red" />
                                                    </Popconfirm></div>
                                            </div>
                                        </p>
                                        <Form.Item {...restField} name={[name, 'sectionName']}>
                                            <Input placeholder="Section" style={{ width: '150px', marginBottom: '10px' }} className="input-section" disabled={props.show} />
                                        </Form.Item>
                                        <Space
                                            className="dynamicSections-spaceSection"
                                            key={key}
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                            align="baseline"
                                        >
                                            <table className="dynamicSections-table" style={{ width: '1190px' }}>
                                                <thead className="dynamicSections-thead">
                                                    <tr>
                                                        <th>Action</th>
                                                        <th>Key</th>
                                                        <th>Value</th>
                                                        <th>Editable ?</th>
                                                        {/* <th></th>
                                                                <th></th> */}
                                                    </tr>
                                                </thead>
                                                <tbody className="dynamicSections-tbody">
                                                    {/* <tr><td></td></tr> */}
                                                    <ReportDesignerDynamicRow fieldKey={name} show={props.show} />
                                                </tbody>
                                            </table>

                                            {/* <Popconfirm title="Are you Sure you want to delete the section?" onConfirm={() => remove(name)} disabled={props.show}>
                                                        <DeleteTwoTone twoToneColor="red" style={{ marginBottom: '100px' }} />
                                                    </Popconfirm> */}
                                        </Space>
                                        <div className="chart-block">
                                            {
                                                list.map((i) =>
                                                (<Form.Item {...restField} name={[name, 'select']}>
                                                    <div className='chart-tiless' onClick={(e) => addChart(e.target.innerHTML, name)}>
                                                        {!i ? <></> : <div className="chart-tile"> <CheckCircleTwoTone twoToneColor="green" /></div>}
                                                        <p className="charttile-content">{i}</p>
                                                    </div>
                                                </Form.Item>

                                                ))
                                            }
                                            {/* <PlusOutlined twoToneColor="#eb2f96" style={{ fontSize: '16px', marginLeft: '10px', color: '#093185', background: "white", position: "absolute", bottom: 0, right: 0, padding: "2px", borderRadius: "50px" }} onClick={() => add()} /> <u disabled={props.show}></u> */}
                                        </div>

                                        {addedCharts[`${name + 1}`] && addedCharts[`${name + 1}`].map((i) =>
                                        (
                                            <div>
                                                <p className="chart-name">{i}</p>
                                                <Chart/>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                                <Form.Item >
                                    <p disabled={props.show}>
                                        <PlusSquareOutlined style={{ fontSize: '16px', marginLeft: '10px', color: '#093185' }} onClick={() => add()} /> <u disabled={props.show}>Add Multiple Sections</u>
                                    </p>


                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>
                {/* </div>
                    </div>
                </div> */}
            </Card>
        </div>
    );
}

export default ReportDesignerDynamicSections;
